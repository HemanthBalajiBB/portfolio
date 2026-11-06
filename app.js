import * as T from './assets/three.module.js';

/* ------------------------------------------------------------------
   CONTENT — edit career facts here.
   Dates come from Hemanth's CV. The Honeywell Technology Solutions
   Labs dates are printed incorrectly on the CV (it repeats Nov 2018 –
   Oct 2020), so 2015 – 2018 is inferred from the gap between BPL and
   Resideo. Correct `range` below if needed.
------------------------------------------------------------------- */
const CHAPTERS = [
  {
    key: 'start', rail: 'START', short: '●', sector: 'ORIGIN · 2013 → 2026',
    kicker: 'THIRTEEN YEARS · ONE CONNECTED JOURNEY',
    title: ['From a circuit board', 'to the <em>phone in your hand.</em>'],
    body: 'I’m Hemanth Balaji — a quality engineer who has spent 13 years proving that devices, cloud and apps work together.',
    cta: 'Begin the journey',
    callouts: [
      { pin: 'a', dir: 'ne', big: '13', k: 'YEARS IN QUALITY', t: 'Devices, cloud and apps — proven to work together.' },
      { pin: 'b', dir: 'e', big: '5', k: 'ROLES', t: 'From validation engineer to mobile QA owner.' },
      { pin: 'c', dir: 'se', big: '4', k: 'FLAGSHIP APPS', t: 'First Alert, Resideo Pro, Honeywell Home, Total Connect.' },
      { pin: 'd', dir: 'sw', big: '5', k: 'AWARDS', t: 'Gold, silver and bronze at Resideo / Honeywell Home.', accent: 'amber' },
    ],
  },
  {
    key: '2013', rail: '2013', short: '13', sector: 'BPL TECHNO VISION · BANGALORE',
    year: '2013', kicker: 'CHAPTER 01 · THE FOUNDATION',
    title: ['It started with', 'a <em>signal.</em>'],
    company: 'BPL Techno Vision', role: 'QA / Validation Engineer', range: 'APR 2013 — APR 2015', place: 'Bangalore, India',
    body: 'Before apps and clouds there was hardware — and the discipline of proving it behaves exactly as designed.',
    callouts: [
      { pin: 'mcu', dir: 'ne', k: 'MCU · SPEC VALIDATION', t: 'Validated embedded systems and software against design specifications.' },
      { pin: 'mem', dir: 'sw', k: 'MEM · DEFECT TRACE', t: 'Tracked and verified defects across the full SDLC.' },
      { pin: 'pwr', dir: 'se', k: 'PWR · REGRESSION', t: 'Contributed to the core regression suites behind product releases.' },
      { pin: 'scope', dir: 'nw', k: 'ORIGIN · DIPLOMA', t: 'Electronics & Communication — where the signal began.', accent: 'amber' },
    ],
  },
  {
    key: '2015', rail: '2015', short: '15', sector: 'HONEYWELL TECHNOLOGY SOLUTIONS LABS',
    year: '2015', kicker: 'CHAPTER 02 · SYSTEMS AT SCALE',
    title: ['Then the systems', 'grew to <em>buildings.</em>'],
    company: 'Honeywell Technology Solutions Labs', role: 'Senior Software Engineer — Manual & Functional Testing', range: '2015 — 2018', place: 'Bangalore, India',
    body: 'Software that runs entire buildings. I learned to think in requirements, traceability and the edge cases nobody expects.',
    callouts: [
      { pin: 'hvac', dir: 'sw', k: 'HVAC · FUNCTIONAL', t: 'Functional and non-functional testing of building-automation software.' },
      { pin: 'sec', dir: 'e', k: 'SECURITY · SYSTEMS', t: 'Security-system software tested for the edge cases nobody expects.' },
      { pin: 'access', dir: 'se', k: 'TEST PLANS', t: 'System, integration and UAT test plans.' },
      { pin: 'antenna', dir: 'ne', k: 'RTM · COVERAGE', t: 'Requirement Traceability Matrix to guarantee release coverage.', accent: 'amber' },
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
    body: 'Leading the automation roadmap across iOS, Android and IoT — validating the whole chain from device to cloud to app.',
    callouts: [
      { pin: 'days', dir: 'sw', big: '25<i>→</i>10', k: 'DAYS · REGRESSION', t: 'per major release', accent: 'amber' },
      { pin: 'cov', dir: 'se', big: '30<i>→</i>60%', k: 'AUTOMATION COVERAGE', t: 'mobile & IoT', accent: 'amber' },
      { pin: 'gql', dir: 'ne', k: 'GRAPHQL', t: 'Test modules for queries, mutations and subscriptions.' },
      { pin: 'cloud', dir: 'n', k: 'HOMEKIT · ALEXA', t: 'End-to-end interoperability strategy.' },
      { pin: 'app', dir: 'e', k: 'BAMBOO CI/CD', t: 'Parallel mobile and API suites.' },
      { pin: 'mqtt', dir: 'nw', k: 'MQTT · TEAM LEAD', t: 'Mentored automation engineers on standards and quality gates.' },
    ],
  },
  {
    key: '2024', rail: '2024', short: '24', sector: 'CONNECTED-HOME PORTFOLIO',
    year: '2024', kicker: 'CHAPTER 05 · END-TO-END OWNERSHIP',
    title: ['Owning quality', '<em>end to end.</em>'],
    company: 'Resideo Technologies (Honeywell Home)', role: 'Advanced Engineer II — System Test', range: 'OCT 2024 — 2026', place: 'Bangalore, India',
    body: 'Next-gen mobile automation across the entire connected-home portfolio — from requirements and beta to UAT and release.',
    callouts: [
      { pin: 'ringE', dir: 'ne', k: 'FOUR APPS · APPIUM FLUTTER · XCUITEST', t: 'Flutter and native apps — B2C, B2B and EMEA — under one automation strategy.' },
      { pin: 'ringS', dir: 'se', k: 'AMPLITUDE', t: 'Behavioural analytics fed back into test design.', accent: 'amber' },
      { pin: 'ringW', dir: 'sw', k: 'TESTFLIGHT · PLAY', t: 'UAT through TestFlight and Play internal / closed testing.' },
    ],
  },
  {
    key: 'awards', rail: 'AWARDS', short: '★', sector: 'RECOGNITION',
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
    key: 'connect', rail: 'CONNECT', short: '→', sector: 'THE WHOLE JOURNEY',
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
      for (let j = n; j < text.length; j++) out += text[j] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
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
let callouts = [], coArmed = 0, coActive = 0, coCycleAt = 0;
const svgEl = (tag, cls, parent) => { const e = document.createElementNS(SVGNS, tag); e.setAttribute('class', cls); parent.appendChild(e); return e; };

function buildCallouts(i) {
  callouts.forEach((c) => { c.el.classList.add('gone'); c.g.classList.add('gone'); setTimeout(() => { c.el.remove(); c.g.remove(); }, 450); });
  callouts = []; coArmed = 0; coActive = 0;
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
  // resolve collisions between real label boxes (either side), pushing later ones down, then back up if they run off-screen
  const box = (p) => { const x0 = p.east ? p.lx : p.lx - 20 - p.c.w; return [x0 - 8, x0 + p.c.w + 28, p.ly - 14, p.ly - 8 + p.c.h + 10]; };
  const hit = (a, b) => a[0] < b[1] && b[0] < a[1] && a[2] < b[3] && b[2] < a[3];
  place.forEach((p) => { p.ly = Math.max(p.ly, minY); });
  const ord = place.slice().sort((p, q) => p.ly - q.ly);
  for (let k = 0; k < ord.length; k++) for (let pass = 0; pass < 3; pass++) for (let j = 0; j < k; j++) { const A = box(ord[j]), B = box(ord[k]); if (hit(A, B)) ord[k].ly = A[3] + 14; }
  for (let k = ord.length - 1; k >= 0; k--) {
    const over = ord[k].ly - 8 + ord[k].c.h - maxY;
    if (over > 0) { ord[k].ly -= over; for (let j = 0; j < k; j++) { const A = box(ord[k]), B = box(ord[j]); if (hit(A, B)) ord[j].ly = Math.min(ord[j].ly, A[2] - ord[j].c.h - 6); } }
  }
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
  renderer.toneMappingExposure = 1.15;

  const scene = new T.Scene();
  scene.background = new T.Color(0x03060a);
  scene.fog = new T.FogExp2(0x03060a, 0.012);
  const camera = new T.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 2000);

  scene.add(new T.AmbientLight(0x6688aa, 0.7));
  const key = new T.DirectionalLight(0xbfe8ff, 1.4); key.position.set(10, 20, 12); scene.add(key);
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

  function homeAppScreen(g, w, h) {
    const bg = g.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#0d2a33'); bg.addColorStop(1, '#071318');
    g.fillStyle = bg; g.fillRect(0, 0, w, h);
    g.fillStyle = '#9fefe6'; g.font = monoFont(20); g.fillText('MY HOME', 40, 90);
    g.fillStyle = '#e9f3f7'; g.font = uiFont(54); g.fillText('21.5°', 40, 170);
    g.fillStyle = '#8ea3ad'; g.font = uiFont(24, 400); g.fillText('Living room · heating', 40, 210);
    const tiles = [['THERMOSTAT', 'On'], ['CAMERA', 'Live'], ['LEAK SENSOR', 'Dry'], ['SMOKE / CO', 'OK']];
    tiles.forEach(([a, b], i) => {
      const x = 40 + (i % 2) * 222, y = 270 + Math.floor(i / 2) * 200;
      g.fillStyle = 'rgba(95,242,224,.08)'; g.fillRect(x, y, 200, 176);
      g.strokeStyle = 'rgba(95,242,224,.35)'; g.lineWidth = 2; g.strokeRect(x, y, 200, 176);
      g.fillStyle = '#8ea3ad'; g.font = monoFont(15); g.fillText(a, x + 18, y + 40);
      g.fillStyle = '#e9f3f7'; g.font = uiFont(40); g.fillText(b, x + 18, y + 120);
    });
    g.fillStyle = '#ffb45c'; g.fillRect(40, 720, w - 80, 4);
    g.fillStyle = '#8ea3ad'; g.font = monoFont(16); g.fillText('ALL DEVICES SYNCED ✓', 40, 780);
  }
  function journeyScreen(g, w, h) {
    const bg = g.createLinearGradient(0, 0, w, h); bg.addColorStop(0, '#132b31'); bg.addColorStop(.6, '#0a171c'); bg.addColorStop(1, '#1c160c');
    g.fillStyle = bg; g.fillRect(0, 0, w, h);
    g.fillStyle = '#8ea3ad'; g.font = monoFont(17); g.fillText('MOBILE EXPERIENCE', 40, 100);
    g.fillStyle = '#ffb45c'; g.beginPath(); g.arc(w - 50, 94, 7, 0, 7); g.fill();
    g.fillStyle = '#f2ece0'; g.font = uiFont(62); ['Every', 'journey.', 'Every detail.'].forEach((l, i) => g.fillText(l, 40, 200 + i * 70));
    [['01', 'Explore', 'Clarity at the first touch'], ['02', 'Interact', 'Consistent on iOS & Android'], ['03', 'Complete', 'Confidence in the outcome']].forEach(([n, a, b], i) => {
      const y = 460 + i * 130;
      g.strokeStyle = 'rgba(255,255,255,.12)'; g.lineWidth = 2; g.beginPath(); g.moveTo(40, y - 40); g.lineTo(w - 40, y - 40); g.stroke();
      g.fillStyle = '#6f8189'; g.font = monoFont(16); g.fillText(n, 40, y + 10);
      g.fillStyle = '#f2ece0'; g.font = uiFont(32); g.fillText(a, 96, y + 10);
      g.fillStyle = '#8ea3ad'; g.font = uiFont(20, 400); g.fillText(b, 96, y + 44);
      g.fillStyle = '#ffb45c'; g.font = uiFont(30); g.fillText('✓', w - 70, y + 14);
    });
    g.strokeStyle = 'rgba(255,180,92,.5)'; g.strokeRect(40, 860, w - 80, 74);
    g.fillStyle = '#f2ece0'; g.font = uiFont(26); g.fillText('iOS', 80, 907); g.fillText('Android', w - 190, 907);
    g.fillStyle = '#ffb45c'; g.fillText('↔', w / 2 - 14, 907);
    g.fillStyle = '#5c6b70'; g.font = monoFont(12); g.fillText('ILLUSTRATIVE — NOT THE VERIVOX APP UI', 70, 990);
  }
  function testRunScreen(g, w, h) {
    g.fillStyle = '#07161a'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#5ff2e0'; g.font = monoFont(40);
    for (let i = 0; i < 9; i++) { g.globalAlpha = .25 + (i % 3) * .2; g.fillRect(40, 120 + i * 90, (w - 80) * (.4 + ((i * 37) % 50) / 100), 34); }
    g.globalAlpha = 1;
  }

  /* ---------- scenes ---------- */
  const scenes = [];
  const pinAt = (pins, name, parent, x = 0, y = 0, z = 0) => { const o = new T.Object3D(); o.position.set(x, y, z); parent.add(o); pins[name] = o; return o; };

  function sceneIntro() {
    const g = new T.Group();
    const core = new T.Mesh(new T.IcosahedronGeometry(2.3, 1), new T.MeshStandardMaterial({ color: 0x0b2a30, emissive: 0x06363a, metalness: .7, roughness: .25, flatShading: true }));
    g.add(core); const coreEdges = H.edges(new T.IcosahedronGeometry(2.32, 1), COL.cyan, .9); g.add(coreEdges);
    const shell = H.edges(new T.IcosahedronGeometry(3.6, 2), COL.blue, .18); g.add(shell);
    g.add(H.glow(COL.cyan, 9, .55));
    const rings = [];
    [[4.6, COL.cyan, .55], [5.6, COL.amber, .4], [6.8, COL.blue, .3]].forEach(([r, c, o], i) => {
      const ring = new T.Mesh(new T.TorusGeometry(r, .022, 8, 180), new T.MeshBasicMaterial({ color: c, transparent: true, opacity: o, blending: T.AdditiveBlending }));
      ring.rotation.set(Math.PI / 2 + i * .35, i * .5, 0); g.add(ring); rings.push(ring);
      const bead = H.glow(c, .9); ring.add(bead); bead.position.set(r, 0, 0);
    });
    const n = 1400, pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, r = 7 + Math.random() * 9; pos.set([Math.cos(a) * r, (Math.random() - .5) * 1.2 * (r / 8), Math.sin(a) * r], i * 3); }
    const disk = new T.Points(new T.BufferGeometry().setAttribute('position', new T.BufferAttribute(pos, 3)), new T.PointsMaterial({ color: COL.cyan, size: .07, transparent: true, opacity: .7, blending: T.AdditiveBlending, depthWrite: false }));
    disk.rotation.x = .25; g.add(disk);
    g.userData.tick = (t) => {
      core.rotation.y = coreEdges.rotation.y = t * .25; core.rotation.x = coreEdges.rotation.x = t * .12;
      shell.rotation.y = -t * .08; disk.rotation.y = t * .05;
      rings.forEach((r, i) => { r.rotation.z = t * (.3 + i * .12) * (i % 2 ? -1 : 1); });
    };
    const pins = {}; pinAt(pins, 'a', g, 1.6, 1.6, 1); pinAt(pins, 'b', g, 4.6, .2, 0); pinAt(pins, 'c', g, 2.2, -2.6, 2); pinAt(pins, 'd', g, -3.2, -2.2, 1.5);
    return { group: g, pins, cam: new T.Vector3(0, 1.5, 17), look: new T.Vector3(0, 0, 0) };
  }

  function scenePCB() {
    const g = new T.Group(); const ticks = [];
    const board = new T.Mesh(new T.BoxGeometry(13, .3, 8.5), new T.MeshStandardMaterial({ color: 0x06302c, metalness: .5, roughness: .45, emissive: 0x021c19 }));
    g.add(board); g.add(H.edges(board.geometry, COL.cyan, .55));
    // vias grid
    const vp = []; for (let x = -6; x <= 6; x += .5) for (let z = -4; z <= 4; z += .5) if (Math.random() < .18) vp.push(x, .16, z);
    g.add(new T.Points(new T.BufferGeometry().setAttribute('position', new T.Float32BufferAttribute(vp, 3)), new T.PointsMaterial({ color: 0xc8a04a, size: .07 })));
    const chipMat = new T.MeshStandardMaterial({ color: 0x0b1015, metalness: .6, roughness: .35 });
    const pinMat = new T.MeshStandardMaterial({ color: 0xbfc8cc, metalness: 1, roughness: .3 });
    const chips = [[0, 0, 2.8, 2.8, 'MCU'], [-4.3, -2.2, 1.8, 1.3, 'MEM'], [4.2, -2.3, 2, 1.3, 'PWR'], [-4.3, 2.3, 1.5, 1.5, 'RF'], [4.4, 2.4, 1.8, 1, 'UART']];
    chips.forEach(([x, z, w, d, name]) => {
      const m = new T.Mesh(new T.BoxGeometry(w, .38, d), chipMat); m.position.set(x, .34, z); g.add(m);
      const e = H.edges(m.geometry, COL.cyan, .5); e.position.copy(m.position); g.add(e);
      const pins = Math.round(w * 3);
      for (let k = 0; k < pins; k++) for (const s of [-1, 1]) {
        const p = new T.Mesh(new T.BoxGeometry(.07, .05, .26), pinMat); p.position.set(x - w / 2 + (k + .5) * (w / pins), .18, z + s * (d / 2 + .1)); g.add(p);
      }
      const l = H.text(name, { size: name === 'MCU' ? .6 : .38, color: '#9fefe6' }); l.position.set(x, .9, z); g.add(l);
    });
    // traces with signals
    const y = .17;
    const routes = [
      [[1.4, 0], [2.6, 0], [2.6, -2.3], [3.2, -2.3]],
      [[-1.4, .5], [-2.6, .5], [-2.6, 2.3], [-3.55, 2.3]],
      [[-1.4, -.6], [-2.8, -.6], [-2.8, -2.2], [-3.4, -2.2]],
      [[.6, 1.4], [.6, 2.4], [3.5, 2.4]],
      [[-.6, -1.4], [-.6, -3.4], [3, -3.4], [3, -2.95]],
      [[1.4, .8], [2, .8], [2, 3.6], [-3, 3.6], [-3, 3.05]],
    ];
    routes.forEach((r, i) => {
      const pts = r.map(([x, z]) => new T.Vector3(x, y, z));
      g.add(H.line(pts, i % 2 ? COL.amber : COL.cyan, .75));
      const path = new T.CurvePath(); for (let k = 0; k < pts.length - 1; k++) path.add(new T.LineCurve3(pts[k], pts[k + 1]));
      const p = H.pulses(path, i % 2 ? COL.amber : COL.cyan, 2, .28 + i * .03, .5); g.add(p); ticks.push(p.userData.tick);
    });
    // oscilloscope wave
    const wn = 160, wpos = new Float32Array(wn * 3);
    const wave = new T.Line(new T.BufferGeometry().setAttribute('position', new T.BufferAttribute(wpos, 3)), new T.LineBasicMaterial({ color: COL.cyan, transparent: true, opacity: .95, blending: T.AdditiveBlending }));
    wave.position.set(0, 3.6, -2.2); g.add(wave);
    const frame = H.edges(new T.PlaneGeometry(9, 2.6), COL.cyan, .25); frame.position.copy(wave.position); g.add(frame);
    const sig = H.text('SIGNAL · VALIDATED ✓', { size: .34, color: '#ffb45c' }); sig.position.set(2.7, 5.25, -2.2); g.add(sig);
    ticks.push((t) => {
      for (let i = 0; i < wn; i++) {
        const x = -4.4 + (i / (wn - 1)) * 8.8;
        const sq = Math.sign(Math.sin(x * 2.2 - t * 3));
        wpos[i * 3] = x; wpos[i * 3 + 1] = (x < 0 ? Math.sin(x * 3 - t * 4) * .7 : sq * .55) * (1 - Math.abs(x) / 6);
        wpos[i * 3 + 2] = 0;
      }
      wave.geometry.attributes.position.needsUpdate = true;
    });
    g.rotation.y = -.35;
    g.userData.tick = (t) => ticks.forEach((f) => f(t));
    const pins = {}; pinAt(pins, 'mcu', g, .9, .55, -.9); pinAt(pins, 'mem', g, -4.3, .55, -2.2); pinAt(pins, 'pwr', g, 4.2, .55, -2.3); pinAt(pins, 'scope', g, -3.6, 3.6, -2.2);
    return { group: g, pins, cam: new T.Vector3(1.5, 8.5, 12.5), look: new T.Vector3(0, 1, 0) };
  }

  function sceneBuilding() {
    const g = new T.Group(); const inner = new T.Group(); inner.position.y = -4.4; g.add(inner);
    const floors = 8, fw = 7, fd = 5, fh = 1.1; const slabs = [];
    for (let i = 0; i < floors; i++) {
      const slab = new T.Mesh(new T.BoxGeometry(fw, .1, fd), new T.MeshStandardMaterial({ color: 0x0c1c27, transparent: true, opacity: .55, metalness: .3, roughness: .6 }));
      slab.position.y = i * fh; inner.add(slab);
      const e = H.edges(slab.geometry, COL.cyan, .28); e.position.y = i * fh; inner.add(e); slabs.push(e);
      // windows
      const win = H.edges(new T.BoxGeometry(fw - .02, fh - .2, fd - .02, 7, 1, 5), COL.blue, .07); win.position.y = i * fh + fh / 2; inner.add(win);
    }
    const roof = H.edges(new T.BoxGeometry(fw, .1, fd), COL.cyan, .6); roof.position.y = floors * fh; inner.add(roof);
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sz]) => inner.add(H.line([new T.Vector3(sx * fw / 2, 0, sz * fd / 2), new T.Vector3(sx * fw / 2, floors * fh, sz * fd / 2)], COL.cyan, .5)));
    const antenna = H.line([new T.Vector3(1.5, floors * fh, 0), new T.Vector3(1.5, floors * fh + 2, 0)], COL.amber, .8); inner.add(antenna);
    const beacon = H.glow(COL.red, .9); beacon.position.set(1.5, floors * fh + 2, 0); inner.add(beacon);
    // scan plane
    const scan = new T.Mesh(new T.PlaneGeometry(fw + 1.2, fd + 1.2), new T.MeshBasicMaterial({ color: COL.cyan, transparent: true, opacity: .1, blending: T.AdditiveBlending, side: T.DoubleSide, depthWrite: false }));
    scan.rotation.x = -Math.PI / 2; inner.add(scan);
    const scanEdge = H.edges(new T.PlaneGeometry(fw + 1.2, fd + 1.2), COL.cyan, .8); scanEdge.rotation.x = -Math.PI / 2; inner.add(scanEdge);
    // sensors
    const sensors = [];
    for (let i = 0; i < 14; i++) {
      const s = H.glow(i % 3 ? COL.amber : COL.cyan, .55); s.position.set((Math.random() - .5) * fw * .9, Math.floor(Math.random() * floors) * fh + .5, (Math.random() > .5 ? 1 : -1) * fd / 2);
      inner.add(s); sensors.push([s, Math.random() * 6]);
    }
    // labels
    const pins = {};
    [['hvac', -fw / 2, 1.5, fd / 2], ['access', fw / 2, 3.7, fd / 2], ['sec', fw / 2, 7.4, fd / 2], ['antenna', 1.5, floors * fh + 2, 0]].forEach(([n, x, y, z]) => {
      pinAt(pins, n, inner, x, y, z);
      if (n !== 'antenna') { const s = H.glow(COL.cyan, .9); s.position.set(x, y, z); inner.add(s); }
    });
    // radar ring
    const radar = new T.Group(); inner.add(radar); radar.position.y = -.05;
    radar.add(new T.Mesh(new T.RingGeometry(6.4, 6.46, 96), new T.MeshBasicMaterial({ color: COL.cyan, transparent: true, opacity: .45, side: T.DoubleSide })).rotateX(-Math.PI / 2));
    radar.add(new T.Mesh(new T.RingGeometry(8, 8.03, 96), new T.MeshBasicMaterial({ color: COL.blue, transparent: true, opacity: .25, side: T.DoubleSide })).rotateX(-Math.PI / 2));
    const sweep = new T.Mesh(new T.CircleGeometry(6.4, 48, 0, .5), new T.MeshBasicMaterial({ color: COL.cyan, transparent: true, opacity: .12, blending: T.AdditiveBlending, side: T.DoubleSide, depthWrite: false }));
    sweep.rotation.x = -Math.PI / 2; radar.add(sweep);
    g.userData.tick = (t) => {
      const sy = ((t * .22) % 1) * floors * fh; scan.position.y = scanEdge.position.y = sy;
      slabs.forEach((e, i) => { const d = Math.abs(i * fh - sy); e.material.opacity = .22 + Math.max(0, 1 - d / 1.2) * .75; });
      sensors.forEach(([s, ph]) => { s.material.opacity = .35 + .65 * Math.max(0, Math.sin(t * 2 + ph)); });
      beacon.material.opacity = (Math.sin(t * 4) > 0) ? 1 : .2;
      sweep.rotation.z = -t * 1.2; g.rotation.y = Math.sin(t * .15) * .25 - .35;
    };
    return { group: g, pins, cam: new T.Vector3(0, 2.5, 19), look: new T.Vector3(0, 0, 0) };
  }

  function sceneHome() {
    const g = new T.Group(); const ticks = [];
    const house = new T.Group(); g.add(house); house.position.set(-2.2, -1.8, 0);
    const base = new T.Mesh(new T.BoxGeometry(7, .2, 5), new T.MeshStandardMaterial({ color: 0x0e1d26, metalness: .3, roughness: .6 })); house.add(base);
    const walls = H.edges(new T.BoxGeometry(7, 3.2, 5), COL.cyan, .55); walls.position.y = 1.7; house.add(walls);
    const mid = H.edges(new T.BoxGeometry(7, .05, 5), COL.cyan, .25); mid.position.y = 1.7; house.add(mid);
    const tri = new T.Shape(); tri.moveTo(-3.8, 0); tri.lineTo(0, 2.2); tri.lineTo(3.8, 0); tri.lineTo(-3.8, 0);
    const roofGeo = new T.ExtrudeGeometry(tri, { depth: 5.4, bevelEnabled: false }); roofGeo.translate(0, 0, -2.7);
    const roof = H.edges(roofGeo, COL.amber, .7); roof.position.y = 3.3; house.add(roof);
    const glass = new T.Mesh(new T.BoxGeometry(6.96, 3.16, 4.96), new T.MeshStandardMaterial({ color: 0x0b2630, transparent: true, opacity: .18, metalness: .2, roughness: .1, depthWrite: false })); glass.position.y = 1.7; house.add(glass);
    const devices = [['THERMOSTAT', -2.4, 1.1, -2.5, COL.amber], ['CAMERA', 2.9, 3, -2.5, COL.red], ['LEAK SENSOR', 1.2, .25, 1.6, COL.cyan], ['SMOKE / CO', -.6, 3.2, .4, COL.white]];
    const phone = H.phone(3.4, screenTexture(homeAppScreen)); phone.position.set(5.6, 1, 2.2); phone.rotation.set(-.08, -.5, .06); g.add(phone);
    const phoneAnchor = new T.Vector3(5.2, 1.4, 2.5);
    const pins = {}; pinAt(pins, 'phone', phone, .55, 1.1, .2);
    const devPin = { THERMOSTAT: 'thermo', 'LEAK SENSOR': 'leak' };
    devices.forEach(([n, x, y, z, c], i) => {
      const p = new T.Vector3(x, y, z).add(house.position);
      const s = H.glow(c, 1.1); s.position.copy(p); g.add(s);
      if (devPin[n]) pinAt(pins, devPin[n], g, p.x, p.y, p.z);
      const core = new T.Mesh(new T.SphereGeometry(.13, 16, 16), new T.MeshBasicMaterial({ color: c })); core.position.copy(p); g.add(core);
      const l = H.text(n, { size: .33, color: '#cfe9ee' }); l.position.copy(p).add(new T.Vector3(0, .55, 0)); g.add(l);
      const curve = new T.QuadraticBezierCurve3(p, p.clone().lerp(phoneAnchor, .5).add(new T.Vector3(0, 3 + i * .5, 0)), phoneAnchor);
      g.add(H.line(curve.getPoints(40), c, .35));
      const pu = H.pulses(curve, c, 2, .35 + i * .05, .45); g.add(pu); ticks.push(pu.userData.tick);
    });
    // device farm
    const farm = new T.Group(); farm.position.set(1, 3.5, -7.5); g.add(farm);
    const farmScreens = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) {
      const p = H.phone(1.5, null); p.position.set((c - 2.5) * 1.25, (r - 1) * 1.8, 0); farm.add(p);
      farmScreens.push([p.userData.screen.material, Math.random() * 10]);
    }
    pinAt(pins, 'farm', farm, 3.1, 1.8, 0);
    const cA = new T.Color(0x0a2a30), cB = new T.Color(COL.cyan), cC = new T.Color(COL.green);
    ticks.push((t) => {
      farmScreens.forEach(([m, ph]) => { const k = (t * .6 + ph) % 3; m.color.copy(k < 1.6 ? cA.clone().lerp(cB, .25 + .25 * Math.sin(t * 6 + ph)) : k < 2.4 ? cC : cA); });
      phone.position.y = 1 + Math.sin(t * 1.2) * .15;
    });
    g.userData.tick = (t) => ticks.forEach((f) => f(t));
    return { group: g, pins, cam: new T.Vector3(3, 4.5, 17), look: new T.Vector3(.5, 1, 0) };
  }

  function sceneArch() {
    const g = new T.Group(); const ticks = [];
    const P = { dev: new T.Vector3(-9, 0, 0), mqtt: new T.Vector3(-4.6, 1.8, 0), cloud: new T.Vector3(0, 3.2, 0), gql: new T.Vector3(4.6, 1.8, 0), app: new T.Vector3(9, 0, 0) };
    const dev = new T.Mesh(new T.BoxGeometry(1.5, 1.5, 1.5), new T.MeshStandardMaterial({ color: 0x1a140c, metalness: .6, roughness: .3 })); dev.position.copy(P.dev); g.add(dev);
    const devE = H.edges(dev.geometry, COL.amber, .9); devE.position.copy(P.dev); g.add(devE); { const gl = H.glow(COL.amber, 3, .4); gl.position.copy(P.dev); g.add(gl); }
    const mq = new T.Mesh(new T.TorusGeometry(1, .07, 12, 64), new T.MeshBasicMaterial({ color: COL.cyan })); mq.position.copy(P.mqtt); g.add(mq);
    const mq2 = new T.Mesh(new T.TorusGeometry(.65, .04, 12, 64), new T.MeshBasicMaterial({ color: COL.cyan, transparent: true, opacity: .6 })); mq2.position.copy(P.mqtt); g.add(mq2);
    const cloud = new T.Group(); cloud.position.copy(P.cloud); g.add(cloud);
    [[0, 0, 0, 1.5], [-1.4, -.3, .2, 1], [1.4, -.3, -.1, 1.1], [.5, .8, -.5, .9], [-.6, .7, .6, .8]].forEach(([x, y, z, r]) => { const e = H.edges(new T.IcosahedronGeometry(r, 1), COL.cyan, .55); e.position.set(x, y, z); cloud.add(e); });
    cloud.add(H.glow(COL.cyan, 6, .35));
    const hex = H.edges(new T.CylinderGeometry(1.15, 1.15, .2, 6), COL.blue, 1); hex.rotation.x = Math.PI / 2; hex.position.copy(P.gql); g.add(hex);
    const hexIn = H.line([0, 1, 2, 0].map((k) => new T.Vector3(Math.cos(k * 2.094 + Math.PI / 2) * .75, Math.sin(k * 2.094 + Math.PI / 2) * .75, 0).add(P.gql)), COL.blue, .9); g.add(hexIn);
    const app = H.phone(2.8, screenTexture(testRunScreen)); app.position.copy(P.app); app.rotation.y = -.35; g.add(app);
    [['DEVICE', P.dev], ['APP', P.app]].forEach(([n, p]) => { const l = H.text(n, { size: .42, color: '#e9f3f7' }); l.position.copy(p).add(new T.Vector3(0, n === 'APP' ? -2 : n === 'CLOUD' ? 2.3 : -1.55, 0)); g.add(l); });
    const order = [P.dev, P.mqtt, P.cloud, P.gql, P.app];
    for (let i = 0; i < order.length - 1; i++) {
      const a = order[i], b = order[i + 1];
      const curve = new T.QuadraticBezierCurve3(a, a.clone().lerp(b, .5).add(new T.Vector3(0, 1.2, 1.2)), b);
      g.add(H.line(curve.getPoints(40), i < 2 ? COL.amber : COL.cyan, .5));
      const pu = H.pulses(curve, i < 2 ? COL.amber : COL.cyan, 3, .32, .55); g.add(pu); ticks.push(pu.userData.tick);
    }
    // metrics
    const bars = new T.Group(); bars.position.set(0, -4.2, 2.5); g.add(bars);
    const ghostMat = new T.MeshBasicMaterial({ color: COL.amber, transparent: true, opacity: .14, depthWrite: false });
    const mk = (x, c) => { const m = new T.Mesh(new T.BoxGeometry(1.1, 1, 1.1), new T.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: .55, metalness: .2, roughness: .4 })); m.position.x = x; bars.add(m); return m; };
    const ghost25 = new T.Mesh(new T.BoxGeometry(1.1, 5, 1.1), ghostMat); ghost25.position.set(-3.2, 2.5, 0); bars.add(ghost25);
    { const e = H.edges(ghost25.geometry, COL.amber, .5); e.position.copy(ghost25.position); bars.add(e); }
    const days = mk(-3.2, COL.cyan); const cov = mk(3.2, COL.cyan);
    const ghost30 = new T.Mesh(new T.BoxGeometry(1.1, 3, 1.1), ghostMat); ghost30.position.set(3.2, 1.5, 0); bars.add(ghost30);
    { const e = H.edges(ghost30.geometry, COL.amber, .5); e.position.copy(ghost30.position); bars.add(e); }
    const pins = {}; Object.entries(P).forEach(([k, v]) => pinAt(pins, k === 'dev' ? 'device' : k, g, v.x, v.y, v.z));
    pins.app.position.y += 1.2; pins.cloud.position.y += 1.3;
    pinAt(pins, 'days', bars, -3.2, 1, .6); pinAt(pins, 'cov', bars, 3.2, 3, .6);
    const plate = H.edges(new T.BoxGeometry(11, .05, 3), COL.cyan, .25); plate.position.y = -.02; bars.add(plate);
    let since = 0;
    g.userData.onEnter = () => { since = performance.now(); };
    ticks.push((t) => {
      mq.rotation.x = t * 1.1; mq2.rotation.y = t * 1.6; cloud.rotation.y = t * .2; hex.rotation.y = t * .6; devE.rotation.y = dev.rotation.y = t * .4;
      const k = Math.min(1, Math.max(0, (performance.now() - since - 1400) / 1600)); const e = 1 - Math.pow(1 - k, 3);
      const dh = 5 - 3 * e; days.scale.y = dh; days.position.y = dh / 2;
      const ch = 3 + 3 * e; cov.scale.y = ch; cov.position.y = ch / 2;
    });
    g.userData.tick = (t) => ticks.forEach((f) => f(t));
    return { group: g, pins, cam: new T.Vector3(0, 3, 24), look: new T.Vector3(0, .2, 0) };
  }

  function scenePortfolio() {
    const g = new T.Group();
    const core = new T.Mesh(new T.IcosahedronGeometry(1.5, 3), new T.MeshStandardMaterial({ color: 0x0d3b40, emissive: 0x0b5f5a, emissiveIntensity: .8, metalness: .6, roughness: .2 })); g.add(core);
    g.add(H.edges(new T.IcosahedronGeometry(1.9, 1), COL.cyan, .6)); g.add(H.glow(COL.cyan, 8, .5));
    const ring = new T.Mesh(new T.TorusGeometry(6.5, .025, 8, 200), new T.MeshBasicMaterial({ color: COL.cyan, transparent: true, opacity: .45 })); ring.rotation.x = Math.PI / 2; g.add(ring);
    const ring2 = new T.Mesh(new T.TorusGeometry(8, .015, 8, 200), new T.MeshBasicMaterial({ color: COL.amber, transparent: true, opacity: .3 })); ring2.rotation.x = Math.PI / 2 + .12; g.add(ring2);
    const apps = [['FIRST ALERT', 'Flutter · B2C', 'Connected safety'], ['RESIDEO PRO', 'Flutter · B2B', 'Installer tooling'], ['HONEYWELL HOME', 'Native · B2C', 'Smart-home control'], ['TOTAL CONNECT', 'Native · EMEA', 'Heating & security']];
    const cards = apps.map(([a, b, c], i) => {
      const tex = screenTexture((x, w, h) => {
        const gr = x.createLinearGradient(0, 0, w, h); gr.addColorStop(0, 'rgba(14,44,52,.95)'); gr.addColorStop(1, 'rgba(6,14,20,.92)');
        x.fillStyle = gr; x.fillRect(0, 0, w, h); x.strokeStyle = i % 2 ? '#ffb45c' : '#5ff2e0'; x.lineWidth = 4; x.strokeRect(2, 2, w - 4, h - 4);
        x.fillStyle = i % 2 ? '#ffb45c' : '#5ff2e0'; x.font = monoFont(26); x.fillText(`0${i + 1}`, 34, 60);
        x.fillStyle = '#e9f3f7'; x.font = uiFont(52, 600); x.fillText(a, 34, 150);
        x.fillStyle = '#8ea3ad'; x.font = uiFont(30, 400); x.fillText(c, 34, 205);
        x.fillStyle = '#9fefe6'; x.font = monoFont(24); x.fillText(b.toUpperCase(), 34, 270);
      }, 640, 320);
      const m = new T.Mesh(new T.PlaneGeometry(4.2, 2.1), new T.MeshBasicMaterial({ map: tex, transparent: true, side: T.DoubleSide, toneMapped: false })); g.add(m);
      const d = H.glow(i % 2 ? COL.amber : COL.cyan, .8); g.add(d);
      return [m, d];
    });
    g.userData.tick = (t) => {
      core.rotation.y = t * .3;
      cards.forEach(([m, d], i) => {
        const a = t * .14 + i * Math.PI / 2;
        m.position.set(Math.cos(a) * 6.5, Math.sin(a * 2 + i) * .5 + .8, Math.sin(a) * 6.5);
        d.position.set(Math.cos(a) * 6.5, 0, Math.sin(a) * 6.5);
        m.lookAt(camera.position);
      });
    };
    const pins = {}; pinAt(pins, 'ringE', ring2, 8, 0, 0); pinAt(pins, 'ringS', ring2, 2.4, 7.6, 0); pinAt(pins, 'ringW', ring2, -7.4, 3, 0);
    return { group: g, pins, cam: new T.Vector3(0, 5, 18), look: new T.Vector3(0, .4, 0) };
  }

  function sceneAwards() {
    const g = new T.Group();
    const spec = [['GOLD', 0xffc857, 1.35], ['SILVER', 0xd5dee8, 1.05], ['SILVER', 0xd5dee8, 1.05], ['SILVER', 0xd5dee8, 1.05], ['BRONZE', 0xd08a55, 1]];
    const medals = []; const pins = {};
    const pl = new T.PointLight(0xfff0d0, 60, 30); pl.position.set(0, 4, 6); g.add(pl);
    const order = [3, 1, 0, 2, 4];
    spec.forEach(([n, c, r], i) => {
      const m = new T.Group(); const slot = order[i];
      const x = (slot - 2) * 3.4, y = slot === 2 ? 1 : (slot % 2 ? 0 : -.6);
      m.position.set(x, y, slot === 2 ? 1 : 0); m.userData.baseY = y;
      const disc = new T.Mesh(new T.CylinderGeometry(r, r, .18, 64), new T.MeshStandardMaterial({ color: c, metalness: 1, roughness: .22, emissive: c, emissiveIntensity: .12 }));
      disc.rotation.x = Math.PI / 2; m.add(disc);
      const rim = new T.Mesh(new T.TorusGeometry(r * .78, .04, 8, 64), new T.MeshStandardMaterial({ color: c, metalness: 1, roughness: .15 })); rim.position.z = .1; m.add(rim);
      const star = new T.Shape(); for (let k = 0; k < 10; k++) { const rr = k % 2 ? r * .22 : r * .5; const a = k * Math.PI / 5 + Math.PI / 2; k ? star.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : star.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); }
      const st = new T.Mesh(new T.ExtrudeGeometry(star, { depth: .06, bevelEnabled: false }), new T.MeshStandardMaterial({ color: c, metalness: 1, roughness: .3 })); st.position.z = .09; m.add(st);
      const rib = new T.Mesh(new T.PlaneGeometry(.5, 2.2), new T.MeshBasicMaterial({ color: slot === 2 ? COL.amber : COL.cyan, transparent: true, opacity: .55, side: T.DoubleSide }));
      rib.position.set(0, r + 1, -.05); m.add(rib);
      m.add(H.glow(c, r * 4, .22));
      g.add(m); medals.push([m, i]); pinAt(pins, 'm' + i, m, 0, 0, .25);
    });
    const floor = new T.Mesh(new T.RingGeometry(1, 9, 64), new T.MeshBasicMaterial({ color: COL.cyan, transparent: true, opacity: .05, side: T.DoubleSide })); floor.rotation.x = -Math.PI / 2; floor.position.y = -3.2; g.add(floor);
    { const e = H.edges(new T.RingGeometry(8.9, 9, 64), COL.cyan, .3); e.rotation.x = -Math.PI / 2; e.position.y = -3.2; g.add(e); }
    g.userData.tick = (t) => medals.forEach(([m, i]) => { m.rotation.y = Math.sin(t * .65 + i) * .42; m.position.y = m.userData.baseY + Math.sin(t * .85 + i * 1.7) * .08; });
    return { group: g, pins, cam: new T.Vector3(0, 1.2, 17), look: new T.Vector3(0, .3, 0) };
  }

  function sceneNow() {
    const g = new T.Group();
    const phone = H.phone(7, screenTexture(journeyScreen), 0x2a2620); phone.rotation.set(-.08, -.35, .08); g.add(phone);
    phone.add(H.glow(COL.amber, 10, .18));
    const twin = new T.Group(); twin.position.set(-3.6, -.4, -2.6); twin.rotation.set(0, .25, -.05); g.add(twin);
    const tw = H.phone(6, null, 0x101418); tw.userData.screen.material.color.set(0x0c1f24); twin.add(tw);
    const lt = H.text('ANDROID', { size: .4, color: '#9fefe6' }); lt.position.set(0, -3.5, 0); twin.add(lt);
    const li = H.text('iOS', { size: .4, color: '#ffb45c' }); li.position.set(.2, -4.1, .4); g.add(li);
    const chip = (s, x, y) => { const c = H.text(s, { size: .6, color: '#f2ece0', bg: 'rgba(40,32,20,.85)', border: 'rgba(255,180,92,.7)' }); c.position.set(x, y, 1.4); g.add(c); return c; };
    const c1 = chip('DETOX  ✓', 3.6, 2.2), c2 = chip('APPIUM  ✓', -3.4, -1.6);
    const orbit = new T.Mesh(new T.TorusGeometry(5.4, .02, 8, 200), new T.MeshBasicMaterial({ color: COL.amber, transparent: true, opacity: .4 })); orbit.rotation.set(1.2, .2, 0); g.add(orbit);
    const bead = H.glow(COL.amber, 1); orbit.add(bead); bead.position.x = 5.4;
    const orbit2 = new T.Mesh(new T.TorusGeometry(6.4, .015, 8, 200), new T.MeshBasicMaterial({ color: COL.cyan, transparent: true, opacity: .3 })); orbit2.rotation.set(1.4, -.4, 0); g.add(orbit2);
    g.userData.tick = (t) => {
      phone.position.y = Math.sin(t * .9) * .15; twin.position.y = -.4 + Math.sin(t * .9 + 1) * .12;
      c1.position.y = 2.2 + Math.sin(t * 1.4) * .15; c2.position.y = -1.6 + Math.sin(t * 1.4 + 2) * .15;
      orbit.rotation.z = t * .4; orbit2.rotation.z = -t * .25;
    };
    const pins = {}; pinAt(pins, 'phone', phone, 1.2, 2.4, .4); pinAt(pins, 'twin', tw, -.2, 2.7, .3); pins.chip = c2;
    return { group: g, pins, cam: new T.Vector3(1, .6, 15), look: new T.Vector3(0, 0, 0) };
  }

  const builders = [sceneIntro, scenePCB, sceneBuilding, sceneHome, sceneArch, scenePortfolio, sceneAwards, sceneNow];
  const anchors = builders.map((_, i) => new T.Vector3(Math.sin(i * 1.15) * 30, Math.sin(i * .8) * 7, -i * 75));
  const ZOOM = [1.1, 1.45, 1.45, 1.35, 1.4, 1.35, 1.35, 1.15]; // pull each camera back from its subject
  builders.forEach((b, i) => {
    const s = b(); s.group.position.copy(anchors[i]); scene.add(s.group);
    s.cam.sub(s.look).multiplyScalar(ZOOM[i]).add(s.look);
    s.cam.add(anchors[i]); s.look.add(anchors[i]); scenes.push(s);
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
  const stars = new T.Points(new T.BufferGeometry().setAttribute('position', new T.BufferAttribute(sp, 3)), new T.PointsMaterial({ color: 0x9cc8ff, size: .45, transparent: true, opacity: .75, depthWrite: false, fog: false, sizeAttenuation: true }));
  scene.add(stars);
  const grid = new T.GridHelper(900, 300, 0x1b5a63, 0x0d2a30); grid.position.set(0, -24, -280); grid.material.transparent = true; grid.material.opacity = .35; scene.add(grid);

  /* ---------- finale camera: look back over the whole journey ---------- */
  const box = new T.Box3(); anchors.forEach((a) => box.expandByPoint(a));
  const center = box.getCenter(new T.Vector3());
  // full circle: rewind past every chapter and land back at the origin, the lit timeline trailing behind
  const finale = { cam: anchors[0].clone().add(new T.Vector3(13, 6, 21)), look: anchors[0].clone().add(new T.Vector3(-2, -1.5, -8)) };
  const shots = [...scenes.map((s) => ({ cam: s.cam, look: s.look })), finale];

  /* ---------- camera flight ---------- */
  const camLook = new T.Vector3();
  let flight = null, active = 0, litU = 0, litFrom = 0, litTo = 0;
  const ease = (x) => x * x * x * (x * (x * 6 - 15) + 10);
  const warp = $('#warp');

  // portrait screens show the scene in a smaller window, so pull the camera further back
  const camFor = (s) => (innerWidth / innerHeight <= 1 ? s.look.clone().add(s.cam.clone().sub(s.look).multiplyScalar(1.32)) : s.cam);
  function flyTo(i, instant) {
    const to = { cam: camFor(shots[i]), look: shots[i].look };
    active = i; scenes[i] && scenes[i].group.userData.onEnter && scenes[i].group.userData.onEnter();
    litFrom = litU; litTo = i < anchors.length ? anchorU[i] : 1;
    if (i === shots.length - 1) litFrom = Math.max(litFrom, anchorU[anchors.length - 1]);
    if (instant || reduced || !motionEnabled) { camera.position.copy(to.cam); camLook.copy(to.look); camera.lookAt(camLook); flight = null; litU = litTo; warp.classList.remove('on'); api.onArrive && api.onArrive(i); return; }
    const from = { cam: camera.position.clone(), look: camLook.clone() };
    const dist = from.cam.distanceTo(to.cam);
    const mid = from.cam.clone().lerp(to.cam, .5).add(new T.Vector3(0, Math.min(11, dist * .07), Math.min(15, dist * .095)));
    flight = { t0: performance.now(), dur: Math.min(1950, 900 + dist * 3.4), from, to, curve: new T.QuadraticBezierCurve3(from.cam, mid, to.cam) };
    warp.classList.add('on');
  }

  /* ---------- sizing ---------- */
  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio, (w <= 900 || w / h <= 1) ? 1.25 : 1.65));
    renderer.setSize(w, h, false);
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
  addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') pointer.set(e.clientX / innerWidth - .5, e.clientY / innerHeight - .5); });

  /* ---------- loop ---------- */
  const clock = new T.Clock();
  const sway = new T.Vector3();
  let fovBoost = 0;
  function frame() {
    const t = clock.getElapsedTime();
    const animT = motionEnabled ? (reduced ? t * .3 : t) : 0;
    scenes.forEach((s, i) => { const near = flight || Math.abs(i - active) <= 1 || active >= anchors.length; if (near && s.group.userData.tick) s.group.userData.tick(animT); });
    pathPulses.userData.tick(animT);

    if (flight) {
      const k = Math.min(1, (performance.now() - flight.t0) / flight.dur); const e = ease(k);
      camera.position.copy(flight.curve.getPoint(e));
      camLook.lerpVectors(flight.from.look, flight.to.look, ease(Math.min(1, k * 1.15)));
      fovBoost = Math.sin(k * Math.PI) * 5.5;
      litU = litFrom + (litTo - litFrom) * e;
      if (k >= 1) { flight = null; warp.classList.remove('on'); api.onArrive && api.onArrive(active); }
    } else {
      fovBoost *= .9;
      const s = shots[active];
      const pointerScale = motionEnabled ? 1 : 0;
      sway.set(pointer.x * .75 * pointerScale, -pointer.y * .5 * pointerScale, 0).add(new T.Vector3(Math.sin(animT * .24) * .16, Math.sin(animT * .19) * .1, 0));
      camera.position.lerp(camFor(s).clone().add(sway), .04);
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

    renderer.render(scene, camera);
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
const bootBar = $('#boot-bar'), bootLine = $('#boot-line');
const lines = ['INITIALISING JOURNEY', 'CALIBRATING SIGNALS', 'CONNECTING DEVICES', 'SYNCING 13 YEARS', 'READY'];
let bl = 0; const bootTick = setInterval(() => { bl = Math.min(lines.length - 1, bl + 1); bootLine.textContent = lines[bl]; bootBar.style.width = `${(bl / (lines.length - 1)) * 100}%`; }, 260);

const fontsReady = Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 1800))]);
fontsReady.then(() => {
  // make sure the canvas label fonts are actually loaded before drawing them
  const loads = document.fonts ? Promise.all(['500 64px "JetBrains Mono"', '700 64px "Space Grotesk"', '500 52px "Space Grotesk"'].map((f) => document.fonts.load(f).catch(() => {}))) : Promise.resolve();
  return Promise.race([loads, new Promise((r) => setTimeout(r, 1500))]);
}).then(() => {
  world = createWorld();
  const startKey = location.hash.slice(1);
  const startIdx = Math.max(0, CHAPTERS.findIndex((c) => c.key === startKey));
  if (world) { world.onArrive = armCallouts; world.onFrame = updateCallouts; world.start(); }
  else setInterval(() => { if (!coArmed && cur >= 0) armCallouts(cur); }, 500);
  setTimeout(() => {
    clearInterval(bootTick); bootLine.textContent = 'READY'; bootBar.style.width = '100%';
    $('#boot').classList.add('done');
    go(startIdx);
  }, 700);
});
