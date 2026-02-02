import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './sanity.client'

const builder = createImageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)
