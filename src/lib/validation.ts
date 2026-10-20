import { z } from "zod";

const TIME_ZONE = "America/Los_Angeles";

export function portlandNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    time: `${get("hour")}:${get("minute")}`,
  };
}

export function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function availableTimes(date: string): string[] {
  if (!validDate(date)) return [];
  const day = new Date(`${date}T12:00:00Z`).getUTCDay();
  if (day === 1) return [];
  const start = day === 0 ? 10 * 60 : 11 * 60;
  const end = day === 0 ? 19 * 60 + 30 : day === 5 || day === 6 ? 21 * 60 + 30 : 20 * 60 + 30;
  const slots: string[] = [];
  for (let minute = start; minute <= end; minute += 30)
    slots.push(
      `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`,
    );
  return slots;
}

export function reservationSchema(now = new Date()) {
  const local = portlandNow(now);
  const max = new Date(`${local.date}T12:00:00Z`);
  max.setUTCDate(max.getUTCDate() + 90);
  return z
    .object({
      name: z
        .string()
        .trim()
        .min(2, "Please enter your name (at least 2 characters).")
        .max(100, "Please use 100 characters or fewer."),
      email: z.email("Please enter a valid email address.").max(254),
      date: z
        .string()
        .refine(validDate, "Please choose a valid date.")
        .refine((d) => d >= local.date, "Please choose today or a future date.")
        .refine(
          (d) => d <= max.toISOString().slice(0, 10),
          "Please choose a date within the next 90 days.",
        ),
      time: z.string().regex(/^\d{2}:\d{2}$/, "Please choose a time."),
      partySize: z.string().regex(/^[1-8]$/, "Please choose between 1 and 8 guests."),
      message: z.string().trim().max(1000, "Please use 1,000 characters or fewer."),
      website: z.string().max(0, "Please leave this field empty."),
    })
    .superRefine((data, ctx) => {
      if (!validDate(data.date)) return;
      if (!availableTimes(data.date).includes(data.time))
        ctx.addIssue({
          code: "custom",
          path: ["time"],
          message: availableTimes(data.date).length
            ? "Please choose a time during our opening hours."
            : "Our kitchen rests on Mondays. Please choose another day.",
        });
      if (data.date === local.date && data.time <= local.time)
        ctx.addIssue({
          code: "custom",
          path: ["time"],
          message: "Please choose a time that has not already passed in Portland.",
        });
    });
}

export type ReservationInput = z.input<ReturnType<typeof reservationSchema>>;
