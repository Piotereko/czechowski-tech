---
trigger: model_decision
description: "Anti-slop UI quality bar for distinctive, product-specific visual design. Use whenever creating or changing landing pages, layouts, typography, color, illustration, motion, CSS, or React components that render UI. Also use when reviewing screenshots or iterating on a redesign."
---

# UI quality bar

You are the design lead, not a template assembler. Every visual choice must come from this product's subject matter, audience, and setting. If a first-time visitor cannot tell what the product is from a 390px screenshot of the hero alone, the design has failed.

Before writing markup, state in one short paragraph: the product, the audience, the room or setting the design should feel like, and the one object that will occupy the hero. Then build that.

## Design tokens first

Create a single token source (CSS custom properties on `:root`, plus a typed export if the project already has one) before inventing one-off colors or type sizes. Tokens must cover:

- **Color**: background, surface, text, muted text, border, accent, accent-contrast, danger, focus ring. Name them after roles, not hues (`--color-accent`, not `--yellow-400`).
- **Type**: display and body families (loaded with `next/font`, subsets including Polish diacritics `ąćęłńóśźż`), a type scale (at least display, h1–h3, body, small), line-heights, and a max measure of ~65–75 characters for body copy.
- **Space, radius, shadow, and z-index**: a small consistent scale, not ad-hoc values.
- **Motion**: duration (`--motion-fast` ~150ms, `--motion-base` ~280ms, `--motion-slow` ~500ms, one long narrative duration if needed), easing (`--ease-standard`, `--ease-emphasized`). Prefer a slightly overdamped cubic-bezier or a soft spring, not linear and not the default `ease`.

Reuse tokens. A new hex or font size in a component is a smell unless it is added to the token file.

## Anti-slop checklist (must all pass before a pull request)

Treat a fail as a blocker. Fix it and re-screenshot; do not explain it away.

1. **Hero is the product.** The first viewport shows the actual artefact (game board, open book, object in use), not a headline plus three feature cards.
2. **No generic SaaS chrome.** Forbidden unless the brief explicitly asks for them: pill-shaped primary buttons, uppercase eyebrow labels ("PILOTAŻ", "NEW", "BETA") in tiny tracking, sparkle or "✨" badges, "RT"-style lettermark squares, numbered 01/02/03 step cards, three equal icon+title+text cards in a row, gradient orbs, meteor/starfield/sparkle canvases, shine-border cards, aurora/mesh backgrounds used as decoration, glassmorphism panels, fake avatars, fake testimonials, and accenting a single word in a headline with a different color or italic.
3. **No emoji as iconography.** If an icon is needed, use a custom SVG in the product's line weight, or a typographic mark.
4. **Typography is a decision.** One display face and one body face, or a single family with clear weight contrast. Not Inter/Roboto/Arial for a characterful consumer brand, and not a default "AI landing" pairing used on every other generated site. Headlines are short, in the product's language, and set large enough to carry the page. Body text is at least 17px (18px when a grandparent may read it) with generous line-height. No 12px grey paragraphs.
5. **Color has a point of view.** A palette that could be swapped onto a project-management tool has failed. Contrast meets WCAG AA for all text and essential UI (AAA for body on long reading surfaces when practical). No low-contrast beige-on-beige or grey-on-navy body copy.
6. **Layout has rhythm.** Clear hierarchy, uneven but intentional composition, and no large empty void under a short content block. Sections are not all the same card-grid. The footer sits against the content, not after a blank half-screen.
7. **Motion is directed, not sprinkled.** One orchestrated entrance or hero loop, plus motion that answers a user action. Do not fade-and-slide-up every section, and do not hover-lift every card. Animate `transform` and `opacity` only for continuous or scroll-linked motion. Honor `prefers-reduced-motion: reduce` with a static or instantly-completed equivalent (no infinite loops, no page-turn, no tile-flip cycle).
8. **Illustrations are original and consistent.** No stock photos of random "grandparents", no unsourced Unsplash faces, no generic 3D clay people. Prefer custom SVG or generated raster/vector assets saved under `/public` with descriptive alt text in the page's language. Decorative images get `alt=""`. Style must be consistent across the site (one medium, one palette, one line weight).
9. **Mobile is designed, not squeezed.** At 390px the hero still shows the product, tap targets are at least 48px, and horizontal scenes stack without horizontal overflow (except a clearly swipeable row that does not trap scroll).
10. **Performance and accessibility budgets.** Lighthouse mobile Performance ≥ 90 and Accessibility ≥ 95 on the landing page. No font-induced layout shift (`next/font`, with fallback metrics). Images use intrinsic width/height or `next/image`. Keyboard focus is visible. Interactive elements have names. Respect reduced motion as above.

## Motion implementation

- Default library: Motion for React, imported from `motion/react` (package `motion`, MIT). Do not add a second animation library unless a specific effect is impossible in Motion.
- Scroll-driven effects use `useScroll` / `useTransform` or CSS Scroll-Driven Animations, kept subtle (parallax of a few percent, page curl, ink line, tile reveal) — never scroll-jacking, never a required animation to understand the content.
- Durations and easing come from tokens. Loops in a hero pause when the hero is off-screen (`IntersectionObserver` or Motion's `whileInView` with `once: false` and a pause).
- Wrap motion-sensitive trees so reduced-motion users get the final state immediately.

## Illustration and asset rules

- Generate original assets with the built-in image-generation tool when a raster illustration is needed, or draw a tight SVG by hand when the subject is geometric (boards, typography, simple objects).
- Save production assets under `/public/illustrations/` (or `/public/images/`) with kebab-case filenames. Do not leave generated drafts on the desktop or in `/tmp`.
- Every meaningful image has descriptive alt text. Do not bake long headline text into a raster if it must remain selectable and translatable — set real type in HTML.
- Do not impersonate living people. Stylized figures, hands, objects, interiors, and typography are fine; photoreal "stock family" faces are not.

## Mandatory self-review loop (before opening a pull request)

1. Run the app locally.
2. In the built-in browser, capture full-page (or stacked viewport) screenshots at 390px and 1440px for every new or redesigned route, including the landing hero and at least one inner flow page.
3. Walk the ten checklist items above against those screenshots. Write a short pass/fail list in the pull-request description.
4. If any item fails, change the design and re-screenshot. Do not open the pull request on a failing checklist.
5. Run Lighthouse mobile on the landing page and record the Performance and Accessibility scores in the pull-request description. If either budget is missed, fix and re-run.
6. Attach the final 390px and 1440px screenshots to the pull-request description (or commit them under a `design-review/` folder that the description links to).
7. Add or extend an automated smoke test that the hero product artefact is present in the DOM (for example the game board has its tiles, or the sample chapter title is visible).

## Copy and commit hygiene

- User-facing copy stays in the product's language and voice. Do not invent legal claims, prices, or testimonials.
- Do not mention assistants, tools, or model names in branch names, commit messages, pull-request titles, or pull-request bodies. No `Co-authored-by` trailers.
