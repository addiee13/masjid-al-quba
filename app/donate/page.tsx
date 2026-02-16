import { Metadata } from "next";
import { 
  MoonStar, 
  Building2, 
  Settings, 
  HandHeart, 
  Heart,
  ExternalLink,
  Info
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Donate | Masjid Al-Quba",
  description:
    "Support Masjid Al-Quba through your generous donations. Choose from Ramadan giving, construction, operations, Zakat, or Sadaqah.",
};

// Square donation links - Replace these with actual URLs
const DONATION_LINKS = {
  ramadan: "https://square.link/u/REPLACE_RAMADAN",
  construction: "https://square.link/u/REPLACE_CONSTRUCTION",
  operations: "https://square.link/u/REPLACE_OPERATIONS",
  zakat: "https://square.link/u/REPLACE_ZAKAT",
  sadaqah: "https://square.link/u/REPLACE_SADAQAH",
};

type DonationOption = {
  id: string;
  title: string;
  description: string;
  icon: typeof MoonStar;
  link: string;
  iconColor: string;
  buttonColor: string;
};

const donationOptions: DonationOption[] = [
  {
    id: "ramadan",
    title: "Ramadan Giving Campaign",
    description: "Maximize your rewards this Ramadan and support community needs.",
    icon: MoonStar,
    link: DONATION_LINKS.ramadan,
    iconColor: "text-primary-green",
    buttonColor: "bg-primary-green hover:bg-primary-dark focus:ring-primary-green",
  },
  {
    id: "construction",
    title: "New Masjid Construction",
    description: "Help build and expand our masjid for the growing community.",
    icon: Building2,
    link: DONATION_LINKS.construction,
    iconColor: "text-primary-green",
    buttonColor: "bg-primary-green hover:bg-primary-dark focus:ring-primary-green",
  },
  {
    id: "operations",
    title: "Masjid Operations",
    description: "Support daily expenses like utilities, maintenance, and essential services.",
    icon: Settings,
    link: DONATION_LINKS.operations,
    iconColor: "text-primary-green",
    buttonColor: "bg-primary-green hover:bg-primary-dark focus:ring-primary-green",
  },
  {
    id: "zakat",
    title: "Zakat",
    description: "Fulfill your obligation and support eligible families with dignity.",
    icon: HandHeart,
    link: DONATION_LINKS.zakat,
    iconColor: "text-primary-green",
    buttonColor: "bg-primary-green hover:bg-primary-dark focus:ring-primary-green",
  },
  {
    id: "sadaqah",
    title: "Sadaqah",
    description: "Give any amount for ongoing charity and community benefit.",
    icon: Heart,
    link: DONATION_LINKS.sadaqah,
    iconColor: "text-primary-green",
    buttonColor: "bg-primary-green hover:bg-primary-dark focus:ring-primary-green",
  },
];

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-4">
              How would you like to donate?
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose an option below. Your donation supports our masjid and our
              community.
            </p>
          </div>

          {/* Donation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {donationOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <a
                  key={option.id}
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-3xl bg-white/70 backdrop-blur-sm border border-black/5 shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-green/30"
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-black/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent
                        className={`w-8 h-8 ${option.iconColor}`}
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h2 className="font-heading text-2xl font-bold text-primary-dark mb-3 group-hover:text-primary-green transition-colors">
                    {option.title}
                  </h2>
                  <p className="font-body text-muted-foreground leading-relaxed mb-6">
                    {option.description}
                  </p>

                  {/* Button */}
                  <div
                    className={`w-full h-12 rounded-xl ${option.buttonColor} text-white font-body font-semibold flex items-center justify-center gap-2 shadow-md group-hover:shadow-lg transition-all duration-300 focus:ring-4`}
                  >
                    <span>Donate via Square</span>
                    <ExternalLink className="w-4 h-4" strokeWidth={2} />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Other Ways to Donate */}
          <div className="max-w-3xl mx-auto mt-12">
            <h2 className="font-heading text-3xl font-bold text-primary-dark text-center mb-8">
              Other Ways to Donate
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Zelle */}
              <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-black/5 shadow-lg p-6">
                <h3 className="font-heading text-xl font-bold text-primary-dark mb-3">
                  Zelle
                </h3>
                <p className="font-body text-muted-foreground mb-2">Send to:</p>
                <a 
                  href="mailto:masjidalquba@gmail.com"
                  className="font-body text-primary-green hover:text-primary-dark font-semibold text-lg"
                >
                  masjidalquba@gmail.com
                </a>
              </div>

              {/* Mail Check */}
              <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-black/5 shadow-lg p-6">
                <h3 className="font-heading text-xl font-bold text-primary-dark mb-3">
                  Mail Check
                </h3>
                <p className="font-body text-muted-foreground mb-2">Mail check to:</p>
                <p className="font-body text-primary-dark font-semibold">
                  Masjid Al-Quba<br />
                  PO Box 220<br />
                  Buford, GA 30515
                </p>
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div className="max-w-3xl mx-auto mt-8">
            <div className="rounded-2xl bg-white/50 backdrop-blur-sm border border-black/5 p-6 flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-primary-green/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary-green" strokeWidth={2} />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-body text-muted-foreground leading-relaxed">
                  <strong className="text-primary-dark">Secure payment:</strong>{" "}
                  You&apos;ll be redirected to Square to complete your donation securely.
                  All transactions are encrypted and safe.
                </p>
                <p className="font-body text-sm text-muted-foreground mt-3">
                  Need help?{" "}
                  <Link
                    href="/contact"
                    className="text-primary-green hover:underline font-medium"
                  >
                    Contact us
                  </Link>{" "}
                  for assistance.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info & Disclaimer */}
          <div className="max-w-3xl mx-auto mt-8">
            <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-black/5 shadow-lg p-6">
              <div className="text-center">
                <p className="font-body text-muted-foreground mb-3">
                  For questions or assistance with donations:
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-primary-dark font-body">
                  <a href="tel:404-933-2943" className="hover:text-primary-green font-semibold">
                    📞 404-933-2943
                  </a>
                  <span className="hidden sm:inline text-muted-foreground">|</span>
                  <a href="tel:678-524-9861" className="hover:text-primary-green font-semibold">
                    📞 678-524-9861
                  </a>
                  <span className="hidden sm:inline text-muted-foreground">|</span>
                  <a 
                    href="https://masjidalquba.net" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary-green font-semibold"
                  >
                    🌐 masjidalquba.net
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Deductible Disclaimer */}
          <div className="max-w-3xl mx-auto mt-6 mb-8">
            <div className="rounded-2xl bg-primary-green/10 border border-primary-green/20 p-4">
              <p className="font-body text-center text-primary-dark font-semibold">
                ✓ All donations are 100% tax-deductible
              </p>
            </div>
          </div>

          {/* Alternative Payment Methods - Hidden until QR codes are ready */}
          {/* 
          <div className="max-w-3xl mx-auto mt-16">
            <h2 className="font-heading text-3xl font-bold text-primary-dark text-center mb-8">
              Alternative Payment Methods
            </h2>
            
            <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-black/5 shadow-lg p-8">
              <div className="flex flex-col items-center">
                <h3 className="font-heading text-2xl font-bold text-primary-dark mb-4">
                  Donate via Zelle
                </h3>
                <p className="font-body text-muted-foreground text-center mb-6 max-w-md">
                  Scan the QR code below with your banking app to send your donation directly via Zelle.
                </p>
                
                <div className="bg-white rounded-xl p-6 shadow-md border border-black/5">
                  <Image
                    src="/zelle-qr.png"
                    alt="Zelle QR Code for Masjid Al-Quba"
                    width={250}
                    height={300}
                    className="w-full max-w-[250px] h-auto"
                    priority
                  />
                </div>
                
                <p className="font-body text-sm text-muted-foreground text-center mt-6">
                  Or send directly to our Zelle account through your banking app
                </p>
              </div>
            </div>
          </div>
          */}
        </div>
      </section>
    </div>
  );
}

