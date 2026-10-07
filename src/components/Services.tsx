import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { IconeSeta } from "./Icones";

// Mesma copy do carrossel "O que a gente faz" no Instagram.
const SERVICOS: { categoria: string; titulo: ReactNode; descricao: string }[] = [
  {
    categoria: "Sites",
    titulo: <>Site que <span className="tarja">vende</span>, não só que existe.</>,
    descricao: "Rápido, bonito no celular e com contato a um toque.",
  },
  {
    categoria: "Software sob demanda",
    titulo: <>O sistema que <span className="tarja">encaixa</span> no seu processo.</>,
    descricao: "Desenhado em cima de como você já trabalha.",
  },
  {
    categoria: "Aplicativos",
    titulo: <>Seu negócio no <span className="tarja">bolso</span> do cliente.</>,
    descricao: "Android e iPhone, do protótipo à loja.",
  },
  {
    categoria: "Identidade visual",
    titulo: <>Marca que parece <span className="tarja">grande</span> desde o primeiro dia.</>,
    descricao: "Logo, paleta, tipografia e aplicações.",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="bg-roxo-noite pb-28 sm:pb-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-14 max-w-3xl">
          <p className="rotulo mb-5">O que a gente faz</p>
          <h2 className="titulo-secao">
            Tudo que seu negócio precisa pra <span className="tarja">crescer no digital</span>.
          </h2>
        </Reveal>

        <ol className="border-b border-white/[0.08]">
          {SERVICOS.map((s, i) => (
            <li key={s.categoria} className="border-t border-white/[0.08]">
              <Reveal delay={i * 0.05}>
                <a
                  href="#contato"
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 py-9 sm:py-11 lg:grid-cols-[14rem_1fr_auto] lg:gap-x-10"
                >
                  <p className="rotulo col-span-2 lg:col-span-1">
                    {String(i + 1).padStart(2, "0")} · {s.categoria}
                  </p>
                  <div className="lg:col-start-2">
                    <h3 className="text-[1.75rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-nevoa transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl lg:text-[2.6rem]">
                      {s.titulo}
                    </h3>
                    <p className="mt-3 text-base text-nevoa/55">{s.descricao}</p>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-nevoa/70 transition-all duration-500 group-hover:rotate-45 group-hover:border-lima group-hover:bg-lima group-hover:text-roxo-noite">
                    <IconeSeta className="h-4 w-4" />
                    <span className="sr-only">Falar sobre {s.categoria.toLowerCase()}</span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
