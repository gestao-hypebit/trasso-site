import Reveal from "./Reveal";

// Só promessas que o site já faz em outros pontos (FAQ, processo, Instagram).
const NUMEROS = [
  { valor: "30 min", rotulo: "de conversa para entender o seu projeto" },
  { valor: "3–6", rotulo: "semanas para um site ou uma identidade visual" },
  { valor: "1 time", rotulo: "do design ao código, sem terceirizar seu projeto" },
  { valor: "100%", rotulo: "do código, domínio e acessos ficam com você" },
];

export default function Numeros() {
  return (
    <section className="border-y border-white/[0.08] bg-roxo-noite" aria-label="A Slick em números">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {NUMEROS.map((n, i) => (
          <Reveal
            key={n.valor}
            delay={i * 0.06}
            className={`flex flex-col-reverse gap-3 px-6 py-10 sm:py-14 lg:px-10 ${i % 2 ? "border-l border-white/[0.08]" : ""} ${i > 1 ? "border-t border-white/[0.08] lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
          >
            <dt className="max-w-[16rem] text-sm leading-relaxed text-nevoa/55">{n.rotulo}</dt>
            <dd className="text-4xl font-extrabold tracking-[-0.04em] text-lima sm:text-5xl lg:text-6xl">{n.valor}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
