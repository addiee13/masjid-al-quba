import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'

type ReligiousCounsellingPayload = {
  name?: string
  email?: string
  phone?: string
  contactMethod?: 'email' | 'phone'
  topic?: string
  message?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ReligiousCounsellingPayload = await request.json()
    const { name, email, phone, contactMethod, topic, message } = body

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { ok: false, error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (phone && typeof phone !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Phone must be a valid string' },
        { status: 400 }
      )
    }

    if (
      !contactMethod ||
      (contactMethod !== 'email' && contactMethod !== 'phone')
    ) {
      return NextResponse.json(
        { ok: false, error: 'Preferred contact method is required' },
        { status: 400 }
      )
    }

    if (
      contactMethod === 'phone' &&
      (!phone || typeof phone !== 'string' || phone.trim().length === 0)
    ) {
      return NextResponse.json(
        { ok: false, error: 'Phone is required when contact method is phone' },
        { status: 400 }
      )
    }

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: 'Topic is required' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { ok: false, error: 'Message must be at least 10 characters' },
        { status: 400 }
      )
    }

    const document = {
      _type: 'religiousCounsellingRequest',
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      contactMethod,
      topic: topic.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: 'new',
    }

    await writeClient.create(document)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error creating religious counselling request:', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to submit counselling request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
