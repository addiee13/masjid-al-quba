import { Metadata } from 'next';
import Link from 'next/link';
import { HandHeart, Users, BookOpen } from 'lucide-react';
import HighlightChip from '@/components/about/HighlightChip';
import StatsCard from '@/components/about/StatsCard';
import MissionVisionSection from '@/components/about/MissionVisionSection';

export const metadata: Metadata = {
  title: 'About | Masjid Al-Quba',
  description: 'Learn about Masjid Al-Quba - A welcoming mosque in Sugar Hill, Georgia built on prayer, learning, and service to the community.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-beige">
      {/* Hero Section */}
      <section className="relative overflow-hidden pattern-bg py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-dark mb-6">
            About Masjid Al-Quba
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body mb-8 max-w-3xl mx-auto leading-relaxed">
            A welcoming mosque in Sugar Hill, Georgia—built on prayer, learning, and service to the community.
          </p>
          
          {/* Highlight Chips */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
            <HighlightChip icon={HandHeart} label="Prayer" />
            <HighlightChip icon={Users} label="Community" />
            <HighlightChip icon={BookOpen} label="Education" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="btn-primary">
              Visit Us
            </Link>
            <Link href="/donate" className="btn-secondary">
              Support the Masjid
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-6 text-center decorative-line decorative-line-center">
            Our Story
          </h2>
          <div className="space-y-4 text-base md:text-lg text-muted-foreground font-body leading-relaxed">
            <p>
              Masjid Al-Quba is a place where hearts reconnect with Allah through daily prayer, beneficial knowledge, 
              and a caring community. We welcome families, youth, and newcomers seeking a spiritual home in the Sugar Hill area.
            </p>
            <p>
              Our mission is to serve as a spiritual home: establishing the prayer, teaching the Qur&apos;an and Sunnah, 
              supporting families, and building strong bonds among neighbors through compassion and service.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Row Section */}
      <section className="py-16 md:py-20 bg-bg-beige">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10 text-center">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Daily Prayers"
              description="Prayers established throughout the day"
            />
            <StatsCard
              title="Jumu'ah"
              description="Weekly gathering and khutbah"
            />
            <StatsCard
              title="Programs"
              description="Daily Iftars, Monthly Halaqah, youth activities"
            />
            <StatsCard
              title="Community"
              description="Serving Buford & surrounding areas"
            />
          </div>
          
          {/* Services Link */}
          <div className="mt-8 text-center">
            <Link 
              href="/services" 
              className="inline-flex items-center text-primary-green font-body font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 rounded-sm px-2 py-1"
              aria-label="View all services and programs"
            >
              Explore all our services →
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <MissionVisionSection
            mission="To establish salah, spread authentic knowledge, and serve our community with excellence."
            vision="To build a thriving, welcoming masjid that nurtures faith, character, and community for generations."
          />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-primary-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Be part of the community
          </h2>
          <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-95">
            Whether you want to pray, learn, volunteer, or support the masjid&apos;s growth—there&apos;s a place for you at Masjid Al-Quba.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/volunteer" 
              className="bg-white text-primary-green font-body font-semibold rounded-full px-8 py-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out"
            >
              Get Involved
            </Link>
            <Link 
              href="/donate" 
              className="border-2 border-white text-white font-body font-semibold rounded-full px-8 py-3 hover:bg-white hover:text-primary-green transition-all duration-300"
            >
              Donate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
