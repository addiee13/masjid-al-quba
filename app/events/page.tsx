import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, MapPin, Tag } from "lucide-react";
import { getUpcomingEventsForListing } from "@/sanity/lib/queries";
import { MASJID_TIME_ZONE } from "@/lib/events";
import { urlForOptional } from "@/sanity/lib/sanity";

export const metadata: Metadata = {
  title: "Upcoming Events | Masjid Al-Quba",
  description:
    "See upcoming custom events at Masjid Al-Quba and stay connected with community programs.",
};

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: MASJID_TIME_ZONE,
  }).format(new Date(value));
}

function getEventDateLabel(value?: string | null) {
  if (!value) return "Date & time to be announced";
  return formatDateTime(value);
}

export default async function EventsPage() {
  const events = await getUpcomingEventsForListing();

  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-cream via-bg-beige to-[#C8C6C0]">
        <div className="absolute inset-0 pattern-bg opacity-60" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/70 border border-black/5 mb-6 text-sm font-body text-primary-dark">
            Community Calendar
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-dark mb-6">
            Upcoming Events
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">
            Stay updated with current events and gatherings at Masjid Al-Quba.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {events.length === 0 ? (
            <div className="card-elevated p-10 text-center">
              <CalendarDays className="w-10 h-10 text-primary-green mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-primary-dark mb-4">
                No Upcoming Events Yet
              </h2>
              <p className="font-body text-muted-foreground mb-6">
                Check back soon, or contact us for current program updates.
              </p>
              <Link href="/contact" className="btn-primary inline-block">
                Contact Us
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {events.map((event) => {
                const imageUrl = urlForOptional(event.mainImage)?.url() ?? null;

                return (
                  <article
                    key={`${event.eventId}-${event.startsAt || "tba"}`}
                    className="card-elevated overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="relative h-56 md:h-full md:min-h-[220px] bg-bg-beige">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <CalendarDays className="w-10 h-10 text-primary-green/60" />
                          </div>
                        )}
                      </div>
                      <div className="md:col-span-2 p-7">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary-green/10 text-primary-green px-3 py-1 text-xs font-semibold">
                            <Tag className="w-3.5 h-3.5" />
                            {event.category}
                          </span>
                          {event.recurrenceType === "daily" && (
                            <span className="inline-flex items-center rounded-full bg-amber-500 text-white px-3 py-1 text-xs font-bold tracking-wide">
                              DAILY
                            </span>
                          )}
                          {event.isRecurringOccurrence && (
                            <span className="inline-flex items-center rounded-full bg-primary-dark/10 text-primary-dark px-3 py-1 text-xs font-semibold">
                              recurring
                            </span>
                          )}
                        </div>
                        <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-dark mb-3">
                          {event.title}
                        </h2>
                        <p className="font-body text-muted-foreground leading-relaxed mb-5">
                          {event.summary}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                          <p className="font-body text-sm text-primary-dark inline-flex items-center gap-2">
                            <Clock3 className="w-4 h-4 text-primary-green" />
                            {getEventDateLabel(event.startsAt)}
                          </p>
                          <p className="font-body text-sm text-primary-dark inline-flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary-green" />
                            {event.location}
                          </p>
                        </div>
                        {event.slug?.current && (
                          <Link
                            href={`/events/${event.slug.current}`}
                            className="btn-secondary inline-block"
                          >
                            View Details
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
