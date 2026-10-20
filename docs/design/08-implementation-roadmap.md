# 08 — Implementation Roadmap

> **Document type:** Phased implementation plan (no code)  
> **Status:** Design-only — prioritised by visual impact, effort, and risk  

---

## Overview

The implementation is divided into **5 phases**, ordered so that each phase delivers a visible, shippable improvement. The portfolio remains functional at the end of every phase — no phase leaves the site in a broken state.

**Estimated total effort:** 40–60 hours for a developer familiar with the stack.

---

## Phase 0: Cleanup & Foundation (Priority: Critical)

**Effort:** 4–6 hours  
**Visual impact:** Low (invisible to visitors)  
**Risk:** Low  

### Tasks

| # | Task | Details |
|---|---|---|
| 0.1 | **Delete dead code** | Remove `Page1.jsx`, `Header.jsx`, `Page1Bottom.jsx`, `TiltText.jsx`. Remove `App.css` entirely (contains conflicting Vite scaffold styles). Remove unused assets: `eagle_PNG1229.png`, `vite.svg`, `react.svg`, unnamed `.woff2` files. |
| 0.2 | **Remove redundant dependencies** | Uninstall `react-parallax-tilt` and `vanilla-tilt`. |
| 0.3 | **Update `index.html`** | Add meta description, OG tags, proper title, canonical URL, favicon. See §9 of `07-responsive-and-accessibility-spec.md`. |
| 0.4 | **Fix contact form** | Remove the fake `setTimeout(resolve, 2000)` delay before the real API call in `ContactPage.jsx`. |
| 0.5 | **Remove inflated stats** | Delete the stat counter components from `AboutPage.jsx`, `ProjectsPage.jsx`, `ExperiencePage.jsx`, and `ContactPage.jsx` ("100% Client Satisfaction", "1000+ Commits", etc.). |
| 0.6 | **Restructure CSS** | Replace the content of `index.css` with the new design system tokens (colours, typography, spacing) as CSS custom properties. Remove the 20+ unused CSS keyframe animations and utility classes. |
| 0.7 | **Update Tailwind config** | Reconfigure `tailwind.config.js` with the new colour palette, font families (Outfit, Inter, JetBrains Mono), spacing scale, and shadow tokens from `02-visual-design-system.md`. |
| 0.8 | **Add Outfit font** | Import Outfit from Google Fonts in `index.css` (variable weight, 700–800). |

### Deliverable
A cleaned-up codebase with the new design system tokens in place. The site still looks like the old design but is ready for reskinning.

---

## Phase 1: Design System & Layout Overhaul (Priority: High)

**Effort:** 10–14 hours  
**Visual impact:** Very high — the entire visual identity changes  
**Risk:** Medium (full reskin affects every component)  

### Tasks

| # | Task | Details |
|---|---|---|
| 1.1 | **Global background** | Replace the `bg-gradient-to-br from-gray-900` class chain with the new `gradient-page` (blue-black → pure black). Remove floating gradient blob divs from `App.jsx`. |
| 1.2 | **Navigation redesign** | Restyle with glass surface (scrolled), AK monogram, new typography, `layoutId` active indicator in cyan. Remove the continuously rotating sparkle icon. |
| 1.3 | **Typography overhaul** | Apply Outfit to all display/section headings. Update all text sizes, weights, and colours to match the type scale in `02-visual-design-system.md`. Change gradient-text from orange→red to cyan→violet. |
| 1.4 | **Remove SectionDividers** | Delete the `SectionDivider` component. Replace with generous whitespace (128px desktop, 64px mobile) between sections. |
| 1.5 | **Card component reskin** | Update all cards (skill, project, certification, contact) to use the new surface colours (`--bg-surface`), border colours (`--border-default`), radius (16px), and hover states. |
| 1.6 | **Button reskin** | Replace orange→red gradient buttons with cyan→violet gradient (primary) and cyan outline (secondary). Update hover and focus states. |
| 1.7 | **Hero section layout** | Restructure to two-column layout (text left, 3D placeholder right). Update typography, tagline copy, CTA copy. Replace "I am a CREATIVE DESIGNER &" headline with the cleaner "FULL-STACK DEVELOPER" overline + "Aaditya Kumar" display heading. |
| 1.8 | **About section layout** | Restructure to two-column editorial (image left, text right). Rewrite bio to 3 concise paragraphs. Remove stat counters. |
| 1.9 | **Scroll progress bar** | Restyle to 2px height, `gradient-accent` colour. |
| 1.10 | **Footer simplification** | Reduce to minimal 2-row layout. Remove emoji, "Fueled by coffee" copy, floating blobs. |
| 1.11 | **Scrollbar restyle** | Update custom scrollbar from orange to match `--accent-primary` (cyan). |

### Deliverable
The portfolio looks completely different — the new "Precision+" identity is visible. All sections use the new palette, typography, and spacing. No 3D yet, but the visual foundation is complete.

---

## Phase 2: Motion System & Smooth Scroll (Priority: High)

