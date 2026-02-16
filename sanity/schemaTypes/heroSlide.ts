import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Deprecated: no longer shown in the website hero',
      hidden: true,
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      description: 'High-resolution background image for the slide',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Deprecated: hero CTAs are now fixed globally',
      hidden: true,
    }),
    defineField({
      name: 'link',
      title: 'Button Link',
      type: 'url',
      description: 'Deprecated: hero CTAs are now fixed globally',
      hidden: true,
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide this slide',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order of the slide (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      active: 'active',
      order: 'order',
    },
    prepare(selection) {
      const { title, media, active, order } = selection
      return {
        title: title || `Hero Slide ${typeof order === 'number' ? `#${order}` : ''}`.trim(),
        subtitle: `${active ? 'Active' : 'Inactive'}${typeof order === 'number' ? ` • Order ${order}` : ''}`,
        media,
      }
    },
  },
})
