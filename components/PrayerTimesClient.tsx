"use client";

import { useState, useEffect, useMemo } from "react";
import moment from "moment-hijri";
import type { PrayerSchedule } from "@/types/prayer";
import {
  parseTimeInMasjidTZ,
  formatTime12Hour,
  formatCountdown,
  findNextPrayer,
  getCountdownMs,
  getNowInMasjidTZ,
  type PrayerTime,
  type PrayerName,
} from "@/lib/prayer-utils";

// Prayer configuration
const PRAYERS_CONFIG: Array<{ key: PrayerName; name: string }> = [
  { key: "fajr", name: "Fajr" },
  { key: "dhuhr", name: "Dhuhr" },
  { key: "asr", name: "Asr" },
  { key: "maghrib", name: "Maghrib" },
  { key: "isha", name: "Isha" },
];

// Prayer Icons Component
function PrayerIcon({
  prayer,
  className,
}: {
  prayer: string;
  className?: string;
}) {
  const iconClass = `w-8 h-8 ${className || "text-primary-green"}`;

  switch (prayer) {
    case "fajr":
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 3v1m0 16v1m-9-9h1m16 0h1m-2.636-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" />
          <path d="M17 12a5 5 0 11-10 0" />
          <path d="M3 18h18" strokeLinecap="round" />
        </svg>
      );
    case "dhuhr":
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4 12H2m20 0h-2m-2.93-7.07l-1.41 1.41m-9.32 9.32l-1.41 1.41m0-12.14l1.41 1.41m9.32 9.32l1.41 1.41" />
        </svg>
      );
    case "asr":
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="10" r="4" />
          <path d="M12 2v2m8 6h2M2 10h2m2.93-5.07l-1.41-1.41m12.02 0l1.41-1.41" />
          <path d="M6 19a6 6 0 0112 0" strokeLinecap="round" />
          <path d="M12 14v5" />
        </svg>
      );
    case "maghrib":
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M17 12a5 5 0 01-10 0" />
          <path d="M12 17v1m-4-2.5l-.5.87m9 0l-.5-.87" />
          <path d="M3 17h18" strokeLinecap="round" />
          <path d="M5 21h14" strokeLinecap="round" />
        </svg>
      );
    case "isha":
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 3a6 6 0 00-5.78 7.5A6 6 0 1012 21a6 6 0 000-18z" />
          <circle cx="16" cy="6" r="1" fill="currentColor" />
          <circle cx="19" cy="9" r="0.5" fill="currentColor" />
          <circle cx="18" cy="13" r="0.75" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

// Get Hijri date
function getHijriDate(): string {
  const hijriMoment = moment();
  return hijriMoment.format("iD iMMMM, iYYYY") + " AH";
}

interface PrayerTimesClientProps {
  schedule: PrayerSchedule | null;
}

