import { client } from './sanity.client'

export async function getHeroSlides() {
  const query = `*[_type == "heroSlide" && active == true] | order(order asc) {
    _id,
    title,
    image,
    buttonText,
    link,
    active,
    order
  }`
  
  return await client.fetch(query)
}

export async function getFeaturedEvents() {
  const query = `*[_type == "event" && isFeatured == true] | order(eventDate asc) [0...5] {
    title,
    slug,
    mainImage,
    description,
    eventDate
  }`
  
  return await client.fetch(query)
}

export async function getAllEvents() {
  const query = `*[_type == "event"] | order(eventDate desc) {
    title,
    slug,
    mainImage,
    description,
    eventDate
  }`
  
  return await client.fetch(query)
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
