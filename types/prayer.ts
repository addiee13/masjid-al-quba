export interface PrayerSchedule {
  _id: string;
  title: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  jummah?: string;
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
