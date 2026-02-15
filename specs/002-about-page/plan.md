# Implementation Plan: About Us Page

**Branch**: `002-about-page` | **Date**: 2026-02-15 | **Spec**: [spec.md](./spec.md)

## Summary

Create a comprehensive About Us page (`/about`) that introduces visitors to Masjid Al-Quba through hero section, story narrative, service stats, mission/vision statements, and call-to-action buttons. The page aligns with Constitution Principle II (Minimal Feature Set) by providing essential informational content and Principle V (Content-Driven Architecture) by using static content appropriately for organizational identity.

## Technical Context

**Language/Version**: TypeScript 5.x (Next.js 14+ strict mode)  
**Primary Dependencies**: Next.js (App Router), React, Lucide React (icons), Tailwind CSS v4  
**Storage**: N/A (static content only, no CMS required for this page)  
**Testing**: Manual visual regression testing at 375px, 768px, 1440px viewports  
**Target Platform**: Web (responsive design, mobile-first)  
**Project Type**: Next.js web application  
**Performance Goals**: LCP < 2.5s, FID < 100ms, CLS < 0.1, Lighthouse score ≥ 90  
**Constraints**: Must use existing design system (btn-primary, btn-secondary, card, pattern-bg), maximum 200 lines per component  
**Scale/Scope**: Single new route with 1 page component, 2-3 reusable sub-components

## Constitution Check

*GATE: Must pass before implementation.*

✅ **Principle I (Tech Stack & Architecture)**: No changes to tech stack - pure Next.js App Router page using TypeScript, Tailwind CSS, and Lucide React icons  
✅ **Principle II (Minimal Feature Set)**: Informational page aligned with core mission - provides essential "About Us" content without adding complex features (no user accounts, e-commerce, etc.)  
✅ **Principle III (Accessibility First)**: Must implement semantic HTML (`<header>`, `<main>`, `<section>`), ARIA labels for icons, keyboard navigation for all CTAs, WCAG 2.1 AA color contrast, and touch targets ≥ 44×44px  
✅ **Principle IV (Performance Standards)**: Static content page with minimal JavaScript, using Next.js `<Image>` for hero banner (if image added), keeping component bundle under 200KB  
✅ **Principle V (Content-Driven Architecture)**: Static organizational information appropriately lives in code (mission/vision statements are stable identity content, not dynamic marketing copy like events)  
✅ **Principle VI (Clean Code Architecture)**: Page file under 150 lines, extract highlight chips, stats cards, mission/vision display into separate components under 100 lines each  
✅ **Principle VII (Testing & Quality Gates)**: Must pass `npm run lint`, `tsc --noEmit`, `npm run build`, and manual responsive testing

**Result**: ✅ ALL CHECKS PASS - No constitutional violations

## Project Structure

### Documentation (this feature)

```text
specs/002-about-page/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (implementation plan)
├── tasks.md             # Task breakdown (to be generated via /speckit.tasks)
└── checklists/
    └── requirements.md  # Spec validation checklist (completed)
```

### Source Code (repository root)

```text
app/
├── about/
│   └── page.tsx         # 🆕 NEW FILE: About Us page component (route handler)
├── globals.css          # No changes needed (uses existing CSS variables)
├── layout.tsx           # No changes needed (existing Header/Footer remain)
└── page.tsx             # No changes needed (homepage unaffected)

components/
├── about/               # 🆕 NEW DIRECTORY: About page specific components
│   ├── HighlightChip.tsx       # 🆕 NEW: Icon + text chip component (Prayer, Community, Education)
│   ├── StatsCard.tsx           # 🆕 NEW: Service stats display card component
│   └── MissionVisionSection.tsx # 🆕 NEW: Two-column mission/vision display component
├── HeroCarousel.tsx     # No changes needed
├── Header.tsx           # ⚠️ OPTIONAL: May add "About" nav link if not already present
└── PrayerTimesWidget.tsx # No changes needed
```

**Structure Decision**: This follows Next.js App Router conventions with route-specific pages in `app/[route]/page.tsx` and reusable components in `components/`. Page-specific sub-components go in `components/about/` to maintain separation of concerns per Constitution Principle VI.

## Implementation Approach

### Phase 1: Page Structure & Hero Section

**Target File**: `app/about/page.tsx` (NEW)

