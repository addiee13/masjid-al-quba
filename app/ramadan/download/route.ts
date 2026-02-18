import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const imagePath = join(process.cwd(), "public", "ramadan", "timetable-2026.jpg");

  if (!existsSync(imagePath)) {
    return NextResponse.json({ error: "Timetable image not found." }, { status: 404 });
  }

  const imageBuffer = await readFile(imagePath);

  return new NextResponse(imageBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Disposition": 'attachment; filename="Masjid-Al-Quba-Ramadan-Timetable-2026.jpg"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
