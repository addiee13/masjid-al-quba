import { ArrowRight, BookOpen, Heart, Users, Calendar, Star } from "lucide-react";
import Link from "next/link";
import PrayerTimesWidget from "../components/PrayerTimesWidget";
import EventHero from "../components/EventHero";
import { getFeaturedEvents } from "../sanity/lib/queries";

// Quick links data
const quickLinks = [
  {
    icon: BookOpen,
    title: "Quran School",
    description: "Islamic education for all ages",
    href: "/education/quran-school",
  },
  {
    icon: Heart,
    title: "Zakat & Sadaqah",
    description: "Give back to the community",
    href: "/services/zakat-sadaqah",
  },
  {
    icon: Users,
    title: "Community Events",
    description: "Join our gatherings",
    href: "/events",
  },
  {
    icon: Calendar,
    title: "Weekly Tafsir",
    description: "Learn the meanings of the Quran",
    href: "/education/weekly-tafsir",
  },
];

// Featured services
const services = [
  {
    title: "Ask the Imam",
    description: "Get answers to your Islamic questions from our knowledgeable Imam.",
    href: "/services/ask-imam",
  },
  {
    title: "Religious Counseling",
    description: "Confidential guidance for personal and family matters.",
    href: "/services/counseling",
  },
  {
    title: "Juma Dua Request",
    description: "Submit your dua requests for Friday prayers.",
    href: "/services/juma-dua-request",
  },
];

export default async function Home() {
  // Fetch featured events from Sanity
  const featuredEvents = await getFeaturedEvents()
  
  return (
    <div className="min-h-screen bg-bg-beige">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pattern-bg" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-light-sage/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="text-center max-w-4xl mx-auto">
            {/* Eyebrow Text */}
            <p className="font-body text-accent-sage uppercase tracking-[0.2em] text-sm mb-6 animate-fade-in">
              Welcome to
            </p>
            
            {/* Main Heading */}
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-primary-dark mb-6 leading-tight">
              Masjid Al-Quba
            </h1>
            
            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-12 h-0.5 bg-gradient-to-r from-transparent to-primary-green" />
              <Star className="w-5 h-5 text-primary-green fill-primary-green" />
              <span className="w-12 h-0.5 bg-gradient-to-l from-transparent to-primary-green" />
            </div>
            
            {/* Subtitle */}
            <p className="font-heading text-xl md:text-2xl text-primary-green mb-4">
              Buford, Georgia
            </p>
            
            <p className="font-body text-lg md:text-xl text-accent-sage max-w-2xl mx-auto mb-10 leading-relaxed">
              A place of worship, learning, and community. Join us in building a spiritual home for all.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/future-projects"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Support Our Project
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Event Banner Section */}
      {featuredEvents && featuredEvents.length > 0 && (
        <EventHero events={featuredEvents} />
      )}

      {/* Prayer Times Widget Section */}
      <section className="bg-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PrayerTimesWidget />
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group card-elevated p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-bg-beige flex items-center justify-center group-hover:bg-primary-green group-hover:text-white transition-all duration-300">
                  <link.icon className="w-6 h-6 text-primary-green group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-primary-dark mb-2">
                  {link.title}
                </h3>
                <p className="font-body text-sm text-accent-sage">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Future Project Highlight */}
      <section className="py-16 md:py-24 pattern-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-dark rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-0">
              {/* Content Side */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <span className="font-body text-light-sage uppercase tracking-widest text-sm mb-4">
                  Building Our Future
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  New Masjid Construction Project
                </h2>
                <p className="font-body text-light-sage mb-8 leading-relaxed">
                  We have purchased 3 acres of land and are working towards building 
                  a new, larger home for our growing community. Your support makes 
                  this dream a reality.
                </p>
                
                {/* Progress Stats */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="font-heading text-3xl font-bold text-white mb-1">$65K</p>
                    <p className="font-body text-sm text-light-sage">Raised so far</p>
                  </div>
                  <div>
                    <p className="font-heading text-3xl font-bold text-white mb-1">$500K</p>
                    <p className="font-body text-sm text-light-sage">Phase 1 Goal</p>
                  </div>
                </div>
                
                <Link
                  href="/future-projects"
                  className="inline-flex items-center gap-2 bg-white text-primary-dark font-body font-semibold rounded-full px-8 py-3 hover:bg-bg-beige transition-colors self-start"
                >
                  Learn More & Donate
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              
              {/* Visual Side */}
              <div className="relative bg-primary-green/20 min-h-[300px] lg:min-h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                      <Star className="w-10 h-10 text-white fill-white/50" />
                    </div>
                  </div>
                  <p className="font-heading text-2xl text-white/90">3 Acres</p>
                  <p className="font-body text-white/60">Land Secured</p>
                </div>
                
                {/* Decorative circles */}
                <div className="absolute top-10 right-10 w-20 h-20 border border-white/10 rounded-full" />
                <div className="absolute bottom-10 left-10 w-32 h-32 border border-white/10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-dark mb-4 decorative-line decorative-line-center inline-block">
              Our Services
            </h2>
            <p className="font-body text-accent-sage max-w-2xl mx-auto mt-8">
              We offer various services to support our community members in their spiritual journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={service.title}
                href={service.href}
                className="group relative"
              >
                <div className="card p-8 h-full border border-transparent hover:border-primary-green/20">
                  <span className="font-heading text-5xl font-bold text-bg-beige absolute top-4 right-6">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-heading text-xl font-semibold text-primary-dark mb-3 relative">
                    {service.title}
                  </h3>
                  <p className="font-body text-accent-sage mb-4 relative">
                    {service.description}
                  </p>
                  <span className="font-body text-primary-green font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="btn-ghost inline-flex items-center gap-2"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-green/5 via-primary-green/10 to-primary-green/5 rounded-3xl transform -rotate-1" />
            <div className="relative bg-white rounded-3xl shadow-xl shadow-primary-dark/5 p-8 md:p-12 lg:p-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-dark mb-6">
                Join Our Community
              </h2>
              <p className="font-body text-lg text-accent-sage max-w-xl mx-auto mb-8">
                Whether you want to volunteer, attend events, or simply learn more about Islam, 
                there's a place for you at Masjid Al-Quba.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/get-involved/volunteer"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Get Involved
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-8 bg-bg-beige" />
    </div>
  );
}
