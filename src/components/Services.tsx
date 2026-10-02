import Image from "next/image";
import Reveal from "./Reveal";
import BrowserFrame, { PhoneFrame } from "./BrowserFrame";
import { IconeApp, IconeIntegracao, IconeMarca, IconeSistema, IconeSite } from "./Icones";

const SERVICOS = [
  {
    icone: IconeSistema,
    titulo: "Sistemas e plataformas web",
    descricao: "Painéis, áreas do cliente e plataformas sob medida para organizar e automatizar a sua operação.",
  },
  {
    icone: IconeApp,
    titulo: "Aplicativos",
    descricao: "Apps para Android e iOS, do desenho das telas à publicação nas lojas.",
  },
  {
    icone: IconeMarca,
    titulo: "Identidade visual",
    descricao: "Logo, cores, tipografia e aplicações para sua marca ser reconhecida em qualquer lugar.",
  },
  {
    icone: IconeIntegracao,
    titulo: "Integrações e automação",
    descricao: "Conectamos ERP, CRM, meios de pagamento e WhatsApp para tirar tarefas repetitivas do seu time.",
  },
];

const card = "rounded-2xl border border-white/[0.08] bg-roxo-medio/35 transition-colors duration-300 hover:border-white/[0.16]";

export default function Services() {
  return (
    <section id="servicos" className="bg-roxo-noite py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-14 max-w-2xl">
          <p className="rotulo mb-5">Serviços</p>
          <h2 className="titulo-secao">Tudo o que sua empresa precisa para crescer no digital.</h2>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Destaque: sites — o serviço mais procurado. */}
          <Reveal className="lg:row-span-2">
            <div className={`${card} flex h-full flex-col overflow-hidden`}>
              <div className="relative px-7 pt-8 sm:px-9">
                <BrowserFrame dominio="ffluminous.com.br">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src="/images/projetos/fluminous-desktop.jpg"
                      alt="Site da Fluminous, feito pela Trasso"
                      fill
                      sizes="(min-width: 1024px) 360px, 90vw"
                      className="object-cover object-top"
                    />
                  </div>
                </BrowserFrame>
                <PhoneFrame className="absolute -bottom-6 right-4 w-[26%] sm:right-6">
                  <div className="relative aspect-[390/844]">
                    <Image src="/images/projetos/fluminous-mobile.jpg" alt="" fill sizes="100px" className="object-cover object-top" />
                  </div>
                </PhoneFrame>
              </div>
              <div className="mt-auto p-7 pt-14 sm:p-9 sm:pt-16">
                <IconeSite className="mb-5 h-7 w-7 text-lima" />
                <h3 className="text-xl font-bold text-nevoa sm:text-2xl">Sites e landing pages</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-nevoa/60">
                  Sites institucionais e páginas de venda rápidos, bonitos no celular e preparados para aparecer no Google.
                </p>
                <a href="#trabalhos" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lima hover:underline">
                  Ver sites que fizemos <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </Reveal>

          {SERVICOS.map((s, i) => (
            <Reveal key={s.titulo} delay={0.06 * (i + 1)}>
              <div className={`${card} h-full p-7 sm:p-8`}>
                <s.icone className="mb-6 h-7 w-7 text-lima" />
                <h3 className="text-lg font-bold text-nevoa">{s.titulo}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-nevoa/60">{s.descricao}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
