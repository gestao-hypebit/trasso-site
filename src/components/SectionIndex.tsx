"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SECTIONS = [
  { id: "topo", label: "Início" },
  { id: "clientes", label: "Clientes" },
  { id: "sobre", label: "Sobre" },
  { id: "servicos", label: "Serviços" },
  { id: "trabalhos", label: "Trabalhos" },
  { id: "processo", label: "Processo" },
  { id: "faq", label: "FAQ" },
  { id: "contato", label: "Contato" },
];

/** A literal traço running down the side, marking where you are in the story. */
export default function SectionIndex() {
  const [active, setActive] = useState("topo");
  // As seções são da home; em landings (ex.: /site) o índice não aparece.
  const naHome = usePathname() === "/";

  useEffect(() => {
    if (!naHome) return;
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [naHome]);

  if (!naHome) return null;

  return (
    <nav
      aria-label="Navegação por seções"
      className="fixed top-1/2 right-6 z-[45] hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {SECTIONS.map((s, i) => {
        const isActive = s.id === active;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-2.5 rounded-full bg-roxo-noite/70 py-1.5 pr-1.5 pl-3 backdrop-blur-sm"
            aria-current={isActive}
          >
            <span
              className={`text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? "max-w-[9rem] text-lima opacity-100"
                  : "max-w-0 overflow-hidden text-nevoa/60 opacity-0 group-hover:max-w-[9rem] group-hover:opacity-100"
              }`}
            >
              {String(i + 1).padStart(2, "0")} {s.label}
            </span>
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 ${
                isActive ? "bg-lima" : "bg-nevoa/40 group-hover:bg-nevoa/70"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
