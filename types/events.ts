import type { ImageSource } from "@/sanity/lib/sanity";

export type EventCategory =
  | "education"
  | "community"
  | "outreach"
  | "fundraising"
  | "youth"
  | "general";

export type RecurrenceType = "none" | "daily" | "weekly" | "monthly";

export interface EventTemplate {
  _id: string;
  title: string;
  slug?: { current: string } | null;
  mainImage?: ImageSource | null;
  summary: string;
  category: EventCategory;
  location: string;
  isFeatured?: boolean;
  isActive?: boolean;
  startDateTime?: string | null;
  endDateTime?: string | null;
  recurrenceType?: RecurrenceType;
  recurrenceEndDate?: string | null;
}

export interface EventOccurrence {
  eventId: string;
  slug?: { current: string } | null;
  title: string;
  summary: string;
  category: EventCategory;
  recurrenceType: RecurrenceType;
  location: string;
  mainImage?: ImageSource | null;
  startsAt: string;
  endsAt?: string | null;
  isFeatured: boolean;
  isRecurringOccurrence: boolean;
}

export interface EventListItem {
  eventId: string;
  slug?: { current: string } | null;
  title: string;
  summary: string;
  category: EventCategory;
  recurrenceType: RecurrenceType;
  location: string;
  mainImage?: ImageSource | null;
  startsAt?: string | null;
  endsAt?: string | null;
  isFeatured: boolean;
  isRecurringOccurrence: boolean;
}
