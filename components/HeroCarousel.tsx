'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/sanity'
import '../app/carousel.css'

interface HeroSlide {
  _id: string
  title: string
  image: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  buttonText?: string
  link?: string
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
    <div className="relative w-full h-[70vh] min-h-[600px] overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full flex">
          {activeSlides.map((slide) => (
            <div key={slide._id} className="embla__slide flex-[0_0_100%] min-w-0 relative h-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={urlFor(slide.image).width(1920).height(1080).url()}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                />
              </div>

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Content at Bottom Center */}
              <div className="absolute bottom-0 left-0 right-0 pb-12 flex flex-col items-center justify-end text-center px-4">
                {/* Title */}
                <h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 max-w-5xl"
                  style={{ fontFamily: "'El Messiri', sans-serif" }}
                >
                  {slide.title}
                </h1>

                {/* Button */}
                {slide.buttonText && slide.link && (
                  <a
                    href={slide.link}
                    className="px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{ 
                      backgroundColor: '#6E6353',
                      fontFamily: "'Open Sans', sans-serif"
                    }}
                  >
                    {slide.buttonText}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {activeSlides.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white opacity-50 hover:opacity-100 transition-opacity duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next Button */}
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white opacity-50 hover:opacity-100 transition-opacity duration-300"
            aria-label="Next slide"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}
    </div>
  )
}
