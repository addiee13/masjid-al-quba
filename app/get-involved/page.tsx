import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HandHeart, HeartHandshake, UsersRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Get Involved | Masjid Al-Quba",
  description:
    "Get involved with Masjid Al-Quba through volunteering, outreach, and community support.",
};

const involvementOptions = [
  {
    title: "Volunteer",
    description:
      "Join hands-on service opportunities that support programs, events, and outreach missions.",
    href: "/get-involved/volunteer",
    icon: UsersRound,
  },
  {
    title: "Support Outreach",
    description:
      "Help expand community outreach and dawa initiatives through your time and effort.",
    href: "/services/outreach-dawa",
    icon: HeartHandshake,
  },
  {
    title: "Donate",
    description:
      "Contribute financially to sustain services and strengthen impactful community work.",
    href: "/donate",
    icon: HandHeart,
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
        <div className="absolute inset-0 pattern-bg opacity-60" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 border border-black/5 mb-6 text-sm font-body text-primary-dark">
            Give Back to the Community
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-dark mb-6">
            Get Involved
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">
            There are many ways to support Masjid Al-Quba. Serve with your time,
            skills, and resources to strengthen our community together.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10 text-center decorative-line decorative-line-center">
            Ways to Contribute
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {involvementOptions.map((option) => (
              <Link key={option.title} href={option.href} className="group card-elevated p-8 h-full">
                <option.icon className="w-9 h-9 text-primary-green mb-4" />
                <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                  {option.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-5">
                  {option.description}
                </p>
                <span className="font-body text-primary-green font-medium inline-flex items-center gap-2">
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HeartHandshake className="w-10 h-10 mx-auto mb-5 text-white/90" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Start Serving Today
          </h2>
          <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-95 font-body">
            Reach out and tell us how you would like to help. We will connect
            you with the right opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-involved/volunteer"
              className="bg-white text-primary-green font-body font-semibold rounded-full px-8 py-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              View Volunteer Opportunities
            </Link>
            <Link
              href="/contact?topic=volunteering"
              className="border-2 border-white text-white font-body font-semibold rounded-full px-8 py-3 hover:bg-white hover:text-primary-green transition-all duration-300"
            >
              Contact the Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
