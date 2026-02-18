import { Metadata } from "next";
import { CheckCircle2, Circle, ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Future Projects | Masjid Al-Quba",
  description:
    "Track progress on the new Masjid construction project and support the future of Masjid Al-Quba.",
};

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

const fundingSnapshot = {
  phaseGoal: 500000,
  currentFocus: "Permit coordination, site preparation, and construction planning.",
  lastUpdated: "February 16, 2026",
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

const projectMilestones = [
  {
    title: "Land Secured",
    detail: "3 acres purchased for the future Masjid project.",
    status: "completed",
  },
  {
    title: "Planning and Permits",
    detail: "Architectural review and city permit coordination in progress.",
    status: "in_progress",
  },
  {
    title: "Site Preparation",
    detail: "Land cleanup, contractor alignment, and readiness steps.",
    status: "next",
  },
  {
    title: "Phase 1 Construction Start",
    detail: "Begin initial build once permitting and prep milestones are complete.",
    status: "next",
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
    <div className="card-elevated relative overflow-hidden border border-primary-green/15 bg-gradient-to-br from-white/95 to-bg-beige/80 dark:from-white/10 dark:to-white/5 p-6 group hover:-translate-y-1 transition-all duration-300">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-green via-accent-olive to-primary-dark" />
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

// Action Item Component
function ActionItem({
  text,
  completed,
}: {
  text: string;
  completed: boolean;
}) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-light-sage/20 last:border-b-0 group hover:bg-white/70 dark:hover:bg-white/5 -mx-2 px-3 rounded-lg transition-all duration-300 hover:translate-x-1">
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

function milestoneBadge(status: "completed" | "in_progress" | "next") {
  if (status === "completed") {
    return "bg-primary-green/15 text-primary-green border-primary-green/30";
  }
  if (status === "in_progress") {
    return "bg-amber-100 text-amber-700 border-amber-300";
  }
  return "bg-slate-100 text-slate-700 border-slate-300";
}

function milestoneLabel(status: "completed" | "in_progress" | "next") {
  if (status === "completed") return "Completed";
  if (status === "in_progress") return "In Progress";
  return "Up Next";
}

export default function FutureProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F6F1] via-bg-beige to-[#E6E1D5]">
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
        <div className="absolute inset-0 pattern-bg opacity-60" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 left-0 w-72 h-72 bg-accent-olive/20 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 border border-black/5 mb-6 text-sm font-body text-primary-dark">
            <Building2 className="w-4 h-4 text-primary-green" />
            Building Our Future
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-6">
            Future Projects
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Track progress on our new Masjid construction project. Together we
            are building a lasting home for our growing community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://square.link/u/y45ivtFR"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Donate to Project
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="pointer-events-none absolute -top-6 -left-6 h-32 w-32 rounded-full bg-primary-green/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-8 h-40 w-40 rounded-full bg-accent-olive/20 blur-3xl" />

        {/* Section 1: Project Overview Stats */}
        <section className="mb-16 md:mb-20">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-dark mb-10 decorative-line">
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

        {/* Section 2: Milestones */}
        <section className="mb-16 md:mb-20">
          <div className="card-elevated p-8 md:p-10 bg-gradient-to-br from-white/95 to-bg-beige/70 dark:from-white/10 dark:to-white/5 border border-primary-green/15">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-dark mb-3">
                  Project Milestones
                </h2>
                <p className="font-body text-muted-foreground">
                  A clear roadmap of where the project stands and what comes next.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {projectMilestones.map((milestone) => (
                <div key={milestone.title} className="card p-5 border border-black/5 hover:border-primary-green/25 hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-white/5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
                    <h3 className="font-heading text-2xl font-semibold text-primary-dark">
                      {milestone.title}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold w-fit ${milestoneBadge(
                        milestone.status as "completed" | "in_progress" | "next"
                      )}`}
                    >
                      {milestoneLabel(
                        milestone.status as "completed" | "in_progress" | "next"
                      )}
                    </span>
                  </div>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {milestone.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Funding Snapshot */}
        <section className="mb-16 md:mb-20">
          <div className="card-elevated p-8 md:p-10 bg-gradient-to-br from-emerald-50/70 to-white/90 dark:from-white/10 dark:to-white/5 border border-primary-green/15">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-dark mb-3">
                  Phase 1 Funding Snapshot
                </h2>
                <p className="font-body text-muted-foreground">
                  A static overview of project funding direction and current focus.
                </p>
              </div>
              <Link
                href="https://square.link/u/y45ivtFR"
                className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Donate to Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="card p-6 border border-black/5 bg-white/85 dark:bg-white/5">
                <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Phase 1 Goal
                </p>
                <p className="font-heading text-4xl font-bold text-primary-dark">
                  ${fundingSnapshot.phaseGoal.toLocaleString()}
                </p>
              </div>
              <div className="card p-6 border border-black/5 bg-white/85 dark:bg-white/5">
                <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Current Focus
                </p>
                <p className="font-body text-primary-dark leading-relaxed">
                  {fundingSnapshot.currentFocus}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-r from-primary-green/15 to-accent-olive/20 border border-primary-green/20 p-4">
              <p className="font-body text-sm text-primary-dark">
                <strong>Last updated:</strong> {fundingSnapshot.lastUpdated}
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Action Items */}
        <section className="mb-16 md:mb-20">
          <div className="card-elevated p-8 md:p-10 bg-gradient-to-br from-white/95 to-[#F0ECE1] dark:from-white/10 dark:to-white/5 border border-primary-green/15">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-dark mb-8 decorative-line">
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

            <div className="mt-8 pt-6 border-t border-light-sage/30">
              <p className="font-body text-sm text-muted-foreground">
                {actionItems.filter((item) => item.completed).length} of{" "}
                {actionItems.length} action items completed
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Future Masjid Location */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-center font-heading text-3xl md:text-4xl font-bold text-primary-dark">
            Future Masjid Location
          </h2>

          <div className="mt-8 bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg">
            <p className="text-lg font-medium text-muted-foreground">
              1180 Buford Hwy, Sugar Hill, GA
            </p>
            <Link
              href="https://www.google.com/maps/dir/?api=1&destination=1180+Buford+Hwy,+Sugar+Hill,+GA"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-primary-green to-primary-dark hover:scale-105 transition transform-gpu"
            >
              Get Directions
            </Link>
          </div>

          <iframe
            src="https://www.google.com/maps?q=1180+Buford+Hwy,+Sugar+Hill,+GA&output=embed"
            width="100%"
            height="450"
            className="rounded-2xl shadow-xl border border-white/20 mt-8 w-full"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Future Masjid Location Map"
          />
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-primary-green via-[#406549] to-primary-dark text-white rounded-3xl shadow-xl">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Be Part of This Journey
            </h2>
            <p className="font-body text-white/90 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
              Your contribution, no matter the size, brings us closer to our
              dream of a new Masjid. Join us in building a lasting legacy for
              the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://square.link/u/y45ivtFR"
                className="bg-white text-primary-green font-body font-semibold rounded-full px-8 py-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                Donate Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white font-body font-semibold rounded-full px-8 py-3 hover:bg-white hover:text-primary-green transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
