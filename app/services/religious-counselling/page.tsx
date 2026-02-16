import { Metadata } from "next";
import { HeartHandshake, Shield, CheckCircle } from "lucide-react";
import ReligiousCounsellingForm from "@/components/services/ReligiousCounsellingForm";
import CounsellingSupportSection from "@/components/services/CounsellingSupportSection";

export const metadata: Metadata = {
  title: "Religious Counselling & Guidance | Masjid Al-Quba",
  description:
    "Receive faith-based guidance for personal, spiritual, or family challenges from our Imam at Masjid Al-Quba in Sugar Hill, Georgia.",
};

export default function ReligiousCounsellingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
      {/* Main Content Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Info + Image */}
            <div className="space-y-8">
              {/* Heading */}
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark">
                Religious Counselling & Guidance
              </h1>

              {/* Paragraph */}
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                If you are facing personal, spiritual, or family challenges, our
                imam is here to provide faith-based guidance in a respectful and
                private setting.
              </p>

              {/* Highlight Chips */}
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 backdrop-blur-sm border border-black/5 shadow-sm">
                  <Shield className="w-4 h-4 text-emerald-600" strokeWidth={2} />
                  <span className="text-sm font-medium text-primary-dark">
                    Private & Respectful
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 backdrop-blur-sm border border-black/5 shadow-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600" strokeWidth={2} />
                  <span className="text-sm font-medium text-primary-dark">
                    Faith-Based Guidance
                  </span>
                </div>
              </div>

              {/* Image Placeholder */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-gradient-to-br from-emerald-600 via-emerald-700 to-primary-dark flex items-center justify-center group">
                {/* Decorative circles */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                
                {/* Icon */}
                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                  <HeartHandshake className="w-24 h-24 md:w-32 md:h-32 text-white/90" strokeWidth={1.5} />
                </div>

                {/* Pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_50%)]" />
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:sticky lg:top-24">
              <ReligiousCounsellingForm />
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-primary-dark/10 to-transparent" />
      </div>

      {/* Support Cards Section */}
      <CounsellingSupportSection />
    </div>
  );
}
