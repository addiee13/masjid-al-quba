<!--
================================================================================
SYNC IMPACT REPORT - Constitution Ratification
================================================================================
Version: 1.0.0 (Initial Ratification)
Date: 2026-02-15
Type: MAJOR - Initial constitution establishing project governance

Core Principles Established:
  ✅ I. Tech Stack & Architecture - Next.js + TypeScript + Tailwind + Sanity.io
  ✅ II. Minimal Feature Set - Informational website first, avoid feature creep
  ✅ III. Accessibility First - WCAG 2.1 AA compliance, semantic HTML
  ✅ IV. Performance Standards - Core Web Vitals, optimized assets
  ✅ V. Content-Driven Architecture - Sanity.io for dynamic content
  ✅ VI. Clean Code Architecture - Small components, separation of concerns
  ✅ VII. Testing & Quality Gates - Automated checks before merge

Project Context:
  - Project Name: Masjid Al-Quba
  - Type: Informational website for community mosque
  - Core Features: Prayer times, events, hero carousel, donation info
  - Tech Stack: Next.js 14+, TypeScript, Tailwind CSS v4, Sanity.io
  - Focus: Clarity, maintainability, minimal scope

Governance:
  - All features must pass constitution check before implementation
  - Breaking changes require MAJOR version bump
  - Templates (plan/spec/tasks) enforce compliance checks

================================================================================
-->

# Masjid Al-Quba Project Constitution

## Core Principles

### I. Tech Stack & Architecture
**Technology decisions are locked to ensure consistency and reduce complexity.**

**Stack:**
* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript (Strict Mode enabled in `tsconfig.json`)
* **Styling:** Tailwind CSS v4 with CSS variables in `app/globals.css`
* **CMS:** Sanity.io for all dynamic content
* **Icons:** Lucide React (primary) or FontAwesome 6 (legacy support)

**Structure:**
* App Router pattern (`app/` directory)
* Components in `components/` (not nested in `app/`)
* Sanity schemas in `sanity/schemaTypes/`
* Type definitions in `types/`

**Rationale:** This stack provides type safety, modern React patterns, efficient styling, and headless CMS for non-technical editors. Locking the stack prevents decision paralysis and ensures consistent patterns across all features.

### II. Minimal Feature Set
**Build only what serves the core mission. Resist feature creep.**

**Core Features (In Scope):**
* Prayer times widget (dynamic API + fallback calculation)
* Event listings (from Sanity)
* Hero carousel (from Sanity)
* Donation information (Square/Zelle links + QR codes)
* Basic navigation (Home, Events, Donate, Contact)

**Out of Scope (Unless Explicitly Approved):**
* User accounts or authentication
* E-commerce beyond payment links
* Social media feeds
* Complex booking systems
* Interactive calendars
* Forums or comment sections

**Decision Process:**
* New features require written justification referencing core mission
* Ask: "Can users accomplish this goal with existing features?"
* Prefer linking to external services over building in-house

**Rationale:** Small websites remain maintainable. Each new feature adds testing burden, security surface, and maintenance cost. The community needs reliable information first, not feature richness.

### III. Accessibility First
**The website must be usable by all community members, including those with disabilities.**

**Requirements:**
* **Semantic HTML:** Use `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` appropriately
* **ARIA Labels:** All interactive elements have accessible names (buttons, links, form inputs)
* **Keyboard Navigation:** All functionality accessible via keyboard (Tab, Enter, Escape, Arrow keys)
* **Color Contrast:** Minimum WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text)
* **Alt Text:** All images must have descriptive `alt` attributes (or `alt=""` for decorative images)
* **Focus Indicators:** Visible focus states on all interactive elements (no `outline: none` without replacement)
* **Touch Targets:** Minimum 44×44px for all interactive elements (mobile)

**Testing:**
* Use browser DevTools Lighthouse for accessibility audits
* Test keyboard-only navigation before merging
* Verify color contrast with WebAIM Contrast Checker

**Rationale:** Accessibility is not optional. The mosque serves a diverse community including elderly members, those with visual impairments, and users of assistive technologies. WCAG 2.1 AA is the legal and ethical baseline.

### IV. Performance Standards
**The website must load quickly on mobile devices with slow connections.**

**Core Web Vitals Targets:**
* **LCP (Largest Contentful Paint):** < 2.5 seconds
* **FID (First Input Delay):** < 100 milliseconds
* **CLS (Cumulative Layout Shift):** < 0.1

