export type ContactTopic =
  | 'general'
  | 'volunteering'
  | 'donations'
  | 'education'
  | 'facility'
  | 'other'

export type PreferredContact = 'email' | 'phone'

export interface ContactSubmission {
  _id?: string
  _type: 'contactSubmission'
  name: string
  email: string
  phone?: string
  topic: ContactTopic
  message: string
  preferredContact?: PreferredContact
  createdAt: string
  status: 'new' | 'read' | 'responded'
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  topic: ContactTopic
  message: string
  preferredContact?: PreferredContact
  // Honeypot field (hidden)
  company?: string
}
