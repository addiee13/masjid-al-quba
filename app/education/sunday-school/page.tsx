import { Metadata } from "next";
import { BadgeCheck, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import EducationCTA from "@/components/education/EducationCTA";

export const metadata: Metadata = {
  title: "Sunday School | Masjid Al-Quba",
  description:
    "Learn about Sunday School at Masjid Al-Quba and how it helps build a strong Islamic foundation for youth and families.",
};

export default function SundaySchoolPage() {
  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
        <div className="absolute inset-0 pattern-bg opacity-60" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-green/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 border border-black/5 mb-6">
            <Users className="w-4 h-4 text-primary-green" />
            <span className="font-body text-sm text-primary-dark">
              Faith and Character for the Next Generation
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-dark mb-6">
            Sunday School
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">
            A nurturing learning space that helps children and families grow in
            Islamic identity, adab, and connection to beneficial knowledge.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10 text-center decorative-line decorative-line-center">
            Three Core Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-elevated p-7 border-t-4 border-primary-green">
              <HeartHandshake className="w-8 h-8 text-primary-green mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                Faith Foundations
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Build love for worship and a clear connection to Islamic values
                through consistent reminders.
              </p>
            </div>
            <div className="card-elevated p-7 border-t-4 border-primary-green">
              <ShieldCheck className="w-8 h-8 text-primary-green mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                Adab and Character
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Encourage respect, sincerity, and responsibility in how students
                relate to Allah, family, and community.
              </p>
            </div>
            <div className="card-elevated p-7 border-t-4 border-primary-green">
              <BadgeCheck className="w-8 h-8 text-primary-green mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                Community Belonging
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Create a welcoming masjid environment where students build
                confidence, friendship, and positive identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-bg-beige">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-8 decorative-line">
            What Families Can Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <p className="font-body text-muted-foreground leading-relaxed">
                A respectful and supportive setting centered on authentic
                Islamic learning.
              </p>
            </div>
            <div className="card p-6">
              <p className="font-body text-muted-foreground leading-relaxed">
                Age-appropriate reminders that encourage reflection, practice,
                and good manners.
              </p>
            </div>
            <div className="card p-6">
              <p className="font-body text-muted-foreground leading-relaxed">
                A steady path for children to develop confidence in their
                Muslim identity.
              </p>
            </div>
            <div className="card p-6">
              <p className="font-body text-muted-foreground leading-relaxed">
                A family-centered culture where learning and growth are
                supported together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EducationCTA
        title="Interested in Sunday School?"
        description="Contact us for current participation details, and we will guide your family on next steps."
      />
    </div>
  );
}
