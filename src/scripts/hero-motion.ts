import { gsap } from "gsap";

/** One transform write per layer per frame, shared by pointer, intro and scroll. */
export function animateHero(media: HTMLElement, background: HTMLElement, person: HTMLElement) {
  const original = [background.style.transform, person.style.transform];
  const camera = { intro: 1, scroll: 0 };
  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  let width = media.clientWidth;
  let height = media.clientHeight;
  let visible = true;
  let lastBackground = "";
  let lastPerson = "";

  const resize = new ResizeObserver(() => {
    width = media.clientWidth;
    height = media.clientHeight;
  });
  resize.observe(media);
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) target.x = target.y = 0;
  });
  visibility.observe(media);

  const resetPointer = () => { target.x = target.y = 0; };
  const move = (event: PointerEvent) => {
    if (!finePointer.matches || event.pointerType === "touch") return;
    // Read geometry on input only, never in the animation loop.
    const rect = media.getBoundingClientRect();
    target.x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
    target.y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
  };
  const hero = media.closest<HTMLElement>("[data-hero]")!;
  hero.addEventListener("pointermove", move, { passive: true });
  hero.addEventListener("pointerleave", resetPointer);
  window.addEventListener("blur", resetPointer);
  finePointer.addEventListener("change", resetPointer);

  gsap.to(camera, { intro: 0, duration: 2.4, ease: "power3.out" });
  gsap.to(camera, {
    scroll: 1, ease: "none",
    scrollTrigger: { trigger: media, start: "top top", end: "bottom top", scrub: true },
  });

  const render = (_time: number, delta: number) => {
    if (!visible || document.hidden) return;
    // Time-based damping keeps the same response on 60/120 Hz screens.
    const blend = 1 - Math.exp(-Math.min(delta, 64) / 110);
    pointer.x += (target.x - pointer.x) * blend;
    pointer.y += (target.y - pointer.y) * blend;
    const x = -pointer.x * Math.min(36, width * 0.025);
    const y = -pointer.y * Math.min(20, height * 0.025);
    // Overscan covers the full pointer travel without exposing image edges.
    const bg = `translate3d(${x.toFixed(3)}px, ${(y + height * camera.scroll * 0.12).toFixed(3)}px, 0) scale(${(1.08 + camera.intro * 0.06).toFixed(5)})`;
    const fg = `translate3d(${(x * 0.3).toFixed(3)}px, ${(y * 0.25 + height * camera.scroll * 0.04).toFixed(3)}px, 0) scale(${(1.03 + camera.intro * 0.04).toFixed(5)})`;
    if (bg !== lastBackground) background.style.transform = lastBackground = bg;
    if (fg !== lastPerson) person.style.transform = lastPerson = fg;
  };
  render(0, 16.67);
  gsap.ticker.add(render);

  return () => {
    gsap.ticker.remove(render);
    resize.disconnect();
    visibility.disconnect();
    hero.removeEventListener("pointermove", move);
    hero.removeEventListener("pointerleave", resetPointer);
    window.removeEventListener("blur", resetPointer);
    finePointer.removeEventListener("change", resetPointer);
    background.style.transform = original[0];
    person.style.transform = original[1];
  };
}
