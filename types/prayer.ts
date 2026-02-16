export interface PrayerSchedule {
  _id: string;
  title: string;
  effectiveFrom: string;
  effectiveTo?: string;
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
