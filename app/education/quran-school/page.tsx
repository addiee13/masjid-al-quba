import { Metadata } from "next";
import { BookOpenText, Heart, School, ShieldCheck } from "lucide-react";
import EducationCTA from "@/components/education/EducationCTA";

export const metadata: Metadata = {
  title: "Quran & Islamic School | Masjid Al-Quba",
  description:
    "Learn about Quran and Islamic School at Masjid Al-Quba focused on foundational knowledge, Quran connection, and character growth.",
};

const focusAreas = [
  {
    title: "Quran Connection",
    description:
      "Strengthen love for the Quran through consistent engagement and meaningful reminders.",
    icon: BookOpenText,
  },
  {
    title: "Islamic Foundations",
    description:
      "Build clear understanding of essential Islamic principles in a supportive setting.",
    icon: School,
  },
  {
    title: "Character and Adab",
    description:
      "Develop good manners, sincerity, and responsibility as core parts of learning.",
    icon: ShieldCheck,
  },
];

const outcomes = [
  "Stronger Islamic identity and confidence",
  "Consistent connection with beneficial knowledge",
  "Improved spiritual awareness and daily practice",
  "A positive learning culture rooted in adab",
];

export default function QuranSchoolPage() {
  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
        <div className="absolute inset-0 pattern-bg opacity-60" />
        <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-primary-green/10 blur-2xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 border border-black/5 mb-6">
            <Heart className="w-4 h-4 text-primary-green" />
            <span className="font-body text-sm text-primary-dark">
              Quran-Centered and Character-Focused Learning
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-dark mb-6">
            Quran and Islamic School
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">
            A structured learning space that supports understanding, spiritual
            growth, and strong Muslim identity for students and families.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10 text-center decorative-line decorative-line-center">
            Program Focus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {focusAreas.map((area) => (
              <div key={area.title} className="card-elevated p-7 border-t-4 border-primary-green">
                <area.icon className="w-8 h-8 text-primary-green mb-4" />
                <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                  {area.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-bg-beige">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="card-elevated p-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4 decorative-line">
                Why It Matters
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                Islamic education is more than information. It cultivates
                understanding, builds conviction, and shapes daily life with
                sincerity. The goal is to nurture balanced Muslims who are
                connected to Allah and beneficial to their community.
              </p>
            </div>
            <div className="card p-8">
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-4">
                What This Helps With
              </h3>
              <ul className="space-y-3">
                {outcomes.map((outcome) => (
                  <li key={outcome} className="font-body text-muted-foreground leading-relaxed">
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <EducationCTA
        title="Interested in Quran and Islamic School?"
        description="Contact us for current details and we will help you find the right path for your family."
      />
    </div>
  );
}
