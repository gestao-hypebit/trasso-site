"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll } from "framer-motion";

/**
 * The site's signature: a single hand-drawn stroke that runs the length of
 * the page and draws itself as you scroll — literal to the brand concept
 * "cada projeto começa com um traço" (the stroke that starts, connects,
 * and directs). Wraps the whole page so it can measure scroll progress
 * across all sections.
 */
export default function TracoLine({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative">
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden md:block"
        aria-hidden="true"
      >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 3400"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient
            id="traco-gradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="3400"
          >
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="30%" stopColor="#7c3aed" />
            <stop offset="48%" stopColor="#a8f300" />
            <stop offset="72%" stopColor="#a8f300" />
            <stop offset="88%" stopColor="#ff358d" />
            <stop offset="100%" stopColor="#ff358d" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 26 0
             C 40 90, 12 160, 24 260
             S 44 420, 22 520
             C 10 600, 30 680, 20 780
             S 40 920, 26 1040
             C 14 1140, 34 1220, 24 1340
             S 8 1480, 26 1600
             C 42 1700, 16 1800, 22 1920
             S 40 2060, 24 2180
             C 12 2280, 32 2360, 20 2480
             S 38 2620, 26 2740
             C 16 2820, 34 2900, 22 3020
             S 40 3180, 26 3280
             L 26 3400"
          stroke="url(#traco-gradient)"
          strokeWidth="1.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: scrollYProgress }}
          opacity={0.55}
        />
      </svg>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
