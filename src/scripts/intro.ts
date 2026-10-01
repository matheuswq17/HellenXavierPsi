/**
 * Abertura "a árvore que pensa".
 *
 * 1. Uma semente de luz acende na base do tronco.
 * 2. A seiva cresce: desce pelas raízes e sobe pelo tronco até os galhos do cérebro.
 *    O avanço segue a distância *ao longo do desenho* (mapa geodésico pré-calculado
 *    em /intro/crescimento.webp), por isso a árvore cresce como planta, não como um wipe.
 * 3. Um pulso de luz (a "sinapse") percorre a árvore inteira; o nome aparece.
 * 4. O logo e o nome voam até o header e o fundo afunda na terra, revelando o site.
 *
 * WebGL desenha o crescimento; o contorno vem do mesmo path vetorial do logo,
 * então a borda é nítida em qualquer tela. Sem WebGL, cai num reveal circular simples.
 */
import { gsap } from "gsap";
import { LOGO_PATH } from "../components/logoPath";

const root = document.documentElement;
const VW = 672, VH = 760; // viewBox do logo

const el = document.querySelector<HTMLElement>("[data-intro]");
if (el && root.classList.contains("com-intro")) iniciar(el);

function q<T extends Element>(sel: string, base: ParentNode = document) {
  return base.querySelector<T>(sel)!;
}

function carregar(src: string, limite = 1500): Promise<HTMLImageElement | null> {
  return new Promise((ok) => {
    const img = new Image();
    const t = setTimeout(() => ok(null), limite);
    img.onload = () => { clearTimeout(t); ok(img); };
    img.onerror = () => { clearTimeout(t); ok(null); };
    img.src = src;
  });
}

