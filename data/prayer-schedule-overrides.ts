import type { PrayerSchedule } from "@/types/prayer";
import { siteConfig } from "@/lib/site";

export const prayerScheduleOverrides: PrayerSchedule[] = [
  {
    _id: "override-apr-01-14-2026",
    title: "April 1-14, 2026 Iqama Schedule",
    startDate: "2026-04-01",
    endDate: "2026-04-14",
    fajr: "06:30",
    dhuhr: "14:00",
    asr: "17:30",
    maghrib: "",
    isha: "21:30",
    jummahTimes: ["14:00", "14:45"],
    latitude: siteConfig.coordinates.latitude,
    longitude: siteConfig.coordinates.longitude,
    maghribSource: "sunset",
    maghribOffsetMinutes: 5,
  },
];
