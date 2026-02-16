import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, HandHeart, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Zakat | Masjid Al-Quba",
  description:
    "Learn about Zakat and how to fulfill your obligation at Masjid Al-Quba.",
};

export default function ZakatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 pattern-bg opacity-60" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 border border-black/5 mb-6 text-sm font-body text-primary-dark">
            Obligatory Charity
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-dark mb-6">
            Zakat
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">
            Zakat is a pillar of Islam that purifies wealth and supports those in
            need with dignity and justice.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://square.link/u/RveBuPCI"
              target="_blank"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Give Zakat Now
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
            Why Zakat Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-elevated p-7 h-full border-t-4 border-primary-green">
              <HandHeart className="w-8 h-8 text-primary-green mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                Purifies Wealth
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Zakat purifies one&apos;s wealth and nurtures gratitude through
                responsible giving.
              </p>
            </div>
            <div className="card-elevated p-7 h-full border-t-4 border-primary-green">
              <ShieldCheck className="w-8 h-8 text-primary-green mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                Supports the Needy
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                It provides structured support to those eligible, strengthening
                fairness and compassion in the community.
              </p>
            </div>
            <div className="card-elevated p-7 h-full border-t-4 border-primary-green">
              <Calculator className="w-8 h-8 text-primary-green mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                Calculated with Care
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Accurate calculation ensures your obligation is fulfilled according
                to Islamic principles.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-bg-beige">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-elevated p-8 md:p-10 mb-6 border-l-4 border-primary-green">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-5 decorative-line">
              Calculate Your Zakat
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-5">
              Use these trusted resources to calculate your Zakat accurately:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://islamic-relief.org/zakat-calculator/"
                target="_blank"
                rel="noopener noreferrer"
                className="card p-5 hover:border-primary-green/30 border border-black/5"
              >
                <h3 className="font-heading text-xl font-semibold text-primary-dark mb-2">
                  Islamic Relief Calculator
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  A trusted tool to help estimate your annual Zakat obligation.
                </p>
              </a>
              <a
                href="https://zakat.fyi/"
                target="_blank"
                rel="noopener noreferrer"
                className="card p-5 hover:border-primary-green/30 border border-black/5"
              >
                <h3 className="font-heading text-xl font-semibold text-primary-dark mb-2">
                  Zakat.fyi Calculator
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  A practical calculator for personal wealth and Zakat planning.
                </p>
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-primary-green/10 border border-primary-green/20 p-5">
            <p className="font-body text-primary-dark leading-relaxed">
              <strong>Reminder:</strong> If you need help with your calculation,
              contact us for guidance before making your payment.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Fulfill Your Zakat
          </h2>
          <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-95 font-body">
            Give your Zakat securely online or contact us for assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://square.link/u/RveBuPCI"
              target="_blank"
              className="bg-white text-primary-green font-body font-semibold rounded-full px-8 py-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Give Zakat Online
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
