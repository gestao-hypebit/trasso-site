import { DoodleArrow } from "./Doodles";
import Magnetic from "./Magnetic";

export default function Hero() {
  return (
    <section
      id="topo"
      className="relative flex min-h-screen items-center overflow-hidden bg-roxo-noite pt-32 pb-24"
    >
      {/* Aurora — soft color fields for atmospheric depth */}
      <div
        className="aurora animate-float -left-40 top-10 h-[460px] w-[460px] bg-violeta/22"
        aria-hidden="true"
      />
      <div
        className="aurora right-[-180px] top-1/3 h-[420px] w-[420px] bg-rosa/12"
        style={{ animationDelay: "-3s" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <p className="eyebrow fade-up mb-8 text-rosa">Um traço, uma direção</p>

        <h1 className="relative max-w-5xl text-[16vw] font-black leading-[0.88] tracking-[-0.035em] text-nevoa text-balance sm:text-8xl lg:text-9xl xl:text-[8.5rem]">
          <span className="fade-up block">Cada projeto</span>
          <span className="fade-up block" style={{ animationDelay: "0.12s" }}>
            começa com um{" "}
            <span className="relative inline-block whitespace-nowrap text-lima">
              traço
              <svg
                className="hero-underline absolute -bottom-1 left-0 w-full sm:-bottom-2"
                viewBox="0 0 300 24"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 14C60 4 140 2 180 10S260 20 296 8"
                  stroke="var(--color-lima)"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </span>
        </h1>

        <p
          className="fade-up mt-10 max-w-xl text-lg leading-relaxed text-nevoa/65 sm:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          Somos a Trasso: criamos{" "}
          <span className="font-semibold text-nevoa">
            sites, sistemas, apps e identidades visuais
          </span>{" "}
          sob medida — estratégia, criatividade e tecnologia em um único
          movimento.
        </p>

        <div
          className="fade-up relative mt-11 flex flex-wrap items-center gap-5"
          style={{ animationDelay: "0.42s" }}
        >
          <Magnetic>
            <a
              href="#contato"
              className="group inline-flex items-center gap-2.5 rounded-full bg-lima px-7 py-3.5 text-sm font-semibold text-roxo-noite shadow-[0_0_0_rgba(168,243,0,0)] transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(168,243,0,0.45)]"
            >
              Iniciar um projeto
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
          <a
            href="#trabalhos"
            className="inline-flex items-center gap-2 rounded-full border border-nevoa/20 px-7 py-3.5 text-sm font-semibold text-nevoa/85 transition-colors hover:border-lima/60 hover:text-lima"
          >
            Ver trabalhos
          </a>
          <DoodleArrow className="pointer-events-none absolute -right-6 top-1/2 hidden h-8 w-12 -translate-y-1/2 rotate-[130deg] text-lima/40 lg:block" />
        </div>
      </div>

      <div
        className="fade-up absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-nevoa/35 sm:flex"
        style={{ animationDelay: "0.6s" }}
      >
        <span className="text-[11px] uppercase tracking-[0.3em]">
          Role a página
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-nevoa/50 to-transparent" />
      </div>
    </section>
  );
}
