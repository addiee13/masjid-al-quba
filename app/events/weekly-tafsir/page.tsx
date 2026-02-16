import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Compass, Sunrise } from "lucide-react";

export const metadata: Metadata = {
  title: "Weekly Tafsir Program | Masjid Al-Quba",
  description:
    "Learn about the Weekly Tafsir program at Masjid Al-Quba and join ongoing Quran reflection sessions.",
};

const programPillars = [
  {
    title: "Quranic Understanding",
    description:
      "Go beyond recitation and engage with meanings that build clarity and conviction.",
    icon: BookOpenCheck,
  },
  {
    title: "Guidance for Daily Life",
    description:
      "Connect Quranic teachings to real-life responsibilities, relationships, and decisions.",
    icon: Compass,
  },
  {
    title: "Consistent Spiritual Renewal",
    description:
      "Benefit from regular reminders that nurture faith and strengthen sincere practice.",
    icon: Sunrise,
  },
];

export default function WeeklyTafsirEventPage() {
  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-primary-dark via-[#37493f] to-primary-green">
        <div className="absolute inset-0 pattern-bg opacity-25" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/15 border border-white/20 mb-6 text-sm font-body text-white">
            Weekly Program
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            Weekly Tafsir
          </h1>
          <p className="text-lg md:text-xl text-white/85 font-body max-w-3xl mx-auto leading-relaxed">
            A recurring program dedicated to understanding the Quran and
            applying its guidance with sincerity and purpose.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10 text-center decorative-line decorative-line-center">
            Program Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programPillars.map((pillar) => (
              <div key={pillar.title} className="card-elevated p-7 h-full border-t-4 border-primary-green">
                <pillar.icon className="w-8 h-8 text-primary-green mb-4" />
                <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                  {pillar.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-bg-beige">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-elevated p-8 border-l-4 border-primary-green">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4 decorative-line">
                Why It Matters
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                Regular tafsir learning strengthens understanding, builds
                perspective, and helps translate revelation into intentional
                daily living.
              </p>
            </div>
            <div className="card p-8">
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-4">
                Who This Is For
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed mb-3">
                Community members who want consistent Quran reflection in a
                welcoming, growth-oriented setting.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Contact us for current session details and participation info.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Join the Weekly Tafsir Program
          </h2>
          <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-95 font-body">
            Reach out for the latest weekly session details and upcoming topics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events" className="bg-white text-primary-green font-body font-semibold rounded-full px-8 py-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2">
              View All Events
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="border-2 border-white text-white font-body font-semibold rounded-full px-8 py-3 hover:bg-white hover:text-primary-green transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
