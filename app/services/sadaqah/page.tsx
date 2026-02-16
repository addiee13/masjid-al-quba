import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Sparkles, HandCoins } from "lucide-react";

export const metadata: Metadata = {
  title: "Sadaqah | Masjid Al-Quba",
  description:
    "Give voluntary charity (Sadaqah) to support Masjid Al-Quba and our community programs.",
};

export default function SadaqahPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 pattern-bg opacity-60" />
        <div className="absolute -top-8 -right-8 w-60 h-60 bg-primary-green/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 border border-black/5 mb-6 text-sm font-body text-primary-dark">
            Voluntary Charity
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-dark mb-6">
            Sadaqah
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">
            Sadaqah is an open door to compassion and reward, given at any time
            to benefit others and seek Allah&apos;s pleasure.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://square.link/u/RveBuPCI"
              target="_blank"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Give Sadaqah Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="btn-secondary inline-flex items-center justify-center"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10 text-center decorative-line decorative-line-center">
            The Impact of Sadaqah
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-elevated p-7 h-full border-t-4 border-primary-green">
              <Heart className="w-8 h-8 text-primary-green mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                Given with Compassion
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Sadaqah reflects mercy and generosity toward those facing hardship.
              </p>
            </div>
            <div className="card-elevated p-7 h-full border-t-4 border-primary-green">
              <Sparkles className="w-8 h-8 text-primary-green mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                Brings Barakah
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Charity purifies wealth and invites blessings in this life and the
                Hereafter.
              </p>
            </div>
            <div className="card-elevated p-7 h-full border-t-4 border-primary-green">
              <HandCoins className="w-8 h-8 text-primary-green mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                Supports Community Needs
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Your support helps sustain programs, services, and outreach
                efforts that benefit families.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-bg-beige">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-elevated p-8 md:p-10 border-l-4 border-primary-green">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4 decorative-line">
              Support Our Programs
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              Your Sadaqah helps support educational programs, community
              services, facility upkeep, and outreach initiatives at Masjid
              Al-Quba.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Any amount can make a meaningful difference and contributes to
              continuous benefit for the community.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Give Sadaqah Today
          </h2>
          <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-95 font-body">
            Donate securely online and support ongoing community benefit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://square.link/u/RveBuPCI"
              target="_blank"
              className="bg-white text-primary-green font-body font-semibold rounded-full px-8 py-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Give Sadaqah Online
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white font-body font-semibold rounded-full px-8 py-3 hover:bg-white hover:text-primary-green transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
