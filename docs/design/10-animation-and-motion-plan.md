# 10 — Precision+ Animation & Interaction Plan

> **Document type:** Portfolio animation concept, motion storyboard, and implementation plan  
> **Source of truth:** Existing design docs in `docs/design/` and the current `frontend/` source tree  
> **Direction:** Precision+  
> **Mode:** Planning only. No site code, dependency manifests, or visual assets changed by this plan.

## 1. Creative brief

**Concept — “Aaditya Kumar: A living digital craft.”** A short, polished 20–25 second animation introduces the portfolio as a precise digital object: the name resolves from darkness, a metallic-glass polyhedron awakens, the portfolio's projects appear as spatial panels, the technical stack links into a network, then the view settles on a clear call to action.

**Goal:** Communicate thoughtful engineering, craft, and professional readiness in the first few seconds, then invite visitors to explore real work.

**Audience:** Recruiters, hiring managers, technical peers, and potential freelance clients.

**Format:** A 20–25 second 16:9 animation for a website intro, portfolio preview, or social post. The website experience itself remains interactive and user-controlled.

**Style:** Precision+ editorial design, deep blue-black (#06060B), cyan (#06B6D4), restrained violet (#8B5CF6), near-white type, clean geometry, glass-metal materials, minimal atmospheric glow, ample negative space.

**Emotional takeaway:** “This developer cares about both engineering quality and the details of how people experience software.”

**Production approach:** Build the website motion with the project's existing React + Vite + Tailwind, Framer Motion, Lenis, React Three Fiber, Three.js, and Drei. Use GSAP + ScrollTrigger only if present/approved in the project dependency state or explicitly installed after review. For a standalone promotional film, capture approved renders/screenshots from the actual site and assemble a shot-by-shot edit; do not substitute AI-generated fake UI or fictional project claims.

## 2. 20–25 second storyboard

| Time | Shot | Visual and motion | Transition |
|---|---|---|---|
| 0–3 s | **Name reveal** | Deep ink background. “AADITYA KUMAR” appears with a restrained stagger and subtle upward movement; the role label fades in beneath. | Soft cross-fade |
| 3–7 s | **Signature object** | The existing faceted 3D polyhedron appears centre-right, rotates slowly and catches cyan key light and violet fill light. Fine wireframe and orbit rings remain subtle. | Camera-like push through negative space; no disorienting page zoom |
| 7–11 s | **Interface / craft** | Typography and navigation settle into the hero layout. The object responds subtly to desktop pointer position. Buttons show a tiny hover lift as an optional recorded interaction. | Section-matched cut |
| 11–16 s | **Project gallery** | Use real project screenshots and names from the repository. Each panel reveals in sequence, with slight perspective tilt and restrained image scale on hover. | Sequential horizontal/vertical reveal |
| 16–20 s | **Skills connections** | Skill category labels appear in groups. Fine connecting lines draw between frontend, backend, databases, languages, tools, and core concepts. This can be an SVG/CSS diagram first; a second 3D canvas is optional and lazy-loaded. | Lines fade into section whitespace |
| 20–25 s | **Contact / end card** | Timeline and contact details resolve into a clean final frame: “Building thoughtful digital experiences.” Show actual navigation and real contact paths. | Fade to the live portfolio |

**Sound (optional for the video only):** soft low-frequency swell, a restrained crystalline shimmer at the 3D reveal, and a quiet click on the final CTA. Keep the website itself silent unless the visitor explicitly starts audio.

## 3. Existing foundation verified in this repository

- `frontend/src/pages/HeroSection.jsx` already lazy-loads `HeroScene`, animates the hero copy with Framer Motion, and has working project/resume CTAs and social links.
- `frontend/src/components/HeroScene.jsx` already has a noise-modified icosahedron, wireframe, inner geometry, cyan/violet rings, lighting, pointer-reactive rotation, mobile rotation reduction, a reduced-motion check, and a WebGL fallback container.
- `frontend/src/App.jsx` already uses Lenis, tracks the current section, and has a skippable session-aware opening splash.
- `frontend/src/components/Navigation.jsx` already uses Framer Motion for nav transitions and an active-section indicator.
- `frontend/src/pages/ProjectsPage.jsx` already uses Framer Motion stagger/reveal patterns. Several project cards still use gradient placeholders; only actual repository screenshots should be presented as screenshots.
- Existing actual image assets include `frontend/public/TypingTest.png`, `frontend/public/ToDoApp.png`, `frontend/public/Aaditya.png`, `frontend/public/Aaditya_pic.jpg`, and `frontend/public/hero-3d-object.svg`.
- `frontend/package.json` declares React 19, Vite, Tailwind, Framer Motion, Lenis, `@react-three/fiber`, `@react-three/drei`, Three.js, and Lucide React. The current declared manifest does **not** list GSAP or `@gsap/react`; although the earlier design docs recommend them, verify the lockfile/current install and license fit before deciding whether to add them.
- Backend is an Express/Nodemailer contact endpoint. Animation work should not alter the contact API contract.

## 4. Library and asset boundaries

Use these existing libraries first:
- **React + Vite:** component composition, lazy loading and route/section integration.
- **Framer Motion:** intro, CTA feedback, nav indicator, hover/tap and state transitions.
- **React Three Fiber + Three.js + Drei:** the single hero 3D scene, materials, geometry and frame-by-frame motion.
- **Lenis:** smooth scroll, respecting reduced-motion and preserving native keyboard navigation.
- **Tailwind + CSS:** responsive layout, visual tokens, hover surfaces, reduced-motion fallback, focus states.
- **Lucide React:** interface icons.

Potential additions are gated behind a review, not assumed: GSAP + ScrollTrigger for centralised scroll reveals; a free split-text alternative if letter animation proves necessary. Do not add duplicate tilt libraries. Prefer one WebGL context. Treat the 3D skills node graph as optional, only if budget and performance tests permit it.

Only use libraries already cited or declared in these docs/repository for implementation. Do not introduce external animation frameworks or paid-only components without explicit review. Use the local documentation as the authoritative design reference. Repository: `C:\Users\WHITE-SNAKE\Desktop\MyPortfolio`. The cited docs do not provide a canonical remote Git URL, so do not invent one.

## 5. Advanced interaction design

### Desktop
1. **Pointer-reactive hero sculpture:** map pointer position to a modest tilt (maximum about ±15°), smooth with damping. Keep the canvas `pointer-events: none` as currently configured unless direct 3D selection is later designed, so it never blocks CTAs.
2. **Project depth:** use CSS perspective and subtle `rotateY(2deg)` plus scale 1.03 on the screenshot region only. Gate hover effects behind `@media (hover: hover)`; reduce card lift to about 2px.
3. **Navigation:** animate the active indicator and the scrolled glass surface. Maintain readable labels and full keyboard focus styles.
4. **Scroll narrative:** reveal content once as it enters view. Avoid camera movement that fights normal scrolling.
5. **Skill relationships:** make node hover optional and informative. The same information must remain readable as standard DOM text.

### Mobile and touch
- Preserve native vertical scrolling. No gesture-capture on the 3D canvas, no gyro tilt, no swipe-only navigation.
- Reduce the hero object to about 240px and rotation to ~0.08 rad/s; cap pixel ratio around 1 on small devices.
- Show all hover-dependent information by default; use taps only for actual controls.
- Keep interaction targets at least 44×44px, nav links at least 48px, and test at 320px width.

### Motion accessibility
- Respect `prefers-reduced-motion: reduce`: static 3D object, no continuous rotation or pointer tilt, no transform-based scroll reveals. Keep content, links, and controls fully visible.
- Make the intro skippable and session-aware; never force a long intro before content.
- Honor keyboard focus and Escape behaviour for the mobile menu. No essential information conveyed by animation or colour alone.
- Provide a static fallback for both missing WebGL and 3D load failure, and ensure the canvas has an appropriate accessible label.

## 6. Implementation roadmap

### Phase 1 — Stabilise the existing animation (highest priority)
- Keep the current sculpture as the base; tune its screen position, scale, visual hierarchy and hero content alignment before adding new geometry.
- Audit hero-scene visibility after scrolling, fallback behaviour, and pointer target calculation.
- Reconcile the 3D scene with the chosen page background; ensure the existing image/background and 3D object do not fight for contrast.
- Keep existing CSS/class tokens and real copy. Avoid replacing the current hero layout wholesale.
- Build and inspect at 1440×900, 1024×768, 768×1024, 390×844 and 320px wide.

### Phase 2 — Unify motion responsibilities
- Framer Motion remains responsible for component interaction and entrance transitions.
- Lenis remains responsible for the smooth-scroll loop already in the app.
- Choose one scroll-reveal owner: the spec recommends GSAP ScrollTrigger, but since it is absent from the current manifest, either explicitly approve/install it or continue with the existing intersection-based reveal pattern. Do not run several reveal systems on the same elements.
- Remove duplicate animations only after checking every rendered section. Keep loading shimmers and essential status spinners.

### Phase 3 — Make the 3D hero feel art-directed
- Refine lighting, dark metallic material, wireframe opacity and ring alignment; keep secondary elements restrained.
- Add a short entry reveal after the hero text, then subtly fade the sculpture as the viewer leaves the hero.
- Ensure actual 3D rendering remains lazy-loaded. Pause or reduce rendering when off-screen or on low-power devices.
- Export a transparent 800×800 WebP fallback from the real scene.

### Phase 4 — Make all sections feel deliberate
- Give About, Projects, Experience, Sketchbook, and Contact distinct reveal patterns but the same timing/easing tokens.
- Use genuine screenshots. The current project placeholders for CNC Market, SchemaFlow, and RudraShield must remain marked placeholders until authentic captures are added.
- Add card depth and image treatment without converting every section into a 3D panel.
- Add an SVG skills relationship illustration before considering a second WebGL scene.

### Phase 5 — Optional advanced interaction
- Only after the core site passes performance checks, prototype a skills node graph loaded near viewport entry.
- Disable the optional graph on mobile and weaker hardware.
- Add richer project expansion only if it improves access to real implementation details or verified links.
- Avoid a full page-driven 3D camera journey and avoid decorative objects on every screen.

### Phase 6 — Quality gates
- Run the production build and lint, then test keyboard-only navigation, reduced-motion mode, WebGL disabled mode, pointer/touch behaviour, and contact submission.
- Test Chrome, Firefox, Edge, and Safari where available; test one real Android device.
- Measure Lighthouse performance, accessibility, SEO, bundle size, and Core Web Vitals before and after. Targets in the design docs include mobile Performance ≥85, Accessibility ≥90, CLS <0.1, LCP <3s on throttled 4G, and no 3D blocking first paint.
- Confirm every public project link and every displayed project status. Do not fabricate statistics or screenshots.

## 7. Acceptance checklist

The work is ready when:
- [ ] Hero name and CTAs remain legible while the 3D object is aligned and visible.
- [ ] The sculpture has controlled cyan/violet lighting, gentle rotation, stable pointer tilt on desktop, and rotation-only/static states on mobile/reduced-motion.
- [ ] The intro is skippable and no longer blocks return visitors in the same session.
- [ ] Project reveals are staggered, clean, and do not cause layout shift or reanimate on every scroll pass.
- [ ] Every project card uses authentic imagery or clearly remains a non-image placeholder; links accurately reflect what exists.
- [ ] No 3D canvas blocks buttons, text selection, or native scrolling.
- [ ] A usable fallback exists without WebGL and after a scene load failure.
- [ ] 320px mobile, keyboard navigation, reduced-motion, build, lint and contact-form checks pass.
- [ ] Performance is measured, not assumed.

## 8. Recommended short-animation deliverable

Create two assets from the same art direction:
1. **Website motion pass:** the live interactive experience, with the hero sculpture and deliberate section transitions.
2. **Portfolio promo clip:** a 20–25 second, 16:9 capture of the actual site with 6 storyboard beats, exported in a web-friendly format. Keep text legible, use real screenshots, and avoid making UI claims the website does not support.

## 9. Copy-ready prompt for the short promo animation

Use this prompt with a video/animation tool after providing a screen recording or screenshots captured from the real portfolio. The input recording should show the actual hero, existing 3D object, projects, and contact section.

> Create a 20–25 second, 16:9 cinematic promo for the real “Aaditya Kumar” full-stack developer portfolio. Preserve all names, layout details, project titles, screenshots, and URLs exactly as they appear in the supplied website recording. Art direction: premium Precision+ editorial style, deep blue-black background (#06060B), cyan accents (#06B6D4), restrained violet (#8B5CF6), near-white typography, calm lighting, elegant spacing, glass-metal geometric surfaces. Shot 1 (0–3s): reveal the real name “AADITYA KUMAR” with a subtle, staggered upward fade and the role “Full-Stack Developer.” Shot 2 (3–7s): showcase the website's existing faceted polyhedron, rotating gently with cyan and violet reflections and a subtle wireframe. Shot 3 (7–11s): transition cleanly into the authentic hero layout and its real calls to action. Shot 4 (11–16s): reveal genuine project cards one by one, keeping the project names and existing screenshots sharp and undistorted. Shot 5 (16–20s): display the actual skills and technical categories with fine connecting lines, without inventing proficiency scores. Shot 6 (20–25s): resolve to the real contact section and finish on a minimal end card: “Building thoughtful digital experiences.” Use restrained motion, clear hierarchy, smooth transitions, and readable text. No glitch overload, fake browser controls, invented metrics, fake project interfaces, altered logos, extra limbs or objects, warped text, excessive bloom, or rapid camera shake. Keep the footage faithful to the supplied website; add no fictional claims.

**Important:** AI video systems can distort interface text. For a professional final cut, record the real website and use that footage as the primary source. Use generated visuals only as brief background transitions, not as replacements for real project screens.

**Scope of this deliverable:** the plan and storyboard have been saved. The portfolio source code has not been modified, and an MP4/GIF promo has not been rendered in this step. The next implementation pass should refine the current scene and motion using the existing project stack before adding optional enhancements.
