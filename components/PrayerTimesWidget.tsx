import { getActivePrayerSchedule } from "@/sanity/lib/queries";
import PrayerTimesClient from "./PrayerTimesClient";

/**
 * Server component wrapper for prayer times
 * Fetches active schedule from Sanity and passes to client component
 */
export default async function PrayerTimesWidget() {
  const schedule = await getActivePrayerSchedule();
  
  return <PrayerTimesClient schedule={schedule} />;
}
