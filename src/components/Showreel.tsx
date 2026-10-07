"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { PROJETOS } from "@/lib/projetos";

// Capturas dos projetos no ar, divididas em três colunas que correm em sentidos opostos.
const SITES = PROJETOS.filter((p) => p.mobile);
// 5 sites no ar; repetimos um de cada para completar as colunas.
const DESKTOP = [...SITES.map((p) => p.imagem), SITES[0].imagem];
const MOBILE = [...SITES.map((p) => p.mobile!), SITES[1].mobile!];

const COLUNAS = [
  { imagens: [DESKTOP[0], MOBILE[1], DESKTOP[2], MOBILE[3]], sentido: 1, classe: "" },
  { imagens: [MOBILE[4], DESKTOP[5], MOBILE[0], DESKTOP[1]], sentido: -1, classe: "" },
  { imagens: [DESKTOP[3], MOBILE[2], DESKTOP[4], MOBILE[5]], sentido: 1, classe: "hidden md:block" },
];

function Coluna({ imagens, sentido, classe, progresso }: (typeof COLUNAS)[number] & { progresso: MotionValue<number> }) {
  const y = useTransform(progresso, [0, 1], sentido > 0 ? ["0%", "-28%"] : ["-28%", "0%"]);
  return (
    <div className={`relative overflow-hidden ${classe}`}>
      <motion.div style={{ y }} className="flex flex-col gap-3">
        {imagens.map((src, i) => {
          const celular = src.includes("-mobile");
          return (
            <div
              key={`${src}-${i}`}
              className={`relative overflow-hidden rounded-xl bg-roxo-medio ${celular ? "aspect-[390/600]" : "aspect-[16/10]"}`}
            >
              <Image src={src} alt="" fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover object-top" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

/**
 * Vitrine em scroll: a moldura começa recortada no centro e abre até ocupar a tela,
 * enquanto as colunas de projetos correm em sentidos opostos.
 */
export default function Showreel() {
  const ref = useRef<HTMLElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const largura = useTransform(scrollYProgress, [0, 0.7], reduzir ? ["100%", "100%"] : ["62%", "100%"]);
  const raio = useTransform(scrollYProgress, [0, 0.7], reduzir ? [0, 0] : [28, 0]);
  const escala = useTransform(scrollYProgress, [0, 0.7], reduzir ? [1, 1] : [0.7, 1]);

  return (
    <section ref={ref} className="relative h-[200vh] bg-roxo-noite" aria-label="Projetos da Slick em destaque">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{ width: largura, borderRadius: raio }}
          className="relative h-[70vh] overflow-hidden max-md:!w-full max-md:!rounded-none md:h-full"
        >
          <div className="absolute inset-0 grid grid-cols-2 gap-3 p-3 md:grid-cols-3">
            {COLUNAS.map((c, i) => (
              <Coluna key={i} {...c} progresso={scrollYProgress} />
            ))}
          </div>

          <div className="absolute inset-0 bg-roxo-noite/75" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-roxo-noite)_0%,transparent_70%)] opacity-80" />

          <motion.div style={{ scale: escala }} className="absolute inset-0 grid place-items-center px-6 text-center">
            <div>
              <p className="rotulo mb-5 justify-center">Projetos no ar</p>
              <p className="mx-auto max-w-[16ch] text-[11vw] leading-[0.98] font-extrabold tracking-[-0.05em] text-nevoa md:text-[5.6vw]">
                Feito pra ser <span className="tarja">visto</span>.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
