"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Coordinates,
  PrayerTimes,
  CalculationMethod,
} from "adhan";
import moment from "moment-hijri";

// Masjid Al-Quba, Buford, Georgia coordinates
const LATITUDE = 34.1033;
const LONGITUDE = -84.0415;

// Prayer data with icons
const PRAYERS_CONFIG = [
  { key: "fajr", name: "Fajr", iqamaOffset: 30 },
  { key: "dhuhr", name: "Dhuhr", iqamaOffset: 15 },
  { key: "asr", name: "Asr", iqamaOffset: 15 },
  { key: "maghrib", name: "Maghrib", iqamaOffset: 5 },
  { key: "isha", name: "Isha", iqamaOffset: 15 },
];

// Prayer Icons Component
function PrayerIcon({ prayer, className }: { prayer: string; className?: string }) {
  const iconClass = `w-8 h-8 ${className || "text-primary-green"}`;
  
  switch (prayer) {
    case "fajr":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3v1m0 16v1m-9-9h1m16 0h1m-2.636-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" />
          <path d="M17 12a5 5 0 11-10 0" />
          <path d="M3 18h18" strokeLinecap="round" />
        </svg>
      );
    case "dhuhr":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4 12H2m20 0h-2m-2.93-7.07l-1.41 1.41m-9.32 9.32l-1.41 1.41m0-12.14l1.41 1.41m9.32 9.32l1.41 1.41" />
        </svg>
      );
    case "asr":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="10" r="4" />
          <path d="M12 2v2m8 6h2M2 10h2m2.93-5.07l-1.41-1.41m12.02 0l1.41-1.41" />
          <path d="M6 19a6 6 0 0112 0" strokeLinecap="round" />
          <path d="M12 14v5" />
        </svg>
      );
    case "maghrib":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 12a5 5 0 01-10 0" />
          <path d="M12 17v1m-4-2.5l-.5.87m9 0l-.5-.87" />
          <path d="M3 17h18" strokeLinecap="round" />
          <path d="M5 21h14" strokeLinecap="round" />
        </svg>
      );
    case "isha":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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

// Islamic Geometric Pattern for border
function IslamicPatternBorder() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="none">
      <defs>
        {/* Islamic geometric pattern */}
        <pattern id="islamicGeometric" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="none" />
          <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
          <circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
          <circle cx="20" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
          <circle cx="0" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
          <circle cx="20" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
          <path d="M10 2L18 10L10 18L2 10Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        </pattern>
      </defs>
    </svg>
  );
}

// Format time to 12-hour format
function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// Add minutes to a date
function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

