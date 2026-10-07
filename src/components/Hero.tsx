import HeroCelular from "./HeroCelular";
import { whatsappUrl } from "@/lib/whatsapp";

// As faixas cruzadas do post de apresentação no Instagram.
const FAIXA = ["sites", "sistemas", "apps", "identidade visual", "tecnologia", "design"];

function Faixa({ className, texto, animacao }: { className: string; texto: string; animacao: string }) {
  return (
    <div className={`absolute inset-x-[-5%] overflow-hidden py-3 sm:py-4 ${className}`}>
      <div className={`flex w-max ${animacao}`}>
        {[0, 1].map((copia) => (
          <ul key={copia} className="flex shrink-0">
            {[...FAIXA, ...FAIXA].map((s, i) => (
              <li
                key={`${s}-${i}`}
                className={`flex items-center gap-6 pr-6 text-lg font-extrabold tracking-[-0.02em] italic sm:text-2xl ${texto}`}
              >
                {s}
                <span className="text-[0.5em] not-italic">●</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="topo" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-roxo-noite pt-28 sm:pt-32">
      <div
        className="pointer-events-none absolute right-[-15%] top-[-10%] h-[620px] w-[620px] rounded-full bg-violeta/25 blur-[150px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-6 pb-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10 lg:px-10">
        <div>
          <p className="rotulo fade-up mb-7">Prazer, somos a Slick</p>

          <h1
            className="fade-up text-[3rem] leading-[0.98] font-extrabold tracking-[-0.05em] text-nevoa sm:text-7xl xl:text-[5.6rem]"
            style={{ animationDelay: "0.08s" }}
          >
            Do primeiro “oi” ao{" "}
            <span className="tarja tarja-anim" style={{ animationDelay: "0.55s" }}>
              projeto no ar
            </span>
            .
          </h1>

          <p
            className="fade-up mt-7 max-w-xl text-lg leading-relaxed text-nevoa/70"
            style={{ animationDelay: "0.18s" }}
          >
            Tecnologia e design sob medida pro seu negócio: sites, sistemas, apps e identidade visual, com um time que
            te acompanha do começo ao fim.
          </p>

          <div className="fade-up mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.28s" }}>
            <a
              href="#contato"
              className="group inline-flex items-center gap-2 rounded-full bg-lima px-7 py-3.5 text-sm font-bold text-roxo-noite transition-transform duration-300 hover:-translate-y-0.5"
            >
              Tirar meu projeto do papel
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href={whatsappUrl ?? "#trabalhos"}
              {...(whatsappUrl ? { target: "_blank", rel: "noreferrer" } : {})}
              className="inline-flex items-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-nevoa/85 transition-colors hover:border-lima hover:text-lima"
            >
              {whatsappUrl ? "Chamar no WhatsApp" : "Ver trabalhos"}
            </a>
          </div>

          <p
            className="fade-up mt-9 font-mono text-[11px] tracking-[0.18em] text-nevoa/45 uppercase"
            style={{ animationDelay: "0.36s" }}
          >
            Sem sumiço · sem tecniquês · sem surpresa
          </p>
        </div>

        <div className="lg:pl-6">
          <HeroCelular />
        </div>
      </div>

      {/* Faixas cruzadas: lima por cima, violeta por baixo. Decorativas. */}
      <div className="relative h-32 shrink-0 sm:h-40" aria-hidden="true">
        <Faixa className="top-10 -rotate-[2.5deg] bg-violeta sm:top-12" texto="text-nevoa" animacao="animate-marquee-reverse" />
        <Faixa className="top-10 rotate-[2.5deg] bg-lima shadow-[0_10px_40px_rgba(0,0,0,0.35)] sm:top-12" texto="text-roxo-noite" animacao="animate-marquee" />
      </div>
    </section>
  );
}
