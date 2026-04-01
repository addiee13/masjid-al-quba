import { defineField, defineType } from 'sanity'
import { TimeInput } from '../components/TimeInput'

const timeValidation = /^([01]\d|2[0-3]):[0-5]\d$/

function prayerTimeField(name: string, title: string, example: string) {
  return defineField({
    name,
    title,
    type: 'string',
    description: `Use 24-hour HH:mm (e.g., ${example})`,
    components: {
      input: TimeInput,
    },
    validation: (Rule) =>
      Rule.required()
        .regex(timeValidation)
        .error(`Use 24-hour HH:mm (e.g., ${example})`),
  })
}

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
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      description: 'Optional. If set, this schedule starts on this local masjid date.',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Optional. If set, this schedule stops after this local masjid date.',
    }),
    prayerTimeField('fajr', 'Fajr', '05:30'),
    prayerTimeField('dhuhr', 'Dhuhr', '13:15'),
    prayerTimeField('asr', 'Asr', '16:45'),
    prayerTimeField('maghrib', 'Maghrib', '18:30'),
    prayerTimeField('isha', 'Isha', '20:00'),
    defineField({
      name: 'maghribSource',
      title: 'Maghrib Source',
      type: 'string',
      initialValue: 'manual',
      options: {
        list: [
          { title: 'Manual time', value: 'manual' },
          { title: 'Sunset + offset', value: 'sunset' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'maghribOffsetMinutes',
      title: 'Maghrib Offset Minutes',
      type: 'number',
      description: 'Used only when Maghrib Source is set to Sunset + offset.',
      initialValue: 0,
      validation: (Rule) => Rule.min(0).max(60),
      hidden: ({ document }) => document?.maghribSource !== 'sunset',
    }),
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      description: 'Optional. Defaults to the masjid coordinates in the app.',
      validation: (Rule) => Rule.min(-90).max(90),
      hidden: ({ document }) => document?.maghribSource !== 'sunset',
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      description: 'Optional. Defaults to the masjid coordinates in the app.',
      validation: (Rule) => Rule.min(-180).max(180),
      hidden: ({ document }) => document?.maghribSource !== 'sunset',
    }),
    defineField({
      name: 'jummah',
      title: 'Jummah',
      type: 'string',
      description: 'Leave empty to hide Jummah row',
      components: {
        input: TimeInput,
      },
      validation: (Rule) =>
        Rule.regex(timeValidation).error('Use 24-hour HH:mm (e.g., 13:30)'),
    }),
    defineField({
      name: 'jummahTimes',
      title: 'Jummah Times',
      type: 'array',
      description: 'Optional. Use this when there are multiple Jumuah salah times.',
      of: [
        {
          type: 'string',
          components: {
            input: TimeInput,
          },
          validation: (Rule) =>
            Rule.required()
              .regex(timeValidation)
              .error('Use 24-hour HH:mm (e.g., 14:00)'),
        },
      ],
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
