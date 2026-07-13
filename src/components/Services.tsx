import Reveal from "./Reveal";

const SERVICES = [
  {
    n: "01",
    title: "Produtos Digitais e Plataformas",
    description:
      "Tem uma ideia de negócio que precisa de uma plataforma online para funcionar? A gente projeta e constrói do zero, com tecnologia sob medida.",
  },
  {
    n: "02",
    title: "Presença Digital para Marcas",
    description:
      "Site e identidade visual desenhados juntos, pra sua marca existir com consistência em qualquer tela.",
  },
  {
    n: "03",
    title: "Aplicativos para Smartphones",
    description:
      "Apps mobile pensados de ponta a ponta — da experiência de uso à publicação nas lojas.",
  },
  {
    n: "04",
    title: "Integração e Automação",
    description:
      "Conectamos ERPs, CRMs e gateways de pagamento via API e automatizamos processos com RPA, workflows e chatbots — pra sua operação rodar sozinha.",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="relative overflow-hidden bg-roxo-noite py-28 sm:py-40">
      <div
        className="aurora animate-float -right-32 top-0 h-[420px] w-[420px] bg-violeta/25"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-20 max-w-2xl">
          <p className="eyebrow mb-5 text-lima">O que fazemos</p>
          <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-nevoa text-balance sm:text-5xl lg:text-6xl">
            Quatro frentes. Um único{" "}
            <span className="text-lima">traço</span> de direção.
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.n} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl bg-roxo-medio p-9 transition-transform duration-500 hover:-translate-y-1.5 sm:p-11">
                <span
                  aria-hidden="true"
                  className="ghost-num pointer-events-none absolute -right-2 -top-6 text-[7rem] leading-none opacity-80 transition-all duration-500 group-hover:opacity-100 sm:text-[8rem]"
                  style={{ WebkitTextStrokeColor: "rgba(168,243,0,0.18)" }}
                >
                  {service.n}
                </span>

                <span className="relative z-10 mb-8 block h-9 w-9 rounded-full border border-lima/50 transition-colors group-hover:bg-lima" />

                <h3 className="relative z-10 mb-3 text-xl font-bold text-nevoa sm:text-2xl">
                  {service.title}
                </h3>
                <p className="relative z-10 max-w-sm text-sm leading-relaxed text-nevoa/60 sm:text-base">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
