# Mobile-Responsive & Touch-Native Animation Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `aks-builds.github.io` (Next.js static export) render and animate correctly on phone/tablet widths and touch input, without changing anything at desktop widths (≥1024px).

**Architecture:** Two new shared hooks (`useIsTouchDevice`, `usePrefersReducedMotion`) drive conditional behavior in existing interactive components; a new `CardCarousel` component replaces four hardcoded CSS grids with a responsive grid-on-desktop / scroll-snap-carousel-on-mobile pattern; remaining components get targeted `@media` additions using a standardized 480/768/1024px breakpoint scale.

**Tech Stack:** Next.js 16 (App Router, static export), React 19, Framer Motion, GSAP + ScrollTrigger, React Three Fiber / Three.js, CSS Modules. Playwright added as a new devDependency purely for device-emulation screenshot verification (no unit-test framework exists in this repo — see note below).

**Spec:** `docs/superpowers/specs/2026-07-11-mobile-responsive-design.md`

**Important deviation from the standard TDD step pattern:** this repo has zero unit-test infrastructure (no Jest/Vitest, `package.json` only has a `lint` script) — the entire prior rebuild was verified by `npm run build` + manual/Playwright visual checks, not unit tests. Every task below follows that existing convention: **"write the failing test" is replaced by "write the change," and "run test" is replaced by `npm run build` (catches type errors) plus a targeted Playwright screenshot** at the one device profile/page relevant to that task. Task 16 runs the full device × page matrix from the spec as the final comprehensive check.

**Two implementation-detail corrections made while reading the actual code (not covered verbatim in the spec, but same intent):**
1. Spec §5.1 says the hero *headline* gets a mouse-tilt→scroll-tilt swap. The actual mouse-reactive element is the WebGL particle field's rotation offset in `HeroField.tsx` (the headline already only has a GSAP scroll-scrub, no mouse tilt). Task 12 fixes the real target.
2. Spec §5.4/5.5 group "Work" as one unit. The Work section actually has two separate grids (`IMPACT_ITEMS`, 2-col; `CASE_STUDIES`, 3-col) using the same `cards.module.css` card style. Both convert to carousels (Task 4) — this is the natural reading of "Work ... card grids," made explicit here per the spec's own ambiguity-check rule.

---

## File Structure

New files:
- `scripts/mobile-check.mjs` — Playwright screenshot verification script, reused by every task
- `src/lib/useIsTouchDevice.ts` — hook: resolves `(hover: none) and (pointer: coarse)`
- `src/lib/usePrefersReducedMotion.ts` — hook: resolves `(prefers-reduced-motion: reduce)`
- `src/components/CardCarousel.tsx` — responsive grid/carousel wrapper for card lists
- `src/components/CardCarousel.module.css` — its styles

Modified files (grouped by task): `package.json`, `.gitignore`, `src/app/page.tsx`, `src/components/Hero.module.css`, `src/components/AvailabilityBadge.module.css`, `src/components/Nav.module.css`, `src/components/RoleBanner.module.css`, `src/components/Connector.module.css`, `src/components/SkillTable.module.css`, `src/components/FactPills.module.css`, `src/components/CertList.module.css`, `src/components/MagneticButton.tsx`, `src/components/TiltWrapper.tsx`, `src/components/CursorGlow.tsx`, `src/components/CursorGlow.module.css`, `src/components/HeroField.tsx`, `src/components/HeroCanvas.tsx`, `src/app/contact/contact.module.css`, `src/app/work/[slug]/case-study.module.css`, `src/app/globals.css`.

---

### Task 1: Playwright verification tooling

**Files:**
- Create: `scripts/mobile-check.mjs`
- Modify: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: Add Playwright as a real devDependency**

Run: `cd /c/NashTech/aks-builds.github.io && npm install -D playwright`
Expected: `package.json` gains `"playwright": "^<version>"` under `devDependencies` (it was previously installed ad hoc and never saved — this persists it properly).

- [ ] **Step 2: Install the Chromium browser binary (idempotent if already cached)**

Run: `npx playwright install chromium`
Expected: exits 0. If it prints "is already installed", that's fine too.

- [ ] **Step 3: Add the verification script**

Create `scripts/mobile-check.mjs`:

