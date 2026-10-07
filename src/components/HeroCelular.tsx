import Image from "next/image";

// A jornada do post "Do primeiro oi ao projeto no ar", em forma de notificações.
const NOTIFICACOES = [
  { quando: "Dia 1", texto: "Recebemos sua mensagem! Bora marcar uma conversa?" },
  { quando: "Dia 3", texto: "Sua proposta chegou: escopo, prazo e valor por escrito." },
  { quando: "Semana 2", texto: "Protótipo pronto. Clica nas telas e aprova ✓" },
  { quando: "Semana 4", texto: "Etapa 4 de 5 concluída. Confere o andamento." },
  { quando: "Hoje", texto: "Seu projeto está no ar 🚀", destaque: true },
];

/**
 * Celular na tela de bloqueio com as notificações chegando uma a uma.
 * As entradas usam .fade-up, então esperam o preloader terminar.
 */
export default function HeroCelular() {
  return (
    <div className="relative mx-auto w-full max-w-[22rem]" aria-hidden="true">
      {/* Arco lima atrás do celular, como na base dos posts. */}
      <div className="absolute -inset-x-12 top-[40%] -bottom-24 rounded-t-full bg-gradient-to-b from-lima/90 via-lima/40 to-transparent" />
      <div className="absolute -inset-10 rounded-full bg-violeta/30 blur-[80px]" />

      <div className="fade-up relative" style={{ animationDelay: "0.15s" }}>
        <div className="animate-float [animation-duration:9s]">
          <div className="relative rounded-[2.75rem] border border-white/15 bg-gradient-to-b from-[#2a0f52] via-roxo-noite to-[#12022a] p-3 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)] ring-1 ring-black/40">
            <div className="relative overflow-hidden rounded-[2.2rem] bg-gradient-to-b from-[#3a1670]/60 to-transparent px-4 pt-4 pb-6">
              {/* Ilha dinâmica */}
              <div className="mx-auto h-6 w-24 rounded-full bg-black/80" />

              <div className="mt-6 text-center">
                <p className="text-xs font-medium text-nevoa/60">terça-feira, 14 de outubro</p>
                <p className="mt-1 text-6xl font-extrabold tracking-[-0.04em] text-nevoa">9:41</p>
              </div>

              <ul className="mt-6 flex flex-col gap-2">
                {NOTIFICACOES.map((n, i) => (
                  <li
                    key={n.quando}
                    className={`fade-up flex items-start gap-2.5 rounded-2xl px-3 py-2.5 backdrop-blur-md ${
                      n.destaque
                        ? "border border-lima bg-lima/15 shadow-[0_0_30px_-6px_rgba(168,243,0,0.55)]"
                        : "border border-white/[0.06] bg-white/[0.08]"
                    }`}
                    style={{ animationDelay: `${0.6 + i * 0.32}s` }}
                  >
                    <Image src="/images/slick/icone-slick.png" alt="" width={28} height={28} className="mt-0.5 shrink-0 rounded-full" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-[11px] font-bold text-nevoa">Slick</p>
                        <p className={`font-mono text-[9px] uppercase tracking-wider ${n.destaque ? "text-lima" : "text-nevoa/40"}`}>
                          {n.quando}
                        </p>
                      </div>
                      <p className={`text-[12px] leading-snug ${n.destaque ? "font-semibold text-nevoa" : "text-nevoa/75"}`}>{n.texto}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* O pingo da marca, solto. */}
      <div
        className="fade-up absolute -top-4 -right-2 h-10 w-10 sm:-right-6 sm:h-12 sm:w-12"
        style={{ animationDelay: "2.3s" }}
      >
        <div className="h-full w-full animate-float rounded-full bg-lima shadow-[0_0_50px_rgba(168,243,0,0.5)] [animation-duration:5s]" />
      </div>
    </div>
  );
}
