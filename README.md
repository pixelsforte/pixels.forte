# Premium Creative Agency — Scaffold

This is the base setup from the first 3 prompts (layout, page, global.css)
plus the animation system and stub files for every component you'll send
next.

## What's wired up

- `app/layout.tsx` — Inter font, metadata, `Providers` (Lenis smooth
  scroll) + `PageTransition` (AnimatePresence fade 0→1, 0.8s).
- `app/page.tsx` — imports and orders every section. Server Component.
- `app/global.css` — Tailwind layers, scrollbar, selection color,
  `.container-custom`, `.section-padding`, `.heading-xl`, `.heading-lg`,
  `.button-primary`, `.button-secondary`.
- `animations/index.ts` — `fadeUp`, `staggerContainer`, `scaleIn`,
  `slideLeft`, `slideRight`, `staggerText`/`staggerTextWord`, `hoverLift`,
  `buttonHover`, `imageHoverZoom`, `sidebarSlide`, `overlayFade`,
  `pageFade`, plus `smoothEase` (0.22,1,0.36,1) and `viewportOnce`
  (`{ once: true, amount: 0.3 }`) to import into every component.
- `components/providers/` — `Providers`, `SmoothScrollProvider` (Lenis),
  `PageTransition`.
- `components/*.tsx` — one stub per section (`Header`, `Sidebar`, `Hero`,
  `About`, `Stats`, `FeaturedWork`, `Projects`, `Services`,
  `DarkSection`, `Process`, `Testimonials`, `Footer`). Each just renders
  a placeholder `<section>` right now — send me each component's prompt
  and I'll replace the stub with the real, fully-animated version.

## Install

```bash
npm install
npm run dev
```

## Notes

- `Sidebar` is stubbed separately since it will be rendered *inside*
  `Header` (the hamburger menu), not directly in `page.tsx`.
- Every animation variant lives in one place (`animations/index.ts`) so
  components import it rather than redefining transitions — keeps motion
  consistent across the site per your animation system spec.
- Only components that need scroll/hover/gesture/state logic will get
  `"use client"` — everything else stays a Server Component.
