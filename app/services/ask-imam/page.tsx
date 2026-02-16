import { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import AskImamForm from "@/components/services/AskImamForm";
import HowItWorksSection from "@/components/services/HowItWorksSection";

export const metadata: Metadata = {
  title: "Ask the Imam | Masjid Al-Quba",
  description:
    "Submit your religious questions and receive guidance from our Imam at Masjid Al-Quba in Buford, Georgia.",
};

export default function AskImamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
      {/* Main Content Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Image + Info */}
            <div className="space-y-8">
              {/* Image Placeholder */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3] bg-gradient-to-br from-emerald-600 via-emerald-700 to-primary-dark flex items-center justify-center group">
                {/* Decorative circles */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                
                {/* Icon */}
                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                  <MessageCircle className="w-24 h-24 md:w-32 md:h-32 text-white/90" strokeWidth={1.5} />
                </div>

                {/* Pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_50%)]" />
              </div>

              {/* Intro Text */}
              <div className="space-y-4">
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark">
                  Ask the Imam
                </h1>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  Have a religious question and need guidance? Submit your
                  question below and our Imam will respond, inshaAllah. Please
                  include enough context for a helpful answer.
                </p>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:sticky lg:top-24">
              <AskImamForm />
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-primary-dark/10 to-transparent" />
      </div>

      {/* How It Works Section */}
      <HowItWorksSection />
    </div>
  );
}
