import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'
import type { ContactFormData } from '@/types/contact'

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Basic validation
    const { name, email, topic, message, consent, company } = body

    // Honeypot spam check
    if (company) {
      // If honeypot field is filled, it's likely spam
      // Return success to avoid revealing anti-spam measures
      console.log('Spam detected via honeypot field')
      return NextResponse.json({ ok: true })
    }

    // Validate required fields
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

    if (!topic || typeof topic !== 'string') {
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

    if (!consent) {
      return NextResponse.json(
        { ok: false, error: 'You must acknowledge this is not for emergencies' },
        { status: 400 }
      )
    }

    // Message length check (max 3000 chars)
    if (message.trim().length > 3000) {
      return NextResponse.json(
        { ok: false, error: 'Message is too long (max 3000 characters)' },
        { status: 400 }
      )
    }

    // Create document in Sanity
    try {
      const document = {
        _type: 'contactSubmission',
        name: name.trim(),
        email: email.trim(),
        phone: body.phone ? body.phone.trim() : undefined,
        topic,
        message: message.trim(),
        preferredContact: body.preferredContact || undefined,
        consent: true,
        createdAt: new Date().toISOString(),
        status: 'new',
      }

      await writeClient.create(document)
      console.log('Contact submission created:', { name, email, topic })

      // TODO: Send email notification via Resend/SendGrid
      // TODO: Consider rate limiting per IP/email

      return NextResponse.json({ ok: true })
    } catch (sanityError) {
      console.error('Sanity write error:', sanityError)
      
      // Fallback: log to console if Sanity fails
      console.log('===== CONTACT FORM SUBMISSION (Sanity unavailable) =====')
      console.log('Name:', name)
      console.log('Email:', email)
      console.log('Phone:', body.phone || 'N/A')
      console.log('Topic:', topic)
      console.log('Message:', message)
      console.log('Preferred Contact:', body.preferredContact || 'N/A')
      console.log('====================================================')

      // Still return success to user
      return NextResponse.json({ ok: true })
    }
  } catch (error) {
    console.error('Error processing contact submission:', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to submit contact form' },
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
