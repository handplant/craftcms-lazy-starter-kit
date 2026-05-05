---
version: alpha
name: CraftKit
description: Hypermedia-first Craft CMS starter kit — neobrutalist aesthetic with bold typography, hard offset shadows, sharp corners, and an orange accent on near-black ink.
colors:
  pop: "#fb923c"
  pop-on: "#ea580c"
  pop-dim: "#ffedd5"
  ink: "#1c1917"
  ink-on: "#57534e"
  ink-dim: "#a8a29e"
  canvas: "#fffef9"
  bg: "#f2f0eb"
typography:
  h1:
    fontFamily: Archivo
    fontSize: "clamp(2rem, 4vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 1.2
  h2:
    fontFamily: Archivo
    fontSize: "clamp(1.5rem, 3vw, 2.5rem)"
    fontWeight: 900
    lineHeight: 1.4
  h3:
    fontFamily: Archivo
    fontSize: "clamp(1.4rem, 2.5vw, 2rem)"
    fontWeight: 900
    lineHeight: 1.4
  h4:
    fontFamily: Archivo
    fontSize: "clamp(1rem, 2vw, 1.5rem)"
    fontWeight: 900
    lineHeight: 1.375
  body-lg:
    fontFamily: Archivo
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.75
  body:
    fontFamily: Archivo
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: Archivo
    fontSize: 0.875rem
    fontWeight: 900
    letterSpacing: 0.05em
  mono:
    fontFamily: ui-monospace
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.625
rounded:
  none: 0px
spacing:
  gap-x: 48px
  gap-y: 48px
  gap-y-sm: 32px
  space: 24px
components:
  button:
    backgroundColor: "{colors.pop}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "6px 16px"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.pop}"
    rounded: "{rounded.none}"
    padding: "6px 16px"
  card:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.none}"
  input:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.none}"
  notice:
    backgroundColor: "{colors.pop}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
---

## Overview

CraftKit is a neobrutalist design system for a Craft CMS starter kit. The aesthetic is deliberate and graphic — sharp corners everywhere, hard offset drop shadows (no blur), thick 2px ink borders, and a warm off-white palette punctuated by a bold orange accent.

The visual language is constrained and intentional: two weights (regular and black/900), one typeface (Archivo), and a small token vocabulary. Everything is either `ink` (dark) or `pop` (orange). The tension between them creates hierarchy.

The page background features a subtle grid of ink-5%-opacity lines at 60px intervals — a reference to graph paper, grounding the layout without visual noise.

Typography is fluid using CSS `clamp()` — headings scale between a minimum and maximum based on viewport width, ensuring proportional rhythm across all screen sizes.

## Colors

**pop** (`#fb923c`) — The primary accent. Orange-400. Used for button backgrounds, selection highlight, bullet points, link decorations, and anything that needs to stand out. Warm and energetic.

**pop-on** (`#ea580c`) — Orange-600. Hover state for pop elements, link decoration color, icon strokes on interactive elements. Darker and more saturated — signals interaction.

**pop-dim** (`#ffedd5`) — Orange-100. Very light orange tint. Used as subtle background highlights, code block text in dark contexts, or secondary accent backgrounds that shouldn't compete with primary pop.

**ink** (`#1c1917`) — Stone-900. The near-black primary. Used for all body text, headings, borders, shadows, and dark component backgrounds. Not pure black — the warm stone undertone keeps it from feeling cold.

**ink-on** (`#57534e`) — Stone-600. Muted text, secondary content, labels. Never use for primary content — only for supporting information.

**ink-dim** (`#a8a29e`) — Stone-400. Placeholder text, disabled states, very secondary UI.

**canvas** (`#fffef9`) — Warm near-white. Component surface: cards, inputs, nav backgrounds. Slightly cream — not clinical white.

**bg** (`#f2f0eb`) — Warm light gray with a linen undertone. Page background. Creates soft depth contrast between the page and canvas-colored components.

## Typography

Single typeface throughout: **Archivo** (sans-serif). The system relies on weight contrast — body text is regular (400), headings and all interactive labels are black (900/`font-black`). There is no medium or semibold.

Headings are fluid — they scale continuously between a min and max size using `clamp()`:
- **h1**: 2rem → 4.5rem, black, line-height 1.2. Only one per page.
- **h2**: 1.5rem → 2.5rem, black, line-height 1.4.
- **h3 / teaser**: 1.4rem → 2rem, black, line-height 1.4. Common for card headlines and section leads.
- **h4**: 1rem → 1.5rem, black, leading-snug. Used inside cards and dense UI.
- **h5 / strong / b**: body size, black. Inline emphasis, not structural hierarchy.

Body text is set at `lg` (1.125rem) on medium screens, `xl` (1.25rem) on large screens.

Button and notice labels use the `label` style: small (0.875rem), black weight, `uppercase`, `tracking-wide` (0.05em letter-spacing). This gives interactive elements a graphic, stamp-like quality.

Code uses a system monospace stack at 0.875rem. In dark code blocks (`bg-ink`), text is `pop-dim`.

Text selection uses `pop` background with `ink` text.

## Layout

