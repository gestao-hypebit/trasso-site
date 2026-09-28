"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

const INITIAL_COUNT = 6;
const STEP = 6;
const SPOTLIGHT_TAG = "Produto SaaS";

const SHOTS = [
  // {
  //   title: "Mais Saúde",
  //   tag: "Sistema para clínica médica",
  //   gradient: "from-violeta/50 via-roxo-medio to-roxo-noite",
  // },
  {
    title: "Maurício Nakahodo",
    tag: "Site institucional",
    gradient: "from-rosa/40 via-roxo-medio to-roxo-noite",
    video: "/images/videonakahodo.mp4",
    url: "https://www.mnakahodo.com.br/",
  },
  {
    title: "Viável Planejamento Financeiro",
    tag: "Site institucional",
    gradient: "from-rosa/40 via-roxo-medio to-roxo-noite",
    video: "/images/videoviavel.mp4",
    url: "https://xn--vivelfinanaspessoais-jxb4l.com.br/",
  },
  {
    title: "Enche o Bolso",
    tag: "Landing Page",
    gradient: "from-rosa/40 via-roxo-medio to-roxo-noite",
    video: "/images/videoencheobolso.mp4",
    url: "https://encheobolso.com.br/",
  },
  {
    title: "Fluminous",
    tag: "Site institucional",
    gradient: "from-rosa/40 via-roxo-medio to-roxo-noite",
    video: "/images/videofluminous.mp4",
    url: "https://www.ffluminous.com.br/",
  },
  {
    title: "Planejamento Com Propósito",
    tag: "Site institucional",
    gradient: "from-rosa/40 via-roxo-medio to-roxo-noite",
    video: "/images/videoplanejamentocomproposito.mp4",
    url: "https://planejamentocomproposito.com.br/",
  },
  {
    title: "Identidade Visual - Mnakahodo",
    tag: "Identidade visual",
    gradient: "from-rosa/40 via-roxo-medio to-roxo-noite",
    image: "/images/idvisualmnakahodo.jpg",
    url: "https://www.mnakahodo.com.br/",
  },

  // {
  //   title: "Maurício Nakahodo",
  //   tag: "Identidade visual",
  //   gradient: "from-lima/25 via-roxo-medio to-roxo-noite",
  // },
];

type Shot = {
  title: string;
  tag: string;
  gradient: string;
  video?: string;
  image?: string;
  url?: string;
};

const SPOTLIGHT_POINTS = [
  "Produto, design e código feitos pela Trasso",
  "Pedidos dos clientes chegam direto no WhatsApp do lojista",
  "Em produção, com suporte e evolução contínua",
];

