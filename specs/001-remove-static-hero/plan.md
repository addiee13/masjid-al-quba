# Implementation Plan: Remove Duplicate Static Hero Section

**Branch**: `001-remove-static-hero` | **Date**: 2026-02-15 | **Spec**: [spec.md](./spec.md)

## Summary

Remove the duplicate static hero section from the homepage (`app/page.tsx`) to keep only the HeroCarousel component that fetches dynamic content from Sanity. This aligns with Constitution Principle V (Content-Driven Architecture) by eliminating hardcoded marketing copy that should be managed via CMS.

## Technical Context

**Language/Version**: TypeScript 5.x (Next.js 14+ strict mode)  
**Primary Dependencies**: Next.js (App Router), React, Sanity.io client  
**Storage**: N/A (no data model changes)  
**Testing**: Manual visual regression testing at 375px, 768px, 1440px viewports  
**Target Platform**: Web (responsive design, mobile-first)  
**Project Type**: Next.js web application  
**Performance Goals**: Reduce page load time by 5-10%, maintain CLS < 0.1  
**Constraints**: Cannot break existing sections (EventHero, PrayerTimesWidget, Quick Links)  
**Scale/Scope**: Single file edit (~80 lines removal from app/page.tsx)

## Constitution Check

*GATE: Must pass before implementation.*

✅ **Principle I (Tech Stack & Architecture)**: No changes to tech stack - pure TSX file edit  
✅ **Principle II (Minimal Feature Set)**: Removes duplicate functionality (hardcoded hero vs. dynamic carousel)  
✅ **Principle III (Accessibility First)**: No accessibility impact - HeroCarousel already handles ARIA labels, keyboard nav  
✅ **Principle IV (Performance Standards)**: Reduces DOM elements, removes SVG graphics → 5-10% load time improvement  
✅ **Principle V (Content-Driven Architecture)**: **PRIMARY ALIGNMENT** - Enforces Sanity as content source, removes hardcoded marketing copy  
✅ **Principle VI (Clean Code Architecture)**: Reduces `app/page.tsx` from ~318 to ~238 lines (24% reduction, closer to 150-line target)  
✅ **Principle VII (Testing & Quality Gates)**: Must pass `npm run lint`, `tsc --noEmit`, `npm run build`

**Result**: ✅ ALL CHECKS PASS - No constitutional violations

## Project Structure

### Documentation (this feature)

```text
specs/001-remove-static-hero/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (implementation plan)
├── tasks.md             # Task breakdown (to be generated via /speckit.tasks)
└── checklists/
    └── requirements.md  # Spec validation checklist (completed)
```

### Source Code (repository root)

```text
app/
├── page.tsx             # ⚠️ TO BE EDITED: Remove lines 65-145 (static hero section)
├── globals.css          # No changes needed (CSS variables unaffected)
└── carousel.css         # No changes needed (HeroCarousel styles intact)

components/
├── HeroCarousel.tsx     # No changes needed (already working correctly)
├── EventHero.tsx        # No changes needed (remains in page structure)
└── PrayerTimesWidget.tsx # No changes needed (remains in page structure)

sanity/
└── schemaTypes/
    └── heroSlide.ts     # No changes needed (existing schema)
```

**Structure Decision**: This is a single file edit in the existing Next.js App Router structure. No new files, components, or schemas required.

## Implementation Approach

### Phase 1: Code Removal (Single Task)

**Target File**: `app/page.tsx`  
**Lines to Remove**: 65-145 (approximately 80 lines)

**Section to Remove**:
```tsx
{/* Hero Section */}
<section className="relative overflow-hidden">
  {/* ... entire static hero markup ... */}
</section>
```

**Keep Intact**:
- Line 62: `<HeroCarousel slides={heroSlides} />`
- Lines 147+: `{/* Event Banner Section */}` and all sections below

### Phase 2: Verification

**Manual Tests**:
1. Visual inspection at 375px (mobile), 768px (tablet), 1440px (desktop)
2. Verify no layout gaps between HeroCarousel and EventHero
3. Confirm smooth carousel transitions still work
4. Check navigation buttons in HeroCarousel still function

**Automated Tests**:
1. `npm run lint` - ESLint passes
2. `tsc --noEmit` - TypeScript compiles without errors
3. `npm run build` - Next.js build succeeds
4. Lighthouse audit - Performance score ≥ 90, CLS < 0.1

## Risk Assessment

**Complexity**: ⬛⬜⬜⬜⬜ (1/5 - Very Low)

**Risk Level**: LOW
- Single file edit
- No logic changes, only markup removal
- No data model or API changes
- Easily reversible via git

**Potential Issues**:
- ⚠️ CSS gaps: If removed section had spacing, verify no excessive whitespace remains
- ⚠️ Import cleanup: If `Star` icon from lucide-react is unused elsewhere, remove from imports

**Mitigation**: Test in local dev environment before committing

## Dependencies

**Blocking**: None - can implement immediately  
**Concurrent**: None - single task execution  
**Blocked By This**: None - no downstream features depend on this change

## Success Metrics

- [x] `app/page.tsx` reduced to ~238 lines (currently ~318)
- [x] Lighthouse performance score improves by 2-5 points
- [x] Visual regression test passes at all viewport widths
- [x] All automated quality gates pass (lint, typecheck, build)
- [x] CLS remains < 0.1

## Notes

This is a cleanup/refactoring task with minimal risk. The static hero content ("Welcome to Masjid Al-Quba", "Buford, Georgia", CTA buttons) should be recreated as hero slides in Sanity Studio by content editors after this change is deployed.
