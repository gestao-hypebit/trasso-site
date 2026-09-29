"use client";

import { useState } from "react";

const ITEMS = [
  { q: "Quanto tempo leva?", a: "3 dias após o envio das informações e do sinal." },
  { q: "Preciso ter logo?", a: "Não, podemos criar a identidade junto (orçamento à parte)." },
  { q: "O site fica meu?", a: "Sim, domínio e acessos ficam com a sua empresa." },
  { q: "Posso pedir alterações depois?", a: "Sim, oferecemos suporte e ajustes." },
  { q: "Como é o pagamento?", a: "30% de sinal para iniciar e o restante na entrega." },
];

// Mesmo acordeão da home (components/Faq), com as perguntas da oferta.
export default function LandingFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="mb-10 sm:mb-14">
          <p className="eyebrow mb-4 text-lima">Perguntas frequentes</p>
          <h2 className="text-3xl leading-[1.08] font-black tracking-tight text-nevoa text-balance sm:text-5xl">
            Dúvidas antes de <span className="text-lima">começar</span>?
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`rounded-2xl px-5 transition-colors duration-300 sm:px-6 ${
                  isOpen ? "bg-roxo-medio" : "bg-roxo-medio/40"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-nevoa sm:text-lg">{item.q}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-lima/40 text-lima transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  hidden={!isOpen}
                  className="pb-5 text-base leading-relaxed text-nevoa/75"
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
