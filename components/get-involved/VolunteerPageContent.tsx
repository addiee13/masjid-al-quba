import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake, HandHelping, Users } from "lucide-react";

const volunteerAreas = [
  {
    title: "Outreach Missions",
    description:
      "Support community-facing service projects and help represent the masjid with compassion.",
    icon: HeartHandshake,
  },
  {
    title: "Program Support",
    description:
      "Assist with setup, coordination, and logistics for classes, events, and gatherings.",
    icon: HandHelping,
  },
  {
    title: "Community Engagement",
    description:
      "Welcome families, help newcomers, and strengthen the sense of belonging in the community.",
    icon: Users,
  },
];

const galleryImages = [
  { src: "/outreach_4.jpeg", alt: "Volunteer outreach mission moment one" },
  { src: "/outreach_5.jpeg", alt: "Volunteer outreach mission moment two" },
  { src: "/outreach_6.jpeg", alt: "Volunteer outreach mission moment three" },
];

export default function VolunteerPageContent() {
  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
        <div className="absolute inset-0 pattern-bg opacity-60" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 border border-black/5 mb-6 text-sm font-body text-primary-dark">
            Serve Through Action
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-dark mb-6">
            Volunteer With Masjid Al-Quba
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">
            Join us in serving the community through meaningful outreach,
            support services, and hands-on initiatives.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10 text-center decorative-line decorative-line-center">
            Ways You Can Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {volunteerAreas.map((area) => (
              <div key={area.title} className="card-elevated p-7 h-full border-t-4 border-primary-green">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10 text-center">
            Outreach in Action
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
            Ready to Get Involved?
          </h2>
          <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-95 font-body">
            Tell us how you would like to contribute, and we will connect you
            to the right volunteer opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?topic=volunteering"
              className="bg-white text-primary-green font-body font-semibold rounded-full px-8 py-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Contact to Volunteer
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services/outreach-dawa"
              className="border-2 border-white text-white font-body font-semibold rounded-full px-8 py-3 hover:bg-white hover:text-primary-green transition-all duration-300 inline-flex items-center justify-center"
            >
              View Outreach Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
