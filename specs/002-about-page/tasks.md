# Tasks: About Us Page

**Input**: Design documents from `/specs/002-about-page/`
**Prerequisites**: plan.md (completed), spec.md (completed)

**Tests**: No test tasks included - tests were not requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and route setup

- [x] T001 Create directory structure: app/about/ and components/about/
- [x] T002[P] Verify existing design system classes are available (btn-primary, btn-secondary, card, pattern-bg in app/globals.css)

---

## Phase 2: Foundational (Reusable Components)

**Purpose**: Core components that multiple sections depend on

**⚠️ CRITICAL**: These components must be complete before page assembly can begin

- [x] T003 [P] Create HighlightChip component in components/about/HighlightChip.tsx (props: icon, label; styling: rounded-full, border, 16-20px icon)
- [x] T004 [P] Create StatsCard component in components/about/StatsCard.tsx (props: title, description, link optional; styling: card class, responsive grid)
- [x] T005 [P] Create MissionVisionSection component in components/about/MissionVisionSection.tsx (props: mission, vision; styling: 2-col md+, 1-col mobile)

**Checkpoint**: Foundation ready - page assembly can now begin

---

## Phase 3: User Story 1 - Learn About the Masjid (Priority: P1) 🎯 MVP

**Goal**: Display complete information about the masjid through hero, story, stats, and mission/vision sections

**Independent Test**: Navigate to /about route and verify all content sections (hero with chips, story text, stats cards, mission/vision statements) are visible and readable

### Implementation for User Story 1

