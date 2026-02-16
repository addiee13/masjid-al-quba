'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { urlFor } from '../sanity/lib/sanity'

interface Event {
  title: string
  slug?: { current: string } | null
  mainImage: unknown
  description: string
  eventDate: string
}

export default function EventHero({ events }: { events: Event[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })])

  if (!events || events.length === 0) return null

  return (
    <section className="py-12 px-4" style={{ backgroundColor: '#D1D0CB' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 font-['El_Messiri']" style={{ color: '#6E6353' }}>
          Upcoming Events
        </h2>
        
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {events.map((event, index) => (
              <div
                key={`${event.slug?.current || "event"}-${event.eventDate || "no-date"}-${index}`}
                className="flex-[0_0_100%] min-w-0 px-4"
              >
                <div 
                  className="rounded-lg overflow-hidden shadow-lg bg-white"
                  style={{ borderColor: '#A2A092', borderWidth: '2px' }}
                >
                  <div className="md:flex">
                    {event.mainImage && (
                      <div className="md:w-1/2 relative h-64 md:h-80">
                        <Image
                          src={urlFor(event.mainImage).url()}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-6 md:w-1/2 flex flex-col justify-center">
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 font-['El_Messiri']" style={{ color: '#6E6353' }}>
                        {event.title}
                      </h3>
                      
                      <p className="text-sm mb-4 font-['Open_Sans']" style={{ color: '#A2A092' }}>
                        {new Intl.DateTimeFormat('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          timeZone: 'UTC'
                        }).format(new Date(event.eventDate))}
                      </p>
                      
                      <p className="text-gray-700 mb-6 font-['Open_Sans'] line-clamp-3">
                        {event.description}
                      </p>
                      
                      {event.slug?.current && (
                        <Link
                          href={`/events/${event.slug.current}`}
                          className="inline-block px-6 py-3 rounded-md text-white font-semibold font-['Open_Sans'] transition-all duration-300 hover:opacity-80 hover:scale-105 w-fit"
                          style={{ backgroundColor: '#6E6353' }}
                        >
                          Learn More
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
