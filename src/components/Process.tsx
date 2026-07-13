import { DoodleArrow } from "./Doodles";
import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Escuta",
    description:
      "Mergulhamos no seu negócio, público e contexto antes de propor qualquer solução.",
  },
  {
    n: "02",
    title: "Estratégia",
    description:
      "Direção clara: posicionamento, mensagem e prioridades que orientam tudo o que vem depois.",
  },
  {
    n: "03",
    title: "Criação",
    description:
      "Identidade, conteúdo e produto ganham forma com um traço só, do conceito ao pixel.",
  },
  {
    n: "04",
    title: "Entrega & Impacto",
    description:
      'Lançamos, medimos e ajustamos. O trabalho continua depois do "no ar".',
  },
];

export default function Process() {
  return (
    <section id="processo" className="relative overflow-hidden bg-roxo-noite py-28 sm:py-40">
      <DoodleArrow className="pointer-events-none absolute right-[6%] top-16 hidden h-10 w-16 -rotate-12 text-lima/25 lg:block" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-20 max-w-2xl">
          <p className="eyebrow mb-5 text-violeta">Como trabalhamos</p>
          <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-nevoa text-balance sm:text-5xl lg:text-6xl">
            Um processo com <span className="text-violeta">direção</span>. Do
            primeiro <span className="text-lima">traço</span> à entrega.
          </h2>
        </Reveal>

        <div className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div
            className="absolute top-6 right-0 left-0 hidden h-px bg-gradient-to-r from-violeta via-lima to-rosa opacity-30 lg:block"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.1}>
              <span className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-roxo-medio font-marker text-sm text-lima">
                {step.n}
              </span>
              <h3 className="mb-2 text-lg font-bold text-nevoa">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-nevoa/55">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
