import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock3, MapPin, Tag } from "lucide-react";
import { getEventBySlug, getNextOccurrenceForEvent } from "@/sanity/lib/queries";
import { MASJID_TIME_ZONE } from "@/lib/events";
import { urlForOptional } from "@/sanity/lib/sanity";

type EventDetailProps = {
  params: Promise<{ slug: string }>;
};

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: MASJID_TIME_ZONE,
  }).format(new Date(value));
}

export async function generateMetadata({ params }: EventDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found | Masjid Al-Quba",
    };
  }

  return {
    title: `${event.title} | Masjid Al-Quba`,
    description: event.summary,
  };
}

export default async function EventDetailPage({ params }: EventDetailProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const nextOccurrence = getNextOccurrenceForEvent(event);
  const imageUrl = urlForOptional(event.mainImage)?.url() ?? null;

  return (
    <div className="min-h-screen bg-bg-beige">
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-elevated overflow-hidden">
            <div className="relative w-full h-72 md:h-96 bg-white">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <CalendarDays className="w-14 h-14 text-primary-green/60" />
                </div>
              )}
            </div>
            <div className="p-8 md:p-10">
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary-green/10 text-primary-green px-3 py-1 text-xs font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  {event.category}
                </span>
                {event.recurrenceType && event.recurrenceType !== "none" && (
                  <span className="inline-flex items-center rounded-full bg-primary-dark/10 text-primary-dark px-3 py-1 text-xs font-semibold">
                    {event.recurrenceType}
                  </span>
                )}
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-dark mb-5">
                {event.title}
              </h1>

              <p className="font-body text-muted-foreground leading-relaxed text-lg mb-7">
                {event.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <p className="font-body text-primary-dark inline-flex items-center gap-2">
                  <Clock3 className="w-4 h-4 text-primary-green" />
                  {nextOccurrence
                    ? formatDateTime(nextOccurrence.startsAt)
                    : formatDateTime(event.startDateTime)}
                </p>
                <p className="font-body text-primary-dark inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary-green" />
                  {event.location}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/events" className="btn-secondary inline-block text-center">
                  Back to Upcoming Events
                </Link>
                <Link href="/contact" className="btn-primary inline-block text-center">
                  Contact for Questions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
