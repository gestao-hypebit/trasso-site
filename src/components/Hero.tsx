import Traco from "./Traco";
import Vitrine from "./Vitrine";
import { IconeCheck } from "./Icones";

const GARANTIAS = [
  "Domínio e código no nome da sua empresa",
  "Suporte depois da entrega",
  "Mesmo time do Catálogo Place, com +500 lojistas",
];

export default function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden bg-roxo-noite pt-32 pb-24 sm:pt-40 lg:pb-32">
      {/* Um único campo de luz atrás do mockup, para dar profundidade. */}
      <div
        className="pointer-events-none absolute right-[-10%] top-[10%] h-[560px] w-[560px] rounded-full bg-violeta/20 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-16 px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12 lg:px-10">
        <div>
          <p className="rotulo fade-up mb-7">Sites · Sistemas · Identidade visual</p>

          <h1
            className="fade-up text-[2.75rem] leading-[1] font-extrabold tracking-[-0.045em] text-balance text-nevoa sm:text-6xl lg:text-[4.6rem]"
            style={{ animationDelay: "0.08s" }}
          >
            Do primeiro traço ao seu negócio <Traco delay={0.7}><span className="text-lima">no ar</span></Traco>.
          </h1>

          <p
            className="fade-up mt-7 max-w-xl text-lg leading-relaxed text-nevoa/65"
            style={{ animationDelay: "0.18s" }}
          >
            A Trasso cria sites, sistemas web, apps e identidades visuais sob medida para empresas de todo
            o Brasil — com estratégia, design e código no mesmo time.
          </p>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.28s" }}>
            <a
              href="#contato"
              className="group inline-flex items-center gap-2 rounded-full bg-lima px-7 py-3.5 text-sm font-bold text-roxo-noite transition-transform duration-300 hover:-translate-y-0.5"
            >
              Pedir orçamento
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#trabalhos"
              className="inline-flex items-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-nevoa/85 transition-colors hover:border-white/40 hover:text-nevoa"
            >
              Ver trabalhos
            </a>
          </div>

          <ul className="fade-up mt-12 flex flex-col gap-3 border-t border-white/[0.08] pt-8 text-sm text-nevoa/60" style={{ animationDelay: "0.38s" }}>
            {GARANTIAS.map((g) => (
              <li key={g} className="flex items-center gap-3">
                <IconeCheck className="h-4 w-4 shrink-0 text-lima" />
                {g}
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-up min-w-0 pr-4 sm:pr-8 lg:pl-4 lg:pr-0" style={{ animationDelay: "0.2s" }}>
          <Vitrine />
        </div>
      </div>
    </section>
  );
}
