"use client";

import { useState, useEffect, useMemo } from "react";
import moment from "moment-hijri";
import {
  Clock3,
  MoonStar,
  Sun,
  Sunrise,
  Sunset,
  type LucideIcon,
} from "lucide-react";
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
const PRAYERS_CONFIG: Array<{ key: PrayerName; name: string; icon: LucideIcon }> = [
  { key: "fajr", name: "Fajr", icon: Sunrise },
  { key: "dhuhr", name: "Dhuhr", icon: Sun },
  { key: "asr", name: "Asr", icon: Clock3 },
  { key: "maghrib", name: "Maghrib", icon: Sunset },
  { key: "isha", name: "Isha", icon: MoonStar },
];

// Get Hijri date
function getHijriDate(): string {
  const hijriMoment = moment();
  return hijriMoment.format("iD iMMMM, iYYYY") + " AH";
}

interface PrayerTimesClientProps {
  schedule: PrayerSchedule | null;
}

interface PrayerRow extends PrayerTime {
  icon: LucideIcon;
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
  const prayers = useMemo<PrayerRow[]>(() => {
    if (!schedule) return [];

    return PRAYERS_CONFIG.map((config) => ({
      key: config.key,
      name: config.name,
      icon: config.icon,
      time: parseTimeInMasjidTZ(schedule[config.key]),
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
    return getCountdownMs(nextPrayer.time, currentTime);
  }, [nextPrayer, currentTime]);

  // Empty state
  if (!schedule) {
    return (
      <div className="w-full h-full">
        <div className="h-full overflow-hidden rounded-2xl border border-emerald-900/10 bg-gradient-to-br from-white to-emerald-50/40 shadow-lg shadow-emerald-900/5">
          <div className="h-full p-6 md:p-8">
            <h2 className="font-heading text-2xl font-bold text-primary-dark mb-2">
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
    <div className="w-full h-full">
      <div className="h-full overflow-hidden rounded-2xl border border-emerald-900/10 bg-gradient-to-br from-white to-emerald-50/40 shadow-lg shadow-emerald-900/5">
        <div className="h-full p-6 md:p-8">
          <div className="mb-4 flex items-center justify-between gap-5">
            <h2 className="font-heading text-2xl font-bold text-primary-dark">
              Prayer Times
            </h2>
            <p className="font-body text-xs text-muted-foreground">
              {hijriDate || "Loading..."}
            </p>
          </div>

          {nextPrayer && (
            <div className="mb-4 w-full rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-700 px-5 py-4 shadow-md shadow-emerald-900/20">
              <p className="mx-auto mb-1 w-fit rounded-full bg-black/20 px-3 py-1 text-xs font-medium tracking-wide text-white/90">
                {nextPrayer.name} is in
              </p>
              <p className="font-heading text-2xl font-bold text-white text-center tracking-wider leading-none">
                {formatCountdown(countdown)}
              </p>
            </div>
          )}

          <div className="w-full space-y-4">
            {prayers.map((prayer) => {
              const isNext = nextPrayer?.key === prayer.key;
              const isPast = prayer.time.getTime() < currentTime.getTime();
              const Icon = prayer.icon;

              return (
                <div
                  key={prayer.key}
                  className={`grid h-12 grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border px-4 transition-all duration-300 ${
                    isNext
                      ? "bg-emerald-50/70 border-emerald-700 text-emerald-800 shadow-sm"
                      : isPast
                      ? "border-primary-dark/10 bg-bg-beige/30 opacity-50"
                      : "border-primary-dark/10 bg-white hover:bg-bg-beige/40 hover:translate-y-0.5 hover:shadow-md"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isNext
                        ? "text-emerald-800"
                        : isPast
                        ? "text-muted-foreground"
                        : "text-primary-dark"
                    }`}
                  />

                  <span
                    className={`font-heading text-lg ${
                      isNext
                        ? "font-semibold text-emerald-800"
                        : isPast
                        ? "text-muted-foreground"
                        : "text-primary-dark"
                    }`}
                  >
                    {prayer.name}
                  </span>

                  <span
                    className={`font-body text-sm font-semibold text-right ${
                      isNext
                        ? "text-emerald-800"
                        : isPast
                        ? "text-muted-foreground"
                        : "text-primary-dark"
                    }`}
                  >
                    {formatTime12Hour(prayer.time)}
                  </span>
                </div>
              );
            })}

            {schedule.jummah && (
              <div className="mt-1 grid h-12 grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border border-primary-dark/10 bg-white px-4 transition-all duration-300 hover:translate-y-0.5 hover:bg-bg-beige/40 hover:shadow-md">
                <Sun className="h-5 w-5 text-primary-dark" />
                <span className="font-heading text-lg font-semibold text-primary-dark">
                  Jummah
                </span>
                <span className="font-body text-sm font-semibold text-right text-primary-dark">
                  {formatTime12Hour(parseTimeInMasjidTZ(schedule.jummah))}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 w-full border-t border-light-sage/30 pt-3">
            <p className="font-body text-xs text-muted-foreground text-center">
              Masjid Al-Quba • Buford, GA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
