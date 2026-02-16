import { Metadata } from "next";
import Link from "next/link";
import ValueCard from "@/components/education/ValueCard";
import EducationCTA from "@/components/education/EducationCTA";
import { ArrowRight, BookOpen, Compass, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Education Programs | Masjid Al-Quba",
  description:
    "Explore education opportunities at Masjid Al-Quba centered on authentic knowledge, spiritual growth, and community learning.",
};

const learningValues = [
  {
    title: "Authentic Knowledge",
    description:
      "Our approach emphasizes learning rooted in the Quran and Sunnah, helping students build sound understanding and practice.",
  },
  {
    title: "Character Development",
    description:
      "Education is not only information. It is tarbiyah that strengthens adab, sincerity, responsibility, and service to others.",
  },
  {
    title: "Lifelong Growth",
    description:
      "Programs are designed to keep hearts connected to beneficial knowledge at every stage of life, from youth to adults.",
  },
];

const programs = [
  {
    title: "Quran & Islamic School",
    description:
      "A structured environment focused on Quran connection, core Islamic understanding, and character development.",
    idealFor: "Children, youth, and families seeking foundational learning",
    href: "/education/quran-school",
  },
  {
    title: "Sunday School",
    description:
      "A foundational learning environment that nurtures Islamic identity, love for worship, and good character.",
    idealFor: "Families looking for regular, value-centered Islamic learning",
    href: "/education/sunday-school",
  },
  {
    title: "Weekly Tafsir",
    description:
      "A regular space to reflect on the meanings of the Quran and connect revelation to daily life with clarity and purpose.",
    idealFor: "Community members seeking deeper Quran reflection and guidance",
    href: "/education/weekly-tafsir",
  },
];

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
        <div className="absolute inset-0 pattern-bg opacity-60" />
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary-green/10 blur-2xl" />
        <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-accent-olive/10 blur-2xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 border border-black/5 mb-6">
            <BookOpen className="w-4 h-4 text-primary-green" />
            <span className="font-body text-sm text-primary-dark">
              Beneficial Learning for Every Stage of Life
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-dark mb-6">
            Education at Masjid Al-Quba
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed mb-8">
            We strive to cultivate faith, understanding, and character through
            authentic knowledge rooted in the Quran and Sunnah.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/education/quran-school" className="btn-primary inline-flex items-center gap-2">
              Explore Programs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact?topic=education" className="btn-secondary">
              Contact for Guidance
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10 text-center decorative-line decorative-line-center">
            Why Learning Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningValues.map((value) => (
              <ValueCard
                key={value.title}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-bg-beige">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10 text-center">
            Program Highlights
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div key={program.title} className="card-elevated p-8 h-full">
                <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                  {program.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-6">
                  {program.description}
                </p>
                <p className="font-body text-sm text-primary-dark/90 bg-white rounded-lg p-3 mb-6">
                  <span className="font-semibold">Ideal for:</span> {program.idealFor}
                </p>
                <Link href={program.href} className="btn-secondary inline-flex items-center gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-primary-dark to-primary-green p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-8 text-center">
              A Path of Growth
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
              <div className="bg-white/10 border border-white/15 rounded-2xl p-5">
                <BookOpen className="w-6 h-6 text-white mx-auto mb-3" />
                <h3 className="font-heading text-xl font-semibold text-white mb-2">Learn</h3>
                <p className="font-body text-white/85 text-sm">
                  Build understanding through authentic, beneficial knowledge.
                </p>
              </div>
              <div className="bg-white/10 border border-white/15 rounded-2xl p-5">
                <Compass className="w-6 h-6 text-white mx-auto mb-3" />
                <h3 className="font-heading text-xl font-semibold text-white mb-2">Reflect</h3>
                <p className="font-body text-white/85 text-sm">
                  Connect learning to your life with intention and sincerity.
                </p>
              </div>
              <div className="bg-white/10 border border-white/15 rounded-2xl p-5">
                <Sparkles className="w-6 h-6 text-white mx-auto mb-3" />
                <h3 className="font-heading text-xl font-semibold text-white mb-2">Practice</h3>
                <p className="font-body text-white/85 text-sm">
                  Grow in worship, character, and service to the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EducationCTA
        title="Not Sure Where to Begin?"
        description="Reach out and we will help you choose the best education path for you or your family."
      />
    </div>
  );
}