```js
import { chromium, devices } from "playwright";
import { mkdir } from "fs/promises";

const args = process.argv.slice(2);
const BASE_URL = args[0] || "http://localhost:3000";
const ONLY_PROFILE = args[1] || null;
const ONLY_PAGE = args[2] || null;
const OUT_DIR = "playwright-mobile-checks";

const ALL_PROFILES = [
  "iPhone 14",
  "iPhone 14 landscape",
  "Pixel 7",
  "Pixel 7 landscape",
  "iPad Mini",
  "iPad Mini landscape",
  "iPad Pro 11",
  "iPad Pro 11 landscape",
];

const ALL_PAGES = ["/", "/contact", "/work/ai-test-failure-analyzer", "/this-page-does-not-exist"];

const profiles = ONLY_PROFILE ? [ONLY_PROFILE] : ALL_PROFILES;
const pages = ONLY_PAGE ? [ONLY_PAGE] : ALL_PAGES;

await mkdir(OUT_DIR, { recursive: true });
const browser = await chromium.launch();

for (const name of profiles) {
  const descriptor = devices[name];
  if (!descriptor) {
    console.error(`Unknown device profile: ${name}`);
    continue;
  }
  const context = await browser.newContext(descriptor);
  const page = await context.newPage();
  for (const path of pages) {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle" });
    const fileSafeName = name.replace(/\s+/g, "-").toLowerCase();
    const fileSafePath = path === "/" ? "home" : path.replace(/\//g, "-").slice(1);
    await page.screenshot({
      path: `${OUT_DIR}/${fileSafeName}_${fileSafePath}.png`,
      fullPage: true,
    });
    console.log(`Captured ${name} ${path}`);
  }
  await context.close();
}

await browser.close();
console.log(`Done. Screenshots in ${OUT_DIR}/`);
```

Note: this Playwright version has no built-in "iPad Air" descriptor. `iPad Pro 11` (and its landscape variant) is the closest available tablet profile and stands in for it — confirmed by running `node -e "console.log(Object.keys(require('playwright').devices).filter(k => /iPad/i.test(k)))"`, which lists only `iPad (gen 5/6/7/11)`, `iPad Mini`, and `iPad Pro 11`.

- [ ] **Step 4: Add an npm script and gitignore entry**

Modify `package.json` — add to `"scripts"`:
```json
    "mobile:check": "node scripts/mobile-check.mjs"
```
(full `scripts` block becomes:)
```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "mobile:check": "node scripts/mobile-check.mjs"
  },
```

Modify `.gitignore` — append:
```
playwright-mobile-checks
```

- [ ] **Step 5: Smoke-test the script against the current (pre-change) site**

Run:
```bash
cd /c/NashTech/aks-builds.github.io
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null
rm -rf .next
npm run dev > /tmp/nextdev.log 2>&1 &
sleep 6
node scripts/mobile-check.mjs http://localhost:3000 "iPhone 14" /
```
Expected: `Captured iPhone 14 /` printed, and `playwright-mobile-checks/iphone-14_home.png` exists. This is the "before" baseline — expected to look broken (that's the whole reason for this plan).

- [ ] **Step 6: Stop the dev server and commit**

Run:
```bash
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null
git add package.json package-lock.json scripts/mobile-check.mjs .gitignore
git commit -m "$(cat <<'EOF'
chore: add Playwright device-emulation verification tooling

Persists playwright as a real devDependency (was previously installed
ad hoc and never saved) and adds a reusable screenshot script covering
iPhone 14, Pixel 7, iPad Mini, and iPad Pro 11 (closest available
substitute for iPad Air), portrait and landscape.
EOF
)"
```

---

### Task 2: Shared touch/motion-preference hooks

**Files:**
- Create: `src/lib/useIsTouchDevice.ts`
- Create: `src/lib/usePrefersReducedMotion.ts`

- [ ] **Step 1: Write `useIsTouchDevice`**

Create `src/lib/useIsTouchDevice.ts`:
```ts
"use client";

import { useEffect, useState } from "react";

export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  return isTouch;
}
```

- [ ] **Step 2: Write `usePrefersReducedMotion`**

Create `src/lib/usePrefersReducedMotion.ts`:
```ts
"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return reduced;
}
```

Both default `false` on first render (server/static-export has no `window`) and resolve after mount — this is the accepted hydration trade-off from spec §4.

- [ ] **Step 3: Verify the build still compiles (nothing consumes these yet, this just checks for syntax/type errors)**

Run: `cd /c/NashTech/aks-builds.github.io && npm run build 2>&1 | tail -40`
Expected: `Compiled successfully` (or equivalent Next 16 success output), no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/useIsTouchDevice.ts src/lib/usePrefersReducedMotion.ts
git commit -m "feat: add useIsTouchDevice and usePrefersReducedMotion hooks"
```

---

### Task 3: `CardCarousel` component

**Files:**
- Create: `src/components/CardCarousel.tsx`
- Create: `src/components/CardCarousel.module.css`

- [ ] **Step 1: Write the CSS**

Create `src/components/CardCarousel.module.css`:
```css
.track {
  display: grid;
  gap: 14px;
}

.cols2 {
  grid-template-columns: repeat(2, 1fr);
}

.cols3 {
  grid-template-columns: repeat(3, 1fr);
}

.cols4 {
  grid-template-columns: repeat(4, 1fr);
}

.dots {
  display: none;
}

@media (max-width: 768px) {
  .track {
    display: flex;
    grid-template-columns: none;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    margin: 0 -24px;
    padding: 4px 24px 10px;
    scrollbar-width: none;
  }

  .track::-webkit-scrollbar {
    display: none;
  }

  .track > * {
    flex: 0 0 85%;
    scroll-snap-align: center;
  }

  .dots {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 4px;
  }
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border);
  transition: background 0.25s, transform 0.25s;
}

