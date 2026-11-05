# 13 years, one connected journey — revision 3

The site is no longer a scrolling page. It is a full-screen 3D world: the career is a glowing timeline through space, and each chapter is a 3D scene placed along it. Moving to a chapter flies the camera to that scene while the chapter's page animates in. The timeline lights up as you travel.

## Chapters

| # | Chapter | 3D scene |
|---|---------|----------|
| 0 | Start — 13 years at a glance | Connected core with orbit rings |
| 1 | 2013 · BPL Techno Vision — QA / Validation Engineer | Circuit board with live signal traces and an oscilloscope |
| 2 | 2015 · Honeywell Technology Solutions Labs — Sr. Software Engineer, Manual & Functional | Building with a floor-by-floor scan, sensors and radar |
| 3 | 2018 · Resideo — Sr. Software Engineer, Mobile & IoT Test Automation | Connected house sending signals to a phone, plus a device farm running in parallel |
| 4 | 2020 · Resideo — Technical Lead | Device → MQTT → Cloud → GraphQL → App chain; bars animate 25→10 days and 30→60% |
| 5 | 2024 · Resideo — Advanced Engineer II, System Test | Four app cards orbiting a core (First Alert, Resideo Pro, Honeywell Home, Total Connect) |
| 6 | Awards | Gold, silver and bronze medals |
| 7 | 2026 · Verivox, Germany — Software QA Engineer | iOS / Android phones with Detox and Appium chips |
| 8 | Connect | Camera rewinds past every chapter back to the origin; contact links |

## Navigation

Scroll (one gesture = one chapter), swipe, arrow keys / Page Up / Page Down / Home / End, the clickable timeline at the bottom, the arrow buttons, or the "Next" button in each page. Each chapter has its own link (`#2013`, `#2020`, `#connect` …).

## Content to confirm

- **Honeywell Technology Solutions Labs dates.** The CV prints Nov 2018 – Oct 2020 for both this role and the first Resideo role. The site shows **2015 — 2018**, inferred from the gap between BPL (ended Apr 2015) and Resideo (started Nov 2018). Edit `range` in the `CHAPTERS` list at the top of `dist/app.js` if that is wrong.
- **Resideo end date.** The CV says "Oct 2024 – Present"; the site shows **Oct 2024 — 2026** because Verivox started in March 2026.
- **13 years** is counted from April 2013 to 2026. The CV summary still says 11+.

All career text lives in the `CHAPTERS` list at the top of `dist/app.js`.

## Technical

- Three.js r170, bundled locally (`dist/assets/three.module.js`). All 3D models are built in code, with no image or model files.
- Fonts: Space Grotesk, DM Sans and JetBrains Mono from Google Fonts, with system fallbacks.
- On desktop the 3D view is shifted right of the page panel. On phones it sits above a bottom panel and the camera pulls further back.
- With reduced motion turned on, camera moves are instant and animations slow down. Without WebGL, the pages still work over a gradient background.
- The Verivox phone screen is illustrative and labelled as not the real app UI.

## Checks

Tested at 1440×900 and 375×812: no console errors, every chapter framed and readable, scroll / keys / swipe / timeline navigation all working, and no horizontal overflow on mobile.
