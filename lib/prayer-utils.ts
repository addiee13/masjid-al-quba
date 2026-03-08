/**
 * Timezone-safe utilities for prayer times
 * All calculations use America/New_York (masjid's timezone)
 */

export const MASJID_TZ = "America/New_York";

export type PrayerName = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";

export interface PrayerTime {
  key: PrayerName;
  name: string;
  time: Date;
}

/**
 * Get current date/time in masjid timezone
 */
export function getNowInMasjidTZ(): Date {
  return new Date();
}

function getMasjidDateParts(date: Date): { year: number; month: number; day: number } {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: MASJID_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);

  return { year, month, day };
}

function getTimeZoneOffsetMinutes(date: Date): number {
  const timeZoneName = new Intl.DateTimeFormat("en-US", {
    timeZone: MASJID_TZ,
    timeZoneName: "shortOffset",
    hour: "2-digit",
  })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value;

  const match = timeZoneName?.match(/^GMT([+-])(\d{1,2})(?::(\d{2}))?$/);

  if (!match) {
    throw new Error(`Unsupported timezone offset format: ${timeZoneName}`);
  }

  const [, sign, hours, minutes = "00"] = match;
  const totalMinutes = Number(hours) * 60 + Number(minutes);
  return sign === "+" ? totalMinutes : -totalMinutes;
}

/**
 * Convert HH:mm time string to Date object in masjid timezone for today
 * @param timeStr - Time in HH:mm format (24-hour)
 * @returns Date object in masjid timezone
 */
export function parseTimeInMasjidTZ(timeStr: string): Date {
  const now = getNowInMasjidTZ();
  const [hours, minutes] = timeStr.split(":").map(Number);
  const { year, month, day } = getMasjidDateParts(now);
  const baseUtcMs = Date.UTC(year, month - 1, day, hours, minutes);

  // Resolve DST correctly by recalculating after the first offset adjustment.
  const firstGuess = new Date(baseUtcMs);
  const firstOffset = getTimeZoneOffsetMinutes(firstGuess);
  const secondGuess = new Date(baseUtcMs - firstOffset * 60 * 1000);
  const secondOffset = getTimeZoneOffsetMinutes(secondGuess);

  return new Date(baseUtcMs - secondOffset * 60 * 1000);
}

/**
 * Format Date to 12-hour time string (hh:mm AM/PM)
 */
export function formatTime12Hour(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: MASJID_TZ,
  });
}

/**
 * Format countdown duration as HH:MM:SS
 */
export function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Find the next prayer based on prayer time
 * If all prayers have passed, returns tomorrow's Fajr
 */
export function findNextPrayer(prayers: PrayerTime[], currentTime: Date): PrayerTime {
  const nowMs = currentTime.getTime();
  
  // Find first prayer whose time hasn't occurred yet
  for (const prayer of prayers) {
    if (prayer.time.getTime() > nowMs) {
      return prayer;
    }
  }
  
  // All prayers passed - return tomorrow's Fajr
  const tomorrowFajr = { ...prayers[0] };
  tomorrowFajr.time = new Date(prayers[0].time.getTime() + 24 * 60 * 60 * 1000);
  
  return tomorrowFajr;
}

/**
 * Calculate countdown to target time in milliseconds
 */
export function getCountdownMs(targetDate: Date, currentDate: Date): number {
  return Math.max(0, targetDate.getTime() - currentDate.getTime());
}
