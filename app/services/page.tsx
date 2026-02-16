import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HandHeart, Heart, Hand, MessageCircleQuestion, Sparkles, BookMarked } from "lucide-react";

export const metadata: Metadata = {
  title: "Services | Masjid Al-Quba",
  description: "Explore community and support services offered at Masjid Al-Quba.",
};

const communityServices = [
  {
    title: "Zakat",
    description: "Fulfill your obligation and support those in need with dignity and care.",
    href: "/services/zakat",
    icon: HandHeart,
  },
  {
    title: "Sadaqah",
    description: "Give voluntary charity to strengthen programs and serve the wider community.",
    href: "/services/sadaqah",
    icon: Heart,
  },
  {
    title: "Outreach / Dawa",
    description: "Support local outreach efforts that share beneficial knowledge and community service.",
    href: "/services/outreach-dawa",
    icon: Sparkles,
  },
];

const supportServices = [
  {
    title: "Juma Dua Request",
    description: "Submit a dua request for inclusion in Friday prayers.",
    href: "/services/juma-dua-request",
    icon: Hand,
  },
  {
    title: "Ask Imam",
    description: "Submit Islamic questions and receive guidance from the Imam.",
    href: "/services/ask-imam",
    icon: MessageCircleQuestion,
  },
  {
    title: "Religious Counselling",
    description: "Request private faith-based counselling and personal guidance.",
    href: "/services/religious-counselling",
    icon: BookMarked,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
        <div className="absolute inset-0 pattern-bg opacity-60" />
        <div className="absolute -top-10 -right-8 w-52 h-52 rounded-full bg-primary-green/10 blur-2xl" />
        <div className="absolute -bottom-14 -left-8 w-56 h-56 rounded-full bg-accent-olive/10 blur-2xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 border border-black/5 mb-6 text-sm font-body text-primary-dark">
            Community Care and Faith-Based Support
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-dark mb-6">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">
            From charitable giving to personal guidance, Masjid Al-Quba offers
            services that strengthen faith, family, and community.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10 text-center decorative-line decorative-line-center">
            Community Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {communityServices.map((service) => (
              <Link key={service.title} href={service.href} className="group card-elevated p-8 h-full">
                <service.icon className="w-9 h-9 text-primary-green mb-4" />
                <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-5">
                  {service.description}
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

      <section className="py-16 md:py-20 bg-bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10 text-center decorative-line decorative-line-center">
            Support Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {supportServices.map((service) => (
              <Link key={service.title} href={service.href} className="group card-elevated p-8 h-full">
                <service.icon className="w-9 h-9 text-primary-green mb-4" />
                <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-5">
                  {service.description}
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
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Need Help Choosing the Right Service?
          </h2>
          <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-95 font-body">
            Contact us and we will guide you to the service that best fits your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-primary-green font-body font-semibold rounded-full px-8 py-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Contact Us
            </Link>
            <Link href="/volunteer" className="border-2 border-white text-white font-body font-semibold rounded-full px-8 py-3 hover:bg-white hover:text-primary-green transition-all duration-300">
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
