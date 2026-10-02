import Reveal from "./Reveal";

// As etapas são uma sequência real — daí a numeração.
const ETAPAS = [
  {
    titulo: "Conversa",
    descricao: "Uma chamada de 30 minutos para entender seu negócio, seu público e o que precisa sair do papel.",
  },
  {
    titulo: "Proposta",
    descricao: "Você recebe escopo, prazo e valor fechados antes de começar. Sem letra miúda.",
  },
  {
    titulo: "Criação e desenvolvimento",
    descricao: "Design e código feitos pelo mesmo time, com a sua aprovação em cada etapa.",
  },
  {
    titulo: "Publicação e suporte",
    descricao: "Colocamos no ar com domínio e segurança configurados e seguimos com suporte e melhorias.",
  },
];

export default function Process() {
  return (
    <section id="processo" className="border-t border-white/[0.06] bg-roxo-noite py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:px-10">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="rotulo mb-5">Como trabalhamos</p>
          <h2 className="titulo-secao">Da primeira conversa ao site no ar.</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-nevoa/60">
            Um processo direto, com prazos combinados e você acompanhando cada etapa — sem sumir no meio do caminho.
          </p>
        </Reveal>

        <ol className="border-b border-white/[0.08]">
          {ETAPAS.map((etapa, i) => (
            <li key={etapa.titulo} className="border-t border-white/[0.08]">
              <Reveal delay={i * 0.06} className="grid grid-cols-[3rem_1fr] gap-4 py-8 sm:grid-cols-[4rem_1fr]">
                <span className="pt-0.5 text-sm font-bold text-lima tabular-nums">{String(i + 1).padStart(2, "0")}</span>
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
