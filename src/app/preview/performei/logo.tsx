// Logo da Performei redesenhado em vetor a partir do Instagram (@performeiconsultoria):
// ícone "m" em linha contínua com degradê azul + PERFOR/MEI em Montserrat.
// Para a versão final, trocar pelo arquivo original do cliente.

export function IconePerformei({ className = "", id = "pm" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="5 4 39 45" className={className} aria-hidden>
      <defs>
        {/* userSpaceOnUse: com o padrão (objectBoundingBox) a haste reta, sem largura, não pinta */}
        <linearGradient id={`${id}-g`} gradientUnits="userSpaceOnUse" x1="12" y1="8" x2="26" y2="46">
          <stop offset="0" stopColor="#45C6F5" />
          <stop offset="1" stopColor="#2B86D6" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id}-g)`} strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round">
        {/* perna esquerda, topo, lado direito e a barriga do "D" voltando na haste interna */}
        <path d="M10.5 44V18a8.5 8.5 0 0 1 8.5-8.5h11a8.5 8.5 0 0 1 8.5 8.5v7a8 8 0 0 1-8 8H29V19" />
        <path d="M19.75 21.5v16" />
      </g>
    </svg>
  );
}

export function LogoPerformei({ claro = false, comSlogan = true, className = "" }: {
  // claro = sobre fundo escuro (PERFOR em branco)
  claro?: boolean;
  comSlogan?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} style={{ fontFamily: "var(--font-montserrat)" }}>
      <IconePerformei className="h-9 w-auto shrink-0" id={claro ? "pm-claro" : "pm-escuro"} />
      <span className="flex flex-col leading-none">
        <span className="text-[1.35rem] font-bold tracking-[0.02em]">
          <span className={claro ? "text-white" : "text-[#1C2147]"}>PERFOR</span>
          <span className="text-[#4BA6E2]">MEI</span>
          <sup className={`ml-0.5 text-[0.5rem] font-semibold ${claro ? "text-white/80" : "text-[#1C2147]/70"}`}>®</sup>
        </span>
        {comSlogan && (
          <span className={`mt-1 text-[0.52rem] font-bold tracking-[0.04em] ${claro ? "text-white/85" : "text-[#1C2147]"}`}>
            CONSULTORIA PARA PEQUENAS EMPRESAS
          </span>
        )}
      </span>
    </span>
  );
}