**Implementation Requirements:**
* **Images:** Use Next.js `<Image>` component with `width`, `height`, and `priority` for above-fold images
* **Fonts:** Self-host or use `next/font` for zero-layout-shift font loading
* **Code Splitting:** Keep client bundles under 200KB (use dynamic imports for heavy components)
* **Caching:** Leverage Sanity CDN and Next.js automatic static optimization
* **Third-Party Scripts:** Minimize external dependencies (prayer time API only)

**Prohibited:**
* Large unoptimized images (> 200KB without compression)
* Blocking JavaScript in `<head>` without `defer` or `async`
* Heavy animation libraries (prefer CSS transitions)
* Unused CSS frameworks or icon sets

**Rationale:** Many community members have limited data plans or older devices. Fast load times improve user experience and Google search rankings. Performance budgets prevent gradual degradation over time.

### V. Content-Driven Architecture
**Dynamic content lives in Sanity. Static content lives in code. Never mix the two.**

**Sanity Schemas (Required):**
* **`heroSlide`:** `title`, `image`, `buttonText`, `link`, `active`, `order`
* **`event`:** `title`, `slug`, `mainImage`, `eventDate`, `description`, `isFeatured`

**Content Guidelines:**
* Marketing copy, events, announcements → Sanity
* UI labels, navigation items, error messages → TypeScript constants
* Prayer times → API fetch with local calculation fallback
* Donation links → Environment variables (`.env.local`)

**Prohibited:**
* Hardcoded event data in components
* Hero carousel slides in `page.tsx`
* Marketing text directly in JSX

**Rationale:** Non-technical staff must update content without deploying. Sanity provides a polished CMS with asset management, versioning, and preview. Clear separation prevents developer bottlenecks.

### VI. Clean Code Architecture
**Components should be small, focused, and independently testable.**

**Component Guidelines:**
* **Size Limit:** Max 200 lines per component (prefer 50-100)
* **Single Responsibility:** One component, one job (e.g., `PrayerTimesWidget` vs. `HomePage`)
* **Naming:** PascalCase for components, camelCase for utilities
* **Props Interface:** Always define TypeScript interfaces for props
* **File Location:**
  * Reusable components → `components/`
  * Page-specific components → `app/[route]/components/` (if needed)
  * Utilities → `lib/` or `utils/`

**Code Organization:**
* Keep page files (`app/*/page.tsx`) under 150 lines
* Extract repeated logic into custom hooks (`use*.ts`)
* Group related utilities (e.g., `lib/dateFormatting.ts`)

**Prohibited:**
* 500+ line page files with inline business logic
* Deeply nested component trees (max 3 levels in one file)
* God objects or utility files with unrelated functions

**Rationale:** Small components are easier to understand, test, and refactor. Clear file structure reduces cognitive load when navigating the codebase. Future developers (or future you) will thank you.

### VII. Testing & Quality Gates
**Automated checks prevent regressions and enforce standards.**

**Required Checks (CI/CD):**
* **Type Check:** `tsc --noEmit` must pass (no TypeScript errors)
* **Lint:** `npm run lint` must pass (ESLint rules enforced)
* **Build:** `npm run build` must succeed (Next.js build without errors)

