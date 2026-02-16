import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us | Masjid Al-Quba",
  description:
    "Get in touch with Masjid Al-Quba. Visit us, call us, or send us a message. We're here to help.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-4">
              Contact Us
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re here to help—whether you have a question, suggestion, or
              need support.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Contact Info */}
            <div className="order-2 lg:order-1">
              <ContactInfo />
            </div>

            {/* Right Column: Contact Form */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-24">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

