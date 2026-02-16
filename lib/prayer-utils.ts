/**
 * Timezone-safe utilities for prayer times
 * All calculations use America/New_York (masjid's timezone)
 */

export const MASJID_TZ = "America/New_York";

export type PrayerName = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";

export interface PrayerTime {
  key: PrayerName;
  name: string;
  athan: Date;
  iqamah: Date;
}

/**
 * Get current date/time in masjid timezone
 */
export function getNowInMasjidTZ(): Date {
  // Create a date string in masjid timezone
  const nowStr = new Date().toLocaleString("en-US", { timeZone: MASJID_TZ });
  return new Date(nowStr);
}

/**
 * Convert HH:mm time string to Date object in masjid timezone for today
 * @param timeStr - Time in HH:mm format (24-hour)
 * @returns Date object in masjid timezone
 */
export function parseTimeInMasjidTZ(timeStr: string): Date {
  const now = getNowInMasjidTZ();
  const [hours, minutes] = timeStr.split(":").map(Number);
  
  // Create date in masjid timezone
  const dateStr = now.toLocaleDateString("en-US", { timeZone: MASJID_TZ });
  const [month, day, year] = dateStr.split("/").map(Number);
  
  // Create date string in format that Date constructor understands
  const isoStr = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}T${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00.000`;
  
  // Parse in local time then adjust to masjid timezone
  const localDate = new Date(isoStr);
  const localStr = localDate.toLocaleString("en-US", { timeZone: MASJID_TZ });
  return new Date(localStr);
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
 * Find the next prayer based on Athan time
 * If all prayers have passed, returns tomorrow's Fajr
 */
export function findNextPrayer(prayers: PrayerTime[], currentTime: Date): PrayerTime {
  const nowMs = currentTime.getTime();
  
  // Find first prayer whose athan hasn't occurred yet
  for (const prayer of prayers) {
    if (prayer.athan.getTime() > nowMs) {
      return prayer;
    }
  }
  
  // All prayers passed - return tomorrow's Fajr
  const tomorrowFajr = { ...prayers[0] };
  tomorrowFajr.athan = new Date(prayers[0].athan.getTime() + 24 * 60 * 60 * 1000);
  tomorrowFajr.iqamah = new Date(prayers[0].iqamah.getTime() + 24 * 60 * 60 * 1000);
  
  return tomorrowFajr;
}

/**
 * Calculate countdown to target time in milliseconds
 */
export function getCountdownMs(targetDate: Date, currentDate: Date): number {
  return Math.max(0, targetDate.getTime() - currentDate.getTime());
}
