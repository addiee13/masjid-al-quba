import Link from "next/link";

interface EducationCTAProps {
  title: string;
  description: string;
}

export default function EducationCTA({ title, description }: EducationCTAProps) {
  return (
    <section className="py-16 md:py-24 bg-primary-green text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">{title}</h2>
        <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-95 font-body">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/contact?topic=education"
            className="bg-white text-primary-green font-body font-semibold rounded-full px-8 py-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out"
          >
            Contact Us for Program Details
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white text-white font-body font-semibold rounded-full px-8 py-3 hover:bg-white hover:text-primary-green transition-all duration-300"
          >
            General Inquiries
          </Link>
        </div>
      </div>
    </section>
  );
}