.dotActive {
  background: var(--accent);
  transform: scale(1.3);
}
```

The `.track` rule inside `@media (max-width: 768px)` overrides the unconditional `.track { display: grid }` and the `.cols2/3/4 { grid-template-columns }` rules by CSS source order (same specificity, later wins when the media query matches) — no `!important` needed, and desktop (≥768px, well below the ≥1024px "must be unaffected" line) keeps the exact grid it has today.

- [ ] **Step 2: Write the component**

Create `src/components/CardCarousel.tsx`:
```tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./CardCarousel.module.css";

const COLUMN_CLASS: Record<2 | 3 | 4, string> = {
  2: styles.cols2,
  3: styles.cols3,
  4: styles.cols4,
};

export default function CardCarousel({
  children,
  columns,
}: {
  children: ReactNode[];
  columns: 2 | 3 | 4;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const index = cards.indexOf(entry.target as HTMLElement);
            if (index !== -1) setActive(index);
          }
        });
      },
      { root: track, threshold: [0.5] }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [children.length]);

  return (
    <div>
      <div ref={trackRef} className={`${styles.track} ${COLUMN_CLASS[columns]}`}>
        {children}
      </div>
      <div className={styles.dots}>
        {children.map((_, i) => (
          <span key={i} className={i === active ? `${styles.dot} ${styles.dotActive}` : styles.dot} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -40`
Expected: success. (Nothing imports `CardCarousel` yet, so this only checks the file itself compiles.)

- [ ] **Step 4: Commit**

```bash
git add src/components/CardCarousel.tsx src/components/CardCarousel.module.css
git commit -m "feat: add CardCarousel — grid on desktop, scroll-snap carousel on mobile"
```

---

### Task 4: Wire `CardCarousel` into the homepage

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Import it**

In `src/app/page.tsx`, change:
```tsx
import ChapterBreak from "@/components/ChapterBreak";
```
to:
```tsx
import ChapterBreak from "@/components/ChapterBreak";
import CardCarousel from "@/components/CardCarousel";
```

- [ ] **Step 2: Replace the `IMPACT_ITEMS` grid**

Change:
```tsx
          <div className="catLabel">#production-impact</div>
          <RoleBanner />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {IMPACT_ITEMS.map((item, i) => (
              <Reveal key={item.key} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.06}>
                <ImpactCard item={item} />
              </Reveal>
            ))}
          </div>
```
to:
```tsx
          <div className="catLabel">#production-impact</div>
          <RoleBanner />
          <CardCarousel columns={2}>
            {IMPACT_ITEMS.map((item, i) => (
              <Reveal key={item.key} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.06}>
                <ImpactCard item={item} />
              </Reveal>
            ))}
          </CardCarousel>
```

- [ ] **Step 3: Replace the `CASE_STUDIES` grid**

Change:
```tsx
          <div className="catLabel">#open-source · personal projects</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {CASE_STUDIES.map((project, i) => (
              <Reveal key={project.slug} direction="bottom" delay={i * 0.06}>
                <ProjectCard project={project} tilt={i === 0} />
              </Reveal>
            ))}
          </div>
```
to:
```tsx
          <div className="catLabel">#open-source · personal projects</div>
          <CardCarousel columns={3}>
            {CASE_STUDIES.map((project, i) => (
              <Reveal key={project.slug} direction="bottom" delay={i * 0.06}>
                <ProjectCard project={project} tilt={i === 0} />
              </Reveal>
            ))}
          </CardCarousel>
```

- [ ] **Step 4: Replace the npm packages grid**

Change:
```tsx
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 20 }}>
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} direction="bottom" delay={i * 0.04}>
                <NpmPackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>
```
to:
```tsx
          <div style={{ marginTop: 20 }}>
            <CardCarousel columns={4}>
              {packages.map((pkg, i) => (
                <Reveal key={pkg.name} direction="bottom" delay={i * 0.04}>
                  <NpmPackageCard pkg={pkg} />
                </Reveal>
              ))}
            </CardCarousel>
          </div>
```

- [ ] **Step 5: Replace the talks grid**

Change:
```tsx
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginTop: 20 }}>
            {TALKS.map((talk, i) => (
              <Reveal key={talk.youtubeId} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.05}>
                <TalkCard talk={talk} />
              </Reveal>
            ))}
          </div>
```
to:
```tsx
          <div style={{ marginTop: 20 }}>
            <CardCarousel columns={2}>
              {TALKS.map((talk, i) => (
                <Reveal key={talk.youtubeId} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.05}>
                  <TalkCard talk={talk} />
                </Reveal>
              ))}
            </CardCarousel>
          </div>
