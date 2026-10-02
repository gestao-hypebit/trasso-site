"use client";

import { useState } from "react";
import Reveal from "./Reveal";

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
    <section id="faq" className="border-t border-white/[0.06] bg-roxo-noite py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:px-10">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="rotulo mb-5">Dúvidas</p>
          <h2 className="titulo-secao">Perguntas antes de começar.</h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-nevoa/60">
            Não achou o que procurava?{" "}
            <a href="#contato" className="font-semibold text-nevoa underline decoration-lima/60 underline-offset-4 hover:text-lima">
              Fale com a gente
            </a>
            .
          </p>
        </Reveal>

        <div className="border-b border-white/[0.08]">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-base font-semibold text-nevoa sm:text-lg">{item.q}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg leading-none transition-all duration-300 ${
                      isOpen ? "rotate-45 border-lima bg-lima text-roxo-noite" : "border-white/20 text-nevoa/70"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-400 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-nevoa/60 sm:text-base">{item.a}</p>
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
