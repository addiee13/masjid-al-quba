import { Metadata } from "next";
import { BookOpenCheck, Compass, Sparkles, Sunrise } from "lucide-react";
import EducationCTA from "@/components/education/EducationCTA";

export const metadata: Metadata = {
  title: "Weekly Tafsir | Masjid Al-Quba",
  description:
    "Learn about Weekly Tafsir at Masjid Al-Quba and the value of regularly reflecting on the meanings of the Quran.",
};

export default function WeeklyTafsirPage() {
  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-primary-dark via-[#37493f] to-primary-green">
        <div className="absolute inset-0 pattern-bg opacity-25" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/15 border border-white/20 mb-6">
            <BookOpenCheck className="w-4 h-4 text-white" />
            <span className="font-body text-sm text-white">
              Reflecting on the Quran With Purpose
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            Weekly Tafsir
          </h1>
          <p className="text-lg md:text-xl text-white/85 font-body max-w-3xl mx-auto leading-relaxed">
            A regular opportunity to deepen your relationship with the Quran
            through understanding, reflection, and sincere application.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10 text-center decorative-line decorative-line-center">
            Why Tafsir Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-elevated p-7 border-t-4 border-primary-green">
              <Compass className="w-8 h-8 text-primary-green mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                Understanding Meaning
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Move beyond recitation into deeper awareness of the message and
                wisdom of the Quran.
              </p>
            </div>
            <div className="card-elevated p-7 border-t-4 border-primary-green">
              <Sunrise className="w-8 h-8 text-primary-green mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                Daily Guidance
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Connect timeless revelation to real-life decisions with clarity,
                patience, and balance.
              </p>
            </div>
            <div className="card-elevated p-7 border-t-4 border-primary-green">
              <Sparkles className="w-8 h-8 text-primary-green mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                Spiritual Renewal
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Strengthen iman through regular reflection in a sincere and
                uplifting community setting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-bg-beige">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-8 decorative-line">
            Reflection Into Daily Life
          </h2>
          <div className="space-y-4 mb-8">
            <div className="card-elevated p-6 border-l-4 border-primary-green">
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-2">
                From Recitation to Reflection
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Learn how Quranic meanings shape mindset, behavior, and daily
                priorities with greater intention.
              </p>
            </div>
            <div className="card-elevated p-6 border-l-4 border-primary-green">
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-2">
                From Reflection to Practice
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Turn understanding into action through consistency, sincerity,
                and community encouragement.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card p-4 text-center">
              <p className="font-body text-sm text-primary-dark">Consistency in Learning</p>
            </div>
            <div className="card p-4 text-center">
              <p className="font-body text-sm text-primary-dark">Clarity and Perspective</p>
            </div>
            <div className="card p-4 text-center">
              <p className="font-body text-sm text-primary-dark">Shared Spiritual Growth</p>
            </div>
          </div>
        </div>
      </section>

      <EducationCTA
        title="Interested in Weekly Tafsir?"
        description="Contact us for current details, and we will help you connect with the learning circle."
      />
    </div>
  );
}
