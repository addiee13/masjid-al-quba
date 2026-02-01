// schemaTypes/event.ts
export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    {
      name: 'mainImage',
      title: 'Event Poster / Image',
      type: 'image',
      options: { hotspot: true }, // Allows you to crop images in the CMS
    },
    {
      name: 'eventDate',
      title: 'Date and Time',
      type: 'datetime',
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'isFeatured',
      title: 'Feature in Home Page Banner?',
      type: 'boolean',
      description: 'Toggle this ON to show this event in the main rotating slider.',
      initialValue: false,
    },
  ],
}