"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import BrowserFrame from "./BrowserFrame";
import { IconeSeta } from "./Icones";
import { PROJETOS, type Projeto } from "@/lib/projetos";

function CardProjeto({ projeto, indice }: { projeto: Projeto; indice: number }) {
  const ehSite = projeto.tipo !== "Identidade visual";
  const imagem = (
    <div className="relative aspect-[16/10] overflow-hidden">
      <Image
        src={projeto.imagem}
        alt={ehSite ? `Site ${projeto.titulo}` : `Identidade visual ${projeto.titulo}`}
        fill
        sizes="(min-width: 768px) 42vw, 92vw"
        className={`object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04] ${ehSite ? "object-top" : ""}`}
      />
    </div>
  );

  return (
    <a href={projeto.url} target="_blank" rel="noreferrer" className="group block">
      {ehSite ? (
        <BrowserFrame dominio={projeto.dominio}>{imagem}</BrowserFrame>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">{imagem}</div>
      )}
      <div className="mt-6 flex items-start justify-between gap-6">
        <div className="flex gap-5">
          <span className="pt-1 text-sm font-bold text-lima tabular-nums">{String(indice + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="text-xl font-bold tracking-[-0.02em] text-nevoa sm:text-2xl">{projeto.titulo}</h3>
            <p className="mt-1 text-sm text-nevoa/45">{projeto.tipo}</p>
          </div>
        </div>
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-nevoa/70 transition-all duration-500 group-hover:rotate-45 group-hover:border-lima group-hover:bg-lima group-hover:text-roxo-noite">
          <IconeSeta className="h-4 w-4" />
          <span className="sr-only">Ver no ar</span>
        </span>
      </div>
    </a>
  );
}

function Cabecalho() {
  return (
    <>
      <p className="rotulo mb-5">Trabalhos</p>
      <h2 className="titulo-secao">Projetos que já estão no ar.</h2>
      <a href="#contato" className="mt-8 inline-block text-sm font-semibold text-nevoa/70 hover:text-lima">
        Quero um projeto assim →
      </a>
    </>
  );
}

/** Desktop: a seção fica presa na tela e os projetos passam na horizontal conforme a rolagem. */
function TrilhoHorizontal() {
  const secao = useRef<HTMLElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const [distancia, setDistancia] = useState(0);

  useEffect(() => {
    const medir = () => {
      if (trilho.current) setDistancia(Math.max(0, trilho.current.scrollWidth - window.innerWidth));
    };
    medir();
    const ro = new ResizeObserver(medir);
    if (trilho.current) ro.observe(trilho.current);
    window.addEventListener("resize", medir);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: secao, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distancia]);

  return (
    <section
      ref={secao}
      className="relative hidden border-t border-white/[0.06] bg-roxo-noite md:block"
      style={{ height: `calc(100vh + ${distancia}px)` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trilho} style={{ x }} className="flex w-max items-center gap-12 px-10 lg:gap-16 lg:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
          <div className="w-[30vw] max-w-sm shrink-0">
            <Cabecalho />
          </div>
          {PROJETOS.map((p, i) => (
            <div key={p.slug} className="w-[46vw] shrink-0 lg:w-[40vw]">
              <CardProjeto projeto={p} indice={i} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function Work() {
  return (
    <div id="trabalhos">
      <TrilhoHorizontal />

      {/* Celular: lista vertical simples. */}
      <section className="border-t border-white/[0.06] bg-roxo-noite py-24 md:hidden">
        <div className="px-6">
          <Reveal className="mb-12">
            <Cabecalho />
          </Reveal>
          <div className="grid gap-14">
            {PROJETOS.map((p, i) => (
              <Reveal key={p.slug}>
                <CardProjeto projeto={p} indice={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
