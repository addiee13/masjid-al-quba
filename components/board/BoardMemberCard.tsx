'use client'

import React from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/sanity'

export type BoardMember = {
  _id: string
  name: string
  role: string
  order: number
  image?: {
    asset?: {
      _ref?: string
    }
    [key: string]: unknown
  }
  bio?: string
}

interface BoardMemberCardProps {
  member: BoardMember
}

/**
 * Extracts initials from a full name, ignoring common titles
 * Example: "Dr. Mohammad Asadur Rahman" → "MR"
 * Example: "Sarah Ahmed" → "SA"
 */
function getInitials(name: string): string {
  const titles = ['dr', 'dr.', 'mr', 'mr.', 'mrs', 'mrs.', 'ms', 'ms.', 'prof', 'prof.']
  
  // Split name into words and filter out empty strings
  const words = name
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0)
  
  // Filter out titles (case-insensitive)
  const meaningfulWords = words.filter(
    word => !titles.includes(word.toLowerCase())
  )
  
  // If we have at least 2 words, use first and last
  if (meaningfulWords.length >= 2) {
    const firstInitial = meaningfulWords[0][0].toUpperCase()
    const lastInitial = meaningfulWords[meaningfulWords.length - 1][0].toUpperCase()
    return firstInitial + lastInitial
  }
  
  // If only one word, use first two letters
  if (meaningfulWords.length === 1) {
    const word = meaningfulWords[0]
    return word.length >= 2 
      ? word.substring(0, 2).toUpperCase()
      : word[0].toUpperCase()
  }
  
  // Fallback
  return '??'
}

export default function BoardMemberCard({ member }: BoardMemberCardProps) {
  const initials = getInitials(member.name)
  const hasImage = member.image?.asset?._ref

  return (
    <div
      className="group relative bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary-green to-accent-olive">
          {hasImage ? (
            <Image
              src={urlFor(member.image).width(96).height(96).fit('crop').url() || ''}
              alt={`${member.name} - ${member.role}`}
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white font-heading text-2xl font-bold">
              {initials}
            </div>
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="font-heading text-xl font-semibold text-primary-dark text-center mb-2">
        {member.name}
      </h3>

      {/* Role Badge */}
      <div className="flex justify-center mb-3">
        <span className="inline-block px-4 py-1.5 bg-primary-green/10 text-primary-green font-body text-sm font-medium rounded-full border border-primary-green/20">
          {member.role}
        </span>
      </div>

      {/* Bio (if provided) */}
      {member.bio && (
        <p className="font-body text-sm text-muted-foreground text-center leading-relaxed">
          {member.bio}
        </p>
      )}

      {/* Focus ring for accessibility */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-primary-green ring-offset-2 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
    </div>
  )
}