export default function PrayerTimesClient({ schedule }: PrayerTimesClientProps) {
  const [currentTime, setCurrentTime] = useState<Date>(getNowInMasjidTZ());
  const hijriDate = useMemo(() => getHijriDate(), []);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getNowInMasjidTZ());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Parse prayer times from schedule
  const prayers = useMemo<PrayerTime[]>(() => {
    if (!schedule) return [];

    return PRAYERS_CONFIG.map((config) => ({
      key: config.key,
      name: config.name,
      athan: parseTimeInMasjidTZ(
        schedule[`${config.key}Athan` as keyof PrayerSchedule] as string
      ),
      iqamah: parseTimeInMasjidTZ(
        schedule[`${config.key}Iqamah` as keyof PrayerSchedule] as string
      ),
    }));
  }, [schedule]);

  // Determine next prayer
  const nextPrayer = useMemo(() => {
    if (prayers.length === 0) return null;
    return findNextPrayer(prayers, currentTime);
  }, [prayers, currentTime]);

  // Calculate countdown to next prayer
  const countdown = useMemo(() => {
    if (!nextPrayer) return 0;
    return getCountdownMs(nextPrayer.athan, currentTime);
  }, [nextPrayer, currentTime]);

  // Empty state
  if (!schedule) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl border-2 border-primary-dark shadow-lg overflow-hidden">
          <div className="flex flex-col items-center p-8">
            <h2 className="font-heading text-3xl font-bold text-primary-dark mb-4">
              Prayer Times
            </h2>
            <p className="font-body text-muted-foreground text-center">
              Prayer schedule not available. Please check back later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Clean Rectangle Card */}
      <div className="bg-white rounded-2xl border-2 border-primary-dark shadow-lg overflow-hidden">
        <div className="flex flex-col items-center p-8">
          {/* Title */}
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-1">
            Prayer Times
          </h2>

          {/* Hijri Date */}
          <p className="font-body text-sm text-muted-foreground mb-6">
            {hijriDate || "Loading..."}
          </p>

          {/* Countdown Banner */}
          {nextPrayer && (
            <div className="w-full bg-primary-dark rounded-xl py-3 px-4 mb-6">
              <p className="font-body text-light-sage text-xs text-center mb-1">
                {nextPrayer.name} is in
              </p>
              <p className="font-heading text-2xl md:text-3xl font-bold text-white text-center tracking-wider">
                {formatCountdown(countdown)}
              </p>
            </div>
          )}

          {/* Column Headers */}
          <div className="w-full grid grid-cols-[auto_1fr_1fr_1fr] gap-2 mb-3 px-2">
            <div className="w-8" /> {/* Icon space */}
            <div className="font-body text-xs text-muted-foreground font-medium" />
            <div className="font-body text-xs text-muted-foreground font-medium text-center">
              Athan
            </div>
            <div className="font-body text-xs text-primary-green font-medium text-center">
              Iqama
            </div>
          </div>

          {/* Prayer Times List */}
          <div className="w-full space-y-2">
            {prayers.map((prayer) => {
              const isNext = nextPrayer?.key === prayer.key;
              const isPassed = prayer.athan.getTime() < currentTime.getTime();

              return (
                <div
                  key={prayer.key}
                  className={`grid grid-cols-[auto_1fr_1fr_1fr] gap-2 items-center py-3 px-3 rounded-xl transition-all duration-300 ${
                    isNext
                      ? "bg-primary-green/10 border-2 border-primary-green"
                      : isPassed
                      ? "opacity-50"
                      : "hover:bg-bg-beige/50"
                  }`}
                >
                  {/* Icon */}
                  <PrayerIcon
                    prayer={prayer.key}
                    className={
                      isNext
                        ? "text-primary-green"
                        : isPassed
                        ? "text-muted-foreground"
                        : "text-primary-dark"
                    }
                  />

                  {/* Prayer Name */}
                  <span
                    className={`font-heading text-lg font-semibold ${
                      isNext
                        ? "text-primary-green"
                        : isPassed
                        ? "text-muted-foreground"
                        : "text-primary-dark"
                    }`}
                  >
                    {prayer.name}
                  </span>

                  {/* Athan Time */}
                  <span
                    className={`font-body text-sm text-center ${
                      isPassed ? "text-muted-foreground" : "text-primary-dark"
                    }`}
                  >
                    {mounted ? formatTime12Hour(prayer.athan) : "--:--"}
                  </span>

                  {/* Iqama Time */}
                  <span
                    className={`font-body text-sm font-medium text-center ${
                      isNext ? "text-primary-green" : "text-primary-green/70"
                    }`}
                  >
                    {mounted ? formatTime12Hour(prayer.iqamah) : "--:--"}
                  </span>
                </div>
              );
            })}

            {/* Jummah Row (conditional) */}
            {(schedule.jummahKhutbah || schedule.jummahIqamah) && (
              <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-2 items-center py-3 px-3 rounded-xl hover:bg-bg-beige/50 border-t-2 border-light-sage/20 mt-4">
                <PrayerIcon prayer="dhuhr" className="text-primary-dark" />
                <span className="font-heading text-lg font-semibold text-primary-dark">
                  Jummah
                </span>
                <span className="font-body text-sm text-center text-primary-dark">
                  {schedule.jummahKhutbah
                    ? mounted
                      ? formatTime12Hour(parseTimeInMasjidTZ(schedule.jummahKhutbah))
                      : "--:--"
                    : "—"}
                </span>
                <span className="font-body text-sm font-medium text-center text-primary-green/70">
                  {schedule.jummahIqamah
                    ? mounted
                      ? formatTime12Hour(parseTimeInMasjidTZ(schedule.jummahIqamah))
                      : "--:--"
                    : "—"}
                </span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-light-sage/30 w-full">
            <p className="font-body text-xs text-muted-foreground text-center">
              Masjid Al-Quba • Buford, GA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
