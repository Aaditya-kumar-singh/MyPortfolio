# 04 — 3D & Motion Design Specification

> **Document type:** 3D scenes, animation system, motion tokens  
> **Direction:** Precision+  
> **Status:** Design-only — no code to be written  

---

## Part A: 3D Scene Specifications

### Scene 1: Hero Polyhedron (Primary — Required)

| Property | Specification |
|---|---|
| **Scene name** | `HeroPolyhedron` |
| **Location** | Hero section, right half (desktop), centred top (mobile) |
| **Technology** | React Three Fiber (`@react-three/fiber` v9 for React 19) with `@react-three/drei` helpers |
| **Canvas size** | 400×400px (desktop), 240×240px (mobile), responsive container |
| **Background** | Transparent (canvas blends with page background) |

#### Object

- **Geometry:** Icosahedron (20 faces) with subtle vertex displacement (fractal noise at low amplitude ~0.03) to give it an organic, slightly irregular surface. Not a perfect platonic solid — that looks too generic.
- **Scale:** Radius ~2.5 units in scene space.
- **Material:** `MeshPhysicalMaterial` with:
  - `metalness: 0.3`
  - `roughness: 0.15`
  - `clearcoat: 0.8`
  - `clearcoatRoughness: 0.1`
  - `transmission: 0.4` (partial transparency, glass-like)
  - `ior: 1.5`
  - `thickness: 1.5`
  - `color: #1A1B27` (dark, lets lighting define the surface)
  - `envMapIntensity: 0.8`
- **Environment map:** Use `@react-three/drei`'s `<Environment preset="city" />` or a custom HDR with controlled reflections. The environment map should be subtle — providing surface definition, not distracting reflections.
- **Wireframe overlay:** A second mesh (same geometry) rendered as wireframe with `MeshBasicMaterial`, colour `#06B6D4` at 15% opacity, slight scale offset (1.01×). This creates the "precision" line-art signature around the solid object.

#### Camera

- **Position:** `[0, 0, 6]` (front-facing, slightly above centre).
- **FOV:** 45°.
- **No orbit controls.** The camera is fixed; the object rotates.
- **No camera movement on scroll** (this is Direction B, not Direction A).

#### Lighting

| Light | Type | Position | Colour | Intensity |
|---|---|---|---|---|
| Key | Directional | `[5, 5, 5]` | `#06B6D4` (cyan) | 1.2 |
| Fill | Directional | `[-4, -2, 3]` | `#8B5CF6` (violet) | 0.6 |
| Rim | Point | `[0, 3, -5]` | `#F0F0F3` (white) | 0.4 |
| Ambient | Ambient | — | `#1A1A2E` | 0.3 |

The lighting creates a cyan/violet colour scheme on the object surfaces that reinforces the design system palette.

#### Animation

| Behaviour | Description | Timing |
|---|---|---|
| **Idle rotation** | Continuous Y-axis rotation | 0.15 rad/s, linear |
| **Idle float** | Gentle vertical oscillation | `sin(time * 0.5) * 0.1`, continuous |
| **Pointer tilt** | Object tilts toward mouse position (mapped to ±15° on X and Y axes) | Spring: stiffness 50, damping 20 |
| **Entry fade** | Opacity 0 → 1, scale 0.8 → 1 | 800ms, easeOut, starts 1200ms after page load |
| **Scroll fade** | Opacity 1 → 0, scale 1 → 0.95 when user scrolls past 30vh of hero | 400ms, easeOut, triggered by scroll position |

#### Touch / Mobile

- No pointer-tilt interaction (gyroscope-based tilt is unreliable and battery-intensive).
- Idle rotation speed reduced to 0.08 rad/s to feel calmer on small screens.
- Canvas renders at half resolution (pixel ratio 1.0 instead of devicePixelRatio) for performance.

#### Reduced Motion

- No rotation, no float, no pointer tilt.
- Static object displayed at resting position.
- Wireframe overlay still visible (static visual).

#### Static Fallback (WebGL unavailable)

- Display a pre-rendered PNG of the polyhedron from the default camera angle.
- The PNG should be generated from the 3D scene during development and stored in `/public/hero-fallback.webp`.
- Size: 800×800px, transparent background.

#### Performance

- **Expected cost:** One WebGL context, one scene, ~20-face geometry, 4 lights, one environment map. Very lightweight.
- **Target:** 60fps on mid-range mobile (2020+ device).
- **Loading strategy:** Canvas mounts immediately but object fades in after the rest of the hero content. Use `<Suspense>` with no visible fallback (the canvas area is simply empty during load).

---

### Scene 2: Skills Node Graph (Optional — Tier A Enhancement)

| Property | Specification |
|---|---|
| **Scene name** | `SkillsNodeGraph` |
| **Location** | Skills section, below the card grid, centred |
| **Technology** | React Three Fiber |
| **Canvas size** | 600×300px (desktop), hidden on mobile |
| **Background** | Transparent |

