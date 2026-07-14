import Image from "next/image";
import Reveal from "./Reveal";

const SHOTS = [
  // {
  //   title: "Mais Saúde",
  //   tag: "Sistema para clínica médica",
  //   gradient: "from-violeta/50 via-roxo-medio to-roxo-noite",
  // },
  {
    title: "Maurício Nakahodo",
    tag: "Site institucional",
    gradient: "from-rosa/40 via-roxo-medio to-roxo-noite",
    video: "/images/videonakahodo.mp4",
  },
  {
    title: "Enche o Bolso",
    tag: "Landing Page",
    gradient: "from-rosa/40 via-roxo-medio to-roxo-noite",
    video: "/images/videoencheobolso.mp4",
  },
  {
    title: "Fluminous",
    tag: "Site institucional",
    gradient: "from-rosa/40 via-roxo-medio to-roxo-noite",
    video: "/images/videofluminous.mp4",
  },
  // {
  //   title: "Maurício Nakahodo",
  //   tag: "Identidade visual",
  //   gradient: "from-lima/25 via-roxo-medio to-roxo-noite",
  // },
];

function ProductSpotlight() {
  return (
    <a
      href="https://www.catalogoplace.com.br/"
      target="_blank"
      rel="noreferrer"
      className="group relative block aspect-1717/916 w-full overflow-hidden rounded-2xl border border-white/10 bg-roxo-noite"
    >
      <Image
        src="/images/bgcatalogoplace.png"
        alt="Catálogo Place — plataforma de catálogo digital com pedidos via WhatsApp"
        fill
        sizes="100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <span className="absolute top-4 left-4 rounded-full border border-lima/50 bg-roxo-noite/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-lima backdrop-blur-sm sm:top-6 sm:left-6">
        Produto SaaS
      </span>

      <div className="absolute inset-0 flex items-center justify-center bg-roxo-noite/0 opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-roxo-noite/70 group-hover:opacity-100 group-hover:backdrop-blur-sm">
        <span className="flex items-center gap-2 text-base font-semibold text-lima">
          Visitar catalogoplace.com.br
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            ↗
          </span>
        </span>
      </div>
    </a>
  );
}

function Card({
  item,
  n,
  className = "",
}: {
  item: { title: string; tag: string; gradient: string; video?: string };
  n: number;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-roxo-noite ${className}`}
    >
      {item.video ? (
        <video
          src={item.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-linear-to-br ${item.gradient} opacity-90 transition-transform duration-700 ease-out group-hover:scale-110`}
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-roxo-noite/90 via-roxo-noite/10 to-transparent" />

      <span
        aria-hidden="true"
        className="ghost-num absolute -top-3 right-3 text-6xl sm:text-7xl"
        style={{ WebkitTextStrokeColor: "rgba(247,242,255,0.18)" }}
      >
        {String(n).padStart(2, "0")}
      </span>

      <div className="relative flex h-full flex-col justify-end p-7 sm:p-8">
        <span className="mb-3 w-fit rounded-full bg-roxo-noite/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-nevoa backdrop-blur-sm">
          {item.tag}
        </span>
        <h3 className="max-w-[85%] text-xl font-bold text-nevoa sm:text-2xl">
          {item.title}
        </h3>
        <span className="mt-3 flex items-center gap-2 text-sm font-semibold text-lima opacity-0 transition-all duration-300 group-hover:opacity-100">
          Ver case
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="trabalhos" className="relative bg-roxo-medio py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5 text-lima">Portfólio</p>
            <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-nevoa text-balance sm:text-5xl lg:text-6xl">
              Do papel ao <span className="text-lima">produto</span> — o que a
              gente já colocou no ar.
            </h2>
          </div>
          <a
            href="#contato"
            className="text-sm font-semibold text-nevoa/70 underline decoration-lima/50 underline-offset-4 hover:text-lima"
          >
            Quero um projeto assim →
          </a>
        </Reveal>

        <div className="grid gap-5">
          <Reveal>
            <ProductSpotlight />
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-3">
            {SHOTS.map((item, i) => (
              <Reveal key={`${item.title}-${item.tag}`} delay={(i + 1) * 0.08}>
                <Card item={item} n={i + 2} className="aspect-3/4" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
