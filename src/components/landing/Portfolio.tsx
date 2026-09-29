"use client";

import { useEffect, useRef, useState } from "react";
import { SHOTS, type Shot } from "@/lib/cases";

// Só os sites com vídeo (os cases reais de site da home).
const CASES = SHOTS.filter((s) => s.video && s.url);

/**
 * O vídeo só é baixado quando o card aparece na tela e pausa quando sai.
 * Com "reduzir movimento" ligado, fica só o poster.
 */
function CaseCard({ item }: { item: Shot }) {
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
      { threshold: 0.6 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="group relative block aspect-9/16 overflow-hidden rounded-2xl border border-white/10 bg-roxo-medio"
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
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-roxo-noite/95 via-roxo-noite/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="mb-2 inline-block rounded-full bg-roxo-noite/70 px-3 py-1 text-[11px] font-semibold tracking-wider text-nevoa uppercase backdrop-blur-sm">
          {item.tag}
        </span>
        <h3 className="text-lg leading-tight font-bold text-nevoa">{item.title}</h3>
        <span className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-lima">
          Ver no ar <span aria-hidden="true">↗</span>
          <span className="sr-only">(abre em nova aba)</span>
        </span>
      </div>
    </a>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <p className="eyebrow mb-4 text-lima">Portfólio</p>
          <h2 className="text-3xl leading-[1.08] font-black tracking-tight text-nevoa text-balance sm:text-5xl">
            Sites que já <span className="text-lima">colocamos no ar</span>.
          </h2>
          <p className="mt-4 text-base text-nevoa/75 sm:hidden">Arraste para ver todos →</p>
        </div>
      </div>

      {/* Celular: carrossel com snap. Telas maiores: grade. */}
      <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-auto sm:grid sm:max-w-6xl sm:grid-cols-3 sm:overflow-visible sm:px-8 lg:grid-cols-5">
        {CASES.map((item) => (
          <li key={item.title} className="w-[72vw] max-w-[300px] shrink-0 snap-center sm:w-auto sm:max-w-none">
            <CaseCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
