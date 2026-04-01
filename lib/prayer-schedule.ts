import { siteConfig } from "@/lib/site";
import { MASJID_TZ } from "@/lib/prayer-utils";
import type { PrayerSchedule } from "@/types/prayer";
import { prayerScheduleOverrides } from "@/data/prayer-schedule-overrides";

function getMasjidDateString(date = new Date()): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: MASJID_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(date);
}

function isDateWithinRange(
  date: string,
  startDate?: string,
  endDate?: string
): boolean {
  if (startDate && date < startDate) return false;
  if (endDate && date > endDate) return false;
  return true;
}

function normalizeJummahTimes(schedule: PrayerSchedule): string[] {
  if (schedule.jummahTimes?.length) {
    return schedule.jummahTimes;
  }

  return schedule.jummah ? [schedule.jummah] : [];
}

function formatDateTo24HourInMasjidTZ(date: Date): string {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: MASJID_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formatter.format(date);
}

async function getSunsetTime(
  date: string,
  latitude: number,
  longitude: number,
  offsetMinutes: number
): Promise<string> {
  const response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${date}&formatted=0`,
    { next: { revalidate: 60 * 60 * 12 } }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch sunset time: ${response.status}`);
  }

  const payload = (await response.json()) as {
    status?: string;
    results?: { sunset?: string };
  };

  if (payload.status !== "OK" || !payload.results?.sunset) {
    throw new Error("Sunset API returned an invalid payload");
  }

  const sunsetDate = new Date(payload.results.sunset);
  const adjusted = new Date(sunsetDate.getTime() + offsetMinutes * 60 * 1000);

  return formatDateTo24HourInMasjidTZ(adjusted);
}

async function resolveDynamicMaghrib(
  schedule: PrayerSchedule,
  date: string
): Promise<string> {
  if (schedule.maghribSource !== "sunset") {
    return schedule.maghrib;
  }

  const latitude = schedule.latitude ?? siteConfig.coordinates.latitude;
  const longitude = schedule.longitude ?? siteConfig.coordinates.longitude;
  const offsetMinutes = schedule.maghribOffsetMinutes ?? 0;

  try {
    return await getSunsetTime(date, latitude, longitude, offsetMinutes);
  } catch (error) {
    if (schedule.maghrib) {
      console.error("Falling back to manual Maghrib time after sunset lookup failure", error);
      return schedule.maghrib;
    }

    throw error;
  }
}

function pickScheduleForDate(
  schedules: PrayerSchedule[],
  date: string
): PrayerSchedule | null {
  if (!schedules.length) {
    return null;
  }

  const rangedMatch = schedules.find((schedule) =>
    isDateWithinRange(date, schedule.startDate, schedule.endDate)
  );

  if (rangedMatch) {
    return rangedMatch;
  }

  return schedules.find((schedule) => !schedule.startDate && !schedule.endDate) ?? schedules[0];
}

export async function resolvePrayerSchedule(
  schedules: PrayerSchedule[],
  now = new Date()
): Promise<PrayerSchedule | null> {
  const masjidDate = getMasjidDateString(now);
  const override =
    prayerScheduleOverrides.find((schedule) =>
      isDateWithinRange(masjidDate, schedule.startDate, schedule.endDate)
    ) ?? null;

  const activeSchedule = override ?? pickScheduleForDate(schedules, masjidDate);

  if (!activeSchedule) {
    return null;
  }

  const maghrib = await resolveDynamicMaghrib(activeSchedule, masjidDate);

  return {
    ...activeSchedule,
    maghrib,
    jummahTimes: normalizeJummahTimes(activeSchedule),
  };
}