- [x] T006 [US1] Create app/about/page.tsx with metadata (title: "About | Masjid Al-Quba") and basic layout structure
- [x] T007 [US1] Implement hero section in app/about/page.tsx: H1 "About Masjid Al-Quba", subtitle (CR-001), background with pattern-bg fallback
- [x] T008 [US1] Add three HighlightChip components to hero: Prayer (Church icon), Community (Users icon), Education (BookOpen icon from Lucide React)
- [x] T009 [US1] Implement "Our Story" intro section in app/about/page.tsx with text from CR-003 (welcoming language, families/youth/newcomers, spiritual home)
- [x] T010 [US1] Implement stats row section in app/about/page.tsx using four StatsCard components with content from CR-006 (Daily Prayers, Jumu'ah, Programs, Community)
- [x] T011 [US1] Implement mission/vision section in app/about/page.tsx using MissionVisionSection component with text from CR-004 and CR-005
- [x] T012 [US1] Verify section order: Hero → Intro → Stats → Mission/Vision (LR-001)
- [x] T013 [US1] Verify responsive layout: 1-col mobile (<768px), 2-col tablet (768-1024px), 3-col desktop (>1024px) for stats grid (FR-011, LR-003)

**Checkpoint**: At this point, User Story 1 should be fully functional - visitors can learn all about the masjid without CTAs

---

## Phase 4: User Story 2 - Take Action After Learning (Priority: P2)

**Goal**: Enable visitors to take action through CTA buttons for visiting, donating, volunteering

**Independent Test**: Click all CTA buttons and verify navigation to correct destinations (/contact or /visit, /donate, /volunteer)

### Implementation for User Story 2

- [x] T014 [US2] Add two CTA buttons to hero section in app/about/page.tsx: "Visit Us" (btn-primary → /contact) and "Support the Masjid" (btn-secondary → /donate)
- [x] T015 [US2] Implement final CTA section in app/about/page.tsx: heading "Be part of the community", description text from CR-007
- [x] T016 [US2] Add two CTA buttons to final section: "Get Involved" (btn-primary → /volunteer) and "Donate" (btn-secondary → /donate)
- [x] T017 [US2] Verify all CTA buttons are keyboard accessible (Tab navigation, Enter activation) and use Link component from next/link
- [x] T018 [US2] Test navigation: verify /contact, /donate, /volunteer routes exist or create placeholder pages if needed

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - visitors can learn and take action

---

## Phase 5: User Story 3 - Navigate from Services Link (Priority: P3)

**Goal**: Provide additional navigation to detailed service information from stats section

**Independent Test**: Click services link in stats section and verify navigation to services page

### Implementation for User Story 3

- [x] T019 [US3] Add services link to stats section in app/about/page.tsx (styled as text link, positioned near or within stats cards)
- [x] T020 [US3] Verify link navigates to /services route or appropriate services destination
- [x] T021 [US3] Ensure link has accessible label and visible focus state

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Responsive design validation, optional navigation integration, and final quality checks

- [ ] T022 [P] Responsive validation at 375px (mobile): verify 1-column layout, readable text, touch targets ≥ 44×44px
- [ ] T023 [P] Responsive validation at 768px (tablet): verify 2-column layouts where appropriate (mission/vision side-by-side)
- [ ] T024 [P] Responsive validation at 1440px (desktop): verify 3-column stats grid, proper spacing, no layout issues
- [ ] T025 [P] Accessibility audit: verify semantic HTML (header, main, section), ARIA labels for icons, color contrast WCAG 2.1 AA
- [ ] T026 Verify component file sizes: app/about/page.tsx < 150 lines, all components/about/* < 100 lines each
- [ ] T027 OPTIONAL: Add "About" link to navigation menu in components/Header.tsx (if not already present)
- [ ] T028 Run automated quality gates: npm run lint, tsc --noEmit, npm run build
- [ ] T029 Lighthouse audit: verify Accessibility ≥ 90, Performance ≥ 90, Best Practices ≥ 90, SEO ≥ 90

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User Story 1 (P1) can start after Foundational
  - User Story 2 (P2) can start after Foundational, integrates with US1 (adds CTAs to existing sections)
  - User Story 3 (P3) can start after Foundational, integrates with US1 (adds link to stats section)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 completion - adds CTAs to hero section created in US1
- **User Story 3 (P3)**: Depends on US1 completion - adds link to stats section created in US1

### Within Each User Story

- US1: Metadata and layout → Hero → Story → Stats → Mission/Vision → Responsive verification
- US2: Hero CTAs → Final CTA section → Keyboard accessibility → Navigation testing
- US3: Add link → Verify navigation → Accessibility check

### Parallel Opportunities

- All Setup tasks (T001-T002) can run in parallel
- All Foundational tasks (T003-T005) can run in parallel - different component files
- Within US1: Tasks T007-T011 should be sequential (building up the page), but T012-T013 can run in parallel
- All Polish tasks (T022-T025, T028-T029) marked [P] can run in parallel

---

## Parallel Example: Foundational Phase

```bash
# Launch all foundational components together:
Task: "Create HighlightChip component in components/about/HighlightChip.tsx"
Task: "Create StatsCard component in components/about/StatsCard.tsx"
Task: "Create MissionVisionSection component in components/about/MissionVisionSection.tsx"
```

---

## Parallel Example: Polish Phase

```bash
# Launch all responsive validation and audits together:
Task: "Responsive validation at 375px (mobile)"
Task: "Responsive validation at 768px (tablet)"
Task: "Responsive validation at 1440px (desktop)"
Task: "Accessibility audit"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
   - Navigate to /about
   - Verify all content sections visible
   - Test responsive layouts
5. Deploy/demo if ready - this delivers a complete informational About page

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP - complete About page with information)
3. Add User Story 2 → Test independently → Deploy/Demo (adds interactive CTAs)
4. Add User Story 3 → Test independently → Deploy/Demo (adds services navigation)
5. Complete Polish phase → Final quality validation
6. Each story adds value without breaking previous stories

### Sequential Execution (Recommended for Solo Developer)

Since US2 and US3 integrate with sections created in US1:

1. Complete Setup + Foundational
2. Complete US1 fully (deliver MVP)
3. Add US2 (enhance existing page with CTAs)
4. Add US3 (add services link to existing stats)
5. Complete Polish phase

### Parallel Team Strategy

With multiple developers (after Foundational phase complete):

1. Developer A: US1 (core page structure and content)
2. Once US1 complete:
   - Developer A or B: US2 (add CTAs to page)
   - Developer A or C: US3 (add services link)
3. All developers: Polish phase tasks in parallel

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- No tests included as none were requested in specification
- US4 (mobile access) is implemented through responsive design requirements in US1 and validated in Polish phase
- All components must stay under size limits: page < 150 lines, components < 100 lines each
- CTA destination routes (/visit, /volunteer) may need placeholder pages created in T018
- Hero banner image is optional - pattern-bg gradient fallback is primary implementation
- Constitution compliance verified in plan.md - no violations
