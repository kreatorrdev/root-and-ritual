import assert from "node:assert/strict";
import test from "node:test";
import {
  availableTimes,
  portlandNow,
  reservationSchema,
  validDate,
} from "../src/lib/validation.ts";

const now = new Date("2026-10-21T19:00:00Z");
const schema = reservationSchema(now);
const valid = {
  name: "Alex Green",
  email: "alex@example.com",
  date: "2026-10-22",
  time: "18:30",
  partySize: "2",
  message: "",
  website: "",
};

test("valid request passes; malformed dates, past dates, invalid guest counts and honeypot do not", () => {
  assert.ok(schema.safeParse(valid).success);
  for (const change of [
    { date: "2026-02-30" },
    { date: "2026-10-20" },
    { date: "2027-03-01" },
    { partySize: "0" },
    { partySize: "9" },
    { email: "not an email" },
    { website: "spam.example" },
  ])
    assert.equal(schema.safeParse({ ...valid, ...change }).success, false, JSON.stringify(change));
  assert.equal(validDate("2026-02-30"), false);
});
test("reservations respect Monday closure, opening hours and Portland local time", () => {
  assert.deepEqual(availableTimes("2026-10-26"), []);
  assert.equal(schema.safeParse({ ...valid, date: "2026-10-26" }).success, false);
  assert.equal(schema.safeParse({ ...valid, date: "2026-10-21", time: "11:00" }).success, false);
  assert.equal(schema.safeParse({ ...valid, date: "2026-10-21", time: "18:00" }).success, true);
  assert.equal(schema.safeParse({ ...valid, date: "2026-10-22", time: "21:30" }).success, false);
  assert.equal(schema.safeParse({ ...valid, date: "2026-10-23", time: "21:30" }).success, true);
  assert.deepEqual(portlandNow(new Date("2026-11-01T09:30:00Z")), {
    date: "2026-11-01",
    time: "01:30",
  });
});
