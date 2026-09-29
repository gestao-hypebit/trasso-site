import Image from "next/image";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { PRECO, WHATSAPP_LANDING_URL } from "./constants";

const ctaPrimario =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-lima px-7 py-3.5 text-base font-bold text-roxo-noite transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(168,243,0,0.45)]";
const ctaSecundario =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-nevoa/30 px-7 py-3.5 text-base font-bold text-nevoa transition-colors hover:border-lima hover:text-lima";

function Titulo({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-2xl sm:mb-14">
      <p className="eyebrow mb-4 text-lima">{eyebrow}</p>
      <h2 className="text-3xl leading-[1.08] font-black tracking-tight text-nevoa text-balance sm:text-5xl">
        {children}
      </h2>
    </div>
  );
}

/** Sem menu e sem link para a home: o visitante fica na oferta. */
export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-roxo-noite/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Image
          src="/images/cropped/monogram-ss-lima.png"
          alt="Trasso"
          width={862}
          height={292}
          priority
          className="h-7 w-auto sm:h-8"
        />
        <a
          href="#formulario"
          className="rounded-full bg-lima px-4 py-2 text-sm font-bold text-roxo-noite"
        >
          Quero meu site
        </a>
      </div>
    </header>
  );
}

/** Moldura de navegador com a tela de um site (recortes em public/images/telas). */
function JanelaNavegador({
  src,
  dominio,
  priority,
  className = "",
}: {
  src: string;
  dominio: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/15 bg-roxo-medio shadow-[0_30px_80px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rosa" />
          <span className="h-2.5 w-2.5 rounded-full bg-lima" />
          <span className="h-2.5 w-2.5 rounded-full bg-nevoa/70" />
        </div>
        <span className="flex-1 truncate rounded-full bg-white/10 px-3 py-1 text-center text-[11px] text-nevoa/70">
          {dominio}
        </span>
      </div>
      <Image src={src} alt="" width={606} height={312} priority={priority} className="block h-auto w-full" />
    </div>
  );
}

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      <div
        className="aurora top-[-120px] right-[-160px] h-[420px] w-[420px] bg-violeta/30"
        aria-hidden="true"
      />
      <div
        className="aurora bottom-[-200px] left-[-160px] h-[360px] w-[360px] bg-rosa/15"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.25fr_1fr]">
        <div className="fade-up">
          <p className="eyebrow mb-6 text-lima">Criação de sites</p>
          <h1 className="text-[2.6rem] leading-[1.02] font-black tracking-tight text-nevoa text-balance sm:text-6xl lg:text-7xl">
            Seu negócio com site profissional,{" "}
            <span className="relative inline-block text-lima">
              no ar em 3 dias
              <svg
                className="hero-underline absolute -bottom-3 left-0 h-3 w-full sm:-bottom-4 sm:h-4"
                viewBox="0 0 300 24"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 14C60 4 140 2 180 10S260 20 296 8"
                  stroke="var(--color-lima)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-nevoa/75 sm:text-lg">
            Criamos sites sob medida para empresas de todos segmentos — com domínio próprio, visual
            profissional e suporte depois da entrega.
          </p>

          <p className="mt-8 inline-flex items-baseline gap-2 rounded-2xl border border-lima/30 bg-lima/10 px-5 py-3">
            <span className="text-sm font-semibold text-nevoa/80">Por apenas</span>
            <span className="text-3xl font-black tracking-tight text-lima sm:text-4xl">{PRECO}</span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#formulario" className={ctaPrimario}>
              Quero meu site <span aria-hidden="true">→</span>
            </a>
            <a href={WHATSAPP_LANDING_URL} target="_blank" rel="noreferrer" className={ctaSecundario}>
              <WhatsAppIcon className="h-5 w-5" />
              Falar no WhatsApp
            </a>
          </div>
        </div>

        {/* Telas de cases reais em janelas de navegador: imagem estática, sem vídeo acima da dobra. */}
        <div className="fade-up relative lg:pt-16 lg:pb-10" aria-hidden="true">
          <JanelaNavegador
            src="/images/telas/fluminous.jpg"
            dominio="ffluminous.com.br"
            className="absolute top-0 right-0 hidden w-[80%] opacity-70 lg:block"
          />
          <JanelaNavegador
            src="/images/telas/nakahodo.jpg"
            dominio="mnakahodo.com.br"
            priority
            className="relative w-full lg:w-[88%]"
          />
          <p className="absolute -bottom-4 right-4 flex items-center gap-2 rounded-full bg-lima px-4 py-2 text-sm font-bold text-roxo-noite shadow-[0_8px_30px_rgba(0,0,0,0.35)] lg:right-0 lg:bottom-2">
            <span aria-hidden="true">✓</span> Feito pela Trasso
          </p>
        </div>
      </div>
    </section>
  );
}

