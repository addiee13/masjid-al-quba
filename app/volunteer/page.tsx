import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Volunteer | Masjid Al-Quba',
  description: 'Get involved with Masjid Al-Quba. Learn about volunteer opportunities and how you can help.',
};

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-dark mb-6 text-center">
            Get Involved
          </h1>
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <p className="text-lg text-muted-foreground font-body mb-8 text-center">
              This page is coming soon. Volunteer opportunities and ways to get involved will be listed here.
            </p>
            <div className="text-center">
              <Link href="/" className="btn-primary inline-block">
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
