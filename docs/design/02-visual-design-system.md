# 02 — Visual Design System

> **Document type:** Design Tokens & Component Specifications  
> **Direction:** Precision+ (evolved editorial 3D portfolio)  
> **Status:** Design-only — no code to be written  

---

## 1. Colour Palette

### 1.1 Core Colours

| Token | Hex | HSL | Usage |
|---|---|---|---|
| `--bg-primary` | `#06060B` | 240 30% 3% | Main page background — the deepest black with a faint blue cast |
| `--bg-secondary` | `#0C0D14` | 234 25% 6% | Card backgrounds, nav bar (scrolled state) |
| `--bg-surface` | `#13141D` | 233 20% 9% | Elevated containers, form fields, skill cards |
| `--bg-surface-elevated` | `#1A1B27` | 235 18% 13% | Modals, tooltips, active navigation |
| `--text-primary` | `#F0F0F3` | 240 10% 95% | Headings, primary body text — near-white with slight cool tint |
| `--text-secondary` | `#A0A3B1` | 228 12% 66% | Supporting text, descriptions, meta info |
| `--text-muted` | `#5C5F73` | 231 11% 41% | Captions, timestamps, placeholder text |
| `--accent-primary` | `#06B6D4` | 188 91% 43% | Primary interactive accent — cyan |
| `--accent-primary-light` | `#22D3EE` | 186 87% 53% | Hover state of primary accent |
| `--accent-secondary` | `#8B5CF6` | 258 90% 66% | Secondary accent — violet; used for variety, never competing with cyan |
| `--border-default` | `#1E1F2E` | 235 20% 15% | Card borders, dividers, inactive states |
| `--border-hover` | `#2D2F42` | 234 18% 22% | Border on hover |
| `--border-accent` | `#06B6D4` (20% opacity) | — | Border when element is focused or active |

### 1.2 State Colours

| Token | Hex | Usage |
|---|---|---|
| `--success` | `#22C55E` | Form success, completed badges |
| `--success-bg` | `#22C55E` at 10% | Background tint for success states |
| `--warning` | `#EAB308` | In-progress badges |
| `--warning-bg` | `#EAB308` at 10% | Background tint for warning states |
| `--error` | `#EF4444` | Form errors, failed states |
| `--error-bg` | `#EF4444` at 10% | Background tint for error states |

### 1.3 3D Scene Colours

| Token | Hex | Usage |
|---|---|---|
| `--scene-ambient` | `#1A1A2E` | Ambient light colour in R3F scenes |
| `--scene-key` | `#06B6D4` | Primary directional light (cyan) |
| `--scene-fill` | `#8B5CF6` | Secondary fill light (violet) |
| `--scene-rim` | `#F0F0F3` | Rim/back light (near-white) |

### 1.4 Gradient Definitions

| Name | Definition | Usage |
|---|---|---|
| `gradient-page` | `linear-gradient(180deg, #0A0B14 0%, #06060B 100%)` | Full-page background — subtle blue-black at top fading to pure black |
| `gradient-accent` | `linear-gradient(135deg, #06B6D4, #8B5CF6)` | CTA buttons, active indicators, accent decorations |
| `gradient-card-hover` | `linear-gradient(135deg, rgba(6,182,212,0.05), rgba(139,92,246,0.05))` | Card hover overlay |
| `gradient-text` | `linear-gradient(135deg, #06B6D4, #8B5CF6)` | Applied via `background-clip: text` for accent headings |
| `gradient-glow` | `radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%)` | Subtle glow behind hero 3D scene |

---

## 2. Typography

### 2.1 Typeface Selection

| Role | Typeface | Source | Rationale |
|---|---|---|---|
| **Display** | **Outfit** (700–800) | Google Fonts | Geometric sans with personality; modern but not generic; excellent at large sizes |
| **Body** | **Inter** (300–600) | Google Fonts (already installed) | Optimised for screen readability; wide language support; variable weight |
| **Mono** | **JetBrains Mono** (400–600) | Google Fonts (already installed) | Developer credibility; used for code snippets, labels, and technical details |

### 2.2 Type Scale

| Token | Desktop Size | Mobile Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|---|
| `--type-display` | 72px / 4.5rem | 40px / 2.5rem | 800 | 1.0 | -0.03em | Hero name, page title |
| `--type-h1` | 56px / 3.5rem | 32px / 2rem | 700 | 1.1 | -0.02em | Section headings |
| `--type-h2` | 36px / 2.25rem | 24px / 1.5rem | 700 | 1.2 | -0.01em | Sub-section headings |
| `--type-h3` | 24px / 1.5rem | 20px / 1.25rem | 600 | 1.3 | 0 | Card titles, labels |
| `--type-body` | 17px / 1.0625rem | 16px / 1rem | 400 | 1.7 | 0 | Paragraphs, descriptions |
| `--type-body-sm` | 15px / 0.9375rem | 14px / 0.875rem | 400 | 1.6 | 0 | Supporting text |
| `--type-caption` | 13px / 0.8125rem | 12px / 0.75rem | 500 | 1.5 | 0.02em | Timestamps, badges, meta |
| `--type-label` | 12px / 0.75rem | 11px / 0.6875rem | 600 | 1.4 | 0.08em | Uppercase labels, overlines |
| `--type-mono` | 14px / 0.875rem | 13px / 0.8125rem | 400 | 1.6 | 0 | Code, tech stack tags |
| `--type-button` | 15px / 0.9375rem | 14px / 0.875rem | 600 | 1.0 | 0.02em | Button text |

