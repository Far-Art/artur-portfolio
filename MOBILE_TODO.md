# Mobile Adaptation TODO

Status of `artur-portfolio` mobile readiness. The site is already substantially
mobile-adapted — every page has breakpoints (960/768/640/420px), the header
stays a single-row top bar with safe-area insets, touch targets are mostly
≥44px, and typography uses `clamp()`. This is a polish-and-fix pass, not a
ground-up rebuild.

---

## 🔴 High priority — actual bugs

- [x] **Add `viewport-fit=cover` to the viewport meta** — `src/index.html`
  - The code uses `env(safe-area-inset-*)` in the header, footer, and `app.scss`,
    but those insets are **inert without `viewport-fit=cover`**. On notched
    iPhones the bottom nav bar currently sits under the home indicator.
  - Change to: `content="width=device-width, initial-scale=1, viewport-fit=cover"`

- [x] **Replace `min-height: 100vh` with `100svh`** in 4 pages
  - `src/app/pages/about/about.component.scss:2`
  - `src/app/pages/experience/experience.component.scss:2`
  - `src/app/pages/project-detail/project-detail.component.scss:3`
  - `src/app/pages/projects/projects.component.scss:2`
  - `100vh` ignores mobile browser chrome and causes overflow/jump. `home`,
    `app`, and `contact` already use `100svh`, so this is just inconsistency.

## 🔴 Header navbar — FIXED

- [x] **Mobile header was broken: nav floated as a cramped top-right pill and the
  logo overlapped page content.**
  - Root cause: `.header` carries an inline `transform`, which makes it the
    containing block for `position: fixed` descendants — so the intended
    "bottom tab bar" (`.nav-links { position: fixed; bottom }`) anchored to the
    short header at the top instead of the viewport, and silently broke.
  - Fix (`header.component.scss` ≤640 + ≤420 blocks): replaced the broken
    fixed bottom-bar with a **full-width top bar** — logo sits on the bar
    (top-left), language + theme top-right, nav links span the second row.
  - Adjusted `app.scss`: `.fa-main` padding-top → `8.25rem` at ≤640 to clear the
    taller bar; removed the now-unneeded bottom padding that reserved space for
    the old bottom bar. Same for `footer.component.scss`.
  - Verified in preview at 375px, 320px, tablet, and the home landing hero.

- [x] **Navbar reworked to a strict single row at all widths.**
  - Layout (`header.component.scss`): `.nav-container` is now a `1fr auto 1fr`
    grid so the nav links stay centered on the bar regardless of the side
    controls; the language + theme controls are grouped in `.nav-utilities` and
    collapse to flag/icon-only at ≤960px to leave room for centering. Nav links
    stack the label under the icon at ≤640px to keep the bar one row.
  - Removed the **Home** nav link — the brand logo (`routerLink="/"`) is the home
    affordance. The hover/active indicator softens to a rounded rect at ≤640px.
  - `app.scss`: `.fa-main` padding-top → `6rem` at ≤640 (single row, was 8.25rem
    for the old two-row bar). The docked logo is centered vertically on the bar
    at every breakpoint, and `--logo-end-left` insets from the bar's true left
    edge so it never pokes out between ~640px and the centered-layout threshold.
  - Indicator init bug fixed (`header.component.ts`): on a fresh load of a lazy
    route it re-derives the active link on font-load / resize via a
    `ResizeObserver`, so the highlight lands correctly without needing a hover.
  - Verified in preview from 320px → 1600px.

## 🟡 Medium — polish

- [ ] **Add a `theme-color` meta tag** (light + dark) in `src/index.html` so the
  mobile browser chrome matches the page background in each theme.

- [ ] **Contact form mobile autofill** — `src/app/pages/contact/contact.component.html`
  - Add `autocomplete="name"` / `autocomplete="email"` (and `inputmode="email"`)
    to the inputs so mobile keyboards and autofill behave correctly.
  - (Email is already `type="email"` — good.)

- [ ] **Verify the home brand title doesn't overflow at 320px** —
  `src/app/pages/home/home.component.scss`
  - `.brand-overlay-title` uses `white-space: nowrap` + letter-spacing; long
    names can force horizontal scroll on the narrowest screens. Test at 320px
    and allow wrap if needed.

## 🟢 Low — cleanup / nice-to-have

- [ ] **Remove dead CSS** — `src/app/pages/about/about.component.scss:266-280`
  - The `.transition-lab`, `.transition-lab-copy`, and `.transition-card-expanded`
    rules exist **only** inside the 768px media query with no base styles and no
    matching elements in the template. Dead code.

- [ ] **Confirm hover-only affordances degrade on touch**
  - The header nav indicator and all `:hover` lift effects are decorative and
    degrade fine, but worth a quick touch-device pass to confirm nothing
    important is hover-gated.

- [ ] **Optional: PWA basics**
  - No `apple-mobile-web-app-capable` / web app manifest. Only relevant if you
    want an installable "add to home screen" experience.

---

## Verification

After applying fixes, run the dev server and check at mobile viewports
(320px / 375px / 414px) plus a notched device profile:

```bash
ng serve
```
