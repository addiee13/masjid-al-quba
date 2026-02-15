import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BoardMemberCard, { type BoardMember } from '@/components/board/BoardMemberCard'
import { getBoardMembers } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Board of Directors | Masjid Al-Quba',
  description: 'Meet the Board of Directors serving Masjid Al-Quba and guiding its mission.',
}

export default async function BoardMembersPage() {
  const boardMembers: BoardMember[] = await getBoardMembers()

  return (
    <div className="min-h-screen bg-bg-beige">
      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-green/10 via-white to-bg-beige">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-olive/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            {/* Eyebrow */}
            <p className="font-body text-muted-foreground uppercase tracking-[0.2em] text-sm mb-4">
              Leadership & Governance
            </p>
            
            {/* Main Heading */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-6 leading-tight">
              Board of Directors
            </h1>
            
            {/* Intro Paragraph */}
            <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
              Our dedicated Board of Directors provides governance, financial oversight, and strategic 
              guidance to ensure Masjid Al-Quba serves our community with integrity and excellence. 
              These volunteer leaders work tirelessly to uphold our mission and values.
            </p>
          </div>
        </div>
      </section>

      {/* Board Members Grid */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {boardMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {boardMembers.map((member) => (
                <BoardMemberCard key={member._id} member={member} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-green to-accent-olive flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-semibold text-primary-dark mb-3">
                Board Members Coming Soon
              </h3>
              <p className="font-body text-muted-foreground max-w-md mx-auto">
                Our Board of Directors information will be available shortly. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary-green/5 to-bg-beige py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            Questions or Feedback?
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We welcome your questions, suggestions, and feedback. Our board is here to serve the community.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-primary-green text-white font-body font-semibold rounded-full px-8 py-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
