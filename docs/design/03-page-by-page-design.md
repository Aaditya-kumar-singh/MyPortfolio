# 03 — Page-by-Page Design Specification

> **Document type:** Section layouts, content hierarchy, and interaction design  
> **Direction:** Precision+  
> **Status:** Design-only — no code to be written  

---

## Visual Storyboard: The Scroll Journey

Before detailing each section, here is the complete scroll experience described as a continuous sequence:

```
VIEWPORT 0vh  ─ OPENING EXPERIENCE
│  Black screen → name fades in → 3D polyhedron appears → transition dissolves
│
VIEWPORT 1vh  ─ HERO (100vh)
│  Deep blue-black background. Left: large "Aaditya Kumar" display heading +
│  subtitle + CTAs. Right: interactive 3D polyhedron with cyan/violet lighting.
│  Pointer movement tilts the polyhedron. Hairline Terrain figure bottom-left.
│  Social links, scroll indicator at bottom centre.
│
VIEWPORT 100vh ─ ABOUT (min 100vh)
│  Background transitions slightly darker. Large "About" heading with gradient
│  accent word. Left: full-height profile image in rounded container. Right:
│  concise bio text, philosophy statement, education highlight. Hairline Stack
│  figure accent beside image. Resume download + contact CTA at bottom.
│
VIEWPORT ~200vh ─ SKILLS (min 80vh)
│  "Technical Expertise" heading. 6 category cards in 3×2 grid (desktop).
│  Each card: icon, category name, tech tags. Cards reveal with stagger.
│  Optional: small R3F node-graph visualization (Tier A only).
│
VIEWPORT ~300vh ─ PROJECTS (min 120vh)
│  "Featured Projects" heading. 2-column grid. Each card: real screenshot (or
│  gradient fallback), title, description, tech tags, GitHub + Demo links.
│  Cards have perspective tilt on hover. CNC Market and SchemaFlow featured
│  prominently. "View all on GitHub" link at bottom.
│
VIEWPORT ~420vh ─ EXPERIENCE & EDUCATION (min 80vh)
│  "Journey" heading. Vertical timeline: VenueMonk internship → B.Tech →
│  Senior Secondary. Certifications displayed as compact horizontal cards
│  below timeline. Resume download button.
│
VIEWPORT ~500vh ─ CONTACT (min 80vh)
│  "Let's Connect" heading. Left: email, LinkedIn, GitHub cards + location.
│  Right: contact form (email, subject, message, send). Hairline Grid figure
│  accent in background.
│
VIEWPORT ~580vh ─ FOOTER
│  Minimal. Brand name, year, social icons, "Back to top" button.
│  Background fades to pure #06060B.
```

---

## Section 0: Opening Experience

### Purpose
Create a 2-second moment of visual polish before the hero, establishing the premium tone. This replaces the existing 7.4-second, 5-step "Did I cook?" intro.

### Design

**Frame 0 (0ms):** Pure black screen (`#06060B`). Nothing visible.

**Frame 1 (200ms–1200ms):** "AADITYA KUMAR" appears letter-by-letter in `--type-display`, Outfit 800, `--text-primary`, centred. Each letter fades and slides up with 30ms stagger. Below it, "Full-Stack Developer" appears in `--type-body`, Inter 400, `--text-muted`, with 200ms delay after the last letter.

**Frame 2 (1200ms–2000ms):** The text fades out via opacity and slight scale-down (0.97). Simultaneously, the background becomes the hero section background (a cross-fade, not a hard cut).

**Total duration:** 2 seconds.

**Skip:** Clicking or pressing any key immediately jumps to the hero. A small "Skip" label in `--type-caption` appears at bottom-right after 500ms.

**Returning visitors:** Use `sessionStorage` to skip the intro entirely for the current session. First visit in a session always shows it.

**Reduced-motion:** The text simply appears at full opacity for 1.5 seconds, then cross-fades to hero. No letter stagger, no scale transform.

---

## Section 1: Hero