function ProductSpotlight() {
  return (
    <div
      id="catalogo-place"
      className="grid scroll-mt-28 overflow-hidden rounded-2xl border border-white/10 bg-roxo-noite lg:grid-cols-[1.5fr_1fr]"
    >
      <a
        href="https://www.catalogoplace.com.br/"
        target="_blank"
        rel="noreferrer"
        className="group relative block aspect-1717/916 w-full overflow-hidden"
      >
        <Image
          src="/images/bgcatalogoplace.png"
          alt="Catálogo Place — plataforma de catálogo digital com pedidos via WhatsApp"
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full border border-lima/50 bg-roxo-noite/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-lima backdrop-blur-sm sm:top-6 sm:left-6">
          Produto SaaS
        </span>
      </a>

      <div className="flex flex-col justify-center gap-6 p-7 sm:p-10">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-lima">
            Software próprio
          </p>
          <h3 className="text-2xl font-black tracking-tight text-nevoa sm:text-3xl">
            Catálogo Place
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-nevoa/60 sm:text-base">
            Plataforma de catálogo digital para lojistas venderem pelo
            WhatsApp. A prova de que a gente não só entrega software — a gente
            opera um.
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {SPOTLIGHT_POINTS.map((point) => (
            <li key={point} className="flex gap-3 text-sm text-nevoa/80">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lima" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>

        <a
          href="https://www.catalogoplace.com.br/"
          target="_blank"
          rel="noreferrer"
          className="group flex w-fit items-center gap-2 text-sm font-semibold text-lima"
        >
          Visitar catalogoplace.com.br
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            ↗
          </span>
        </a>
      </div>
    </div>
  );
}

function Card({
  item,
  n,
  className = "",
}: {
  item: Shot;
  n: number;
  className?: string;
}) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-roxo-noite ${className}`}
    >
      {item.video ? (
        <video
          src={item.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : item.image ? (
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-90 transition-transform duration-700 ease-out group-hover:scale-110`}
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-roxo-noite/90 via-roxo-noite/10 to-transparent" />

      <span
        aria-hidden="true"
        className="ghost-num absolute -top-3 right-3 text-6xl sm:text-7xl"
        style={{ WebkitTextStrokeColor: "rgba(247,242,255,0.18)" }}
      >
        {String(n).padStart(2, "0")}
      </span>

      <div className="relative flex h-full flex-col justify-end p-7 sm:p-8">
        <span className="mb-3 w-fit rounded-full bg-roxo-noite/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-nevoa backdrop-blur-sm">
          {item.tag}
        </span>
        <h3 className="max-w-[85%] text-xl font-bold text-nevoa sm:text-2xl">
          {item.title}
        </h3>
        <span className="mt-3 flex items-center gap-2 text-sm font-semibold text-lima opacity-0 transition-all duration-300 group-hover:opacity-100">
          Ver no ar
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            ↗
          </span>
        </span>
      </div>
    </a>
  );
}

export default function Work() {
  const categories = useMemo(
    () => [
      "Todos",
      ...Array.from(new Set(SHOTS.map((s) => s.tag))),
      SPOTLIGHT_TAG,
    ],
    [],
  );

  const [activeCategory, setActiveCategory] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filtered = useMemo(
    () =>
      activeCategory === "Todos" || activeCategory === SPOTLIGHT_TAG
        ? SHOTS
        : SHOTS.filter((s) => s.tag === activeCategory),
    [activeCategory],
  );

  const showSpotlight =
    activeCategory === "Todos" || activeCategory === SPOTLIGHT_TAG;
  const visible =
    activeCategory === SPOTLIGHT_TAG ? [] : filtered.slice(0, visibleCount);
  const hasMore =
    activeCategory === SPOTLIGHT_TAG ? false : visibleCount < filtered.length;

  function selectCategory(category: string) {
    setActiveCategory(category);
    setVisibleCount(INITIAL_COUNT);
  }

  return (
    <section id="trabalhos" className="relative bg-roxo-medio py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5 text-lima">Portfólio</p>
            <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-nevoa text-balance sm:text-5xl lg:text-6xl">
              Do papel ao <span className="text-lima">produto</span> — o que a
              gente já colocou no ar.
            </h2>
          </div>
          <a
            href="#contato"
            className="text-sm font-semibold text-nevoa/70 underline decoration-lima/50 underline-offset-4 hover:text-lima"
          >
            Quero um projeto assim →
          </a>
        </Reveal>

        <Reveal className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => selectCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                activeCategory === category
                  ? "border-lima bg-lima text-roxo-noite"
                  : "border-white/15 text-nevoa/70 hover:border-lima/50 hover:text-lima"
              }`}
            >
              {category}
            </button>
          ))}
        </Reveal>

        <div className="grid gap-5">
          {showSpotlight && (
            <Reveal>
              <ProductSpotlight />
            </Reveal>
          )}

          <div className="grid gap-5 sm:grid-cols-3">
            {visible.map((item, i) => (
              <Reveal key={`${item.title}-${item.tag}`} delay={(i % STEP) * 0.08}>
                <Card item={item} n={i + 2} className="aspect-3/4" />
              </Reveal>
            ))}
          </div>

          {hasMore && (
            <Reveal className="flex justify-center pt-4">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + STEP)}
                className="rounded-full border border-lima/50 px-6 py-3 text-sm font-semibold text-lima transition-colors hover:bg-lima hover:text-roxo-noite"
              >
                Ver mais trabalhos ↓
              </button>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
