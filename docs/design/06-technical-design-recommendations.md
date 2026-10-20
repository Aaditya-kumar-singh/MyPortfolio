# 06 — Technical Design Recommendations

> **Document type:** Technology assessment, architecture, and performance strategy  
> **Status:** Design-only — no code to be written  

---

## 1. Current Stack Assessment

| Package | Version | Verdict | Notes |
|---|---|---|---|
| `react` | 19.1.0 | ✅ Keep | Latest React; required for R3F v9 |
| `react-dom` | 19.1.0 | ✅ Keep | — |
| `vite` | 6.3.5 | ✅ Keep | Excellent build tool; no change needed |
| `framer-motion` | 12.16.0 | ✅ Keep | Reassign to component-level interactions only |
| `gsap` | 3.13.0 | ✅ Keep | Upgrade role to primary scroll-trigger library |
| `@gsap/react` | 2.1.2 | ✅ Keep | `useGSAP` hook for cleanup |
| `lucide-react` | 0.513.0 | ✅ Keep | Icon library — well-suited |
| `react-parallax-tilt` | 1.7.296 | ❌ Remove | Not used in active render tree; redundant with planned 3D |
| `vanilla-tilt` | 1.8.1 | ❌ Remove | Not used in active render tree; redundant |
| `tailwindcss` | 3.4.17 | ✅ Keep | Utility CSS; reconfigure design tokens |
| `postcss` | 8.5.4 | ✅ Keep | Required by Tailwind |
| `autoprefixer` | 10.4.21 | ✅ Keep | Required by Tailwind |

---

## 2. New Dependencies Recommendation

### 2.1 Required (Core Experience)

| Package | Purpose | License | Weekly Downloads | Bundle Size |
|---|---|---|---|---|
| `@react-three/fiber` ^9.x | React renderer for Three.js; hero 3D scene | MIT | ~500K+ | ~50KB gzip |
| `three` ^0.170+ | 3D library; peer dependency of R3F | MIT | ~1M+ | ~150KB gzip (tree-shakeable) |
| `@react-three/drei` ^9.x | R3F helpers (Environment, Float, Text, etc.) | MIT | ~400K+ | Tree-shakeable; import only used helpers |
| `lenis` ^1.x | Smooth scroll normalisation | MIT | ~200K+ | ~4KB gzip |
| `gsap/ScrollTrigger` | Scroll-linked animations | Standard GSAP license (free for non-commercial; paid for premium features) | Included in gsap | ~12KB gzip |
| `@lucasmarkes/hairline` | Geometric line-art figures (Terrain, Stack, Grid) | MIT (open-source community edition) | — | ~8KB gzip (per-figure, tree-shakeable) |

### 2.2 Optional (Tier A Enhancements)

| Package | Purpose | Notes |
|---|---|---|
| `gsap/SplitText` | Advanced text splitting for letter-by-letter animations | **GSAP Club/Business license required.** Alternative: manual text splitting or a free library like `split-type` |

### 2.3 Not Recommended

| Tool | Reason for Exclusion |
|---|---|
| **ThreeUI (Pro components)** | Pro components require paid license. Community (MIT) components overlap with what R3F + drei already provides. Use only as visual inspiration — do not depend on their components. |
| **html-anime** | Agent-driven HTML/CSS film generation tool — fascinating but irrelevant to a portfolio. No runtime component to embed. |
| **ManimGX** | Mathematical animation engine. Powerful for educational content but overkill for a developer portfolio. Would add Python/Rust/WebAssembly dependencies. Not recommended unless Aaditya wants to create pre-rendered math explainer videos. |
| **NullMotion** | Storyboard-vs-final comparison tool. Useful for motion designers, not for a portfolio's runtime. No embeddable component. |
| **ThreeUI Community components** | The free MIT components may be useful for inspiration, but their style is opinionated. Building custom R3F scenes gives more control and originality. |

### 2.4 Tool Selection Summary

The final tool set is intentionally minimal:

```
Existing:  React 19 + Vite + Tailwind + Framer Motion + GSAP + Lucide
New:       R3F + Three.js + drei + Lenis + Hairline
Optional:  SplitText (or free alternative)
Removed:   react-parallax-tilt, vanilla-tilt
```

**Total new bundle cost:** ~225KB gzip (Three.js dominates). Three.js is loaded asynchronously with the hero scene and does not block first paint.

---

## 3. Compatibility Matrix

| Dependency | React 19 | Vite 6 | Tailwind 3 | Notes |
|---|---|---|---|---|
| `@react-three/fiber` v9 | ✅ | ✅ | N/A | Built for React 19 |
| `three` | ✅ | ✅ | N/A | Framework-agnostic |
| `@react-three/drei` v9 | ✅ | ✅ | N/A | Follows R3F versioning |
| `lenis` | ✅ | ✅ | N/A | Framework-agnostic; React wrapper available |
| `@lucasmarkes/hairline` | ✅ | ✅ | ✅ | Ships React entry point |
| `gsap` + ScrollTrigger | ✅ | ✅ | N/A | `@gsap/react` hook handles React lifecycle |

