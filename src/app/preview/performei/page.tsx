import Image from "next/image";
import { IconePerformei, LogoPerformei } from "./logo";
import { Coreografia } from "./coreografia";

// Prévia (uma página) para a reunião com o Rubens Queiroz — Performei Consultoria.
// Direção: estúdio editorial. Bricolage Grotesque nos títulos, Poppins no texto, papel quente + azul-marinho
// da marca, azul-claro só como acento, muito respiro e movimento coreografado
// (entrada do hero, revelação ao rolar, linha da metodologia que se desenha,
// botões com preenchimento, cursor próprio — ver coreografia.tsx e performei.css).
// A foto saiu de um post do cliente, recortada do fundo (PNG transparente).

// Ainda sem WhatsApp/agenda do cliente: os botões de agendar descem até o contato.
const AGENDAR = "#contato";

const MENU = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#metodologia", label: "Metodologia" },
  { href: "#contato", label: "Contato" },
];

const SERVICOS = [
  {
    titulo: "Consultoria financeira",
    texto: "Saiba para onde vai cada real da sua empresa e faça o caixa trabalhar a seu favor.",
    botao: "Quero organizar minhas finanças",
  },
  {
    titulo: "Planejamento estratégico",
    texto: "Metas claras, indicadores que importam e um plano que sai do papel.",
    botao: "Quero um plano",
  },
  {
    titulo: "Direção para o dono",
    texto: "Sua empresa cresceu e você virou o gargalo? Vamos estruturar para ela andar sem depender só de você.",
    botao: "Quero sair do operacional",
  },
];

const ETAPAS = [
  { titulo: "Diagnóstico", texto: "Entendemos onde a empresa perde dinheiro e o que trava o crescimento." },
  { titulo: "Plano", texto: "Prioridades, metas e indicadores claros." },
  { titulo: "Execução acompanhada", texto: "Encontros periódicos para decidir com base em dados." },
  { titulo: "Ajustes", texto: "Acompanhamos os resultados e corrigimos a rota." },
];

const atraso = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
const num = (i: number) => String(i + 1).padStart(2, "0");

