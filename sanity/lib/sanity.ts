import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { client } from './sanity.client'

const builder = createImageUrlBuilder(client)
export type ImageSource = SanityImageSource

export const urlFor = (source: ImageSource) => builder.image(source)
export const urlForOptional = (source: ImageSource | null | undefined) =>
  source ? builder.image(source) : null
