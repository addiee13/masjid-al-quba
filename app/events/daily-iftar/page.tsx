import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock3, Utensils } from "lucide-react";

export const metadata: Metadata = {
  title: "Daily Iftar | Masjid Al-Quba",
  description: "Join Masjid Al-Quba for daily iftar and evening prayers during Ramadan.",
};

export default function DailyIftarPage() {
  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
        <div className="absolute inset-0 pattern-bg opacity-60" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 border border-black/5 mb-6 text-sm font-body text-primary-dark">
            <Utensils className="w-4 h-4 text-primary-green" />
            Ramadan Community Program
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-dark mb-6">
            Daily Iftar at Masjid Al-Quba
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">
            Join us each evening for iftar, dinner, and congregational prayers in a welcoming community atmosphere.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-elevated p-7 md:p-9">
            <h2 className="font-heading text-3xl font-bold text-primary-dark mb-5">
              Program details
            </h2>
            <div className="space-y-4 font-body text-primary-dark/90">
              <p className="inline-flex items-start gap-2">
                <CalendarDays className="w-4 h-4 mt-1 text-primary-green" />
                Daily throughout Ramadan
              </p>
              <p className="inline-flex items-start gap-2">
                <Clock3 className="w-4 h-4 mt-1 text-primary-green" />
                Iftar begins at Maghrib time (please arrive a little early)
              </p>
              <p className="inline-flex items-start gap-2">
                <Utensils className="w-4 h-4 mt-1 text-primary-green" />
                Iftar and dinner are served for all community members
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/ramadan" className="btn-secondary inline-block">
                View Ramadan Timetable
              </Link>
              <Link href="/contact" className="btn-primary inline-block">
                Contact for Questions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
