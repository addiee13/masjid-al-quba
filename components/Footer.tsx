import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

const actionLinks = [
  { label: "Donate", href: "/donate" },
  { label: "Volunteer", href: "/get-involved/volunteer" },
  { label: "Prayer Times", href: "/#prayer-times" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-primary-green/15 bg-gradient-to-br from-white via-[#F7F4EE] to-[#EBE5D8]">
      <div className="absolute inset-0 pattern-bg opacity-40" />
      <div className="relative max-w-7xl mx-auto px-6 py-14 md:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_0.9fr]">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white shadow-lg shadow-primary-dark/10 ring-1 ring-primary-green/10">
                <Image
                  src={siteConfig.logo}
                  alt={`${siteConfig.name} logo`}
                  fill
                  className="object-contain p-3"
                  sizes="80px"
                />
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-primary-dark">
                  {siteConfig.name}
                </p>
                <p className="mt-1 font-body text-sm uppercase tracking-[0.22em] text-primary-green">
                  Sugar Hill, Georgia
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-xs font-body text-base leading-7 text-muted-foreground">
              A welcoming masjid for prayer, learning, service, and community connection.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {actionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-full border border-primary-green/15 bg-white px-4 py-2 font-body text-sm font-semibold text-primary-green transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-green/30 hover:bg-primary-green hover:text-white hover:shadow-lg hover:shadow-primary-green/20"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-3xl font-bold text-[#C9A227]">
              Visit Us
            </h2>
            <div className="mt-6 space-y-5 font-body text-base leading-7 text-primary-dark">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 transition-colors hover:text-primary-green"
              >
                <span className="mt-1 rounded-full bg-primary-green/10 p-2 text-primary-green">
                  <MapPin className="h-4 w-4" />
                </span>
                <span>{siteConfig.address}</span>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-start gap-3 transition-colors hover:text-primary-green"
              >
                <span className="mt-1 rounded-full bg-primary-green/10 p-2 text-primary-green">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="break-all">{siteConfig.email}</span>
              </a>

              <a
                href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                className="group flex items-start gap-3 transition-colors hover:text-primary-green"
              >
                <span className="mt-1 rounded-full bg-primary-green/10 p-2 text-primary-green">
                  <Phone className="h-4 w-4" />
                </span>
                <span>{siteConfig.phone}</span>
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-3xl font-bold text-[#C9A227]">
              Masjid
            </h2>
            <div className="mt-6 rounded-[1.75rem] border border-primary-green/10 bg-white/80 p-6 shadow-lg shadow-primary-dark/5 backdrop-blur-sm">
              <p className="font-heading text-2xl font-semibold text-primary-dark">
                {siteConfig.fullName}
              </p>
              <p className="mt-3 font-body text-base leading-7 text-muted-foreground">
                Built around daily worship, beneficial knowledge, and service to families across the community.
              </p>
              <Link
                href="/about"
                className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.18em] text-primary-green transition-colors hover:text-primary-dark"
              >
                Learn more
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-3xl font-bold text-[#C9A227]">
              Quick Links
            </h2>
            <nav aria-label="Footer navigation" className="mt-6">
              <ul className="space-y-3">
                {siteConfig.quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-lg font-semibold text-primary-green transition-colors hover:text-primary-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-green/20 pt-6 text-center">
          <p className="font-body text-base font-semibold text-primary-green">
            © {year} {siteConfig.name} - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
