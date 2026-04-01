export interface PrayerSchedule {
  _id: string;
  title: string;
  startDate?: string;
  endDate?: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  jummah?: string;
  jummahTimes?: string[];
  latitude?: number;
  longitude?: number;
  maghribSource?: "manual" | "sunset";
  maghribOffsetMinutes?: number;
}

export interface RamadanPrayerDay {
  date: string;
  displayDate: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}
