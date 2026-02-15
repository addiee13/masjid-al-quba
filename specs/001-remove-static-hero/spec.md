# Feature Specification: Remove Duplicate Static Hero Section

**Feature Branch**: `001-remove-static-hero`  
**Created**: 2026-02-15  
**Status**: Draft  
**Input**: User description: "Remove static hero section and use only HeroCarousel from Sanity. Current behavior: There is a static hero in addition to the carousel. Desired behavior: The homepage should have one hero only: HeroCarousel using heroSlides fetched from Sanity."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Display Single Hero Carousel (Priority: P1)

As a website visitor, I want to see one cohesive hero section at the top of the homepage so that I have a clear, unified first impression without duplicate content.

**Why this priority**: This is a critical user experience fix. Having two hero sections is confusing, creates visual clutter, and violates the principle of content being managed through Sanity CMS (Constitution Principle V: Content-Driven Architecture). The static hero duplicates functionality that should be dynamic.

**Independent Test**: Can be fully tested by navigating to the homepage and verifying only the HeroCarousel component is visible at the top, with no static hero section below it.

**Acceptance Scenarios**:

1. **Given** I am on the homepage, **When** the page loads, **Then** I see only the HeroCarousel component at the top of the page
2. **Given** I am on the homepage, **When** I scroll down from the HeroCarousel, **Then** the next section is the EventHero (if events exist) or PrayerTimesWidget (as currently structured)
3. **Given** I am viewing the homepage on mobile (375px width), **When** the page loads, **Then** the HeroCarousel renders properly with no layout gaps or unexpected spacing
4. **Given** I am viewing the homepage on desktop (1440px width), **When** the page loads, **Then** the HeroCarousel renders properly with smooth transitions between slides

---

### Edge Cases

- **What happens when there are no hero slides in Sanity?**  
  The HeroCarousel component should handle empty slides array gracefully (either show nothing or a placeholder). This existing behavior should remain unchanged.

- **What happens with existing CSS that targets the static hero?**  
  Any CSS specific to the removed static hero section (decorative elements, wave pattern, etc.) should remain in globals.css or carousel.css if shared by other components, but unused hero-specific styles should be removed to reduce bundle size.

- **What about animations/transitions?**  
  The HeroCarousel already has built-in animations. Removing the static hero should not affect the carousel's autoplay or transition behavior.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The homepage MUST display only the HeroCarousel component as the hero section at the top of the page
- **FR-002**: The static hero section (lines 65-145 in `app/page.tsx`) MUST be completely removed, including:
  - Main hero markup (heading "Masjid Al-Quba", subtitle "Buford, Georgia")
  - Decorative elements (background patterns, blur effects, star icon)
  - CTA buttons ("Support Our Project", "Learn About Us")
  - Bottom wave SVG
- **FR-003**: The HeroCarousel component MUST remain at the top of the page structure (currently line 62)
- **FR-004**: The page sections below the HeroCarousel MUST remain in their current order and functionality:
  - EventHero (if featured events exist)
  - PrayerTimesWidget
  - Quick Links Section
  - Future Project Highlight
  - Services Section
- **FR-005**: The page MUST NOT have any visual gaps or excessive spacing where the removed hero section was located
- **FR-006**: All existing imports, data fetching (getFeaturedEvents, getHeroSlides), and component props MUST remain unchanged
- **FR-007**: The page MUST conform to Constitution Principle V (Content-Driven Architecture): dynamic content from Sanity, static UI from code

### Constitutional Compliance

**Principle II (Minimal Feature Set)**: This change aligns with keeping the codebase minimal and avoiding duplicate functionality. Removing the static hero eliminates redundancy.

**Principle V (Content-Driven Architecture)**: This enforces the principle that dynamic content lives in Sanity. The removed static hero violated this by hardcoding marketing copy that should be manageable via CMS.

**Principle VI (Clean Code Architecture)**: Removing ~80 lines of unnecessary markup keeps the page.tsx file under the recommended 150-line guideline (currently ~318 lines, will be ~238 lines after removal).

### Key Entities

This feature does not involve data model changes. It reuses the existing `HeroSlide` schema from Sanity.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Page load time reduces by 5-10% due to removed DOM elements and SVG graphics (measurable via Lighthouse performance score)
- **SC-002**: Homepage `app/page.tsx` file size reduces from ~318 lines to approximately 238 lines (24% reduction)
- **SC-003**: Visual regression test passes: homepage layout matches expected design with single hero section across all viewport widths (375px, 768px, 1440px)
- **SC-004**: Zero layout shift (CLS remains < 0.1) when HeroCarousel loads
- **SC-005**: All homepage sections below the hero remain functional and visually unchanged (EventHero, PrayerTimesWidget, Quick Links, etc.)

## Assumptions

1. The content currently in the static hero ("Welcome to Masjid Al-Quba", "Buford, Georgia", CTA buttons) will be replaced by similar content managed via Sanity heroSlides
2. The HeroCarousel component already handles responsive design and accessibility requirements (keyboard navigation, ARIA labels) as per Constitution Principle III
3. The Quick Links SVG icons and "Support Our Project" CTA elsewhere on the page provide navigation targets previously offered by the static hero buttons
4. No other pages or components reference CSS classes specific to the removed static hero section

## Out of Scope

- Modifying the HeroCarousel component itself
- Adding new hero slides to Sanity (content management task, separate from code changes)
- Redesigning the homepage layout beyond removing the duplicate hero
- Updating other pages that may have similar static hero sections
- Removing CSS variables or global styles that might be used by other components
