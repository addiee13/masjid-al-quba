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
    prayerTimeField('fajr', 'Fajr', '05:30'),
    prayerTimeField('dhuhr', 'Dhuhr', '13:15'),
    prayerTimeField('asr', 'Asr', '16:45'),
    prayerTimeField('maghrib', 'Maghrib', '18:30'),
    prayerTimeField('isha', 'Isha', '20:00'),
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
