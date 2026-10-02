import Image from "next/image";
import Reveal from "./Reveal";
import BrowserFrame, { PhoneFrame } from "./BrowserFrame";
import { IconeSeta } from "./Icones";

// Números públicos do próprio site do Catálogo Place (catalogoplace.com.br).
// Atualize aqui quando o site deles mudar.
const NUMEROS = [
  { valor: "+500", rotulo: "lojistas ativos" },
  { valor: "+20 mil", rotulo: "pedidos processados" },
];

export default function CatalogoPlace() {
  return (
    <section id="catalogo-place" className="scroll-mt-24 bg-roxo-noite pb-28 sm:pb-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="grid items-center gap-12 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-roxo-medio/70 to-roxo-noite p-8 sm:p-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:p-16">
            <div>
              <span className="inline-block rounded-full bg-rosa px-3 py-1 text-[11px] font-bold tracking-wider text-nevoa uppercase">
                Software próprio
              </span>
              <h2 className="titulo-secao mt-6">A gente também cria e mantém o nosso próprio software.</h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-nevoa/65 sm:text-lg">
                O <span className="font-semibold text-nevoa">Catálogo Place</span> é uma plataforma de catálogo online com
                pedidos pelo WhatsApp. Design, código e suporte são da Trasso — o mesmo time que vai cuidar do seu projeto.
              </p>

              <dl className="mt-10 grid max-w-sm grid-cols-2 gap-6 border-t border-white/[0.08] pt-8">
                {NUMEROS.map((n) => (
                  <div key={n.rotulo}>
                    <dt className="sr-only">{n.rotulo}</dt>
                    <dd className="text-3xl font-extrabold tracking-tight text-lima sm:text-4xl">{n.valor}</dd>
                    <dd className="mt-1 text-sm text-nevoa/55">{n.rotulo}</dd>
                  </div>
                ))}
              </dl>

              <a
                href="https://www.catalogoplace.com.br/"
                target="_blank"
                rel="noreferrer"
                className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-nevoa hover:text-lima"
              >
                Conhecer o Catálogo Place
                <IconeSeta className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="relative pb-8 lg:pb-0">
              <BrowserFrame dominio="catalogoplace.com.br">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/images/projetos/catalogoplace-desktop.jpg"
                    alt="Site do Catálogo Place"
                    fill
                    sizes="(min-width: 1024px) 560px, 90vw"
                    className="object-cover object-top"
                  />
                </div>
              </BrowserFrame>
              <PhoneFrame className="absolute -bottom-2 -left-3 w-[24%] sm:-left-8 lg:-bottom-10">
                <div className="relative aspect-[390/844]">
                  <Image src="/images/projetos/catalogoplace-mobile.jpg" alt="" fill sizes="140px" className="object-cover object-top" />
                </div>
              </PhoneFrame>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
