export interface PrayerSchedule {
  _id: string;
  title: string;
  fajrAthan: string;
  fajrIqamah: string;
  dhuhrAthan: string;
  dhuhrIqamah: string;
  asrAthan: string;
  asrIqamah: string;
  maghribAthan: string;
  maghribIqamah: string;
  ishaAthan: string;
  ishaIqamah: string;
  jummahKhutbah?: string;
  jummahIqamah?: string;
}
