"use client";

import { useEffect, useRef } from "react";

// Movimento da prévia: revela [data-revelar] / desenha [data-traco] ao entrar na tela
// e controla o cursor próprio. Quem pede menos movimento no sistema fica sem nada disso.
export function Coreografia() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raiz = document.querySelector<HTMLElement>(".pf");
    if (!raiz) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    raiz.classList.add("pf-anim");
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("pf-visivel");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    raiz.querySelectorAll("[data-revelar], [data-traco]").forEach((el) => io.observe(el));

    const el = cursor.current;
    if (!el || !matchMedia("(pointer: fine)").matches) return () => io.disconnect();

    // O ponto segue o mouse com um leve atraso (interpolação a cada quadro).
    raiz.classList.add("pf-cursor-on");
    let alvoX = -100, alvoY = -100, x = alvoX, y = alvoY, quadro = 0;
    const mover = (e: PointerEvent) => {
      alvoX = e.clientX;
      alvoY = e.clientY;
      el.classList.add("pf-ativo");
    };
    const sobre = (e: PointerEvent) => {
      el.classList.toggle("pf-grande", !!(e.target as Element).closest?.("a, button, summary"));
    };
    const sair = () => el.classList.remove("pf-ativo");
    const loop = () => {
      x += (alvoX - x) * 0.22;
      y += (alvoY - y) * 0.22;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      quadro = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", mover, { passive: true });
    document.addEventListener("pointerover", sobre, { passive: true });
    document.documentElement.addEventListener("pointerleave", sair);
    loop();

    return () => {
      io.disconnect();
      cancelAnimationFrame(quadro);
      window.removeEventListener("pointermove", mover);
      document.removeEventListener("pointerover", sobre);
      document.documentElement.removeEventListener("pointerleave", sair);
      raiz.classList.remove("pf-anim", "pf-cursor-on");
    };
  }, []);

  return <div ref={cursor} aria-hidden className="pf-cursor" />;
}