**Effort:** 8–10 hours  
**Visual impact:** High — the site feels alive and premium  
**Risk:** Medium (scroll library integration requires careful testing)  

### Tasks

| # | Task | Details |
|---|---|---|
| 2.1 | **Install Lenis** | `npm install lenis`. Wrap app in `<ReactLenis root>`. Sync with GSAP ticker (see integration pattern in `04-3d-and-motion-specification.md` §B.4). |
| 2.2 | **Replace scroll-to-section** | Replace native `scrollIntoView` calls with `lenis.scrollTo('#sectionId')` for consistent smooth scrolling. |
| 2.3 | **Install GSAP ScrollTrigger** | Register the ScrollTrigger plugin. Create a shared scroll-reveal utility that all sections use. |
| 2.4 | **Unified scroll reveals** | Replace the mixed Framer Motion `whileInView` + CSS `.scroll-fade-in` + GSAP `fromTo` reveals with a single GSAP ScrollTrigger pattern. Define one reveal animation (translateY 40px → 0, opacity 0 → 1, 600ms) and one stagger pattern (80ms). |
| 2.5 | **Hero entry sequence** | Implement the staged hero animation (overline → heading → tagline → CTAs → social links → scroll indicator) using Framer Motion's stagger. |
| 2.6 | **Hover interactions** | Audit all hover effects. Standardize to the motion tokens from `04-3d-and-motion-specification.md` §B.5. Remove excessive `scale: 1.05` and `y: -5` on cards; reduce to `y: -2` max. |
| 2.7 | **Intro animation redesign** | Replace the 5-step "Did I cook?" sequence with the 2-second name reveal (letter stagger + subtitle + cross-fade). Add skip button. Add `sessionStorage` check for returning visitors. |
| 2.8 | **Reduced-motion support** | Implement `prefers-reduced-motion` detection in React context. Gate all motion behind this check. |
| 2.9 | **Remove animation conflicts** | Delete all CSS `@keyframes` that duplicate Framer Motion or GSAP functionality. Keep only `shimmer` (skeleton loader) and `spin` (submit spinner). Clean up animation library responsibilities per §B.3. |

### Deliverable
The site scrolls beautifully, animations are consistent and purposeful, the intro is professional, and reduced-motion users get a complete experience.

---

## Phase 3: 3D Hero Scene (Priority: High)

**Effort:** 8–12 hours  
**Visual impact:** Very high — the signature visual moment  
**Risk:** High (new dependency, WebGL, mobile performance)  

### Tasks

| # | Task | Details |
|---|---|---|
| 3.1 | **Install R3F stack** | `npm install three @react-three/fiber @react-three/drei`. Verify React 19 compatibility with R3F v9. |
| 3.2 | **Create HeroScene component** | Build the R3F `<Canvas>` with the polyhedron geometry, MeshPhysicalMaterial, wireframe overlay, and lighting setup as specified in `04-3d-and-motion-specification.md` Scene 1. |
| 3.3 | **Pointer interaction** | Map pointer position to polyhedron rotation (±15° tilt) with spring easing. Disable on mobile. |
| 3.4 | **Idle animation** | Continuous Y-axis rotation (0.15 rad/s) + gentle vertical float via `useFrame`. |
| 3.5 | **Scroll fade** | Fade out the polyhedron (opacity + scale) when the user scrolls past 30vh of the hero section. Use IntersectionObserver or scroll position to trigger. |
| 3.6 | **Static fallback** | Render the polyhedron once at default angle, export as `hero-fallback.webp` (800×800, transparent). Display this image when WebGL is unavailable. |
| 3.7 | **Performance optimization** | Set pixel ratio to `Math.min(window.devicePixelRatio, 2)` on desktop, `1.0` on mobile. Use `<Suspense>` for async loading. Pause `useFrame` when canvas is out of viewport. |
| 3.8 | **Mobile adaptation** | Reduce canvas to 240×240px. Rotation speed to 0.08 rad/s. No pointer tilt. Test on real Android device. |
| 3.9 | **Reduced-motion** | When `prefers-reduced-motion: reduce`, display static fallback image instead of canvas. |

### Deliverable
The hero section has its signature 3D polyhedron — the most distinctive visual element of the redesign. The site now looks premium and memorable.

---

## Phase 4: Content & Project Showcase (Priority: High)

**Effort:** 6–8 hours  
**Visual impact:** High — real content replaces placeholders  
**Risk:** Low  

### Tasks

