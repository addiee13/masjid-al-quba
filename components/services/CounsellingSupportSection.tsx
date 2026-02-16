"use client";

import { HeartHandshake, Users, BookOpen } from "lucide-react";

const features = [
  {
    icon: HeartHandshake,
    title: "Personal Guidance",
    description:
      "One-on-one conversations rooted in Islamic teachings.",
  },
  {
    icon: Users,
    title: "Family Matters",
    description:
      "Support for marriage, parenting, and family challenges.",
  },
  {
    icon: BookOpen,
    title: "Spiritual Growth",
    description:
      "Guidance to strengthen your relationship with Allah.",
  },
];

export default function CounsellingSupportSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
