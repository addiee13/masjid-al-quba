"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = {
  address: "1400 Buford Hwy NE, Sugar Hill, GA 30518",
  phone: "(404) 933-2943",
  email: "masjidalquba@gmail.com",
  hours: [
    { label: "Monday - Friday", value: "9:00 AM - 5:00 PM" },
    { label: "Saturday - Sunday", value: "10:00 AM - 4:00 PM" },
  ],
};

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-dark mb-3">
          Get in Touch
        </h2>
        <p className="font-body text-lg text-muted-foreground leading-relaxed">
          We&apos;re here to help—whether you have a question, suggestion, or
          need support. Please feel free to reach out.
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-6">
        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-green/10 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary-green" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-primary-dark mb-1">
              Address
            </h3>
            <p className="font-body text-gray-900 text-base font-medium">
              {contactInfo.address}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-green/10 flex items-center justify-center">
            <Phone className="w-6 h-6 text-primary-green" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-primary-dark mb-1">
              Phone
            </h3>
            <a
              href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
              className="font-body text-gray-900 text-base font-medium hover:text-primary-green transition-colors"
            >
              {contactInfo.phone}
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-green/10 flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary-green" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-primary-dark mb-1">
              Email
            </h3>
            <a
              href={`mailto:${contactInfo.email}`}
              className="font-body text-gray-900 text-base font-medium hover:text-primary-green transition-colors break-all"
            >
              {contactInfo.email}
            </a>
          </div>
        </div>

        {/* Office Hours */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-green/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-primary-green" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-primary-dark mb-1">
              Office Hours
            </h3>
            <div className="space-y-1">
              {contactInfo.hours.map((hour, idx) => (
                <p key={idx} className="font-body text-gray-900 text-base">
                  <span className="font-medium">{hour.label}:</span> {hour.value}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="pt-6 space-y-3">
        <a
          href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
          className="w-full h-12 rounded-xl bg-primary-green text-white font-body font-semibold hover:shadow-lg hover:shadow-primary-green/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Phone className="w-5 h-5" strokeWidth={2} />
          Call Us
        </a>
        <a
          href={`mailto:${contactInfo.email}`}
          className="w-full h-12 rounded-xl border-2 border-primary-green text-primary-green font-body font-semibold hover:bg-primary-green/5 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Mail className="w-5 h-5" strokeWidth={2} />
          Email Us
        </a>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-12 rounded-xl border-2 border-primary-dark text-primary-dark font-body font-semibold hover:bg-primary-dark/5 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <MapPin className="w-5 h-5" strokeWidth={2} />
          Get Directions
        </a>
      </div>

      {/* Visit Note */}
      <div className="pt-4 border-t border-black/5">
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          <strong className="text-primary-dark">You&apos;re always welcome</strong>
          —please check prayer times before coming.
        </p>
      </div>
    </div>
  );
}
