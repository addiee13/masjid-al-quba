import { CheckCircle, Users, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Reviewed Before Friday",
    description:
      "We gather requests ahead of Jumu'ah so they can be included in our community duas.",
  },
  {
    icon: Users,
    title: "Remembered in Congregation",
    description:
      "We make dua for our community during Friday prayers and other gatherings, asking Allah for mercy and ease.",
  },
  {
    icon: HeartHandshake,
    title: "We're Here to Help",
    description:
      "If you need additional support, we can connect you with the Imam or the right service.",
  },
];

export default function WhatHappensNext() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            What Happens Next?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-green to-accent-olive mx-auto rounded-full" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border border-black/5 shadow-md hover:shadow-xl transition-all duration-300 p-8 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="mb-5">
                  <div className="w-14 h-14 rounded-xl bg-primary-green/10 flex items-center justify-center group-hover:bg-primary-green/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary-green" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl font-semibold text-primary-dark mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-green/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
