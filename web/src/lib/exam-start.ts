import { EXAM_START } from "@/lib/site-links";

/** Wall-clock instant for exam start in Africa/Cairo. */
export function getExamStartMs(): number {
  const [year, month, day] = EXAM_START.date.split("-").map(Number);
  const { hour, minute, timeZone } = EXAM_START;

  let ms = Date.UTC(year, month - 1, day, hour - 2, minute);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  for (let i = 0; i < 24; i++) {
    const parts = Object.fromEntries(
      formatter.formatToParts(new Date(ms)).map((part) => [part.type, part.value])
    );
    const tzYear = Number(parts.year);
    const tzMonth = Number(parts.month);
    const tzDay = Number(parts.day);
    const tzHour = Number(parts.hour);
    const tzMinute = Number(parts.minute);

    if (
      tzYear === year &&
      tzMonth === month &&
      tzDay === day &&
      tzHour === hour &&
      tzMinute === minute
    ) {
      return ms;
    }

    ms +=
      (hour - tzHour) * 3_600_000 +
      (minute - tzMinute) * 60_000 +
      (day - tzDay) * 86_400_000;
  }

  return ms;
}

export function getExamCountdownMs(now = Date.now()): number {
  return getExamStartMs() - now;
}
