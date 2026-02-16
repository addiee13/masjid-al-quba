import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Event Poster / Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Education', value: 'education' },
          { title: 'Community', value: 'community' },
          { title: 'Outreach', value: 'outreach' },
          { title: 'Fundraising', value: 'fundraising' },
          { title: 'Youth', value: 'youth' },
          { title: 'General', value: 'general' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Masjid Al-Quba',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDateTime',
      title: 'Start Date & Time',
      type: 'datetime',
      description: 'Use local masjid time (America/New_York).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDateTime',
      title: 'End Date & Time',
      type: 'datetime',
      description: 'Optional. Leave empty if not needed.',
    }),
    defineField({
      name: 'recurrenceType',
      title: 'Repeats',
      type: 'string',
      options: {
        list: [
          { title: 'Does not repeat', value: 'none' },
          { title: 'Daily', value: 'daily' },
          { title: 'Weekly', value: 'weekly' },
          { title: 'Monthly', value: 'monthly' },
        ],
        layout: 'radio',
      },
      description:
        'Daily repeats every day. Weekly repeats every week on the same day/time. Monthly repeats every month on the same date/time.',
      initialValue: 'none',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'recurrenceEndDate',
      title: 'Repeat Until',
      type: 'date',
      description: 'Optional. If empty, repeats will be generated up to 12 months ahead.',
      hidden: ({ document }) =>
        !document?.recurrenceType || document.recurrenceType === 'none',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature on Home Page Banner?',
      type: 'boolean',
      description: 'Turn ON to show this event in the homepage event slider.',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Turn OFF to hide this event from public pages.',
      initialValue: true,
    }),
    // Backward-compatible legacy fields retained temporarily.
    defineField({
      name: 'eventDate',
      title: 'Legacy Event Date (old)',
      type: 'datetime',
      hidden: true,
    }),
    defineField({
      name: 'description',
      title: 'Legacy Description (old)',
      type: 'text',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'startDateTime',
      location: 'location',
      recurrenceType: 'recurrenceType',
    },
    prepare({ title, subtitle, location, recurrenceType }) {
      const date = subtitle
        ? new Date(subtitle).toLocaleDateString()
        : 'No date'
      return {
        title: title || 'Untitled Event',
        subtitle: `${date} • ${location || 'No location'} • ${recurrenceType || 'none'}`,
      }
    },
  },
})
