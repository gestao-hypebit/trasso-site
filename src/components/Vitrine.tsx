"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BrowserFrame, { PhoneFrame } from "./BrowserFrame";
import { IconeSeta } from "./Icones";
import { PROJETOS_HERO } from "@/lib/projetos";

const INTERVALO = 4500;

/** Mockup do topo: notebook + celular alternando entre sites que estão no ar. */
export default function Vitrine() {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setAtual((i) => (i + 1) % PROJETOS_HERO.length), INTERVALO);
    return () => clearInterval(t);
  }, [pausado]);

  const projeto = PROJETOS_HERO[atual];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <BrowserFrame dominio={projeto.dominio} className="relative">
        <div className="relative aspect-[16/10]">
          {PROJETOS_HERO.map((p, i) => (
            <Image
              key={p.slug}
              src={p.imagem}
              alt={i === atual ? `Site ${p.titulo}, feito pela Trasso` : ""}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 640px, 92vw"
              className={`vitrine-slide object-cover object-top ${i === atual ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </BrowserFrame>

      <PhoneFrame className="absolute -bottom-10 -right-2 w-[24%] sm:-right-6 lg:-right-10">
        <div className="relative aspect-[390/844]">
          {PROJETOS_HERO.map((p, i) => (
            <Image
              key={p.slug}
              src={p.mobile!}
              alt=""
              fill
              sizes="160px"
              className={`vitrine-slide object-cover object-top ${i === atual ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </PhoneFrame>

      <div className="mt-6 flex items-center gap-4 pr-[28%]">
        <a
          href={projeto.url}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex min-w-0 items-center gap-2 text-sm text-nevoa/60 transition-colors hover:text-nevoa"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lima" aria-hidden="true" />
          <span className="truncate">
            No ar: <span className="font-semibold text-nevoa">{projeto.titulo}</span>
          </span>
          <IconeSeta className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
        <div className="ml-auto flex shrink-0 gap-1.5">
          {PROJETOS_HERO.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => setAtual(i)}
              aria-label={`Mostrar ${p.titulo}`}
              aria-current={i === atual}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === atual ? "w-6 bg-lima" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
