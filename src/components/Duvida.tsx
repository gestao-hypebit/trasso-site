import Reveal from "./Reveal";
import { IconeApp, IconeSistema, IconeSite } from "./Icones";

// Do carrossel "Site, sistema ou app: qual seu negócio precisa?" no Instagram.
const OPCOES = [
  {
    nome: "Site",
    icone: IconeSite,
    pra: "pra ser encontrado",
    sinais: [
      "o cliente te procura no Google",
      "você depende só do Instagram pra parecer confiável",
      "responde a mesma pergunta 20x por dia",
    ],
  },
  {
    nome: "Sistema",
    icone: IconeSistema,
    pra: "pra organizar por dentro",
    sinais: [
      "o controle vive em planilha e caderno",
      "informação se perde entre pessoas",
      "saber o faturamento do mês exige conta",
    ],
  },
  {
    nome: "App",
    icone: IconeApp,
    pra: "pra estar no bolso do cliente",
    sinais: ["o cliente usa seu serviço toda semana", "notificação faz ele voltar", "seu público vive no celular"],
  },
];

export default function Duvida() {
  return (
    <section id="duvida" className="scroll-mt-24 border-t border-white/[0.06] bg-roxo-noite py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-14 max-w-3xl">
          <p className="rotulo mb-5">Pra quem tá em dúvida</p>
          <h2 className="titulo-secao">
            Site, sistema ou app: qual seu negócio <span className="tarja">precisa</span>?
          </h2>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3">
          {OPCOES.map((o, i) => (
            <Reveal key={o.nome} delay={i * 0.07}>
              <div className="group h-full rounded-3xl border border-white/[0.08] bg-roxo-medio/35 p-7 transition-colors duration-300 hover:border-lima/50 sm:p-9">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violeta/25 text-lima">
                    <o.icone className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-lima uppercase">{o.nome}</p>
                    <p className="text-lg font-bold text-nevoa">{o.pra}</p>
                  </div>
                </div>

                <p className="mt-8 text-sm font-semibold text-nevoa/50">Você precisa de {o.nome.toLowerCase()} se…</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {o.sinais.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-[15px] leading-snug text-nevoa/80">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lima text-[11px] font-bold text-roxo-noite" aria-hidden="true">
                        ✓
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-lima/30 bg-lima/[0.06] p-7 sm:flex-row sm:items-center sm:p-9">
          <p className="max-w-2xl text-base leading-relaxed text-nevoa/80 sm:text-lg">
            <span className="font-bold text-nevoa">Muita gente que pede app, na real, precisa de um sistema web</span>: funciona
            no celular, sem baixar nada. Dá pra começar pequeno e crescer junto com o negócio.
          </p>
          <a
            href="#contato"
            className="shrink-0 rounded-full bg-lima px-6 py-3 text-sm font-bold text-roxo-noite transition-transform duration-300 hover:-translate-y-0.5"
          >
            Me ajuda a escolher →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