function Seta({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className={`pf-seta ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#1C2147]/95 text-white backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-10">
        <a href="#sobre" aria-label="Performei — início" className="shrink-0">
          <LogoPerformei claro />
        </a>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Menu">
          {MENU.map((m) => (
            <a key={m.href} href={m.href} className="pf-link pb-0.5 text-[14px] text-white/75 transition-colors hover:text-white">
              {m.label}
            </a>
          ))}
        </nav>

        <a
          href={AGENDAR}
          className="pf-botao hidden items-center gap-2 border border-white/40 px-5 py-2.5 text-[13px] font-medium text-white hover:border-white hover:text-[#1C2147] lg:inline-flex"
        >
          Agendar diagnóstico <Seta />
        </a>

        {/* Celular e tablet: menu sem JavaScript. */}
        <details className="group lg:hidden">
          <summary aria-label="Abrir menu" className="flex h-10 w-10 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden">
            <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 9h16M4 15h16" className="group-open:hidden" />
              <path d="M6 6l12 12M18 6 6 18" className="hidden group-open:block" />
            </svg>
          </summary>
          <div className="fixed inset-x-0 top-[76px] bottom-0 bg-[#1C2147] px-5 pt-6">
            {MENU.map((m, i) => (
              <a key={m.href} href={m.href} className="flex items-baseline gap-4 border-b border-white/10 py-5">
                <span className="text-sm text-[#4BA6E2]">{num(i)}</span>
                <span className="pf-titulo text-3xl">{m.label}</span>
              </a>
            ))}
            <a href={AGENDAR} className="mt-8 flex items-center justify-between bg-[#4BA6E2] px-5 py-4 font-medium text-[#1C2147]">
              Agendar diagnóstico <Seta />
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="sobre"
      className="relative scroll-mt-[76px] overflow-hidden text-white"
      style={{ background: "linear-gradient(180deg, #1C2147 0%, #1B2952 65%, #1A3459 100%)" }}
    >
      {/* O "m" da marca grande e apagado, como nos posts dele */}
      <IconePerformei id="pm-fundo" className="pointer-events-none absolute -bottom-40 -left-20 hidden h-[620px] w-auto opacity-[0.035] sm:block" />

      <div className="relative mx-auto grid max-w-[1320px] lg:min-h-[calc(100svh-76px)] lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_520px]">
        <div className="flex flex-col justify-center px-5 pb-8 pt-20 sm:px-10 sm:pt-24 lg:pb-28 lg:pt-28">
          <h1
            className="pf-titulo pf-entra max-w-[12em] text-[2.6rem] leading-[1.02] sm:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.7rem]"
            style={atraso(0)}
          >
            Finanças organizadas e <em className="text-[#4BA6E2]">direção estratégica</em> para a sua empresa crescer.
          </h1>
          <p className="pf-entra mt-9 max-w-[29rem] text-[17px] leading-[1.7] text-white/70 sm:text-lg" style={atraso(260)}>
            Sou o Rubens Queiroz. Ajudo donos de empresas a sair do operacional, organizar o caixa e tomar decisões com clareza.
          </p>
          <div className="pf-entra mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-9" style={atraso(380)}>
            <a
              href={AGENDAR}
              className="pf-botao inline-flex items-center justify-between gap-6 bg-[#4BA6E2] px-7 py-[18px] text-[15px] font-medium text-[#1C2147] sm:justify-start"
            >
              Agendar diagnóstico <Seta />
            </a>
            <a href="#servicos" className="group inline-flex items-center gap-3 text-[15px] text-white/85 hover:text-white">
              <span className="pf-link pb-1">Conhecer os serviços</span>
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:translate-y-1">
                <path d="M12 4v16" /><path d="m6 14 6 6 6-6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Rubens recortado do fundo, apoiado na base do hero. O post original corta o
            lado direito dele, então só essa borda some aos poucos. */}
        <div className="relative h-[460px] sm:h-[560px] lg:h-auto">
          <Image
            src="/preview/performei/rubens-queiroz-recorte.png"
            alt="Rubens Queiroz, fundador da Performei Consultoria"
            width={592}
            height={1240}
            priority
            sizes="(min-width: 1024px) 520px, 90vw"
            className="pf-entra-foto absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 lg:h-[92%]"
            style={{
              maskImage: "linear-gradient(to right, #000 74%, transparent 98%)",
              WebkitMaskImage: "linear-gradient(to right, #000 74%, transparent 98%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function Servicos() {
  return (
    <section id="servicos" className="scroll-mt-[76px] px-5 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div>
            <h2 data-revelar className="pf-titulo text-[2.5rem] leading-[1.02] sm:text-[3.4rem] lg:text-[3.9rem]" style={atraso(100)}>
              Como posso ajudar <em>a sua empresa</em>
            </h2>
          </div>
          <p data-revelar className="max-w-md text-[17px] leading-[1.7] text-[#1C2147]/65 lg:justify-self-end" style={atraso(200)}>
            Três frentes de trabalho, um objetivo: uma empresa que dá lucro, tem rumo e não depende de você para tudo.
          </p>
        </div>

        {/* -mx no desktop: o texto das colunas alinha com o título, e o fundo do hover tem respiro */}
        <div className="mt-20 grid border-t border-[#1C2147]/15 lg:-mx-10 lg:mt-28 lg:grid-cols-3">
          {SERVICOS.map((s, i) => (
            <article
              key={s.titulo}
              data-revelar
              style={atraso(i * 140)}
              className="group flex flex-col border-b border-[#1C2147]/15 py-12 transition-colors duration-500 hover:bg-white lg:border-b-0 lg:border-r lg:px-10 lg:py-14 lg:last:border-r-0"
            >
              <span className="text-lg font-medium text-[#4BA6E2]">{num(i)}</span>
              <h3 className="pf-titulo mt-10 text-[1.6rem] font-semibold leading-tight">{s.titulo}</h3>
              <p className="mt-5 max-w-[22rem] flex-1 text-[17px] leading-[1.7] text-[#1C2147]/65">{s.texto}</p>
              <a
                href={AGENDAR}
                className="pf-botao mt-12 inline-flex items-center justify-between gap-6 self-start border border-[#1C2147] px-6 py-4 text-[14px] font-medium text-[#1C2147] hover:text-white [--pf-preenche:#1C2147]"
              >
                {s.botao} <Seta />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metodologia() {
  return (
    <section id="metodologia" className="scroll-mt-[76px] bg-[#1C2147] px-5 py-28 text-white sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1320px]">
        <h2 data-revelar className="pf-titulo max-w-[14em] text-[2.5rem] leading-[1.02] sm:text-[3.4rem] lg:text-[3.9rem]" style={atraso(100)}>
          Do diagnóstico <em className="text-[#4BA6E2]">ao resultado</em>
        </h2>

        <ol className="relative mt-20 grid gap-14 pl-10 lg:mt-28 lg:grid-cols-4 lg:gap-10 lg:pl-0 lg:pt-14">
          {/* Trilho: horizontal no desktop, vertical no celular; a parte azul se desenha ao rolar. */}
          <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-white/15 lg:bottom-auto lg:left-0 lg:right-0 lg:top-0 lg:h-px lg:w-auto" />
          <span aria-hidden data-traco className="absolute bottom-2 left-[5px] top-2 w-px bg-[#4BA6E2] lg:bottom-auto lg:left-0 lg:right-0 lg:top-0 lg:h-px lg:w-auto" />
          {ETAPAS.map((e, i) => (
            <li key={e.titulo} data-revelar style={atraso(300 + i * 160)} className="relative">
              <span aria-hidden className="absolute -left-10 top-[0.85rem] h-[11px] w-[11px] rounded-full border border-[#4BA6E2] bg-[#1C2147] lg:-top-[61px] lg:left-0" />
              <span className="pf-titulo block text-[3rem] font-light leading-none text-white/90">{num(i)}</span>
              <h3 className="pf-titulo mt-6 text-[1.4rem] font-semibold">{e.titulo}</h3>
              <p className="mt-3 max-w-[18rem] text-[16px] leading-[1.7] text-white/60">{e.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Contato() {
  return (
    <footer id="contato" className="scroll-mt-[76px] px-5 pb-12 pt-28 sm:px-10 sm:pt-40">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <h2 data-revelar className="pf-titulo text-[2.7rem] leading-[1] sm:text-[4rem] lg:text-[5rem]" style={atraso(100)}>
            Vamos conversar sobre a <em className="text-[#4BA6E2]">sua empresa?</em>
          </h2>
          <div data-revelar style={atraso(250)} className="lg:pb-4">
            <p className="max-w-sm text-[17px] leading-[1.7] text-[#1C2147]/65">
              O diagnóstico é o primeiro passo: uma conversa para entender onde a empresa está e para onde ela pode ir.
            </p>
            <a
              href={AGENDAR}
              className="pf-botao mt-8 inline-flex items-center justify-between gap-8 bg-[#1C2147] px-7 py-[18px] text-[15px] font-medium text-white hover:text-[#1C2147] [--pf-preenche:#4BA6E2]"
            >
              Agendar diagnóstico <Seta />
            </a>
          </div>
        </div>

        <div className="mt-28 flex flex-col gap-6 border-t border-[#1C2147]/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <LogoPerformei />
          <p className="text-[13px] text-[#1C2147]/50">© {new Date().getFullYear()} Performei Consultoria · Rubens Queiroz</p>
        </div>
      </div>
    </footer>
  );
}

export default function PerformeiPreview() {
  return (
    <>
      <Coreografia />
      <Header />
      <main>
        <Hero />
        <Servicos />
        <Metodologia />
      </main>
      <Contato />
    </>
  );
}
