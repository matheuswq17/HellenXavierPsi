/**
 * Sistema de motion do site (GSAP + ScrollTrigger).
 * - Fundo contínuo: a cor do <body> é interpolada entre as seções (data-bg),
 *   por isso não existe "corte" entre uma seção e outra.
 * - Títulos e blocos entram ao alcançar a borda inferior da tela.
 * - Blocos (data-reveal) sobem suavemente.
 * - Parallax leve (data-parallax="-8" = % de deslocamento).
 * - Logo cresce das raízes para a copa; raízes do rodapé se espalham até o pin.
 * - "Modo calmo" desliga tudo e fica salvo no navegador.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateHero } from "./hero-motion";

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const EASE = "expo.out";
let ctx: gsap.Context | null = null;
let stopHero: (() => void) | null = null;

/* ---------- utilidades ---------- */
function secBgs() {
  document.querySelectorAll<HTMLElement>("[data-bg]").forEach((s) => s.style.setProperty("--sec-bg", s.dataset.bg!));
}

/* ---------- motion ---------- */
function iniciar() {
  root.classList.add("motion");


  ctx = gsap.context(() => {
    // 1) Logo: cresce das raízes para a copa
    gsap.fromTo(
      "[data-logo-intro]",
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power2.inOut", delay: 0.15 },
    );

    // Start at the visible edge, not before the visitor can see the motion.
    // Partial opacity avoids blank sections; reduced motion still bypasses this.
    document.querySelectorAll<HTMLElement>("[data-split], [data-reveal]").forEach((el) => {
      gsap.from(el, {
        y: 32, opacity: 0.4, duration: 0.85, ease: "power2.out", immediateRender: false,
        scrollTrigger: { trigger: el, start: "top 98%", once: true },
      });
    });

    // 4) Hero: foto respira e afasta levemente ao rolar
    const fundo = document.querySelector<HTMLElement>("[data-camada-fundo]");
    const pessoa = document.querySelector<HTMLElement>("[data-camada-pessoa]");
    const heroImg = document.querySelector<HTMLElement>("[data-hero] .hero__midia");
    if (fundo && pessoa && heroImg) {
      stopHero = animateHero(heroImg, fundo, pessoa);
    } else if (heroImg) {
      gsap.fromTo(heroImg, { scale: 1.06 }, { scale: 1, duration: 2.4, ease: "power2.out" });
      gsap.to(heroImg, {
        yPercent: 8, ease: "none",
        scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
      });
    }

    // 5) Fundo contínuo entre seções
    const secs = Array.from(document.querySelectorAll<HTMLElement>("[data-bg]"));
    if (secs.length) gsap.set(document.body, { backgroundColor: secs[0].dataset.bg });
    secs.forEach((s, i) => {
      if (i === 0) return;
      const prev = secs[i - 1].dataset.bg!;
      gsap.fromTo(
        document.body,
        { backgroundColor: prev },
        {
          backgroundColor: s.dataset.bg, ease: "none", immediateRender: false,
          scrollTrigger: { trigger: s, start: "top 75%", end: "top 25%", scrub: true },
        },
      );
    });

    // 6) Parallax
    document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
      const v = parseFloat(el.dataset.parallax || "0");
      gsap.fromTo(el, { yPercent: -v }, {
        yPercent: v, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // 7) Raízes do rodapé
    const raizes = document.querySelector("[data-raizes]");
    if (raizes) {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: raizes, start: "top 92%", end: "bottom 60%", scrub: 1 },
      });
      tl.fromTo("[data-tronco]", { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 0.25 })
        .fromTo(raizes, { clipPath: "inset(0% 50% 100% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power1.inOut", duration: 1 })
        .fromTo("[data-pin]", { y: -24, opacity: 0 }, { y: 0, opacity: 1, ease: "back.out(2)", duration: 0.3 }, "-=0.2");
    }
  });
}

function parar() {
  stopHero?.();
  stopHero = null;
  ctx?.revert();
  ctx = null;
  ScrollTrigger.getAll().forEach((t) => t.kill());
  root.classList.remove("motion");
  gsap.set(document.body, { clearProps: "backgroundColor" });
  document.querySelectorAll<HTMLElement>("[data-split]").forEach((h) => (h.style.visibility = "visible"));
}

/* ---------- modo calmo ---------- */
const btn = document.querySelector<HTMLButtonElement>("[data-calmo-toggle]");
const setBtn = () => {
  const calmo = root.hasAttribute("data-calmo");
  btn?.setAttribute("aria-pressed", String(calmo));
  btn?.setAttribute("aria-label", calmo ? "Modo calmo: ativar animações" : "Modo calmo: desligar animações");
};
btn?.addEventListener("click", () => {
  const ligar = !root.hasAttribute("data-calmo");
  if (ligar) { root.setAttribute("data-calmo", ""); parar(); }
  else { root.removeAttribute("data-calmo"); iniciar(); ScrollTrigger.refresh(); }
  try { localStorage.setItem("calmo", ligar ? "1" : "0"); } catch {}
  document.dispatchEvent(new CustomEvent("calmo", { detail: ligar }));
  setBtn();
});

secBgs();
setBtn();
if (!root.hasAttribute("data-calmo")) {
  try { iniciar(); } catch { parar(); }
}
matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (event) => {
  if (!event.matches) return;
  root.setAttribute("data-calmo", ""); parar(); setBtn();
  document.dispatchEvent(new CustomEvent("calmo", { detail: true }));
});
addEventListener("load", () => ScrollTrigger.refresh());
