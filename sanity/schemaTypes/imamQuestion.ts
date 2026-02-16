import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'imamQuestion',
  title: 'Imam Question',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Optional - questioner can remain anonymous',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'text',
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
          { title: 'Answered', value: 'answered' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'subject',
      subtitle: 'createdAt',
      status: 'status',
      name: 'name',
    },
    prepare({ title, subtitle, status, name }) {
      return {
        title: title || 'Untitled Question',
        subtitle: `${status ? status.toUpperCase() : ''} • ${name || 'Anonymous'} • ${subtitle ? new Date(subtitle).toLocaleDateString() : ''}`,
      }
    },
  },
})