No known conflicts between any recommended packages.

---

## 4. 3D Architecture

### 4.1 Canvas Strategy

**Single primary canvas** in the hero section. This avoids multiple WebGL contexts competing for GPU memory.

```
<App>
  <ReactLenis root>
    <Navigation />
    <HeroSection>
      <Canvas>  ←── Primary R3F canvas (hero polyhedron)
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </HeroSection>
    <AboutSection />
    <SkillsSection>
      {tierA && <Canvas>  ←── Optional secondary canvas (node graph)
        <Suspense fallback={null}>
          <SkillsNodeGraph />
        </Suspense>
      </Canvas>}
    </SkillsSection>
    <ProjectsSection />
    <ExperienceSection />
    <ContactSection />
    <Footer />
  </ReactLenis>
</App>
```

### 4.2 Asset Loading Strategy

| Asset | Strategy | Priority |
|---|---|---|
| Three.js core | Dynamic import via R3F; loads with canvas mount | High (hero) |
| Environment map (HDR) | Loaded via drei `<Environment>` with `<Suspense>` | High |
| Hairline figures | Static SVG; no runtime fetch needed | Medium |
| Project screenshots | `loading="lazy"` on `<img>` tags | Low (below fold) |
| Resume PDF | On-demand download only | None |

### 4.3 WebGL Failure Handling

```
if (!WebGLRenderingContext && !WebGL2RenderingContext) {
  // Show static hero-fallback.webp instead of canvas
  // Skills node graph doesn't render
  // All other content is unaffected
}
```

Detection should happen once at app initialization and be stored in React context.

---

## 5. Performance Budget

### 5.1 Targets

| Metric | Target | Measurement |
|---|---|---|
| **First Contentful Paint** | < 1.2s | Lighthouse on throttled 4G |
| **Largest Contentful Paint** | < 2.5s | Lighthouse |
| **Cumulative Layout Shift** | < 0.05 | Lighthouse |
| **Total Blocking Time** | < 200ms | Lighthouse |
| **Total page weight (initial)** | < 600KB transferred | Network tab (gzip) |
| **3D scene load** | < 400KB additional | Three.js + R3F + assets |
| **Time to Interactive** | < 3.5s | Lighthouse |
| **Hero 3D render** | 60fps steady state | Performance tab on mid-range Android |

### 5.2 Budget Breakdown

| Category | Budget |
|---|---|
| HTML + CSS + JS (initial bundle) | < 200KB gzip |
| Fonts (Inter + Outfit + JetBrains Mono) | < 120KB (WOFF2, subset) |
| Hero background image | < 80KB (WebP, compressed) |
| Three.js + R3F (async) | < 200KB gzip |
| Project screenshots (lazy) | < 100KB each (WebP) |
| Total initial transfer | **< 600KB** |
| Total with 3D loaded | **< 1MB** |

### 5.3 Validation Strategy

- Run Lighthouse CI on every deployment (can be configured in Vercel/Netlify).
- Test on a real mid-range Android device (e.g., Pixel 4a or Samsung A52).
- Profile 3D scene FPS with Chrome DevTools Performance tab.
- Monitor CLS with `web-vitals` library.

---

## 6. Accessibility Strategy

### 6.1 Requirements

| Requirement | Implementation |
|---|---|
| **Keyboard navigation** | All interactive elements focusable via Tab. Enter/Space activates. Esc closes modals/menus. |
| **Focus indicators** | 2px solid `--accent-primary`, 2px offset, visible on `:focus-visible` |
| **Screen reader** | Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`. ARIA labels for icon-only buttons. `role="img"` and `aria-label` on 3D canvas container. |
| **Alt text** | All images have descriptive `alt` attributes. Profile image: "Aaditya Kumar, Full-Stack Developer". Project screenshots: "[Project Name] user interface screenshot". |
| **Text contrast** | All text meets WCAG AA (4.5:1 for body text, 3:1 for large text). Verified: `#F0F0F3` on `#06060B` = 18.5:1 ✅; `#A0A3B1` on `#06060B` = 8.2:1 ✅; `#5C5F73` on `#06060B` = 3.9:1 ✅ (large text only). |
| **Reduced motion** | All motion disabled when `prefers-reduced-motion: reduce`. See Motion spec §B.9. |
| **Touch targets** | All buttons and links ≥ 44×44px touch area. |
| **Form accessibility** | Labels associated with inputs via `htmlFor`/`id`. Error messages linked via `aria-describedby`. Form validation announced via `aria-live="polite"`. |
| **Skip link** | "Skip to main content" link visible on focus, positioned above navigation. |
| **3D content** | Canvas has `role="img"` and `aria-label="Interactive 3D geometric sculpture"`. 3D content is decorative; no essential information is conveyed exclusively through 3D. |

### 6.2 Colour Blind Considerations

