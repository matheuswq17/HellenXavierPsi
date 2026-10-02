/**
 * Raízes do rodapé — "a seiva desce até o consultório".
 *
 * Toca UMA vez quando as raízes entram na tela (nunca fica pela metade):
 *   1. o tronco desce até a base das raízes;
 *   2. a seiva se espalha pelas raízes seguindo o desenho (mesmo shader da abertura, frente discreta, sem pulso);
 *   3. o pin (o consultório) pousa sem quicar e solta uma única onda terracota.
 *
 * O estado final é o próprio HTML/SVG: o JS só esconde as peças quando vai animar.
 * Modo calmo, movimento reduzido, chegada por #contato ou rolagem que já passou → tudo pronto, sem animação.
 * Sem WebGL (ou se o mapa não carregar): revelação suave em elipse a partir do tronco.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { carregarImagem, criarCrescimento } from "./crescer";

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const caixa = document.querySelector<HTMLElement>("[data-raizes-caixa]");
if (caixa) preparar(caixa);

function preparar(caixa: HTMLElement) {
  const svg = caixa.querySelector<SVGSVGElement>("[data-raizes]")!;
  const tronco = caixa.querySelector<HTMLElement>("[data-tronco]")!;
  const pin = caixa.querySelector<SVGElement>("[data-pin]")!;
  const onda = caixa.querySelector<HTMLElement>("[data-onda]")!;
  const canvas = caixa.querySelector<HTMLCanvasElement>("[data-raizes-canvas]")!;

  const calmo = () => root.hasAttribute("data-calmo");
  const jaPassou = () => caixa.getBoundingClientRect().top < innerHeight * 0.85;
  if (calmo() || location.hash === "#contato" || jaPassou()) return; // fica tudo pronto

  // Estado inicial (só agora que sabemos que vai animar)
  gsap.set(svg, { opacity: 0 });
  gsap.set(tronco, { scaleY: 0 });
  gsap.set(pin, { opacity: 0, y: -10 });

  let tl: gsap.core.Timeline | null = null;
  let gl: ReturnType<typeof criarCrescimento> = null;
  let mapa: Promise<HTMLImageElement | null> | null = null;

  const finalizar = () => {
    tl?.progress(1);
    gsap.set([svg, pin], { clearProps: "opacity,transform,maskImage,webkitMaskImage" });
    gsap.set(tronco, { clearProps: "transform" });
    canvas.hidden = true;
    gl?.liberar(); gl = null;
  };
  document.addEventListener("calmo", (e) => { if ((e as CustomEvent).detail) finalizar(); });

  // Carrega o mapa um pouco antes de a seção chegar (não pesa o início da página).
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { mapa ??= carregarImagem("/intro/raizes.webp", 2500); io.disconnect(); }
  }, { rootMargin: "600px 0px" });
  io.observe(caixa);

  ScrollTrigger.create({
    trigger: caixa, start: "top 85%", once: true,
    onEnter: async () => {
      if (calmo()) return finalizar();
      const img = await (mapa ??= carregarImagem("/intro/raizes.webp", 1200));
      if (calmo()) return finalizar();
      tocar(img);
    },
  });

  addEventListener("resize", () => { if (tl && tl.isActive()) finalizar(); });

  function posicionarCanvas() {
    // Área real do desenho dentro do <svg> (viewBox 672×182, "meet", centralizado).
    const r = svg.getBoundingClientRect(), c = caixa.getBoundingClientRect();
    const s = Math.min(r.width / 672, r.height / 182);
    const w = 672 * s, h = 182 * s;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    Object.assign(canvas.style, {
      left: `${r.left - c.left + (r.width - w) / 2}px`, top: `${r.top - c.top + (r.height - h) / 2}px`,
      width: `${w}px`, height: `${h}px`,
    });
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }

  function tocar(img: HTMLImageElement | null) {
    const celular = innerWidth < 700;
    const dur = celular ? 1.4 : 1.9;
    if (img) {
      canvas.hidden = false;
      posicionarCanvas();
      gl = criarCrescimento(canvas, img, {
        recorte: [0, 578, 672, 182],
        cor: [159, 184, 152],       // #9fb898, a cor das raízes
        seiva: [214, 228, 207],     // frente sálvia clara, discreta
        forcaSeiva: 0.55,
        forcaPulso: 0,
      });
      if (!gl) canvas.hidden = true;
    }

    const st = { p: 0, r: 0 };
    const desenhar = () => {
      if (gl) gl.desenhar(st.p);
      else {
        const m = `radial-gradient(ellipse ${st.r * 70}% ${st.r * 190}% at 50% 0%, #000 72%, transparent 100%)`;
        svg.style.maskImage = m; svg.style.webkitMaskImage = m;
      }
    };
    if (!gl) gsap.set(svg, { opacity: 1 });
    desenhar();

    tl = gsap.timeline({ onUpdate: desenhar, onComplete: finalizar })
      .to(tronco, { scaleY: 1, duration: 0.6, ease: "power2.inOut" }, 0)
      .to(st, { p: 1.25, r: 1.6, duration: dur, ease: "sine.inOut" }, 0.45)
      .to(pin, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.45 + dur * 0.62)
      .fromTo(onda, { scale: 0.6, opacity: 0.4 }, { scale: 2.6, opacity: 0, duration: 1.3, ease: "power2.out", immediateRender: false }, 0.45 + dur * 0.62 + 0.25)
      .add(() => { if (gl) { gsap.set(svg, { opacity: 1 }); canvas.hidden = true; } });
  }
}
