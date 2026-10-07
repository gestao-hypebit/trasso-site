import Reveal from "./Reveal";

// As etapas são uma sequência real — daí a numeração.
const ETAPAS = [
  {
    quando: "Dia 1",
    titulo: "Você conta o problema",
    descricao: "Uma conversa pra entender seu negócio, seu público e o que precisa sair do papel.",
  },
  {
    quando: "Dia 3",
    titulo: "Proposta clara, por escrito",
    descricao: "Escopo, prazo e valor fechados antes de começar. Sem letra miúda.",
  },
  {
    quando: "Semana 2",
    titulo: "Protótipo antes do código",
    descricao: "Você clica nas telas e aprova antes de uma linha de código ser escrita.",
  },
  {
    quando: "Até o ar",
    titulo: "Você acompanha cada etapa",
    descricao: "Entregas que você vê de perto, até o projeto ir pro ar. E a gente segue junto depois.",
  },
];

export default function Process() {
  return (
    <section id="processo" className="border-t border-white/[0.06] bg-roxo-noite py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:px-10">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="rotulo mb-5">Como é com a gente</p>
          <h2 className="titulo-secao">
            Sem sumiço, sem tecniquês e sem <span className="tarja">surpresa</span> no fim.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-nevoa/60">
            Tem um projeto parado? Manda um “oi” e a gente começa pela primeira conversa.
          </p>
        </Reveal>

        <ol className="border-b border-white/[0.08]">
          {ETAPAS.map((etapa, i) => (
            <li key={etapa.titulo} className="border-t border-white/[0.08]">
              <Reveal delay={i * 0.06} className="grid grid-cols-[5rem_1fr] gap-4 py-8 sm:grid-cols-[6rem_1fr]">
                <span className="pt-1 font-mono text-[11px] font-semibold tracking-wider text-lima uppercase">{etapa.quando}</span>
                <div>
                  <h3 className="text-lg font-bold text-nevoa sm:text-xl">{etapa.titulo}</h3>
                  <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-nevoa/60">{etapa.descricao}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