```

- [ ] **Step 6: Build, then verify desktop is unchanged and mobile now carousels**

Run:
```bash
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null
rm -rf .next
npm run build 2>&1 | tail -60
npm run dev > /tmp/nextdev.log 2>&1 &
sleep 6
node scripts/mobile-check.mjs http://localhost:3000 "iPhone 14" /
node scripts/mobile-check.mjs http://localhost:3000 "iPad Pro 11 landscape" /
```
Expected: build succeeds; open both PNGs in `playwright-mobile-checks/` — on `iphone-14_home.png` the Work/Packages/Talks cards should show as a single card with a sliver of the next card peeking on the right, not squeezed columns. On `ipad-pro-11-landscape_home.png` (1024px+ wide) the grid should look exactly as before (2/3/4 columns, no carousel).

- [ ] **Step 7: Stop dev server and commit**

```bash
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null
git add src/app/page.tsx
git commit -m "feat: replace hardcoded card grids with CardCarousel on mobile"
```

---

### Task 5: Hero mobile sizing

**Files:**
- Modify: `src/components/Hero.module.css`
- Modify: `src/components/AvailabilityBadge.module.css`

- [ ] **Step 1: Clamp the headline size and tighten mobile padding**

In `src/components/Hero.module.css`, change:
```css
.h1 {
  font-size: 40px;
  margin: 12px 0 0;
  line-height: 1.1;
  font-weight: 800;
}
```
to:
```css
.h1 {
  font-size: clamp(28px, 9vw, 40px);
  margin: 12px 0 0;
  line-height: 1.1;
  font-weight: 800;
}
```

Then change the existing mobile block:
```css
@media (max-width: 800px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
    padding: 48px 0;
  }
}
```
to:
```css
@media (max-width: 800px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
    padding: 48px 0;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 36px 0;
  }

  .right p {
    max-width: 100%;
  }
}
```

- [ ] **Step 2: Shrink the photo badge on phones**

In `src/components/AvailabilityBadge.module.css`, append:
```css
@media (max-width: 480px) {
  .badgeWrap {
    width: 130px;
    height: 130px;
  }
}
```
(`.photo` uses `inset: 0` relative to `.badgeWrap`, so it shrinks automatically — no other change needed.)

- [ ] **Step 3: Verify**

Run:
```bash
rm -rf .next
npm run build 2>&1 | tail -40
npm run dev > /tmp/nextdev.log 2>&1 &
sleep 6
node scripts/mobile-check.mjs http://localhost:3000 "iPhone 14" /
node scripts/mobile-check.mjs http://localhost:3000 "iPad Pro 11 landscape" /
```
Expected: build succeeds. On the iPhone 14 screenshot, the photo badge is visibly smaller relative to the viewport than before (130px vs 180px) and the headline no longer looks oversized. The iPad Pro 11 landscape (≥1024px-equivalent) screenshot is unchanged from Task 4's baseline.

- [ ] **Step 4: Stop dev server and commit**

```bash
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null
git add src/components/Hero.module.css src/components/AvailabilityBadge.module.css
git commit -m "feat: scale hero headline and photo badge for phone widths"
```

---

### Task 6: Nav mobile tap targets and overflow safety

**Files:**
- Modify: `src/components/Nav.module.css`

- [ ] **Step 1: Enlarge the hamburger's hit area without changing its visual size, and add tap-target height to mobile-panel links**

In `src/components/Nav.module.css`, change the existing block:
```css
@media (max-width: 720px) {
  .links {
    display: none;
  }
  .hamburger {
    display: flex;
  }
  .mobilePanel {
    display: flex;
  }
}
```
to:
```css
@media (max-width: 720px) {
  .links {
    display: none;
  }
  .hamburger {
    display: flex;
    width: 44px;
    height: 44px;
    align-items: center;
  }
  .hamburger span {
    width: 24px;
  }
  .mobilePanel {
    display: flex;
  }
  .mobilePanel a {
    display: flex;
    align-items: center;
    min-height: 44px;
  }
}
```

- [ ] **Step 2: Prevent the logo from pushing the resume/theme/hamburger controls off-screen on narrow phones**

Append:
```css
@media (max-width: 480px) {
  .logo {
    font-size: 13px;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .rightGroup {
    gap: 8px;
  }

  .resumeBtn {
    padding: 7px 10px;
    font-size: 10.5px;
  }
}
```

- [ ] **Step 3: Verify**

Run:
```bash
rm -rf .next
npm run build 2>&1 | tail -40
npm run dev > /tmp/nextdev.log 2>&1 &
sleep 6
node scripts/mobile-check.mjs http://localhost:3000 "Pixel 7" /
```
Expected: build succeeds. On the Pixel 7 screenshot's nav bar, confirm the logo, resume pill, bulb toggle, and hamburger all fit on one line without overlapping or clipping into each other. Manually tap-test the hamburger and mobile panel links in the dev server if convenient — hit area should feel comfortable, not just the thin icon.

- [ ] **Step 4: Stop dev server and commit**

```bash
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null
git add src/components/Nav.module.css
git commit -m "feat: enlarge nav tap targets and fix logo overflow on narrow phones"
```

---

### Task 7: Role banner vertical chain on mobile

**Files:**
- Modify: `src/components/RoleBanner.module.css`
- Modify: `src/components/Connector.module.css`

- [ ] **Step 1: Stack the badge chain vertically below 768px**

In `src/components/RoleBanner.module.css`, append:
```css
@media (max-width: 768px) {
  .chain {
    flex-direction: column;
    align-items: flex-start;
  }

  .orgBadge {
    width: 100%;
    justify-content: flex-start;
  }
}
```

- [ ] **Step 2: Rotate the connector (line + arrow + "placed at" label) to vertical**

In `src/components/Connector.module.css`, append:
```css
@media (max-width: 768px) {
  .wrap {
    flex-direction: column;
    height: auto;
    min-width: 0;
    width: 100%;
    padding: 6px 0;
  }

  .line {
    position: static;
    width: 1.5px;
    height: 16px;
  }

  .arrowhead {
    position: static;
    transform: rotate(90deg);
  }

  .label {
    margin: 4px 0 0;
  }
}
```

Known minor limitation, not worth extra engineering: `Connector`'s mount animation scales `scaleX` (0→1) on the line via Framer Motion. On the vertical mobile layout the line's *height* (not width) is now the visible dimension, so the grow-in animation is imperceptible at this thinness (1.5px) — the connector still appears correctly, just without an obviously animated reveal on that axis. Not a visual defect, just a lost flourish on one specific element in this one state.

- [ ] **Step 3: Verify**

Run:
```bash
rm -rf .next
npm run build 2>&1 | tail -40
npm run dev > /tmp/nextdev.log 2>&1 &
sleep 6
node scripts/mobile-check.mjs http://localhost:3000 "iPhone 14" /
```
Expected: build succeeds. On the screenshot, the "#work" section's role banner shows the NashTech badge, then a short vertical connector with the "placed at" label, then the Duck Creek badge — stacked, not wrapped mid-line.

- [ ] **Step 4: Stop dev server and commit**

```bash
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null
git add src/components/RoleBanner.module.css src/components/Connector.module.css
git commit -m "feat: stack role-banner chain vertically on mobile"
```

---

### Task 8: Skills / Certifications / Education / Fact Pills mobile tightening

**Files:**
- Modify: `src/components/SkillTable.module.css`
- Modify: `src/components/CertList.module.css`
- Modify: `src/components/FactPills.module.css`

- [ ] **Step 1: Standardize the skills-table breakpoint and add a phone-width single column**

In `src/components/SkillTable.module.css`, change:
```css
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```
to:
```css
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

(This affects `SkillTable` only — its skill strings are long comma-separated lists, e.g. `"GitHub Actions, Azure DevOps, Jenkins, ArgoCD, Kargo, Kustomize"`, which wrap awkwardly in 2 narrow columns at 360–390px.)

- [ ] **Step 2: Let Certifications/Education items stack vertically on very narrow phones instead of fighting for one row**

`EducationList` reuses `CertList.module.css`, so this one change covers both. In `src/components/CertList.module.css`, change:
```css
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
  gap: 12px;
  flex-wrap: wrap;
}
```
to:
```css
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
  gap: 12px;
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .ci {
    white-space: normal;
  }
}
```

- [ ] **Step 3: Tighten fact-pill padding on phones**

In `src/components/FactPills.module.css`, append:
```css
@media (max-width: 480px) {
  .pill {
    padding: 6px 11px;
    font-size: 10.5px;
  }
}
```

- [ ] **Step 4: Verify**

Run:
```bash
rm -rf .next
npm run build 2>&1 | tail -40
npm run dev > /tmp/nextdev.log 2>&1 &
sleep 6
node scripts/mobile-check.mjs http://localhost:3000 "iPhone 14" /
```
Expected: build succeeds. On the screenshot, confirm the skills grid is 1 column, certifications/education rows show name above issuer/date rather than squeezed onto one line, and the "#notes" fact pills wrap cleanly without touching the container edges.

- [ ] **Step 5: Stop dev server and commit**

```bash
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null
git add src/components/SkillTable.module.css src/components/CertList.module.css src/components/FactPills.module.css
git commit -m "feat: tighten skills/certifications/education/fact-pill layout on phones"
```

---

### Task 9: Touch-native `MagneticButton`

**Files:**
- Modify: `src/components/MagneticButton.tsx`

- [ ] **Step 1: Skip the pointer-offset math on touch, add a tap press animation for everyone**

Replace the full contents of `src/components/MagneticButton.tsx`:
```tsx
"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

export default function MagneticButton({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const isTouch = useIsTouchDevice();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.92 }}
      style={{ x: springX, y: springY, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
```

`onMouseMove`/`onMouseLeave` never fire from a tap on touch devices, so the `isTouch` guard is defensive (covers hybrid devices that do report both), but the real behavior change for touch users is the new `whileTap` press/scale feedback, which fires on both touch and mouse.

- [ ] **Step 2: Verify**

Run:
```bash
rm -rf .next
npm run build 2>&1 | tail -40
```
Expected: build succeeds (no visual regression possible to screenshot for a tap-only interaction — confirm by tapping the "About Me" arrow button and nav "Resume" pill in a real mobile browser or Chrome DevTools touch emulation later in Task 16).

- [ ] **Step 3: Commit**

```bash
git add src/components/MagneticButton.tsx
git commit -m "feat: add touch-native tap animation to MagneticButton"
```

---

### Task 10: Touch-native `TiltWrapper`

**Files:**
- Modify: `src/components/TiltWrapper.tsx`

- [ ] **Step 1: Skip the 3D tilt entirely on touch**

Replace the full contents of `src/components/TiltWrapper.tsx`:
```tsx
"use client";

import { useRef, type ReactNode } from "react";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

export default function TiltWrapper({ children }: { children: ReactNode }) {
  const isTouch = useIsTouchDevice();
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(600px) rotateY(0) rotateX(0)";
  };

  if (isTouch) {
    return <div style={{ height: "100%" }}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transformStyle: "preserve-3d", willChange: "transform", height: "100%" }}
    >
      {children}
    </div>
  );
}
```

This matches spec §5.6: on touch, the tilt is removed rather than faked, since the card is now inside the Task 4 swipe carousel and the swipe gesture itself is the interactive affordance. It also avoids forcing a `willChange: transform` GPU layer on touch devices for an effect that would never trigger there.

- [ ] **Step 2: Verify**

Run: `rm -rf .next && npm run build 2>&1 | tail -40`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/TiltWrapper.tsx
git commit -m "feat: skip 3D tilt wrapper entirely on touch devices"
```

---

### Task 11: Touch-native ambient `CursorGlow`

**Files:**
- Modify: `src/components/CursorGlow.tsx`
- Modify: `src/components/CursorGlow.module.css`

- [ ] **Step 1: Give touch devices an ambient pulse instead of a static center glow**

Replace the full contents of `src/components/CursorGlow.tsx`:
```tsx
"use client";

import { useEffect, useRef } from "react";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import styles from "./CursorGlow.module.css";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || isTouch) return;

    function onMove(e: MouseEvent) {
      ref.current?.style.setProperty("--gx", `${e.clientX}px`);
      ref.current?.style.setProperty("--gy", `${e.clientY}px`);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion, isTouch]);

  if (reducedMotion) return null;

  return <div ref={ref} className={`${styles.glow} ${isTouch ? styles.ambient : ""}`} />;
}
```

Note: this changes behavior slightly beyond what the original code did (the original always rendered the glow div even under reduced-motion, just without a listener) — returning `null` under `reducedMotion` is more correct (an inert full-viewport `position:fixed` div with a static radial-gradient still paints something for `prefers-reduced-motion` users, which the original code left in place; removing it entirely is strictly better and in scope since we're touching this file anyway).

- [ ] **Step 2: Add the ambient pulse animation, anchored near the hero instead of viewport-center**

In `src/components/CursorGlow.module.css`, append:
```css
.ambient {
  --gx: 50%;
  --gy: 22%;
  animation: ambientPulse 6s ease-in-out infinite;
}