### Layout (Desktop — 1280px+)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ NAV BAR (transparent, 64px height)                                       │
│  [Logo: "AK" monogram]              [Home] [About] [Projects] [Exp] [Contact] │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌─── LEFT (col 1–6) ───┐        ┌─── RIGHT (col 7–12) ───┐          │
│   │                       │        │                          │          │
│   │  Overline label:      │        │   ┌──────────────────┐  │          │
│   │  "FULL-STACK          │        │   │                  │  │          │
│   │   DEVELOPER"          │        │   │   3D POLYHEDRON  │  │          │
│   │  (--type-label, cyan) │        │   │   (R3F Canvas)   │  │          │
│   │                       │        │   │   ~400×400px     │  │          │
│   │  Display heading:     │        │   │                  │  │          │
│   │  "Aaditya"            │        │   └──────────────────┘  │          │
│   │  "Kumar"              │        │                          │          │
│   │  (--type-display,     │        │                          │          │
│   │   Outfit 800, white)  │        │                          │          │
│   │                       │        │                          │          │
│   │  Tagline:             │        │                          │          │
│   │  "Crafting digital    │        │                          │          │
│   │   experiences with    │        │                          │          │
│   │   precision and code" │        │                          │          │
│   │  (--type-body,        │        │                          │          │
│   │   --text-secondary)   │        │                          │          │
│   │                       │        │                          │          │
│   │  [View My Work]  primary btn   │                          │          │
│   │  [Download CV]   secondary btn │                          │          │
│   │                       │        │                          │          │
│   │  ○ GitHub  ○ LinkedIn │        │                          │          │
│   │  ○ Email              │        │                          │          │
│   │                       │        │                          │          │
│   └───────────────────────┘        └──────────────────────────┘          │
│                                                                          │
│   ┌ Hairline Terrain (subtle, bottom-left, --text-muted opacity) ┐      │
│                                                                          │
│                    ↓ Scroll to explore ↓                                 │
│                    (--type-caption, animated bounce)                      │
└──────────────────────────────────────────────────────────────────────────┘
```

### Layout (Mobile — < 768px)

```
┌────────────────────────────────┐
│ NAV: [AK]           [☰ Menu]  │
├────────────────────────────────┤
│                                │
│     ┌──────────────────┐       │
│     │  3D POLYHEDRON   │       │
│     │  (240×240px)     │       │
│     └──────────────────┘       │
│                                │
│    FULL-STACK DEVELOPER        │
│    (label, centred)            │
│                                │
│    Aaditya                     │
│    Kumar                       │
│    (display, centred,          │
│     40px / 2.5rem)             │
│                                │
│    "Crafting digital           │
│     experiences..."            │
│    (body, centred)             │
│                                │
│    [View My Work]              │
│    [Download CV]               │
│                                │
│    ○  ○  ○  (social)           │
│                                │
│         ↓ Scroll ↓             │
└────────────────────────────────┘
```

### Headline Copy
- **Overline:** `FULL-STACK DEVELOPER`
- **Display:** `Aaditya` (line 1) / `Kumar` (line 2)
- **Tagline:** `Crafting digital experiences with precision and code`
- **Primary CTA:** `View My Work` → scrolls to Projects section
- **Secondary CTA:** `Download CV` → opens `/resume.pdf` in new tab

### 3D Scene Interaction
- **Idle:** Polyhedron rotates slowly on Y axis (0.15 rad/s).
- **Pointer move:** Polyhedron tilts toward pointer position (max ±15°). Gentle spring easing.
- **Scroll:** As visitor scrolls past 30vh, the polyhedron fades to 0 opacity and scales down slightly. This prevents it from competing with the About section.
- **Touch (mobile):** No tilt interaction. Rotation only.
- **Reduced motion:** Static polyhedron, no rotation, no tilt.

### Animation Sequence (on load, after intro)
1. **0ms:** Background gradient visible.
2. **100ms:** Overline label slides up + fades in.
3. **300ms:** Display heading slides up + fades in (each line staggered 100ms).
4. **600ms:** Tagline fades in.
5. **800ms:** CTA buttons fade in + scale from 0.95.
6. **1000ms:** Social links fade in with 60ms stagger.
7. **1200ms:** 3D scene fades in (the scene has already been loading in background).
8. **1500ms:** Scroll indicator appears.
9. **1800ms:** Hairline Terrain figure draws in (line-draw animation).

---

## Section 2: About Me

### Purpose
Introduce Aaditya as a person and professional in a concise, editorial format. Avoid the wall-of-text problem.

### Layout (Desktop)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   "About" (--type-h1, gradient accent on "About")                       │
│                                                                          │
│   ┌─── LEFT (col 1–5) ───┐     ┌─── RIGHT (col 7–12) ───┐             │
│   │                       │     │                          │             │
│   │   ┌───────────────┐   │     │  "I'm a Computer Science │             │
│   │   │               │   │     │   Engineering graduate    │             │
│   │   │  PROFILE      │   │     │   and full-stack developer│             │
│   │   │  IMAGE        │   │     │   building real products  │             │
│   │   │  (Aaditya.png)│   │     │   with React, Node.js,   │             │
│   │   │  16:20 ratio  │   │     │   and modern web tech."  │             │
│   │   │  radius 16px  │   │     │                          │             │
│   │   │               │   │     │  — Concise philosophy:   │             │
│   │   └───────────────┘   │     │  "I believe good software│             │
│   │                       │     │   is built with empathy  │             │
│   │   ┌ Hairline Stack ┐  │     │   for users and respect  │             │
│   │   (accent figure)     │     │   for craft."            │             │
│   │                       │     │                          │             │
│   └───────────────────────┘     │  Key facts (inline):     │             │
│                                 │  • B.Tech CSE, PTU, 2026 │             │
│                                 │  • Based in India        │             │
│                                 │                          │             │
│                                 │  [Download Resume]       │             │
│                                 │  [Contact Me]            │             │
│                                 └──────────────────────────┘             │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Content Rules
- **Maximum 3 short paragraphs** (each ≤ 3 sentences).
- **No stat counters.** Remove "2+ Years Experience", "15+ Projects Completed", "100% Client Satisfaction". These feel inflated for a fresh graduate and damage trust. The projects and experience sections provide evidence directly.
- **Use only verified facts** from the repository and resume.
- **Image:** Use `Aaditya.png` (the cleaner PNG) rather than `Aaditya_pic.jpg` (which is used in the hero background). Do not use the same photo in two different sections.

### Animation
- Image slides in from left with Framer Motion `whileInView`.
- Text paragraphs stagger in from right.
- Hairline Stack figure draws in when the section is 30% visible.

---

## Section 3: Skills & Technical Capabilities

### Purpose
Communicate genuine technical ability through an organised, explorable skills display.

### Skill Categories (verified from codebase)

| Category | Technologies |
|---|---|
| Frontend | React.js, Next.js, Vite, HTML5, CSS3, Tailwind CSS |
| Backend | Node.js, Express.js, REST APIs, WebSockets |
| Databases | MongoDB, MySQL |
| Languages | JavaScript (ES6+), TypeScript, C++, Python, SQL |
| Tools & Workflow | Git, GitHub, Docker, Postman, Vercel, Linux |
| Core Concepts | OOP, Data Structures & Algorithms, API Architecture |

### Layout (Desktop)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   "Technical" (white) "Expertise" (gradient)                            │
│   (--type-h1, centred)                                                  │
│                                                                          │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                    │
│   │  </> FRONT   │  │  ⚙ BACKEND  │  │  🗄 DATABASE  │                    │
│   │  END         │  │             │  │             │                    │
│   │  React.js    │  │  Node.js    │  │  MongoDB    │                    │
│   │  Next.js     │  │  Express.js │  │  MySQL      │                    │
│   │  Vite        │  │  REST APIs  │  │             │                    │
│   │  HTML5       │  │  WebSockets │  │             │                    │
│   │  CSS3        │  │             │  │             │                    │
│   │  Tailwind    │  │             │  │             │                    │
│   └─────────────┘  └─────────────┘  └─────────────┘                    │
│                                                                          │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                    │
│   │  { } LANGS   │  │  🔧 TOOLS   │  │  🧠 CORE    │                    │
│   │              │  │             │  │  CONCEPTS   │                    │
│   │  JavaScript  │  │  Git        │  │  OOP        │                    │
│   │  TypeScript  │  │  GitHub     │  │  DSA        │                    │
│   │  C++         │  │  Docker     │  │  API Arch   │                    │
│   │  Python      │  │  Postman    │  │             │                    │
│   │  SQL         │  │  Vercel     │  │             │                    │
│   │              │  │  Linux      │  │             │                    │
│   └─────────────┘  └─────────────┘  └─────────────┘                    │
│                                                                          │
│   (Optional Tier A: small R3F node-graph visualization)                 │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Interaction
- Cards stagger in with GSAP ScrollTrigger when section enters viewport.
- Tech tags have hover effect: border becomes cyan, text becomes cyan.
- **No proficiency bars, percentages, or ratings.** These are meaningless without context.
- Cards have a subtle border-glow on hover (box-shadow with `--accent-primary` at 10%).

---

## Section 4: Projects

### Purpose
The most important section. Showcase real work with genuine detail.

### Project Display Order (recommended)

1. **CNC Market** — Featured (freelance, most complex, live site)
2. **SchemaFlow** — Featured (dev tool, Docker, TypeScript, live demo)
3. **Typing Test Website** — Featured (real-time, WebSocket, in progress)
4. **RudraShield Pest Mgmt.** — Standard (freelance, client work)
5. **Todo App** — Standard (foundation project)
6. **CLI Web Vuln Scanner** — Standard (shows security interest, no live demo)

### Featured Project Card Layout (CNC Market, SchemaFlow)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │                                                                     │ │
│  │                    PROJECT SCREENSHOT                               │ │
│  │                    (16:10 ratio, full width)                        │ │
│  │                    Hover: scale 1.03, rotateY(2deg)                 │ │
│  │                                                                     │ │
│  │                                        [✓ Completed] badge          │ │
│  │                                        [★ Featured] badge           │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  CNC Market                                                             │
│  (--type-h3, --text-primary)                                            │
│                                                                          │
│  "A full-stack digital marketplace where users can browse,              │
│   purchase, and securely download CNC design files."                    │
│  (--type-body-sm, --text-secondary, max 3 lines)                        │
│                                                                          │
│  [Next.js] [Node.js] [Cloudflare R2] [Razorpay] [Cloudinary]           │
│  (tech tags, monospace)                                                 │
│                                                                          │
│  </> Code (if available)          🔗 Live Demo                          │
│  (icon link)                      (icon link)                           │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Standard Project Card (2-column grid)
Same structure but cards are 50% width on desktop.

### Project Image Strategy

| Project | Image Source | Action Required |
|---|---|---|
| CNC Market | No screenshot available | **Capture screenshot** of cncmarket.in at 1440×900 |
| SchemaFlow | No screenshot available | **Capture screenshot** of schemaflow.pages.dev at 1440×900 |
| Typing Test | `/TypingTest.png` exists | Verify quality; re-capture at 1440×900 if needed |
| RudraShield | No screenshot available | **Capture screenshot** of rudrashieldpestmanagement.in |
| Todo App | `/ToDoApp.png` exists | Very small (40KB); re-capture at higher resolution |
| CLI Scanner | No visual interface | Use gradient fallback with terminal icon |

### Conditional Link Display
- Show "Code" button only when `github` link is not `"#"`.
- Show "Demo" button only when `demo` link is not `"#"`.
- Remove the generic "Learn More" button (it currently goes nowhere).

### Image Failure State
If a screenshot fails to load: display the gradient fallback (matching project accent colour) with the project title in monospace `--type-h3`.

---

## Section 5: Experience & Education

### Purpose
Present verified career milestones in a clear visual timeline.

### Content (verified from codebase)

**Timeline entries:**

| Type | Title | Organisation | Period | Detail |
|---|---|---|---|---|
| Experience | Frontend Intern | VenueMonk Pvt. Ltd. | 06/2025 – 01/2026 | Production React, ES5→ES6+ migration, REST API integration |
| Education | B.Tech — CSE | Punjab Technical University | 06/2022 – 04/2026 | GPA: 7.6 |
| Education | Sr. Secondary (Non-Medical) | P.T.J.M College, Nalanda | 03/2020 – 05/2022 | Score: 67% |

**Certifications (compact display, not full cards):**

| Title | Issuer | Status | Link |
|---|---|---|---|
| Full-Stack Web Development | Udemy | Completed | Drive link ✓ |
| JavaScript Programming | Udemy | Completed | Drive link ✓ |
| C++ Programming | Udemy | Completed | Drive link ✓ |
| Python Beginner to Advanced | Great Learning / Udemy | In Progress | None |

### Layout (Desktop)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   "Journey" (--type-h1, gradient accent)                                │
│                                                                          │
│   ●──── VenueMonk Frontend Intern ────────────── 06/2025 – 01/2026     │
│   │     Production React, API integration, ES6 migration               │
│   │                                                                      │
│   ●──── B.Tech CSE, PTU ─────────────────────── 2022 – 2026           │
│   │     GPA: 7.6                                                        │
│   │                                                                      │
│   ●──── Sr. Secondary, P.T.J.M College ─────── 2020 – 2022            │
│         Score: 67%                                                      │
│                                                                          │
│   ── Certifications ──                                                  │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│   │ Full-Stack │ │ JavaScript │ │ C++        │ │ Python     │          │
│   │ ✓ Udemy    │ │ ✓ Udemy    │ │ ✓ Udemy    │ │ ◷ In Prog  │          │
│   │ [View]     │ │ [View]     │ │ [View]     │ │            │          │
│   └────────────┘ └────────────┘ └────────────┘ └────────────┘          │
│                                                                          │
│   [Download Resume]                                                     │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Design Decisions
- **Remove the stat counters** ("4+ Certifications", "100% Completion Rate" etc.). The content itself provides this information.
- **Timeline uses the design system's Timeline Node component** (§9.10 in the design system).
- **Certifications are compact cards** in a horizontal scrollable row (mobile) or 4-column grid (desktop). No large detailed cards — certifications are supporting evidence, not primary content.

---

## Section 6: Technical Storytelling (Optional — Tier A Only)

### Purpose
If implemented, this section provides an interactive, illustrative diagram showing how Aaditya's full-stack architecture works. This is **decorative/educational** — clearly labelled as "Illustrative Architecture" to distinguish it from a documented system design.

### Visual Concept

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   "How I Build" (--type-h2)                                             │
│   "An illustrative look at my full-stack workflow"                      │
│   (--type-body-sm, --text-muted)                                        │
│                                                                          │
│   ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐             │
│   │ User │───▶│ React│───▶│ API  │───▶│Node.js│───▶│  DB  │             │
│   │      │    │Front │    │      │    │Express│    │Mongo │             │
│   └──────┘    └──────┘    └──────┘    └──────┘    └──────┘             │
│                                                                          │
│   Hover over each node to see details                                   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

- Built with SVG + CSS animations, **not** a separate R3F canvas.
- Each node highlights on hover with a tooltip describing its role.
- Arrows animate sequentially when the section enters viewport.
- **This section is entirely optional** and should only be implemented after all core sections are complete.

---

## Section 7: Contact

### Purpose
Encourage professional contact with a clean, functional form and clear contact information.

### Layout (Desktop)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   "Let's" (white) "Connect" (gradient)                                  │
│   (--type-h1, centred)                                                  │
│                                                                          │
│   "Have a project in mind or want to say hello?"                        │
│   (--type-body, centred, --text-secondary)                              │
│                                                                          │
│   ┌─── LEFT (col 1–5) ───┐     ┌─── RIGHT (col 7–12) ───┐             │
│   │                       │     │                          │             │
│   │  📧 Email             │     │  ┌──────────────────────┐│             │
│   │  kumaraaditya324@...  │     │  │ Email Address        ││             │
│   │  (clickable card)     │     │  │ [input field]        ││             │
│   │                       │     │  │                      ││             │
│   │  🔗 LinkedIn          │     │  │ Subject              ││             │
│   │  aadityakumar1        │     │  │ [input field]        ││             │
│   │  (clickable card)     │     │  │                      ││             │
│   │                       │     │  │ Message              ││             │
│   │  🐙 GitHub            │     │  │ [textarea, 5 rows]   ││             │
│   │  Aaditya-kumar-singh  │     │  │                      ││             │
│   │  (clickable card)     │     │  │ [   Send Message   ] ││             │
│   │                       │     │  │                      ││             │
│   │  📍 India             │     │  │ (status messages)    ││             │
│   │  (static)             │     │  └──────────────────────┘│             │
│   │                       │     │                          │             │
│   └───────────────────────┘     └──────────────────────────┘             │
│                                                                          │
│   ┌ Hairline Grid figure (subtle, behind form area) ┐                   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Form Behaviour
- **Validation:** Client-side — required fields, email format check. Error message appears below the field in `--error` colour.
- **Loading:** Button text changes to "Sending…" with spinner. Button is disabled.
- **Success:** Green success banner with checkmark: "Message sent successfully! I'll respond within 24 hours."
- **Error:** Red error banner: "Something went wrong. Please email me directly at kumaraaditya324@gmail.com."
- **Backend contract unchanged.** The form POSTs to `${VITE_API_URL}/send` with `{ email, subject, message }`.

### Remove
- The "24h Response Time" and "100% Client Satisfaction" stat cards. These are unverified and feel presumptuous.

---

## Section 8: Footer

### Layout

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   ── (gradient divider line, 1px) ──                                    │
│                                                                          │
│   AK  Aaditya Kumar                    ○ GitHub  ○ LinkedIn  ○ Email    │
│       Full-stack developer                                              │
│                                                                          │
│   © 2026 Aaditya Kumar                             [↑ Back to Top]     │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Design Decisions
- **Simplified to 2 rows.** The existing 3-column footer with "Quick Links", "Fueled by coffee" copy, and emoji is replaced with a minimal, elegant footer.
- **No decorative floating blobs.** The footer should be calm and conclusive.
- **"Back to Top" button** scrolls to the top with smooth animation.

---

## Navigation & Global Elements

### Desktop Navigation (scrolled = false)

```
[AK monogram]                                 Home  About  Projects  Experience  Contact
```
- Transparent background, no border.
- AK monogram: 32×32px rounded square, `gradient-accent` background, "AK" in white Outfit 700.

### Desktop Navigation (scrolled = true, beyond 80px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [AK]                                 Home  About  Projects  Experience  Contact │
└──────────────────────────────────────────────────────────────────────────┘
```
- Glass surface background (§6.3).
- 1px bottom border `--border-default`.
- Height: 64px.

