# 09 — Design Acceptance Checklist

> **Document type:** Testable pass/fail criteria for implementation validation  
> **Status:** Design-only — use this to verify the built portfolio against the design spec  

---

## Instructions

Each criterion below is a concrete, testable statement. During or after implementation, evaluate each one as:

- **✅ Pass** — The criterion is fully met.
- **⚠️ Partial** — Partially met; note what's missing.
- **❌ Fail** — Not met.

A successful implementation must achieve **✅ Pass** on all items marked **[REQUIRED]** and at least 80% of items marked **[RECOMMENDED]**.

---

## 1. Visual Identity

| # | Criterion | Priority |
|---|---|---|
| 1.1 | The page background uses a dark gradient from `#0A0B14` (top) to `#06060B` (bottom), not flat grey or flat black. | [REQUIRED] |
| 1.2 | The primary accent colour is cyan (`#06B6D4`), not orange or red. | [REQUIRED] |
| 1.3 | The secondary accent colour is violet (`#8B5CF6`), used sparingly. | [REQUIRED] |
| 1.4 | No orange-to-red gradients remain anywhere in the UI. | [REQUIRED] |
| 1.5 | Display headings (hero name, section titles) use the **Outfit** typeface at weight 700–800. | [REQUIRED] |
| 1.6 | Body text uses **Inter**. Monospace text (tech tags, code) uses **JetBrains Mono**. | [REQUIRED] |
| 1.7 | Gradient text effect (used on accent words in section headings) is cyan-to-violet, not orange-to-red. | [REQUIRED] |
| 1.8 | Card surfaces use `#13141D` background with `#1E1F2E` border, radius 16px. | [REQUIRED] |
| 1.9 | No dot patterns, floating gradient blobs, or background decorative noise is present. | [REQUIRED] |
| 1.10 | The overall visual impression is distinctly different from a generic Tailwind dark template. | [REQUIRED] |

---

## 2. Typography & Content

| # | Criterion | Priority |
|---|---|---|
| 2.1 | The hero heading reads "Aaditya Kumar" in display type (72px desktop / 40px mobile). | [REQUIRED] |
| 2.2 | The hero overline reads "FULL-STACK DEVELOPER" in uppercase label style. | [REQUIRED] |
| 2.3 | The hero tagline reads "Crafting digital experiences with precision and code" (or approved alternative). | [REQUIRED] |
| 2.4 | No "Did I cook?" or "Or did I REALLY cook?" text appears anywhere. | [REQUIRED] |
| 2.5 | No unverified statistics are displayed ("100% Client Satisfaction", "1000+ Commits", etc.). | [REQUIRED] |
| 2.6 | Body text line length does not exceed ~65 characters (~680px). | [RECOMMENDED] |
| 2.7 | Section headings follow the pattern: white text + one gradient-accent word (e.g., "Featured **Projects**"). | [RECOMMENDED] |
| 2.8 | There is exactly one `<h1>` element on the page. | [REQUIRED] |

---

## 3. 3D Hero Scene

| # | Criterion | Priority |
|---|---|---|
| 3.1 | A 3D polyhedron (icosahedron or similar) is visible in the hero section on WebGL-capable browsers. | [REQUIRED] |
| 3.2 | The polyhedron has a glass/metallic material (not flat colour). | [REQUIRED] |
| 3.3 | The polyhedron is lit with cyan key light and violet fill light, matching the colour palette. | [REQUIRED] |
| 3.4 | A wireframe overlay is visible on the polyhedron at low opacity. | [RECOMMENDED] |
| 3.5 | The polyhedron rotates slowly on idle (~0.15 rad/s on Y axis). | [REQUIRED] |
| 3.6 | On desktop, the polyhedron tilts toward the mouse pointer position (spring easing). | [REQUIRED] |
| 3.7 | On mobile, there is no pointer-tilt interaction (rotation only). | [REQUIRED] |
| 3.8 | The polyhedron fades out when the user scrolls past the hero section. | [RECOMMENDED] |
| 3.9 | When WebGL is unavailable, a static fallback image is displayed instead. | [REQUIRED] |
| 3.10 | When `prefers-reduced-motion: reduce` is active, the polyhedron is static (no rotation or tilt). | [REQUIRED] |
| 3.11 | The 3D scene maintains ≥ 50fps on a mid-range mobile device (2020+). | [REQUIRED] |
| 3.12 | Three.js is not included in the initial JavaScript bundle (it is dynamically imported). | [RECOMMENDED] |

