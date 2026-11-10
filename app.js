import * as T from './assets/three.module.js';
import { createScenes } from './scenes.js?v=31';
import { createCinema } from './cinema.js?v=31';

/* ------------------------------------------------------------------
   CONTENT — edit career facts here.
   Dates come from Hemanth's CV. The Honeywell Technology Solutions
   Labs dates are printed incorrectly on the CV (it repeats Nov 2018 –
   Oct 2020), so 2015 – 2018 is inferred from the gap between BPL and
   Resideo. Correct `range` below if needed.
------------------------------------------------------------------- */
const CHAPTERS = [
  {
    key: 'start', rail: 'Start', short: '●', sector: 'ORIGIN · 2013 → 2026',
    kicker: 'THIRTEEN YEARS · ONE CONNECTED JOURNEY',
    title: ['From a circuit board', 'to the <em>phone in your hand.</em>'],
    body: 'I’m Hemanth Balaji — a test automation leader with 13 years across embedded hardware, building systems, connected-home IoT and mobile. I prove that devices, cloud and apps work together.',
    cta: 'Begin the journey',
    callouts: [
      { pin: 'a', dir: 'ne', big: '13', k: 'YEARS IN QUALITY', t: 'Devices, cloud and apps — proven to work together.' },
      { pin: 'b', dir: 'se', big: '5', k: 'ROLES', t: 'From validation engineer to mobile QA owner.' },
      { pin: 'c', dir: 'e', big: '4', k: 'FLAGSHIP APPS', t: 'First Alert, Resideo Pro, Honeywell Home, Total Connect.' },
      { pin: 'd', dir: 'nw', big: '5', k: 'AWARDS', t: 'Gold, silver and bronze at Resideo / Honeywell Home.', accent: 'amber' },
    ],
  },
  {
    key: '2013', rail: '2013', short: '13', sector: 'BPL TECHNO VISION · BANGALORE',
    year: '2013', kicker: 'CHAPTER 01 · THE FOUNDATION',
    title: ['It started with', 'a <em>signal.</em>'],
    company: 'BPL Techno Vision', role: 'QA / Validation Engineer', range: 'APR 2013 — APR 2015', place: 'Bangalore, India',
    body: 'Before apps and clouds there was hardware — and the discipline of proving it behaves exactly as designed.',
    callouts: [
      { pin: 'mcu', dir: 'ne', k: 'EMBEDDED · SPEC VALIDATION', t: 'Embedded hardware and firmware proven against design specifications.' },
      { pin: 'scope', dir: 'nw', k: 'MEASURE, DON’T ASSUME', t: 'Foundational validation technique: every signal checked, not trusted.' },
      { pin: 'pwr', dir: 'ne', k: 'REGRESSION SUITES', t: 'Built into the core regression suites that gated product releases.' },
      { pin: 'log', dir: 'sw', k: 'DEFECT LIFECYCLE', t: 'Defects logged, tracked and re-verified across the full SDLC.' },
      { pin: 'iron', dir: 'w', k: 'ORIGIN · DIPLOMA', t: 'Electronics & Communication — the first circuit I ever traced.', accent: 'amber' },
    ],
  },
  {
    key: '2015', rail: '2015', short: '15', sector: 'HONEYWELL TECHNOLOGY SOLUTIONS LABS',
    year: '2015', kicker: 'CHAPTER 02 · SYSTEMS AT SCALE',
    title: ['Then the systems', 'grew to <em>buildings.</em>'],
    company: 'Honeywell Technology Solutions Labs', role: 'Senior Software Engineer — Manual & Functional Testing', range: '2015 — 2018', place: 'Bangalore, India',
    body: 'Software that runs entire buildings. I learned to think in requirements, traceability and the edge cases nobody expects.',
    callouts: [
      { pin: 'hvac', dir: 'ne', k: 'HVAC · BUILDING AUTOMATION', t: 'Functional and non-functional testing of the software that runs air handling and comfort.' },
      { pin: 'sec', dir: 'e', k: 'SECURITY SYSTEMS', t: 'Cameras, intrusion and access software tested for the edge cases nobody expects.' },
      { pin: 'access', dir: 'se', k: 'SYSTEM · INTEGRATION · UAT', t: 'Test plans written straight from product requirements.' },
      { pin: 'rtm', dir: 'e', k: 'RTM · TRACEABILITY', t: 'Every requirement mapped to a test — full release coverage.', accent: 'amber' },
    ],
  },
  {
    key: '2018', rail: '2018', short: '18', sector: 'RESIDEO · HONEYWELL HOME',
    year: '2018', kicker: 'CHAPTER 03 · THE CONNECTED HOME',
    title: ['The home became', '<em>connected.</em>'],
    company: 'Resideo Technologies (Honeywell Home)', role: 'Senior Software Engineer — Mobile & IoT Test Automation', range: 'NOV 2018 — OCT 2020', place: 'Bangalore, India',
    body: 'Thermostats, cameras and leak sensors met the smartphone — and I built the automation that tested them.',
    callouts: [
      { pin: 'phone', dir: 'e', k: 'APPIUM · TESTNG · POM', t: 'Automation frameworks for Honeywell Lyric / Home and TCC.' },
      { pin: 'farm', dir: 'ne', k: 'JENKINS · DEVICE CLOUD', t: 'Parallel CI runs on pCloudy, Sauce Labs and Perfecto.', accent: 'amber' },
      { pin: 'leak', dir: 'se', k: 'API · DEVICE SYNC', t: 'Backend and API validation of device-status sync and network reliability.' },
      { pin: 'thermo', dir: 'sw', k: 'IoT · DEVICES', t: 'Thermostats, cameras, leak and smoke sensors — end to end.' },
    ],
  },
  {
    key: '2020', rail: '2020', short: '20', sector: 'DEVICE → CLOUD → APP',
    year: '2020', kicker: 'CHAPTER 04 · LEADING THE SYSTEM',
    title: ['I learned to make', 'quality <em>scale.</em>'],
    company: 'Resideo Technologies (Honeywell Home)', role: 'Technical Lead — Mobile & IoT Test Automation', range: 'NOV 2020 — OCT 2024', place: 'Bangalore, India',
    body: 'Leading the automation roadmap, mentoring engineers and enforcing quality gates — across iOS, Android and IoT, from device to cloud to app.',
    callouts: [
      { pin: 'days', dir: 'sw', big: '25<i>→</i>10', k: 'DAYS · REGRESSION', t: 'Appium multi-device strategy, per major release.', accent: 'amber' },
      { pin: 'cov', dir: 'se', big: '30<i>→</i>60%', k: 'AUTOMATION COVERAGE', t: 'Core mobile and IoT suites.', accent: 'amber' },
      { pin: 'ci', dir: 'nw', k: 'BAMBOO CI/CD', t: 'Mobile and API suites in parallel on every commit.' },
      { pin: 'gql', dir: 'sw', k: 'GRAPHQL · MQTT', t: 'Queries, mutations, subscriptions — device-to-cloud data fidelity.' },
      { pin: 'iot', dir: 'se', k: 'HOMEKIT · ALEXA', t: 'End-to-end interoperability strategy.' },
    ],
  },
  {
    key: '2024', rail: '2024', short: '24', sector: 'CONNECTED-HOME PORTFOLIO',
    year: '2024', kicker: 'CHAPTER 05 · END-TO-END OWNERSHIP',
    title: ['Owning quality', '<em>end to end.</em>'],
    company: 'Resideo Technologies (Honeywell Home)', role: 'Advanced Engineer II — System Test', range: 'OCT 2024 — 2026', place: 'Bangalore, India',
    body: 'Next-gen mobile automation across the entire connected-home portfolio — from requirements and beta to UAT and release.',
    note: 'APP SCREENS ARE ILLUSTRATIVE',
    callouts: [
      { pin: 'apps', dir: 'ne', k: 'FOUR APPS · ONE STRATEGY', t: 'First Alert, Resideo Pro, Honeywell Home, Total Connect — Appium Flutter, XCUITest, native.' },
      { pin: 'req', dir: 'sw', k: 'END-TO-END OWNERSHIP', t: 'Requirements and design review through beta to release.' },
      { pin: 'uat', dir: 'se', k: 'UAT · TESTFLIGHT · PLAY', t: 'Official UAT cycles on TestFlight and Play closed testing.' },
      { pin: 'amp', dir: 'ne', k: 'AMPLITUDE', t: 'Real user behaviour fed back into test design.', accent: 'amber' },
    ],
  },
  {
    key: 'awards', rail: 'Awards', short: '★', sector: 'RECOGNITION',
    kicker: 'CHAPTER 06 · RECOGNITION',
    title: ['Five times,', 'the work was <em>noticed.</em>'],
    body: 'Awards from my years at Resideo / Honeywell Home.',
    callouts: [
      { pin: 'm0', dir: 'n', k: 'GOLD', t: 'DAS Enhancement Award — impactful delivery success.', accent: 'gold' },
      { pin: 'm1', dir: 'n', k: 'SILVER', t: 'First Alert app release — individual contribution.', accent: 'silver' },
      { pin: 'm2', dir: 's', k: 'SILVER', t: 'Refactored app release — individual contribution.', accent: 'silver' },
      { pin: 'm3', dir: 's', k: 'SILVER', t: 'VPD Award — engineering excellence, faster cycle time.', accent: 'silver' },
      { pin: 'm4', dir: 's', k: 'BRONZE', t: 'Delivery Award — RED compliance, Europe.', accent: 'bronze' },
    ],
  },
  {
    key: '2026', rail: '2026', short: '26', sector: 'VERIVOX · GERMANY',
    year: '2026', kicker: 'CHAPTER 07 · TODAY',
    title: ['A new country.', 'The same <em>conviction.</em>'],
    company: 'Verivox', role: 'Software QA Engineer', range: 'MARCH 2026 — TODAY', place: 'Germany',
    body: '13 years of systems thinking, now focused on the experience in someone’s hand.',
    callouts: [
      { pin: 'phone', dir: 'ne', k: 'SOLE QA OWNER', t: 'Complete QA responsibility for the Verivox mobile app.' },
      { pin: 'twin', dir: 'n', k: 'iOS + ANDROID', t: 'One experience, verified on both platforms.' },
      { pin: 'chip', dir: 'se', k: 'DETOX · APPIUM', t: 'Automation suites for the mobile app.', accent: 'amber' },
    ],
    note: '3D PHONE IS ILLUSTRATIVE — NOT THE VERIVOX APP UI',
  },
  {
    key: 'connect', rail: 'Connect', short: '→', sector: 'THE WHOLE JOURNEY',
    kicker: 'THE NEXT CONNECTION',
    title: ['Thirteen years in.', 'Let’s build <em>confidence.</em>'],
    body: 'From embedded validation to owning quality for a mobile app — every chapter added a layer. I’d love to hear what you’re building.',
    contact: [
      ['hemanth.balaji@yahoo.in', 'EMAIL', 'mailto:hemanth.balaji@yahoo.in'],
      ['linkedin.com/in/hemanthbalaji', 'LINKEDIN', 'https://www.linkedin.com/in/hemanthbalaji'],
      ['github.com/HemanthBalajiBB', 'GITHUB', 'https://github.com/HemanthBalajiBB'],
    ],
    replay: true,
  },
];

