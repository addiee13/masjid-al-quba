import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sadaqah | Masjid Al-Quba',
  description: 'Give voluntary charity (Sadaqah) to support Masjid Al-Quba and our community programs.',
};

export default function SadaqahPage() {
  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-dark mb-6 text-center">
            Sadaqah
          </h1>
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <div className="prose prose-lg max-w-none font-body">
              <h2 className="font-heading text-2xl font-bold text-primary-dark mb-4">
                What is Sadaqah?
              </h2>
              <p className="text-muted-foreground mb-6">
                Sadaqah is voluntary charity given out of compassion, love, friendship, or generosity. 
                Unlike Zakat, it is not obligatory but is highly encouraged and can be given at any time 
                and in any amount.
              </p>

              <h2 className="font-heading text-2xl font-bold text-primary-dark mb-4 mt-8">
                The Reward of Sadaqah
              </h2>
              <p className="text-muted-foreground mb-6">
                The Prophet Muhammad (peace be upon him) said: "Charity does not decrease wealth." 
                Giving Sadaqah purifies your wealth, brings blessings, and provides immense reward in the Hereafter.
              </p>

              <h2 className="font-heading text-2xl font-bold text-primary-dark mb-4 mt-8">
                Support Our Programs
              </h2>
              <p className="text-muted-foreground mb-6">
                Your Sadaqah helps support various programs at Masjid Al-Quba, including educational programs, 
                community services, facility maintenance, and outreach initiatives.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="https://square.link/u/MlGg2gg5" 
                  target="_blank"
                  className="btn-primary inline-block text-center"
                >
                  Give Sadaqah Online
                </Link>
                <Link 
                  href="/contact" 
                  className="btn-secondary inline-block text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
