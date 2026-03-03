import type { ContactTopic } from '../types/contact'

export type FormKind =
  | 'contact'
  | 'ask_imam'
  | 'juma_dua'
  | 'religious_counselling'

export type FormNotificationInput =
  | {
      formKind: 'contact'
      submittedAt: string
      name: string
      email: string
      phone?: string
      topic: ContactTopic
      message: string
      preferredContact?: 'email' | 'phone'
    }
  | {
      formKind: 'ask_imam'
      submittedAt: string
      name?: string
      email: string
      subject: string
      question: string
    }
  | {
      formKind: 'juma_dua'
      submittedAt: string
      name: string
      email: string
      phone: string
      message: string
    }
  | {
      formKind: 'religious_counselling'
      submittedAt: string
      name: string
      email: string
      phone?: string
      contactMethod: 'email' | 'phone'
      topic: string
      message: string
    }
