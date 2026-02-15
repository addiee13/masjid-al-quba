// schemaTypes/boardMember.ts
export default {
  name: 'boardMember',
  title: 'Board Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role / Position',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'e.g., President, Vice President, Treasurer',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
      description: 'Lower numbers appear first (e.g., 1, 2, 3...)',
      initialValue: 0,
    },
    {
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional: If not provided, initials will be shown',
    },
    {
      name: 'bio',
      title: 'Short Biography',
      type: 'text',
      rows: 4,
      description: 'Optional: Brief description about the board member',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
      order: 'order',
    },
    prepare(selection: any) {
      const { title, subtitle, media, order } = selection
      return {
        title: `${order}. ${title}`,
        subtitle: subtitle,
        media: media,
      }
    },
  },
}
