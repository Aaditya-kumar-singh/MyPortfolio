# 07 — Responsive & Accessibility Specification

> **Document type:** Breakpoint layouts, touch/keyboard interactions, and a11y checklist  
> **Status:** Design-only — no code to be written  

---

## 1. Desktop Layouts (≥ 1024px)

### Navigation
- Horizontal nav links: Home, About, Projects, Experience, Contact.
- AK monogram logo left-aligned.
- Height: 64px. Fixed position.
- Active link: underline indicator via Framer Motion `layoutId`.

### Hero
- Two-column split: text left (columns 1–6), 3D scene right (columns 7–12).
- Display heading at 72px (4.5rem).
- 3D canvas: 400×400px, right-aligned within its column.

### About
- Two-column: image left (columns 1–5), text right (columns 7–12).
- Profile image: ~320×400px container.
- Max text width: 560px.

### Skills
- 3×2 grid of skill cards.
- Each card: min-height 200px, padding 24px.

### Projects
- 2×3 grid (2 columns, 3 rows for 6 projects).
- Card gap: 32px.

### Experience
- Timeline: vertical line, nodes left, content cards right.
- Certification cards: 4-column horizontal row.

### Contact
- Two-column: info left, form right.
- Form max-width: 540px.

### Footer
- Two-row: brand + social (row 1), copyright + back-to-top (row 2).

---

## 2. Tablet Layouts (768px – 1023px)

### Navigation
- Same as desktop but with slightly tighter spacing.
- Links may use shorter labels if needed.

### Hero
- Two-column split maintained, but 3D canvas reduced to 300×300px.
- Display heading at 48px.

### About
- Two-column maintained, image at 280×350px.

### Skills
- 2×3 grid (2 columns).

### Projects
- 2×3 grid maintained.

### Experience
- Timeline: same layout, cards take full remaining width.
- Certifications: 2×2 grid.

### Contact
- Stacks to single column: info on top, form below.

---

## 3. Mobile Layouts (< 768px)

### Navigation
- Hamburger menu (Lucide `Menu` icon).
- Tap opens full-width dropdown panel with glass surface background.
- Each nav item: full-width tap target, icon + label, 48px height minimum.
- Active item: left border indicator in `--accent-primary`.

### Hero
- Single column, centred.
- 3D canvas at top: 240×240px, centred.
- Display heading: 40px (2.5rem), centred.
- CTAs stack vertically: full-width buttons.
- Social icons: horizontal row, centred.

### About
- Single column.
- Profile image: full-width, max 400px, centred.
- Text below image.

### Skills
- Single column.
- One card per row, full-width.

### Projects
- Single column.
- One card per row, full-width.
- Image area: 16:10 ratio, full card width.

### Experience
- Timeline shifts: node/line on left edge, cards fill remaining width.
- Certifications: horizontal scrollable row (CSS `overflow-x: auto`, `scroll-snap-type: x mandatory`).

### Contact
- Single column.
- Info cards stack vertically.
- Form below info, full-width.
- All inputs and button: full-width.

### Footer
- Single column, centred.
- Social icons: centred row.
- Back-to-top: centred.

---

## 4. Touch Interactions

| Element | Touch Behaviour | Notes |
|---|---|---|
| Navigation hamburger | Tap to toggle | 48×48px tap target |
| Nav links (mobile) | Tap to scroll + close menu | Full-width tap target |
| CTA buttons | Tap with `:active` press state (darken 10%) | 44×44px minimum |
| Project cards | Tap anywhere on card to expand/navigate | No hover effects on mobile — all revealed by default |
| Social links | Tap opens link in new tab | 44×44px touch target |
| Tech tags | No interaction on mobile | Tags are display-only; remove hover effect |
| Contact form inputs | Tap to focus | Native mobile keyboard triggered |
| Form submit | Tap with loading state | Button disabled during submission |
| Back-to-top | Tap to scroll to top | 44×44px touch target |
| Certification "View" links | Tap opens in new tab | Entire card area is tappable |
| 3D hero scene | No interaction (rotation only) | Touch events may conflict with scrolling — avoid gesture capture |
| Hairline figures | No pointer interaction | Render static; pointer responsiveness disabled |

### Touch-Specific Adjustments
- Remove all `whileHover` effects on mobile. Use `@media (hover: hover)` to gate hover styles.
- Increase all interactive target sizes to ≥ 44×44px.
- Project card hover effects (image zoom, perspective tilt) are disabled on mobile. Information that was visible only on hover (like the ArrowUpRight icon) should be visible by default.

---

## 5. Keyboard Interactions

| Key | Context | Action |
|---|---|---|
| `Tab` | Global | Move focus to next interactive element |
| `Shift + Tab` | Global | Move focus to previous interactive element |
| `Enter` / `Space` | Button, link, card | Activate the element |
| `Escape` | Mobile menu open | Close the menu |
| `Escape` | Tooltip visible | Dismiss tooltip |
| `Arrow Down/Up` | Mobile nav menu | Navigate between menu items |
| `Home` | Global | Scroll to top (when focus is not in a form field) |

### Tab Order
1. Skip-to-content link (visually hidden until focused)
2. Navigation: AK logo → nav links (left to right) → hamburger (mobile)
3. Hero: CTA buttons → social links
4. About: Resume download → Contact CTA
5. Skills: Skill cards (left to right, top to bottom)
6. Projects: Project cards → GitHub/Demo links within each card
7. Experience: Certificate "View" links → Resume download
8. Contact: Info links → Form fields (email → subject → message → submit)
9. Footer: Social links → Back-to-top

---

