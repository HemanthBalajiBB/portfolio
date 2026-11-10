/* ==================================================================
   CINEMA — the lens the journey is shot through.
   Scene → HDR target → depth-of-field (miniature / macro look) →
   bloom → filmic tone-map → per-chapter grade → vignette → grain.
   Falls back to a plain render if float targets are unavailable.
================================================================== */
export function createCinema(T, renderer, { compact = false } = {}) {
  const caps = renderer.capabilities, ext = renderer.extensions;
  const ok = caps.isWebGL2 && (ext.has('EXT_color_buffer_float') || ext.has('EXT_color_buffer_half_float'));
  if (!ok) return { ok: false, render: (scene, camera) => renderer.render(scene, camera), setSize() {}, u: null };

  const rt = (o = {}) => new T.WebGLRenderTarget(4, 4, { type: T.HalfFloatType, depthBuffer: false, minFilter: T.LinearFilter, magFilter: T.LinearFilter, ...o });
  const main = rt({ depthBuffer: true, samples: compact ? 2 : 4 });
  main.depthTexture = new T.DepthTexture(4, 4);
  const hA = rt(), hB = rt(), qA = rt(), qB = rt(), bA = rt(), bB = rt(), eA = rt(), eB = rt();

  const cam = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quad = new T.Mesh(new T.PlaneGeometry(2, 2));
  const stage = new T.Scene(); stage.add(quad);
  const vert = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }';
  const mat = (frag, uniforms) => new T.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms, depthTest: false, depthWrite: false });

  const down = mat(`varying vec2 vUv; uniform sampler2D t; uniform vec2 px; uniform float thr;
    void main(){ vec3 c = (texture2D(t, vUv + px*vec2(-.5,-.5)).rgb + texture2D(t, vUv + px*vec2(.5,-.5)).rgb + texture2D(t, vUv + px*vec2(-.5,.5)).rgb + texture2D(t, vUv + px*vec2(.5,.5)).rgb) * .25;
      if (thr > 0.) { float l = max(c.r, max(c.g, c.b)); c *= smoothstep(thr, thr + 1.2, l); }
      gl_FragColor = vec4(min(c, vec3(24.)), 1.); }`, { t: { value: null }, px: { value: new T.Vector2() }, thr: { value: 0 } });
  const blur = mat(`varying vec2 vUv; uniform sampler2D t; uniform vec2 d;
    void main(){ vec3 c = texture2D(t, vUv).rgb * .227027;
      c += (texture2D(t, vUv + d*1.3846).rgb + texture2D(t, vUv - d*1.3846).rgb) * .316216;
      c += (texture2D(t, vUv + d*3.2308).rgb + texture2D(t, vUv - d*3.2308).rgb) * .070270;
      gl_FragColor = vec4(c, 1.); }`, { t: { value: null }, d: { value: new T.Vector2() } });
  const u = {
    tScene: { value: main.texture }, tDepth: { value: main.depthTexture }, tHalf: { value: hA.texture }, tQuart: { value: qA.texture }, tBloomA: { value: bA.texture }, tBloomB: { value: eA.texture },
    near: { value: .1 }, far: { value: 2000 }, focus: { value: 20 }, band: { value: 5 }, ramp: { value: 26 }, dof: { value: 1 }, rack: { value: 0 },
    bloom: { value: .26 }, expo: { value: 1.06 }, grain: { value: .024 }, vig: { value: .5 }, aberr: { value: .0012 }, time: { value: 0 },
    tint: { value: new T.Color(1, 1, 1) }, glow: { value: new T.Color(0, 0, 0) }, centre: { value: new T.Vector2(.62, .5) }, res: { value: new T.Vector2(1, 1) },
  };
  const comp = mat(`varying vec2 vUv;
    uniform sampler2D tScene, tDepth, tHalf, tQuart, tBloomA, tBloomB;
    uniform float near, far, focus, band, ramp, dof, rack, bloom, expo, grain, vig, aberr, time;
    uniform vec3 tint, glow; uniform vec2 centre, res;
    float lin(float d){ float z = d * 2. - 1.; return 2. * near * far / (far + near - z * (far - near)); }
    vec3 aces(vec3 x){ return clamp((x * (2.51 * x + .03)) / (x * (2.43 * x + .59) + .14), 0., 1.); }
    float hash(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
    void main(){
      float d = texture2D(tDepth, vUv).x, z = lin(d);
      float coc = smoothstep(band, band + ramp, abs(z - focus)) * dof;
      coc = max(coc, rack);
      vec2 dir = vUv - .5; float ab = aberr * (1. + rack * 5.);
      vec3 sharp = vec3(texture2D(tScene, vUv + dir * ab).r, texture2D(tScene, vUv).g, texture2D(tScene, vUv - dir * ab).b);
      vec3 hb = texture2D(tHalf, vUv).rgb, qb = texture2D(tQuart, vUv).rgb;
      vec3 col = coc < .5 ? mix(sharp, hb, coc * 2.) : mix(hb, qb, coc * 2. - 2. * .5);
      // backdrop: a soft pool of chapter-coloured light behind the exhibit
      vec2 gp = (vUv - centre) * vec2(res.x / res.y, 1.);
      float sky = smoothstep(.9985, 1., d);
      col += glow * (exp(-dot(gp, gp) * 3.2) * .15 + exp(-dot(gp, gp) * .7) * .035) * mix(.12, 1., sky);
      col += (texture2D(tBloomA, vUv).rgb * .6 + texture2D(tBloomB, vUv).rgb * .9) * bloom;
      col = aces(col * expo);
      float l = dot(col, vec3(.2126, .7152, .0722));
      col *= mix(tint, vec3(1.), smoothstep(0., .75, l));          // grade the shadows and mids, keep highlights clean
      col = mix(vec3(l), col, 1.06);
      float r = length(dir * vec2(1.1, 1.));
      col *= 1. - vig * smoothstep(.32, .98, r);
      col += (hash(gl_FragCoord.xy + floor(time * 24.) * vec2(37., 17.)) - .5) * grain * (1. - l * .6);
      col = mix(col * 12.92, 1.055 * pow(max(col, vec3(0.)), vec3(1. / 2.4)) - .055, step(.0031308, col));
      gl_FragColor = vec4(col, 1.);
    }`, u);

  let W = 4, H = 4;
  const pass = (m, target) => { quad.material = m; renderer.setRenderTarget(target); renderer.render(stage, cam); };
  const blurInto = (a, b, w, h, spread = 1) => { // a → b (horizontal) → a (vertical)
    blur.uniforms.t.value = a.texture; blur.uniforms.d.value.set(spread / w, 0); pass(blur, b);
    blur.uniforms.t.value = b.texture; blur.uniforms.d.value.set(0, spread / h); pass(blur, a);
  };
  return {
    ok: true, u,
    setSize(w, h) {
      W = Math.max(4, w | 0); H = Math.max(4, h | 0);
      main.setSize(W, H);
      const h2w = W >> 1, h2h = H >> 1, q4w = W >> 2, q4h = H >> 2, e8w = W >> 3, e8h = H >> 3;
      hA.setSize(h2w, h2h); hB.setSize(h2w, h2h); qA.setSize(q4w, q4h); qB.setSize(q4w, q4h); bA.setSize(q4w, q4h); bB.setSize(q4w, q4h); eA.setSize(e8w, e8h); eB.setSize(e8w, e8h);
      u.res.value.set(W, H);
    },
    render(scene, camera) {
      u.near.value = camera.near; u.far.value = camera.far;
      renderer.setRenderTarget(main); renderer.render(scene, camera);
      const hw = W >> 1, hh = H >> 1, qw = W >> 2, qh = H >> 2, ew = W >> 3, eh = H >> 3;
      down.uniforms.thr.value = 0;
      down.uniforms.t.value = main.texture; down.uniforms.px.value.set(1 / W, 1 / H); pass(down, hA);
      blurInto(hA, hB, hw, hh, 1.2);
      down.uniforms.t.value = hA.texture; down.uniforms.px.value.set(1 / hw, 1 / hh); pass(down, qA);
      blurInto(qA, qB, qw, qh, 1.5);
      down.uniforms.thr.value = 1.25; down.uniforms.t.value = hA.texture; pass(down, bA);
      blurInto(bA, bB, qw, qh, 1.4);
      down.uniforms.thr.value = 0; down.uniforms.t.value = bA.texture; down.uniforms.px.value.set(1 / qw, 1 / qh); pass(down, eA);
      blurInto(eA, eB, ew, eh, 1.6);
      pass(comp, null);
    },
  };
}
