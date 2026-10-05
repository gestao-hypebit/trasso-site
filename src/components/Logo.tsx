import Link from "next/link";

/**
 * Logotipo provisório da Slick: "slick" em traço contínuo arredondado, com o
 * pingo do "i" em rosa. Herda a cor do texto (currentColor); o pingo é sempre rosa.
 * Versões em arquivo: public/images/slick/.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-2 -2 152 64" fill="none" role="img" aria-label="Slick" className={className}>
      <g stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M31 29C29 26 25 24.5 18.5 24.5C11 24.5 6 27.5 6 32.5C6 38 11 39 18.5 40C26 41 31 42.5 31 48C31 53 26 55.5 18.5 55.5C11 55.5 6.5 53 4.5 49.5" />
        <path d="M47 4.5V55.5" />
        <path d="M63 26V55.5" />
        <path d="M103.96 28.13A15.5 15.5 0 1 0 103.96 51.87" />
        <path d="M120.5 4.5V55.5" />
        <path d="M143 24.5L121 42.5" />
        <path d="M129 36L144 55.5" />
      </g>
      <circle cx="63" cy="8" r="6" fill="var(--color-rosa)" className="origin-[63px_8px] transition-transform duration-300 group-hover:scale-125" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="#topo"
      aria-label="Slick — início"
      className={`group inline-flex items-center text-nevoa ${className}`}
    >
      <Wordmark className="h-8 w-auto sm:h-9" />
    </Link>
  );
}