/* ------------------------------------------------------------------ */
const $ = (s) => document.querySelector(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let motionEnabled = !reduced;
const story = $('#story');
const N = CHAPTERS.length;
let cur = -1;
const isCompact = () => innerWidth <= 900 || innerWidth / innerHeight <= 1;

/* ---------- text effects ---------- */
const GLYPHS = '01<>/#=+*▮▯ABCDEFHKXZ';
function scramble(el, text, dur = 650, delay = 0) {
  if (reduced || !motionEnabled) { el.textContent = text; return; }
  el.textContent = text.replace(/\S/g, ' ');
  setTimeout(() => {
    const t0 = performance.now();
    const step = () => {
      const k = Math.min(1, (performance.now() - t0) / dur), n = Math.floor(text.length * k);
      let out = text.slice(0, n);
      const pool = /^\d+$/.test(text) ? '0123456789' : GLYPHS;
      for (let j = n; j < text.length; j++) out += text[j] === ' ' ? ' ' : pool[(Math.random() * pool.length) | 0];
      el.textContent = out;
      if (k < 1) requestAnimationFrame(step);
    };
    step();
  }, delay);
}

/* ---------- story: floating headline, no box ---------- */
function storyHTML(c, i) {
  let h = `<div class="s-k fx"><span class="dot"></span><span data-scr="${c.kicker}"></span></div>`;
  if (c.year) h += `<div class="s-year" data-scr="${c.year}" aria-label="${c.year}"></div>`;
  h += `<h1 class="s-title">${c.title.map((l) => `<span class="ln"><span>${l}</span></span>`).join('')}</h1>`;
  if (c.company) h += `<div class="s-meta fx"><b>${c.company}</b><span>${c.role}</span><em>${c.range} · ${c.place.toUpperCase()}</em></div>`;
  if (c.body) h += `<p class="s-lede fx${c.callouts ? ' opt' : ''}">${c.body}</p>`;
  if (c.callouts) h += `<ul class="sr">${c.callouts.map((o) => `<li>${o.k}: ${(o.big || '').replace(/<[^>]+>/g, ' ')} ${o.t}</li>`).join('')}</ul>`;
  if (c.contact) h += `<div class="s-contact fx">${c.contact.map(([t, k, u]) => `<a href="${u}"${u.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}><span>${k}</span><b>${t}</b><i>↗</i></a>`).join('')}</div>`;
  if (c.cta) h += `<button class="s-go fx" data-step="1"><span>${c.cta}</span><i>→</i></button>`;
  if (c.replay) h += `<button class="s-go ghost fx" data-goto="0"><span>Replay the journey</span><i>↺</i></button>`;
  if (c.note) h += `<div class="s-note fx">${c.note}</div>`;
  return h;
}

let storyTimer;
function showStory(i, first) {
  clearTimeout(storyTimer);
  const swap = () => {
    story.classList.remove('in', 'out');
    story.innerHTML = storyHTML(CHAPTERS[i], i);
    const base = first ? 250 : 430;
    story.querySelectorAll('.ln>span').forEach((el, k) => el.style.setProperty('--d', `${base + 180 + k * 120}ms`));
    story.querySelectorAll('.fx').forEach((el, k) => el.style.setProperty('--d', `${base + 420 + k * 110}ms`));
    story.querySelectorAll('[data-scr]').forEach((el, k) => scramble(el, el.dataset.scr, k ? 700 : 520, base + (k ? 60 : 0)));
    requestAnimationFrame(() => requestAnimationFrame(() => { story.classList.add('in'); measureStory(); }));
  };
  if (first || reduced) swap();
  else { story.classList.add('out'); storyTimer = setTimeout(swap, 260); }
}
let storyBox = { right: 0, top: innerHeight };
function measureStory() { const r = story.getBoundingClientRect(); storyBox = { right: r.right, top: r.top }; }
story.addEventListener('click', (e) => {
  const s = e.target.closest('[data-step]');
  const g = e.target.closest('[data-goto]');
  if (s) go(cur + 1);
  if (g) go(+g.dataset.goto);
});

/* ---------- callouts: achievements wired to the 3D objects ---------- */
const coLayer = $('#co'), coSvg = $('#co-svg');
const SVGNS = 'http://www.w3.org/2000/svg';
let callouts = [], coArmed = 0, coActive = 0, coCycleAt = 0, coHover = -1, coTour = 0, coTourAt = 0;
const svgEl = (tag, cls, parent) => { const e = document.createElementNS(SVGNS, tag); e.setAttribute('class', cls); parent.appendChild(e); return e; };

function buildCallouts(i) {
  callouts.forEach((c) => { c.el.classList.add('gone'); c.g.classList.add('gone'); setTimeout(() => { c.el.remove(); c.g.remove(); }, 450); });
  callouts = []; coArmed = 0; coActive = 0; coHover = -1; coTour = 0; coTourAt = 0;
  const list = CHAPTERS[i].callouts || [];
  const n = list.length;
  callouts = list.map((d, k) => {
    const el = document.createElement('div');
    el.className = `co ${d.accent || ''}`;
    el.innerHTML = `<span class="co-k"><i>${String(k + 1).padStart(2, '0')}<small>/${String(n).padStart(2, '0')}</small></i><span></span></span>${d.big ? `<strong class="co-big">${d.big}</strong>` : ''}<span class="co-t">${d.t}</span>`;
    coLayer.appendChild(el);
    const g = svgEl('g', `co-g ${d.accent || ''}`, coSvg);
    const line = svgEl('polyline', 'co-line', g), ping = svgEl('circle', 'co-ping', g), node = svgEl('circle', 'co-node', g), dot = svgEl('circle', 'co-dot', g);
    node.setAttribute('r', 4.5); dot.setAttribute('r', 2.6);
    el.addEventListener('click', () => { if (isCompact()) { coActive = (coActive + 1) % callouts.length; coCycleAt = 0; } });
    el.addEventListener('pointerenter', () => { coHover = k; }); el.addEventListener('pointerleave', () => { coHover = -1; coTourAt = performance.now(); });
    return { d, el, g, line, ping, node, dot, w: 0, h: 0, born: 0, shown: false };
  });
  measureCallouts();
}
function measureCallouts() {
  coLayer.classList.toggle('compact', isCompact());
  callouts.forEach((c) => { c.w = c.el.offsetWidth; c.h = c.el.offsetHeight; });
}
function armCallouts(i) { if (i === cur) coArmed = performance.now() + 150; }

const DIRS = { n: [.25, -1.25], ne: [1, -.8], e: [1.15, -.12], se: [1, .75], s: [.25, 1.2], sw: [-1, .75], w: [-1.15, -.12], nw: [-1, -.8] };
function route(ax, ay, lx, ly) {
  const dx = lx - ax, dy = ly - ay, adx = Math.abs(dx), ady = Math.abs(dy);
  if (ady <= adx) return [[ax, ay], [ax + Math.sign(dx) * ady, ly], [lx, ly]]; // 45° then horizontal
  return [[ax, ay], [ax, ly - Math.sign(dy) * adx], [lx, ly]]; // vertical then 45°
}
function along(pts, f) { // point at fraction f, plus truncated polyline
  const seg = []; let L = 0;
  for (let k = 1; k < pts.length; k++) { const l = Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]); seg.push(l); L += l; }
  let d = f * L; const out = [pts[0]];
  for (let k = 1; k < pts.length; k++) {
    if (d <= seg[k - 1] || k === pts.length - 1) { const r = seg[k - 1] ? Math.min(1, d / seg[k - 1]) : 1; const p = [pts[k - 1][0] + (pts[k][0] - pts[k - 1][0]) * r, pts[k - 1][1] + (pts[k][1] - pts[k - 1][1]) * r]; out.push(p); return { p, out }; }
    d -= seg[k - 1]; out.push(pts[k]);
  }
  return { p: pts[pts.length - 1], out };
}

