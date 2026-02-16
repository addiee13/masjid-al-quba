import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Zakat | Masjid Al-Quba',
  description: 'Learn about Zakat and how to fulfill your obligation at Masjid Al-Quba.',
};

export default function ZakatPage() {
  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-dark mb-6 text-center">
            Zakat
          </h1>
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <div className="prose prose-lg max-w-none font-body">
              <h2 className="font-heading text-2xl font-bold text-primary-dark mb-4">
                What is Zakat?
              </h2>
              <p className="text-muted-foreground mb-6">
                Zakat is one of the five pillars of Islam and is an obligatory act of charity for all eligible Muslims. 
                It is a means of purifying one's wealth and helping those in need within the community.
              </p>

              <h2 className="font-heading text-2xl font-bold text-primary-dark mb-4 mt-8">
                Calculate Your Zakat
              </h2>
              <p className="text-muted-foreground mb-4">
                We encourage you to use these trusted resources to calculate your Zakat accurately:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
                <li>
                  <a 
                    href="https://islamic-relief.org/zakat-calculator/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-green hover:text-primary-dark underline font-medium"
                  >
                    Islamic Relief Zakat Calculator
                  </a>
                </li>
                <li>
                  <a 
                    href="https://zakat.fyi/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-green hover:text-primary-dark underline font-medium"
                  >
                    Zakat.fyi Calculator
                  </a>
                </li>
              </ul>
              <div className="bg-light-sage/20 border-l-4 border-primary-green p-4 mb-6 rounded">
                <p className="text-sm text-primary-dark">
                  <strong>Friendly Reminder:</strong> Please use these resources to ensure your Zakat is calculated 
                  correctly according to Islamic guidelines. If you have questions, feel free to consult with our Imam.
                </p>
              </div>

              <h2 className="font-heading text-2xl font-bold text-primary-dark mb-4 mt-8">
                How to Give
              </h2>
              <p className="text-muted-foreground mb-6">
                You can give your Zakat at Masjid Al-Quba or through our secure online donation portal.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="https://square.link/u/9S5UK6T3" 
                  target="_blank"
                  className="btn-primary inline-block text-center"
                >
                  Give Zakat Online
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