@keyframes ambientPulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.55;
  }
}
```

- [ ] **Step 3: Verify**

Run:
```bash
rm -rf .next
npm run build 2>&1 | tail -40
npm run dev > /tmp/nextdev.log 2>&1 &
sleep 6
node scripts/mobile-check.mjs http://localhost:3000 "iPhone 14" /
```
Expected: build succeeds. A static screenshot can't show the pulse animation, but confirm the glow is visibly anchored near the top of the page (not dead-center of the viewport) and doesn't look like a flat, static blob — open the dev server in an actual mobile browser (or DevTools touch emulation) to see the pulse in motion.

- [ ] **Step 4: Stop dev server and commit**

```bash
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null
git add src/components/CursorGlow.tsx src/components/CursorGlow.module.css
git commit -m "feat: replace static touch-device glow with an ambient pulse"
```

---

### Task 12: Hero WebGL particle field — mobile perf and scroll-driven tilt

**Files:**
- Modify: `src/components/HeroField.tsx`
- Modify: `src/components/HeroCanvas.tsx`

- [ ] **Step 1: Pass touch status down from `HeroCanvas`**

Replace the full contents of `src/components/HeroCanvas.tsx`:
```tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

const HeroField = dynamic(() => import("./HeroField"), { ssr: false });

export default function HeroCanvas() {
  const [enabled, setEnabled] = useState(false);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduced);
    if (reduced) return;

    function onScroll() {
      const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      scrollRef.current = progress;
    }
    function onMouseMove(e: MouseEvent) {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <HeroField scrollRef={scrollRef} mouseRef={mouseRef} isTouch={isTouch} />
    </div>
  );
}
```

- [ ] **Step 2: Reduce particle count, cap the frame rate, and swap mouse-tilt for scroll-tilt on touch**

Replace the full contents of `src/components/HeroField.tsx`:
```tsx
"use client";