### 2.3 Typography Rules

1. **Display headings** (`--type-display`, `--type-h1`) use **Outfit**. All other text uses **Inter**.
2. **Maximum line length** for body text: 65 characters (~680px at body size).
3. **Headings never wrap to more than 3 lines** on any breakpoint.
4. **Gradient text** is reserved for the hero name and one accent word per section heading (e.g., "Featured **Projects**").
5. **Monospace** is used for technology labels, code references, and the contact email address.

---

## 3. Spacing System

### 3.1 Base Unit

All spacing derives from a **4px base unit**. The scale uses powers-of-2 multiples for consistency.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Inline icon gap |
| `--space-2` | 8px | Tag padding, tight gaps |
| `--space-3` | 12px | Card internal padding (compact) |
| `--space-4` | 16px | Default element gap |
| `--space-6` | 24px | Card padding, section sub-gaps |
| `--space-8` | 32px | Card padding (large), grid gap |
| `--space-12` | 48px | Section internal padding |
| `--space-16` | 64px | Section vertical margin (mobile) |
| `--space-24` | 96px | Section vertical margin (tablet) |
| `--space-32` | 128px | Section vertical margin (desktop) |
| `--space-40` | 160px | Hero vertical padding |

### 3.2 Layout Dimensions

| Token | Value | Usage |
|---|---|---|
| `--content-max` | 1200px | Maximum content width |
| `--content-narrow` | 800px | Narrow text columns (about, contact) |
| `--page-margin` | 24px (mobile), 48px (tablet), 64px (desktop) | Horizontal page margin |
| `--nav-height` | 64px | Fixed navigation height |
| `--grid-columns` | 12 | CSS Grid column count |
| `--grid-gap` | 24px (mobile), 32px (desktop) | Grid gap |

---

## 4. Grid System

- **12-column grid** within `--content-max`.
- **Columns collapse** to 6 on tablet, 4 on mobile.
- **Project cards**: 2 columns on desktop (span 6 each), 1 column on mobile.
- **Skill cards**: 3 columns on desktop (span 4 each), 2 on tablet, 1 on mobile.
- **About section**: Image occupies columns 1–5, text occupies columns 7–12 (desktop).
- **Contact section**: Info occupies columns 1–5, form occupies columns 7–12 (desktop).

---

## 5. Responsive Breakpoints

| Name | Width | Layout Changes |
|---|---|---|
| `sm` | ≥ 640px | 2-column project grid, larger type |
| `md` | ≥ 768px | Tablet layout, 2-column skills |
| `lg` | ≥ 1024px | Desktop layout, full nav, 3-column skills |
| `xl` | ≥ 1280px | Content centred with max-width |
| `2xl` | ≥ 1536px | Larger hero type, more whitespace |

---

## 6. Surfaces & Materials

### 6.1 Card Surface

```
Background:  var(--bg-surface)
Border:      1px solid var(--border-default)
Radius:      16px
Shadow:      none (shadows reserved for elevated/floating elements)
Hover:       border → var(--border-hover), overlay → gradient-card-hover
```

### 6.2 Elevated Surface (Modals, Tooltips)

```
Background:  var(--bg-surface-elevated)
Border:      1px solid var(--border-hover)
Radius:      12px
Shadow:      0 16px 48px rgba(0,0,0,0.4), 0 0 1px rgba(6,182,212,0.1)
Backdrop:    blur(16px)
```

### 6.3 Glass Surface (Navigation scrolled, badges)

```
Background:  rgba(12,13,20, 0.85)
Border:      1px solid var(--border-default)
Backdrop:    blur(12px) saturate(1.2)
```

---

## 7. Iconography

- **Icon library:** Lucide React (already installed).
- **Icon size:** 16px (inline), 20px (buttons), 24px (cards), 32px (feature highlights).
- **Icon colour:** Inherits text colour by default; accent colour on hover.
- **Icon stroke width:** 1.5px (Lucide default) — matches the "precision" theme.

---

## 8. Image Treatment