function updateCallouts(project) {
  if (!callouts.length) return;
  const now = performance.now(), W = innerWidth, H = innerHeight, compact = isCompact();
  const s = Math.max(.75, Math.min(1.1, W / 1440));
  const anchors = callouts.map((c) => project(cur, c.d.pin));

  if (compact) {
    // one signal at a time, docked just above the headline
    if (coArmed && now > coArmed) {
      if (!coCycleAt) coCycleAt = now;
      if (now - coCycleAt > 4200) { coActive = (coActive + 1) % callouts.length; coCycleAt = now; }
    }
    const land = W / H > 1;
    callouts.forEach((c, k) => {
      const on = coArmed && now > coArmed && k === coActive && anchors[k] && anchors[k].ok;
      if (on && !c.shown) { c.born = now; c.shown = true; c.el.classList.remove('on'); }
      c.el.classList.add('open');
      if (!on) { c.shown = false; c.born = 0; c.el.classList.remove('on'); c.g.style.opacity = 0; c.el.style.opacity = 0; return; }
      const a = anchors[k];
      const lx = land ? Math.min(W - c.w - 24, W * .56) : 18;
      const top = land ? H * .2 : Math.max(96, Math.min(H * .24, storyBox.top - c.h - 24));
      c.el.style.transform = `translate3d(${lx + (land ? 10 : 0)}px, ${land ? top - 8 : top}px, 0)`;
      c.el.style.opacity = '';
      const pts = land ? route(a.x, a.y, lx, top) : route(a.x, a.y, Math.min(W - 18, Math.max(18, a.x * .35 + 18)), top - 10);
      drawCallout(c, pts, now, a);
    });
    return;
  }

  // full constellation on wide screens
  const minY = 158, maxY = H - 168, left = storyBox.right + 28, right = W - Math.max(24, W * .04);
  const place = callouts.map((c, k) => {
    const a = anchors[k]; if (!a) return null;
    const [ux, uy] = DIRS[c.d.dir] || DIRS.e;
    let east = ux >= 0;
    let lx = a.x + ux * 150 * s, ly = a.y + uy * 120 * s;
    if (!east && lx - 10 - c.w < left) { east = true; lx = a.x + Math.abs(ux) * 150 * s; }
    if (east && lx + 10 + c.w > right) { lx = right - 10 - c.w; if (lx < a.x + 30) { east = false; lx = Math.max(left + c.w + 10, a.x - 150 * s); } }
    return { c, a, east, lx, ly };
  }).filter(Boolean);
  // relax overlapping label boxes apart vertically, keeping them on screen
  const box = (p) => { const x0 = p.east ? p.lx + 10 : p.lx - 10 - p.c.w; return [x0 - 12, x0 + p.c.w + 12, p.ly - 8 - 10, p.ly - 8 + p.c.h + 10]; };
  const hit = (a, b) => a[0] < b[1] && b[0] < a[1] && a[2] < b[3] && b[2] < a[3];
  const clampY = (p) => { p.ly = Math.min(Math.max(p.ly, minY), Math.max(minY, maxY - p.c.h + 8)); };
  place.forEach(clampY);
  for (let it = 0; it < 24; it++) {
    let moved = false;
    for (let i = 0; i < place.length; i++) for (let j = i + 1; j < place.length; j++) {
      const P = place[i], Q = place[j], A = box(P), B = box(Q);
      if (!hit(A, B)) continue;
      const [up, dn] = P.ly <= Q.ly ? [P, Q] : [Q, P], Au = box(up), Bd = box(dn);
      const ov = Au[3] - Bd[2] + 1;
      up.ly -= ov / 2; dn.ly += ov / 2; clampY(up); clampY(dn); moved = true;
    }
    if (!moved) break;
  }
  // guided tour: one label opens at a time (hover takes over), the rest stay as quiet tags
  const allOn = coArmed && now > coArmed + callouts.length * 480 + 700;
  if (allOn) { if (!coTourAt) coTourAt = now; if (coHover < 0 && now - coTourAt > 3600) { coTour = (coTour + 1) % callouts.length; coTourAt = now; } }
  const openIdx = coHover >= 0 ? coHover : (allOn ? coTour : -1);
  callouts.forEach((c, k) => { c.el.classList.toggle('open', k === openIdx); c.g.classList.toggle('open', k === openIdx); });
  place.forEach((p, k) => {
    const { c, a } = p;
    const idx = callouts.indexOf(c);
    const born = coArmed ? coArmed + idx * 480 : 0;
    const on = born && now > born && a.ok;
    if (!on) { c.g.style.opacity = 0; return; }
    if (!c.shown) { c.shown = true; c.born = born; }
    c.el.classList.toggle('w', !p.east);
    c.el.style.transform = `translate3d(${p.east ? p.lx + 10 : p.lx - 10 - c.w}px, ${p.ly - 8}px, 0)`;
    drawCallout(c, route(a.x, a.y, p.lx, p.ly), now, a);
  });
}
function drawCallout(c, pts, now, a) {
  const age = now - c.born;
  c.g.style.opacity = 1;
  c.node.setAttribute('cx', a.x); c.node.setAttribute('cy', a.y);
  const pk = motionEnabled ? ((age % 2400) / 2400) : .18;
  c.ping.setAttribute('cx', a.x); c.ping.setAttribute('cy', a.y); c.ping.setAttribute('r', 4 + pk * 22); c.ping.style.opacity = (1 - pk) * .8;
  const f = (reduced || !motionEnabled) ? 1 : Math.min(1, Math.max(0, (age - 120) / 520));
  const e = 1 - Math.pow(1 - f, 3);
  const { out, p } = along(pts, e);
  c.line.setAttribute('points', out.map((q) => q.join(',')).join(' '));
  if (f < 1) { c.dot.setAttribute('cx', p[0]); c.dot.setAttribute('cy', p[1]); c.dot.style.opacity = 1; }
  else {
    if (!c.el.classList.contains('on')) { c.el.classList.add('on'); scramble(c.el.querySelector('.co-k>span'), c.d.k, 480); }
    const q = ((age - 640) % 2600) / 2600; const r = along(pts, 1 - q).p; // data flows back into the object
    c.dot.setAttribute('cx', r[0]); c.dot.setAttribute('cy', r[1]); c.dot.style.opacity = Math.sin(q * Math.PI);
  }
}
addEventListener('resize', () => { measureStory(); measureCallouts(); });

