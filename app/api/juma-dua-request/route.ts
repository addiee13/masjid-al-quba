import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    const { name, phone, email, message } = body

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Phone is required' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Message is required' },
        { status: 400 }
      )
    }

    // Create document in Sanity
    const document = {
      _type: 'duaRequest',
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: 'new',
    }

    await writeClient.create(document)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error creating dua request:', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to submit request' },
      { status: 500 }
    )
  }
}

// Only allow POST
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
