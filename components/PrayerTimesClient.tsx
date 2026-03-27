"use client";

import { useState, useEffect, useMemo } from "react";
import type { ComponentType, SVGProps } from "react";
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
import {
  AsrIcon,
  DhuhrIcon,
  FajrIcon,
  IshaIcon,
  JummahIcon,
  MaghribIcon,
} from "./icons/PrayerIcons";

type PrayerIcon = ComponentType<SVGProps<SVGSVGElement>>;

// Prayer configuration
const PRAYERS_CONFIG: Array<{ key: PrayerName; name: string; icon: PrayerIcon }> = [
  { key: "fajr", name: "Fajr", icon: FajrIcon },
  { key: "dhuhr", name: "Dhuhr", icon: DhuhrIcon },
  { key: "asr", name: "Asr", icon: AsrIcon },
  { key: "maghrib", name: "Maghrib", icon: MaghribIcon },
  { key: "isha", name: "Isha", icon: IshaIcon },
];

const JUMMAH_TIMES = ["2:00 PM", "3:00 PM"] as const;
const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  "Jumada al-Ula",
  "Jumada al-Akhirah",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
] as const;

// Get Hijri date
function getHijriDate(): string {
  const hijriMoment = moment();
  return `${hijriMoment.iDate()} ${HIJRI_MONTHS[hijriMoment.iMonth()]} ${hijriMoment.iYear()} AH`;
}

interface PrayerTimesClientProps {
  schedule: PrayerSchedule | null;
}

interface PrayerRow extends PrayerTime {
  icon: PrayerIcon;
}

function getCurrentPrayer(prayers: PrayerRow[], currentTime: Date): PrayerRow | null {
  if (prayers.length === 0) return null;

  for (let i = prayers.length - 1; i >= 0; i -= 1) {
    if (prayers[i].time.getTime() <= currentTime.getTime()) {
      return prayers[i];
    }
  }

  return prayers[prayers.length - 1];
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

  const currentPrayer = useMemo(() => getCurrentPrayer(prayers, currentTime), [prayers, currentTime]);

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
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary-dark">
                Prayer Times
              </h2>
            </div>
            <p className="rounded-full border border-emerald-900/10 bg-white/80 px-3 py-1 text-right font-body text-xs font-medium text-muted-foreground shadow-sm">
              {hijriDate || "Loading..."}
            </p>
          </div>

          {nextPrayer && (
            <div className="mb-5 w-full overflow-hidden rounded-2xl border border-emerald-950/10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_32%),linear-gradient(135deg,_#2f6b4c_0%,_#2f7d57_52%,_#22563c_100%)] px-5 py-4 shadow-lg shadow-emerald-900/15">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 w-fit rounded-full bg-white/14 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85">
                    Next Prayer
                  </p>
                  <h3 className="font-heading text-3xl font-semibold text-white">
                    {nextPrayer.name}
                  </h3>
                </div>
                <div className="rounded-2xl border border-white/12 bg-black/10 px-4 py-3 text-right backdrop-blur-sm">
                  <p className="font-body text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                    Starts In
                  </p>
                  <p className="mt-1 font-heading text-3xl font-bold leading-none tracking-[0.08em] text-white">
                    {formatCountdown(countdown)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="w-full space-y-2.5">
            {prayers.map((prayer) => {
              const isNext = nextPrayer?.key === prayer.key;
              const isCurrent = currentPrayer?.key === prayer.key;
              const isPast = !isNext && prayer.time.getTime() < currentTime.getTime();
              const Icon = prayer.icon;
              return (
                <div
                  key={prayer.key}
                  className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-300 ${
                    isNext
                      ? "border-emerald-700/40 bg-emerald-50/80 text-emerald-900 shadow-sm shadow-emerald-900/5"
                      : isCurrent
                      ? "border-primary-green/20 bg-white/85 shadow-sm shadow-primary-dark/5"
                      : isPast
                      ? "border-primary-dark/8 bg-bg-beige/18 opacity-65"
                      : "border-primary-dark/10 bg-white hover:bg-bg-beige/30 hover:shadow-md"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      isNext
                        ? "bg-emerald-700 text-white"
                        : isCurrent
                        ? "bg-primary-green/10 text-primary-green"
                        : isPast
                        ? "bg-white/70 text-muted-foreground"
                        : "bg-bg-beige/30 text-primary-dark"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`font-heading text-lg ${
                          isNext
                            ? "font-semibold text-emerald-900"
                            : isPast
                            ? "text-muted-foreground"
                            : "text-primary-dark"
                        }`}
                      >
                        {prayer.name}
                      </span>
                      {isNext && (
                        <span className="rounded-full bg-emerald-700/10 px-2.5 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-800">
                          Next
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={`font-body text-sm font-semibold ${
                        isNext
                          ? "text-emerald-900"
                          : isPast
                          ? "text-muted-foreground"
                          : "text-primary-dark"
                      }`}
                    >
                      {formatTime12Hour(prayer.time)}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="mt-3 rounded-2xl border border-primary-dark/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(245,245,243,0.92))] px-4 py-4 shadow-sm shadow-primary-dark/5">
              <div className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-green/10 text-primary-green">
                  <JummahIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-heading text-lg font-semibold text-primary-dark">
                      Jummah
                    </span>
                    <span className="rounded-full bg-primary-green/10 px-2.5 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-green">
                      Friday
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {JUMMAH_TIMES.map((time) => (
                    <span
                      key={time}
                      className="rounded-full border border-emerald-300/70 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm shadow-emerald-900/5"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 w-full border-t border-light-sage/30 pt-3">
            <p className="font-body text-xs tracking-[0.12em] text-muted-foreground text-center uppercase">
              Masjid Al-Quba • Buford, GA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
