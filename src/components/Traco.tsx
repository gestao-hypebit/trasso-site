import type { ReactNode } from "react";

/**
 * O traço da marca: sublinhado desenhado à mão que se desenha ao carregar.
 * Usado só em dois pontos da home (título do topo e do contato), de propósito.
 */
export default function Traco({ children, delay = 0.5 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>
      <svg
        className="traco-stroke absolute -bottom-[0.12em] left-[-2%] h-[0.32em] w-[104%]"
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 15C58 6 132 3 178 10S258 19 296 7"
          stroke="var(--color-lima)"
          strokeWidth="6"
          strokeLinecap="round"
          style={{ animationDelay: `${delay}s` }}
        />
      </svg>
    </span>
  );
}
