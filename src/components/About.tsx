import Reveal from "./Reveal";

const PILLARS = [
  {
    title: "Estratégia",
    description: "Direção clara antes de qualquer traço no papel.",
  },
  {
    title: "Criatividade",
    description: "Uma linguagem visual autoral, não genérica.",
  },
  {
    title: "Tecnologia",
    description: "Produto e código a serviço da marca, não o contrário.",
  },
];

export default function About() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-lavanda py-28 sm:py-40">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal className="mb-16 max-w-2xl">
          <p className="eyebrow mb-5 text-violeta">Sobre a Trasso</p>
          <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-roxo-noite text-balance sm:text-5xl">
            Todo projeto começa com um{" "}
            <span className="text-rosa">traço</span> — o traço que inicia,
            conecta e <span className="text-violeta">direciona</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-t border-roxo-noite/15">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="group grid grid-cols-[1fr_auto] items-center gap-6 border-b border-roxo-noite/15 px-2 py-9 transition-colors duration-400 hover:bg-roxo-noite sm:grid-cols-[auto_1fr_auto] sm:gap-10 sm:px-6"
              >
                <h3 className="text-4xl font-black tracking-tight text-roxo-noite transition-colors duration-400 group-hover:text-nevoa sm:text-6xl">
                  {pillar.title}
                </h3>
                <p className="hidden max-w-sm text-sm leading-relaxed text-roxo-noite/50 transition-colors duration-400 group-hover:text-nevoa/70 sm:block">
                  {pillar.description}
                </p>
                <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-roxo-noite/20 text-roxo-noite opacity-0 transition-all duration-400 group-hover:border-lima group-hover:text-lima group-hover:opacity-100 sm:flex">
                  →
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-roxo-noite/55">
            Fugimos da estética genérica das agências tradicionais pra criar
            uma linguagem mais contemporânea, autoral e viva — e aplicar essa
            direção em tudo que a sua marca precisa pra existir de verdade.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
