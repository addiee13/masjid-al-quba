import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    const { name, email, subject, question } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!subject || typeof subject !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Subject is required' },
        { status: 400 }
      )
    }

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Question is required' },
        { status: 400 }
      )
    }

    // Create document in Sanity
    const document = {
      _type: 'imamQuestion',
      name: name ? name.trim() : undefined,
      email: email.trim(),
      subject: subject.trim(),
      question: question.trim(),
      createdAt: new Date().toISOString(),
      status: 'new',
    }

    await writeClient.create(document)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error creating imam question:', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to submit question' },
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