async function iniciar(el: HTMLElement) {
  try { sessionStorage.setItem("intro", "1"); } catch {}
  root.dataset.introRodou = "1";
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  scrollTo(0, 0);

  const fundo = q<HTMLElement>("[data-intro-fundo]", el);
  const aura = q<HTMLElement>("[data-intro-aura]", el);
  const caixa = q<HTMLElement>("[data-intro-logo]", el);
  const canvas = q<HTMLCanvasElement>("[data-intro-canvas]", el);
  const svg = q<SVGElement>("[data-intro-svg]", el);
  const semente = q<HTMLElement>("[data-intro-semente]", el);
  const chao = q<HTMLElement>("[data-intro-chao]", el);
  const marca = q<HTMLElement>("[data-intro-marca]", el);
  const pular = q<HTMLButtonElement>("[data-intro-pular]", el);
  const alvoLogo = document.querySelector<SVGElement>(".topo .marca__logo");
  const alvoTxt = document.querySelector<HTMLElement>(".topo .marca__txt");

  // Nome: cópia exata do texto do header (mesmas classes) → pousa sem "pulo".
  let letras: HTMLElement[] = [];
  let crp: HTMLElement | null = null;
  if (alvoTxt) {
    const txt = alvoTxt.cloneNode(true) as HTMLElement;
    marca.appendChild(txt);
    const nome = txt.querySelector<HTMLElement>(".marca__nome");
    crp = txt.querySelector<HTMLElement>(".marca__crp");
    if (nome) {
      const s = nome.textContent || "";
      nome.textContent = "";
      for (const ch of s) {
        const sp = document.createElement("span");
        sp.className = "intro__l";
        sp.textContent = ch;
        nome.appendChild(sp);
        letras.push(sp);
      }
    }
  }

  // ---------- layout ----------
  const dpr = Math.min(devicePixelRatio || 1, 2);
  let L = { x: 0, y: 0, w: 0, h: 0 }, k = 1;
  function layout() {
    const vw = innerWidth, vh = innerHeight;
    const h = Math.round(Math.min(vh * 0.44, 420, (vw * 0.66 * VH) / VW));
    const w = Math.round((h * VW) / VH);
    gsap.set(marca, { x: 0, y: 0, scale: 1 });
    const r = marca.getBoundingClientRect();
    k = r.width ? Math.min(2.1, (vw * 0.82) / r.width) : 1;
    const gap = Math.max(18, h * 0.07);
    const total = h + gap + r.height * k;
    const top = Math.max(16, (vh - total) / 2 - vh * 0.02);
    L = { x: Math.round((vw - w) / 2), y: Math.round(top), w, h };
    Object.assign(caixa.style, { left: `${L.x}px`, top: `${L.y}px`, width: `${w}px`, height: `${h}px` });
    gsap.set(marca, { x: (vw - r.width * k) / 2, y: top + h + gap, scale: k, transformOrigin: "0 0" });
    const a = h * 1.25;
    Object.assign(aura.style, {
      left: `${L.x + w / 2 - a / 2}px`, top: `${L.y + h * 0.36 - a / 2}px`, width: `${a}px`, height: `${a}px`,
    });
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }
  layout();

  // ---------- estado inicial ----------
  gsap.set(letras, { yPercent: 115 });
  if (crp) gsap.set(crp, { opacity: 0, y: 8 });
  gsap.set(semente, { scale: 0, opacity: 1 });
  gsap.set(chao, { scaleX: 0, opacity: 1 });
  gsap.to(pular, { opacity: 1, duration: 0.6, delay: 0.9 });

  // ---------- renderizador ----------
  const mapa = await carregar("/intro/crescimento.webp");
  const st = { p: 0, q: -0.3 };
  const gl = mapa ? criarGL(canvas, mapa) : null;
  const desenhar = () => {
    if (gl) gl.desenhar(st.p, st.q);
    else svg.style.clipPath = `circle(${(st.p * 92).toFixed(2)}% at 47.3% 75.3%)`;
  };
  if (!gl) gsap.set(svg, { opacity: 1 });
  desenhar();

  // ---------- linha do tempo ----------
  let pulou = false;
  const tl = gsap.timeline({ onUpdate: desenhar });
  tl.to(semente, { scale: 1, duration: 0.55, ease: "back.out(3)" }, 0.1)
    .to(chao, { scaleX: 1, duration: 1.0, ease: "expo.out" }, 0.2)
    .to(semente, { scale: 2.4, opacity: 0, duration: 0.7, ease: "power2.out" }, 0.62)
    .to(chao, { opacity: 0, duration: 0.9, ease: "power1.inOut" }, 1.05)
    .to(st, { p: 1.28, duration: 1.75, ease: "power2.inOut" }, 0.45)
    .to(aura, { opacity: 1, duration: 1.1, ease: "sine.out" }, 1.25)
    .to(letras, { yPercent: 0, duration: 0.95, ease: "expo.out", stagger: 0.028 }, 1.3)
    .to(crp ?? [], { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 1.65)
    .to(st, { q: 1.3, duration: 1.0, ease: "power1.inOut" }, 1.55)
    .to(caixa, { scale: 1.035, duration: 0.42, yoyo: true, repeat: 1, ease: "sine.inOut", transformOrigin: "50% 58%" }, 1.85)
    .addLabel("voo", 2.6);

  // ---------- voo até o header ----------
  // Montado de antemão; os destinos são lidos só no início do voo (valores em função).
  const destino = () => {
    const rl = alvoLogo?.getBoundingClientRect();
    const rt = alvoTxt?.getBoundingClientRect();
    return { rl: rl && rl.width ? rl : null, rt: rt && rt.width ? rt : null };
  };
  let D = destino();
  const v = { duration: 1.05, ease: "power3.inOut" };
  tl.add(() => {
    D = destino();
    if (gl) { gsap.set(svg, { opacity: 1 }); gsap.set(canvas, { opacity: 0 }); }
    svg.style.clipPath = "";
    if (pulou) tl.timeScale(1.35);
  }, "voo")
    .set(caixa, { transformOrigin: "0 0", scale: 1 }, "voo")
    .to(caixa, {
      x: () => (D.rl ? D.rl.left - L.x : 0),
      y: () => (D.rl ? D.rl.top - L.y : -L.h * 0.2),
      scale: () => (D.rl ? D.rl.width / L.w : 0.6),
      opacity: () => (D.rl ? 1 : 0),
      ...v,
    }, "voo")
    // O nome "passa o bastão": sai suave e o nome do header entra quando o logo pousa.
    .to(marca, { opacity: 0, y: "-=14", duration: 0.45, ease: "power2.in" }, "voo")
    .to(aura, { opacity: 0, duration: 0.5 }, "voo")
    .to(pular, { opacity: 0, duration: 0.3 }, "voo")
    // O fundo afunda na terra, com a borda curva, revelando o site de cima para baixo.
    .to(fundo, { yPercent: 104, borderTopLeftRadius: "50% 16vh", borderTopRightRadius: "50% 16vh", duration: 1.1, ease: "power3.inOut" }, "voo+=0.15")
    .add(() => document.dispatchEvent(new Event("intro:fim")), "voo+=0.15")
    .add(encerrar, "voo+=1.05");

  function encerrar() {
    clearTimeout((window as any).__introFalha);
    root.classList.remove("com-intro");
    if (alvoTxt) gsap.fromTo(alvoTxt, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.8, ease: "expo.out", clearProps: "opacity,transform" });
    tirarOuvintes();
    gl?.liberar();
    el.remove();
    if ("scrollRestoration" in history) history.scrollRestoration = "auto";
  }

  // ---------- pular: acelera até o voo, sem cortes ----------
  const acelerar = (e: Event) => {
    if (e.type === "keydown" && ["Shift", "Control", "Alt", "Meta"].includes((e as KeyboardEvent).key)) return;
    if (pulou) return;
    pulou = true;
    if (tl.time() < tl.labels.voo) tl.timeScale(4.5);
  };
  const evs = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
  evs.forEach((t) => addEventListener(t, acelerar, { passive: true }));
  const tirarOuvintes = () => evs.forEach((t) => removeEventListener(t, acelerar));
  addEventListener("resize", () => { if (tl.time() < tl.labels.voo) { layout(); gl?.mascara(); desenhar(); } });
}

