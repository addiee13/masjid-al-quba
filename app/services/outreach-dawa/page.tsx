import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Handshake, Megaphone, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Outreach and Dawa | Masjid Al-Quba",
  description:
    "Explore Masjid Al-Quba outreach efforts and see moments from past missions. Join us by volunteering for upcoming initiatives.",
};

const missionValues = [
  {
    title: "Serve with Compassion",
    description:
      "Outreach is about meeting people with kindness, dignity, and practical support.",
    icon: Handshake,
  },
  {
    title: "Share Beneficial Knowledge",
    description:
      "Dawa connects hearts to truth through wisdom, clarity, and respectful dialogue.",
    icon: Megaphone,
  },
  {
    title: "Build Community Bridges",
    description:
      "We strengthen relationships and trust through consistent local engagement.",
    icon: Users,
  },
];

const galleryImages = [
  { src: "/outreach_1.jpeg", alt: "Community outreach mission moment one" },
  { src: "/outreach_2.jpeg", alt: "Community outreach mission moment two" },
  { src: "/outreach_3.jpeg", alt: "Community outreach mission moment three" },
];

export default function OutreachDawaPage() {
  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
        <div className="absolute inset-0 pattern-bg opacity-60" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 border border-black/5 mb-6 text-sm font-body text-primary-dark">
            Outreach and Dawa
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-dark mb-6">
            Serving Beyond Our Walls
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">
            Our outreach efforts are grounded in service, sincerity, and
            meaningful community connection through action and character.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10 text-center decorative-line decorative-line-center">
            Our Outreach Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {missionValues.map((value) => (
              <div key={value.title} className="card-elevated p-7 h-full border-t-4 border-primary-green">
                <value.icon className="w-8 h-8 text-primary-green mb-4" />
                <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                  {value.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10 text-center">
            Moments from Previous Missions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.src}
                className={`relative overflow-hidden rounded-2xl shadow-lg border border-black/5 ${
                  index === 1 ? "md:-mt-6" : ""
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={900}
                  className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Join Our Outreach Efforts
          </h2>
          <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-95 font-body">
            If you want to support future missions and serve the community, we
            welcome your time and skills.
          </p>
          <div className="flex justify-center">
            <Link
              href="/volunteer"
              className="bg-white text-primary-green font-body font-semibold rounded-full px-8 py-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2"
            >
              Volunteer With Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