/* ---------- rail ---------- */
const rail = $('#rail');
rail.innerHTML = CHAPTERS.map((c, i) => `<button data-i="${i}" aria-label="Go to ${c.year ? c.year + ' — ' + c.company : c.rail.toLowerCase()}"><i></i><span class="long">${c.rail}</span><span class="short">${c.short}</span></button>`).join('');
rail.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) go(+b.dataset.i); });
document.querySelectorAll('[data-go]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); go(+a.dataset.go); }));
$('#count-all').textContent = String(N).padStart(2, '0');
$('#prev').onclick = () => go(cur - 1);
$('#next').onclick = () => go(cur + 1);
const motionToggle = $('#motion-toggle');
function syncMotionToggle() {
  motionToggle.setAttribute('aria-pressed', String(!motionEnabled));
  motionToggle.querySelector('span').textContent = motionEnabled ? 'ON' : 'OFF';
  document.documentElement.classList.toggle('motion-off', !motionEnabled);
}
motionToggle.onclick = () => { motionEnabled = !motionEnabled; syncMotionToggle(); if (world && cur >= 0) world.flyTo(cur, true); };
syncMotionToggle();

function updateHUD(i) {
  rail.querySelectorAll('button').forEach((b, k) => { b.classList.toggle('on', k === i); b.classList.toggle('past', k < i); b.setAttribute('aria-current', k === i ? 'step' : 'false'); });
  $('#rail-fill').style.width = `${(i / (N - 1)) * 100}%`;
  $('#count-cur').textContent = String(i + 1).padStart(2, '0');
  $('#prev').disabled = i === 0;
  $('#next').disabled = i === N - 1;
  const ro = $('#readout');
  ro.style.opacity = 0;
  setTimeout(() => { ro.textContent = CHAPTERS[i].sector; ro.style.opacity = 1; }, 300);
}

/* ---------- cursor ---------- */
(() => {
  const el = $('#cursor'); if (!el || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  document.documentElement.classList.add('has-cursor');
  let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
  addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; tx = e.clientX; ty = e.clientY; el.classList.add('live'); el.classList.toggle('link', !!e.target.closest('a,button,.co')); });
  addEventListener('pointerdown', () => el.classList.add('hold')); addEventListener('pointerup', () => el.classList.remove('hold'));
  document.addEventListener('pointerleave', () => el.classList.remove('live'));
  const loop = () => { x += (tx - x) * .22; y += (ty - y) * .22; el.style.transform = `translate3d(${x}px,${y}px,0)`; requestAnimationFrame(loop); };
  loop();
})();

