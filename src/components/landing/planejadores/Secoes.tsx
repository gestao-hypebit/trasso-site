import Image from "next/image";
import Link from "next/link";
import { CNPJ, EMAIL_CONTATO } from "@/lib/empresa";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Wordmark } from "@/components/Logo";
import HeroBusca from "./HeroBusca";
import {
  IconeBusca,
  IconeCadeado,
  IconeCamera,
  IconeCaneta,
  IconeConversa,
  IconeDispositivos,
  IconeEscudo,
  IconeLink,
  IconePino,
  IconeRelogio,
} from "./Icones";
import { DEPOIMENTOS, ENTRADA, PRECO, RESTANTE, WHATSAPP_DUVIDA_URL } from "./constants";

// Seções da landing /planejadores. Mesma estrutura da landing /site (../Secoes),
// mas com o lima como cor de destaque no lugar do rosa.

export const ctaPrimario =
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
export function PlanejadoresHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-roxo-noite/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Wordmark priority className="h-7 w-auto sm:h-8" />
        <a href="#formulario" className="rounded-full bg-lima px-4 py-2 text-sm font-bold text-roxo-noite">
          Quero meu site
        </a>
      </div>
    </header>
  );
}

/** Sem botão de WhatsApp no topo: o lead passa pelo formulário. */
export function PlanejadoresHero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-24 sm:pt-20 sm:pb-32">
      {/* Grade sutil que some nas bordas. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-nevoa) 1px, transparent 1px), linear-gradient(90deg, var(--color-nevoa) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="aurora top-[-140px] right-[-160px] h-[460px] w-[460px] bg-violeta/40" aria-hidden="true" />
      <div className="aurora bottom-[-220px] left-[-180px] h-[380px] w-[380px] bg-lima/10" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
        <div className="fade-up">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-lima/30 bg-lima/10 px-3.5 py-1.5 text-xs font-semibold text-lima sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-lima" aria-hidden="true" />
            Sites para planejadores e consultores financeiros
          </p>
          <h1 className="text-[2.15rem] leading-[1.05] font-black tracking-tight text-nevoa text-balance sm:text-5xl lg:text-6xl">
            Seu cliente pesquisa seu nome antes de te contratar.{" "}
            <span className="text-lima">
              O que ele{" "}
              <span className="relative inline-block">
                encontra?
                <svg
                  className="hero-underline absolute -bottom-2 left-0 h-3 w-full sm:-bottom-3 sm:h-4"
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
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-nevoa/75 sm:mt-8 sm:text-lg">
            Site profissional para a sua consultoria, no ar em 7 dias úteis, com domínio do primeiro ano
            incluso.
          </p>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:mt-8">
            <span className="text-4xl font-black tracking-tight text-nevoa sm:text-5xl">{PRECO}</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-nevoa/85">
              entrada de {ENTRADA}
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#formulario" className={ctaPrimario}>
              Quero meu site <span aria-hidden="true">→</span>
            </a>
            <a href="#portfolio" className={ctaSecundario}>
              Ver sites que já fizemos
            </a>
          </div>
        </div>

        <div className="fade-up">
          <HeroBusca />
        </div>
      </div>
    </section>
  );
}

/** O caminho de quem recebe a indicação: Google, Instagram, link solto. */
const PROBLEMAS = [
  {
    Icone: IconeBusca,
    onde: "No Google",
    texto: "Quem recebe sua indicação pesquisa seu nome no Google e não encontra nada.",
  },
  {
    Icone: IconeCamera,
    onde: "No Instagram",
    texto: "O Instagram mostra seu dia a dia, mas não passa a seriedade de quem vai cuidar do dinheiro de alguém.",
  },
  {
    Icone: IconeLink,
    onde: "No link da bio",
    texto: "Link de WhatsApp ou Linktree não mostra seus serviços, sua formação e seus resultados.",
  },
];

export function PlanejadoresProblema() {
  return (
    <section className="relative overflow-hidden bg-roxo-medio/40 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-4 text-lima">O problema</p>
          <h2 className="text-3xl leading-[1.08] font-black tracking-tight text-nevoa text-balance sm:text-5xl">
            Indicação traz o cliente. <span className="text-lima">O site é que fecha a reunião.</span>
          </h2>
        </div>

        {/* Linha vertical liga os três pontos: é o caminho que o cliente faz antes de te chamar. */}
        <ol className="relative flex flex-col gap-4">
          <span aria-hidden="true" className="absolute top-8 bottom-8 left-12 w-px sm:left-[52px] bg-linear-to-b from-white/20 via-white/10 to-transparent" />
          {PROBLEMAS.map(({ Icone, onde, texto }) => (
            <li key={onde} className="relative flex gap-5 rounded-2xl border border-white/10 bg-roxo-noite/70 p-5 sm:p-6">
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-roxo-medio text-nevoa/80">
                <Icone className="h-6 w-6" />
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-roxo-noite text-xs font-black text-nevoa/60 ring-1 ring-white/20"
                >
                  ×
                </span>
              </span>
              <div>
                <p className="text-xs font-semibold tracking-wider text-nevoa/50 uppercase">{onde}</p>
                <p className="mt-1.5 text-base leading-snug font-semibold text-nevoa sm:text-lg">{texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

type Case = { nome: string; url: string; imagem: string };

const CASES: Case[] = [
  { nome: "Enche o Bolso", url: "https://encheobolso.com.br/", imagem: "/images/planejadores/encheobolso.jpg" },
  {
    nome: "Planejamento Com Propósito",
    url: "https://planejamentocomproposito.com.br/",
    imagem: "/images/planejadores/planejamentocomproposito.jpg",
  },
  { nome: "CourInvest", url: "https://courinvest.com.br/", imagem: "/images/planejadores/courinvest.jpg" },
  { nome: "MNakahodo", url: "https://www.mnakahodo.com.br/", imagem: "/images/planejadores/mnakahodo.jpg" },
];

const dominio = (url: string) => new URL(url).hostname.replace(/^www\./, "");

/** Print dentro de uma janela de navegador com o domínio real, para parecer site no ar. */
function CaseCard({ item, destaque }: { item: Case; destaque?: boolean }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-roxo-noite transition-colors hover:border-lima/50"
    >
      <div className="flex items-center gap-3 border-b border-white/10 bg-roxo-medio/60 px-3 py-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
        </div>
        <span className="flex-1 truncate rounded-full bg-white/10 px-3 py-0.5 text-center text-[11px] text-nevoa/70">
          {dominio(item.url)}
        </span>
      </div>
      <div className={`relative overflow-hidden ${destaque ? "aspect-16/10 lg:aspect-auto lg:flex-1" : "aspect-16/10"}`}>
        <Image
          src={item.imagem}
          alt={`Site ${item.nome}`}
          fill
          sizes={destaque ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {destaque && (
          <span className="absolute top-4 right-4 rounded-full bg-lima px-3 py-1 text-[11px] font-bold tracking-wider text-roxo-noite uppercase">
            Destaque
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-4 p-5">
        <h3 className={`font-bold text-nevoa ${destaque ? "text-xl sm:text-2xl" : "text-lg"}`}>{item.nome}</h3>
        <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-lima">
          Ver no ar
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            ↗
          </span>
          <span className="sr-only">(abre em nova aba)</span>
        </span>
      </div>
    </a>
  );
}

/** Enche o Bolso em destaque (2×2 no desktop); os outros e o card final ao lado. */
export function PlanejadoresPortfolio() {
  const [destaque, ...outros] = CASES;
  return (
    <section id="portfolio" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Titulo eyebrow="Portfólio">
          Sites que já colocamos no ar para <span className="text-lima">o seu segmento</span>
        </Titulo>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="sm:col-span-2 lg:row-span-2">
            <CaseCard item={destaque} destaque />
          </Reveal>
          {outros.map((item, i) => (
            <Reveal key={item.nome} delay={(i % 2) * 0.08}>
              <CaseCard item={item} />
            </Reveal>
          ))}
          <Reveal delay={0.08}>
            <a
              href="#formulario"
              className="group flex h-full min-h-44 flex-col justify-end rounded-2xl border border-dashed border-lima/40 bg-lima/5 p-6 transition-colors hover:border-lima hover:bg-lima/10"
            >
              <span className="mb-3 w-fit rounded-full border border-lima/40 px-3 py-1 text-[11px] font-semibold tracking-wider text-lima uppercase">
                Próximo case
              </span>
              <h3 className="text-lg font-bold text-nevoa">
                O site da <span className="text-lima">sua consultoria</span>
              </h3>
              <span className="mt-3 flex items-center gap-2 text-sm font-semibold text-lima">
                Quero meu site
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Só aparece quando houver depoimentos reais em constants.ts. */
export function PlanejadoresDepoimentos() {
  if (DEPOIMENTOS.length === 0) return null;
  return (
    <section className="pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Titulo eyebrow="Quem já tem site com a Slick">
          O que dizem os <span className="text-lima">planejadores</span>
        </Titulo>
        <ul className={`grid gap-5 ${DEPOIMENTOS.length > 1 ? "md:grid-cols-2" : "max-w-3xl"}`}>
          {DEPOIMENTOS.map((d) => (
            <li key={d.nome}>
              <figure className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-white/10 bg-roxo-medio/50 p-6 sm:p-8">
                <blockquote className="text-lg leading-relaxed font-semibold text-nevoa sm:text-xl">
                  <span className="mb-2 block font-black text-4xl leading-none text-lima" aria-hidden="true">
                    “
                  </span>
                  {d.texto}
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  {d.foto ? (
                    <Image src={d.foto} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-lima text-lg font-black text-roxo-noite"
                    >
                      {d.nome.charAt(0)}
                    </span>
                  )}
                  <span>
                    <span className="block font-bold text-nevoa">{d.nome}</span>
                    <span className="block text-sm text-nevoa/60">{d.negocio}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Blocos da página única, desenhados como um esboço do site. */
const BLOCOS_PAGINA = [
  "Apresentação",
  "Serviços",
  "Sobre e certificações",
  "Como funciona o atendimento",
  "Depoimentos de clientes",
  "Contato",
];

const INCLUSO = [
  { Icone: IconeConversa, texto: "Formulário de contato qualificado e botão de WhatsApp para agendar a reunião inicial" },
  { Icone: IconeCadeado, texto: "Domínio próprio (.com.br) incluso no 1º ano, certificado de segurança e hospedagem" },
  { Icone: IconePino, texto: "Cadastro no Google Meu Negócio e indexação no Google" },
  { Icone: IconeDispositivos, texto: "Versão para celular e computador" },
  { Icone: IconeCaneta, texto: "Texto do site escrito pela Slick a partir de um briefing simples" },
];

export function PlanejadoresIncluso() {
  return (
    <section className="bg-roxo-medio/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Titulo eyebrow="O que vem no site">
          Tudo o que sua consultoria precisa para <span className="text-lima">passar confiança</span>
        </Titulo>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card principal: a página única desenhada bloco a bloco. */}
          <div className="rounded-3xl border border-lima/25 bg-roxo-noite/80 p-6 sm:col-span-2 lg:col-span-1 lg:row-span-3">
            <p className="text-lg font-black text-nevoa">Página única com tudo que o cliente procura</p>
            <ol className="mt-5 flex flex-col gap-2">
              {BLOCOS_PAGINA.map((bloco, i) => (
                <li
                  key={bloco}
                  className={`flex items-center gap-3 rounded-xl border px-4 text-sm font-semibold ${
                    i === 0
                      ? "border-lima/40 bg-lima/10 py-5 text-lima"
                      : "border-white/10 bg-white/[0.04] py-3 text-nevoa/85"
                  }`}
                >
                  <span className="font-mono text-[11px] text-nevoa/40">{String(i + 1).padStart(2, "0")}</span>
                  {bloco}
                </li>
              ))}
            </ol>
          </div>

          {INCLUSO.map(({ Icone, texto }) => (
            <div key={texto} className="flex items-start gap-4 rounded-2xl bg-roxo-noite/60 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lima/10 text-lima">
                <Icone className="h-6 w-6" />
              </span>
              <p className="text-base leading-snug font-semibold text-nevoa">{texto}</p>
            </div>
          ))}

          <a
            href="#investimento"
            className="group flex flex-col justify-center rounded-2xl bg-lima p-5 text-roxo-noite transition-shadow hover:shadow-[0_0_40px_rgba(168,243,0,0.35)]"
          >
            <span className="text-sm font-bold">Tudo isso por</span>
            <span className="flex items-center justify-between text-3xl font-black tracking-tight">
              {PRECO}
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/** O pagamento como linha do tempo: o que sai hoje, na entrega e depois. */
const PAGAMENTO = [
  { quando: "Para começar", valor: ENTRADA, texto: `Entrada de 30% (${ENTRADA}) para começar` },
  { quando: "Na entrega", valor: RESTANTE, texto: `Restante de ${RESTANTE} na entrega, no Pix ou em até 3x no cartão` },
];

export function PlanejadoresInvestimento() {
  return (
    <section id="investimento" className="relative scroll-mt-16 overflow-hidden py-20 sm:py-28">
      <div className="aurora top-1/3 right-[-200px] h-[420px] w-[420px] bg-lima/10" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-4 text-lima">Investimento</p>
          <h2 className="text-3xl leading-[1.08] font-black tracking-tight text-nevoa text-balance sm:text-5xl">
            Quanto custa o <span className="text-lima">seu site</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-nevoa/75">
            Valor fechado, sem surpresa: você sabe o que paga para começar, o que paga na entrega e quanto
            custa manter o site no ar.
          </p>
        </div>

        <div className="rounded-3xl border border-lima/30 bg-roxo-noite/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div>
              <p className="text-sm font-semibold text-nevoa/70">Site completo</p>
              <p className="mt-1 text-6xl leading-none font-black tracking-tight whitespace-nowrap text-lima">{PRECO}</p>
            </div>
            <span className="rounded-full sm:mb-1 bg-lima/10 px-3 py-1 text-xs font-bold text-lima">
              Domínio .com.br incluso no 1º ano
            </span>
          </div>

          <ol className="relative mt-8 flex flex-col gap-5 border-l border-dashed border-white/20 pl-6">
            {PAGAMENTO.map((p) => (
              <li key={p.quando} className="relative">
                <span aria-hidden="true" className="absolute top-1.5 -left-[31px] h-2.5 w-2.5 rounded-full bg-lima ring-4 ring-roxo-noite" />
                <p className="text-xs font-semibold tracking-wider text-nevoa/50 uppercase">{p.quando}</p>
                <p className="mt-1 text-base text-nevoa">{p.texto}</p>
              </li>
            ))}
          </ol>

          {/* Manutenção em destaque, nada escondido no rodapé. */}
          <div className="mt-7 rounded-2xl border border-white/15 bg-white/[0.04] p-5">
            <p className="flex flex-wrap items-baseline justify-between gap-x-3 text-base font-bold text-nevoa">
              Manutenção
              <span className="text-xl font-black">
                R$ 49,90<span className="text-sm font-semibold text-nevoa/60">/mês</span>
              </span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-nevoa/75">
              A partir da entrega — hospedagem, segurança, backup, atualizações e 1 ajuste pequeno por mês.
            </p>
          </div>

          <a href="#formulario" className={`${ctaPrimario} mt-6 w-full`}>
            Quero meu site <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

const PASSOS = [
  "Você preenche o formulário",
  "Conversa de 15 minutos pelo WhatsApp",
  "Entrada de 30% e briefing rápido",
  "Seu site pronto em 7 dias úteis para aprovação",
  "Ajustes, pagamento do restante e site no ar",
];

/** Linha do tempo: vertical no celular, horizontal no desktop. */
export function PlanejadoresPassos() {
  return (
    <section className="bg-roxo-medio/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Titulo eyebrow="Como funciona">
          Do formulário ao <span className="text-lima">site no ar</span>
        </Titulo>

        <ol className="relative grid gap-7 lg:grid-cols-5 lg:gap-6">
          <span
            aria-hidden="true"
            className="absolute top-5 bottom-5 left-5 w-px bg-linear-to-b from-lima via-lima/40 to-lima/10 lg:top-5 lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-px lg:w-auto lg:bg-linear-to-r"
          />
          {PASSOS.map((passo, i) => {
            const ultimo = i === PASSOS.length - 1;
            return (
              <li key={passo} className="relative pl-16 lg:pt-16 lg:pl-0 lg:text-center">
                <span
                  className={`absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-full text-base font-black ring-8 ring-roxo-noite lg:left-1/2 lg:-translate-x-1/2 ${
                    ultimo ? "bg-lima text-roxo-noite" : "border border-lima/50 bg-roxo-noite text-lima"
                  }`}
                >
                  {ultimo ? "✓" : i + 1}
                </span>
                <h3 className="pt-1.5 text-lg leading-snug font-bold text-nevoa lg:pt-0 lg:text-base">{passo}</h3>
                {i === 3 && (
                  <span className="mt-2 inline-block rounded-full bg-lima/10 px-3 py-1 text-xs font-bold text-lima">
                    7 dias úteis
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

const GARANTIAS = [
  {
    Icone: IconeEscudo,
    titulo: "Layout aprovado ou refeito",
    texto: "Ajustamos até você aprovar a primeira versão.",
  },
  {
    Icone: IconeRelogio,
    titulo: "Prazo garantido",
    texto: "Se passar de 7 dias úteis após o briefing, o primeiro mês de manutenção é por nossa conta.",
  },
];

export function PlanejadoresGarantias() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-lima/30 bg-linear-to-br from-lima/10 via-roxo-medio/40 to-roxo-noite p-6 sm:p-12">
          <div className="aurora top-[-120px] right-[-120px] h-[320px] w-[320px] bg-lima/15" aria-hidden="true" />

          <div className="relative">
            <p className="eyebrow mb-4 text-lima">Garantias</p>
            <h2 className="max-w-2xl text-3xl leading-[1.08] font-black tracking-tight text-nevoa text-balance sm:text-5xl">
              Duas garantias para você <span className="text-lima">contratar tranquilo</span>
            </h2>

            <ul className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-10">
              {GARANTIAS.map(({ Icone, titulo, texto }) => (
                <li key={titulo} className="flex gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-lima text-roxo-noite">
                    <Icone className="h-7 w-7" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="text-xl font-black text-nevoa">{titulo}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-nevoa/75">{texto}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PlanejadoresFooter() {
  return (
    <footer className="border-t border-white/10 bg-preto px-5 pt-10 pb-28 text-center text-sm text-nevoa/60 sm:px-8">
      <p className="font-semibold text-nevoa/80">Slick — Agência criativa</p>
      {CNPJ && <p className="mt-1">CNPJ {CNPJ}</p>}
      <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <a href={`mailto:${EMAIL_CONTATO}`} className="hover:text-lima">
          {EMAIL_CONTATO}
        </a>
        <Link href="/privacidade" className="underline underline-offset-2 hover:text-lima">
          Política de privacidade
        </Link>
      </p>
    </footer>
  );
}

/** Discreto: menor e sem cor de destaque, para não competir com o formulário. */
export function PlanejadoresWhatsAppFlutuante() {
  return (
    <a
      href={WHATSAPP_DUVIDA_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Tirar uma dúvida no WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-roxo-medio/90 text-nevoa shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-colors duration-300 hover:border-lima hover:text-lima sm:right-8 sm:bottom-8"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
