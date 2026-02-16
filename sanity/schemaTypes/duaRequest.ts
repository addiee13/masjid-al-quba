import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'duaRequest',
  title: 'Dua Request',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
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
      name: 'message',
      title: 'Message',
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
          { title: 'Reviewed', value: 'reviewed' },
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
      title: 'name',
      subtitle: 'createdAt',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      return {
        title,
        subtitle: `${status ? status.toUpperCase() : ''} • ${subtitle ? new Date(subtitle).toLocaleDateString() : ''}`,
      }
    },
  },
})
