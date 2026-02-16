import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './sanity.client'

const builder = createImageUrlBuilder(client)
type ImageSource = Parameters<typeof builder.image>[0]

export const urlFor = (source: ImageSource) => builder.image(source)
