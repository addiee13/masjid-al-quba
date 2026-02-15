<!--
================================================================================
SYNC IMPACT REPORT - Constitution Update
================================================================================
Version Change: 0.0.0 (template) → 1.0.0
Date: 2026-02-15
Type: MAJOR - Initial constitution ratification

Modified/Added Principles:
  ✅ NEW: I. Tech Stack & Architecture (Strict) - Enforces Next.js + TypeScript + Tailwind + Sanity.io stack
  ✅ NEW: II. The "60-30-10" Design System - Establishes color palette and proportions for visual consistency
  ✅ NEW: III. Mobile-First & Responsive Strategy - Mandates mobile-first development approach
  ✅ NEW: IV. Sanity.io Data Source of Truth - Prohibits hardcoded content, requires CMS schemas
  ✅ NEW: V. Component Specifications - Defines interaction patterns for reusable components

Added Sections:
  ✅ Coding Standards & Best Practices (File Structure & Naming, Interaction States)
  ✅ Governance (Amendment Policy, Review Checklist)

Templates Requiring Updates:
  ✅ plan-template.md - Constitution Check section aligns with principles (mobile-first, Sanity check, color variables)
  ✅ spec-template.md - Functional requirements should reference tech stack and design system constraints
  ✅ tasks-template.md - Task phases should include mobile-first verification and Sanity integration checks
  ⚠️  agent-file-template.md - May need alignment with tech stack if it references agent guidance

Follow-up TODOs: None - all placeholders filled

Project Context:
  - Project Name: Masjid Al-Quba
  - Type: Next.js web application with Sanity.io CMS
  - Primary Focus: Community service organization (prayer times, events, donations)
  - Tech Stack: Next.js 14+, TypeScript, Tailwind CSS v4, Sanity.io, Square/Zelle payments

================================================================================
-->

# Masjid Al-Quba Project Constitution

## Core Principles

### I. Tech Stack & Architecture (Strict)
**The codebase must strictly adhere to the following stack. No deviations without approval.**
* **Framework:** Next.js (App Router) with `src/` directory structure.
* **Language:** TypeScript (Strict Mode).
* **Styling:** Tailwind CSS (v4 compatible) using CSS variables defined in `globals.css`.
* **CMS:** Sanity.io (Headless CMS). All dynamic content MUST be modeled here.
* **Payments:** Square (Hosted Links) + Zelle (QR/Email).
* **Icons:** Lucide React (Preferred) or FontAwesome 6.

**Rationale:** This stack provides type safety, modern React patterns, efficient styling with design tokens, headless content management for non-technical editors, and secure payment processing. Consistency prevents fragmentation and ensures all team members work within predictable patterns.

### II. The "60-30-10" Design System
**Visuals must strictly follow the defined palette proportions to ensure accessibility and elegance.**
* **60% Neutral (Backgrounds):**
    * `--color-white` (`#FFFFFF`): Primary background for content cards, reading areas, and the navbar.
    * `--color-bg-beige` (`#D1D0CB`): Secondary background for section dividers, footer, and page body.
* **30% Primary (Identity):**
    * `--color-primary-dark` (`#2E2E2E`): All body text and headings. Never use pure black.
    * `--color-primary-green` (`#3D5A45`): Primary buttons, active navigation states, and key icons.
* **10% Accent (Highlights):**
    * `--color-accent-olive` (`#6E6353`): Subtitles and secondary buttons.
    * `--color-accent-sage` (`#8A887E`): Borders, dividing lines, and muted text.

**Rationale:** The 60-30-10 rule is a proven interior design principle adapted for web interfaces. It creates visual hierarchy, prevents overwhelming users, ensures WCAG accessibility when applied correctly, and establishes the Masjid's visual identity. CSS variables enable consistent theming and future customization.

### III. Mobile-First & Responsive Strategy
**All development begins with the mobile view.**
* **CSS Class Order:** Write Tailwind classes for mobile first (e.g., `w-full`), then add breakpoints (`md:w-1/2`).
* **Touch Targets:** All interactive elements (buttons, inputs) must be at least 44px height.
* **Zelle Handling:**
    * *Mobile:* Show "Copy Email" button.
    * *Desktop:* Show QR Code.