#### Concept

A network of small spheres (nodes) connected by thin lines (edges), representing skill categories. Each node is a glowing sphere with a text label. Lines connect related categories (e.g., Frontend ↔ Backend, Backend ↔ Databases).

#### Object Details

- **Nodes:** 6 small spheres (radius 0.15), each coloured with the category's accent:
  - Frontend: `#3B82F6` (blue)
  - Backend: `#22C55E` (green)
  - Databases: `#EAB308` (yellow)
  - Languages: `#EC4899` (pink)
  - Tools: `#8B5CF6` (violet)
  - Core: `#06B6D4` (cyan)
- **Edges:** `<Line>` components from drei, 1px width, `#2D2F42` colour, connecting related nodes.
- **Labels:** drei `<Text>` or `<Html>` for category names beside each node.

#### Animation

- Nodes gently float in place (random offset, very slow).
- On hover over a node (desktop only), connected edges brighten to `--accent-primary` and unconnected nodes dim.
- No click interaction required.

#### Why This Is Optional

This scene adds visual interest but is not essential. The skill cards above already communicate the information. This is eye candy for Tier A visitors only. It should never block page load or cause layout shift.

#### Loading Strategy

- Canvas is wrapped in an IntersectionObserver. The R3F scene only mounts when the Skills section is within 200px of the viewport.
- If WebGL is unavailable, the canvas simply does not render. No fallback needed — the skill cards are the primary content.

#### Performance

- Second WebGL context. On low-powered devices, this should be disabled entirely (detect via `navigator.hardwareConcurrency < 4`).

---

## Part B: Motion Design System

### B.1 Animation Principles

1. **Purposeful motion.** Every animation communicates a state change, guides attention, or provides feedback. No animation exists purely for spectacle.
2. **Consistent easing.** Use a limited set of easing curves across the entire site.
3. **Short by default.** Most transitions complete in 200–400ms. Only entrance animations and 3D scenes exceed this.
4. **Stagger, don't swarm.** When multiple elements animate, they stagger sequentially. Never animate more than 5 elements simultaneously.
5. **Scroll reveals once.** Elements animate in once and stay. No re-animation on scroll back up.
6. **Reduced motion is not reduced content.** All information is visible; only motion is reduced.

### B.2 Motion Tokens

| Token | Value | Usage |
|---|---|---|
| `--duration-instant` | 100ms | Hover colour changes, focus rings |
| `--duration-fast` | 200ms | Button hover, tooltip show/hide |
| `--duration-normal` | 400ms | Section reveals, card entrances |
| `--duration-slow` | 800ms | Hero entrance, 3D fade-in |
| `--duration-cinematic` | 1200ms | Intro animation, page transitions |
| `--ease-default` | `cubic-bezier(0.25, 0.1, 0.25, 1.0)` | General-purpose smooth ease |
| `--ease-out` | `cubic-bezier(0.0, 0.0, 0.2, 1.0)` | Entrance animations (decelerate) |
| `--ease-in` | `cubic-bezier(0.4, 0.0, 1.0, 1.0)` | Exit animations (accelerate) |
| `--ease-spring` | `type: "spring", stiffness: 300, damping: 25` | Interactive hover/press responses |
| `--stagger-fast` | 40ms | Tech tag reveals |
| `--stagger-normal` | 80ms | Card grid reveals |
| `--stagger-slow` | 120ms | Letter animations in intro |

### B.3 Library Responsibility Assignment

| Library | Responsibility | Why |
|---|---|---|
| **GSAP + ScrollTrigger** | Scroll-linked reveals, text split animations, timeline sequences, complex staggered entries | GSAP ScrollTrigger is the most reliable scroll-animation library; it handles edge cases (resize, back-navigation, refresh) that Framer Motion's `whileInView` misses |
| **Framer Motion** | Component-level interactions: hover, tap, focus, layout transitions, AnimatePresence for mount/unmount | Framer Motion's declarative API is ideal for React component state transitions |
| **Lenis** | Smooth scroll normalisation | Provides consistent scroll velocity across input devices; integrates with GSAP ticker |
| **React Three Fiber** | 3D scene rendering and animation (`useFrame`) | Only within `<Canvas>` — no overlap with DOM animation libraries |
| **CSS transitions** | Micro-interactions: colour changes, border transitions, opacity on hover | Performance-optimal for simple property transitions; no library overhead |

#### Clear Boundaries

- **Never** use Framer Motion `animate` for scroll-triggered reveals — use GSAP ScrollTrigger instead.
- **Never** use GSAP for component mount/unmount animations — use Framer Motion `AnimatePresence`.
- **Never** use CSS `@keyframes` for scroll-triggered animations — they cannot be scroll-linked.
- **CSS `@keyframes`** may be used only for always-running animations (skeleton shimmer, spinner rotation).

### B.4 Scroll Behaviour with Lenis

#### Integration