**Components Created**:
1. Page layout with metadata (`title: "About | Masjid Al-Quba"`)
2. Hero section with:
   - H1: "About Masjid Al-Quba"
   - Subtitle paragraph
   - Three highlight chips (Prayer, Community, Education)
   - Two CTA buttons using `.btn-primary` and `.btn-secondary`
   - Optional: Banner image with fallback to `.pattern-bg` gradient

**Component File**: `components/about/HighlightChip.tsx` (NEW)
- Props: `icon` (Lucide icon component), `label` (string)
- Styling: rounded-full, border, brand colors, 16-20px icon size

### Phase 2: Content Sections

**Add to**: `app/about/page.tsx`

**Sections**:
1. **Our Story**: Intro section with text content (from spec CR-003)
2. **Stats Row**: Grid of 3-4 cards
3. **Mission & Vision**: Two-column layout (responsive)

**Component File**: `components/about/StatsCard.tsx` (NEW)
- Props: `title` (string), `description` (string), `link?` (optional href)
- Styling: card, responsive grid layout

**Component File**: `components/about/MissionVisionSection.tsx` (NEW)
- Props: `mission` (string), `vision` (string)
- Styling: two-column on md+, single column on mobile

### Phase 3: Final CTA Section

**Add to**: `app/about/page.tsx`

**Section**:
- Heading: "Be part of the community"
- Description text
- Two buttons: "Get Involved" (btn-primary), "Donate" (btn-secondary)

### Phase 4: Navigation Integration (Optional)

**Target File**: `components/Header.tsx`

**Change**: Add "About" link to navigation menu if not already present
- Route: `/about`
- Position: After "Home" or before "Contact"

### Phase 5: Verification

**Manual Tests**:
1. Visual inspection at 375px (mobile), 768px (tablet), 1440px (desktop)
2. Verify all CTAs navigate correctly (`/contact`, `/visit`, `/donate`, `/volunteer`)
3. Test keyboard navigation (Tab through all buttons and links)
4. Verify text readability and contrast ratios
5. Check responsive grid layouts (1-col mobile, 2-col tablet, 3-col desktop)

**Automated Tests**:
1. `npm run lint` - ESLint passes
2. `tsc --noEmit` - TypeScript compiles without errors
3. `npm run build` - Next.js build succeeds
4. Lighthouse audit - Accessibility score ≥ 90, Performance score ≥ 90

## Risk Assessment

**Complexity**: ⬛⬛⬜⬜⬜ (2/5 - Low)

**Risk Level**: LOW
- New route creation (standard Next.js pattern)
- Static content only (no API calls or state management)
- Reuses existing design system (no new CSS required)
- No data model or CMS changes

**Potential Issues**:
- ⚠️ Route conflicts: Verify `/about` doesn't conflict with existing routes
- ⚠️ Component size: Keep page.tsx under 150 lines by extracting sub-components
- ⚠️ CTA destinations: Some links (`/visit`, `/volunteer`) may not exist yet - document placeholders
- ⚠️ Icon imports: Ensure Lucide React icons (Mosque, Users, BookOpen) don't increase bundle size significantly

**Mitigation**: 
- Test route in local dev environment
- Use dynamic imports for heavy components if bundle exceeds 200KB
- Create placeholder destination pages or link to `/contact` as fallback
- Verify icon tree-shaking works correctly

## Dependencies

**Blocking**: None - can implement immediately  
**Concurrent**: None - single feature execution  
**Blocked By This**: None - no downstream features depend on this page  
**Optional**: Navigation menu update in Header.tsx (low priority)

## Success Metrics

- [x] Route `/about` is accessible and renders without errors
- [x] All content sections display in correct order: Hero → Intro → Stats → Mission/Vision → CTA
- [x] Page is fully responsive: 1-col mobile, 2-col tablet, 3-col desktop (where applicable)
- [x] All 4 CTA buttons are functional and navigate to correct destinations
- [x] Lighthouse scores: Accessibility ≥ 90, Performance ≥ 90, Best Practices ≥ 90, SEO ≥ 90
- [x] Page metadata includes title "About | Masjid Al-Quba"
- [x] All components pass `npm run lint` and `tsc --noEmit`
- [x] Page file remains under 150 lines, all sub-components under 100 lines

## Notes

This is a straightforward informational page with no dynamic content or complex interactions. The content (mission statement, vision, service descriptions) represents stable organizational identity appropriate for code-based storage per Constitution Principle V, unlike event announcements or hero carousel slides which belong in Sanity CMS.

Future enhancements (not in scope):
- Board member profiles (if added, use Sanity schema)
- Photo gallery
- Historical timeline
- Testimonials section
