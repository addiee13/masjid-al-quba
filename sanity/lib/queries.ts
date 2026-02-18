import { client } from './sanity.client'
import {
  expandEventOccurrences,
  getDefaultEventWindow,
} from '../../lib/events'
import type { EventListItem, EventOccurrence, EventTemplate } from '../../types/events'

export async function getHeroSlides() {
  const query = `*[_type == "heroSlide" && active == true] | order(order asc) {
    _id,
    image,
    active,
    order
  }`
  
  return await client.fetch(query)
}

export async function getFeaturedEvents() {
  const query = `*[_type == "event" && isFeatured == true && (!defined(isActive) || isActive == true)] {
    _id,
    title,
    slug,
    mainImage,
    "summary": coalesce(summary, description, ""),
    "category": coalesce(category, "general"),
    "location": coalesce(location, "Masjid Al-Quba"),
    "startDateTime": coalesce(startDateTime, eventDate),
    endDateTime,
    "recurrenceType": coalesce(recurrenceType, "none"),
    recurrenceEndDate,
    isFeatured,
    isActive
  }`

  const templates: EventTemplate[] = await client.fetch(query)
  const { from, to } = getDefaultEventWindow()
  const occurrences = expandEventOccurrences(templates, from, to).filter(
    (event) => event.isFeatured
  )

  // Keep only the next upcoming occurrence per event so daily recurring events
  // don't flood the homepage slider with duplicates.
  const uniqueByEvent = new Map<string, EventOccurrence>()
  for (const occurrence of occurrences) {
    if (!uniqueByEvent.has(occurrence.eventId)) {
      uniqueByEvent.set(occurrence.eventId, occurrence)
    }
  }
  const uniqueOccurrences = Array.from(uniqueByEvent.values()).slice(0, 5)

  return uniqueOccurrences.map((event) => ({
    title: event.title,
    slug: event.slug,
    mainImage: event.mainImage,
    description: event.summary,
    eventDate: event.startsAt,
  }))
}

export async function getAllEvents() {
  const query = `*[_type == "event"] | order(coalesce(startDateTime, eventDate) desc) {
    _id,
    title,
    slug,
    mainImage,
    "summary": coalesce(summary, description, ""),
    "category": coalesce(category, "general"),
    "location": coalesce(location, "Masjid Al-Quba"),
    "startDateTime": coalesce(startDateTime, eventDate),
    endDateTime,
    "recurrenceType": coalesce(recurrenceType, "none"),
    recurrenceEndDate,
    isFeatured,
    "isActive": coalesce(isActive, true)
  }`

  return await client.fetch<EventTemplate[]>(query)
}

export async function getEventTemplates() {
  const query = `*[_type == "event" && (!defined(isActive) || isActive == true)] {
    _id,
    title,
    slug,
    mainImage,
    "summary": coalesce(summary, description, ""),
    "category": coalesce(category, "general"),
    "location": coalesce(location, "Masjid Al-Quba"),
    "startDateTime": coalesce(startDateTime, eventDate),
    endDateTime,
    "recurrenceType": coalesce(recurrenceType, "none"),
    recurrenceEndDate,
    isFeatured,
    "isActive": coalesce(isActive, true)
  }`

  return await client.fetch<EventTemplate[]>(query)
}

export async function getUpcomingEventOccurrences() {
  const templates = await getEventTemplates()
  const { from, to } = getDefaultEventWindow()
  return expandEventOccurrences(templates, from, to)
}

function toEventListItemFromTemplate(template: EventTemplate): EventListItem {
  return {
    eventId: template._id,
    slug: template.slug,
    title: template.title,
    summary: template.summary,
    category: template.category || "general",
    recurrenceType: template.recurrenceType || "none",
    location: template.location || "Masjid Al-Quba",
    mainImage: template.mainImage,
    startsAt: null,
    endsAt: null,
    isFeatured: Boolean(template.isFeatured),
    isRecurringOccurrence: false,
  }
}

export async function getUpcomingEventsForListing(): Promise<EventListItem[]> {
  const templates = await getEventTemplates()
  const { from, to } = getDefaultEventWindow()
  const occurrences = expandEventOccurrences(templates, from, to)

  const uniqueUpcomingByEvent = new Map<string, EventListItem>()
  for (const occurrence of occurrences) {
    if (!uniqueUpcomingByEvent.has(occurrence.eventId)) {
      uniqueUpcomingByEvent.set(occurrence.eventId, occurrence)
    }
  }

  const undatedEvents = templates
    .filter((template) => !template.startDateTime && !uniqueUpcomingByEvent.has(template._id))
    .map(toEventListItemFromTemplate)

  return [...uniqueUpcomingByEvent.values(), ...undatedEvents]
}

export async function getEventBySlug(slug: string) {
  const query = `*[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    "summary": coalesce(summary, description, ""),
    "category": coalesce(category, "general"),
    "location": coalesce(location, "Masjid Al-Quba"),
    "startDateTime": coalesce(startDateTime, eventDate),
    endDateTime,
    "recurrenceType": coalesce(recurrenceType, "none"),
    recurrenceEndDate,
    isFeatured,
    "isActive": coalesce(isActive, true)
  }`

  return await client.fetch<EventTemplate | null>(query, { slug })
}

export function getNextOccurrenceForEvent(
  template: EventTemplate,
  now = new Date()
): EventOccurrence | null {
  const end = new Date(now)
  end.setUTCMonth(end.getUTCMonth() + 12)
  const occurrences = expandEventOccurrences([template], now, end)
  return occurrences[0] ?? null
}

export async function getBoardMembers() {
  const query = `*[_type == "boardMember"] | order(order asc) {
    _id,
    name,
    role,
    order,
    image,
    bio
  }`
  
  return await client.fetch(query)
}

export async function getActivePrayerSchedule() {
  const query = `*[_type == "prayerSchedule"] | order(_createdAt desc) [0] {
    _id,
    title,
    fajrAthan,
    fajrIqamah,
    dhuhrAthan,
    dhuhrIqamah,
    asrAthan,
    asrIqamah,
    maghribAthan,
    maghribIqamah,
    ishaAthan,
    ishaIqamah,
    jummahKhutbah,
    jummahIqamah
  }`
  
  return await client.fetch(query)
}