**Recommended Local Workflow:**
1. Write feature in small increments
2. Run `npm run lint` before commit
3. Run `npm run build` before pushing
4. Fix errors immediately (don't accumulate technical debt)

**Git Hooks (Optional but Encouraged):**
* Pre-commit: Run `lint-staged` for fast feedback
* Pre-push: Run `tsc && npm run build` to catch errors before CI

**Testing Philosophy:**
* **Unit tests:** Optional (add for complex logic like date calculations)
* **Integration tests:** Optional (add for critical user flows if needed)
* **Visual tests:** Manual review in browser at 375px, 768px, 1440px widths

**Rationale:** TypeScript and ESLint catch 80% of bugs before runtime. Build checks ensure code changes don't break production. Automated gates are faster and more reliable than manual code review for syntax issues.

## Design Standards

### Color System
**Use CSS variables exclusively. No hardcoded hex codes.**

**Defined in `app/globals.css`:**
* `--color-white` (#FFFFFF) - Primary backgrounds
* `--color-bg-beige` (#D1D0CB) - Secondary backgrounds
* `--color-primary-dark` (#2E2E2E) - Body text, headings
* `--color-primary-green` (#3D5A45) - Primary actions, branding
* `--color-accent-olive` (#6E6353) - Subtitles, secondary actions
* `--color-accent-sage` (#8A887E) - Borders, muted text

**Usage:** `className="bg-[var(--color-primary-green)]"` or define Tailwind utilities in `tailwind.config.ts`

**Rationale:** CSS variables enable theme consistency and future customization (dark mode, seasonal themes). Hardcoded colors scatter design decisions across files.

### Typography & Spacing
* **Font Loading:** Use `next/font` to prevent layout shift
* **Responsive Text:** Use Tailwind responsive utilities (e.g., `text-base md:text-lg`)
* **Spacing:** Prefer Tailwind spacing scale (`gap-4`, `p-6`) over arbitrary values
* **Line Length:** Max 65-75 characters per line for readability

### Button & Interactive Element Patterns
* **Primary Button:** `bg-primary-green`, `text-white`, `rounded-full`, hover shadow lift
* **Secondary Button:** `border-2 border-primary-green`, `text-primary-green`
* **Link Hover:** Underline or color shift, visible focus ring
* **Disabled State:** `opacity-50`, `cursor-not-allowed`

## File & Code Conventions

### Naming Conventions
* **Components:** PascalCase (`EventCard.tsx`, `HeroCarousel.tsx`)
* **Utilities:** camelCase (`formatDate.ts`, `calculatePrayerTimes.ts`)
* **Constants:** SCREAMING_SNAKE_CASE (`API_ENDPOINTS.ts`, `PRAYER_METHODS.ts`)
* **Types/Interfaces:** PascalCase (`Event`, `PrayerTime`, `HeroSlide`)

### Import Order (Recommend ESLint Plugin)
1. React/Next.js core imports
2. Third-party libraries
3. Local components
4. Utilities/helpers
5. Types
6. Styles/assets

### Comments & Documentation
* **When to comment:** Complex logic, business rules, API quirks, accessibility workarounds
* **When NOT to comment:** Self-explanatory code (variable names should be clear)
* **JSDoc:** Use for public functions/components that other developers will consume

## Governance

### Constitution Authority
This document establishes the "rules of the road" for all development work. When in doubt, refer back to these principles. If a principle blocks progress, propose an amendment rather than working around it.

### Amendment Process
**Version Format:** MAJOR.MINOR.PATCH (e.g., 1.0.0)

* **MAJOR (x.0.0):** Changes to core principles (tech stack, architecture, scope)
  * Example: Switching from Sanity to a different CMS
  * Requires: Written justification, team approval, migration plan
  
* **MINOR (1.x.0):** New principles added, schemas added, guidelines expanded
  * Example: Adding a new required Sanity schema type
  * Requires: Written justification, no breaking changes to existing principles
  
* **PATCH (1.0.x):** Clarifications, examples, typo fixes, formatting improvements
  * Example: Adding code examples to existing principles
  * Requires: No changes to meaning, only clarity

### Pre-Merge Checklist
**All pull requests must pass these gates:**

1. **✅ Scope Check:** Does this feature align with Principle II (Minimal Feature Set)?
   * If adding a new feature: Is there written justification?
   * Can users accomplish this with existing features?

2. **✅ Accessibility Check:** (Principle III)
   * Run Lighthouse accessibility audit (score ≥ 90)
   * Test keyboard navigation (Tab through all interactive elements)
   * Verify color contrast ratios (4.5:1 minimum for text)

3. **✅ Performance Check:** (Principle IV)
   * Run Lighthouse performance audit (score ≥ 90)
   * Check Network tab: No assets > 200KB (except optimized images)
   * Verify images use Next.js `<Image>` component

4. **✅ Content Check:** (Principle V)
   * No hardcoded events, announcements, or marketing copy
   * Dynamic content in Sanity, static UI text in TypeScript constants

5. **✅ Code Quality Check:** (Principle VI)
   * No files > 200 lines
   * Components are focused and single-purpose
   * Props have TypeScript interfaces

6. **✅ Automated Checks:** (Principle VII)
   * `npm run lint` passes
   * `tsc --noEmit` passes (no TypeScript errors)
   * `npm run build` succeeds

### Enforcement
* **Templates:** The `.specify/templates/plan-template.md` includes a "Constitution Check" section
* **Planning:** The `/speckit.plan` command verifies features against these principles
* **Review:** Code reviewers reference this document when providing feedback

### Living Document
This constitution will evolve as the project grows. Propose amendments via pull request with clear justification. Avoid "constitutional amendments" that simply work around inconvenient principles—instead, discuss whether the principle itself needs refinement.

---

**Version**: 1.0.0 | **Ratified**: 2026-02-15 | **Last Amended**: 2026-02-15