| # | Task | Details |
|---|---|---|
| 4.1 | **Capture project screenshots** | Take screenshots of CNC Market, SchemaFlow, RudraShield, and Todo App at 1440×900. Convert to WebP. Store in `/public/projects/`. |
| 4.2 | **Update project data** | Replace gradient placeholders with real screenshots. Remove "Learn More" buttons. Conditionally render GitHub/Demo links only when available (not `#`). Add "Private" and "Client Project" labels where appropriate. |
| 4.3 | **Project card hover** | Implement CSS `perspective` + `rotateY(2deg)` on hover for project image area. Image scale 1.03 on hover. Gate behind `@media (hover: hover)`. |
| 4.4 | **Skills section rebuild** | Restructure skill cards with verified categories from `03-page-by-page-design.md` §3. Apply the new card surface and tech tag styles. |
| 4.5 | **Experience section restructure** | Rebuild timeline with the design system's Timeline Node component. Compact certification cards into a horizontal grid (or scrollable row on mobile). Remove stats. |
| 4.6 | **Contact section cleanup** | Remove "24h Response Time" and "100% Client Satisfaction" cards. Apply new form input styles. Remove form input `whileFocus={{ scale: 1.02 }}`. |
| 4.7 | **About section content** | Rewrite bio to 3 concise paragraphs per design spec. Use only verified facts. Ensure only `Aaditya.png` is used (not the same photo as hero background). |
| 4.8 | **Install Hairline** | `npm install @lucasmarkes/hairline`. Add Terrain figure to hero, Stack to about, Grid to contact — as subtle decorative accents. |

### Deliverable
Every section contains real, verified content. Projects have genuine screenshots. Copy is concise and professional. Hairline figures add geometric personality.

---

## Phase 5: Polish & Optimization (Priority: Medium)

**Effort:** 6–8 hours  
**Visual impact:** Medium (refinement, not transformation)  
**Risk:** Low  

### Tasks

| # | Task | Details |
|---|---|---|
| 5.1 | **Lighthouse audit** | Run Lighthouse on the deployed site. Target scores: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. |
| 5.2 | **Image optimization** | Compress all images (WebP quality 85). Implement `loading="lazy"` on below-fold images. Add `width` and `height` attributes to prevent CLS. |
| 5.3 | **Font optimization** | Subset Outfit and Inter to Latin characters only. Use `font-display: swap`. Preload the display font. |
| 5.4 | **Bundle analysis** | Run `npx vite-bundle-visualizer`. Verify Three.js is code-split and not in the initial bundle. |
| 5.5 | **Keyboard testing** | Tab through the entire site. Verify focus order matches spec (§5 of `07-responsive-and-accessibility-spec.md`). Add skip-to-content link. |
| 5.6 | **Screen reader testing** | Test with NVDA or VoiceOver. Verify all sections are announced, images have alt text, form is navigable. |
| 5.7 | **Mobile testing** | Test on real iPhone (Safari) and Android (Chrome). Verify touch targets, 3D performance, scroll smoothness, form usability. |
| 5.8 | **Cross-browser** | Test on Chrome, Firefox, Safari, Edge. Verify glass surfaces, backdrop blur, 3D rendering. |
| 5.9 | **OG image** | Create `og-image.webp` (1200×630) showing the hero composition. |
| 5.10 | **Error states** | Verify form error/success messages, image fallbacks, WebGL fallback, network error handling. |

### Deliverable
A production-ready portfolio that meets performance targets, passes accessibility audits, and works across devices and browsers.

---

## Optional Enhancement Phase (Tier A — After Core Completion)

**Effort:** 4–6 hours  
**Visual impact:** Medium  
**Risk:** Medium  

| # | Task | Details |
|---|---|---|
| A.1 | **Skills node graph** | Build the optional R3F node-graph visualization for the Skills section. Lazy-load with IntersectionObserver. Disable on mobile and low-performance devices. |
| A.2 | **Technical storytelling section** | Build the SVG architecture diagram ("How I Build") if it strengthens the portfolio. Animate arrows on scroll. |
| A.3 | **Advanced text animation** | Use `split-type` (free, MIT) for letter-by-letter animations on section headings. |
| A.4 | **Page transition** | If Aaditya later adds multi-page routing, implement cross-fade page transitions with Framer Motion `AnimatePresence`. |

---

## Phase Dependency Graph

```
Phase 0 (Cleanup)
    │
    ▼
Phase 1 (Design System)
    │
    ├───────────────┐
    ▼               ▼
Phase 2 (Motion)  Phase 3 (3D Hero)
    │               │
    └───────┬───────┘
            ▼
      Phase 4 (Content)
            │
            ▼
      Phase 5 (Polish)
            │
            ▼
    Optional Enhancements
```

Phases 2 and 3 can run in parallel. All other phases are sequential.

---

## Summary Table

| Phase | Focus | Hours | Impact | Risk | Depends On |
|---|---|---|---|---|---|
| 0 | Cleanup & Foundation | 4–6 | Low | Low | — |
| 1 | Design System & Layout | 10–14 | Very High | Medium | Phase 0 |
| 2 | Motion & Smooth Scroll | 8–10 | High | Medium | Phase 1 |
| 3 | 3D Hero Scene | 8–12 | Very High | High | Phase 1 |
| 4 | Content & Showcase | 6–8 | High | Low | Phases 2+3 |
| 5 | Polish & Optimization | 6–8 | Medium | Low | Phase 4 |
| A | Optional Enhancements | 4–6 | Medium | Medium | Phase 5 |
| **Total** | | **46–64** | | | |
