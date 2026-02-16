import { Metadata } from "next";
import { Heart } from "lucide-react";
import JumaDuaForm from "@/components/services/JumaDuaForm";
import WhatHappensNext from "@/components/services/WhatHappensNext";

export const metadata: Metadata = {
  title: "Juma Dua Request | Masjid Al-Quba",
  description:
    "Submit your dua requests for Friday prayers at Masjid Al-Quba in Buford, Georgia.",
};

export default function JumaDuaRequestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
      {/* Main Content Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left Column: Image + Info */}
            <div className="space-y-8">
              {/* Image Placeholder */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3] bg-gradient-to-br from-primary-green via-accent-olive to-primary-dark flex items-center justify-center group">
                {/* Decorative circles */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                
                {/* Icon */}
                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                  <Heart className="w-24 h-24 md:w-32 md:h-32 text-white/90" strokeWidth={1.5} />
                </div>

                {/* Pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_50%)]" />
              </div>

              {/* Intro Text */}
              <div className="space-y-4">
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark">
                  Submit a Juma Dua Request
                </h1>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  At Masjid Al-Quba, we welcome you to share your dua requests
                  for our Friday (Jumu&apos;ah) prayers. Whether you are asking for
                  healing, guidance, ease, or blessings for yourself or a loved
                  one—please submit your request below. May Allah accept your
                  duas.
                </p>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:sticky lg:top-24">
              <JumaDuaForm />
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-primary-dark/10 to-transparent" />
      </div>

      {/* What Happens Next Section */}
      <WhatHappensNext />
    </div>
  );
}
