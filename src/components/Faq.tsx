"use client";

import { useState } from "react";
import { DoodleSpiral } from "./Doodles";

const ITEMS = [
  {
    q: "Como funciona o primeiro contato?",
    a: "Você conta o que precisa pelo formulário, WhatsApp ou e-mail, a gente agenda uma conversa de 30 minutos e já sai dali com direção clara sobre escopo e próximos passos.",
  },
  {
    q: "Quanto tempo leva um projeto?",
    a: "Depende do escopo: um site institucional ou uma identidade visual costuma levar de 3 a 6 semanas; sistemas e apps, de 6 a 12. Definimos o prazo junto com você já na fase de estratégia.",
  },
  {
    q: "Como funciona o orçamento?",
    a: "Por escopo fechado: antes de começar você recebe uma proposta com o que será entregue, o prazo e o valor. Sem letra miúda.",
  },
  {
    q: "Vocês dão suporte depois que o projeto vai ao ar?",
    a: "Sim. Seguimos com suporte, correções e novas funcionalidades — é o mesmo time que desenvolve e mantém o Catálogo Place, nosso próprio software em produção.",
  },
  {
    q: "O código, o domínio e os acessos ficam com quem?",
    a: "Com a sua empresa. Ao final do projeto você recebe os acessos e o código do que foi desenvolvido para você.",
  },
  {
    q: "Vocês atendem empresas de que porte?",
    a: "De quem está começando a operações já estabelecidas. O que muda é o escopo do projeto, não o nível de atenção.",
  },
  {
    q: "Dá para começar só com uma parte do projeto?",
    a: "Sim. Muitos projetos começam pontuais — um site, uma identidade — e evoluem depois para um sistema, integrações ou um app.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-roxo-noite py-28 sm:py-40">
      <DoodleSpiral className="pointer-events-none absolute right-[10%] top-20 hidden h-14 w-14 text-rosa/20 lg:block" />

      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow mb-5 text-violeta">Perguntas frequentes</p>
          <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-nevoa text-balance sm:text-5xl">
            Dúvidas antes de <span className="text-violeta">começar</span>?
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`rounded-2xl px-6 transition-colors duration-300 ${
                  isOpen ? "bg-roxo-medio" : "bg-roxo-medio/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-base font-semibold text-nevoa sm:text-lg">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-lima/40 text-lima transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-400 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="min-h-0">
                    <p className="max-w-2xl pb-6 text-sm leading-relaxed text-nevoa/55 sm:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