## 6. Reduced-Motion Behaviour

### Detection
```
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```
Store in React context. Listen for changes with `matchMedia.addEventListener('change', ...)`.

### Per-Feature Behaviour

| Feature | Normal | Reduced Motion |
|---|---|---|
| Intro animation | Letter stagger + fade | Static text display, 1.5s, then cross-fade |
| Hero 3D rotation | 0.15 rad/s continuous | Static, no rotation |
| Hero 3D pointer tilt | ±15° spring | Disabled |
| Hero entry sequence | Staggered slide-up + fade | All elements appear simultaneously, opacity only |
| Scroll reveals (GSAP) | translateY(40px) + opacity, 600ms | Instant opacity 1, no transform |
| Card hover | translateY(-2px), border glow | Border colour change only |
| Lenis smooth scroll | lerp 0.08, smooth | Disabled; native scroll |
| Skeleton shimmer | Gradient sweep animation | Static grey background |
| Nav active indicator | layoutId spring animation | Instant position change |
| Scroll progress bar | Smooth scaleX | Instant scaleX (no transition) |
| Hairline figure draw-in | SVG path animation | Static, fully drawn |
| Back-to-top scroll | Smooth scroll behaviour | Instant jump to top |
| Form submit spinner | CSS rotation | Static icon or text "Sending..." |

---

## 7. Low-Performance Fallbacks

### Device Capability Detection

```javascript
const capabilities = {
  webgl: !!document.createElement('canvas').getContext('webgl2'),
  highPerf: navigator.hardwareConcurrency >= 4,
  goodConnection: navigator.connection?.effectiveType !== '2g',
};
```

### Fallback Table

| Capability Missing | Fallback |
|---|---|
| WebGL unavailable | Static hero image (`hero-fallback.webp`); no skills node graph |
| Low CPU (< 4 cores) | Disable optional skills node graph; reduce Lenis lerp |
| Slow connection (2G) | Skip environment map loading; use simpler material |
| Old browser (no CSS `backdrop-filter`) | Solid background instead of glass effect |
| No `IntersectionObserver` | Load all content without scroll triggers (progressive enhancement) |

---

## 8. Accessibility Checklist

### Semantic HTML
- [ ] `<header>` wraps navigation
- [ ] `<nav>` with `aria-label="Main navigation"` for primary nav
- [ ] `<main>` wraps all section content
- [ ] Each section uses `<section>` with `aria-labelledby` pointing to its heading
- [ ] `<footer>` wraps footer content
- [ ] Single `<h1>` per page (hero heading)
- [ ] Heading hierarchy: h1 → h2 → h3 (no skips)

### Navigation
- [ ] Skip-to-content link as first focusable element
- [ ] All nav links have visible focus indicators
- [ ] Mobile menu toggle has `aria-expanded` and `aria-controls`
- [ ] Mobile menu items are navigable with arrow keys
- [ ] Active section indicator is communicated via `aria-current="true"`

### Images
- [ ] Profile image: `alt="Aaditya Kumar, Full-Stack Developer"`
- [ ] Project screenshots: `alt="[Project Name] user interface"`
- [ ] Decorative images (Hairline figures, gradients): `alt=""` or `role="presentation"`
- [ ] 3D canvas: `role="img"`, `aria-label="Interactive 3D geometric sculpture"`

### Forms
- [ ] All inputs have associated `<label>` elements
- [ ] Required fields have `aria-required="true"`
- [ ] Error messages use `aria-describedby` linked to input
- [ ] Form status changes announced via `aria-live="polite"` region
- [ ] Submit button has clear text ("Send Message", not just an icon)

### Interactive Elements
- [ ] All buttons have visible text or `aria-label`
- [ ] Social links have `aria-label` (e.g., "GitHub profile")
- [ ] External links have `target="_blank"` with `rel="noopener noreferrer"`
- [ ] External links include visual indicator (Lucide `ExternalLink` icon)
- [ ] Touch targets ≥ 44×44px
- [ ] Focus is never trapped except in modal dialogs

### Colour & Contrast
- [ ] Body text contrast ≥ 4.5:1 (verified: 18.5:1 for primary, 8.2:1 for secondary)
- [ ] Muted text used only for non-essential info and meets 3:1 for large text
- [ ] Status indicators use colour + text + icon (not colour alone)
- [ ] Focus indicators have ≥ 3:1 contrast against background

### Motion
- [ ] `prefers-reduced-motion` detected and respected
- [ ] No essential content hidden behind animations
- [ ] No auto-playing video
- [ ] No content that flashes more than 3 times per second

### Content
- [ ] Language attribute set: `<html lang="en">`
- [ ] Page title is descriptive: "Aaditya Kumar | Full-Stack Developer Portfolio"
- [ ] Meta description present and descriptive
- [ ] Landmarks are unique and properly labelled

---

## 9. SEO Improvements

The current `index.html` lacks meta tags. The redesign should include:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Aaditya Kumar | Full-Stack Developer Portfolio</title>
  <meta name="description" content="Portfolio of Aaditya Kumar — a full-stack developer specialising in React, Node.js, and modern web technologies. View projects, skills, and experience." />
  <meta name="author" content="Aaditya Kumar" />
  <meta property="og:title" content="Aaditya Kumar | Full-Stack Developer" />
  <meta property="og:description" content="Full-stack developer crafting digital experiences with React, Node.js, and modern web tech." />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="/og-image.webp" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="canonical" href="https://[your-domain].com" />
</head>
```

An OG image (`og-image.webp`, 1200×630px) should be created showing the hero composition with the 3D polyhedron and Aaditya's name.
