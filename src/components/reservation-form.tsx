"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check, Info, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  availableTimes,
  portlandNow,
  reservationSchema,
  type ReservationInput,
} from "@/lib/validation";

export function ReservationForm({ demo }: { demo: boolean }) {
  const [status, setStatus] = useState<{ kind: "demo" | "sent" | "error"; message: string } | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema()),
    defaultValues: {
      name: "",
      email: "",
      date: "",
      time: "",
      partySize: "2",
      message: "",
      website: "",
    },
    mode: "onBlur",
  });
  const date = useWatch({ control, name: "date" });
  const times = availableTimes(date);
  const error = (field: keyof ReservationInput) =>
    errors[field] ? (
      <span id={`${field}-error`} role="alert" className="field-error">
        {errors[field]?.message}
      </span>
    ) : null;
  const props = (field: keyof ReservationInput) => ({
    "aria-invalid": !!errors[field],
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });
  const submit = handleSubmit(async (values) => {
    setStatus(null);
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Your request could not be sent. Please try again.");
      setStatus({ kind: result.status === "demo" ? "demo" : "sent", message: result.message });
      if (result.status === "sent") reset();
    } catch (error) {
      setStatus({
        kind: "error",
        message: error instanceof Error ? error.message : "We could not connect. Please try again.",
      });
    }
  });
  return (
    <form className="reservation-form" onSubmit={submit} noValidate>
      <div className="form-heading">
        <h3>A little time, together.</h3>
        <p>
          {demo
            ? "Try the form. This portfolio demo sends nothing."
            : "Tell us when you would like to join us."}
        </p>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="reservation-name">
            Your name <span>*</span>
          </label>
          <input
            id="reservation-name"
            autoComplete="name"
            placeholder="Alex Green"
            maxLength={100}
            {...register("name")}
            {...props("name")}
          />
          {error("name")}
        </div>
        <div className="field">
          <label htmlFor="reservation-email">
            Email address <span>*</span>
          </label>
          <input
            id="reservation-email"
            type="email"
            autoComplete="email"
            placeholder="alex@example.com"
            maxLength={254}
            {...register("email")}
            {...props("email")}
          />
          {error("email")}
        </div>
        <div className="field">
          <label htmlFor="reservation-date">
            A day to look forward to <span>*</span>
          </label>
          <input
            id="reservation-date"
            type="date"
            min={portlandNow().date}
            {...register("date")}
            {...props("date")}
          />
          {error("date")}
        </div>
        <div className="field">
          <label htmlFor="reservation-time">
            Your preferred time <span>*</span>
          </label>
          <select id="reservation-time" {...register("time")} {...props("time")}>
            <option value="">
              {!date ? "Choose a day first" : times.length ? "Choose a time" : "Closed on Mondays"}
            </option>
            {times.map((time) => (
              <option key={time} value={time}>
                {new Date(`2000-01-01T${time}:00`).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </option>
            ))}
          </select>
          {error("time")}
        </div>
        <div className="field">
          <label htmlFor="reservation-party">
            Good company <span>*</span>
          </label>
          <select id="reservation-party" {...register("partySize")} {...props("partySize")}>
            {Array.from({ length: 8 }, (_, i) => (
              <option key={i + 1} value={String(i + 1)}>
                {i + 1} {i ? "guests" : "guest"}
              </option>
            ))}
          </select>
          {error("partySize")}
        </div>
        <div className="field">
          <label htmlFor="reservation-message">
            Anything we should know? <span className="optional">optional</span>
          </label>
          <input
            id="reservation-message"
            placeholder="A celebration, access needs…"
            maxLength={1000}
            {...register("message")}
            {...props("message")}
          />
          {error("message")}
        </div>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="reservation-website">Leave this field empty</label>
        <input id="reservation-website" autoComplete="off" tabIndex={-1} {...register("website")} />
      </div>
      <p className="form-notice">
        <Info size={14} aria-hidden="true" />
        {demo
          ? "Demo mode. No request will be submitted and no table will be booked."
          : "This is a request, not a confirmed booking. Our team will reply by email."}
      </p>
      <button type="submit" disabled={isSubmitting} className="button form-submit">
        {isSubmitting ? (
          <>
            <LoaderCircle size={16} className="spin" aria-hidden="true" />
            Just a moment…
          </>
        ) : (
          <>
            {demo ? "Preview a table request" : "Send a table request"}
            <ArrowUpRight size={17} aria-hidden="true" />
          </>
        )}
      </button>
      {status && (
        <div
          className={`form-status status-${status.kind}`}
          role={status.kind === "error" ? "alert" : "status"}
        >
          {status.kind === "sent" ? (
            <Check size={18} aria-hidden="true" />
          ) : (
            <Info size={18} aria-hidden="true" />
          )}
          <span>{status.message}</span>
        </div>
      )}
      <p className="privacy-note">
        {demo
          ? "Your details are used only to validate this preview; they are not saved or sent to a booking service."
          : "Only the details needed to respond to your request are sent to our form provider."}{" "}
        All times are local to Portland, Oregon.
      </p>
    </form>
  );
}
