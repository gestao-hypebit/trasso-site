import Image from "next/image";
import Reveal from "./Reveal";
import BrowserFrame from "./BrowserFrame";
import { IconeSeta } from "./Icones";
import { PROJETOS, type Projeto } from "@/lib/projetos";

function CardProjeto({ projeto }: { projeto: Projeto }) {
  const ehSite = projeto.tipo !== "Identidade visual";
  return (
    <a href={projeto.url} target="_blank" rel="noreferrer" className="group block">
      {ehSite ? (
        <BrowserFrame dominio={projeto.dominio} className="transition-transform duration-500 group-hover:-translate-y-1.5">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={projeto.imagem}
              alt={`Site ${projeto.titulo}`}
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 92vw"
              className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
            />
          </div>
        </BrowserFrame>
      ) : (
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 transition-transform duration-500 group-hover:-translate-y-1.5">
          <Image
            src={projeto.imagem}
            alt={`Identidade visual ${projeto.titulo}`}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 92vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-nevoa/45">{projeto.tipo}</p>
          <h3 className="mt-1 text-lg font-bold text-nevoa">{projeto.titulo}</h3>
        </div>
        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-nevoa/70 transition-colors group-hover:border-lima group-hover:bg-lima group-hover:text-roxo-noite">
          <IconeSeta className="h-4 w-4" />
          <span className="sr-only">Ver no ar</span>
        </span>
      </div>
    </a>
  );
}

export default function Work() {
  return (
    <section id="trabalhos" className="border-t border-white/[0.06] bg-roxo-noite py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="rotulo mb-5">Trabalhos</p>
            <h2 className="titulo-secao">Projetos que já estão no ar.</h2>
          </div>
          <a href="#contato" className="text-sm font-semibold text-nevoa/70 hover:text-lima">
            Quero um projeto assim →
          </a>
        </Reveal>

        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {PROJETOS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <CardProjeto projeto={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
