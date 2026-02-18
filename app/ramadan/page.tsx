import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { existsSync } from "fs";
import { join } from "path";
import { CalendarDays, Download, ExternalLink, FileText, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Ramadan Timetable | Masjid Al-Quba",
  description: "Ramadan prayer times, iftar info, and community reminders at Masjid Al-Quba.",
};

export default function RamadanPage() {
  const pdfPath = join(process.cwd(), "public", "ramadan", "timetable-2026.pdf");
  const hasPdf = existsSync(pdfPath);

  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
        <div className="absolute inset-0 pattern-bg opacity-60" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 border border-black/5 mb-6 text-sm font-body text-primary-dark">
            <CalendarDays className="w-4 h-4 text-primary-green" />
            Ramadan 2026
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-dark mb-6">
            Ramadan at Masjid Al-Quba
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">
            Prayer times, iftar info, and community reminders.
          </p>
          <p className="mt-5 font-body text-primary-dark/90">
            May Allah accept your fasting and عبادات.
          </p>
        </div>
      </section>

      <section className="pb-10 md:pb-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-elevated p-4 md:p-6">
            <div className="mx-auto max-w-4xl rounded-2xl overflow-hidden border border-light-sage/40 shadow-md shadow-primary-dark/10">
              <Image
                src="/ramadan/timetable-2026.jpg"
                alt="Masjid Al-Quba Ramadan Prayer Timings 2026 timetable"
                width={1400}
                height={2000}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3 justify-center">
              <a
                href="/ramadan/download"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Image
              </a>
              <a
                href="/ramadan/timetable-2026.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open Full Size
              </a>
              {hasPdf && (
                <a
                  href="/ramadan/timetable-2026.pdf"
                  download
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Download PDF
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-6 md:p-8">
            <h2 className="font-heading text-3xl font-bold text-primary-dark mb-5 inline-flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-green" />
              Quick reminders
            </h2>
            <ul className="space-y-3 list-disc pl-6 font-body text-primary-dark/90">
              <li>Please arrive early for Jama&apos;ah - especially Maghrib.</li>
              <li>Iftar &amp; dinner served daily. All community members are welcome.</li>
              <li>If you have questions, reach out on our Contact page.</li>
            </ul>
            <div className="mt-7">
              <div className="flex flex-wrap gap-3">
                <Link href="/events/daily-iftar" className="btn-secondary inline-block">
                  Go to Daily Iftar Event
                </Link>
                <Link href="/contact" className="btn-primary inline-block">
                Contact the Masjid
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