The grid is built on a CSS custom property system with fluid gaps. All layout spacing is defined as `clamp()` — it scales continuously between a minimum and maximum based on viewport width, so there are no hard breakpoint jumps.

**Layout spacing vars (defined in `:root`):**
- `--gap-x`: `clamp(0.5rem, 6vw, 3rem)` — horizontal page gutters, used in `ui-gap-x` and the grid column definition
- `--gap-y`: `clamp(0.5rem, 6vw, 3rem)` — vertical rhythm between Matrix content blocks
- `--gap-y-sm`: `clamp(0.5rem, 6vw, 2rem)` — tighter vertical rhythm for `.inlines` sections. Desktop max: 32px.

**Component spacing** uses `--space: clamp(1rem, 2.5vw, 1.5rem)` — fluid from 16px (mobile) to 24px (desktop), applied via the `ui-space` utility. Use `ui-space` for card and feature content padding. The `space` token (24px) represents the desktop maximum.

The content column is bounded at `1024px` (lg breakpoint) with `--gap-x` padding on each side.

The main layout breakpoint is `switch` at `1280px` — this controls nav switching between mobile and desktop.

Standard breakpoints: `2xs` (384px), `xs` (480px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `3xl` (1840px).

Use `ui-gap-x` for horizontal outer padding (`px-(--gap-x)`).

## Elevation & Depth

Depth is achieved exclusively through hard offset box shadows — no blur, no opacity gradients, no real elevation metaphor. The shadow color is always `ink` or `pop-on`, never transparent gray.

Shadow color is controlled via the CSS custom property `--shadow-color` (default: `var(--color-ink)`, defined in `:root`). Override it on any element or component class to change shadow color without additional utility classes.

- **ui-shadow-sm**: `3px 3px 0 0 var(--shadow-color)` — subtle, used for small elements
- **ui-shadow**: `5px 5px 0 0 var(--shadow-color)` — standard depth, paired with `ui-border`
- **ui-shadow-lg**: `7px 7px 0 0 var(--shadow-color)` — prominent, used on hover states
- **ui-shadow-pop**: `5px 5px 0 0 pop-on` — hardcoded orange shadow for standalone use

**ui-neo** combines `ui-border` + `ui-shadow` — the primary surface treatment for interactive elements.

**ui-lift** is the standard hover interaction: `-0.5px` translate on both axes + shadow grows to `ui-shadow-lg` with a 150ms transition. This creates the illusion of the element lifting toward the user.

On button press/active state, the shadow collapses to `none` and the element translates `+1.25px` in both axes — simulating physical depression.

## Shapes

All shapes are square — `border-radius: 0` throughout. No rounded corners anywhere. This is a core aesthetic decision that reinforces the graphic, print-inspired character. Never add `rounded-*` classes to UI components.

The only exception: focus rings use the browser default ring shape, which may have slight radius depending on platform.

## Components

### Button (`.ui-btn`)

Primary call-to-action. Orange (`pop`) background, ink text, neo border+shadow treatment. Text is uppercase, black weight, tracking-wide — stamp-like.

On hover: shadow collapses, element shifts `+1.25px` — pressed effect.
On focus: ink ring with 2px offset.
Disabled: 50% opacity, no pointer events.

The base button defines three local CSS vars: `--_bg` (default: `pop`), `--_text` (default: `ink`), and `--shadow-color` (default: `ink`). Variants override only these vars — no property duplication.

Variants:
- **default**: `pop` bg, `ink` text, ink shadow
- **`ui-btn--dark`**: `ink` bg, `pop` text, `pop-on` shadow — for use on light or `pop` backgrounds
- **`ui-btn--lg`**: larger padding and text size for hero contexts

External links automatically append an external link icon (Heroicon).

### Card (`.ui-card`)

Full-height canvas-colored surface with neo treatment and lift hover. Typically contains an aspect-ratio image, h4 headline, teaser text, and optional button. Internal spacing: `space-y-3` container, `ui-space` content padding.

### Input / Select (`.ui-input`, `.ui-select`)

Canvas background, neo border. Focus state switches shadow to `ui-shadow-pop` and border to `pop-on` — clear orange focus ring replaces the default browser ring.

### Notice (`.ui-notice`)

Inline badge/label component. Pop background, neo border, black weight. Used for status indicators, labels, count badges.

## Do's and Don'ts

**Do:**
- Use `ink` and `pop` as the only two accent colors — the system has no blues, greens, or purples
- Always pair borders and shadows via `ui-neo` — never add a border without a matching shadow
- Use `font-black` (900) for all interactive labels, headings, and anything meant to draw the eye
- Keep corners sharp — `rounded-none` is the default, resist the urge to soften edges
- Let fluid type do its work — don't override clamp sizes with fixed values at specific breakpoints

**Don't:**
- Don't use standard drop shadows (`shadow-md`, etc.) — only the hard offset shadow utilities
- Don't add border-radius to UI components — this breaks the neobrutalist character
- Don't introduce new colors outside the token set — the restraint is intentional
- Don't use semibold or medium weights — only regular (400) and black (900)
- Don't center body text — left-aligned only (except explicit display/hero contexts)
- Don't use `ink-on` or `ink-dim` for primary content — they're for supporting/secondary text only
