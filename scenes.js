/* ==================================================================
   REAL-WORLD MILESTONE SCENES
   Each chapter is a physical place from the journey, modelled as a
   lit miniature: the validation bench, the smart building, the
   connected home, the automation lab, the app portfolio, the award
   shelf and today's desk. Every builder returns
   { group, pins, cam, look } — pins are the anchors the HUD callouts
   wire into.
================================================================== */
export function createScenes(K) {
  const { T, H, COL, uiFont, monoFont } = K;

  /* ---------------- kit ---------------- */
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const std = (color, roughness = .55, metalness = 0, o = {}) => new T.MeshStandardMaterial({ color, roughness, metalness, ...o });
  const phys = (o) => new T.MeshPhysicalMaterial(o);
  const basic = (o) => new T.MeshBasicMaterial({ toneMapped: false, ...o });
  const glassMat = (color = 0xbfd8e2, op = .22) => phys({ color, roughness: .04, metalness: .1, transparent: true, opacity: op, clearcoat: 1, clearcoatRoughness: .05, depthWrite: false, side: T.DoubleSide });

  function rrShape(w, h, r) {
    r = Math.max(.0005, Math.min(r, w / 2 - .0005, h / 2 - .0005));
    const s = new T.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }
  // rounded, bevelled box; depth runs along Z, centred on the origin
  function rbox(w, h, d, r, mat) {
    const bv = Math.max(.002, Math.min(d * .3, r * .5, .06));
    const sw = w - 2 * bv, sh = h - 2 * bv;
    const geo = new T.ExtrudeGeometry(rrShape(sw, sh, r - bv), { depth: Math.max(.001, d - 2 * bv), bevelEnabled: true, bevelThickness: bv, bevelSize: bv, bevelSegments: 3, curveSegments: 8 });
    geo.translate(0, 0, -(d - 2 * bv) / 2);
    return new T.Mesh(geo, mat);
  }
  function rplane(w, h, r, seg = 8) {
    const geo = new T.ShapeGeometry(rrShape(w, h, r), seg);
    const p = geo.attributes.position, uv = geo.attributes.uv;
    for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + w / 2) / w, (p.getY(i) + h / 2) / h);
    return geo;
  }
  const box = (w, h, d, mat) => new T.Mesh(new T.BoxGeometry(w, h, d), mat);
  const cyl = (rt, rb, h, mat, seg = 32) => new T.Mesh(new T.CylinderGeometry(rt, rb, h, seg), mat);
  const put = (parent, o, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) => { o.position.set(x, y, z); o.rotation.set(rx, ry, rz); parent.add(o); return o; };
  const tube = (pts, r, mat, seg = 64) => new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts.map((p) => (p.isVector3 ? p : new T.Vector3(...p)))), seg, r, 8, false), mat);
  const V = (x, y, z) => new T.Vector3(x, y, z);
  function canvasTex(w, h, draw) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d'); draw(g, w, h, 0);
    const t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 8;
    t.redraw = (time) => { g.clearRect(0, 0, w, h); draw(g, w, h, time); t.needsUpdate = true; };
    return t;
  }
  // instanced boxes from a list of [x,y,z,(sx,sy,sz),(ry)]
  function inst(geo, mat, list) {
    const m = new T.InstancedMesh(geo, mat, list.length), o = new T.Object3D();
    list.forEach((p, i) => { o.position.set(p[0], p[1], p[2]); o.rotation.set(0, p[6] || 0, 0); o.scale.set(p[3] || 1, p[4] || 1, p[5] || 1); o.updateMatrix(); m.setMatrixAt(i, o.matrix); });
    m.instanceMatrix.needsUpdate = true; return m;
  }
  function keyLight(g, pos, target, intensity = 900, color = 0xfff0dc, angle = .62) {
    const s = new T.SpotLight(color, intensity, 0, angle, .6, 2);
    s.position.copy(pos); s.target.position.copy(target); g.add(s); g.add(s.target);
    s.castShadow = true; s.shadow.mapSize.set(1024, 1024); s.shadow.bias = -.0004; s.shadow.normalBias = .03;
    s.shadow.camera.near = 2; s.shadow.camera.far = 60;
    return s;
  }
  const pinAt = (pins, name, parent, x = 0, y = 0, z = 0) => { const o = new T.Object3D(); o.position.set(x, y, z); parent.add(o); pins[name] = o; return o; };
  const wp = (o, x = 0, y = 0, z = 0) => { o.updateWorldMatrix(true, false); return o.localToWorld(V(x, y, z)); };
  const blink = (m, t, f = 2, ph = 0) => { m.opacity = .25 + .75 * (Math.sin(t * f + ph) > .2 ? 1 : 0); };

  // a believable smartphone: metal frame, black glass, rounded screen, camera module
  function phone(h, tex, frame = 0x8f949a, back = 0x15191d) {
    const w = h * .48, r = w * .17, d = h * .048;
    const g = new T.Group();
    put(g, rbox(w, h, d, r, std(frame, .28, .95)));
    put(g, new T.Mesh(rplane(w * .985, h * .99, r * .95), std(0x040506, .06, .2)), 0, 0, d / 2 + .002);
    const screen = put(g, new T.Mesh(rplane(w * .93, h * .962, r * .8), basic({ map: tex || null, color: tex ? 0xffffff : 0x0a1418 })), 0, 0, d / 2 + .006);
    put(g, new T.Mesh(rplane(w * .985, h * .99, r * .95), std(back, .35, .4)), 0, 0, -d / 2 - .002, 0, Math.PI, 0);
    const cm = put(g, rbox(w * .4, w * .4, d * .3, w * .1, std(back, .3, .5)), -w * .2, h * .37, -d / 2 - d * .12);
    [[-.07, .07], [.07, .07], [-.07, -.07]].forEach(([a, b]) => { const l = put(cm, cyl(w * .075, w * .075, d * .3, std(0x0a0c0e, .1, .6), 24), a * w, b * w, -d * .12, Math.PI / 2); l.add(put(new T.Group(), cyl(w * .04, w * .04, d * .02, basic({ color: 0x1b2c3a }), 16), 0, -d * .16, 0)); });
    put(g, box(.02, h * .1, d * .5, std(frame, .3, .9)), w / 2 + .005, h * .2, 0);
    put(g, box(.02, h * .06, d * .5, std(frame, .3, .9)), -w / 2 - .005, h * .26, 0);
    g.userData.screen = screen; g.userData.size = [w, h, d];
    return g;
  }

  /* ---------------- shared screen art ---------------- */
  const ink = { bg: '#071015', ink: '#e9f3f7', mute: '#8ea3ad', dim: '#4d636d', cyan: '#5ff2e0', amber: '#ffb45c', green: '#7dffa8', red: '#ff6b6b' };
  function homeApp(g, w, h) {
    const bg = g.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#10262d'); bg.addColorStop(1, '#060e12');
    g.fillStyle = bg; g.fillRect(0, 0, w, h);
    g.fillStyle = ink.mute; g.font = monoFont(20); g.fillText('9:41', 40, 54); g.fillText('● ● ●', w - 120, 54);
    g.fillStyle = ink.cyan; g.font = monoFont(20); g.fillText('MY HOME', 40, 128);
    g.fillStyle = ink.ink; g.font = uiFont(84, 500); g.fillText('21.5°', 40, 222);
    g.fillStyle = ink.mute; g.font = uiFont(26, 400); g.fillText('Living room · heating to 22°', 40, 266);
    const tiles = [['THERMOSTAT', 'Heat', ink.amber], ['CAMERA', 'Live', ink.red], ['LEAK SENSOR', 'Dry', ink.cyan], ['SMOKE / CO', 'Clear', ink.green]];
    tiles.forEach(([a, b, c], i) => {
      const x = 40 + (i % 2) * 222, y = 320 + Math.floor(i / 2) * 206;
      g.fillStyle = 'rgba(255,255,255,.05)'; g.beginPath(); g.roundRect(x, y, 200, 184, 22); g.fill();
      g.fillStyle = c; g.beginPath(); g.arc(x + 30, y + 38, 9, 0, 7); g.fill();
      g.fillStyle = ink.mute; g.font = monoFont(15); g.fillText(a, x + 22, y + 92);
      g.fillStyle = ink.ink; g.font = uiFont(44, 500); g.fillText(b, x + 22, y + 152);
    });
    g.fillStyle = 'rgba(95,242,224,.12)'; g.beginPath(); g.roundRect(40, 760, w - 80, 86, 20); g.fill();
    g.fillStyle = ink.cyan; g.font = monoFont(18); g.fillText('✓ ALL DEVICES IN SYNC', 70, 812);
    g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.roundRect(w / 2 - 70, h - 34, 140, 8, 4); g.fill();
  }

  const scenes = [];

  /* ==================================================================
     00 · ORIGIN — anatomy of a connected device (exploded view)
  ================================================================== */
  scenes.push(function sceneIntro() {
    const g = new T.Group(), pins = {}, ticks = [];
    const dev = put(g, new T.Group(), -1.6, .5, 0, 0, -.62, 0);
    const layers = [];
    // 01 · wall plate with real HVAC wiring
    const plate = put(dev, new T.Group()); layers.push([plate, -3.1]);
    put(plate, rbox(3.7, 3.7, .16, .5, std(0xd5d8d4, .62)));
    put(plate, rbox(1.7, .52, .26, .06, std(0x24292d, .5)), 0, -.95, .17);
    const wireCols = [0xd8352a, 0xf2f2ee, 0x2e9e4f, 0xe8c21c, 0x2a62c9];
    wireCols.forEach((c, i) => {
      const x = -.6 + i * .3;
      put(plate, cyl(.075, .075, .08, std(0xc9c3b4, .3, 1), 20), x, -.95, .34, Math.PI / 2);
      plate.add(tube([V(x * .4, -.1, -1.4), V(x * .5, -.35, -.25), V(x, -.62, .26), V(x, -.86, .36)], .042, std(c, .42)));
      put(plate, cyl(.022, .022, .1, std(0xc77b3c, .3, 1), 8), x, -.91, .37, Math.PI / 2);
    });
    [[-1.4, 1.4], [1.4, -1.4]].forEach(([x, y]) => put(plate, cyl(.09, .09, .04, std(0xb0b4b8, .3, 1), 20), x, y, .1, Math.PI / 2));
    // 02 · the PCB: SoC, Wi-Fi module under its shield can, flash, crystal, passives
    const pcb = put(dev, new T.Group()); layers.push([pcb, -1.05]);
    put(pcb, rbox(3.25, 3.25, .07, .42, std(0x0d4a37, .38, .12)));
    const pcbTex = canvasTex(1024, 1024, (x, w, h) => {
      x.fillStyle = '#0d4a37'; x.beginPath(); x.roundRect(0, 0, w, h, 130); x.fill();
      x.strokeStyle = '#167455'; x.lineCap = 'round'; x.lineJoin = 'round';
      for (let i = 0; i < 46; i++) { x.lineWidth = 3 + (i % 3) * 2; const sx = 140 + rnd() * 740, sy = 140 + rnd() * 740, ex = 140 + rnd() * 740, ey = 140 + rnd() * 740, d = Math.min(Math.abs(ex - sx), Math.abs(ey - sy)); x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + Math.sign(ex - sx) * d, sy + Math.sign(ey - sy) * d); x.lineTo(ex, ey); x.stroke(); }
      x.fillStyle = '#c9a64e'; for (let i = 0; i < 70; i++) { x.beginPath(); x.arc(120 + rnd() * 780, 120 + rnd() * 780, 6, 0, 7); x.fill(); }
      x.strokeStyle = '#c9a64e'; x.lineWidth = 7; x.beginPath(); x.moveTo(190, 900); x.lineTo(190, 840); x.lineTo(240, 840); x.lineTo(240, 900); x.lineTo(290, 900); x.lineTo(290, 840); x.lineTo(340, 840); x.stroke();
      x.fillStyle = '#e8efe9'; x.font = '600 30px "JetBrains Mono"'; x.fillText('HB-STAT-01  REV C', 560, 950); x.fillText('ANT1', 180, 815); x.fillText('U1', 470, 300); x.fillText('U2', 180, 560);
      x.strokeStyle = '#e8efe9'; x.lineWidth = 3; x.strokeRect(330, 280, 330, 330);
    });
    put(pcb, new T.Mesh(new T.PlaneGeometry(3.25, 3.25), std(0xffffff, .4, .1, { map: pcbTex, transparent: true })), 0, 0, .037);
    put(pcb, rbox(.86, .86, .12, .05, std(0x15171a, .42, .2)), .02, .25, .1);
    const soc = put(pcb, new T.Mesh(new T.PlaneGeometry(.6, .3), basic({ map: canvasTex(256, 128, (x) => { x.fillStyle = '#9aa3a8'; x.font = '600 34px "JetBrains Mono"'; x.fillText('SoC', 10, 50); x.font = '24px "JetBrains Mono"'; x.fillText('ARM · 1316', 10, 100); }), transparent: true, opacity: .75 })), .02, .25, .162);
    const can = put(pcb, rbox(1.05, .75, .16, .04, std(0xc3c8cc, .32, 1)), -.75, -.75, .12);
    put(pcb, box(.5, .34, .1, std(0x16181b, .45)), .85, -.7, .09);
    put(pcb, rbox(.4, .16, .12, .07, std(0xd0d3d6, .25, 1)), -.8, .95, .09);
    const passive = new T.BoxGeometry(.1, .05, .06);
    const pl = []; for (let i = 0; i < 42; i++) { const px = -1.3 + rnd() * 2.6, py = -1.3 + rnd() * 2.6; if (Math.abs(px) < .6 && Math.abs(py - .25) < .6) continue; pl.push([px, py, .06, 1, 1, 1, (rnd() > .5) * Math.PI / 2]); }
    const pass1 = inst(passive, std(0xb08a5a, .5), pl.filter((_, i) => i % 2)); pass1.rotation.x = Math.PI / 2; pcb.add(pass1);
    const pass2 = inst(passive, std(0x111214, .45), pl.filter((_, i) => !(i % 2))); pass2.rotation.x = Math.PI / 2; pcb.add(pass2);
    const led = put(pcb, box(.08, .05, .05, basic({ color: COL.cyan, transparent: true })), 1.1, 1.15, .06);
    // 03 · display module, flex cable back to the board
    const disp = put(dev, new T.Group()); layers.push([disp, 1.05]);
    put(disp, rbox(3.05, 3.05, .09, .4, std(0x050607, .2, .3)));
    const ui = canvasTex(1024, 1024, (x, w, h) => {
      const bg = x.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, w * .7); bg.addColorStop(0, '#0e2228'); bg.addColorStop(1, '#03080a');
      x.fillStyle = bg; x.beginPath(); x.roundRect(0, 0, w, h, 110); x.fill();
      x.lineCap = 'round'; x.lineWidth = 26; x.strokeStyle = '#152b33'; x.beginPath(); x.arc(512, 540, 360, Math.PI * .75, Math.PI * 2.25); x.stroke();
      const gr = x.createLinearGradient(150, 0, 870, 0); gr.addColorStop(0, '#ffb45c'); gr.addColorStop(1, '#5ff2e0');
      x.strokeStyle = gr; x.beginPath(); x.arc(512, 540, 360, Math.PI * .75, Math.PI * 1.86); x.stroke();
      x.fillStyle = '#e9f3f7'; x.font = '500 250px "Space Grotesk"'; x.textAlign = 'center'; x.fillText('21.5°', 512, 620);
      x.fillStyle = '#ffb45c'; x.font = '500 40px "JetBrains Mono"'; x.fillText('HEATING TO 22°', 512, 720);
      x.fillStyle = '#8ea3ad'; x.font = '500 34px "JetBrains Mono"'; x.fillText('LIVING ROOM', 512, 300);
      x.fillStyle = '#5ff2e0'; x.font = '500 30px "JetBrains Mono"'; x.fillText('● WI-FI   ● CLOUD SYNC', 512, 880);
    });
    put(disp, new T.Mesh(rplane(2.7, 2.7, .32), basic({ map: ui })), 0, 0, .05);
    const flex = put(dev, box(.55, .018, 1, std(0xc8781e, .45, .3)), .4, -1.42, 0);
    // 04 · brushed-metal bezel and cover glass
    const front = put(dev, new T.Group()); layers.push([front, 3.1]);
    const bez = rrShape(3.55, 3.55, .55); bez.holes.push(rrShape(2.95, 2.95, .4));
    const bg = new T.ExtrudeGeometry(bez, { depth: .14, bevelEnabled: true, bevelThickness: .04, bevelSize: .04, bevelSegments: 3, curveSegments: 10 }); bg.translate(0, 0, -.07);
    put(front, new T.Mesh(bg, std(0xb9bec2, .26, 1)));
    put(front, rbox(3.0, 3.0, .05, .42, glassMat(0xffffff, .14)), 0, 0, .02);
    // exploded-view annotations
    [['01 · WALL PLATE', plate], ['02 · PCB + Wi-Fi', pcb], ['03 · DISPLAY', disp], ['04 · BEZEL', front]].forEach(([str, l], k) => {
      const up = k % 2 === 0, lb = H.text(str, { size: .2, color: '#7fb7bf' });
      lb.position.set(-1.2, up ? 2.3 : -2.3, 0); l.add(lb);
      l.add(H.line([V(-1.6, up ? 2.12 : -2.12, 0), V(-1.45, up ? 1.75 : -1.75, 0)], COL.cyan, .5));
    });
    // the phone it ultimately talks to
    const ph = put(g, phone(3.8, canvasTex(512, 1040, homeApp)), 5.4, .5, 1.2, -.05, -.42, .03);
    keyLight(g, V(6, 11, 9), V(0, 0, 0), 1100);
    const rimL = new T.PointLight(COL.cyan, 60, 18, 2); rimL.position.set(-6, 3, -5); g.add(rimL);
    // radio link: Wi-Fi module → phone
    const a = wp(can, 0, 0, .1), b = wp(ph, 0, 0, 0);
    const curve = new T.QuadraticBezierCurve3(a, a.clone().lerp(b, .5).add(V(0, 3.2, 1)), b);
    g.add(H.line(curve.getPoints(48), COL.cyan, .4));
    const pu = H.pulses(curve, COL.cyan, 3, .32, .4); g.add(pu); ticks.push(pu.userData.tick);
    ticks.push((t) => {
      const s = .78 + .22 * (.5 + .5 * Math.sin(t * .55));
      layers.forEach(([o, z]) => { o.position.z = z * s; });
      flex.position.z = (layers[1][1] + layers[2][1]) * s / 2; flex.scale.z = (layers[2][1] - layers[1][1]) * s;
      dev.rotation.y = -.62 + Math.sin(t * .2) * .08;
      ph.position.y = .5 + Math.sin(t * .8) * .1;
      blink(led.material, t, 3);
    });
    pinAt(pins, 'a', pcb, .02, .25, .2); pinAt(pins, 'b', plate, .2, -.9, .4); pinAt(pins, 'c', ph, 0, 1.1, .1); pinAt(pins, 'd', front, 1.6, 1.6, .1);
    g.userData.tick = (t) => ticks.forEach((f) => f(t));
    return { group: g, pins, cam: V(5.5, 3.8, 22.5), look: V(1.6, -.1, 0) };
  });

  /* ==================================================================
     2013 · BPL — the hardware validation bench
  ================================================================== */
  scenes.push(function sceneBench() {
    const g = new T.Group(), pins = {}, ticks = [];
    // bench, ESD mat with coiled ground cord, pegboard
    put(g, box(18, .5, 10, std(0x1c2024, .72)), 0, -.25, 0);
    put(g, box(18, .08, .1, std(0xb8bec4, .3, .9)), 0, -.03, 5);
    const matTex = canvasTex(1024, 600, (x, w, h) => {
      x.fillStyle = '#35505e'; x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(255,255,255,.05)'; x.lineWidth = 2; for (let i = 0; i < w; i += 32) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, h); x.stroke(); } for (let i = 0; i < h; i += 32) { x.beginPath(); x.moveTo(0, i); x.lineTo(w, i); x.stroke(); }
      x.fillStyle = 'rgba(255,255,255,.2)'; x.font = '600 20px "JetBrains Mono"'; x.fillText('ESD PROTECTED AREA', 40, h - 34);
      x.fillStyle = '#c9ccd0'; x.beginPath(); x.arc(w - 40, h - 40, 12, 0, 7); x.fill();
    });
    put(g, box(13.5, .04, 7.6, std(0xffffff, .85, 0, { map: matTex })), -.4, .02, .4);
    const coil = []; for (let i = 0; i <= 120; i++) { const a = i * .55; coil.push(V(5.9 + i * .022, .12 + Math.sin(a) * .07, 4.15 + Math.cos(a) * .07)); }
    g.add(tube(coil, .025, std(0x1a1d20, .5), 200));
    const pegTex = canvasTex(1024, 420, (x, w, h) => { x.fillStyle = '#2b2f33'; x.fillRect(0, 0, w, h); x.fillStyle = '#121416'; for (let i = 14; i < w; i += 26) for (let j = 14; j < h; j += 26) { x.beginPath(); x.arc(i, j, 4.5, 0, 7); x.fill(); } });
    put(g, box(18, 6.4, .2, std(0xffffff, .8, 0, { map: pegTex })), 0, 3.2, -4.95);
    // pliers + cutters hanging on the pegboard
    [[-6.5, 0x2a62c9], [-5.6, 0xd8352a], [6.6, 0xe8c21c]].forEach(([x, c]) => {
      put(g, box(.12, 1.3, .08, std(0x9aa1a6, .3, 1)), x - .12, 4.5, -4.75, 0, 0, .06);
      put(g, box(.12, 1.3, .08, std(0x9aa1a6, .3, 1)), x + .12, 4.5, -4.75, 0, 0, -.06);
      put(g, rbox(.22, .9, .14, .08, std(c, .5)), x - .2, 3.5, -4.72, 0, 0, .1);
      put(g, rbox(.22, .9, .14, .08, std(c, .5)), x + .2, 3.5, -4.72, 0, 0, -.1);
    });

    // ---- the board under test ----
    const pcb = put(g, new T.Group(), .7, .32, .9, 0, .1, 0);
    put(pcb, box(6.4, .1, 4.2, std(0x0d4a36, .38, .15)));
    [[-3, -1.9], [3, -1.9], [-3, 1.9], [3, 1.9]].forEach(([x, z]) => put(pcb, cyl(.12, .12, .3, std(0xc9a24a, .3, 1), 6), x, -.2, z));
    const comps = [
      { x: -.6, z: .2, w: 1.3, d: 1.3, l: 'U1' }, { x: 1.3, z: -.9, w: .62, d: .42, l: 'U2' }, { x: 1.3, z: -.15, w: .62, d: .42, l: 'U3' },
      { x: 2.5, z: 1.25, w: .5, d: .5, l: 'C12' }, { x: -2.4, z: -1.2, w: .5, d: .5, l: 'C3' }, { x: 2.2, z: .35, w: .5, d: .5, l: 'L1' },
      { x: 2.7, z: -1.3, w: .45, d: .35, l: 'Q1' }, { x: -.6, z: 1.45, w: .46, d: .2, l: 'Y1' }, { x: -1.4, z: -1.75, w: 2.1, d: .24, l: 'J2' }, { x: 2.85, z: 1.85, w: .55, d: .45, l: 'J1' },
    ];
    const tps = [[.5, -1.25, 'TP1'], [-1.95, .55, 'TP2'], [1.95, 1.45, 'TP3'], [-2.6, 1.55, 'TP4']];
    const px = (x) => (x + 3.2) * 200, pz = (z) => (z + 2.1) * 200;
    const boardTex = canvasTex(1280, 840, (x, w, h) => {
      x.fillStyle = '#0c4934'; x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(30,120,86,.45)'; x.lineWidth = 1; for (let i = -h; i < w; i += 9) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + h, h); x.stroke(); }
      x.strokeStyle = '#1b7c58'; x.lineCap = 'round'; x.lineJoin = 'round';
      const pts = comps.map((c) => [px(c.x), pz(c.z)]).concat(tps.map(([a, b]) => [px(a), pz(b)]));
      for (let i = 0; i < 60; i++) { const [sx, sy] = pts[(rnd() * pts.length) | 0], [ex, ey] = pts[(rnd() * pts.length) | 0]; const ox = (rnd() - .5) * 60, oy = (rnd() - .5) * 60; const d = Math.min(Math.abs(ex - sx), Math.abs(ey - sy)); x.lineWidth = 3 + ((i % 4) ? 0 : 5); x.beginPath(); x.moveTo(sx + ox, sy + oy); x.lineTo(sx + ox + Math.sign(ex - sx) * d, sy + oy + Math.sign(ey - sy) * d); x.lineTo(ex + ox, ey + oy); x.stroke(); }
      x.fillStyle = '#c9a64e'; x.strokeStyle = '#082c20';
      for (let i = 0; i < 120; i++) { const vx = 30 + rnd() * (w - 60), vy = 30 + rnd() * (h - 60); x.beginPath(); x.arc(vx, vy, 5.5, 0, 7); x.fill(); x.fillStyle = '#082c20'; x.beginPath(); x.arc(vx, vy, 2.2, 0, 7); x.fill(); x.fillStyle = '#c9a64e'; }
      x.strokeStyle = '#eef2ee'; x.lineWidth = 3; x.fillStyle = '#eef2ee'; x.font = '600 22px "JetBrains Mono"';
      comps.forEach((c) => { x.strokeRect(px(c.x - c.w / 2) - 10, pz(c.z - c.d / 2) - 10, c.w * 200 + 20, c.d * 200 + 20); x.fillText(c.l, px(c.x - c.w / 2) - 8, pz(c.z - c.d / 2) - 18); });
      tps.forEach(([a, b, l]) => { x.fillStyle = '#d6d6d0'; x.beginPath(); x.arc(px(a), pz(b), 12, 0, 7); x.fill(); x.fillStyle = '#eef2ee'; x.fillText(l, px(a) + 18, pz(b) + 8); });
      x.font = '700 30px "JetBrains Mono"'; x.fillText('MAIN BOARD · REV C', 60, h - 50); x.font = '600 22px "JetBrains Mono"'; x.fillText('QA ✓  2013-W24', w - 260, h - 50);
      [[30, 30], [w - 30, 30], [30, h - 30], [w - 30, h - 30]].forEach(([a, b]) => { x.strokeStyle = '#c9a64e'; x.lineWidth = 8; x.beginPath(); x.arc(a + 30, b + (b < h / 2 ? 30 : -30), 22, 0, 7); x.stroke(); });
    });
    put(pcb, new T.Mesh(new T.PlaneGeometry(6.4, 4.2), std(0xffffff, .42, .2, { map: boardTex })), 0, .051, 0, -Math.PI / 2);
    const icMat = std(0x141619, .42, .15), legMat = std(0xc6cbd0, .28, 1);
    put(pcb, box(1.3, .14, 1.3, icMat), -.6, .12, .2);
    const legs = []; for (let k = 0; k < 12; k++) { const o = -.55 + k * .1; legs.push([-.6 + o, .07, .2 - .73, 1, 1, 1], [-.6 + o, .07, .2 + .73, 1, 1, 1], [-.6 - .73, .07, .2 + o, 1, 1, 1, Math.PI / 2], [-.6 + .73, .07, .2 + o, 1, 1, 1, Math.PI / 2]); }
    pcb.add(inst(new T.BoxGeometry(.035, .03, .17), legMat, legs));
    put(pcb, new T.Mesh(new T.PlaneGeometry(1, .5), basic({ map: canvasTex(320, 160, (x) => { x.fillStyle = '#a3abb0'; x.font = '700 40px "JetBrains Mono"'; x.fillText('32-BIT MCU', 10, 60); x.font = '28px "JetBrains Mono"'; x.fillText('1316 · QFP48', 10, 115); }), transparent: true, opacity: .7 })), -.6, .195, .2, -Math.PI / 2);
    [[1.3, -.9], [1.3, -.15]].forEach(([x, z]) => {
      put(pcb, box(.62, .1, .42, icMat), x, .1, z);
      const l2 = []; for (let k = 0; k < 4; k++) l2.push([x - .22 + k * .145, .06, z - .26], [x - .22 + k * .145, .06, z + .26]);
      pcb.add(inst(new T.BoxGeometry(.04, .03, .12), legMat, l2));
    });
    const capMat = std(0x1d2c66, .38, .1), capTop = std(0xc8ccd0, .3, 1);
    [[2.5, 1.25, .62], [2.5 + .55, 1.25, .5], [-2.4, -1.2, .7]].forEach(([x, z, hh]) => { put(pcb, cyl(.22, .22, hh, capMat, 28), x, .05 + hh / 2, z); put(pcb, cyl(.2, .2, .02, capTop, 28), x, .06 + hh, z); });
    put(pcb, rbox(.5, .5, .3, .06, std(0x2b2f33, .5)), 2.2, .2, .35, -Math.PI / 2);
    put(pcb, box(.45, .16, .3, icMat), 2.7, .13, -1.3); put(pcb, box(.45, .03, .36, legMat), 2.7, .23, -1.5);
    put(pcb, rbox(.46, .2, .14, .09, std(0xd3d6d8, .22, 1)), -.6, .13, 1.45);
    put(pcb, box(2.1, .12, .24, std(0x0f1012, .6)), -1.4, .11, -1.75);
    const hp = []; for (let k = 0; k < 10; k++) hp.push([-2.3 + k * .2, .27, -1.75]);
    pcb.add(inst(new T.BoxGeometry(.03, .26, .03), std(0xd8b25a, .25, 1), hp));
    put(pcb, box(.55, .42, .45, std(0x111214, .55)), 2.85, .26, 1.85);
    put(pcb, box(.5, .3, .55, std(0xbfc5ca, .3, 1)), -2.95, .2, .1);
    const smd = []; for (let i = 0; i < 90; i++) { const sx = -3 + rnd() * 6, sz = -1.95 + rnd() * 3.9; if (comps.some((c) => Math.abs(sx - c.x) < c.w / 2 + .15 && Math.abs(sz - c.z) < c.d / 2 + .15)) continue; smd.push([sx, .075, sz, 1, 1, 1, (rnd() > .5) * Math.PI / 2]); }
    pcb.add(inst(new T.BoxGeometry(.12, .05, .06), std(0xb08a5a, .5), smd.filter((_, i) => i % 3)));
    pcb.add(inst(new T.BoxGeometry(.12, .05, .06), std(0x0f1012, .45), smd.filter((_, i) => !(i % 3))));
    const ledG = put(pcb, box(.1, .07, .07, basic({ color: COL.green, transparent: true })), -2.8, .09, 1.7);
    const ledR = put(pcb, box(.1, .07, .07, basic({ color: COL.red, transparent: true })), -2.55, .09, 1.7);
    tps.forEach(([a, b]) => put(pcb, new T.Mesh(new T.TorusGeometry(.07, .018, 8, 20), std(0xd6d6d0, .3, 1)), a, .15, b));

    // ---- oscilloscope ----
    const scope = put(g, new T.Group(), -4.6, 0, -2.4, 0, .32, 0);
    put(scope, rbox(5.4, 3.4, 2.7, .2, std(0x2a3137, .55, .25)), 0, 1.75, 0);
    put(scope, rbox(5.1, 3.1, .06, .12, std(0x3a434a, .5, .3)), 0, 1.75, 1.36);
    const scopeTex = canvasTex(768, 544, (x, w, h, t) => {
      x.fillStyle = '#060d10'; x.fillRect(0, 0, w, h);
      x.fillStyle = '#0d1a20'; x.fillRect(0, 0, w, 40); x.fillRect(0, h - 46, w, 46);
      x.font = '600 19px "JetBrains Mono"';
      x.fillStyle = '#ffd54a'; x.fillText('CH1 1.00V', 14, 27); x.fillStyle = '#5ff2e0'; x.fillText('CH2 2.00V', 150, 27);
      x.fillStyle = '#c9d3d8'; x.fillText('H 500µs   T↑ 1.20V', 300, 27);
      x.fillStyle = '#2bd46e'; x.fillRect(w - 86, 8, 72, 24); x.fillStyle = '#061016'; x.fillText('RUN', w - 70, 27);
      const top = 46, bot = h - 52, mid = (top + bot) / 2;
      x.strokeStyle = 'rgba(255,255,255,.10)'; x.lineWidth = 1; x.setLineDash([2, 6]);
      for (let i = 1; i < 10; i++) { x.beginPath(); x.moveTo(i * w / 10, top); x.lineTo(i * w / 10, bot); x.stroke(); }
      for (let i = 1; i < 8; i++) { x.beginPath(); x.moveTo(0, top + i * (bot - top) / 8); x.lineTo(w, top + i * (bot - top) / 8); x.stroke(); }
      x.setLineDash([]);
      x.lineWidth = 3; x.shadowBlur = 10;
      x.strokeStyle = '#ffd54a'; x.shadowColor = '#ffd54a'; x.beginPath();
      for (let i = 0; i <= w; i += 3) { const y = mid - 90 + Math.sin(i * .035 - t * 5) * 62 + (Math.random() - .5) * 3; i ? x.lineTo(i, y) : x.moveTo(i, y); } x.stroke();
      x.strokeStyle = '#5ff2e0'; x.shadowColor = '#5ff2e0'; x.beginPath();
      for (let i = 0; i <= w; i += 2) { const ph = ((i * .035 - t * 5) / (Math.PI * 2)) % 1, s = (ph + 1) % 1 < .5 ? 1 : -1; const y = mid + 110 - s * 48; i ? x.lineTo(i, y) : x.moveTo(i, y); } x.stroke();
      x.shadowBlur = 0;
      x.fillStyle = '#c9d3d8'; x.fillText('Vpp 3.30V   f 1.000kHz   Duty 50.0%', 14, h - 17);
      x.fillStyle = '#2bd46e'; x.fillText('PASS ✓', w - 104, h - 17);
    });
    put(scope, new T.Mesh(new T.PlaneGeometry(3.15, 2.25), basic({ map: scopeTex })), -.8, 1.95, 1.4);
    const knobMat = std(0x16191c, .45, .2);
    [[1.05, 2.75], [1.65, 2.75], [2.2, 2.75], [1.05, 2.05], [1.65, 2.05], [2.2, 2.05]].forEach(([x, y], i) => { const k = put(scope, cyl(i < 3 ? .2 : .16, i < 3 ? .2 : .16, .16, knobMat, 28), x, y, 1.45, Math.PI / 2); put(k, box(.03, .04, .14, std(0xe9eef0, .4)), 0, .07, -.1 + (i < 3 ? 0 : .02)); });
    [[1.05, 1.42, 0xffd54a], [1.65, 1.42, 0x5ff2e0], [2.2, 1.42, 0x6b7177]].forEach(([x, y, c]) => put(scope, rbox(.36, .2, .06, .04, std(c, .5, 0, { emissive: c, emissiveIntensity: .25 })), x, y, 1.42));
    const bnc = [[-1.95, .55, 0xffd54a], [-1.35, .55, 0x5ff2e0], [-.75, .55, 0xff6b6b]];
    bnc.forEach(([x, y, c]) => { put(scope, cyl(.13, .13, .2, std(0xc6cbd0, .3, 1), 24), x, y, 1.45, Math.PI / 2); put(scope, new T.Mesh(new T.TorusGeometry(.17, .025, 8, 24), std(c, .5)), x, y, 1.4); });
    put(scope, new T.Mesh(new T.PlaneGeometry(1.8, .26), basic({ map: canvasTex(512, 72, (x) => { x.fillStyle = '#c9d3d8'; x.font = '600 34px "JetBrains Mono"'; x.fillText('DSO · 4CH · 200 MHz', 8, 48); }), transparent: true, opacity: .8 })), -1.4, 3.18, 1.4);
    // probes: BNC → board test points
    const cable = std(0x16181b, .5);
    [[0, 0], [1, 1]].forEach(([bi, ti]) => {
      const a = wp(scope, bnc[bi][0], bnc[bi][1], 1.55), tp = wp(pcb, tps[ti][0], .15, tps[ti][1]);
      g.add(tube([a, a.clone().add(V(.2, -.4, .6)), V(a.x + 1.2, .12, a.z + 1.6), V(tp.x - .6, .2, tp.z + .3), tp.clone().add(V(0, .75, 0))], .04, cable, 90));
      put(g, cyl(.075, .06, .55, std(0x2a2e33, .45)), tp.x, tp.y + .5, tp.z);
      put(g, cyl(.08, .08, .08, std(bnc[bi][2], .5)), tp.x, tp.y + .7, tp.z);
      put(g, cyl(.012, .012, .2, std(0xd6dadc, .2, 1), 8), tp.x, tp.y + .14, tp.z);
    });
    // ---- bench power supply ----
    const psu = put(g, new T.Group(), 4.9, 0, -2.8, 0, -.28, 0);
    put(psu, rbox(3.8, 2, 2.6, .14, std(0xd5d7d4, .5, .1)), 0, 1, 0);
    put(psu, rbox(3.6, 1.8, .05, .1, std(0x23282c, .5, .2)), 0, 1, 1.3);
    let amps = .452;
    const psuTex = canvasTex(640, 220, (x, w, h, t) => {
      x.fillStyle = '#07090a'; x.fillRect(0, 0, w, h);
      x.font = '700 92px "JetBrains Mono"'; x.shadowBlur = 16;
      x.fillStyle = '#ff5a43'; x.shadowColor = '#ff5a43'; x.fillText('12.00', 18, 120);
      x.fillStyle = '#4dff8f'; x.shadowColor = '#4dff8f'; x.fillText(amps.toFixed(3), 340, 120);
      x.shadowBlur = 0; x.font = '600 22px "JetBrains Mono"'; x.fillStyle = '#8ea3ad';
      x.fillText('V  CH1 · CV', 24, 172); x.fillText('A  LIMIT 1.000', 344, 172);
      x.fillStyle = '#4dff8f'; x.fillText('● OUTPUT ON', 24, 206);
    });
    put(psu, new T.Mesh(new T.PlaneGeometry(2.4, .82), basic({ map: psuTex })), -.4, 1.42, 1.34);
    [[1.25, 1.55], [1.25, .95]].forEach(([x, y]) => put(psu, cyl(.2, .2, .18, knobMat, 28), x, y, 1.4, Math.PI / 2));
    const jacks = [[-1.1, .52, 0xd8352a], [-.5, .52, 0x16181b], [.1, .52, 0x2e9e4f]];
    jacks.forEach(([x, y, c]) => put(psu, cyl(.11, .11, .16, std(c, .4), 20), x, y, 1.38, Math.PI / 2));
    [[0, 0xb8302a], [1, 0x16181b]].forEach(([ji, c]) => {
      const a = wp(psu, jacks[ji][0], jacks[ji][1], 1.45), b = wp(pcb, 2.85, .3, 2.2);
      g.add(tube([a, a.clone().add(V(-.2, -.3, .5)), V(a.x - .8, .1, a.z + 2.2), V(b.x + .5, .12, b.z + .3), b.clone().add(V(ji * .12, .05, 0))], .035, std(c, .5), 80));
    });
    // ---- multimeter ----
    const dmm = put(g, new T.Group(), 5.6, .32, 2.3, -Math.PI / 2 + .3, -.35, 0);
    put(dmm, rbox(1.7, 3.1, .45, .28, std(0xe2b42a, .7)));
    put(dmm, rbox(1.45, 2.8, .1, .2, std(0x2b2f33, .5)), 0, 0, .2);
    put(dmm, new T.Mesh(new T.PlaneGeometry(1.15, .55), basic({ map: canvasTex(320, 150, (x) => { x.fillStyle = '#a9b49a'; x.fillRect(0, 0, 320, 150); x.fillStyle = '#1b1f17'; x.font = '700 76px "JetBrains Mono"'; x.fillText('3.298', 18, 92); x.font = '600 24px "JetBrains Mono"'; x.fillText('V DC   AUTO', 22, 132); }) })), 0, .9, .26);
    const dial = put(dmm, cyl(.42, .42, .12, std(0x15171a, .5), 32), 0, -.2, .3, Math.PI / 2);
    put(dial, box(.08, .08, .5, std(0xe9eef0, .4)), 0, .06, -.15);
    // ---- validation log on a clipboard ----
    const clip = put(g, new T.Group(), -4.4, .07, 2.6, 0, .22, 0);
    put(clip, box(2.7, .05, 3.5, std(0x6f5236, .8)));
    put(clip, rbox(1, .3, .18, .05, std(0xbfc5ca, .3, 1)), 0, .1, -1.62, -Math.PI / 2);
    const logTex = canvasTex(600, 780, (x, w, h) => {
      x.fillStyle = '#f2efe7'; x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(80,120,170,.25)'; x.lineWidth = 1.5; for (let y = 120; y < h; y += 44) { x.beginPath(); x.moveTo(24, y); x.lineTo(w - 24, y); x.stroke(); }
      x.fillStyle = '#1f2a33'; x.font = '700 26px "JetBrains Mono"'; x.fillText('VALIDATION LOG', 30, 56);
      x.font = '500 18px "JetBrains Mono"'; x.fillStyle = '#4b5862'; x.fillText('MAIN BOARD REV C · FW 1.4.2', 30, 92);
      const rows = [['TC-101', 'Power-on sequence', 1], ['TC-102', '3V3 rail ±2%', 1], ['TC-103', 'UART boot log', 1], ['TC-104', 'Key debounce', 0], ['TC-105', 'Standby < 0.5 W', 1], ['TC-106', 'Thermal soak 4h', 1], ['TC-107', 'Brown-out reset', 1], ['TC-108', 'Watchdog recover', 1], ['TC-104', 'Retest · DEF-0231', 1]];
      rows.forEach(([id, n, ok], i) => { const y = 150 + i * 44; x.font = '500 19px "JetBrains Mono"'; x.fillStyle = '#28323a'; x.fillText(id, 30, y); x.fillText(n, 130, y); x.font = '700 19px "JetBrains Mono"'; x.fillStyle = ok ? '#2a7a4a' : '#b23a32'; x.fillText(ok ? 'PASS' : 'FAIL', w - 96, y); });
      x.strokeStyle = '#b23a32'; x.lineWidth = 3; x.beginPath(); x.ellipse(w - 70, 276, 52, 22, 0, 0, 7); x.stroke();
      x.fillStyle = '#b23a32'; x.font = 'italic 600 20px "Space Grotesk"'; x.fillText('→ DEF-0231 logged', 300, 312);
      x.fillStyle = '#1f2a33'; x.font = '700 22px "JetBrains Mono"'; x.fillText('REGRESSION  48 / 48 ✓', 30, h - 70);
      x.font = 'italic 600 30px "Space Grotesk"'; x.fillText('H.B.', w - 120, h - 30);
    });
    put(clip, new T.Mesh(new T.PlaneGeometry(2.35, 3.05), std(0xffffff, .9, 0, { map: logTex })), 0, .03, .15, -Math.PI / 2);
    put(clip, cyl(.04, .04, 2.2, std(0x1d3f8a, .4), 12), 1.55, .06, .3, 0, 0, Math.PI / 2).rotation.set(Math.PI / 2, 0, .3);
    // ---- soldering station: where it all began ----
    const sold = put(g, new T.Group(), -7.2, 0, .3, 0, .4, 0);
    put(sold, rbox(1.5, 1, 1.7, .1, std(0x2c4a63, .5, .2)), 0, .5, 0);
    put(sold, new T.Mesh(new T.PlaneGeometry(.9, .35), basic({ map: canvasTex(256, 100, (x) => { x.fillStyle = '#0a0b0c'; x.fillRect(0, 0, 256, 100); x.fillStyle = '#ff5a43'; x.shadowColor = '#ff5a43'; x.shadowBlur = 10; x.font = '700 64px "JetBrains Mono"'; x.fillText('330°', 20, 74); }) })), 0, .68, .86);
    const holder = []; for (let i = 0; i <= 80; i++) { const a = i * .5; holder.push(V(1.2 + Math.cos(a) * .2, .5 + i * .012, .9 + Math.sin(a) * .2)); }
    sold.add(tube(holder, .02, std(0xc6cbd0, .3, 1), 160));
    const iron = put(sold, new T.Group(), 1.2, 1, .9, 0, 0, .55);
    put(iron, cyl(.13, .11, 1.2, std(0x2a7a4a, .6), 20), 0, .3, 0);
    put(iron, cyl(.05, .05, .7, std(0xc6cbd0, .25, 1), 12), 0, -.6, 0);
    put(iron, new T.Mesh(new T.ConeGeometry(.05, .2, 12), std(0x8b8f92, .3, 1)), 0, -1.04, 0, Math.PI);
    sold.add(tube([V(0, .4, -.85), V(.4, .3, -1.2), V(1.4, 1.2, -.2), V(1.38, 1.6, .67)], .03, std(0x16181b, .5), 50));
    put(sold, cyl(.32, .36, .14, std(0xc9a24a, .4, .8), 24), -.9, .07, .7);
    keyLight(g, V(1, 12, 6), V(0, 0, 0), 1300, 0xfff1dc, .75);
    const cool = new T.PointLight(COL.cyan, 55, 20, 2); cool.position.set(-7, 5, 3); g.add(cool);
    let last = -1;
    ticks.push((t) => {
      if (t - last > .045) { scopeTex.redraw(t); last = t; }
      if (((t * 4) | 0) !== ((last * 4) | 0) || !psuTex.done) { amps = .45 + Math.random() * .006; psuTex.redraw(t); psuTex.done = true; }
      blink(ledG.material, t, 5); blink(ledR.material, t, 1.3, 2);
    });
    pinAt(pins, 'mcu', pcb, -.6, .25, .2);
    pinAt(pins, 'scope', scope, -.8, 3.05, 1.4);
    pinAt(pins, 'pwr', psu, -.4, 1.85, 1.35);
    pinAt(pins, 'log', clip, .3, .1, .4);
    pinAt(pins, 'iron', iron, 0, .9, 0);
    g.userData.tick = (t) => ticks.forEach((f) => f(t));
    return { group: g, pins, cam: V(3, 12.5, 20.5), look: V(-.8, .6, -.4) };
  });

  /* ==================================================================
     2015 · HONEYWELL — the automated building (architectural cutaway)
  ================================================================== */
  scenes.push(function sceneBuilding() {
    const g = new T.Group(), pins = {}, ticks = [];
    put(g, rbox(17, 12.5, .6, .3, std(0x0f1418, .6, .2)), 0, -.3, 0, -Math.PI / 2);
    const SX = 16.6, SZ = 12.1, sx = (x, w) => (x + SX / 2) / SX * w, sz = (z, h) => (z + SZ / 2) / SZ * h;
    const site = canvasTex(1328, 968, (x, w, h) => {
      x.fillStyle = '#1f2c25'; x.fillRect(0, 0, w, h);
      for (let i = 0; i < 2600; i++) { x.fillStyle = `rgba(${60 + rnd() * 40},${90 + rnd() * 40},${60 + rnd() * 30},.35)`; x.fillRect(rnd() * w, rnd() * h, 3, 3); }
      const rect = (x0, z0, x1, z1, c) => { x.fillStyle = c; x.fillRect(sx(x0, w), sz(z0, h), sx(x1, w) - sx(x0, w), sz(z1, h) - sz(z0, h)); };
      rect(-4.8, -3.6, 4.8, 3.2, '#8a8d8a'); rect(-8.3, 3.2, 8.3, 3.7, '#9a9d9a'); rect(-8.3, 3.7, 8.3, 5.6, '#232629');
      x.strokeStyle = '#d9d9cf'; x.lineWidth = 4; x.setLineDash([26, 22]); x.beginPath(); x.moveTo(0, sz(4.65, h)); x.lineTo(w, sz(4.65, h)); x.stroke(); x.setLineDash([]);
      rect(-8.3, -3.4, -5.4, 2.6, '#26292c'); x.strokeStyle = '#cfd2cc'; x.lineWidth = 3; for (let z = -3.2; z < 2.6; z += .62) { x.beginPath(); x.moveTo(sx(-8.1, w), sz(z, h)); x.lineTo(sx(-6.6, w), sz(z, h)); x.stroke(); }
      rect(1.4, 3.2, 3.2, 3.7, '#b9bcb8');
    });
    put(g, new T.Mesh(new T.PlaneGeometry(SX, SZ), std(0xffffff, .92, 0, { map: site })), 0, .006, 0, -Math.PI / 2);
    const W = 7, D = 5, F = 6, fh = 1.15, R = F * fh + .16;
    const conc = std(0xa9adab, .86), concD = std(0x9da1a1, .8), alu = std(0x2a3034, .38, .8), galv = std(0xb3bbc0, .32, .9);
    const bld = put(g, new T.Group(), 0, 0, -.4);
    for (let i = 0; i <= F; i++) put(bld, box(W + .2, .16, D + .2, conc), 0, i * fh + .08, 0);
    const cols = []; for (let i = 0; i < F; i++) for (const x of [-3.3, -1.1, 1.1, 3.3]) for (const z of [-2.3, 0, 2.3]) cols.push([x, i * fh + fh / 2 + .08, z]);
    bld.add(inst(new T.BoxGeometry(.16, fh - .16, .16), conc, cols));
    put(bld, box(1.6, F * fh, 1.8, concD), -2.3, F * fh / 2 + .16, -1.35);
    put(bld, new T.Mesh(new T.PlaneGeometry(W, F * fh), glassMat(0x8fb6c6, .32)), 0, F * fh / 2 + .16, -D / 2 - .12);
    const lg = put(bld, new T.Mesh(new T.PlaneGeometry(D, F * fh), glassMat(0x8fb6c6, .32)), -W / 2 - .12, F * fh / 2 + .16, 0, 0, Math.PI / 2);
    const mul = []; for (let x = -3.5; x <= 3.51; x += .7) mul.push([x, F * fh / 2 + .16, -D / 2 - .14, 1, 1, 1]);
    for (let z = -2.5; z <= 2.51; z += .625) mul.push([-W / 2 - .14, F * fh / 2 + .16, z, 1, 1, 1]);
    bld.add(inst(new T.BoxGeometry(.05, F * fh, .05), alu, mul));
    // interiors: lit ceilings, workstations, screens
    const lights = [], desks = [], screens = [];
    for (let i = 0; i < F; i++) {
      for (let x = -1.2; x <= 3; x += 1.05) for (let z = -1.8; z <= 2; z += 1.1) lights.push([x, (i + 1) * fh - .005, z]);
      if (i > 0) for (const x of [-.6, .8, 2.2]) for (const z of [-.4, 1.3]) { desks.push([x, i * fh + .35, z]); screens.push([x, i * fh + .62, z - .12]); }
    }
    const lgeo = new T.PlaneGeometry(.55, .22); lgeo.rotateX(Math.PI / 2);
    bld.add(inst(lgeo, basic({ color: 0xffe6bf, side: T.DoubleSide }), lights));
    bld.add(inst(new T.BoxGeometry(.9, .38, .5), std(0xd9d6cf, .7), desks));
    bld.add(inst(new T.BoxGeometry(.34, .2, .02), basic({ color: 0x7fc6e8 }), screens));
    // HVAC: riser, mains, branches, diffusers
    put(bld, cyl(.2, .2, F * fh, galv, 20), -1.2, F * fh / 2 + .16, -2.05);
    for (let i = 0; i < F; i++) {
      const y = (i + 1) * fh - .28;
      put(bld, cyl(.12, .12, 4.6, galv, 18), 1.1, y, .55, 0, 0, Math.PI / 2);
      put(bld, cyl(.12, .12, 2.6, galv, 18), -1.2, y, -.75, Math.PI / 2);
      for (const x of [0, 1.6, 3.1]) put(bld, cyl(.07, .07, 1.3, galv, 12), x, y, 1.2, Math.PI / 2);
    }
    [1, 3, 5].forEach((i, k) => {
      const y = (i + 1) * fh - .28, p = new T.CurvePath();
      [[V(-1.2, .3, -2.05), V(-1.2, y, -2.05)], [V(-1.2, y, -2.05), V(-1.2, y, .55)], [V(-1.2, y, .55), V(3.4, y, .55)]].forEach(([a, b]) => p.add(new T.LineCurve3(a, b)));
      const pu = H.pulses(p, k === 1 ? COL.amber : COL.cyan, 3, .14 + k * .02, .32); bld.add(pu); ticks.push(pu.userData.tick);
    });
    // rooftop air-handling unit with spinning fans, cooling tower, mast
    put(bld, box(2.9, .9, 1.5, std(0xdadcd8, .55, .2)), 1.2, R + .45, -1);
    const louv = []; for (let k = 0; k < 8; k++) louv.push([1.2, R + .15 + k * .085, -.24]);
    bld.add(inst(new T.BoxGeometry(2.6, .03, .04), std(0x8d9396, .5, .5), louv));
    const fans = [];
    [.55, 1.85].forEach((x) => { put(bld, cyl(.46, .46, .14, std(0x2b3034, .5, .4), 32), x, R + .97, -1); const f = put(bld, new T.Group(), x, R + 1.06, -1); for (let k = 0; k < 4; k++) put(f, box(.78, .02, .14, std(0x6d7478, .4, .6)), 0, 0, 0, 0, k * Math.PI / 4); fans.push(f); });
    put(bld, cyl(.5, .62, 1.0, std(0xc7cbcc, .6, .2), 28), -.9, R + .5, 1.2);
    put(bld, cyl(.03, .03, 2.2, alu, 8), 3.1, R + 1.1, 1.9);
    const beacon = H.glow(COL.red, .6); beacon.position.set(3.1, R + 2.25, 1.9); bld.add(beacon);
    // lobby: access-control turnstiles, reception, fire panel, BMS cabinet
    [1.3, 1.95, 2.6].forEach((x, k) => {
      put(bld, box(.12, .5, .7, std(0x3a4247, .35, .8)), x, .41, 1.9);
      if (k < 2) put(bld, new T.Mesh(new T.PlaneGeometry(.5, .32), glassMat(0xcfe8f0, .35)), x + .32, .5, 1.9, 0, Math.PI / 2);
      put(bld, box(.06, .09, .12, basic({ color: COL.green })), x, .7, 2.15);
    });
    put(bld, rbox(1.7, .55, .5, .2, std(0xe8e4dc, .5)), 2.4, .44, -.4);
    put(bld, box(.42, .52, .08, std(0xb3261e, .45)), -2.0, .9, -.41);
    const bms = put(bld, new T.Group(), -.9, .16, -2.25);
    put(bms, box(.7, 1.2, .38, std(0xc8ccce, .5, .3)), 0, .6, 0);
    const bl = []; for (let k = 0; k < 12; k++) bl.push([-.22 + (k % 4) * .14, .95 - Math.floor(k / 4) * .1, .2]);
    const bmsLeds = inst(new T.BoxGeometry(.05, .03, .02), basic({ color: COL.green }), bl); bms.add(bmsLeds);
    put(bms, new T.Mesh(new T.PlaneGeometry(.4, .22), basic({ color: 0x2c9ec4 })), 0, .45, .2);
    // security: dome cameras on every other floor + façade camera
    const domes = [];
    [0, 2, 4].forEach((i) => {
      const d = put(bld, new T.Group(), 3.05, (i + 1) * fh - .01, 2.05);
      put(d, cyl(.11, .11, .04, std(0xeeeeea, .5)), 0, -.02, 0);
      put(d, new T.Mesh(new T.SphereGeometry(.09, 20, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), std(0x0d0f11, .08, .4)), 0, -.03, 0);
      const l = H.glow(COL.red, .18); l.position.set(.06, -.08, .06); d.add(l); domes.push(d);
    });
    // requirement-traceability ladder: each floor's requirements light up as the QA scan verifies it
    const rtm = [];
    for (let i = 0; i < F; i++) { const s = H.text(`L${i} · REQ-${112 + i * 9} ⇄ TC-${203 + i * 14} ✓`, { size: .24, color: '#cfeff0' }); s.position.set(W / 2 + 2.3, i * fh + .62, 1.2); bld.add(s); rtm.push(s); }
    bld.add(H.line([V(W / 2 + .9, .3, 1.2), V(W / 2 + .9, F * fh + .3, 1.2)], COL.cyan, .35));
    const scan = put(bld, new T.Mesh(new T.PlaneGeometry(W + 1, D + 1), basic({ color: COL.cyan, transparent: true, opacity: .07, blending: T.AdditiveBlending, depthWrite: false, side: T.DoubleSide })), 0, 0, 0, -Math.PI / 2);
    scan.add(H.edges(new T.PlaneGeometry(W + 1, D + 1), COL.cyan, .75));
    // landscape: trees, street lights, traffic
    const trunk = std(0x4a3a2c, .9), leaf = std(0x2d4634, .92);
    [[-6.5, -4.6], [-5, -5], [6.2, -4.4], [7, -2], [7.2, 1.6], [-6.9, 3], [5.6, 2.9], [-3.9, 2.9], [-7.1, -.9], [4.2, -5]].forEach(([x, z], k) => { const s = .8 + (k % 3) * .2; put(g, cyl(.06, .08, .6 * s, trunk, 8), x, .3 * s, z); const c = put(g, new T.Mesh(new T.IcosahedronGeometry(.5 * s, 1), leaf), x, .9 * s, z); c.scale.y = 1.25; });
    [-6, -2, 2, 6].forEach((x) => { put(g, cyl(.03, .03, 1.5, alu, 8), x, .75, 3.45); const l = H.glow(0xffd9a0, .8, .8); l.position.set(x, 1.52, 3.45); g.add(l); });
    const cars = [[4.25, 0xb8c4cc, 1, 0], [5.05, 0x8a2b2b, -1, 6], [4.25, 0x223548, 1, 10]].map(([z, c, dir, off]) => {
      const car = put(g, new T.Group(), 0, .2, z);
      put(car, rbox(.95, .3, .44, .1, std(c, .3, .7)), 0, 0, 0);
      put(car, rbox(.52, .22, .4, .08, std(0x0d1114, .1, .5)), -.05 * dir, .22, 0);
      const hl = H.glow(dir > 0 ? 0xfff1d0 : 0xff4a3a, .35); hl.position.set(.5 * dir, 0, 0); car.add(hl);
      return [car, dir, off];
    });
    keyLight(g, V(9, 17, 11), V(0, 2.5, 0), 1500, 0xfff0dc, .55);
    const warm = new T.PointLight(0xffd29a, 26, 9, 2); warm.position.set(.6, 3.4, .2); bld.add(warm);
    ticks.push((t) => {
      fans.forEach((f, k) => { f.rotation.y = t * (6 + k); });
      const k = (t * .13) % 1, y = k * (R + .5); scan.position.y = y;
      rtm.forEach((s, i) => s.material.color.setHex(y > i * fh + .5 ? 0xffffff : 0x34484f));
      beacon.material.opacity = Math.sin(t * 4) > 0 ? 1 : .15;
      cars.forEach(([car, dir, off]) => { car.position.x = dir * (((t * 1.1 + off) % 17) - 8.5); car.rotation.y = dir > 0 ? 0 : Math.PI; car.position.x *= 1; });
      for (let k2 = 0; k2 < 12; k2++) { }
    });
    pinAt(pins, 'hvac', bld, 1.2, R + 1.2, -1);
    pinAt(pins, 'sec', domes[2], 0, -.08, 0);
    pinAt(pins, 'access', bld, 1.95, .75, 1.9);
    pinAt(pins, 'rtm', rtm[F - 1], -1.3, 0, 0);
    pinAt(pins, 'bms', bms, 0, 1.2, .2);
    g.userData.tick = (t) => ticks.forEach((f) => f(t));
    return { group: g, pins, cam: V(11, 10, 19), look: V(.4, 3.0, 0) };
  });

  /* ==================================================================
     2018 · RESIDEO — the connected home (dollhouse cutaway)
  ================================================================== */
  scenes.push(function sceneHome() {
    const g = new T.Group(), pins = {}, ticks = [];
    put(g, rbox(18, 13, .5, .3, std(0x0f1418, .6, .2)), 0, -.25, 0, -Math.PI / 2);
    const lawn = canvasTex(1024, 740, (x, w, h) => {
      x.fillStyle = '#21321f'; x.fillRect(0, 0, w, h);
      for (let i = 0; i < 4000; i++) { x.fillStyle = `rgba(${50 + rnd() * 40},${85 + rnd() * 50},${45 + rnd() * 25},.4)`; x.fillRect(rnd() * w, rnd() * h, 2, 3); }
      x.fillStyle = '#7d7a72'; for (let i = 0; i < 6; i++) { x.beginPath(); x.ellipse(250 + i * 24, 610 + i * 22, 22, 13, .3, 0, 7); x.fill(); }
      x.fillStyle = '#3a3d40'; x.fillRect(w - 300, 520, 300, 220);
    });
    put(g, new T.Mesh(new T.PlaneGeometry(17.6, 12.6), std(0xffffff, .95, 0, { map: lawn })), 0, .005, 0, -Math.PI / 2);
    const house = put(g, new T.Group(), -1.3, 0, -.6);
    const plaster = std(0xe7e2d8, .85), walnut = std(0x3f3129, .6), oakTex = canvasTex(1024, 720, (x, w, h) => {
      x.fillStyle = '#9c7853'; x.fillRect(0, 0, w, h);
      for (let y = 0; y < h; y += 36) { x.fillStyle = `rgba(${rnd() * 40},${rnd() * 20},0,.12)`; x.fillRect(0, y, w, 36); x.fillStyle = 'rgba(40,25,10,.35)'; x.fillRect(0, y, w, 2); for (let k = 0; k < 3; k++) x.fillRect(rnd() * w, y, 2, 36); }
    });
    put(house, box(10.2, .25, 7.2, std(0x22272b, .6)), 0, .125, 0);
    put(house, new T.Mesh(new T.PlaneGeometry(10, 7), std(0xffffff, .55, 0, { map: oakTex })), 0, .252, 0, -Math.PI / 2);
    put(house, box(10.2, 3.1, .18, plaster), 0, 1.8, -3.5);
    put(house, box(.18, 3.1, 7.2, plaster), -5.0, 1.8, 0);
    put(house, box(.16, 3.1, 3.2, plaster), 1.25, 1.8, -1.95);
    put(house, box(10.2, .16, 2.2, plaster), 0, 3.42, -2.5);
    put(house, box(10.4, .1, .1, std(0x2a3034, .4, .8)), 0, 3.52, -1.38);
    // window with night sky
    put(house, box(2.2, 1.5, .06, std(0x22282c, .4, .6)), -2.3, 2.0, -3.39);
    put(house, new T.Mesh(new T.PlaneGeometry(2.0, 1.3), basic({ color: 0x0d2235 })), -2.3, 2.0, -3.355);
    // living room: rug, sofa facing the TV on the partition, coffee table, lamp, plant
    put(house, box(3.4, .02, 2.8, std(0x8c8577, .95)), -2.2, .27, -.8);
    const sofa = put(house, new T.Group(), -4.3, .25, -.9, 0, Math.PI / 2, 0), fab = std(0x4c5a60, .95), teal = std(0x2f5f5a, .95);
    put(sofa, rbox(3, .45, 1, .1, fab), 0, .3, 0); put(sofa, rbox(3, .75, .28, .1, fab), 0, .7, -.42);
    [-1.55, 1.55].forEach((x) => put(sofa, rbox(.28, .62, 1, .1, fab), x, .45, 0));
    [-.95, 0, .95].forEach((x) => { put(sofa, rbox(.92, .18, .85, .08, fab), x, .6, .05); put(sofa, rbox(.6, .5, .16, .08, teal), x, .9, -.25, -.2); });
    put(house, cyl(.55, .55, .06, walnut, 40), -2.4, .68, -.8); put(house, cyl(.06, .2, .4, std(0x1d2124, .4, .6), 16), -2.4, .45, -.8);
    const tv = put(house, new T.Group(), 1.15, 1.75, -1.9, 0, -Math.PI / 2, 0);
    put(tv, rbox(2.1, 1.2, .06, .03, std(0x0a0b0c, .2, .4)));
    put(tv, new T.Mesh(new T.PlaneGeometry(2.0, 1.1), basic({ map: canvasTex(512, 280, (x, w, h) => { const gr = x.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#1d3b4a'); gr.addColorStop(1, '#0b1418'); x.fillStyle = gr; x.fillRect(0, 0, w, h); x.fillStyle = '#ff6b6b'; x.beginPath(); x.arc(28, 26, 8, 0, 7); x.fill(); x.fillStyle = '#e9f3f7'; x.font = '600 20px "JetBrains Mono"'; x.fillText('FRONT DOOR · LIVE', 46, 33); x.fillStyle = 'rgba(255,255,255,.08)'; x.fillRect(150, 110, 210, 170); }) })), 0, 0, .035);
    put(house, box(.45, .4, 2.2, walnut), .9, .45, -1.9);
    put(house, cyl(.25, .3, .05, std(0x1d2124, .4, .6), 24), -4.5, .28, 1.2); put(house, cyl(.025, .025, 2.1, std(0xb99b61, .3, .8), 8), -4.5, 1.33, 1.2);
    put(house, new T.Mesh(new T.ConeGeometry(.38, .42, 32, 1, true), std(0xf1e3c2, .8, 0, { emissive: 0xffd9a0, emissiveIntensity: .6, side: T.DoubleSide })), -4.5, 2.4, 1.2);
    put(house, cyl(.3, .24, .5, std(0x8b8f8a, .7), 20), -4.4, .5, -3.0); for (let k = 0; k < 8; k++) { const l = put(house, new T.Mesh(new T.SphereGeometry(.22, 10, 8), std(k % 2 ? 0x3c6550 : 0x56785b, .9)), -4.4 + Math.cos(k * 2.4) * .2, .95 + (k % 3) * .2, -3.0 + Math.sin(k * 2.4) * .2); l.scale.set(.6, 1.6, .7); }
    // kitchen: base + wall cabinets, stone tops, fridge, island
    put(house, box(2.6, .9, .66, walnut), 2.7, .7, -3.08); put(house, box(2.7, .06, .72, std(0xdcd9d2, .35)), 2.7, 1.18, -3.06);
    put(house, box(2.6, .7, .36, walnut), 2.7, 2.45, -3.22);
    put(house, box(.5, .02, .36, std(0x2a2f33, .2, .8)), 2.4, 1.215, -3.0);
    put(house, rbox(.95, 2.3, .72, .06, std(0xb9bec2, .28, .9)), 4.45, 1.4, -3.0);
    put(house, box(1.9, .88, .85, walnut), 2.9, .69, -.5); put(house, box(2.05, .06, 1.0, std(0xdcd9d2, .35)), 2.9, 1.16, -.5);
    [2.4, 3.4].forEach((x) => { put(house, cyl(.2, .2, .07, std(0x2c3236, .6), 20), x, .95, .25); put(house, cyl(.03, .03, .68, std(0xb99b61, .3, .8), 8), x, .6, .25); });
    // utility corner: water heater, copper lines, smart shutoff valve, leak sensor
    const copper = std(0xb8734a, .3, 1);
    put(house, cyl(.42, .42, 1.9, std(0xeceeec, .4, .1), 32), 4.2, 1.2, 2.2);
    put(house, cyl(.43, .43, .08, std(0x9aa0a4, .3, .8), 32), 4.2, 2.2, 2.2);
    [4.05, 4.35].forEach((x) => put(house, cyl(.045, .045, 1.2, copper, 12), x, 2.8, 2.2));
    house.add(tube([V(4.05, 2.4, 2.2), V(4.05, 2.4, 2.9), V(4.05, .6, 2.9), V(4.05, .6, 3.3)], .045, copper, 40));
    const valve = put(house, new T.Group(), 4.05, 1.4, 2.9);
    put(valve, rbox(.32, .3, .3, .05, std(0x1b2226, .4, .3)), 0, 0, 0);
    const vled = put(valve, box(.05, .05, .02, basic({ color: COL.cyan, transparent: true })), 0, .06, .16);
    const leak = put(house, new T.Group(), 3.55, .25, 2.5);
    put(leak, cyl(.24, .24, .1, std(0xeceeec, .35), 32), 0, .05, 0);
    const lring = put(leak, new T.Mesh(new T.TorusGeometry(.17, .014, 8, 40), basic({ color: COL.cyan, transparent: true })), 0, .105, 0, Math.PI / 2);
    // devices: thermostat, router, smoke/CO alarm, outdoor camera
    const thermo = put(house, new T.Group(), -.6, 1.6, -3.38, Math.PI / 2);
    put(thermo, cyl(.27, .27, .09, std(0xdfe3e3, .3, .4), 40));
    put(thermo, new T.Mesh(new T.CircleGeometry(.2, 40), basic({ map: canvasTex(256, 256, (x) => { x.fillStyle = '#071216'; x.fillRect(0, 0, 256, 256); x.strokeStyle = '#ffb45c'; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.arc(128, 128, 100, 2.4, 5.6); x.stroke(); x.fillStyle = '#e9f3f7'; x.font = '500 84px "Space Grotesk"'; x.textAlign = 'center'; x.fillText('21°', 128, 156); }) })), 0, .047, 0, -Math.PI / 2);
    put(house, box(1.3, .05, .36, walnut), -2.6, 1.0, -3.24);
    const router = put(house, new T.Group(), -2.6, 1.1, -3.22);
    put(router, rbox(.6, .12, .3, .05, std(0xf0f0ec, .4)), 0, 0, 0);
    [-.22, .22].forEach((x) => put(router, cyl(.018, .018, .45, std(0x1d2124, .5), 8), x, .25, -.1, -.15));
    const rled = put(router, box(.04, .02, .02, basic({ color: COL.cyan, transparent: true })), .2, .03, .16);
    const smoke = put(house, new T.Group(), -1.8, 3.32, -2.2);
    put(smoke, cyl(.24, .26, .08, std(0xf2f2ee, .5), 40)); const sled = put(smoke, box(.04, .02, .04, basic({ color: COL.red, transparent: true })), .1, -.05, 0);
    const cam = put(house, new T.Group(), -4.85, 2.85, 3.4, 0, .7, 0);
    put(cam, rbox(.32, .38, .3, .08, std(0xf2f3ef, .35)), 0, 0, .15);
    put(cam, cyl(.09, .09, .05, std(0x0c1013, .1, .5), 20), 0, .02, .32, Math.PI / 2);
    // the phone that every device reports to
    const ph = put(g, phone(3.6, canvasTex(512, 1040, homeApp)), 6.6, 2.8, 2.7, -.06, -.42, .02);
    const hub = wp(router, 0, .1, 0);
    [[thermo, COL.amber], [smoke, COL.white], [leak, COL.cyan], [cam, COL.red]].forEach(([d, c], i) => {
      const a = wp(d), cu = new T.QuadraticBezierCurve3(a, a.clone().lerp(hub, .5).add(V(0, 1.6 + i * .3, .6)), hub);
      g.add(H.line(cu.getPoints(36), c, .35)); const pu = H.pulses(cu, c, 2, .35 + i * .04, .28); g.add(pu); ticks.push(pu.userData.tick);
    });
    const pp = wp(ph, 0, 0, 0), up = new T.CubicBezierCurve3(hub, hub.clone().add(V(0, 4.5, 1)), pp.clone().add(V(-2, 3.5, 0)), pp);
    g.add(H.line(up.getPoints(60), COL.cyan, .55)); const pu2 = H.pulses(up, COL.cyan, 4, .22, .4); g.add(pu2); ticks.push(pu2.userData.tick);
    // device cloud: a rack of real handsets running CI suites in parallel
    const rack = put(g, new T.Group(), 7.0, 0, -3.4, 0, -.45, 0);
    put(rack, rbox(2.5, 3.6, 1.1, .06, std(0x14181b, .45, .5)), 0, 1.8, 0);
    put(rack, new T.Mesh(new T.PlaneGeometry(2.3, 3.3), glassMat(0x9fd8e6, .12)), 0, 1.8, .57);
    const farm = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const p = put(rack, phone(.82, null, 0x3a3f44), -.84 + c * .56, .75 + r * 1.0, .2); farm.push([p.userData.screen.material, rnd() * 10]); }
    const strip = put(rack, box(2.3, .04, .04, basic({ color: COL.cyan })), 0, 3.5, .56);
    const lbl = H.text('DEVICE CLOUD · CI', { size: .22, color: '#9fefe6' }); lbl.position.set(0, 3.9, .3); rack.add(lbl);
    const cA = new T.Color(0x0a2a30), cB = new T.Color(COL.cyan), cC = new T.Color(COL.green);
    // garden
    [[-7.4, -4.8], [-7.6, 3.6], [7.6, 4.6], [-3, 5.2]].forEach(([x, z], k) => { put(g, cyl(.06, .08, .6, std(0x4a3a2c, .9), 8), x, .3, z); const c = put(g, new T.Mesh(new T.IcosahedronGeometry(.6, 1), std(0x2d4634, .92)), x, 1.0, z); c.scale.y = 1.2; });
    put(g, box(5, .45, .5, std(0x2b4232, .95)), -3.6, .22, 4.4);
    keyLight(g, V(8, 15, 11), V(.5, 1, 0), 1700, 0xfff0dc, .6);
    const lamp = new T.PointLight(0xffcf94, 22, 10, 2); lamp.position.set(-2.4, 2.4, -.6); house.add(lamp);
    ticks.push((t) => {
      farm.forEach(([m, ph2]) => { const k = (t * .6 + ph2) % 3; m.color.copy(k < 1.6 ? cA.clone().lerp(cB, .3 + .25 * Math.sin(t * 6 + ph2)) : k < 2.4 ? cC : cA); });
      ph.position.y = 2.8 + Math.sin(t * .8) * .1;
      blink(rled.material, t, 6); blink(sled.material, t, .8); blink(vled.material, t, 1.6);
      lring.material.opacity = .5 + .5 * Math.sin(t * 2.2);
      strip.material.color.setHSL(.47, .85, .55 + .1 * Math.sin(t * 2));
    });
    pinAt(pins, 'phone', ph, 0, 1.2, .1); pinAt(pins, 'farm', rack, 0, 3.6, .5); pinAt(pins, 'leak', leak, 0, .15, 0); pinAt(pins, 'thermo', thermo, 0, .06, 0);
    g.userData.tick = (t) => ticks.forEach((f) => f(t));
    return { group: g, pins, cam: V(11, 11.5, 21), look: V(1.2, 1.4, -.2) };
  });

  /* ==================================================================
     2020 · TECH LEAD — the automation lab
  ================================================================== */
  scenes.push(function sceneLab() {
    const g = new T.Group(), pins = {}, ticks = [];
    put(g, box(19, .3, 11, std(0x161b1f, .38, .35)), 0, -.15, 0);
    const slats = []; for (let x = -9.2; x <= 9.21; x += .32) slats.push([x, 4.1, -4.3]);
    g.add(inst(new T.BoxGeometry(.2, 8.2, .12), std(0x2a2520, .75), slats));
    put(g, box(19, 8.2, .1, std(0x0d1013, .8)), 0, 4.1, -4.45);
    // the wall dashboard
    let since = performance.now();
    g.userData.onEnter = () => { since = performance.now(); };
    const dash = canvasTex(1600, 880, (x, w, h, t) => {
      const k = Math.min(1, Math.max(0, (performance.now() - since - 900) / 2200)), e = 1 - Math.pow(1 - k, 3);
      x.fillStyle = '#060c10'; x.fillRect(0, 0, w, h);
      x.fillStyle = '#0c171d'; x.fillRect(0, 0, w, 70);
      x.font = '600 26px "JetBrains Mono"'; x.fillStyle = '#5ff2e0'; x.fillText('AUTOMATION CONTROL · MOBILE + IoT', 36, 46);
      x.fillStyle = '#8ea3ad'; x.textAlign = 'right'; x.fillText('RELEASE TRAIN · BUILD #4812  ✓ GREEN', w - 36, 46); x.textAlign = 'left';
      const panel = (px, py, pw, ph, title) => { x.fillStyle = 'rgba(255,255,255,.035)'; x.beginPath(); x.roundRect(px, py, pw, ph, 18); x.fill(); x.fillStyle = '#8ea3ad'; x.font = '600 20px "JetBrains Mono"'; x.fillText(title, px + 26, py + 42); };
      // A · regression cycle, release over release
      panel(30, 96, 610, 500, 'REGRESSION CYCLE · DAYS / MAJOR RELEASE');
      const days = [25, 24, 21, 18, 15, 12, 10];
      days.forEach((d, i) => { const bh = d * 11 * Math.min(1, e * 1.4 - i * .06 + .2), bx = 70 + i * 78; x.fillStyle = i === days.length - 1 ? '#ffb45c' : 'rgba(95,242,224,.55)'; x.fillRect(bx, 560 - bh, 50, bh); x.fillStyle = '#4d636d'; x.font = '500 16px "JetBrains Mono"'; x.fillText(`R${i + 1}`, bx + 10, 585); });
      x.fillStyle = '#e9f3f7'; x.font = '600 96px "Space Grotesk"'; x.fillText(`${Math.round(25 - 15 * e)}`, 400, 230); x.font = '500 28px "Space Grotesk"'; x.fillStyle = '#8ea3ad'; x.fillText('days', 520, 230);
      // B · coverage donut
      panel(664, 96, 420, 500, 'AUTOMATION COVERAGE');
      const cv = 30 + 30 * e; x.lineWidth = 34; x.lineCap = 'round';
      x.strokeStyle = '#13262d'; x.beginPath(); x.arc(874, 360, 140, 0, Math.PI * 2); x.stroke();
      x.strokeStyle = 'rgba(255,180,92,.35)'; x.beginPath(); x.arc(874, 360, 140, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * .3); x.stroke();
      x.strokeStyle = '#5ff2e0'; x.beginPath(); x.arc(874, 360, 140, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * cv / 100); x.stroke();
      x.fillStyle = '#e9f3f7'; x.font = '600 84px "Space Grotesk"'; x.textAlign = 'center'; x.fillText(`${Math.round(cv)}%`, 874, 390); x.font = '500 20px "JetBrains Mono"'; x.fillStyle = '#8ea3ad'; x.fillText('MOBILE + IoT SUITES', 874, 560); x.textAlign = 'left';
      // C · pipeline
      panel(1108, 96, 462, 500, 'PIPELINE · ON EVERY COMMIT');
      const st = [['COMMIT', 'git push'], ['BUILD', 'Bamboo · Maven'], ['API', 'GraphQL q / m / s'], ['MOBILE', 'Appium · iOS + Android'], ['IoT', 'MQTT · device ↔ cloud'], ['REPORT', 'quality gate']];
      st.forEach(([a, b], i) => { const y = 170 + i * 68, run = ((t * .5) % st.length) | 0, done = i < run; x.fillStyle = done ? '#2bd46e' : i === run ? '#ffb45c' : '#24363d'; x.beginPath(); x.arc(1146, y - 8, 11, 0, 7); x.fill(); x.fillStyle = '#e9f3f7'; x.font = '600 22px "JetBrains Mono"'; x.fillText(a, 1174, y); x.fillStyle = '#8ea3ad'; x.font = '400 18px "JetBrains Mono"'; x.fillText(b, 1300, y); if (i < st.length - 1) { x.fillStyle = '#24363d'; x.fillRect(1144, y + 6, 4, 42); } });
      // device matrix + log
      panel(30, 620, 1540, 236, 'DEVICE MATRIX · 24 HANDSETS · 9 IoT DEVICES');
      for (let i = 0; i < 33; i++) { const s = (Math.sin(t * 1.3 + i * 1.7) + 1) / 2; x.fillStyle = i >= 24 ? (s > .3 ? '#ffb45c' : '#5a4630') : (s > .25 ? '#2bd46e' : '#1f4a35'); x.beginPath(); x.roundRect(60 + (i % 11) * 56, 680 + Math.floor(i / 11) * 52, 42, 38, 6); x.fill(); }
      const logs = ['[appium] iOS 17  · setpoint_sync          ✓ 2.4s', '[appium] Android 14 · leak_alert_push   ✓ 3.1s', '[graphql] subscription device.status    ✓ 180ms', '[mqtt] thermostat/42 → cloud ack          ✓ 96ms', '[appium] Flutter · onboarding_e2e       ✓ 8.7s', '[homekit] scene · away mode              ✓ 1.2s'];
      x.font = '500 19px "JetBrains Mono"'; for (let i = 0; i < 4; i++) { const l = logs[(((t * .8) | 0) + i) % logs.length]; x.fillStyle = i === 3 ? '#e9f3f7' : '#6f8790'; x.fillText(l, 720, 690 + i * 40); }
    });
    const scr = put(g, new T.Group(), .6, 5.7, -4.25);
    put(scr, rbox(8.3, 4.65, .16, .06, std(0x08090a, .3, .5)));
    put(scr, new T.Mesh(new T.PlaneGeometry(8.1, 4.45), basic({ map: dash })), 0, 0, .085);
    const glowScr = H.glow(0x5ff2e0, 12, .07); glowScr.position.set(0, 0, .6); scr.add(glowScr);
    // CI server rack
    const rack = put(g, new T.Group(), -7.4, 0, -2.6, 0, .35, 0);
    put(rack, rbox(2, 6.2, 1.8, .05, std(0x0c0e10, .4, .6)), 0, 3.1, 0);
    for (let u = 0; u < 12; u++) put(rack, box(1.7, .36, .05, std(u % 3 ? 0x1c2125 : 0x262c31, .45, .6)), 0, .5 + u * .44, .91);
    const leds = []; for (let u = 0; u < 12; u++) for (let k = 0; k < 6; k++) leds.push([-.7 + k * .1, .5 + u * .44, .945]);
    const ledMesh = inst(new T.BoxGeometry(.045, .045, .02), basic({ color: 0xffffff }), leds); rack.add(ledMesh);
    const lc = new T.Color(); for (let i = 0; i < leds.length; i++) ledMesh.setColorAt(i, lc.setHex(i % 5 ? COL.green : COL.blue));
    const rackLbl = H.text('CI · BAMBOO · 12 AGENTS', { size: .24, color: '#9fefe6' }); rackLbl.position.set(0, 6.55, .5); rack.add(rackLbl);
    // the bench: IoT test rig, phone rack, gateway, smart speaker
    put(g, box(11, .14, 3.4, std(0xd8d4cc, .5)), 0, 1.93, .5);
    [[-5.2, -.9], [5.2, -.9], [-5.2, 1.9], [5.2, 1.9]].forEach(([x, z]) => put(g, box(.12, 1.86, .12, std(0x2a3034, .4, .8)), x, .93, z));
    const rig = put(g, new T.Group(), -2.2, 3.35, -.85, -.18);
    const pegTex = canvasTex(840, 480, (x, w, h) => { x.fillStyle = '#d9dad6'; x.fillRect(0, 0, w, h); x.fillStyle = '#9da19e'; for (let i = 18; i < w; i += 30) for (let j = 18; j < h; j += 30) { x.beginPath(); x.arc(i, j, 4, 0, 7); x.fill(); } x.fillStyle = '#4d636d'; x.font = '600 22px "JetBrains Mono"'; x.fillText('IoT HIL RIG · 09 DEVICES', 24, h - 18); });
    put(rig, rbox(4.4, 2.5, .08, .05, std(0xffffff, .7, 0, { map: pegTex })));
    const white = std(0xeef0ee, .35, .1);
    const devs = [];
    [[-1.5, .55], [-.3, .55]].forEach(([x, y]) => { const d = put(rig, rbox(.75, .75, .14, .12, white), x, y, .11); put(d, new T.Mesh(rplane(.56, .3, .05), basic({ color: 0x0b2a30 })), 0, .06, .075); devs.push(d); });
    const camD = put(rig, new T.Group(), 1.0, .5, .12); put(camD, rbox(.5, .62, .3, .1, white)); put(camD, cyl(.12, .12, .05, std(0x0a0c0e, .1, .6), 20), 0, .06, .17, Math.PI / 2); devs.push(camD);
    const leakD = put(rig, cyl(.3, .3, .12, white, 32), 1.85, .5, .12, Math.PI / 2); devs.push(leakD);
    [[-1.5, -.55], [-.4, -.55], [.7, -.55], [1.75, -.55]].forEach(([x, y], k) => { const d = put(rig, k % 2 ? rbox(.5, .5, .12, .08, white) : cyl(.27, .27, .1, white, 32), x, y, .1, k % 2 ? 0 : Math.PI / 2); devs.push(d); });
    const devLeds = devs.map((d, k) => { const l = H.glow(k % 3 ? COL.cyan : COL.amber, .2); l.position.set(.2, .2, .2); d.add(l); return l; });
    const ctl = put(g, rbox(1.6, .28, .8, .06, std(0x1b2226, .45, .4)), -2.2, 2.14, .4, -Math.PI / 2 * 0);
    devs.forEach((d, k) => { const a = wp(d, 0, -.2, 0), b = wp(ctl, -.6 + k * .14, 0, -.3); g.add(tube([a, a.clone().add(V(0, -.6, .25)), b.clone().add(V(0, .3, -.2)), b], .018, std(0x15181a, .5), 24)); });
    const stand = put(g, new T.Group(), 2.6, 2.0, .3);
    put(stand, box(4.6, .12, 1.1, std(0x2a3034, .4, .7)), 0, .25, 0, -.5);
    const testTex = canvasTex(256, 520, (x, w, h) => { x.fillStyle = '#0d1d23'; x.fillRect(0, 0, w, h); for (let i = 0; i < 7; i++) { x.fillStyle = 'rgba(255,255,255,.07)'; x.beginPath(); x.roundRect(18, 70 + i * 62, w - 36, 48, 8); x.fill(); x.fillStyle = i < 5 ? '#2bd46e' : '#ffb45c'; x.font = '700 26px "JetBrains Mono"'; x.fillText(i < 5 ? '✓' : '…', w - 52, 103 + i * 62); x.fillStyle = 'rgba(233,243,247,.6)'; x.fillRect(34, 88 + i * 62, 80 + (i * 37) % 60, 10); } x.fillStyle = '#5ff2e0'; x.font = '600 20px "JetBrains Mono"'; x.fillText('APPIUM RUN', 18, 44); });
    const rackPh = [];
    for (let k = 0; k < 8; k++) { const p = put(stand, phone(1.05, testTex, k % 2 ? 0x2a2e33 : 0xa8acb0), -1.95 + k * .56, .6, -.02, -.5); rackPh.push([p.userData.screen.material, rnd() * 9]); }
    const gw = put(g, new T.Group(), -5.6 + 1.5, 2.0, .9);
    put(gw, rbox(.9, .32, .6, .06, std(0x1d2327, .45, .4)), 0, .16, 0);
    [-.3, .3].forEach((x) => put(gw, cyl(.025, .025, .8, std(0x0f1114, .5), 8), x, .65, -.25, 0, 0, x * .4));
    const gwLed = H.glow(COL.cyan, .25); gwLed.position.set(.3, .2, .32); gw.add(gwLed);
    const spk = put(g, new T.Group(), .6, 2.0, 1.4);
    put(spk, cyl(.34, .36, .85, std(0x3a3f44, 1), 40), 0, .43, 0);
    const ring = put(spk, new T.Mesh(new T.TorusGeometry(.3, .025, 10, 48), basic({ color: COL.cyan, transparent: true })), 0, .87, 0, Math.PI / 2);
    put(g, cyl(.13, .11, .3, std(0xf2efe8, .4), 24), 4.7, 2.15, 1.5);
    // data path: rig → CI → dashboard
    const pA = wp(ctl), pB = wp(rack, 0, 6.2, .9), pC = wp(scr, -4.1, 1.6, .1);
    const flow = new T.CatmullRomCurve3([pA, pA.clone().add(V(-2, 2.2, -.5)), pB, pC.clone().add(V(-1, .5, .3)), pC]);
    g.add(H.line(flow.getPoints(80), COL.cyan, .3)); const pu = H.pulses(flow, COL.cyan, 4, .1, .35); g.add(pu); ticks.push(pu.userData.tick);
    keyLight(g, V(4, 14, 10), V(0, 2.5, -1), 1700, 0xfff1e0, .62);
    const blueFill = new T.PointLight(0x5ff2e0, 40, 14, 2); blueFill.position.set(.6, 4.4, -2.6); g.add(blueFill);
    let last = -1; const cA = new T.Color(1, 1, 1), cB = new T.Color(.55, 1, .75);
    ticks.push((t) => {
      if (t - last > .09) { dash.redraw(t); last = t; for (let i = 0; i < leds.length; i++) ledMesh.setColorAt(i, lc.setHex(Math.sin(t * (3 + i % 7) + i) > .4 ? (i % 5 ? COL.green : COL.blue) : 0x0a1a12)); ledMesh.instanceColor.needsUpdate = true; }
      rackPh.forEach(([m, ph]) => m.color.copy(cA).lerp(cB, Math.max(0, Math.sin(t * 2 + ph)) * .5));
      devLeds.forEach((l, k) => { l.material.opacity = .35 + .65 * Math.max(0, Math.sin(t * 3 + k)); });
      ring.material.opacity = .5 + .5 * Math.sin(t * 2.4); gwLed.material.opacity = Math.sin(t * 9) > 0 ? 1 : .3;
    });
    pinAt(pins, 'days', scr, -2.4, .9, .1); pinAt(pins, 'cov', scr, .5, .4, .1);
    pinAt(pins, 'ci', rack, 0, 5.4, .95); pinAt(pins, 'gql', gw, 0, .4, 0); pinAt(pins, 'iot', spk, 0, .9, 0); pinAt(pins, 'farm', stand, 1.2, 1.2, 0);
    g.userData.tick = (t) => ticks.forEach((f) => f(t));
    return { group: g, pins, cam: V(4.2, 8.6, 22), look: V(-.6, 3.7, -1) };
  });

  /* ==================================================================
     2024 · ADVANCED ENGINEER — the connected-home app portfolio
  ================================================================== */
  scenes.push(function scenePortfolio() {
    const g = new T.Group(), pins = {}, ticks = [];
    put(g, rbox(14, 4.6, .5, .25, std(0x161b1f, .22, .5)), 0, -.25, .4, -Math.PI / 2);
    put(g, box(14, .02, .04, basic({ color: COL.cyan })), 0, .01, 2.71);
    const apps = [
      { name: 'FIRST ALERT', tag: 'FLUTTER · B2C', c: '#ff6b6b', draw: (x, w) => { x.fillStyle = '#e9f3f7'; x.font = '600 50px "Space Grotesk"'; x.fillText('Home is safe', 40, 230); x.strokeStyle = '#ff6b6b'; x.lineWidth = 16; x.beginPath(); x.arc(w / 2, 420, 110, 0, 7); x.stroke(); x.fillStyle = '#ff6b6b'; x.font = '600 74px "Space Grotesk"'; x.textAlign = 'center'; x.fillText('✓', w / 2, 446); x.textAlign = 'left'; [['Smoke', 'Clear'], ['CO', '0 ppm'], ['Water', 'Dry'], ['Doorbell', 'Live']].forEach(([a, b], i) => { const y = 600 + i * 84; x.fillStyle = 'rgba(255,255,255,.06)'; x.beginPath(); x.roundRect(40, y, w - 80, 68, 14); x.fill(); x.fillStyle = '#8ea3ad'; x.font = '500 24px "DM Sans"'; x.fillText(a, 66, y + 44); x.fillStyle = '#e9f3f7'; x.textAlign = 'right'; x.fillText(b, w - 66, y + 44); x.textAlign = 'left'; }); } },
      { name: 'RESIDEO PRO', tag: 'FLUTTER · B2B', c: '#ffb45c', draw: (x, w) => { x.fillStyle = '#e9f3f7'; x.font = '600 46px "Space Grotesk"'; x.fillText('Install wizard', 40, 230); x.fillStyle = '#8ea3ad'; x.font = '500 24px "DM Sans"'; x.fillText('Step 3 of 5 · pair device', 40, 274); x.fillStyle = '#24363d'; x.fillRect(40, 310, w - 80, 10); x.fillStyle = '#ffb45c'; x.fillRect(40, 310, (w - 80) * .6, 10); [['Wi-Fi network', '✓'], ['Wiring check', '✓'], ['Pair device', '…'], ['Diagnostics', ''], ['Hand-over', '']].forEach(([a, b], i) => { const y = 370 + i * 96; x.fillStyle = i === 2 ? 'rgba(255,180,92,.14)' : 'rgba(255,255,255,.05)'; x.beginPath(); x.roundRect(40, y, w - 80, 76, 14); x.fill(); x.fillStyle = '#e9f3f7'; x.font = '500 26px "DM Sans"'; x.fillText(a, 66, y + 48); x.fillStyle = '#ffb45c'; x.fillText(b, w - 90, y + 48); }); } },
      { name: 'HONEYWELL HOME', tag: 'NATIVE · B2C', c: '#5ff2e0', draw: (x, w) => { x.lineCap = 'round'; x.strokeStyle = '#13262d'; x.lineWidth = 26; x.beginPath(); x.arc(w / 2, 470, 170, Math.PI * .75, Math.PI * 2.25); x.stroke(); x.strokeStyle = '#ffb45c'; x.beginPath(); x.arc(w / 2, 470, 170, Math.PI * .75, Math.PI * 1.7); x.stroke(); x.fillStyle = '#e9f3f7'; x.font = '500 120px "Space Grotesk"'; x.textAlign = 'center'; x.fillText('21°', w / 2, 510); x.font = '500 26px "DM Sans"'; x.fillStyle = '#ffb45c'; x.fillText('Heating to 22°', w / 2, 560); x.textAlign = 'left'; ['Heat', 'Cool', 'Auto', 'Off'].forEach((m, i) => { const bx = 40 + i * 110; x.fillStyle = i ? 'rgba(255,255,255,.06)' : 'rgba(255,180,92,.2)'; x.beginPath(); x.roundRect(bx, 720, 96, 64, 14); x.fill(); x.fillStyle = '#e9f3f7'; x.font = '500 22px "DM Sans"'; x.fillText(m, bx + 20, 760); }); } },
      { name: 'TOTAL CONNECT', tag: 'NATIVE · EMEA', c: '#7aa2ff', draw: (x, w) => { x.fillStyle = '#e9f3f7'; x.font = '600 46px "Space Grotesk"'; x.fillText('Zones', 40, 230); [['Living', '21°'], ['Kitchen', '20°'], ['Bedroom', '18°'], ['Office', '20°']].forEach(([a, b], i) => { const y = 270 + i * 90; x.fillStyle = 'rgba(255,255,255,.05)'; x.beginPath(); x.roundRect(40, y, w - 80, 72, 14); x.fill(); x.fillStyle = '#8ea3ad'; x.font = '500 26px "DM Sans"'; x.fillText(a, 66, y + 46); x.fillStyle = '#e9f3f7'; x.textAlign = 'right'; x.fillText(b, w - 66, y + 46); x.textAlign = 'left'; }); x.fillStyle = 'rgba(122,162,255,.16)'; x.beginPath(); x.roundRect(40, 650, w - 80, 120, 18); x.fill(); x.fillStyle = '#7aa2ff'; x.font = '600 22px "JetBrains Mono"'; x.fillText('SECURITY', 66, 696); x.fillStyle = '#e9f3f7'; x.font = '600 34px "Space Grotesk"'; x.fillText('Armed · Stay', 66, 746); } },
    ];
    const phones = apps.map((a, i) => {
      const tex = canvasTex(512, 1040, (x, w, h) => {
        const bg = x.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#0f2128'); bg.addColorStop(1, '#060c10'); x.fillStyle = bg; x.fillRect(0, 0, w, h);
        x.fillStyle = '#8ea3ad'; x.font = '500 20px "JetBrains Mono"'; x.fillText('9:41', 40, 54);
        x.fillStyle = a.c; x.font = '600 22px "JetBrains Mono"'; x.fillText(a.name, 40, 140);
        a.draw(x, w, h);
        x.fillStyle = '#4d636d'; x.font = '500 16px "JetBrains Mono"'; x.fillText(`${a.tag} · ILLUSTRATIVE`, 40, h - 60);
      });
      const x = -4.7 + i * 3.13, z = Math.abs(i - 1.5) * .45;
      const p = put(g, phone(3.9, tex, [0x9aa0a6, 0x2a2f34, 0xc9c1b4, 0x3a4048][i]), x, 2.05, z, -.06, -x * .05, 0);
      put(g, box(1.4, .05, .7, glassMat(0xdff3ff, .35)), x, .03, z + .1);
      return p;
    });
    // the release lifecycle, with the analytics feedback loop closing back to requirements
    const stages = ['REQUIREMENTS', 'DESIGN REVIEW', 'BETA', 'UAT · TESTFLIGHT / PLAY', 'RELEASE', 'AMPLITUDE'];
    const sx = (i) => -6 + i * 2.4, sy = .3, szz = -1.6;
    const lane = new T.CurvePath(); for (let i = 0; i < stages.length - 1; i++) lane.add(new T.LineCurve3(V(sx(i), sy, szz), V(sx(i + 1), sy, szz)));
    g.add(H.line(lane.getPoints(60), COL.cyan, .5));
    const nodes = stages.map((s, i) => {
      const n = put(g, rbox(.7, .3, .7, .08, std(0x1b2328, .3, .5)), sx(i), .15, szz);
      const cap = put(g, box(.5, .02, .5, basic({ color: i === 5 ? COL.amber : COL.cyan, transparent: true, opacity: .3 })), sx(i), .31, szz);
      const l = H.text(s, { size: .2, color: '#9fc9cc' }); l.position.set(sx(i), .75, szz); g.add(l);
      return cap;
    });
    const loop = new T.CubicBezierCurve3(V(sx(5), .4, szz), V(sx(5), 4.6, szz - 1.2), V(sx(0), 4.6, szz - 1.2), V(sx(0), .4, szz));
    g.add(H.line(loop.getPoints(80), COL.amber, .45)); const lp = H.pulses(loop, COL.amber, 3, .12, .4); g.add(lp); ticks.push(lp.userData.tick);
    const lt = H.text('FEEDBACK LOOP · USAGE DATA → NEXT TEST CYCLE', { size: .22, color: '#ffcf94' }); lt.position.set(0, 4.25, szz - .9); g.add(lt);
    const runner = H.glow(COL.cyan, .9); g.add(runner);
    // analytics hologram
    const ana = canvasTex(720, 420, (x, w, h, t) => {
      x.clearRect(0, 0, w, h); x.fillStyle = 'rgba(10,30,36,.55)'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(95,242,224,.6)'; x.lineWidth = 3; x.strokeRect(2, 2, w - 4, h - 4);
      x.fillStyle = '#ffb45c'; x.font = '600 22px "JetBrains Mono"'; x.fillText('BEHAVIOURAL ANALYTICS · FUNNEL', 24, 40);
      const f = [100, 82, 71, 64, 58]; f.forEach((v, i) => { x.fillStyle = `rgba(95,242,224,${.3 + i * .12})`; x.fillRect(30 + i * 132, 360 - v * 2.6, 100, v * 2.6); x.fillStyle = '#e9f3f7'; x.font = '500 18px "JetBrains Mono"'; x.fillText(`${v}%`, 52 + i * 132, 350 - v * 2.6); });
      x.strokeStyle = '#ffb45c'; x.lineWidth = 3; x.beginPath(); for (let i = 0; i <= 40; i++) { const xx = 30 + i * 16, yy = 150 + Math.sin(i * .5 + t) * 18 - i; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke();
    });
    const holo = put(g, new T.Mesh(new T.PlaneGeometry(3.6, 2.1), basic({ map: ana, transparent: true, side: T.DoubleSide, depthWrite: false })), 5.2, 5.6, -1.4, 0, -.25, 0);
    keyLight(g, V(0, 13, 10), V(0, 1.5, 0), 1700, 0xfff1e0, .6);
    const rimP = new T.PointLight(COL.cyan, 50, 16, 2); rimP.position.set(0, 4, -4); g.add(rimP);
    let last = -1;
    ticks.push((t) => {
      phones.forEach((p, i) => { p.position.y = 2.05 + Math.sin(t * .8 + i * 1.2) * .06; });
      const u = (t * .12) % 1; runner.position.copy(lane.getPointAt(u)); const at = Math.floor(u * 5 + .5);
      nodes.forEach((n, i) => { n.material.opacity += ((i === at ? 1 : .25) - n.material.opacity) * .1; });
      if (t - last > .1) { ana.redraw(t); last = t; }
      holo.position.y = 5.6 + Math.sin(t * .7) * .08;
    });
    pinAt(pins, 'apps', phones[1], 0, 1.4, .1); pinAt(pins, 'req', g, sx(0), .5, szz); pinAt(pins, 'uat', g, sx(3), .5, szz); pinAt(pins, 'amp', holo, 1.4, .8, 0);
    g.userData.tick = (t) => ticks.forEach((f) => f(t));
    return { group: g, pins, cam: V(1.8, 5.6, 17.5), look: V(0, 2.3, -.5) };
  });

  /* ==================================================================
     AWARDS — the recognition shelf
  ================================================================== */
  scenes.push(function sceneAwards() {
    const g = new T.Group(), pins = {}, ticks = [];
    const flute = []; for (let x = -8; x <= 8.01; x += .36) flute.push([x, 3, -2.2]);
    g.add(inst(new T.CylinderGeometry(.16, .16, 9, 12), std(0x2b211a, .62), flute));
    put(g, box(16.5, .5, 3, std(0x3a2b21, .45, .05)), 0, -.25, 0);
    put(g, box(16.5, .04, .04, basic({ color: 0xffd9a0 })), 0, -.52, 1.5);
    const spec = [
      ['GOLD', 0xe7b64a, 'DAS ENHANCEMENT AWARD', 1.25], ['SILVER', 0xc9d1d9, 'FIRST ALERT APP RELEASE', 1],
      ['SILVER', 0xc9d1d9, 'REFACTORED APP RELEASE', 1], ['SILVER', 0xc9d1d9, 'VPD · ENGINEERING EXCELLENCE', 1], ['BRONZE', 0xc0804e, 'RED COMPLIANCE · EUROPE', 1],
    ];
    const slots = [2, 1, 3, 0, 4], emblems = [];
    const glowTex = canvasTex(256, 256, (x) => { const r = x.createRadialGradient(128, 128, 0, 128, 128, 128); r.addColorStop(0, 'rgba(255,225,170,.55)'); r.addColorStop(1, 'rgba(255,225,170,0)'); x.fillStyle = r; x.fillRect(0, 0, 256, 256); });
    spec.forEach(([tier, col, name, s], i) => {
      const x = (slots[i] - 2) * 3.1, tr = put(g, new T.Group(), x, 0, slots[i] === 2 ? .3 : 0);
      put(tr, rbox(1.25 * s, .55, 1.25 * s, .06, std(0x0e0f11, .18, .2)), 0, .275, 0, -Math.PI / 2);
      const cg = new T.CylinderGeometry(.26 * s, .5 * s, 2.5 * s, 6); const crystal = put(tr, new T.Mesh(cg, phys({ color: 0xe6f3fb, roughness: .03, metalness: 0, transparent: true, opacity: .32, clearcoat: 1, flatShading: true, depthWrite: false })), 0, .55 + 1.25 * s, 0);
      crystal.add(H.edges(cg, 0xffffff, .28));
      const em = put(tr, new T.Group(), 0, .55 + 2.5 * s + .55 * s, 0);
      const metal = std(col, .2, 1);
      put(em, cyl(.5 * s, .5 * s, .1, metal, 48), 0, 0, 0, Math.PI / 2);
      const star = new T.Shape(); for (let k = 0; k < 10; k++) { const rr = k % 2 ? .15 * s : .36 * s, a = k * Math.PI / 5 + Math.PI / 2; k ? star.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : star.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); }
      put(em, new T.Mesh(new T.ExtrudeGeometry(star, { depth: .05, bevelEnabled: true, bevelThickness: .02, bevelSize: .015, bevelSegments: 2 }), metal), 0, 0, .05);
      put(em, new T.Mesh(new T.TorusGeometry(.44 * s, .025, 8, 48), metal), 0, 0, .05);
      const plaque = canvasTex(512, 160, (c, w, h) => { c.fillStyle = '#1b1c1e'; c.fillRect(0, 0, w, h); c.strokeStyle = `#${col.toString(16)}`; c.lineWidth = 4; c.strokeRect(8, 8, w - 16, h - 16); c.fillStyle = `#${col.toString(16)}`; c.font = '700 34px "JetBrains Mono"'; c.textAlign = 'center'; c.fillText(tier, w / 2, 62); c.fillStyle = '#d8dde0'; c.font = '600 24px "JetBrains Mono"'; c.fillText(name, w / 2, 108); c.fillStyle = '#7d8a90'; c.font = '500 18px "JetBrains Mono"'; c.fillText('RESIDEO · HONEYWELL HOME', w / 2, 140); });
      put(tr, new T.Mesh(new T.PlaneGeometry(1.15 * s, .36 * s), std(0xffffff, .3, .6, { map: plaque })), 0, .28, .63 * s + .01);
      const pool = put(g, new T.Mesh(new T.CircleGeometry(1.5, 40), basic({ map: glowTex, transparent: true, depthWrite: false, blending: T.AdditiveBlending })), x, .01, tr.position.z, -Math.PI / 2);
      const beam = put(g, new T.Mesh(new T.ConeGeometry(1.4, 7, 32, 1, true), basic({ color: 0xffe2b0, transparent: true, opacity: .045, depthWrite: false, blending: T.AdditiveBlending, side: T.DoubleSide })), x, 3.6, tr.position.z);
      emblems.push([em, i]); pinAt(pins, 'm' + i, em, 0, 0, .15);
    });
    keyLight(g, V(0, 12, 8), V(0, 1.5, 0), 1500, 0xffe9cc, .7);
    const warmL = new T.PointLight(0xffd9a0, 40, 14, 2); warmL.position.set(0, 6, 3); g.add(warmL);
    ticks.push((t) => emblems.forEach(([em, i]) => { em.rotation.y = Math.sin(t * .6 + i) * .5; em.position.y += Math.sin(t * 1.1 + i) * .0015; }));
    g.userData.tick = (t) => ticks.forEach((f) => f(t));
    return { group: g, pins, cam: V(0, 5.4, 21.5), look: V(0, 2.4, 0) };
  });

  /* ==================================================================
     2026 · VERIVOX — today's desk, Germany outside the window
  ================================================================== */
  scenes.push(function sceneDesk() {
    const g = new T.Group(), pins = {}, ticks = [];
    const sky = canvasTex(2048, 900, (x, w, h) => {
      const gr = x.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#050b16'); gr.addColorStop(.7, '#10233a'); gr.addColorStop(1, '#1d2c3a'); x.fillStyle = gr; x.fillRect(0, 0, w, h);
      for (let i = 0; i < 260; i++) { x.fillStyle = `rgba(255,255,255,${rnd() * .6})`; x.fillRect(rnd() * w, rnd() * h * .55, 2, 2); }
      x.fillStyle = '#e9e4d6'; x.beginPath(); x.arc(1650, 160, 38, 0, 7); x.fill();
      let bx = 0; x.fillStyle = '#0a121b';
      while (bx < w) { const bw = 60 + rnd() * 120, bh = 120 + rnd() * 220; x.beginPath(); x.moveTo(bx, h); x.lineTo(bx, h - bh); x.lineTo(bx + bw / 2, h - bh - bw * .55); x.lineTo(bx + bw, h - bh); x.lineTo(bx + bw, h); x.fill();
        for (let k = 0; k < 6; k++) if (rnd() > .45) { x.fillStyle = rnd() > .5 ? '#ffcf8a' : '#f2b35e'; x.fillRect(bx + 10 + rnd() * (bw - 26), h - bh + 20 + rnd() * (bh - 40), 10, 14); x.fillStyle = '#0a121b'; }
        bx += bw + 4; }
      x.fillStyle = '#0a121b'; x.fillRect(880, h - 520, 34, 520); x.beginPath(); x.moveTo(870, h - 520); x.lineTo(897, h - 700); x.lineTo(924, h - 520); x.fill();
      x.fillStyle = '#ff5a43'; x.fillRect(894, h - 706, 6, 6);
    });
    put(g, new T.Mesh(new T.PlaneGeometry(26, 11.4), basic({ map: sky })), 0, 4.2, -9);
    const frame = std(0x15191c, .4, .7);
    put(g, box(20, .2, .2, frame), 0, 8.4, -5); put(g, box(20, .2, .2, frame), 0, -.2, -5);
    [-9.9, -3.3, 3.3, 9.9].forEach((x) => put(g, box(.2, 8.6, .2, frame), x, 4.1, -5));
    put(g, new T.Mesh(new T.PlaneGeometry(19.8, 8.4), glassMat(0x9fc0d8, .08)), 0, 4.1, -4.95);
    put(g, rbox(13, 5.6, .26, .1, std(0x5a4130, .5)), 0, -.13, 0, -Math.PI / 2);
    put(g, box(13, .02, .04, basic({ color: 0xffd9a0 })), 0, -.27, 2.79);
    // laptop running the suites
    const lap = put(g, new T.Group(), -2.6, 0, .4, 0, .28, 0);
    put(lap, rbox(4, 2.7, .12, .1, std(0xb9bdc2, .32, .9)), 0, .06, 0, -Math.PI / 2);
    put(lap, new T.Mesh(new T.PlaneGeometry(3.5, 1.4), std(0xffffff, .6, .2, { map: canvasTex(1024, 410, (x, w, h) => { x.fillStyle = '#9da2a7'; x.fillRect(0, 0, w, h); x.fillStyle = '#16191c'; for (let r = 0; r < 5; r++) for (let c = 0; c < 14; c++) { x.beginPath(); x.roundRect(14 + c * 71, 14 + r * 78, 62, 68, 8); x.fill(); } }) })), 0, .125, -.45, -Math.PI / 2);
    put(lap, rbox(1.4, .9, .01, .05, std(0xa8adb2, .25, .8)), 0, .125, .75, -Math.PI / 2);
    const lid = put(lap, new T.Group(), 0, .12, -1.33, -.28);
    put(lid, rbox(4, 2.7, .08, .1, std(0xb9bdc2, .32, .9)), 0, 1.35, 0);
    let typed = 0;
    const term = canvasTex(1024, 680, (x, w, h, t) => {
      x.fillStyle = '#0b1115'; x.fillRect(0, 0, w, h); x.fillStyle = '#151d22'; x.fillRect(0, 0, w, 44);
      ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => { x.fillStyle = c; x.beginPath(); x.arc(28 + i * 26, 22, 8, 0, 7); x.fill(); });
      x.fillStyle = '#8ea3ad'; x.font = '500 18px "JetBrains Mono"'; x.fillText('mobile-qa — e2e', w / 2 - 70, 28);
      const L = [['$ ', 'detox test -c ios.sim.release', '#e9f3f7'], ['  ✓ ', 'app launches to home   (1.8s)', '#7dffa8'], ['  ✓ ', 'onboarding flow        (4.2s)', '#7dffa8'], ['  ✓ ', 'deep-link routing      (2.1s)', '#7dffa8'], ['$ ', 'npm run appium:android', '#e9f3f7'], ['  ✓ ', 'navigation back-stack  (3.0s)', '#7dffa8'], ['  ✓ ', 'form validation        (2.6s)', '#7dffa8'], ['  ✓ ', 'accessibility labels   (1.4s)', '#7dffa8'], ['', 'Tests: 48 passed · iOS + Android', '#ffb45c']];
      x.font = '500 26px "JetBrains Mono"';
      for (let i = 0; i < Math.min(L.length, typed); i++) { const [p, s, c] = L[i]; x.fillStyle = p.trim() === '✓' ? '#7dffa8' : '#5ff2e0'; x.fillText(p, 30, 100 + i * 60); x.fillStyle = c; x.fillText(s, 30 + x.measureText(p).width, 100 + i * 60); }
      if (Math.sin(t * 6) > 0) { x.fillStyle = '#5ff2e0'; x.fillRect(30, 76 + Math.min(L.length, typed) * 60, 14, 28); }
    });
    put(lid, new T.Mesh(new T.PlaneGeometry(3.7, 2.4), basic({ map: term })), 0, 1.35, .045);
    const lcdGlow = H.glow(0x5ff2e0, 5, .08); lcdGlow.position.set(0, 1.4, .8); lid.add(lcdGlow);
    // iOS + Android on desk stands
    const journey = canvasTex(512, 1040, (x, w, h) => {
      const bg = x.createLinearGradient(0, 0, w, h); bg.addColorStop(0, '#132b31'); bg.addColorStop(.6, '#0a171c'); bg.addColorStop(1, '#1c160c'); x.fillStyle = bg; x.fillRect(0, 0, w, h);
      x.fillStyle = '#8ea3ad'; x.font = '500 17px "JetBrains Mono"'; x.fillText('MOBILE EXPERIENCE', 40, 100);
      x.fillStyle = '#f2ece0'; x.font = '500 60px "Space Grotesk"'; ['Every', 'journey.', 'Every detail.'].forEach((l, i) => x.fillText(l, 40, 200 + i * 70));
      [['01', 'Explore'], ['02', 'Interact'], ['03', 'Complete']].forEach(([n, a], i) => { const y = 480 + i * 120; x.strokeStyle = 'rgba(255,255,255,.12)'; x.beginPath(); x.moveTo(40, y - 50); x.lineTo(w - 40, y - 50); x.stroke(); x.fillStyle = '#6f8189'; x.font = '500 16px "JetBrains Mono"'; x.fillText(n, 40, y); x.fillStyle = '#f2ece0'; x.font = '500 32px "Space Grotesk"'; x.fillText(a, 96, y); x.fillStyle = '#ffb45c'; x.fillText('✓', w - 70, y); });
      x.fillStyle = '#5c6b70'; x.font = '500 12px "JetBrains Mono"'; x.fillText('ILLUSTRATIVE — NOT THE VERIVOX APP UI', 70, 990);
    });
    const mkStand = (x, z, ry) => { const s = put(g, new T.Group(), x, 0, z, 0, ry, 0); put(s, rbox(1.3, .1, 1.1, .1, std(0x2a2e32, .35, .8)), 0, .05, 0, -Math.PI / 2); put(s, box(.9, 1.4, .06, std(0x2a2e32, .35, .8)), 0, .75, -.2, -.35); return s; };
    const s1 = mkStand(2.1, -.1, -.22), s2 = mkStand(4.6, -.5, -.42);
    const ios = put(s1, phone(3.1, journey, 0xb7b0a3, 0x8f877a), 0, 1.75, .12, -.3);
    const and = put(s2, phone(3.0, journey, 0x24282c, 0x1a1d20), 0, 1.7, .12, -.3);
    const li = H.text('iOS', { size: .26, color: '#ffcf94' }); li.position.set(2.1, .3, 1.0); g.add(li);
    const la = H.text('ANDROID', { size: .26, color: '#9fefe6' }); la.position.set(4.6, .3, .6); g.add(la);
    // mug with steam, notebook, plant
    const mug = put(g, new T.Group(), .4, 0, 1.6);
    put(mug, cyl(.32, .3, .75, std(0xeeeae2, .4), 32), 0, .38, 0); put(mug, new T.Mesh(new T.TorusGeometry(.2, .05, 10, 24), std(0xeeeae2, .4)), .34, .4, 0);
    put(mug, cyl(.28, .28, .02, std(0x3b2416, .2), 32), 0, .7, 0);
    const steam = []; for (let k = 0; k < 6; k++) { const s = H.glow(0xffffff, .6, .1); mug.add(s); steam.push([s, k / 6]); }
    put(g, box(1.8, .08, 2.4, std(0x23313a, .7)), -5.6, .04, 1.4, 0, .3, 0);
    put(g, cyl(.35, .28, .6, std(0x7b7d78, .7), 24), 5.8, .3, 1.6);
    for (let k = 0; k < 9; k++) { const l = put(g, new T.Mesh(new T.SphereGeometry(.2, 10, 8), std(k % 2 ? 0x3c6550 : 0x56785b, .9)), 5.8 + Math.cos(k * 2.4) * .2, .9 + (k % 3) * .2, 1.6 + Math.sin(k * 2.4) * .2); l.scale.set(.6, 1.6, .7); }
    keyLight(g, V(2, 11, 8), V(0, 1, 0), 1300, 0xffe7c4, .6);
    const coolW = new T.PointLight(0x7aa2ff, 45, 20, 2); coolW.position.set(0, 4, -4); g.add(coolW);
    let since = performance.now(); g.userData.onEnter = () => { since = performance.now(); typed = 0; };
    let last = -1;
    ticks.push((t) => {
      typed = Math.min(9, Math.floor((performance.now() - since - 700) / 420));
      if (t - last > .12) { term.redraw(t); last = t; }
      steam.forEach(([s, ph]) => { const k = (t * .25 + ph) % 1; s.position.set(Math.sin(k * 6 + ph * 9) * .12, .85 + k * 1.4, 0); s.material.opacity = Math.sin(k * Math.PI) * .12; s.scale.setScalar(.4 + k * .8); });
      ios.position.y = 1.75; and.position.y = 1.7;
    });
    pinAt(pins, 'phone', ios, 0, 1.2, .1); pinAt(pins, 'twin', and, 0, 1.2, .1); pinAt(pins, 'chip', lid, 0, 2.4, 0);
    g.userData.tick = (t) => ticks.forEach((f) => f(t));
    return { group: g, pins, cam: V(1.6, 5.4, 13.5), look: V(.6, 1.7, -.6) };
  });

  return { scenes, kit: { rnd, std, phys, basic, glassMat, rrShape, rbox, rplane, box, cyl, put, tube, V, canvasTex, inst, keyLight, pinAt, wp, blink, phone, homeApp, ink } };
}
