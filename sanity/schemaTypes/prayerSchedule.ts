import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'prayerSchedule',
  title: 'Prayer Schedule',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Schedule Title',
      type: 'string',
      description: 'e.g., "Winter Schedule 2026"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'effectiveFrom',
      title: 'Effective From',
      type: 'date',
      description: 'Start date for this schedule',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'effectiveTo',
      title: 'Effective To',
      type: 'date',
      description: 'End date (leave empty for ongoing)',
    }),
    defineField({
      name: 'fajrAthan',
      title: 'Fajr Athan',
      type: 'string',
      description: 'Format: HH:mm (24-hour)',
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        name: 'time',
        invert: false,
      }).error('Must be in HH:mm format (e.g., 06:00)'),
    }),
    defineField({
      name: 'fajrIqamah',
      title: 'Fajr Iqamah',
      type: 'string',
      description: 'Format: HH:mm (24-hour)',
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        name: 'time',
        invert: false,
      }),
    }),
    defineField({
      name: 'dhuhrAthan',
      title: 'Dhuhr Athan',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    }),
    defineField({
      name: 'dhuhrIqamah',
      title: 'Dhuhr Iqamah',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    }),
    defineField({
      name: 'asrAthan',
      title: 'Asr Athan',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    }),
    defineField({
      name: 'asrIqamah',
      title: 'Asr Iqamah',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    }),
    defineField({
      name: 'maghribAthan',
      title: 'Maghrib Athan',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    }),
    defineField({
      name: 'maghribIqamah',
      title: 'Maghrib Iqamah',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    }),
    defineField({
      name: 'ishaAthan',
      title: 'Isha Athan',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    }),
    defineField({
      name: 'ishaIqamah',
      title: 'Isha Iqamah',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    }),
    defineField({
      name: 'jummahKhutbah',
      title: 'Jummah Khutbah',
      type: 'string',
      description: 'Leave empty to hide Jummah row',
      validation: (Rule) => Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    }),
    defineField({
      name: 'jummahIqamah',
      title: 'Jummah Iqamah',
      type: 'string',
      validation: (Rule) => Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      from: 'effectiveFrom',
      to: 'effectiveTo',
    },
    prepare(selection) {
      const { title, from, to } = selection
      const dateRange = to ? `${from} to ${to}` : `${from} onwards`
      return {
        title: title,
        subtitle: dateRange,
      }
    },
  },
})
