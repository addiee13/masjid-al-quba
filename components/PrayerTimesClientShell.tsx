"use client";

import dynamic from "next/dynamic";
import type { PrayerSchedule } from "@/types/prayer";

const PrayerTimesClient = dynamic(() => import("./PrayerTimesClient"), {
  ssr: false,
  loading: () => (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl border-2 border-primary-dark shadow-lg overflow-hidden">
        <div className="flex flex-col items-center p-8 animate-pulse">
          <div className="h-9 w-48 rounded bg-light-sage/40 mb-2" />
          <div className="h-4 w-32 rounded bg-light-sage/30 mb-6" />
          <div className="w-full h-20 rounded-xl bg-light-sage/30 mb-6" />
          <div className="w-full space-y-2">
            <div className="h-12 rounded-xl bg-light-sage/20" />
            <div className="h-12 rounded-xl bg-light-sage/20" />
            <div className="h-12 rounded-xl bg-light-sage/20" />
            <div className="h-12 rounded-xl bg-light-sage/20" />
            <div className="h-12 rounded-xl bg-light-sage/20" />
          </div>
        </div>
      </div>
    </div>
  ),
});

interface PrayerTimesClientShellProps {
  schedule: PrayerSchedule | null;
}

export default function PrayerTimesClientShell({
  schedule,
}: PrayerTimesClientShellProps) {
  return <PrayerTimesClient schedule={schedule} />;
}