// Format countdown
function formatCountdown(ms: number): string {
  if (ms <= 0) return "00:00:00";
  
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Get Hijri date
function getHijriDate(): string {
  const hijriMoment = moment();
  return hijriMoment.format("iD iMMMM, iYYYY") + " AH";
}

export default function PrayerTimesWidget() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hijriDate, setHijriDate] = useState("");
  const [mounted, setMounted] = useState(false);

  // Update current time every second
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Set Hijri date on mount (client-side only)
  useEffect(() => {
    setHijriDate(getHijriDate());
  }, []);

  // Calculate prayer times
  const prayerTimes = useMemo(() => {
    const coordinates = new Coordinates(LATITUDE, LONGITUDE);
    const params = CalculationMethod.NorthAmerica();
    const date = new Date();
    return new PrayerTimes(coordinates, date, params);
  }, []);

  // Get all prayer times as an array
  const prayers = useMemo(() => {
    return PRAYERS_CONFIG.map((config) => ({
      ...config,
      athan: prayerTimes[config.key as keyof PrayerTimes] as Date,
      iqama: addMinutes(prayerTimes[config.key as keyof PrayerTimes] as Date, config.iqamaOffset),
    }));
  }, [prayerTimes]);

  // Determine next prayer
  const nextPrayer = useMemo(() => {
    const now = currentTime.getTime();
    
    for (const prayer of prayers) {
      if (prayer.athan.getTime() > now) {
        return prayer;
      }
    }
    
    // If all prayers have passed, next is tomorrow's Fajr
    return prayers[0];
  }, [prayers, currentTime]);

  // Calculate countdown to next prayer
  const countdown = useMemo(() => {
    const now = currentTime.getTime();
    let targetTime = nextPrayer.athan.getTime();
    
    // If next prayer is tomorrow's Fajr (all prayers passed today)
    if (targetTime < now) {
      targetTime += 24 * 60 * 60 * 1000; // Add 24 hours
    }
    
    return targetTime - now;
  }, [nextPrayer, currentTime]);

  return (
    <div className="relative max-w-md mx-auto">
      {/* Mosque Arch Shape */}
      <div className="relative">
        {/* Outer arch with pattern */}
        <svg 
          className="w-full h-auto" 
          viewBox="0 0 400 520" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Islamic geometric pattern */}
            <pattern id="archPattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <rect width="24" height="24" fill="#3D5A45" />
              <circle cx="12" cy="12" r="10" fill="none" stroke="#4a6b52" strokeWidth="1" />
              <circle cx="0" cy="0" r="6" fill="none" stroke="#4a6b52" strokeWidth="1" />
              <circle cx="24" cy="0" r="6" fill="none" stroke="#4a6b52" strokeWidth="1" />
              <circle cx="0" cy="24" r="6" fill="none" stroke="#4a6b52" strokeWidth="1" />
              <circle cx="24" cy="24" r="6" fill="none" stroke="#4a6b52" strokeWidth="1" />
              <path d="M12 2L22 12L12 22L2 12Z" fill="none" stroke="#5a7d62" strokeWidth="0.75" />
              <circle cx="12" cy="12" r="3" fill="none" stroke="#5a7d62" strokeWidth="0.5" />
            </pattern>
            
            {/* Clip path for arch shape */}
            <clipPath id="archClip">
              <path d="M20 520V200C20 89.543 109.543 0 200 0C290.457 0 380 89.543 380 200V520H20Z" />
            </clipPath>
            
            {/* Inner clip for content area */}
            <clipPath id="innerArchClip">
              <path d="M40 510V210C40 110 110 40 200 40C290 40 360 110 360 210V510H40Z" />
            </clipPath>
          </defs>
          
          {/* Patterned border */}
          <g clipPath="url(#archClip)">
            <rect width="400" height="520" fill="url(#archPattern)" />
          </g>
          
          {/* Inner white area */}
          <path 
            d="M35 515V205C35 107.5 107.5 35 200 35C292.5 35 365 107.5 365 205V515H35Z" 
            fill="white"
            stroke="#3D5A45"
            strokeWidth="2"
          />
          
          {/* Decorative point at top */}
          <path 
            d="M200 0L210 25H190L200 0Z" 
            fill="#3D5A45"
          />
        </svg>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center pt-16 pb-8 px-12">
          {/* Title */}
          <h2 className="font-heading text-3xl font-bold text-primary-dark mb-1">
            Prayer Times
          </h2>
          
          {/* Hijri Date */}
          <p className="font-body text-sm text-accent-sage mb-4">
            {hijriDate || "Loading..."}
          </p>
          
          {/* Countdown Banner */}
          <div className="w-full bg-primary-dark rounded-xl py-3 px-4 mb-6">
            <p className="font-body text-light-sage text-xs text-center mb-1">
              {nextPrayer.name} is in
            </p>
            <p className="font-heading text-2xl md:text-3xl font-bold text-white text-center tracking-wider">
              {mounted ? formatCountdown(countdown) : "--:--:--"}
            </p>
          </div>

          {/* Column Headers */}
          <div className="w-full grid grid-cols-[auto_1fr_1fr_1fr] gap-2 mb-3 px-2">
            <div className="w-8" /> {/* Icon space */}
            <div className="font-body text-xs text-accent-sage font-medium" />
            <div className="font-body text-xs text-accent-sage font-medium text-center">Athan</div>
            <div className="font-body text-xs text-primary-green font-medium text-center">Iqama</div>
          </div>
          
          {/* Prayer Times List */}
          <div className="w-full space-y-2 flex-1">
            {prayers.map((prayer) => {
              const isNext = prayer.key === nextPrayer.key;
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
                    className={isNext ? "text-primary-green" : isPassed ? "text-accent-sage" : "text-primary-dark"}
                  />
                  
                  {/* Prayer Name */}
                  <span className={`font-heading text-lg font-semibold ${
                    isNext ? "text-primary-green" : isPassed ? "text-accent-sage" : "text-primary-dark"
                  }`}>
                    {prayer.name}
                  </span>
                  
                  {/* Athan Time */}
                  <span className={`font-body text-sm text-center ${
                    isPassed ? "text-accent-sage" : "text-primary-dark"
                  }`}>
                    {mounted ? formatTime(prayer.athan) : "--:--"}
                  </span>
                  
                  {/* Iqama Time */}
                  <span className={`font-body text-sm font-medium text-center ${
                    isNext ? "text-primary-green" : "text-primary-green/70"
                  }`}>
                    {mounted ? formatTime(prayer.iqama) : "--:--"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-light-sage/30 w-full">
            <p className="font-body text-[10px] text-accent-sage text-center">
              Masjid Al-Quba • Buford, GA • ISNA Calculation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