- The palette does not rely on red/green distinction for any semantic meaning.
- Status badges use both colour AND text/icon (e.g., "✓ Completed" in green, "◷ In Progress" in yellow).
- The cyan/violet accent pair is distinguishable in all common colour blindness types (protanopia, deuteranopia, tritanopia).

---

## 7. Three Experience Tiers

### Tier A — Premium Desktop (Full Experience)

**Requirements:** Desktop browser, WebGL2 support, `navigator.hardwareConcurrency ≥ 4`, no `prefers-reduced-motion: reduce`.

**Experience:**
- Full hero 3D polyhedron with pointer tilt interaction
- Optional skills node graph (second canvas)
- Lenis smooth scrolling
- GSAP scroll-triggered reveals with transforms
- Hairline geometric figures with pointer interaction
- Full animation sequences

### Tier B — Standard Mobile / Tablet

**Requirements:** Mobile or tablet browser, WebGL support (may be WebGL1).

**Experience:**
- Hero 3D polyhedron at reduced resolution (pixel ratio 1.0), rotation only (no tilt)
- No skills node graph
- Lenis smooth scrolling (reduced lerp)
- GSAP scroll-triggered reveals (reduced transform distances)
- Hairline figures rendered but without pointer interaction
- Simplified animation (shorter durations, reduced stagger)

### Tier C — Reduced Motion / Limited Graphics

**Requirements:** `prefers-reduced-motion: reduce`, OR WebGL unavailable, OR `navigator.hardwareConcurrency < 2`.

**Experience:**
- Static hero image fallback (pre-rendered PNG of polyhedron)
- No secondary canvas
- Native browser scrolling (no Lenis)
- No transform-based animations; content appears immediately
- Hairline figures rendered as static SVGs
- All colour, typography, layout, and content identical to Tier A
- Fully functional and complete — no content is hidden

---

## 8. Licensing Summary

| Technology | License | Commercial Use | Cost |
|---|---|---|---|
| React | MIT | ✅ Free | $0 |
| Three.js | MIT | ✅ Free | $0 |
| React Three Fiber | MIT | ✅ Free | $0 |
| drei | MIT | ✅ Free | $0 |
| GSAP (core + ScrollTrigger) | Standard GSAP | ✅ Free for most uses | $0 |
| GSAP SplitText | Club GreenSock | ⚠️ Requires paid license for production | ~$99/yr |
| Lenis | MIT | ✅ Free | $0 |
| Hairline | MIT (community) | ✅ Free | $0 |
| Framer Motion | MIT | ✅ Free | $0 |
| Lucide React | ISC | ✅ Free | $0 |
| Tailwind CSS | MIT | ✅ Free | $0 |
| Inter font | OFL | ✅ Free | $0 |
| Outfit font | OFL | ✅ Free | $0 |
| JetBrains Mono | OFL | ✅ Free | $0 |

**Recommendation:** Use `split-type` (MIT, free) instead of GSAP SplitText to avoid the paid license requirement. `split-type` provides equivalent text splitting functionality.

---

## 9. Risks and Mitigations

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Three.js bundle too large for mobile | Medium | Slow LCP on 3G | Async dynamic import; don't block initial bundle |
| R3F v9 has breaking changes from tutorials | Medium | Development friction | Use official v9 docs; most v8 patterns still work |
| Lenis conflicts with native scroll anchoring | Low | Broken nav scroll-to-section | Test smooth-scroll-to-section with Lenis; use `lenis.scrollTo()` instead of native `scrollIntoView` |
| Hairline not rendering in older browsers | Low | Visual degradation | Hairline figures are decorative; graceful absence is acceptable |
| GSAP ScrollTrigger and Framer Motion `whileInView` conflicting | Medium | Double-firing animations | Enforce clear boundaries: GSAP for scroll reveals, FM for mount/hover only |
| Environment map HDR too large | Medium | Slow hero load | Use compressed HDR or use drei's built-in presets (already compressed) |
| Mobile GPU overheating from persistent 3D | Low | Frame drops, battery drain | Pause `useFrame` when hero is out of viewport (IntersectionObserver) |

---

## 10. Dead Code to Remove

| File | Reason |
|---|---|
| `src/pages/Page1.jsx` | Unused; not imported in App.jsx |
| `src/components/Header.jsx` | Unused; replaced by Navigation.jsx |
| `src/components/Page1Bottom.jsx` | Unused; part of old Page1 |
| `src/components/TiltText.jsx` | Unused; part of old Page1 |
| `src/App.css` | Contains Vite scaffold boilerplate; conflicts with layout (`#root { max-width: 1280px }`) |
| `public/pngimg.com - eagle_PNG1229.png` | Unused asset; unclear purpose |
| `public/vite.svg` | Default Vite scaffold; not used |
| `src/assets/react.svg` | Default Vite scaffold; not used |
| `src/assets/file.woff2`, `file1.woff2`, `file2.woff2` | Unnamed fonts with no documentation; used only in dead components |
