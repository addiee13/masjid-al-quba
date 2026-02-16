import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'string',
      options: {
        list: [
          { title: 'General Question', value: 'general' },
          { title: 'Volunteering', value: 'volunteering' },
          { title: 'Donations', value: 'donations' },
          { title: 'Youth / Education', value: 'education' },
          { title: 'Facility / Maintenance', value: 'facility' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: 'preferredContact',
      title: 'Preferred Contact Method',
      type: 'string',
      options: {
        list: [
          { title: 'Email', value: 'email' },
          { title: 'Phone', value: 'phone' },
        ],
      },
    }),
    defineField({
      name: 'consent',
      title: 'Consent',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Read', value: 'read' },
          { title: 'Responded', value: 'responded' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'topic',
      status: 'status',
      createdAt: 'createdAt',
    },
    prepare({ title, subtitle, status, createdAt }) {
      return {
        title: title || 'Anonymous',
        subtitle: `${status ? status.toUpperCase() : ''} • ${subtitle || 'No topic'} • ${createdAt ? new Date(createdAt).toLocaleDateString() : ''}`,
      }
    },
  },
})