/* ---------- navigation ---------- */
function go(i, opts = {}) {
  i = Math.max(0, Math.min(N - 1, i));
  if (i === cur && !opts.force) return;
  const first = cur === -1;
  cur = i;
  showStory(i, first);
  buildCallouts(i);
  updateHUD(i);
  document.documentElement.dataset.chapter = CHAPTERS[i].key;
  document.documentElement.style.setProperty('--accent', MOODS[i].accent);
  world && world.flyTo(i, !motionEnabled);
  const key = CHAPTERS[i].key;
  if (location.hash.slice(1) !== key) history.replaceState(null, '', i === 0 ? location.pathname : '#' + key);
  if (i > 0) $('#hint').classList.add('gone');
}

let wheelLock = 0, wheelAcc = 0;
addEventListener('wheel', (e) => {
  const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
  e.preventDefault();
  const now = performance.now();
  if (now < wheelLock) { wheelLock = Math.max(wheelLock, now + 160); return; }
  wheelAcc += d;
  if (Math.abs(wheelAcc) > 35) { go(cur + Math.sign(wheelAcc)); wheelAcc = 0; wheelLock = now + 1100; }
}, { passive: false });

let tStart = null;
addEventListener('touchstart', (e) => { const t = e.touches[0]; tStart = { x: t.clientX, y: t.clientY }; }, { passive: true });
addEventListener('touchend', (e) => {
  if (!tStart) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - tStart.x, dy = t.clientY - tStart.y, ax = Math.abs(dx), ay = Math.abs(dy);
  if (ax > 50 && ax > ay * 1.2) go(cur + (dx < 0 ? 1 : -1));
  else if (ay > 60 && ay > ax) go(cur + (dy < 0 ? 1 : -1));
  tStart = null;
}, { passive: true });

addEventListener('keydown', (e) => {
  if (e.target.closest && e.target.closest('input,textarea')) return;
  const k = e.key;
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(k)) { e.preventDefault(); go(cur + 1); }
  else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(k)) { e.preventDefault(); go(cur - 1); }
  else if (k === 'Home') go(0);
  else if (k === 'End') go(N - 1);
});
addEventListener('hashchange', () => { const i = CHAPTERS.findIndex((c) => c.key === location.hash.slice(1)); if (i >= 0) go(i); });

/* ==================================================================
   3D WORLD
================================================================== */
// one colour world per chapter: clear colour, backdrop glow, shadow grade, UI accent
const MOODS = [
  { bg: 0x05080b, glow: 0x1d6f78, tint: [.86, .98, 1.05], accent: '#7ef0df' },
  { bg: 0x080604, glow: 0x8a4d1c, tint: [1.07, .97, .85], accent: '#ffb86e' },
  { bg: 0x04070d, glow: 0x2a4f96, tint: [.87, .95, 1.1], accent: '#93b6ff' },
  { bg: 0x070605, glow: 0x7a4e2c, tint: [1.05, .98, .9], accent: '#ffc890' },
  { bg: 0x03080a, glow: 0x147a78, tint: [.84, 1.0, 1.03], accent: '#5ff2e0' },
  { bg: 0x06060c, glow: 0x473c9c, tint: [.93, .92, 1.1], accent: '#b8acff' },
  { bg: 0x090704, glow: 0x96621a, tint: [1.08, .98, .83], accent: '#f3c670' },
  { bg: 0x04060c, glow: 0x2c4a8c, tint: [.92, .95, 1.08], accent: '#ffcf94' },
  { bg: 0x05080b, glow: 0x1d6f78, tint: [.9, .98, 1.04], accent: '#7ef0df' },
];
const COL = { cyan: 0x5ff2e0, amber: 0xffb45c, blue: 0x7aa2ff, white: 0xe9f3f7, green: 0x7dffa8, red: 0xff6b6b };
let world = null;

function makeGlowTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'); const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.18, 'rgba(255,255,255,.65)'); r.addColorStop(.45, 'rgba(255,255,255,.15)'); r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r; g.fillRect(0, 0, 128, 128);
  return new T.CanvasTexture(c);
}

