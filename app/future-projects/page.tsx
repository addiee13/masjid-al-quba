import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import Link from "next/link";

// Project data
const projectStats = [
  {
    title: "Land Purchased",
    value: "3 Acres",
    subtext: "Total Area",
  },
  {
    title: "Total Project Cost",
    value: "$850,000",
    subtext: "Land Cost",
  },
  {
    title: "Kharaja-E-Hasana",
    value: "$200,000",
    subtext: "To be paid back in 6 months",
  },
];

const fundingData = {
  goal: 500000,
  collected: 65000,
  remaining: 435000,
};

const actionItems = [
  {
    text: "Architecture review and guidance on proposed plan.",
    completed: false,
  },
  {
    text: "City permit discussions with officials.",
    completed: false,
  },
  {
    text: "Quotes for Cleaning Land (including cutting trees).",
    completed: false,
  },
  {
    text: "Setup a Quba event on the land for members/donors.",
    completed: false,
  },
];

// Stat Card Component
function StatCard({
  title,
  value,
  subtext,
}: {
  title: string;
  value: string;
  subtext: string;
}) {
  return (
    <div className="card-elevated border-l-4 border-primary-green p-6 group">
      <h3 className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-3">
        {title}
      </h3>
      <p className="font-heading text-3xl md:text-4xl font-bold text-primary-dark mb-2 group-hover:text-primary-green transition-colors">
        {value}
      </p>
      <p className="font-body text-sm text-muted-foreground">{subtext}</p>
    </div>
  );
}

// Progress Bar Component
function ProgressBar({
  goal,
  collected,
}: {
  goal: number;
  collected: number;
}) {
  const percentage = Math.round((collected / goal) * 100);

  return (
    <div className="w-full">
      {/* Progress bar container */}
      <div className="relative w-full h-10 bg-gradient-to-r from-bg-beige to-light-sage/30 rounded-full overflow-hidden shadow-inner">
        {/* Filled portion */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-green to-primary-dark rounded-full flex items-center justify-end pr-4 transition-all duration-700 ease-out shadow-lg shadow-primary-green/30"
          style={{ width: `${Math.max(percentage, 15)}%` }}
        >
          <span className="font-heading text-sm font-bold text-white drop-shadow-sm">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Labels below the bar */}
      <div className="flex justify-between mt-6">
        <div>
          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Collected</p>
          <p className="font-heading text-2xl font-bold text-primary-green">
            ${collected.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="font-body text-sm text-muted-foreground">Goal (Phase 1)</p>
          <p className="font-heading text-xl font-bold text-primary-dark">
            ${goal.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

// Action Item Component
function ActionItem({
  text,
  completed,
}: {
  text: string;
  completed: boolean;
}) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-light-sage/20 last:border-b-0 group hover:bg-bg-beige/30 -mx-2 px-2 rounded-lg transition-colors">
      {completed ? (
        <CheckCircle2 className="w-6 h-6 text-primary-green flex-shrink-0 mt-0.5" />
      ) : (
        <Circle className="w-6 h-6 text-light-sage flex-shrink-0 mt-0.5 group-hover:text-primary-green/50 transition-colors" />
      )}
      <p
        className={`font-body text-base leading-relaxed ${
          completed ? "text-muted-foreground line-through" : "text-primary-dark"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

export default function FutureProjectsPage() {
  return (
    <div className="min-h-screen bg-bg-beige">
      {/* Hero Header */}
      <div className="relative bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 pattern-bg opacity-30" />
        <div className="absolute top-20 -left-20 w-64 h-64 bg-primary-green/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-20 w-80 h-80 bg-light-sage/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <span className="font-body text-light-sage uppercase tracking-[0.2em] text-sm mb-4 block">
              Building Our Future
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Future Projects
            </h1>
            <p className="font-body text-lg text-light-sage max-w-2xl mx-auto leading-relaxed">
              Track the progress of our new Masjid construction project. Together,
              we are building a home for our community.
            </p>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#D1D0CB"/>
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section 1: Project Overview Stats */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl font-semibold text-primary-dark mb-8 decorative-line">
            Project Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectStats.map((stat) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                subtext={stat.subtext}
              />
            ))}
          </div>
        </section>

        {/* Section 2: Funding Progress */}
        <section className="mb-16">
          <div className="card-elevated p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-primary-dark mb-3">
                  Phase 1 Funding Progress
                </h2>
                <p className="font-body text-muted-foreground">
                  Help us reach our Phase 1 goal to begin construction.
                </p>
              </div>
              <Link
                href="https://square.link/u/9S5UK6T3"
                className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Donate to Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <ProgressBar
              goal={fundingData.goal}
              collected={fundingData.collected}
            />

            {/* Remaining amount highlight */}
            <div className="mt-8 p-5 bg-gradient-to-r from-bg-beige via-bg-beige to-light-sage/30 rounded-xl border border-light-sage/30">
              <p className="font-body text-center">
                <span className="text-muted-foreground">Remaining to reach goal: </span>
                <span className="font-heading font-bold text-2xl text-primary-dark">
                  ${fundingData.remaining.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Action Items */}
        <section className="mb-16">
          <div className="card-elevated p-8 md:p-10">
            <h2 className="font-heading text-2xl font-semibold text-primary-dark mb-8 decorative-line">
              Action Items for Phase 1
            </h2>
            <div>
              {actionItems.map((item, index) => (
                <ActionItem
                  key={index}
                  text={item.text}
                  completed={item.completed}
                />
              ))}
            </div>

            {/* Progress summary */}
            <div className="mt-8 pt-6 border-t border-light-sage/30 flex items-center justify-between">
              <p className="font-body text-sm text-muted-foreground">
                {actionItems.filter((item) => item.completed).length} of{" "}
                {actionItems.length} items completed
              </p>
              <div className="w-32 h-2 bg-bg-beige rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-green rounded-full transition-all duration-500"
                  style={{ width: `${(actionItems.filter((item) => item.completed).length / actionItems.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-green/5 to-primary-dark/5 rounded-3xl transform rotate-1" />
          <div className="relative text-center bg-gradient-to-br from-primary-green via-primary-green to-primary-dark rounded-3xl p-10 md:p-16 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Be Part of This Journey
              </h2>
              <p className="font-body text-white/85 max-w-xl mx-auto mb-8 text-lg leading-relaxed">
                Your contribution, no matter the size, brings us closer to our dream
                of a new Masjid. Join us in building a lasting legacy for our
                community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://square.link/u/9S5UK6T3"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary-green font-body font-semibold rounded-full px-8 py-4 hover:bg-bg-beige hover:shadow-lg transition-all duration-300"
                >
                  Donate Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-body font-semibold rounded-full px-8 py-4 hover:bg-white/10 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer spacer */}
      <div className="h-12 bg-bg-beige" />
    </div>
  );
}