const PROBLEMAS = [
  "Cliente pesquisa seu nome no Google e não te encontra",
  "Depender só do Instagram passa menos confiança",
  "Link de WhatsApp ou Linktree não mostra o que seu negócio vale",
];

export function LandingProblema() {
  return (
    <section className="bg-roxo-medio/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Titulo eyebrow="O problema">
          Sem site, seu negócio <span className="text-rosa">perde cliente</span> sem perceber.
        </Titulo>
        <ul className="grid gap-4 sm:grid-cols-3">
          {PROBLEMAS.map((p) => (
            <li
              key={p}
              className="flex gap-4 rounded-2xl border border-white/10 bg-roxo-noite/60 p-6 text-base leading-snug font-semibold text-nevoa sm:flex-col"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rosa/15 text-lg font-black text-rosa"
                aria-hidden="true"
              >
                ×
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const INCLUSO = [
  "Site sob medida, responsivo (celular e computador)",
  "Botão de WhatsApp integrado",
  "Configuração no Google (indexação básica)",
  "Suporte e ajustes após a entrega",
];

export function LandingIncluso() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Titulo eyebrow="O que está incluso">
          Tudo para seu negócio ser <span className="text-lima">encontrado</span> e passar confiança.
        </Titulo>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <ul className="grid gap-3 sm:grid-cols-2">
            {INCLUSO.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-roxo-medio/50 p-5 text-base font-semibold text-nevoa"
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lima text-sm font-black text-roxo-noite"
                  aria-hidden="true"
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="rounded-3xl border border-lima/30 bg-lima/5 p-7">
            <p className="text-sm font-semibold text-nevoa/75">Investimento</p>
            <p className="mt-1 text-5xl font-black tracking-tight text-lima">{PRECO}</p>
            <p className="mt-4 text-sm leading-relaxed text-nevoa/70">
              Domínio (R$40/ano) e hospedagem (R$49,90/mês) cobrados à parte.
            </p>
            <a href="#formulario" className={`${ctaPrimario} mt-6 w-full`}>
              Quero meu site <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const PASSOS = [
  { titulo: "Conversa rápida", texto: "Entendemos seu negócio pelo WhatsApp." },
  { titulo: "Criação", texto: "Você paga 30% de sinal e começamos o site." },
  { titulo: "Entrega", texto: "O site vai ao ar e você paga o restante." },
];

export function LandingPassos() {
  return (
    <section className="bg-roxo-medio/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Titulo eyebrow="Como funciona">
          Três passos e seu site <span className="text-lima">está no ar</span>.
        </Titulo>
        <ol className="grid gap-4 sm:grid-cols-3">
          {PASSOS.map((passo, i) => (
            <li key={passo.titulo} className="relative overflow-hidden rounded-2xl bg-roxo-noite/70 p-7">
              <span aria-hidden="true" className="ghost-num absolute -top-2 right-4 text-7xl">
                {i + 1}
              </span>
              <p className="text-sm font-bold text-lima">Passo {i + 1}</p>
              <h3 className="mt-2 text-xl font-black text-nevoa">{passo.titulo}</h3>
              <p className="mt-2 text-base leading-relaxed text-nevoa/75">{passo.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-preto px-5 pt-10 pb-28 text-center text-sm text-nevoa/60 sm:px-8">
      <p>Trasso — Agência criativa</p>
      <p className="mt-1">
        <a href="mailto:gestao@trasso.com.br" className="hover:text-lima">
          gestao@trasso.com.br
        </a>
      </p>
    </footer>
  );
}

export function LandingWhatsAppFlutuante() {
  return (
    <a
      href={WHATSAPP_LANDING_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-lima text-roxo-noite shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-110 sm:right-8 sm:bottom-8"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