function createWorld() {
  const canvas = $('#world');
  let renderer;
  try { renderer = new T.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); }
  catch (e) { document.documentElement.classList.add('no-webgl'); return null; }
  const maxPixelRatio = isCompact() ? 1.25 : 1.65;
  renderer.setPixelRatio(Math.min(devicePixelRatio, maxPixelRatio));
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.localClippingEnabled = true;
  const cinema = createCinema(T, renderer, { compact: isCompact() });

  const scene = new T.Scene();
  scene.background = new T.Color(0x03060a);
  scene.fog = new T.FogExp2(0x03060a, 0.012);
  const camera = new T.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 2000);

  scene.add(new T.AmbientLight(0x6688aa, 0.22));
  // studio environment so metal, glass and plastic read as real materials
  {
    const pm = new T.PMREMGenerator(renderer), env = new T.Scene();
    env.add(new T.Mesh(new T.BoxGeometry(40, 40, 40), new T.MeshBasicMaterial({ color: 0x0c151a, side: T.BackSide })));
    const panel = (w, h, c, k, x, y, z) => { const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(c).multiplyScalar(k), side: T.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m); };
    panel(16, 8, 0xfff2e2, 5, 0, 18, 4); panel(10, 14, 0xdfefff, 2.2, -18, 4, 6); panel(8, 12, 0x9ff6ec, 1.4, 18, 2, -6); panel(30, 3, 0xffd7a8, 1.2, 0, -6, -18);
    scene.environment = pm.fromScene(env, .03).texture; scene.environmentIntensity = .75; pm.dispose();
  }
  const key = new T.DirectionalLight(0xbfe8ff, .9); key.position.set(10, 20, 12); scene.add(key);
  const rim = new T.DirectionalLight(0xffb45c, 0.8); rim.position.set(-14, 6, -10); scene.add(rim);

  const glowTex = makeGlowTexture();
  const H = {
    glow(color, size = 1, op = 1) {
      const s = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color, blending: T.AdditiveBlending, transparent: true, depthWrite: false, opacity: op }));
      s.scale.setScalar(size); return s;
    },
    edges(geo, color, op = .8) { return new T.LineSegments(new T.EdgesGeometry(geo, 20), new T.LineBasicMaterial({ color, transparent: true, opacity: op })); },
    line(pts, color, op = .7) { return new T.Line(new T.BufferGeometry().setFromPoints(pts), new T.LineBasicMaterial({ color, transparent: true, opacity: op, blending: T.AdditiveBlending, depthWrite: false })); },
    text(str, { size = .5, color = '#9fefe6', weight = 500, bg = null, border = null, family = '"JetBrains Mono", ui-monospace, monospace' } = {}) {
      const c = document.createElement('canvas'); const g = c.getContext('2d');
      const font = `${weight} 64px ${family}`; g.font = font;
      const pad = bg ? 34 : 10; const w = Math.ceil(g.measureText(str).width) + pad * 2; const h = bg ? 120 : 92;
      c.width = w; c.height = h; g.font = font;
      if (bg) { g.fillStyle = bg; g.fillRect(0, 0, w, h); }
      if (border) { g.strokeStyle = border; g.lineWidth = 3; g.strokeRect(1.5, 1.5, w - 3, h - 3); }
      g.fillStyle = color; g.textBaseline = 'middle'; g.fillText(str, pad, h / 2 + 3);
      const tex = new T.CanvasTexture(c); tex.colorSpace = T.SRGBColorSpace; tex.anisotropy = 4;
      const s = new T.Sprite(new T.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, fog: true }));
      s.scale.set(size * w / h, size, 1); return s;
    },
    pulses(curve, color, n = 3, speed = .25, size = .55) {
      const g = new T.Group(); const items = [];
      for (let i = 0; i < n; i++) { const s = H.glow(color, size); g.add(s); items.push(s); }
      g.userData.tick = (t) => items.forEach((s, i) => s.position.copy(curve.getPointAt(((t * speed) + i / n) % 1)));
      return g;
    },
    phone(h = 3, tex = null, body = 0x0e151b) {
      const w = h * .49, r = w * .16;
      const sh = new T.Shape();
      sh.moveTo(-w / 2 + r, -h / 2); sh.lineTo(w / 2 - r, -h / 2); sh.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      sh.lineTo(w / 2, h / 2 - r); sh.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2); sh.lineTo(-w / 2 + r, h / 2);
      sh.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r); sh.lineTo(-w / 2, -h / 2 + r); sh.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
      const geo = new T.ExtrudeGeometry(sh, { depth: h * .045, bevelEnabled: true, bevelSize: h * .012, bevelThickness: h * .012, bevelSegments: 3, curveSegments: 10 });
      geo.translate(0, 0, -h * .0225);
      const g = new T.Group();
      g.add(new T.Mesh(geo, new T.MeshStandardMaterial({ color: body, metalness: .85, roughness: .3 })));
      const screen = new T.Mesh(new T.PlaneGeometry(w * .9, h * .93), tex ? new T.MeshBasicMaterial({ map: tex, toneMapped: false }) : new T.MeshBasicMaterial({ color: 0x0a2a30, toneMapped: false }));
      screen.position.z = h * .04; g.add(screen); g.userData.screen = screen;
      const outline = new T.LineLoop(new T.BufferGeometry().setFromPoints(sh.getPoints(40).map((p) => new T.Vector3(p.x * 1.02, p.y * 1.02, h * .041))), new T.LineBasicMaterial({ color: COL.cyan, transparent: true, opacity: .55 }));
      g.add(outline);
      return g;
    },
  };

  /* ---------- canvas-drawn screens ---------- */
  function screenTexture(draw, w = 512, h = 1040) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d'); draw(g, w, h);
    const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; return t;
  }
  const uiFont = (s, wgt = 500) => `${wgt} ${s}px "Space Grotesk", system-ui, sans-serif`;
  const monoFont = (s) => `500 ${s}px "JetBrains Mono", monospace`;

  /* ---------- scenes ---------- */
  const scenes = [];
  const pinAt = (pins, name, parent, x = 0, y = 0, z = 0) => { const o = new T.Object3D(); o.position.set(x, y, z); parent.add(o); pins[name] = o; return o; };

  const floorAlpha = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), r = g.createRadialGradient(128, 128, 0, 128, 128, 128); r.addColorStop(0, '#fff'); r.addColorStop(.55, '#bbb'); r.addColorStop(1, '#000'); g.fillStyle = r; g.fillRect(0, 0, 256, 256); return new T.CanvasTexture(c); })();
  const real = createScenes({ T, H, COL, uiFont, monoFont, camera }).scenes;
  const builders = real;
  const anchors = builders.map((_, i) => new T.Vector3(Math.sin(i * 1.15) * 30, Math.sin(i * .8) * 7, -i * 75));
  builders.forEach((b, i) => {
    const s = b(); s.group.position.copy(anchors[i]); scene.add(s.group);
    s.cam.add(anchors[i]); s.look.add(anchors[i]); scenes.push(s);
    // physical shading + a scan-line "materialise" reveal on arrival
    s.group.updateMatrixWorld(true);
    const bb = new T.Box3().setFromObject(s.group, true);
    s.clip = new T.Plane(new T.Vector3(0, -1, 0), bb.max.y + 1); s.y0 = bb.min.y - .2; s.y1 = bb.max.y + .4; s.revealAt = -1;
    s.group.traverse((o) => {
      if (o.isMesh && o.material && (o.material.isMeshStandardMaterial) && !o.material.transparent) { o.castShadow = true; o.receiveShadow = true; }
      const ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
      ms.forEach((m) => { m.clippingPlanes = [s.clip]; });
    });
    const sz = bb.getSize(new T.Vector3());
    { // a soft pool of gallery floor under each exhibit, so nothing floats in a void
      const r = Math.max(sz.x, sz.z) * .95, fc = bb.getCenter(new T.Vector3());
      const floor = new T.Mesh(new T.CircleGeometry(r, 72), new T.MeshStandardMaterial({ color: 0x0b0e11, roughness: .42, metalness: .35, transparent: true, alphaMap: floorAlpha, depthWrite: false, clippingPlanes: [s.clip] }));
      floor.rotation.x = -Math.PI / 2; floor.position.set(fc.x, bb.min.y - .03, fc.z); floor.receiveShadow = true; floor.renderOrder = -1; scene.add(floor); s.floor = floor;
    }
    s.scan = new T.Mesh(new T.PlaneGeometry(sz.x + 2, sz.z + 2), new T.MeshBasicMaterial({ color: COL.cyan, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false, side: T.DoubleSide }));
    s.scan.rotation.x = -Math.PI / 2; const c = bb.getCenter(new T.Vector3()); s.scan.position.set(c.x, s.y1, c.z); scene.add(s.scan);
    s.scanEdge = new T.LineSegments(new T.EdgesGeometry(s.scan.geometry), new T.LineBasicMaterial({ color: COL.cyan, transparent: true, opacity: 0 }));
    s.scan.add(s.scanEdge);
  });

  /* ---------- the timeline path (grows as you travel) ---------- */
  const pathPts = [new T.Vector3(anchors[0].x - 20, anchors[0].y - 7, 40)];
  anchors.forEach((a, i) => { pathPts.push(a.clone().add(new T.Vector3(0, -7, 6))); if (i < anchors.length - 1) pathPts.push(a.clone().lerp(anchors[i + 1], .5).add(new T.Vector3(0, -9, 0))); });
  const path = new T.CatmullRomCurve3(pathPts, false, 'catmullrom', .35);
  const segs = 900;
  scene.add(new T.Mesh(new T.TubeGeometry(path, segs, .045, 6, false), new T.MeshBasicMaterial({ color: 0x1a4a55, transparent: true, opacity: .55 })));
  const lit = new T.Mesh(new T.TubeGeometry(path, segs, .09, 6, false), new T.MeshBasicMaterial({ color: COL.cyan, transparent: true, opacity: .95, blending: T.AdditiveBlending, depthWrite: false }));
  scene.add(lit); lit.geometry.setDrawRange(0, 0);
  const head = H.glow(COL.cyan, 3.2); scene.add(head);
  const pathPulses = H.pulses(path, COL.amber, 14, .012, 1.1); scene.add(pathPulses);
  const anchorU = anchors.map((a) => { const target = a.clone().add(new T.Vector3(0, -7, 6)); let best = 0, bd = 1e9; for (let k = 0; k <= 600; k++) { const d = path.getPointAt(k / 600).distanceToSquared(target); if (d < bd) { bd = d; best = k / 600; } } return best; });
  const yearLabels = [];
  CHAPTERS.forEach((c, i) => {
    if (i === 0 || i >= anchors.length || !c.year && c.key !== 'awards') return;
    const lbl = H.text(c.year || (i === 0 ? 'START' : '★ AWARDS'), { size: 1.3, color: '#5ff2e0', weight: 700, family: '"Space Grotesk", sans-serif' });
    lbl.position.copy(anchors[i]).add(new T.Vector3(-6, -9.2, 6)); scene.add(lbl); yearLabels.push(lbl);
    const node = H.glow(COL.cyan, 2); node.position.copy(path.getPointAt(anchorU[i])); scene.add(node);
  });

  /* ---------- environment ---------- */
  const sn = 4200, sp = new Float32Array(sn * 3);
  for (let i = 0; i < sn; i++) sp.set([(Math.random() - .5) * 360, (Math.random() - .5) * 200, 80 - Math.random() * 720], i * 3);
  const stars = new T.Points(new T.BufferGeometry().setAttribute('position', new T.BufferAttribute(sp, 3)), new T.PointsMaterial({ color: 0x9cc8ff, size: .34, transparent: true, opacity: .5, depthWrite: false, fog: false, sizeAttenuation: true }));
  scene.add(stars);

  /* ---------- finale camera: look back over the whole journey ---------- */
  const box = new T.Box3(); anchors.forEach((a) => box.expandByPoint(a));
  const center = box.getCenter(new T.Vector3());
  // full circle: rewind past every chapter and land back at the origin, the lit timeline trailing behind
  const finale = { cam: anchors[0].clone().add(new T.Vector3(13, 6, 21)), look: anchors[0].clone().add(new T.Vector3(-2, -1.5, -8)) };
  const shots = [...scenes.map((s) => ({ cam: s.cam, look: s.look })), finale];

  /* ---------- camera flight ---------- */
  const camLook = new T.Vector3();
  let flight = null, active = 0, prevActive = 0, litU = 0, litFrom = 0, litTo = 0;
  const ease = (x) => x * x * x * (x * (x * 6 - 15) + 10);

  // portrait screens show the scene in a smaller window, so pull the camera further back
  const camFor = (s) => (innerWidth / innerHeight <= 1 ? s.look.clone().add(s.cam.clone().sub(s.look).multiplyScalar(1.32)) : s.cam);
  function flyTo(i, instant) {
    const to = { cam: camFor(shots[i]), look: shots[i].look };
    orbit.ty = orbit.tp = 0;
    if (!moodNow.set) { const m0 = MOODS[Math.min(i, MOODS.length - 1)]; moodNow.bg.setHex(m0.bg); moodNow.glow.setHex(m0.glow); moodNow.tint.setRGB(...m0.tint); moodNow.set = true; }
    prevActive = active; active = i; scenes[i] && scenes[i].group.userData.onEnter && scenes[i].group.userData.onEnter();
    const quick = instant || reduced || !motionEnabled;
    if (scenes[i] && scenes[i].revealAt < 0) scenes[i].revealAt = quick ? 0 : performance.now() + 380;
    if (i >= anchors.length) scenes.forEach((s) => { if (s.revealAt < 0) s.revealAt = quick ? 0 : performance.now(); });
    litFrom = litU; litTo = i < anchors.length ? anchorU[i] : 1;
    if (i === shots.length - 1) litFrom = Math.max(litFrom, anchorU[anchors.length - 1]);
    if (instant || reduced || !motionEnabled) { camera.position.copy(to.cam); camLook.copy(to.look); camera.lookAt(camLook); flight = null; litU = litTo; api.onArrive && api.onArrive(i); return; }
    const from = { cam: camera.position.clone(), look: camLook.clone() };
    const dist = from.cam.distanceTo(to.cam);
    const mid = from.cam.clone().lerp(to.cam, .5).add(new T.Vector3(0, Math.min(11, dist * .07), Math.min(15, dist * .095)));
    flight = { t0: performance.now(), dur: Math.min(1950, 900 + dist * 3.4), from, to, curve: new T.QuadraticBezierCurve3(from.cam, mid, to.cam) };
  }

  /* ---------- sizing ---------- */
  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio, (w <= 900 || w / h <= 1) ? 1.25 : 1.65));
    renderer.setSize(w, h, false);
    { const b = renderer.getDrawingBufferSize(new T.Vector2()); cinema.setSize(b.x, b.y); }
    camera.aspect = w / h;
    const narrow = w <= 900 || w / h <= 1;
    if (narrow && w / h <= 1) camera.setViewOffset(w, h, 0, h * .2, w, h);
    else if (narrow) camera.setViewOffset(w, h, -w * .26, 0, w, h);
    else camera.setViewOffset(w, h, -w * .17, 0, w, h);
    camera.fov = narrow && w / h <= 1 ? 58 : 42;
    camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize); resize();

  const pointer = new T.Vector2();
  // drag to inspect: orbit the exhibit a little, it eases back on the next chapter
  const orbit = { yaw: 0, pitch: 0, ty: 0, tp: 0, drag: null };
  addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch' || e.button !== 0 || e.target.closest('a,button,.co')) return;
    orbit.drag = { x: e.clientX, y: e.clientY, ty: orbit.ty, tp: orbit.tp }; document.documentElement.classList.add('grabbing');
  });
  addEventListener('pointerup', () => { orbit.drag = null; document.documentElement.classList.remove('grabbing'); });
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    pointer.set(e.clientX / innerWidth - .5, e.clientY / innerHeight - .5);
    if (orbit.drag) { orbit.ty = Math.max(-.6, Math.min(.6, orbit.drag.ty - (e.clientX - orbit.drag.x) * .0045)); orbit.tp = Math.max(-.16, Math.min(.3, orbit.drag.tp + (e.clientY - orbit.drag.y) * .003)); }
  });
  const orbited = (cam, look) => {
    const o = cam.clone().sub(look), r = o.length(), yaw = Math.atan2(o.x, o.z) + orbit.yaw, pit = Math.min(1.45, Math.max(.02, Math.asin(o.y / r) + orbit.pitch));
    return new T.Vector3(Math.sin(yaw) * Math.cos(pit) * r, Math.sin(pit) * r, Math.cos(yaw) * Math.cos(pit) * r).add(look);
  };
  const moodNow = { bg: new T.Color(MOODS[0].bg), glow: new T.Color(MOODS[0].glow), tint: new T.Color(...MOODS[0].tint) }, moodTo = { bg: new T.Color(), glow: new T.Color(), tint: new T.Color() };
  scene.background = moodNow.bg; scene.fog.color = moodNow.bg;
  let rack = 0;

  /* ---------- loop ---------- */
  const clock = new T.Clock();
  const sway = new T.Vector3();
  let fovBoost = 0;
  function frame() {
    const t = clock.getElapsedTime();
    const animT = motionEnabled ? (reduced ? t * .3 : t) : 0;
    const nowMs = performance.now();
    scenes.forEach((s, i) => {
      const show = i === active || (flight && i === prevActive) || active >= anchors.length;
      s.group.visible = show; s.floor.visible = show;
      if (show && s.group.userData.tick) s.group.userData.tick(animT);
      // scan-line materialise: geometry appears below a rising cyan plane
      const k = s.revealAt < 0 ? 0 : s.revealAt === 0 ? 1 : Math.min(1, Math.max(0, (nowMs - s.revealAt) / 1900));
      const e = 1 - Math.pow(1 - k, 2.2), y = s.y0 + (s.y1 - s.y0) * e;
      s.clip.constant = k >= 1 ? 1e5 : (s.revealAt < 0 ? s.y0 - 50 : y);
      s.scan.visible = show && k > 0 && k < 1; s.scan.position.y = y;
      s.scan.material.opacity = Math.sin(k * Math.PI) * .12; s.scanEdge.material.opacity = Math.sin(k * Math.PI) * .9;
    });
    pathPulses.userData.tick(animT);

    if (flight) {
      const k = Math.min(1, (performance.now() - flight.t0) / flight.dur); const e = ease(k);
      camera.position.copy(flight.curve.getPoint(e));
      camLook.lerpVectors(flight.from.look, flight.to.look, ease(Math.min(1, k * 1.15)));
      fovBoost = Math.sin(k * Math.PI) * 5.5; rack = Math.sin(k * Math.PI) * .8;
      litU = litFrom + (litTo - litFrom) * e;
      if (k >= 1) { flight = null; api.onArrive && api.onArrive(active); }
    } else {
      fovBoost *= .9; rack *= .93;
      const s = shots[active];
      const pointerScale = motionEnabled ? 1 : 0;
      sway.set(pointer.x * .75 * pointerScale, -pointer.y * .5 * pointerScale, 0).add(new T.Vector3(Math.sin(animT * .24) * .16, Math.sin(animT * .19) * .1, 0));
      orbit.yaw += (orbit.ty - orbit.yaw) * .08; orbit.pitch += (orbit.tp - orbit.pitch) * .08;
      camera.position.lerp(orbited(camFor(s), s.look).add(sway), orbit.drag ? .16 : .045);
      camLook.lerp(s.look, .06);
    }
    const narrowPortrait = innerWidth / innerHeight <= 1;
    camera.fov = (narrowPortrait ? 58 : 42) + fovBoost; camera.updateProjectionMatrix();
    camera.lookAt(camLook);

    const atFinale = active === shots.length - 1;
    yearLabels.forEach((l) => { l.material.opacity += ((atFinale ? 1 : 0) - l.material.opacity) * .05; l.visible = l.material.opacity > .02; });
    const fogTarget = atFinale ? .008 : .012;
    scene.fog.density += (fogTarget - scene.fog.density) * .03;

    const idx = lit.geometry.index.count; const per = 6 * 6;
    lit.geometry.setDrawRange(0, Math.floor((litU * idx) / per) * per);
    head.position.copy(path.getPointAt(Math.min(.999, Math.max(.001, litU))));
    head.material.opacity = .76 + .24 * Math.sin(animT * 4);
    stars.rotation.z = animT * .002;

    const m = MOODS[Math.min(active, MOODS.length - 1)];
    moodTo.bg.setHex(m.bg); moodTo.glow.setHex(m.glow); moodTo.tint.setRGB(...m.tint);
    moodNow.bg.lerp(moodTo.bg, .035); moodNow.glow.lerp(moodTo.glow, .035); moodNow.tint.lerp(moodTo.tint, .035);
    if (cinema.ok) {
      const u = cinema.u, narrowNow = innerWidth <= 900 || innerWidth / innerHeight <= 1;
      const focus = camera.position.distanceTo(camLook);
      u.focus.value = focus; u.band.value = focus * .3; u.ramp.value = focus * 1.5; u.rack.value = rack; u.time.value = t;
      u.glow.value.copy(moodNow.glow); u.tint.value.copy(moodNow.tint);
      u.centre.value.set(narrowNow ? .5 : .64, narrowNow ? .68 : .5);
      u.dof.value = motionEnabled || !reduced ? .9 : .6;
    }
    cinema.render(scene, camera);
    api.onFrame && api.onFrame(project);
    requestAnimationFrame(frame);
  }

  // first frame placement
  camera.position.copy(shots[0].cam).add(new T.Vector3(0, 40, 90)); camLook.copy(shots[0].look);
  const _v = new T.Vector3();
  function project(i, name) {
    const o = scenes[i] && scenes[i].pins && scenes[i].pins[name]; if (!o) return null;
    o.getWorldPosition(_v); _v.project(camera);
    return { x: (_v.x + 1) / 2 * innerWidth, y: (1 - _v.y) / 2 * innerHeight, ok: _v.z < 1 && Math.abs(_v.x) < 1.15 && Math.abs(_v.y) < 1.15 };
  }
  const api = { flyTo, start: () => requestAnimationFrame(frame), renderer, project };
  return api;
}