---

## 4. Navigation

| # | Criterion | Priority |
|---|---|---|
| 4.1 | The navigation bar is fixed at the top with 64px height. | [REQUIRED] |
| 4.2 | The navigation is transparent when at the top of the page and gains a glass-surface background when scrolled. | [REQUIRED] |
| 4.3 | The logo is an "AK" monogram (not a spinning sparkle icon). | [RECOMMENDED] |
| 4.4 | Desktop navigation shows horizontal text links: Home, About, Projects, Experience, Contact. | [REQUIRED] |
| 4.5 | The active section has a visual indicator (underline or background highlight in cyan). | [REQUIRED] |
| 4.6 | Mobile navigation uses a hamburger toggle with animated open/close. | [REQUIRED] |
| 4.7 | Mobile nav items are at least 48px tall with clear tap targets. | [REQUIRED] |
| 4.8 | Clicking a nav item scrolls smoothly to the corresponding section. | [REQUIRED] |
| 4.9 | A scroll progress bar (2px, cyan-violet gradient) is visible at the very top of the page. | [RECOMMENDED] |

---

## 5. Section-Level Checks

### Hero
| # | Criterion | Priority |
|---|---|---|
| 5.1 | Hero is full-viewport height (100vh). | [REQUIRED] |
| 5.2 | Two primary CTA buttons are visible: "View My Work" and "Download CV". | [REQUIRED] |
| 5.3 | GitHub, LinkedIn, and Email social links are visible and functional. | [REQUIRED] |
| 5.4 | A scroll indicator ("Scroll to explore" + arrow) is visible at the bottom. | [RECOMMENDED] |

### About
| # | Criterion | Priority |
|---|---|---|
| 5.5 | A profile image of Aaditya is displayed (not the same photo as the hero background). | [REQUIRED] |
| 5.6 | Bio text is ≤ 3 paragraphs, each ≤ 3 sentences. | [RECOMMENDED] |
| 5.7 | A "Download Resume" button/link is present and functional (`/resume.pdf`). | [REQUIRED] |

### Skills
| # | Criterion | Priority |
|---|---|---|
| 5.8 | Skills are organized into 6 categories (Frontend, Backend, Databases, Languages, Tools, Core Concepts). | [REQUIRED] |
| 5.9 | No proficiency bars, percentages, or star ratings are displayed. | [REQUIRED] |
| 5.10 | Skill cards use the new design system card surface (dark surface, subtle border, 16px radius). | [REQUIRED] |

### Projects
| # | Criterion | Priority |
|---|---|---|
| 5.11 | All 6 projects from the data are displayed in a 2-column grid (desktop). | [REQUIRED] |
| 5.12 | At least 4 of 6 projects have real screenshots (not gradient placeholders). | [REQUIRED] |
| 5.13 | "Code" button appears only when a real GitHub link is available (not `#`). | [REQUIRED] |
| 5.14 | "Demo" button appears only when a real demo link is available (not `#`). | [REQUIRED] |
| 5.15 | The "Learn More" button is removed (or leads to actual content). | [REQUIRED] |
| 5.16 | Project cards have a subtle perspective tilt on hover (desktop only). | [RECOMMENDED] |

