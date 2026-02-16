"use client";

import { Shield, Mail, BookOpen } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Reviewed Privately",
    description:
      "Your message is received securely and reviewed by the Imam.",
  },
  {
    icon: Mail,
    title: "Response by Email",
    description:
      "We'll reply to the email you provide as soon as possible.",
  },
  {
    icon: BookOpen,
    title: "Clear Guidance",
    description:
      "Answers are based on the Qur'an and Sunnah, with practical advice.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-dark mb-3">
            How It Works
          </h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-emerald-600 to-primary-green rounded-full" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-white/70 backdrop-blur-sm border border-black/5 shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-emerald-600/10 flex items-center justify-center mb-4 group-hover:bg-emerald-600/20 transition-colors">
                <feature.icon className="w-7 h-7 text-emerald-600" strokeWidth={2} />
              </div>

              {/* Content */}
              <h3 className="font-heading text-xl font-bold text-primary-dark mb-2">
                {feature.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
