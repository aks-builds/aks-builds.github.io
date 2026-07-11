# Mobile-Responsive & Touch-Native Animation Pass — Design Spec
**Date:** 2026-07-11
**Status:** Approved

---

## 1. Problem

The Next.js rebuild (2026-07-10, see `2026-06-10-portfolio-readme-revamp-design.md` for the prior design — since fully superseded) was designed and verified on desktop/laptop viewports only. On phones and tablets:

- Work/Packages/Talks/Certifications/Skills grids are hardcoded to fixed column counts (`repeat(2/3/4, 1fr)`) with no breakpoint — columns get crushed illegibly narrow instead of adapting.
- Only `Hero.module.css`, `Nav.module.css`, `SkillTable.module.css`, `contact.module.css`, and `case-study.module.css` have any `@media` query at all — one breakpoint each, inconsistent values (`800px`, `720px`).
- Four components (`CursorGlow`, `MagneticButton`, `TiltWrapper`, `HeroCanvas`'s mouse-tracked tilt) only respond to `mousemove`/hover — meaningless on touch, so those effects are simply dead weight on mobile rather than broken, but the site loses the interactivity that's central to its design.
- Typography is fixed-`px`, so it doesn't scale between the ~360px small-Android floor and the ~1440px+ desktop ceiling.

## 2. Goals

- Same single deployment/URL (`aks-builds.github.io`) renders correctly across phone and tablet widths, portrait and landscape — not a separate mobile site.
- Every mouse-only interaction gets a real touch-native equivalent (not just disabled) — see §5.
- Mobile gets some of its own animation personality (swipeable carousel, tap interactions) rather than being a shrunk desktop, per explicit request.
- Desktop layout (≥1024px) is unaffected — this is additive, not a rewrite.
- WebGL hero particle field is perf/battery-tuned for mobile GPUs.

## 3. Breakpoint System (new shared constant)

Replacing the current one-off `800px`/`720px` magic numbers with a consistent scale, used via CSS custom media / plain `@media` across all components:

| Name | Width | Covers |
|---|---|---|
| `phone` | ≤ 480px | Small-to-large phones, portrait |
| `phone-lg` | ≤ 768px | Large phones landscape, small tablets portrait |
| `tablet` | ≤ 1024px | Tablets, portrait + landscape |

Typography (headline/body sizes) moves from fixed `px` to `clamp(min, preferred, max)` so it scales continuously rather than jumping at each breakpoint.

## 4. New Shared Hooks

- **`useIsTouchDevice()`** — resolves `(hover: none) and (pointer: coarse)` on mount; drives which interaction variant (`MagneticButton`, `CursorGlow`, `TiltWrapper`, `HeroCanvas`) renders. Since this is a static export (no server-side device detection), components default to desktop/mouse behavior on first paint and switch post-mount — accepted trade-off, causes at most a one-frame flash, no hydration mismatch.
- **`usePrefersReducedMotion()`** — standard `prefers-reduced-motion` media query, respected regardless of device type.

## 5. Component-by-Component Design

### 5.1 Hero
- Existing 1-column stack under 800px kept, re-expressed using the `phone-lg` breakpoint.
- Photo badge (`AvailabilityBadge`) shrinks from 180px to 130px under `phone`.
- WebGL particle field (`HeroCanvas`): particle count reduced ~60% and render loop capped to ~30fps on mobile viewports (checked via `useIsTouchDevice` proxy, not strictly viewport width, since a touch laptop shouldn't get the cheap version).
- Mouse-parallax tilt on headline replaced with scroll-driven tilt (reuses the scroll-progress value already tracked for `ScrollProgress`) on touch devices.

### 5.2 Nav
- Existing hamburger breakpoint (720px → remapped to `phone-lg`) kept structurally.
- Tap targets raised to 44×44px minimum (Apple/Google guideline) — currently text-only links with no padding.
- Resume-download pill + dark-mode bulb toggle repositioned so neither gets squeezed off-screen next to the hamburger.

### 5.3 Role Banner
- Below `phone-lg`: chain (`NashTech badge → placed-at arrow → Duck Creek badge`) switches from horizontal-wrap to a vertical stack (badge / down-arrow / badge) instead of letting the arrow orphan mid-wrap.

### 5.4 Card grids — Work / Packages / Talks
- Below `phone-lg`: replaces the CSS grid with a horizontal scroll-snap carousel (`scroll-snap-type: x mandatory`, native browser behavior, no JS carousel library) — one primary card + ~15% peek of the next card as swipe affordance, dot indicators via `IntersectionObserver` tracking the centered card.
- Grid layout unchanged at `tablet` width and above.

### 5.5 List/table sections — Certifications, Skills, Fact Pills, Education
- Certifications: stacked full-width list below `phone-lg`; existing checkmark draw-in animation kept.
- Skills table: collapses from multi-column table to stacked key/value rows per skill below `phone-lg` (explicitly avoiding a horizontally-scrolling table).
- Fact Pills: already `flex-wrap`s; tightens padding below `phone`.
- Education: already a simple vertical list; no structural change needed.

### 5.6 Touch-native interaction layer
| Desktop behavior | Touch replacement |
|---|---|
| `CursorGlow` — glow follows cursor | Slow always-on ambient pulse near hero, no pointer tracking |
| `MagneticButton` — button pulls toward cursor | Normal button + Framer Motion `whileTap` press/scale animation |
| `TiltWrapper` — 3D tilt on hover (project cards) | Removed — cards now live in the swipe carousel (§5.4), swipe gesture is the interactive affordance; a tap-triggered tilt would be gimmicky |
| `HeroCanvas` mouse-tracked parallax | Scroll-driven tilt (§5.1) |

### 5.7 Contact page
- Click-to-copy cards get the same grid→stack treatment as other card sections below `phone`.
- Copy-confirmation toast repositioned to avoid mobile keyboard/browser-chrome overlap.

### 5.8 Case-study pages (`/work/[slug]`)
- Stat callout block stacks vertically below 600px (narrower than the general `phone-lg` cutoff since it's a 2-item block, not a grid).
- Reading-width margins tightened for narrow screens.

### 5.9 404 page
- No structural work planned; confirm only that it doesn't visually break at `phone` width.

## 6. Non-goals

- No separate mobile subdomain/URL — single responsive deployment.
- No rewrite of desktop layout/behavior — ≥1024px is unaffected.
- No physical-device test lab — verification is emulation-based (§7) plus the user's own phone before deploy.

## 7. Verification Plan

1. `npm run build` after each component batch, to catch type/build errors incrementally rather than at the end.
2. Playwright device emulation: iPhone 14 (390×844), Pixel 7 (412×915), iPad Mini (768×1024) and iPad Air (820×1024) landscape — screenshot every page/section at each profile, checking for overflow, overlap, illegible text, or dead touch targets.
3. Local dev server left running for the user to spot-check on their own phone over LAN before deploy.
4. Deploy to GitHub Pages only after both the automated screenshots and the user's own phone check pass.
