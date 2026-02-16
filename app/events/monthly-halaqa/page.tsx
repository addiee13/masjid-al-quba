import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookHeart, Users, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Monthly Halaqah | Masjid Al-Quba",
  description:
    "Join the Monthly Halaqah at Masjid Al-Quba for reflection, reminders, and community connection.",
};

const halaqahHighlights = [
  {
    title: "Faith-Centered Reflection",
    description:
      "Reconnect with core Islamic principles through meaningful reminders that renew intention.",
    icon: BookHeart,
  },
  {
    title: "Community Bonding",
    description:
      "Build stronger ties with fellow community members in a warm and welcoming environment.",
    icon: Users,
  },
  {
    title: "Practical Spiritual Growth",
    description:
      "Take away insights that can be practiced in daily life with sincerity and consistency.",
    icon: Sparkles,
  },
];

export default function MonthlyHalaqaPage() {
  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
        <div className="absolute inset-0 pattern-bg opacity-60" />
        <div className="absolute -top-12 right-0 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 border border-black/5 mb-6 text-sm font-body text-primary-dark">
            Monthly Gathering
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-dark mb-6">
            Monthly Halaqah
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">
            A recurring gathering for reflection, beneficial reminders, and
            strengthening faith through shared learning.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10 text-center decorative-line decorative-line-center">
            Why Attend the Halaqah
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {halaqahHighlights.map((item) => (
              <div key={item.title} className="card-elevated p-7 h-full border-t-4 border-primary-green">
                <item.icon className="w-8 h-8 text-primary-green mb-4" />
                <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-bg-beige">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-elevated p-8 md:p-10 border-l-4 border-primary-green">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4 decorative-line">
              What to Expect
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-5">
              Monthly Halaqah sessions are designed to be spiritually uplifting,
              practical, and community-centered. You can expect reminders that
              nurture the heart and support daily faith practice.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              For current session details, topics, and participation updates,
              please contact us or check the upcoming events list.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Want to Join the Next Halaqah?
          </h2>
          <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-95 font-body">
            Reach out for upcoming monthly session details and community updates.
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
