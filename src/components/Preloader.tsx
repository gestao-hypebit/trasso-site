"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Tempo da entrada (letras + pingo) antes da cortina subir.
const DURACAO = 1500;
const CHAVE = "slick-preloader-visto";
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Roda antes da primeira pintura: marca o <html> para pular o preloader (visitas repetidas,
 * movimento reduzido) ou para segurar as animações do topo até a cortina subir.
 * Ver .preloader e [data-carregando] em globals.css.
 */
export const SCRIPT_PULAR_PRELOADER = `try{var d=document.documentElement.dataset;if(sessionStorage.getItem("${CHAVE}")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)d.semPreloader="";else d.carregando=""}catch(e){}`;

/**
 * Entrada da marca: o "slick" sobe por trás de uma máscara, o pingo lima cai no "i"
 * e a tela sobe revelando o site. Aparece só na primeira visita da sessão.
 */
export default function Preloader() {
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    const raiz = document.documentElement;
    if ("semPreloader" in raiz.dataset) {
      const f = requestAnimationFrame(() => setVisivel(false));
      return () => cancelAnimationFrame(f);
    }

    raiz.style.overflow = "hidden";
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(CHAVE, "1");
      } catch {}
      // Libera as animações do topo junto com a cortina.
      delete raiz.dataset.carregando;
      raiz.style.overflow = "";
      setVisivel(false);
    }, DURACAO);
    return () => {
      clearTimeout(t);
      raiz.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          key="preloader"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="preloader fixed inset-0 z-[100] grid place-items-center bg-roxo-noite"
          aria-hidden="true"
        >
          <motion.div
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col items-center gap-6"
          >
            {/* Proporção do logo recortado: 1200×422. */}
            <div className="relative aspect-[1200/422] w-[min(56vw,18rem)]">
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
                  className="absolute inset-0"
                >
                  <Image src="/images/slick/logo-slick-letras.png" alt="" fill priority sizes="18rem" />
                </motion.div>
              </div>

              {/* O pingo fica no lugar exato dele no logo (posição medida no arquivo). */}
              <motion.div
                initial={{ y: "-320%", scale: 0.4, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.6,
                  y: { type: "spring", stiffness: 520, damping: 14, mass: 0.8, delay: 0.6 },
                  scale: { duration: 0.3, ease: EASE, delay: 0.6 },
                  opacity: { duration: 0.15, delay: 0.6 },
                }}
                className="absolute aspect-square"
                style={{ left: "40.333%", top: "-0.948%", width: "7.667%" }}
              >
                <Image src="/images/slick/logo-slick-pingo.png" alt="" fill priority sizes="2rem" />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.85 }}
              className="text-xs font-medium tracking-[0.22em] text-nevoa/45 uppercase"
            >
              Criatividade e tecnologia
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