### Active Section Indicator
- Framer Motion `layoutId` animated underline (2px, `--accent-primary`) below the active nav link.
- Updates based on scroll position (IntersectionObserver).

### Mobile Navigation
- Hamburger icon (Lucide `Menu` / `X`).
- Opens a full-width dropdown with glass surface background.
- Nav items listed vertically with icons.
- Active item has `--accent-primary` text and left border indicator.

### Scroll Progress Bar
- Retained from existing design but restyled.
- 2px height, fixed top, `gradient-accent`.
- Z-index above navigation.

### Back-to-Top Button
- Appears after scrolling past 500px.
- 44×44px circle, `--bg-surface` background, `--border-default` border.
- Arrow-up icon in `--text-secondary`, becomes `--accent-primary` on hover.
- Fixed bottom-right, 24px margin.

### Global Background
- `gradient-page`: subtle blue-black at top → pure black at bottom.
- No dot patterns, no floating gradient blobs. Clean.
- The existing `bg-dots` pattern is removed.

### Section Transitions
- No section dividers (the pulsing orange dot divider is removed).
- Sections are separated by generous whitespace (`--space-32` on desktop, `--space-16` on mobile).
- The whitespace itself is the transition.

### Focus States
- All interactive elements have a visible focus ring: 2px solid `--accent-primary`, 2px offset.
- Focus ring uses `:focus-visible` to avoid showing on mouse click.
