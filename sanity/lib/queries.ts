import { client } from './sanity.client'

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