### Experience
| # | Criterion | Priority |
|---|---|---|
| 5.17 | A vertical timeline shows the VenueMonk internship, B.Tech, and Sr. Secondary education. | [REQUIRED] |
| 5.18 | Certifications are displayed as compact cards (not full-width detailed panels). | [RECOMMENDED] |
| 5.19 | Certificate "View" links open in new tabs and point to verified Google Drive URLs. | [REQUIRED] |

### Contact
| # | Criterion | Priority |
|---|---|---|
| 5.20 | A contact form with email, subject, and message fields is present and functional. | [REQUIRED] |
| 5.21 | The form submits to the existing backend (`/send` endpoint). | [REQUIRED] |
| 5.22 | Success and error states are visually distinct (green/red banners with icons). | [REQUIRED] |
| 5.23 | The submit button shows a loading state during submission. | [REQUIRED] |
| 5.24 | No fake `setTimeout` delay exists before the actual API call. | [REQUIRED] |

### Footer
| # | Criterion | Priority |
|---|---|---|
| 5.25 | Footer includes brand name, copyright year, social links, and back-to-top button. | [REQUIRED] |
| 5.26 | Footer does not contain floating gradient blobs or emoji. | [RECOMMENDED] |

---

## 6. Motion & Animation

| # | Criterion | Priority |
|---|---|---|
| 6.1 | The intro animation completes in ≤ 2 seconds (not 7+ seconds). | [REQUIRED] |
| 6.2 | The intro animation has a visible "Skip" option. | [REQUIRED] |
| 6.3 | Returning visitors (same session) do not see the intro animation again. | [RECOMMENDED] |
| 6.4 | Scroll reveals animate elements in once and do not re-animate on scroll back. | [REQUIRED] |
| 6.5 | Card hover effects are limited to translateY ≤ 2px (not 5px). | [RECOMMENDED] |
| 6.6 | Form inputs do NOT scale on focus (only border colour changes). | [REQUIRED] |
| 6.7 | Smooth scrolling is active via Lenis (normalised scroll velocity). | [RECOMMENDED] |
| 6.8 | When `prefers-reduced-motion: reduce` is active, no transform-based animations occur. | [REQUIRED] |
| 6.9 | When `prefers-reduced-motion: reduce` is active, all content is still visible and accessible. | [REQUIRED] |
| 6.10 | GSAP is used for scroll-triggered reveals, Framer Motion for component interactions — no overlap. | [RECOMMENDED] |

---

## 7. Performance

| # | Criterion | Priority |
|---|---|---|
| 7.1 | Lighthouse Performance score ≥ 85 on mobile throttled connection. | [REQUIRED] |
| 7.2 | Lighthouse Performance score ≥ 90 on desktop. | [RECOMMENDED] |
| 7.3 | First Contentful Paint < 1.5s on throttled 4G. | [REQUIRED] |
| 7.4 | Largest Contentful Paint < 3.0s on throttled 4G. | [REQUIRED] |
| 7.5 | Cumulative Layout Shift < 0.1. | [REQUIRED] |
| 7.6 | Total initial page transfer < 800KB (gzip). | [REQUIRED] |
| 7.7 | Below-fold images use `loading="lazy"`. | [REQUIRED] |
| 7.8 | Project screenshots are served in WebP format with JPEG fallback. | [RECOMMENDED] |
| 7.9 | The 3D scene does not block first paint (async loaded). | [REQUIRED] |

---

## 8. Accessibility

