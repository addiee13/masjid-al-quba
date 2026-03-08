import ramadanPrayerTimes2026 from "@/data/ramadan-prayer-times-2026.json";
import { MASJID_TZ } from "@/lib/prayer-utils";
import { writeClient } from "@/sanity/lib/writeClient";
import type { PrayerSchedule, RamadanPrayerDay } from "@/types/prayer";

const SYNC_PRAYER_KEYS = ["fajr", "dhuhr", "asr", "maghrib", "isha"] as const;
const RAMADAN_TIMETABLE = ramadanPrayerTimes2026 as RamadanPrayerDay[];
const RAMADAN_START_DATE = RAMADAN_TIMETABLE[0]?.date;
const RAMADAN_END_DATE = RAMADAN_TIMETABLE[RAMADAN_TIMETABLE.length - 1]?.date;

type SyncedPrayerKey = (typeof SYNC_PRAYER_KEYS)[number];

interface PrayerScheduleDocument extends PrayerSchedule {
  _type?: "prayerSchedule";
}

export interface RamadanPrayerSyncResult {
  ok: true;
  status: "updated" | "noop" | "skipped";
  masjidDate: string;
  sourceDate?: string;
  documentId?: string;
  schedule?: Record<SyncedPrayerKey, string>;
  reason?: string;
}

export function getMasjidDateString(now = new Date()): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: MASJID_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(now);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error("Failed to derive masjid-local date");
  }

  return `${year}-${month}-${day}`;
}

export function getMasjidHour(now = new Date()): number {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: MASJID_TZ,
    hour: "2-digit",
    hour12: false,
  });
  const hour = formatter
    .formatToParts(now)
    .find((part) => part.type === "hour")?.value;

  if (!hour) {
    throw new Error("Failed to derive masjid-local hour");
  }

  return Number(hour);
}

export function shouldRunNightlySync(now = new Date()): boolean {
  return getMasjidHour(now) === 0;
}

export function convertSpreadsheetTimeTo24Hour(timeValue: string): string {
  const match = timeValue
    .trim()
    .match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);

  if (!match) {
    throw new Error(`Unsupported spreadsheet time: ${timeValue}`);
  }

  const [, rawHour, minutes, meridiem] = match;
  const hourNumber = Number(rawHour);

  if (hourNumber < 1 || hourNumber > 12) {
    throw new Error(`Invalid spreadsheet hour: ${timeValue}`);
  }

  let hour24 = hourNumber % 12;
  if (meridiem.toUpperCase() === "PM") {
    hour24 += 12;
  }

  return `${hour24.toString().padStart(2, "0")}:${minutes}`;
}

function getRamadanPrayerDayForDate(masjidDate: string): RamadanPrayerDay | null {
  if (!RAMADAN_START_DATE || !RAMADAN_END_DATE) {
    return null;
  }

  if (masjidDate < RAMADAN_START_DATE) {
    return null;
  }

  if (masjidDate > RAMADAN_END_DATE) {
    return RAMADAN_TIMETABLE[RAMADAN_TIMETABLE.length - 1] ?? null;
  }

  return RAMADAN_TIMETABLE.find((day) => day.date === masjidDate) ?? null;
}

function buildSchedulePatch(day: RamadanPrayerDay): Record<SyncedPrayerKey, string> {
  return {
    fajr: convertSpreadsheetTimeTo24Hour(day.fajr),
    dhuhr: convertSpreadsheetTimeTo24Hour(day.dhuhr),
    asr: convertSpreadsheetTimeTo24Hour(day.asr),
    maghrib: convertSpreadsheetTimeTo24Hour(day.maghrib),
    isha: convertSpreadsheetTimeTo24Hour(day.isha),
  };
}

function isAlreadySynced(
  currentSchedule: PrayerScheduleDocument,
  nextSchedule: Record<SyncedPrayerKey, string>
): boolean {
  return SYNC_PRAYER_KEYS.every((key) => currentSchedule[key] === nextSchedule[key]);
}

async function getLatestPrayerScheduleDocument(): Promise<PrayerScheduleDocument | null> {
  return writeClient.fetch(
    `*[_type == "prayerSchedule"] | order(_createdAt desc)[0]{
      _id,
      _type,
      title,
      "fajr": coalesce(fajr, fajrAthan, fajrIqamah),
      "dhuhr": coalesce(dhuhr, dhuhrAthan, dhuhrIqamah),
      "asr": coalesce(asr, asrAthan, asrIqamah),
      "maghrib": coalesce(maghrib, maghribAthan, maghribIqamah),
      "isha": coalesce(isha, ishaAthan, ishaIqamah),
      "jummah": coalesce(jummah, jummahIqamah, jummahKhutbah)
    }`
  );
}

export async function syncRamadanPrayerSchedule(options?: {
  now?: Date;
  force?: boolean;
}): Promise<RamadanPrayerSyncResult> {
  const now = options?.now ?? new Date();
  const masjidDate = getMasjidDateString(now);

  if (!options?.force && !shouldRunNightlySync(now)) {
    return {
      ok: true,
      status: "skipped",
      masjidDate,
      reason: "outside_midnight_window",
    };
  }

  const prayerSchedule = await getLatestPrayerScheduleDocument();

  if (!prayerSchedule?._id) {
    throw new Error("No prayerSchedule document found in Sanity");
  }

  const ramadanDay = getRamadanPrayerDayForDate(masjidDate);

  if (!ramadanDay) {
    return {
      ok: true,
      status: "skipped",
      masjidDate,
      documentId: prayerSchedule._id,
      reason: "before_ramadan_range",
    };
  }

  const nextSchedule = buildSchedulePatch(ramadanDay);

  if (isAlreadySynced(prayerSchedule, nextSchedule)) {
    return {
      ok: true,
      status: "noop",
      masjidDate,
      sourceDate: ramadanDay.date,
      documentId: prayerSchedule._id,
      schedule: nextSchedule,
      reason: "already_synced",
    };
  }

  await writeClient.patch(prayerSchedule._id).set(nextSchedule).commit();

  return {
    ok: true,
    status: "updated",
    masjidDate,
    sourceDate: ramadanDay.date,
    documentId: prayerSchedule._id,
    schedule: nextSchedule,
  };
}
