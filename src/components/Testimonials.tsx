"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * PLACEHOLDER — fora da página (ver app/page.tsx). Estas falas são ilustrativas;
 * troque por depoimentos reais (nome, empresa, logo) antes de reativar a seção.
 */
const QUOTES = [
  {
    quote:
      "A Trasso trouxe direção pra algo que a gente sabia que precisava, mas não conseguia nomear. Em poucas semanas tínhamos uma marca que finalmente parecia a gente.",
    role: "Fundadora, fintech B2B",
    initials: "F.",
    accent: "bg-violeta",
  },
  {
    quote:
      "Não é só entrega bonita — é entrega que resolve. O time entende de negócio tanto quanto entende de design.",
    role: "Head de Marketing, foodtech",
    initials: "M.",
    accent: "bg-rosa",
  },
  {
    quote:
      "Trabalhar com a Trasso é rápido sem parecer apressado. Cada decisão vinha com justificativa clara.",
    role: "Sócio, e-commerce de moda",
    initials: "S.",
    accent: "bg-roxo-noite",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  const active = QUOTES[index];

  return (
    <section id="depoimentos" className="relative overflow-hidden bg-lavanda py-28 sm:py-40">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <p className="eyebrow mb-10 text-violeta">Depoimentos</p>

        <div className="relative min-h-[280px] sm:min-h-[220px]">
          <span
            aria-hidden="true"
            className="font-marker pointer-events-none absolute -top-10 -left-2 text-[9rem] leading-none text-roxo-noite/10 sm:text-[11rem]"
          >
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 pt-6"
            >
              <p className="max-w-3xl text-2xl leading-snug font-bold text-balance text-roxo-noite sm:text-4xl">
                {active.quote}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-nevoa ${active.accent}`}
                  aria-hidden="true"
                >
                  {active.initials}
                </span>
                <p className="text-sm font-semibold text-roxo-noite/60">
                  {active.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex gap-3">
          {QUOTES.map((q, i) => (
            <button
              key={q.role}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver depoimento ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-10 bg-violeta" : "w-4 bg-roxo-noite/15"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