### 8.1 Profile Images
- Displayed in a rounded rectangle (radius 16px) with a subtle 1px border matching `--border-default`.
- On hover, a faint gradient-accent glow appears behind the image (achieved via box-shadow or pseudo-element).
- No aggressive clipping masks, circular crops, or floating decorative elements around the image.

### 8.2 Project Screenshots
- Displayed in a container with 16:10 aspect ratio, radius 12px.
- Light CSS `perspective` transform on hover (see Motion spec).
- Fallback: If no screenshot is available, display a gradient background matching the project's category colour with the project name in large monospace text.
- All screenshots should be captured at 1440×900 resolution minimum and served in WebP format with JPEG fallback.

### 8.3 Background Images
- The existing `Aaditya_pic.jpg` should be colour-graded to match the new palette (desaturated, shifted toward blue-black tones) and used only in the hero section or about section — not both.
- Never tile, repeat, or use as a full-page fixed background.

---

## 9. Component Specifications

### 9.1 Primary Button

```
Background:   gradient-accent
Text:         var(--bg-primary) — dark text on bright gradient
Padding:      14px 28px
Radius:       9999px (fully rounded)
Font:         var(--type-button), uppercase, letter-spacing 0.04em
Hover:        brightness(1.1), translateY(-1px)
Active:       brightness(0.95), translateY(0)
Focus:        2px solid var(--accent-primary), offset 2px
Disabled:     opacity 0.4, cursor not-allowed
```

### 9.2 Secondary Button (Outline)

```
Background:   transparent
Border:       1px solid var(--accent-primary) at 40% opacity
Text:         var(--accent-primary)
Padding:      14px 28px
Radius:       9999px
Hover:        border opacity → 100%, background → var(--accent-primary) at 8%
Focus:        Same as primary
```

### 9.3 Navigation Link

```
Default:      var(--text-secondary), no underline
Hover:        var(--text-primary), subtle underline offset
Active:       var(--accent-primary), active indicator bar below
Font:         var(--type-body-sm), weight 500
```

### 9.4 Project Card

```
Container:    Card Surface (see §6.1)
Image area:   Top — 16:10 ratio, overflow hidden, radius top-left/right 16px
Content area: Bottom — padding var(--space-6)
Title:        var(--type-h3), var(--text-primary)
Description:  var(--type-body-sm), var(--text-secondary), max 3 lines with ellipsis
Tech tags:    Monospace, caption size, pill-shaped (radius 9999px), surface background
Actions:      Icon buttons (GitHub, External Link) aligned bottom-right
Hover:        Card border → var(--border-hover), image scale 1.03, subtle rotateY(2deg)
```

### 9.5 Skill Category Card

```
Container:    Card Surface
Icon:         32px, accent-primary
Title:        var(--type-h3)
Tags:         Grid of pills, monospace, var(--type-mono)
Hover:        Border glow (box-shadow with accent-primary at 10%)
```

### 9.6 Tech Tag / Badge

```
Background:   var(--bg-surface)
Border:       1px solid var(--border-default)
Text:         var(--type-mono), var(--text-secondary)
Padding:      4px 12px
Radius:       9999px
Hover:        text → var(--accent-primary), border → var(--border-accent)
```

### 9.7 Social Link Button

```
Size:         44px × 44px (touch target compliant)
Background:   var(--bg-surface)
Border:       1px solid var(--border-default)
Radius:       50%
Icon:         20px, var(--text-secondary)
Hover:        border → var(--accent-primary) at 50%, icon → var(--accent-primary), bg → var(--accent-primary) at 5%
```

### 9.8 Form Input

```
Background:   var(--bg-surface)
Border:       1px solid var(--border-default)
Text:         var(--type-body), var(--text-primary)
Placeholder:  var(--text-muted)
Padding:      16px
Radius:       12px
Focus:        border → var(--accent-primary), ring → var(--accent-primary) at 15% (2px)
Error:        border → var(--error), ring → var(--error) at 15%
```

### 9.9 Tooltip

```
Background:   var(--bg-surface-elevated)
Border:       1px solid var(--border-hover)
Text:         var(--type-caption), var(--text-primary)
Padding:      8px 12px
Radius:       8px
Shadow:       Elevated surface shadow
Arrow:        6px triangle matching background
```

### 9.10 Timeline Node

```
Outer ring:   40px × 40px, 2px solid gradient-accent
Inner dot:    12px × 12px, solid gradient-accent
Line:         2px wide, gradient from accent-primary to transparent
Card:         Card Surface, connected via line to node
```

### 9.11 Loading States

```
Skeleton:     var(--bg-surface) with shimmer animation (gradient sweep)
Spinner:      24px, 2px border, accent-primary, rotating
Progress bar: 3px height, gradient-accent, fixed top
```

### 9.12 Status Badges

```
Completed:    var(--success-bg) background, var(--success) text, 1px border
In Progress:  var(--warning-bg) background, var(--warning) text, 1px border
```