/* ================= WebGL ================= */
function criarGL(canvas: HTMLCanvasElement, mapa: HTMLImageElement) {
  const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) return null;

  const vs = `attribute vec2 p; varying vec2 uv;
    void main(){ uv = vec2(p.x * .5 + .5, .5 - p.y * .5); gl_Position = vec4(p, 0., 1.); }`;
  const fs = `precision highp float; varying vec2 uv;
    uniform sampler2D uG; uniform sampler2D uM; uniform float uP; uniform float uQ;
    const vec3 cF = vec3(.1216, .2902, .1804);   // floresta
    const vec3 cS = vec3(.5608, .8000, .6431);   // seiva
    const vec3 cL = vec3(.7843, .9412, .8235);   // pulso
    void main(){
      float m = texture2D(uM, uv).a;
      if (m < .003) { gl_FragColor = vec4(0.); return; }
      float t = texture2D(uG, uv).r;
      float d = uP - t;
      float rev = smoothstep(-.004, .01, d);
      float seiva = exp(-max(d, 0.) * 26.) * rev;
      float x = (uQ - t) * 34.;
      float pulso = exp(-x * x) * step(-.2, uQ);
      vec3 c = mix(cF, cS, seiva * .92);
      c = mix(c, cL, pulso * .88);
      float a = m * rev;
      gl_FragColor = vec4(c * a, a);
    }`;
  const sh = (tipo: number, src: string) => {
    const s = gl.createShader(tipo)!;
    gl.shaderSource(s, src); gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
  if (!v || !f) return null;
  const pr = gl.createProgram()!;
  gl.attachShader(pr, v); gl.attachShader(pr, f); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
  gl.useProgram(pr);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const tex = (unidade: number, fonte: TexImageSource) => {
    const t = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unidade);
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, fonte);
    return t;
  };
  tex(0, mapa);
  gl.uniform1i(gl.getUniformLocation(pr, "uG"), 0);
  gl.uniform1i(gl.getUniformLocation(pr, "uM"), 1);
  const uP = gl.getUniformLocation(pr, "uP"), uQ = gl.getUniformLocation(pr, "uQ");

  // Contorno nítido: o próprio path vetorial do logo, no tamanho exato do canvas.
  const caminho = new Path2D(LOGO_PATH);
  let texM: WebGLTexture | null = null;
  const mascara = () => {
    const c = document.createElement("canvas");
    c.width = canvas.width; c.height = canvas.height;
    const x = c.getContext("2d")!;
    x.setTransform(c.width / VW, 0, 0, c.height / VH, 0, 0);
    x.fillStyle = "#fff";
    x.fill(caminho);
    if (texM) gl.deleteTexture(texM);
    texM = tex(1, c);
  };
  mascara();

  return {
    mascara,
    desenhar(p: number, qv: number) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uP, p);
      gl.uniform1f(uQ, qv);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    liberar() { gl.getExtension("WEBGL_lose_context")?.loseContext(); },
  };
}
