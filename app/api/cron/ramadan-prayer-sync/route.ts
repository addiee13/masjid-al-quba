import { NextRequest, NextResponse } from "next/server";
import { syncRamadanPrayerSchedule } from "@/lib/ramadan-prayer-sync";

export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("CRON_SECRET is not configured");
    return false;
  }

  return request.headers.get("authorization") === `Bearer ${cronSecret}`;
}

async function handleSync(request: NextRequest, force: boolean) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const result = await syncRamadanPrayerSchedule({ force });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Ramadan prayer sync failed:", error);
    return NextResponse.json(
      { ok: false, error: "Ramadan prayer sync failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return handleSync(request, false);
}

export async function POST(request: NextRequest) {
  return handleSync(request, true);
}
