import { createClient } from '@sanity/client'

// Server-only client with write token
// DO NOT import this in client components
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Must be false for writes
  token: process.env.SANITY_WRITE_TOKEN, // Write token from environment
})
