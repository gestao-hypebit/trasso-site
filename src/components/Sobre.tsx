"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const TEXTO =
  "Uma agência de tecnologia e design. A gente cria sites, sistemas, aplicativos e identidades visuais sob medida, unindo o que funciona bem com o que é bonito de ver.";

// Palavras que ganham a cor da marca quando acendem.
const DESTAQUES = new Set(["tecnologia", "design.", "funciona", "bonito"]);

function Palavra({ palavra, progresso, faixa }: { palavra: string; progresso: MotionValue<number>; faixa: [number, number] }) {
  const opacity = useTransform(progresso, faixa, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className={DESTAQUES.has(palavra) ? "text-lima" : undefined}>
      {palavra}{" "}
    </motion.span>
  );
}

/** Manifesto curto: as palavras acendem uma a uma conforme a rolagem. */
export default function Sobre() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const palavras = TEXTO.split(" ");

  return (
    <section id="sobre" className="bg-roxo-noite py-28 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[12rem_1fr] lg:px-10">
        <p className="rotulo self-start lg:mt-4">Quem somos</p>
        <p
          ref={ref}
          className="text-[1.9rem] leading-[1.15] font-bold tracking-[-0.035em] text-nevoa sm:text-5xl lg:text-[3.6rem]"
        >
          {palavras.map((p, i) => (
            <Palavra key={i} palavra={p} progresso={scrollYProgress} faixa={[i / palavras.length, (i + 1) / palavras.length]} />
          ))}
        </p>
      </div>
    </section>
  );
}
