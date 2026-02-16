import type { EventOccurrence, EventTemplate, RecurrenceType } from "@/types/events";

export const MASJID_TIME_ZONE = "America/New_York";
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function toDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function addWeeks(base: Date, weeks: number): Date {
  return new Date(base.getTime() + weeks * 7 * MS_PER_DAY);
}

function addDays(base: Date, days: number): Date {
  return new Date(base.getTime() + days * MS_PER_DAY);
}

function addMonths(base: Date, months: number): Date {
  const next = new Date(base);
  next.setUTCMonth(next.getUTCMonth() + months);
  return next;
}

function recurrenceEndDateToBoundary(dateValue: string | null | undefined): Date | null {
  if (!dateValue) return null;
  const parsed = new Date(`${dateValue}T23:59:59.999Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function normalizedRecurrenceType(value: RecurrenceType | null | undefined): RecurrenceType {
  if (value === "daily" || value === "weekly" || value === "monthly") return value;
  return "none";
}

function makeOccurrence(template: EventTemplate, start: Date, end: Date | null, recurring: boolean): EventOccurrence {
  const recurrenceType = normalizedRecurrenceType(template.recurrenceType);

  return {
    eventId: template._id,
    slug: template.slug,
    title: template.title,
    summary: template.summary,
    category: template.category || "general",
    recurrenceType,
    location: template.location || "Masjid Al-Quba",
    mainImage: template.mainImage,
    startsAt: start.toISOString(),
    endsAt: end ? end.toISOString() : null,
    isFeatured: Boolean(template.isFeatured),
    isRecurringOccurrence: recurring,
  };
}

export function expandEventOccurrences(
  templates: EventTemplate[],
  from: Date,
  to: Date
): EventOccurrence[] {
  const results: EventOccurrence[] = [];

  for (const template of templates) {
    if (template.isActive === false) continue;

    const start = toDate(template.startDateTime);
    if (!start) continue;
    const end = toDate(template.endDateTime ?? null);
    const recurrenceType = normalizedRecurrenceType(template.recurrenceType);
    const recurrenceEnd = recurrenceEndDateToBoundary(template.recurrenceEndDate);

    if (recurrenceType === "none") {
      if (start >= from && start <= to) {
        results.push(makeOccurrence(template, start, end, false));
      }
      continue;
    }

    const durationMs = end ? Math.max(0, end.getTime() - start.getTime()) : 0;
    let occurrenceStart = new Date(start);
    let guard = 0;

    while (occurrenceStart <= to && guard < 400) {
      if (recurrenceEnd && occurrenceStart > recurrenceEnd) break;
      if (occurrenceStart >= from) {
        const occurrenceEnd =
          durationMs > 0 ? new Date(occurrenceStart.getTime() + durationMs) : null;
        results.push(makeOccurrence(template, occurrenceStart, occurrenceEnd, true));
      }

      occurrenceStart =
        recurrenceType === "daily"
          ? addDays(occurrenceStart, 1)
          : recurrenceType === "weekly"
          ? addWeeks(occurrenceStart, 1)
          : addMonths(occurrenceStart, 1);
      guard += 1;
    }
  }

  return results.sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
  );
}

export function getDefaultEventWindow(now = new Date()): { from: Date; to: Date } {
  const from = new Date(now);
  const to = new Date(now);
  to.setUTCMonth(to.getUTCMonth() + 12);
  return { from, to };
}
