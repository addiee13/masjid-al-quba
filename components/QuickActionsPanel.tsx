import Link from "next/link";
import { ArrowRight, BookOpen, Heart, Soup, Users } from "lucide-react";

const quickActions = [
  {
    icon: BookOpen,
    title: "Quran School",
    helper: "Islamic education for all ages",
    href: "/education/quran-school",
  },
  {
    icon: Heart,
    title: "Zakat",
    helper: "Support families in need",
    href: "/services/zakat",
  },
  {
    icon: Users,
    title: "Community Events",
    helper: "Upcoming gatherings and programs",
    href: "/events",
  },
  {
    icon: Soup,
    title: "Daily Iftar",
    helper: "Join us at Maghrib for iftar and community",
    href: "/events/daily-iftar",
  },
];

export default function QuickActionsPanel() {
  return (
    <div className="h-full rounded-2xl border border-emerald-900/10 bg-white/80 p-6 md:p-8 backdrop-blur-sm shadow-lg shadow-emerald-900/5">
      <div className="space-y-4">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="group flex items-center gap-3 rounded-xl border border-primary-dark/10 bg-white px-4 py-3 md:px-5 md:py-4 transition-all duration-200 hover:translate-y-0.5 hover:bg-emerald-50/70 hover:border-emerald-700 hover:shadow-md hover:shadow-emerald-900/10"
          >
            <action.icon className="h-6 w-6 shrink-0 text-emerald-800" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-heading text-lg md:text-xl font-semibold text-primary-dark">
                {action.title}
              </p>
              <p className="truncate font-body text-sm md:text-base text-muted-foreground">
                {action.helper}
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-emerald-800" />
          </Link>
        ))}
      </div>
    </div>
  );
}
