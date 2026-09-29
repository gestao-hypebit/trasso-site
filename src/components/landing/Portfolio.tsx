"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { SHOTS, type Shot } from "@/lib/cases";

// Só os sites com vídeo (os cases reais de site da home).
const CASES = SHOTS.filter((s) => s.video && s.url);

/**
 * Mesmo card da home (Work), mas o vídeo só é baixado quando o card aparece
 * na tela e pausa quando sai — a landing recebe muito acesso por 4G.
 * Com "reduzir movimento" ligado, fica só o poster.
 */
function CaseCard({ item, n }: { item: Shot; n: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [carregar, setCarregar] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCarregar(true);
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="group relative block aspect-3/4 overflow-hidden rounded-2xl border border-white/10 bg-roxo-noite"
    >
      <video
        ref={ref}
        src={carregar ? item.video : undefined}
        poster={item.poster}
        // Sem src até entrar na tela; o autoPlay só vale depois disso.
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-roxo-noite/90 via-roxo-noite/10 to-transparent" />

      <span
        aria-hidden="true"
        className="ghost-num absolute -top-3 right-3 text-6xl sm:text-7xl"
        style={{ WebkitTextStrokeColor: "rgba(247,242,255,0.18)" }}
      >
        {String(n).padStart(2, "0")}
      </span>

      <div className="relative flex h-full flex-col justify-end p-7 sm:p-8">
        <span className="mb-3 w-fit rounded-full bg-roxo-noite/60 px-3 py-1 text-[11px] font-semibold tracking-wider text-nevoa uppercase backdrop-blur-sm">
          {item.tag}
        </span>
        <h3 className="max-w-[85%] text-xl font-bold text-nevoa sm:text-2xl">{item.title}</h3>
        <span className="mt-3 flex items-center gap-2 text-sm font-semibold text-lima transition-all duration-300 sm:opacity-0 sm:group-hover:opacity-100">
          Ver no ar
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            ↗
          </span>
          <span className="sr-only">(abre em nova aba)</span>
        </span>
      </div>
    </a>
  );
}

/** Fecha a grade de 3 colunas levando para o formulário. */
function CardProximo() {
  return (
    <a
      href="#formulario"
      className="group relative flex aspect-3/4 flex-col justify-end overflow-hidden rounded-2xl border border-dashed border-lima/40 bg-lima/5 p-7 transition-colors hover:border-lima hover:bg-lima/10 sm:p-8"
    >
      <span aria-hidden="true" className="ghost-num absolute -top-3 right-3 text-6xl sm:text-7xl">
        {String(CASES.length + 1).padStart(2, "0")}
      </span>
      <span className="mb-3 w-fit rounded-full border border-lima/40 px-3 py-1 text-[11px] font-semibold tracking-wider text-lima uppercase">
        Próximo case
      </span>
      <h3 className="text-xl font-bold text-nevoa sm:text-2xl">
        O site do <span className="text-lima">seu negócio</span>
      </h3>
      <span className="mt-3 flex items-center gap-2 text-sm font-semibold text-lima">
        Quero meu site
        <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </span>
    </a>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-10 max-w-2xl sm:mb-14">
          <p className="eyebrow mb-4 text-lima">Portfólio</p>
          <h2 className="text-3xl leading-[1.08] font-black tracking-tight text-nevoa text-balance sm:text-5xl">
            Sites que já <span className="text-lima">colocamos no ar</span>.
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.08}>
              <CaseCard item={item} n={i + 1} />
            </Reveal>
          ))}
          <Reveal delay={(CASES.length % 3) * 0.08}>
            <CardProximo />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
