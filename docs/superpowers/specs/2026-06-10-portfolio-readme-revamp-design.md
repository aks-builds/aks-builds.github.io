# Portfolio & README Revamp — Design Spec
**Date:** 2026-06-10  
**Status:** Approved

---

## 1. Aesthetic System

| Token | Value |
|---|---|
| Background | `#0a0a0a` |
| Surface | `#0d0d0d` / `#111111` |
| Border | `#161616` / `#1c1c1c` |
| Primary accent | `#22c55e` (acid green) |
| Accent hover | `#4ade80` |
| Text primary | `#fafafa` |
| Text secondary | `#a3a3a3` |
| Text muted | `#52525b` |
| Heading font | IBM Plex Mono |
| Body font | IBM Plex Sans |

**Animation level:** B — Expressive  
Floating particles · scan line · gradient name · glowing green stats · staggered card entrances · scroll fade-ups · count-up

---

## 2. Portfolio Site (aks-builds.github.io)

### Section order
1. **Nav** — sticky, blur on scroll, `>_ aks-builds` logo with pulsing green dot
2. **Hero** — gradient name, typewriter, skill tags, CTAs, animated stats (count-up), particles + scan + grid bg
3. **About** — bio, skills grid (14 chips), 4 highlight cards (`>_` / `◈` / `✓` / `⊕` icons)
4. **npm Packages** *(new)* — 3 install-command cards with version badge, npm link, language tag
5. **Projects** — filterable grid, 15 repos, 7 category filters, staggered card entrance
6. **Talks & Speaking** *(new)* — 3 YouTube cards with real thumbnails + upcoming session badge
7. **Contact** — GitHub, Email, npm cards + hireable badge
8. **Footer**

### Key components
- `Nav.tsx` — updated to Carbon design
- `Hero.tsx` — B Expressive animations, gradient text, particles
- `About.tsx` — Lucide icons for highlight cards, skills grid
- `NpmPackages.tsx` — new component
- `Projects.tsx` + `ProjectCard.tsx` — Expressive hover, staggered entrance
- `Talks.tsx` — new component, real YouTube thumbnails
- `Contact.tsx` — updated
- `data/repos.ts` — unchanged
- `data/talks.ts` — new: 3 talks + 1 upcoming
- `data/npm.ts` — new: 3 packages

---

## 3. GitHub Profile README (aks-builds/aks-builds)

### Header
- Custom animated SVG (`terminal-header.svg`) — macOS window chrome, typing reveal animation, Carbon colors, monospace font

### Sections (kept, rethemed)
| Section | Change |
|---|---|
| Header | New terminal SVG replaces readme-typing-svg |
| Badges | `labelColor=0a0a0a` + `color=22c55e` or language color |
| What I'm shipping | Same auto-update script, new badge colors via update_profile.py |
| Published on npm | Rethemed with Carbon badge colors |
| Tech stack | Language badges with matching colors, flat-square style |
| On the Mic | Keep thumbnails, add green overlay treatment |
| GitHub stats | `bg_color=0a0a0a&title_color=22c55e&icon_color=22c55e&text_color=a3a3a3&border_color=161616` |
| Activity graph | `bg_color=0a0a0a&color=22c55e&line=22c55e&point=4ade80&area=true` |
| Snake | Updated to green-on-dark palette — `color_snake=#22c55e` |
| Recent activity | Unchanged |

### Terminal header SVG spec
- Dimensions: 800×160px
- macOS window dots (red/yellow/green)
- Title bar: `aditya@github — zsh`
- Animated clip-path reveal: `whoami` → `Aditya S.` → role line → available badge
- Font: system monospace stack (GitHub sanitises external fonts)

---

## 4. Workflows

| File | Change |
|---|---|
| `snake.yml` | Add `color_snake=#22c55e&color_dots[0]=#0d0d0d&color_dots[1]=#14532d&color_dots[2]=#166534&color_dots[3]=#15803d&color_dots[4]=#22c55e` |
| `profile-sections.yml` | No logic change — README structure preserved so markers still work |
| `update-npm-packages.yml` | Retheme badge colors to Carbon palette |

---

## 5. Out of scope
- Blog / articles section
- LinkedIn / Twitter deep integration
- Dark/light mode toggle
- i18n