import { useRef, useMemo, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type MousePos = { x: number; y: number };

function Particles({
  scrollRef,
  mouseRef,
  isTouch,
}: {
  scrollRef: MutableRefObject<number>;
  mouseRef: MutableRefObject<MousePos>;
  isTouch: boolean;
}) {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const count = isTouch ? 100 : 260;
  const lastFrameRef = useRef(0);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (isTouch) {
      const elapsed = state.clock.elapsedTime;
      if (elapsed - lastFrameRef.current < 1 / 30) return;
      lastFrameRef.current = elapsed;
    }

    const progress = scrollRef.current;
    const mouse = mouseRef.current;
    if (ref.current) {
      const tiltX = isTouch ? progress * 0.15 : mouse.y * -0.1;
      ref.current.rotation.y = state.clock.elapsedTime * 0.02 + mouse.x * 0.15;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1 + tiltX;
      const targetScale = 1 + progress * 2.2;
      ref.current.scale.x += (targetScale - ref.current.scale.x) * 0.08;
      ref.current.scale.y += (targetScale - ref.current.scale.y) * 0.08;
      ref.current.scale.z += (targetScale - ref.current.scale.z) * 0.08;
    }
    if (materialRef.current) {
      const targetOpacity = 0.5 * Math.max(0, 1 - progress * 1.4);
      materialRef.current.opacity += (targetOpacity - materialRef.current.opacity) * 0.08;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={materialRef} size={0.035} color="#4338ca" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function HeroField({
  scrollRef,
  mouseRef,
  isTouch,
}: {
  scrollRef: MutableRefObject<number>;
  mouseRef: MutableRefObject<MousePos>;
  isTouch: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <Particles scrollRef={scrollRef} mouseRef={mouseRef} isTouch={isTouch} />
    </Canvas>
  );
}
```

On desktop (`isTouch === false`) `tiltX` evaluates to `mouse.y * -0.1`, identical to the original `rotation.x = Math.sin(...) * 0.1 - mouse.y * 0.1` — this is a behavior-preserving refactor for non-touch, not a change.

- [ ] **Step 3: Verify**

Run:
```bash
rm -rf .next
npm run build 2>&1 | tail -40
npm run dev > /tmp/nextdev.log 2>&1 &
sleep 6
node scripts/mobile-check.mjs http://localhost:3000 "iPhone 14" /
node scripts/mobile-check.mjs http://localhost:3000 "iPad Pro 11 landscape" /
```
Expected: build succeeds; both screenshots still show the particle field rendering (not blank/crashed) behind the hero headline. Frame-rate cap and particle count can't be verified from a still screenshot — spot-check via the dev server + Chrome DevTools Performance panel with a mobile viewport if you want to confirm the ~30fps cap, but this is not required to consider the task done.

- [ ] **Step 4: Stop dev server and commit**

```bash
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null
git add src/components/HeroField.tsx src/components/HeroCanvas.tsx
git commit -m "feat: reduce particle count, cap frame rate, and swap mouse-tilt for scroll-tilt on touch"
```

---

### Task 13: Contact page mobile pass

**Files:**
- Modify: `src/app/contact/contact.module.css`

- [ ] **Step 1: Standardize the grid breakpoint to the 768px scale**

In `src/app/contact/contact.module.css`, change:
```css
@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```
to:
```css
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

The click-to-copy interaction in `CopyableCard.tsx` already works fine on touch (tap = click) and swaps its own inline text to "Copied to clipboard ✓" rather than using a floating toast — there is no fixed-position toast element to reposition, so no further change is needed there; this was an assumption in the original spec wording that didn't match the actual implementation once the code was read.

- [ ] **Step 2: Verify**

Run:
```bash
rm -rf .next
npm run build 2>&1 | tail -40
npm run dev > /tmp/nextdev.log 2>&1 &
sleep 6
node scripts/mobile-check.mjs http://localhost:3000 "iPad Mini" /contact
```
Expected: build succeeds. `iPad Mini` is 768px wide in portrait — confirm the contact cards now stack to a single column at exactly this width (previously they'd have shown 2 columns until 600px).

- [ ] **Step 3: Stop dev server and commit**

```bash
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null
git add src/app/contact/contact.module.css
git commit -m "feat: standardize contact page grid breakpoint to 768px"
```

---

### Task 14: Case-study page mobile pass

**Files:**
- Modify: `src/app/work/[slug]/case-study.module.css`

- [ ] **Step 1: Clamp the title and stack the stat callout on phones**

In `src/app/work/[slug]/case-study.module.css`, change:
```css
.title {
  font-size: 40px;
  font-weight: 800;
  color: var(--text);
  margin: 0 0 10px;
}
```
to:
```css
.title {
  font-size: clamp(28px, 9vw, 40px);
  font-weight: 800;
  color: var(--text);
  margin: 0 0 10px;
}
```

Then append:
```css
@media (max-width: 480px) {
  .statCallout {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
```

The existing `@media (max-width: 800px)` rule that stacks `.grid` (main content + sidebar) to a single column is left as-is — it already behaves correctly for tablets and phones, no change needed.

- [ ] **Step 2: Verify**

Run:
```bash
rm -rf .next
npm run build 2>&1 | tail -40
npm run dev > /tmp/nextdev.log 2>&1 &
sleep 6
node scripts/mobile-check.mjs http://localhost:3000 "iPhone 14" /work/ai-test-failure-analyzer
```
Expected: build succeeds. On the screenshot, confirm the case-study title fits on 1-2 lines without overflowing horizontally, and the "Impact" stat number/label stack vertically instead of sitting side-by-side.

- [ ] **Step 3: Stop dev server and commit**

```bash
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null
git add "src/app/work/[slug]/case-study.module.css"
git commit -m "feat: clamp case-study title and stack stat callout on phones"
```

---

### Task 15: Global section-title clamp

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Shrink section titles on phones**

In `src/app/globals.css`, change:
```css
.secTitle {
  font-size: 28px;
  font-weight: 800;
  margin: 6px 0 8px;
  color: var(--text);
}
```
to:
```css
.secTitle {
  font-size: 28px;
  font-weight: 800;
  margin: 6px 0 8px;
  color: var(--text);
}

@media (max-width: 480px) {
  .secTitle {
    font-size: 24px;
  }
}
```

`.container`'s existing `padding: 0 24px` is left unchanged — at a 360px viewport that still leaves 312px of content width, which is not cramped enough to justify touching it (scope kept to what's actually broken, per the design's non-goals).

- [ ] **Step 2: Verify**

Run: `rm -rf .next && npm run build 2>&1 | tail -40`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: shrink shared section titles on phone widths"
```

---

### Task 16: Full-matrix verification pass and fix-up

**Files:**
- Potentially any file touched in Tasks 4–15, depending on findings. No new files expected.

- [ ] **Step 1: Run the complete device × page matrix from the spec**

```bash
cd /c/NashTech/aks-builds.github.io
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null
rm -rf .next
npm run build 2>&1 | tail -60
npm run dev > /tmp/nextdev.log 2>&1 &
sleep 6
node scripts/mobile-check.mjs http://localhost:3000
```
Expected: build succeeds; 32 screenshots appear in `playwright-mobile-checks/` (8 device profiles × 4 pages, including the `/this-page-does-not-exist` 404 page per spec §5.9).

- [ ] **Step 2: Review every screenshot for the specific failure modes the spec calls out**

Open each PNG and check for: horizontal overflow (content wider than the viewport, visible as a cut-off edge or forced horizontal scroll), overlapping elements, illegible/clipped text, and — on the landscape profiles specifically — anything that assumed portrait-only stacking (e.g. the Hero's `grid-template-columns: 1fr` at 800px could look oddly narrow-and-tall on a 926px-wide landscape phone; confirm it still reads fine since 926px is actually above the 800px breakpoint so it renders in the two-column desktop-style layout — verify this is the case, not a bug). For the 404 page specifically, per spec §5.9 this only needs to confirm it doesn't visually break — no dedicated fix task exists for it, so any issue found here gets fixed inline in Step 3 like everything else.

- [ ] **Step 3: Fix anything found**

If an issue surfaces, fix it in the relevant file from Tasks 4–15 (same file/class it was introduced in — do not create new abstractions for one-off fixes here), re-run Step 1 for just that device/page via `node scripts/mobile-check.mjs http://localhost:3000 "<profile>" "<page>"`, and commit the fix on its own:
```bash
git add <fixed-file>
git commit -m "fix: <describe the specific mobile issue and where>"
```
Repeat until a full re-run of Step 1 shows no remaining issues.

- [ ] **Step 4: Stop the dev server**

```bash
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null
```

---

### Task 17: Deploy and verify live

**Files:** none (deployment step only).

- [ ] **Step 1: Push everything**

```bash
cd /c/NashTech/aks-builds.github.io
git status --short
git push origin main
```
Expected: fast-forwards `origin/main` with all commits from Tasks 1–16.

- [ ] **Step 2: Watch the GitHub Actions deploy**

```bash
sleep 5
gh run list --repo aks-builds/aks-builds.github.io --limit 1
```
Take the run ID from the output, then:
```bash
gh run watch <run-id> --repo aks-builds/aks-builds.github.io --interval 10 2>&1 | tail -40
```
Expected: both build and deploy jobs complete green.

- [ ] **Step 3: Verify the live site**

```bash
sleep 15
curl -s -o /dev/null -w "home: %{http_code}\n" https://aks-builds.github.io/
curl -s -o /dev/null -w "contact: %{http_code}\n" https://aks-builds.github.io/contact
curl -s -o /dev/null -w "case-study: %{http_code}\n" https://aks-builds.github.io/work/ai-test-failure-analyzer
```
Expected: all `200`.

- [ ] **Step 4: Ask the user to check on their own phone**

This is the step the spec's verification plan (§7.3) calls for and Playwright emulation cannot replace — report the deployed URL and ask the user to open `https://aks-builds.github.io/` on their actual Android/iOS device and confirm it looks and feels right before considering this plan fully done.
