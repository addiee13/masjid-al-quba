---
description: "Task breakdown for removing duplicate static hero section"
---

# Tasks: Remove Duplicate Static Hero Section

**Input**: Design documents from `/specs/001-remove-static-hero/`
**Prerequisites**: plan.md ✅, spec.md ✅

**Tests**: No automated tests required - manual visual regression testing only

**Organization**: Single user story (P1) - straightforward code removal task

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1 = User Story 1)
- Include exact file paths in descriptions

## Path Conventions

This is a Next.js App Router project:
- Application code: `app/`
- Reusable components: `components/`
- No new files needed - editing existing files only

---

## Phase 1: User Story 1 - Display Single Hero Carousel (Priority: P1) 🎯

**Goal**: Remove duplicate static hero section from homepage, keeping only HeroCarousel powered by Sanity

**Independent Test**: Navigate to homepage at http://localhost:3000 and verify only HeroCarousel is visible at the top, followed by EventHero or PrayerTimesWidget sections

### Implementation Tasks

- [X] T001 [US1] Remove static hero section (lines 65-145) from app/page.tsx including all nested markup: hero heading, subtitle, decorative elements, CTA buttons, and bottom wave SVG
- [X] T002 [US1] Clean up unused imports in app/page.tsx: remove `Star` icon from lucide-react if not used elsewhere in the file
- [X] T003 [US1] Verify HeroCarousel component remains at line ~62 in app/page.tsx (first component in JSX return after data fetching)
- [X] T004 [US1] Verify EventHero section (line ~147+) immediately follows HeroCarousel with no gaps in app/page.tsx

### Verification Tasks

- [X] T005 [US1] Run `npm run lint` and fix any ESLint errors in app/page.tsx
- [X] T006 [US1] Run `tsc --noEmit` and fix any TypeScript errors in app/page.tsx
- [X] T007 [US1] Run `npm run build` and confirm Next.js build succeeds without errors

- [X] T008 [US1] Start dev server with `npm run dev` and visually inspect homepage at http://localhost:3000

- [ ] T008 [US1] Start dev server with `npm run dev` and visually inspect homepage at http://localhost:3000


## Phase 2: Visual Regression Testing & Polish

**Purpose**: Ensure responsive design works correctly and meets constitution standards

### Manual Testing Checklist

- [ ] T009 [US1] Test mobile viewport (375px): Open DevTools, set viewport to 375px width, verify HeroCarousel renders without layout gaps or horizontal scroll
- [ ] T010 [US1] Test tablet viewport (768px): Set viewport to 768px width, verify carousel transitions smoothly between slides
- [ ] T011 [US1] Test desktop viewport (1440px): Set viewport to 1440px width, verify full carousel with navigation controls visible
- [ ] T012 [US1] Test keyboard navigation: Use Tab key to focus carousel controls, verify focus indicators visible and functional
- [ ] T013 [US1] Test carousel autoplay: Wait 5 seconds, verify carousel automatically advances to next slide

### Performance & Accessibility Checks

- [ ] T014 [US1] Run Lighthouse audit in Chrome DevTools: Verify Performance score ≥ 90, Accessibility score ≥ 90
- [ ] T015 [US1] Check Cumulative Layout Shift (CLS): Reload page 3 times, verify CLS < 0.1 in Lighthouse report
- [ ] T016 [US1] Verify no console errors: Open DevTools Console tab, check for zero errors or warnings on page load

---

## Phase 3: Pre-Merge Quality Gates

**Purpose**: Constitutional compliance checks before committing

### Constitution Checklist (Pre-Merge)

- [X] T017 Scope Check (Principle II): Confirm this removes duplicate functionality (static hero) as intended
- [X] T018 Content Check (Principle V): Verify no hardcoded marketing copy remains in app/page.tsx
- [X] T019 Code Quality Check (Principle VI): Verify app/page.tsx is now ~238 lines (reduced from ~318, closer to 150-line target)
- [X] T020 Automated Checks (Principle VII): Confirm all three commands pass: `npm run lint && tsc --noEmit && npm run build`

---

## Summary & Dependencies

**Total Tasks**: 20
- Implementation: 4 tasks (T001-T004)
- Verification: 4 tasks (T005-T008)
- Manual Testing: 8 tasks (T009-T016)
- Quality Gates: 4 tasks (T017-T020)

**Parallelization Opportunities**: None - this is a sequential single-file edit

**Estimated Time**: 30-45 minutes
- Code removal: 5 minutes (T001-T004)
- Verification: 5 minutes (T005-T008)
- Manual testing: 15-20 minutes (T009-T016)
- Quality gates: 5-10 minutes (T017-T020)

**Risk Level**: LOW
- Single file edit with clear line numbers
- No data model or API changes
- Easily reversible via git

**Dependencies**: None - can implement immediately

**Blocked Tasks**: None - all tasks are sequential

---

## Implementation Strategy

### MVP Approach

This entire feature IS the MVP - it's a single user story with one clear outcome: remove duplicate hero section.

**Suggested Execution Order**:
1. Complete Phase 1 (T001-T008) in one session - code changes + verification
2. Complete Phase 2 (T009-T016) immediately after - visual testing while changes are fresh
3. Complete Phase 3 (T017-T020) before committing - final quality validation

### Incremental Delivery

Since this is a single-file, single-story change, there are no incremental delivery milestones. The change should be completed and tested as one atomic unit.

**Commit Message Template**:
```
feat: remove duplicate static hero section on homepage

- Remove static hero markup (lines 65-145) from app/page.tsx
- Keep only HeroCarousel powered by Sanity CMS
- Reduce page.tsx from 318 to ~238 lines (24% reduction)
- Aligns with Constitution Principle V (Content-Driven Architecture)

Closes #001-remove-static-hero
```

---

## Post-Implementation Notes

### Content Migration (Not part of this task)

After deploying this change, content editors should recreate the removed static hero content as Sanity hero slides:

**Suggested Hero Slide to Create in Sanity**:
- **Title**: "Welcome to Masjid Al-Quba"
- **Subtitle**: "Buford, Georgia - A place of worship, learning, and community"
- **CTA Button 1**: "Support Our Project" → `/future-projects`
- **CTA Button 2**: "Learn About Us" → `/about`
- **Image**: Upload appropriate background image with hotspot positioning

This ensures the same information is available to visitors, but managed dynamically via CMS.