| # | Criterion | Priority |
|---|---|---|
| 8.1 | Lighthouse Accessibility score ≥ 90. | [REQUIRED] |
| 8.2 | All interactive elements are reachable via keyboard (Tab navigation). | [REQUIRED] |
| 8.3 | Focus indicators are visible on all interactive elements when using keyboard. | [REQUIRED] |
| 8.4 | All images have descriptive `alt` attributes. | [REQUIRED] |
| 8.5 | The 3D canvas has `role="img"` and `aria-label`. | [REQUIRED] |
| 8.6 | Form inputs have associated `<label>` elements. | [REQUIRED] |
| 8.7 | Status badges use colour + text + icon (not colour alone). | [REQUIRED] |
| 8.8 | The page has `<html lang="en">`. | [REQUIRED] |
| 8.9 | Semantic HTML is used: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`. | [REQUIRED] |
| 8.10 | A "Skip to main content" link is present and functional. | [RECOMMENDED] |
| 8.11 | Mobile hamburger menu toggle has `aria-expanded` attribute. | [REQUIRED] |
| 8.12 | External links open in new tabs with `rel="noopener noreferrer"`. | [REQUIRED] |

---

## 9. Responsive Design

| # | Criterion | Priority |
|---|---|---|
| 9.1 | The site is fully functional at 320px viewport width (smallest common mobile). | [REQUIRED] |
| 9.2 | The site is fully functional at 1920px viewport width (common desktop). | [REQUIRED] |
| 9.3 | Project cards stack to single column on viewports < 768px. | [REQUIRED] |
| 9.4 | Skill cards stack to single column on viewports < 768px. | [REQUIRED] |
| 9.5 | Hero layout changes from 2-column to single-column centred on mobile. | [REQUIRED] |
| 9.6 | 3D canvas resizes appropriately (400px desktop, 240px mobile). | [REQUIRED] |
| 9.7 | No horizontal scrollbar appears at any breakpoint. | [REQUIRED] |
| 9.8 | Touch targets are ≥ 44×44px on mobile. | [REQUIRED] |
| 9.9 | Hover effects are gated behind `@media (hover: hover)` on mobile. | [RECOMMENDED] |

---

## 10. Content Integrity

| # | Criterion | Priority |
|---|---|---|
| 10.1 | All GitHub links point to real, accessible repositories. | [REQUIRED] |
| 10.2 | All "Live Demo" links point to functioning websites. | [REQUIRED] |
| 10.3 | All certificate "View" links open valid documents. | [REQUIRED] |
| 10.4 | The resume PDF downloads correctly from `/resume.pdf`. | [REQUIRED] |
| 10.5 | Email links use the correct address: `kumaraaditya324@gmail.com`. | [REQUIRED] |
| 10.6 | The contact form successfully sends an email via the backend. | [REQUIRED] |
| 10.7 | No placeholder text ("Lorem ipsum", "TODO", etc.) is visible. | [REQUIRED] |
| 10.8 | No broken images are visible at any point during normal navigation. | [REQUIRED] |
| 10.9 | No console errors appear during normal navigation. | [RECOMMENDED] |

---

## 11. Cross-Browser

| # | Criterion | Priority |
|---|---|---|
| 11.1 | Chrome (latest) — full functionality including 3D. | [REQUIRED] |
| 11.2 | Firefox (latest) — full functionality including 3D. | [REQUIRED] |
| 11.3 | Safari (latest) — full functionality including 3D. | [REQUIRED] |
| 11.4 | Edge (latest) — full functionality including 3D. | [REQUIRED] |
| 11.5 | Safari iOS — functional with mobile layout, 3D rotation. | [REQUIRED] |
| 11.6 | Chrome Android — functional with mobile layout, 3D rotation. | [REQUIRED] |

---

## Scoring

| Category | Total Items | Required | Recommended |
|---|---|---|---|
| Visual Identity | 10 | 9 | 1 |
| Typography & Content | 8 | 6 | 2 |
| 3D Hero Scene | 12 | 8 | 4 |
| Navigation | 9 | 7 | 2 |
| Sections | 26 | 21 | 5 |
| Motion & Animation | 10 | 6 | 4 |
| Performance | 9 | 6 | 3 |
| Accessibility | 12 | 10 | 2 |
| Responsive | 9 | 8 | 1 |
| Content Integrity | 9 | 8 | 1 |
| Cross-Browser | 6 | 6 | 0 |
| **Total** | **120** | **95** | **25** |

**Pass threshold:** All 95 REQUIRED items must pass. At least 20 of 25 RECOMMENDED items should pass.