- Lenis wraps the entire application via `<ReactLenis root>`.
- Lenis's RAF loop is synchronized with GSAP's ticker (see Lenis research in 06-technical-design-recommendations.md).
- `smoothWheel: true`, `lerp: 0.08`, `duration: 1.0`.

#### Scroll-Triggered Reveals

Standard reveal pattern for section content:

| Property | From | To | Trigger |
|---|---|---|---|
| Opacity | 0 | 1 | Element top enters viewport bottom |
| Y translate | 40px | 0 | Same |
| Duration | 600ms | — | — |
| Ease | `--ease-out` | — | — |
| Once | Yes | — | No re-animation |

Stagger pattern for card grids:
- Same as above but with `--stagger-normal` (80ms) between cards.

### B.5 Hover Interactions

| Element | Hover Effect | Duration |
|---|---|---|
| Button (primary) | `brightness(1.1)`, `translateY(-1px)` | 200ms |
| Button (secondary) | Border opacity 100%, background fill 8% | 200ms |
| Project card | Border → `--border-hover`, image scale 1.03, `rotateY(2deg)`, overlay gradient | 300ms |
| Skill card | Border glow (`box-shadow: 0 0 20px var(--accent-primary) at 10%`) | 300ms |
| Tech tag | Text → `--accent-primary`, border → `--border-accent` | 150ms |
| Social icon | Background fill, icon → `--accent-primary`, `translateY(-2px)` | 200ms |
| Nav link | Text → `--text-primary` | 150ms |

### B.6 Entry Animations

| Section | Animation | Library | Details |
|---|---|---|---|
| Intro | Letter stagger fade-up | GSAP SplitText (or manual split) | 30ms stagger, 400ms per letter |
| Hero overline | Slide up + fade | Framer Motion | 300ms delay |
| Hero heading | Slide up + fade, per line | Framer Motion | 400ms, stagger 100ms |
| Hero tagline | Fade | Framer Motion | 600ms delay |
| Hero CTAs | Fade + scale 0.95→1 | Framer Motion | 800ms delay |
| Hero 3D | Fade + scale 0.8→1 | React Three Fiber (material opacity) | 1200ms delay |
| Section headings | Slide up + fade | GSAP ScrollTrigger | On scroll, 600ms |
| Cards | Slide up + fade + stagger | GSAP ScrollTrigger | On scroll, 80ms stagger |
| Timeline items | Slide right + fade + stagger | GSAP ScrollTrigger | On scroll, 120ms stagger |
| Contact cards | Slide up + fade + stagger | GSAP ScrollTrigger | On scroll, 80ms stagger |

### B.7 Exit Animations

- **Intro → Hero:** Cross-fade (opacity), 400ms.
- **Mobile menu close:** Framer Motion AnimatePresence, slide up + fade, 200ms.
- **Tooltip hide:** Opacity 0, 150ms.
- **Sections do not exit-animate.** Once revealed, they stay.

### B.8 Loading Animations

| Element | Animation |
|---|---|
| **Skeleton shimmer** | CSS `@keyframes` — gradient sweep from left to right, 1.5s infinite |
| **Submit spinner** | CSS `@keyframes` — 360° rotation, 0.8s infinite linear |
| **Scroll progress bar** | GSAP or CSS — scaleX from 0→1 proportional to scroll position |

### B.9 Reduced-Motion Alternatives

When `prefers-reduced-motion: reduce` is detected:

| Normal Behaviour | Reduced Alternative |
|---|---|
| Scroll reveals (translate + fade) | Instant opacity 1 (no transform) |
| Staggered entries | All items appear simultaneously |
| Hero 3D rotation and tilt | Static render, no animation |
| Hover transforms (translateY, scale) | Colour changes only |
| Lenis smooth scroll | Disabled — use native scroll |
| Intro letter animation | Static display, auto-advance after 1.5s |
| Skeleton shimmer | Static grey background |

Implementation: Check `window.matchMedia('(prefers-reduced-motion: reduce)')` at app initialization and pass the result as React context. Every animation component checks this context before applying motion.

### B.10 Animations to Remove from Current Site

| Current Animation | Reason to Remove |
|---|---|
| Floating gradient blobs in App.jsx | Continuous GPU cost with no user benefit |
| SectionDivider pulsing dot | Replaced by whitespace-based section separation |
| Continuously spinning nav logo | Distracting; rotation should be reserved for the 3D scene |
| Hero background `bg-fixed` parallax | Native `background-attachment: fixed` causes jank on mobile |
| Card `whileHover={{ scale: 1.02, y: -5 }}` (excessive) | Reduce to `y: -2` max; current 5px is too jumpy |
| Footer floating blobs | Decorative noise; footer should be calm |
| TiltText perpetual floating GSAP tween | Component is unused but if revived, perpetual float is unnecessary |
| `pulse-slow` on stat numbers | Stats are being removed entirely |
| Contact form `whileFocus={{ scale: 1.02 }}` | Scaling a form input on focus is disorienting; use border colour change only |