/* ------------------------------------------------------------------
   BOOT
------------------------------------------------------------------- */
const bootBar = $('#boot-bar'), bootLine = $('#boot-line'), bootYear = $('#boot-year');
const lines = ['PREPARING THE EXHIBITS', 'LIGHTING THE BENCH', 'WIRING THE HOME', 'FOCUSING THE LENS', 'READY'];
let bl = 0, by = 2013;
const bootTick = setInterval(() => { bl = Math.min(lines.length - 1, bl + 1); bootLine.textContent = lines[bl]; bootBar.style.width = `${(bl / (lines.length - 1)) * 100}%`; }, 300);
const yearTick = setInterval(() => { if (by < 2026) bootYear.textContent = ++by; }, 95);

const fontsReady = Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 1800))]);
fontsReady.then(() => {
  // make sure the canvas label fonts are actually loaded before drawing them
  const loads = document.fonts ? Promise.all(['500 64px "JetBrains Mono"', '700 64px "Space Grotesk"', '500 52px "Space Grotesk"', '500 24px "DM Sans"', '400 60px "Instrument Serif"', 'italic 400 60px "Instrument Serif"'].map((f) => document.fonts.load(f).catch(() => {}))) : Promise.resolve();
  return Promise.race([loads, new Promise((r) => setTimeout(r, 1500))]);
}).then(() => {
  world = createWorld();
  const startKey = location.hash.slice(1);
  const startIdx = Math.max(0, CHAPTERS.findIndex((c) => c.key === startKey));
  if (world) { world.onArrive = armCallouts; world.onFrame = updateCallouts; world.start(); }
  else setInterval(() => { if (!coArmed && cur >= 0) armCallouts(cur); }, 500);
  setTimeout(() => {
    const finish = () => {
      clearInterval(bootTick); clearInterval(yearTick); bootYear.textContent = '2026'; bootLine.textContent = 'READY'; bootBar.style.width = '100%';
      $('#boot').classList.add('done');
      go(startIdx);
    };
    setTimeout(finish, Math.max(0, (2026 - by) * 95 + 260));
  }, 500);
});
