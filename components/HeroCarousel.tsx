'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/sanity'
import '../app/carousel.css'

interface HeroSlide {
  _id: string
  image: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  active: boolean
  order: number
}

interface HeroCarouselProps {
  slides: HeroSlide[]
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      duration: 30,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // Filter active slides and sort by order
  const activeSlides = slides.filter((slide) => slide.active).sort((a, b) => a.order - b.order)

  if (activeSlides.length === 0) {
    return null
  }

  return (
    <section className="relative w-full h-[calc(75vh-5rem)] md:h-[calc(100vh-6rem)] min-h-[460px] md:min-h-[620px] overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full flex">
          {activeSlides.map((slide) => (
            <div key={slide._id} className="embla__slide flex-[0_0_100%] min-w-0 relative h-full">
              <div className="absolute inset-0">
                <Image
                  src={urlFor(slide.image).width(1920).height(1080).url()}
                  alt="Hero banner image"
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                />
              </div>

              {/* Image protection overlay for controls and CTA dock */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {activeSlides.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/45 border border-white/30 backdrop-blur-sm text-white opacity-85 hover:opacity-100 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/45 border border-white/30 backdrop-blur-sm text-white opacity-85 hover:opacity-100 transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-3xl">
        <div className="rounded-2xl bg-white/18 border border-white/35 backdrop-blur-lg p-2.5 md:p-3 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <Link
              href="/donate"
              className="h-10 md:h-11 rounded-xl bg-white text-primary-dark font-body font-semibold flex items-center justify-center hover:bg-bg-beige transition-colors"
            >
              Donate
            </Link>
            <Link
              href="/#prayer-times"
              className="h-10 md:h-11 rounded-xl bg-primary-green text-white font-body font-semibold flex items-center justify-center hover:bg-primary-dark transition-colors"
            >
              Prayer Times
            </Link>
            <Link
              href="/contact"
              className="h-10 md:h-11 rounded-xl bg-[#2f4f3e] text-white border border-white/30 font-body font-semibold flex items-center justify-center hover:bg-[#284436] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
