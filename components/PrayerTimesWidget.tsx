import { getActivePrayerSchedule } from "@/sanity/lib/queries";
import PrayerTimesClientShell from "./PrayerTimesClientShell";

/**
 * Server component wrapper for prayer times
 * Fetches active schedule from Sanity and passes to client component
 */
export default async function PrayerTimesWidget() {
  const schedule = await getActivePrayerSchedule();
  
  return <PrayerTimesClientShell schedule={schedule} />;
}
