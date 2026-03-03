import { Resend } from 'resend'
import type { ContactTopic } from '@/types/contact'
import type { FormNotificationInput } from '@/types/email'

const resendApiKey = process.env.RESEND_API_KEY
const emailFrom = process.env.EMAIL_FROM
const defaultRecipient = process.env.EMAIL_NOTIFY_DEFAULT_TO

const resend = resendApiKey ? new Resend(resendApiKey) : null

function htmlEscape(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function line(label: string, value: string | undefined): string {
  return `${label}: ${value?.trim() ? value.trim() : 'N/A'}`
}

function resolveContactTopicRecipient(topic: ContactTopic): string | undefined {
  switch (topic) {
    case 'general':
      return process.env.EMAIL_NOTIFY_CONTACT_GENERAL_TO
    case 'volunteering':
      return process.env.EMAIL_NOTIFY_CONTACT_VOLUNTEERING_TO
    case 'donations':
      return process.env.EMAIL_NOTIFY_CONTACT_DONATIONS_TO
    case 'education':
      return process.env.EMAIL_NOTIFY_CONTACT_EDUCATION_TO
    case 'facility':
      return process.env.EMAIL_NOTIFY_CONTACT_FACILITY_TO
    case 'other':
      return process.env.EMAIL_NOTIFY_CONTACT_OTHER_TO
    default:
      return undefined
  }
}

function resolveRecipient(input: FormNotificationInput): string | undefined {
  if (input.formKind === 'contact') {
    return resolveContactTopicRecipient(input.topic) || defaultRecipient
  }

  if (input.formKind === 'ask_imam') {
    return (
      process.env.EMAIL_NOTIFY_ASK_IMAM_TO ||
      process.env.ASK_IMAM_NOTIFY_TO ||
      defaultRecipient
    )
  }

  if (input.formKind === 'juma_dua') {
    return process.env.EMAIL_NOTIFY_JUMA_DUA_TO || defaultRecipient
  }

  return process.env.EMAIL_NOTIFY_RELIGIOUS_COUNSELLING_TO || defaultRecipient
}

function buildSubject(input: FormNotificationInput): string {
  if (input.formKind === 'contact') {
    return `[Contact] ${input.topic} - ${input.name}`
  }
  if (input.formKind === 'ask_imam') {
    return `[Ask Imam] ${input.subject} - ${input.name?.trim() || 'Anonymous'}`
  }
  if (input.formKind === 'juma_dua') {
    return `[Juma Dua Request] ${input.name}`
  }
  return `[Religious Counselling] ${input.topic} - ${input.name}`
}

function buildPlainText(input: FormNotificationInput): string {
  if (input.formKind === 'contact') {
    return [
      'New Contact Submission',
      line('Submitted At', input.submittedAt),
      line('Name', input.name),
      line('Email', input.email),
      line('Phone', input.phone),
      line('Topic', input.topic),
      line('Preferred Contact', input.preferredContact),
      '',
      'Message:',
      input.message.trim(),
    ].join('\n')
  }

  if (input.formKind === 'ask_imam') {
    return [
      'New Ask Imam Submission',
      line('Submitted At', input.submittedAt),
      line('Name', input.name),
      line('Email', input.email),
      line('Subject', input.subject),
      '',
      'Question:',
      input.question.trim(),
    ].join('\n')
  }

  if (input.formKind === 'juma_dua') {
    return [
      'New Juma Dua Request',
      line('Submitted At', input.submittedAt),
      line('Name', input.name),
      line('Email', input.email),
      line('Phone', input.phone),
      '',
      'Message:',
      input.message.trim(),
    ].join('\n')
  }

  return [
    'New Religious Counselling Request',
    line('Submitted At', input.submittedAt),
    line('Name', input.name),
    line('Email', input.email),
    line('Phone', input.phone),
    line('Preferred Contact', input.contactMethod),
    line('Topic', input.topic),
    '',
    'Message:',
    input.message.trim(),
  ].join('\n')
}

function buildHtml(input: FormNotificationInput): string {
  const text = buildPlainText(input)
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#1f2937;">
      <h2 style="margin:0 0 12px;">${htmlEscape(buildSubject(input))}</h2>
      <pre style="white-space:pre-wrap;background:#f9fafb;border:1px solid #e5e7eb;padding:12px;border-radius:8px;">${htmlEscape(
        text
      )}</pre>
    </div>
  `
}

export async function sendFormNotification(
  input: FormNotificationInput
): Promise<void> {
  const to = resolveRecipient(input)

  if (!resend || !emailFrom || !to) {
    console.error('Email notification skipped due to missing configuration', {
      hasResend: Boolean(resend),
      hasEmailFrom: Boolean(emailFrom),
      hasRecipient: Boolean(to),
      formKind: input.formKind,
    })
    return
  }

  const subject = buildSubject(input)
  const text = buildPlainText(input)
  const html = buildHtml(input)

  await resend.emails.send({
    from: emailFrom,
    to,
    subject,
    text,
    html,
    replyTo: input.email,
  })
}
