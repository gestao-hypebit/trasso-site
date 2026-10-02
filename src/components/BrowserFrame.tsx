import type { ReactNode } from "react";

/** Moldura de navegador para mostrar capturas de sites. */
export default function BrowserFrame({
  dominio,
  children,
  className = "",
}: {
  dominio?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-[#120225] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] ${className}`}>
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </span>
        {dominio && (
          <span className="mx-auto max-w-[70%] truncate rounded-md bg-white/[0.05] px-3 py-0.5 text-[11px] text-nevoa/45">
            {dominio}
          </span>
        )}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/** Moldura simples de celular. */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[1.4rem] border-[5px] border-[#0b0118] bg-[#0b0118] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10 ${className}`}>
      <div className="relative overflow-hidden rounded-[1rem]">{children}</div>
    </div>
  );
}
