"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Encena o título do hero: alguém pesquisa o nome do planejador e encontra o site.
// Decorativo (aria-hidden); com "reduzir movimento" já aparece pronto.

const BUSCA = "seu nome planejador financeiro";

export default function HeroBusca() {
  const [digitado, setDigitado] = useState(0);
  const pronto = digitado >= BUSCA.length;

  useEffect(() => {
    const semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = semAnimacao ? BUSCA.length - 1 : 0;
    let timer: ReturnType<typeof setTimeout>;
    const digitar = () => {
      i += 1;
      setDigitado(i);
      if (i < BUSCA.length) timer = setTimeout(digitar, 55 + Math.random() * 60);
    };
    timer = setTimeout(digitar, semAnimacao ? 0 : 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-lg" aria-hidden="true">
      {/* Barra de busca */}
      <div className="relative z-20 flex items-center gap-3 rounded-full border border-white/15 bg-nevoa px-5 py-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-roxo-noite/50" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" strokeLinecap="round" />
        </svg>
        <span className="min-w-0 flex-1 truncate text-[15px] font-medium text-roxo-noite">
          {BUSCA.slice(0, digitado)}
          <span className={`ml-px inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-roxo-noite ${pronto ? "animate-pulse" : ""}`} />
        </span>
      </div>

      {/* Resultado: aparece quando termina de digitar (espaço já reservado, sem pulo de layout). */}
      <div
        className={`relative z-10 mx-3 -mt-3 rounded-b-2xl border border-t-0 border-white/10 bg-roxo-medio px-5 pt-6 pb-4 transition-all duration-500 ${
          pronto ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lima text-xs font-black text-roxo-noite">S</span>
          <div className="min-w-0 leading-tight">
            <p className="text-xs font-semibold text-nevoa">Seu Nome</p>
            <p className="truncate text-[11px] text-nevoa/55">https://seunome.com.br</p>
          </div>
        </div>
        <p className="mt-2 text-base font-bold text-lima">Seu Nome | Planejamento Financeiro</p>
        <p className="mt-1 text-[13px] leading-snug text-nevoa/65">
          Planejamento financeiro pessoal com método e acompanhamento. Conheça os serviços e agende sua reunião inicial.
        </p>
      </div>

      {/* Mockup do site (troque em public/images/planejadores/hero.jpg). */}
      <div className="relative mt-5 rotate-[1.5deg] overflow-hidden rounded-xl border border-white/15 bg-roxo-medio shadow-[0_30px_80px_rgba(0,0,0,0.55)] transition-transform duration-700 lg:mt-6">
        <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-lima" />
            <span className="h-2.5 w-2.5 rounded-full bg-violeta" />
            <span className="h-2.5 w-2.5 rounded-full bg-nevoa/60" />
          </div>
          <span className="flex-1 truncate rounded-full bg-white/10 px-3 py-0.5 text-center text-[11px] text-nevoa/70">
            🔒 seunome.com.br
          </span>
        </div>
        <Image
          src="/images/planejadores/hero.jpg"
          alt=""
          width={1440}
          height={900}
          priority
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="block h-auto w-full"
        />
      </div>

      {/* Selos flutuantes */}
      <p className="absolute -bottom-4 -left-2 z-20 flex items-center gap-2 rounded-full bg-lima px-4 py-2 text-sm font-bold text-roxo-noite shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:-left-6">
        <span>✓</span> No ar em 7 dias úteis
      </p>
      <p className="absolute right-0 bottom-[38%] z-20 hidden items-center gap-2 rounded-full border border-white/15 bg-roxo-noite/90 px-4 py-2 text-sm font-semibold text-nevoa shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:-right-6 sm:flex">
        Domínio <span className="text-lima">.com.br</span> incluso
      </p>
    </div>
  );
}
