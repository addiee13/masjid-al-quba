import { defineField, defineType, type PreviewValue } from 'sanity'

const boardMember = defineType({
  name: 'boardMember',
  title: 'Board Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Position',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g., President, Vice President, Treasurer',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (rule) => rule.required().min(0),
      description: 'Lower numbers appear first (e.g., 1, 2, 3...)',
      initialValue: 0,
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional: If not provided, initials will be shown',
    }),
    defineField({
      name: 'bio',
      title: 'Short Biography',
      type: 'text',
      rows: 4,
      description: 'Optional: Brief description about the board member',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
      order: 'order',
    },
    prepare(selection: PreviewValue & { order?: number }) {
      const { title, subtitle, media, order } = selection
      const orderPrefix = typeof order === 'number' ? `${order}. ` : ''
      return {
        title: `${orderPrefix}${title ?? ''}`,
        subtitle: subtitle,
        media: media,
      }
    },
  },
})

export default boardMember