**Rationale:** Over 70% of community members access websites via mobile devices. Mobile-first development ensures core functionality works on constrained viewports before enhancement. The 44px touch target minimum follows Apple/Google accessibility guidelines. Context-aware payment methods (copy email vs QR code) optimize for device capabilities.

### IV. Sanity.io Data Source of Truth
**Hardcoding content is prohibited. Use the following Schema definitions:**
* **Hero Carousel (`heroSlide`):** Must include `title`, `image` (with hotspot), `buttonText`, `link`, `active` (boolean), and `order` (number).
* **Events (`event`):** Must include `title`, `slug`, `mainImage`, `eventDate`, `description`, and `isFeatured` (boolean).
* **Prayer Times:** Fetched dynamically; fallback to static calculation (Adhan.js) if API fails.

**Rationale:** Non-technical staff must update content independently without developer intervention. Sanity provides a polished editorial UI, asset management, version history, and preview. Hardcoded content creates bottlenecks, increases deployment frequency unnecessarily, and prevents timely updates. Schemas enforce data structure consistency.

### V. Component Specifications
**Reusable components must follow these specific interaction patterns:**
* **Carousels:** Must use `embla-carousel-react` (as established in `HeroCarousel.tsx`).
* **Buttons:**
    * Primary: `bg-primary-green` text-white rounded-full (hover: shadow-lg).
    * Secondary: `border-2 border-primary-green` text-primary-green.
* **Cards:** Use `border-light-sage` borders rather than heavy colored backgrounds.

**Rationale:** Embla Carousel is lightweight, accessible (keyboard + screen reader support), and touch-friendly. Standardized button patterns ensure muscle memory for users and reduce cognitive load. Light card borders maintain visual breathing room in content-heavy layouts while adhering to the 60-30-10 system.

## Coding Standards & Best Practices

### File Structure & Naming
* **Components:** PascalCase (e.g., `PrayerTimesWidget.tsx`).
* **Utilities:** camelCase (e.g., `formatDate.ts`).
* **Sanity Schemas:** camelCase (e.g., `heroSlide.ts`).
* **Images:** Store in Sanity; use `next/image` with the Sanity URL builder for optimization.

**Rationale:** PascalCase for components follows React conventions. camelCase for utilities and schemas aligns with JavaScript/TypeScript standards. Sanity asset hosting + Next.js Image optimization delivers responsive images with lazy loading, format negotiation (WebP/AVIF), and CDN caching automatically.

### Interaction States
* **Hover:** Lighten the element by 10% or add a slight lift shadow (`hover:-translate-y-0.5`).
* **Active/Press:** Darken the element by 10%.
* **Disabled:** Opacity 50%, cursor-not-allowed.

**Rationale:** Subtle state changes provide feedback without jarring transitions. Hover lift creates depth and affordance (signals clickability). Darken on press mimics physical button behavior. 50% opacity for disabled states maintains layout integrity while clearly communicating unavailability.

## Governance

### Amendment Policy
Changes to the Technology Stack or Design System (Colors/Fonts) require a **MAJOR** version bump. Adding new features or Sanity schemas requires a **MINOR** bump. Clarifications, wording improvements, or non-semantic refinements require a **PATCH** bump.

**Version Format:** MAJOR.MINOR.PATCH (e.g., 1.0.0)
* **MAJOR:** Breaking changes to core principles (tech stack, design system foundations).
* **MINOR:** New principles, schemas, or capabilities added without removing existing ones.
* **PATCH:** Clarifications, examples, typo fixes, or non-functional improvements.

### Review Checklist
All development work must pass these gates before merge:
1. **Mobile Check:** Does this look good on a 375px wide screen?
2. **Sanity Check:** Is this content hardcoded? If yes, move it to Sanity.
3. **Color Check:** Are we using the CSS variables (`var(--color-...)`) instead of arbitrary hex codes?

**Compliance:** The plan template's "Constitution Check" section must reference these principles. Tasks must include verification steps for mobile-first implementation and Sanity integration. Spec documents must acknowledge tech stack constraints in functional requirements.

**Version**: 1.0.0 | **Ratified**: 2026-02-15 | **Last Amended**: 2026-02-15
