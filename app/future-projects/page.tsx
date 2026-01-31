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
    <div className="bg-white rounded-xl shadow-sm border-l-4 border-primary-green p-6">
      <h3 className="font-body text-sm text-accent-sage uppercase tracking-wide mb-2">
        {title}
      </h3>
      <p className="font-heading text-3xl font-bold text-primary-dark mb-1">
        {value}
      </p>
      <p className="font-body text-sm text-accent-sage">{subtext}</p>
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
      <div className="relative w-full h-8 bg-light-sage/30 rounded-full overflow-hidden">
        {/* Filled portion */}
        <div
          className="absolute top-0 left-0 h-full bg-primary-green rounded-full flex items-center justify-end pr-3 transition-all duration-500"
          style={{ width: `${Math.max(percentage, 10)}%` }}
        >
          <span className="font-body text-sm font-semibold text-white">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Labels below the bar */}
      <div className="flex justify-between mt-4">
        <div>
          <p className="font-body text-sm text-accent-sage">Collected</p>
          <p className="font-heading text-xl font-bold text-primary-green">
            ${collected.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="font-body text-sm text-accent-sage">Goal (Phase 1)</p>
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
    <div className="flex items-start gap-3 py-3 border-b border-light-sage/30 last:border-b-0">
      {completed ? (
        <CheckCircle2 className="w-6 h-6 text-primary-green flex-shrink-0 mt-0.5" />
      ) : (
        <Circle className="w-6 h-6 text-light-sage flex-shrink-0 mt-0.5" />
      )}
      <p
        className={`font-body text-base ${
          completed ? "text-accent-sage line-through" : "text-primary-dark"
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-dark mb-4">
            Future Projects
          </h1>
          <p className="font-body text-lg text-accent-sage max-w-2xl mx-auto">
            Track the progress of our new Masjid construction project. Together,
            we are building a home for our community.
          </p>
        </div>

        {/* Section 1: Project Overview Stats */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-semibold text-primary-dark mb-6">
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
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h2 className="font-heading text-2xl font-semibold text-primary-dark mb-2">
                  Phase 1 Funding Progress
                </h2>
                <p className="font-body text-accent-sage">
                  Help us reach our Phase 1 goal to begin construction.
                </p>
              </div>
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 bg-primary-green text-white font-body font-semibold rounded-full px-6 py-3 hover:opacity-90 transition-opacity"
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
            <div className="mt-6 p-4 bg-bg-beige rounded-lg">
              <p className="font-body text-center">
                <span className="text-accent-sage">Remaining to reach goal: </span>
                <span className="font-heading font-bold text-xl text-primary-dark">
                  ${fundingData.remaining.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Action Items */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="font-heading text-2xl font-semibold text-primary-dark mb-6">
              Action Items for Phase 1
            </h2>
            <div className="divide-y divide-light-sage/30">
              {actionItems.map((item, index) => (
                <ActionItem
                  key={index}
                  text={item.text}
                  completed={item.completed}
                />
              ))}
            </div>

            {/* Progress summary */}
            <div className="mt-6 pt-4 border-t border-light-sage/30">
              <p className="font-body text-sm text-accent-sage">
                {actionItems.filter((item) => item.completed).length} of{" "}
                {actionItems.length} items completed
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-primary-green rounded-xl p-8 md:p-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
            Be Part of This Journey
          </h2>
          <p className="font-body text-white/90 max-w-xl mx-auto mb-6">
            Your contribution, no matter the size, brings us closer to our dream
            of a new Masjid. Join us in building a lasting legacy for our
            community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-green font-body font-semibold rounded-full px-8 py-3 hover:bg-bg-beige transition-colors"
            >
              Donate Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-body font-semibold rounded-full px-8 py-3 hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
