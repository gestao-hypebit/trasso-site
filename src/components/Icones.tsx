// Ícones de traço (24×24, stroke 1.6) para os serviços e listas.
import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const IconeSite = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M3 8h18M8 21h8M12 17v4" /></svg>
);
export const IconeSistema = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg>
);
export const IconeApp = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M10.5 18.5h3" /></svg>
);
export const IconeMarca = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M4 19c3-1 4.5-4 6.5-8.5C12.3 6.4 14.5 4 17.5 4 19.4 4 20 5.4 20 6.5c0 3-4 5-8 5" /><path d="M4 19h16" /></svg>
);
export const IconeIntegracao = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M8.5 6h7M18 8.5v7M7.8 7.8l8.4 8.4" /></svg>
);
export const IconeCheck = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth={2} {...p}><path d="M5 12.5l4.2 4.2L19 7" /></svg>
);
export const IconeSeta = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth={1.8} {...p}><path d="M7 17L17 7M9 7h8v8" /></svg>
);
