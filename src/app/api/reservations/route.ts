import { NextResponse } from "next/server";
import { reservationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json({ message: "Please submit the form as JSON." }, { status: 415 });
  const text = await request.text();
  if (Buffer.byteLength(text, "utf8") > 8000)
    return NextResponse.json({ message: "This request is too large." }, { status: 413 });
  let input: unknown;
  try {
    input = JSON.parse(text);
  } catch {
    return NextResponse.json({ message: "We could not read this request." }, { status: 400 });
  }
  const result = reservationSchema().safeParse(input);
  if (!result.success)
    return NextResponse.json(
      { message: result.error.issues[0]?.message ?? "Please check your form details." },
      { status: 400 },
    );
  const endpoint = process.env.RESERVATION_FORM_ENDPOINT;
  if (!endpoint)
    return NextResponse.json({
      status: "demo",
      message:
        "Your preview looks good. Demo mode: your request was not submitted, your details were not saved, and no table is booked.",
    });
  if (!/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint))
    return NextResponse.json(
      { message: "Reservation delivery is not configured correctly. Your request was not sent." },
      { status: 503 },
    );
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...result.data,
        _subject: "Root & Ritual — table request (not a booking)",
        timezone: "America/Los_Angeles",
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok)
      return NextResponse.json(
        {
          message:
            "The request could not be delivered. No booking has been made. Please try again later.",
        },
        { status: 502 },
      );
    return NextResponse.json({
      status: "sent",
      message:
        "Your table request has been sent. This is not a confirmed booking. The team will reply to confirm the details.",
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "We could not reach the reservation service. Your request was not confirmed. Please try again later.",
      },
      { status: 502 },
    );
  }
}
