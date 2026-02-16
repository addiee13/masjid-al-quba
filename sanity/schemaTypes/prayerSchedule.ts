import { defineField, defineType } from 'sanity'
import { TimeInput } from '../components/TimeInput'

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
      name: 'fajrAthan',
      title: 'Fajr Athan',
      type: 'string',
      description: 'Use 24-hour HH:mm (e.g., 05:30)',
      components: {
        input: TimeInput,
      },
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
        name: 'time',
        invert: false,
      }).error('Use 24-hour HH:mm (e.g., 05:30)'),
    }),
    defineField({
      name: 'fajrIqamah',
      title: 'Fajr Iqamah',
      type: 'string',
      description: 'Use 24-hour HH:mm (e.g., 06:00)',
      components: {
        input: TimeInput,
      },
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/).error('Use 24-hour HH:mm (e.g., 06:00)'),
    }),
    defineField({
      name: 'dhuhrAthan',
      title: 'Dhuhr Athan',
      type: 'string',
      description: 'Use 24-hour HH:mm (e.g., 13:15)',
      components: {
        input: TimeInput,
      },
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/).error('Use 24-hour HH:mm (e.g., 13:15)'),
    }),
    defineField({
      name: 'dhuhrIqamah',
      title: 'Dhuhr Iqamah',
      type: 'string',
      description: 'Use 24-hour HH:mm (e.g., 13:30)',
      components: {
        input: TimeInput,
      },
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/).error('Use 24-hour HH:mm (e.g., 13:30)'),
    }),
    defineField({
      name: 'asrAthan',
      title: 'Asr Athan',
      type: 'string',
      description: 'Use 24-hour HH:mm (e.g., 16:45)',
      components: {
        input: TimeInput,
      },
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/).error('Use 24-hour HH:mm (e.g., 16:45)'),
    }),
    defineField({
      name: 'asrIqamah',
      title: 'Asr Iqamah',
      type: 'string',
      description: 'Use 24-hour HH:mm (e.g., 17:00)',
      components: {
        input: TimeInput,
      },
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/).error('Use 24-hour HH:mm (e.g., 17:00)'),
    }),
    defineField({
      name: 'maghribAthan',
      title: 'Maghrib Athan',
      type: 'string',
      description: 'Use 24-hour HH:mm (e.g., 18:30)',
      components: {
        input: TimeInput,
      },
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/).error('Use 24-hour HH:mm (e.g., 18:30)'),
    }),
    defineField({
      name: 'maghribIqamah',
      title: 'Maghrib Iqamah',
      type: 'string',
      description: 'Use 24-hour HH:mm (e.g., 18:35)',
      components: {
        input: TimeInput,
      },
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/).error('Use 24-hour HH:mm (e.g., 18:35)'),
    }),
    defineField({
      name: 'ishaAthan',
      title: 'Isha Athan',
      type: 'string',
      description: 'Use 24-hour HH:mm (e.g., 20:00)',
      components: {
        input: TimeInput,
      },
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/).error('Use 24-hour HH:mm (e.g., 20:00)'),
    }),
    defineField({
      name: 'ishaIqamah',
      title: 'Isha Iqamah',
      type: 'string',
      description: 'Use 24-hour HH:mm (e.g., 20:15)',
      components: {
        input: TimeInput,
      },
      validation: (Rule) => Rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/).error('Use 24-hour HH:mm (e.g., 20:15)'),
    }),
    defineField({
      name: 'jummahKhutbah',
      title: 'Jummah Khutbah',
      type: 'string',
      description: 'Leave empty to hide Jummah row',
      components: {
        input: TimeInput,
      },
      validation: (Rule) => Rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/).error('Use 24-hour HH:mm (e.g., 13:00)'),
    }),
    defineField({
      name: 'jummahIqamah',
      title: 'Jummah Iqamah',
      type: 'string',
      description: 'Use 24-hour HH:mm (e.g., 13:30)',
      components: {
        input: TimeInput,
      },
      validation: (Rule) => Rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/).error('Use 24-hour HH:mm (e.g., 13:30)'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title || 'Prayer Times',
      }
    },
  },
})
