import type { Metadata } from "next";
import MetaPixel from "@/components/landing/MetaPixel";
import Grain from "@/components/Grain";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { PlanejadoresFooter, PlanejadoresHeader, ctaPrimario } from "@/components/landing/planejadores/Secoes";
import { WHATSAPP_OBRIGADO_URL } from "@/components/landing/planejadores/constants";

// Destino do formulário de /planejadores. O Pixel dispara PageView; o Lead já saiu
// no formulário (navegador + API de Conversões, com o mesmo event_id).

export const metadata: Metadata = {
  title: { absolute: "Recebemos suas respostas! | Slick" },
  robots: { index: false, follow: false },
};

export default function PlanejadoresObrigado() {
  return (
    <>
      <Grain />
      <MetaPixel />
      <PlanejadoresHeader />
      <main className="relative flex-1 overflow-hidden py-16 sm:py-24">
        <div className="aurora top-0 left-1/2 h-[480px] w-[480px] -translate-x-1/2 bg-violeta/20" aria-hidden="true" />

        <div className="relative mx-auto max-w-xl px-5 text-center sm:px-8">
          <p className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lima text-2xl font-black text-roxo-noite" aria-hidden="true">
            ✓
          </p>
          <h1 className="mt-6 text-3xl leading-[1.08] font-black tracking-tight text-nevoa text-balance sm:text-5xl">
            Recebemos suas <span className="text-lima">respostas</span>!
          </h1>
          <p className="mt-4 text-base leading-relaxed text-nevoa/75 sm:text-lg">
            Em poucos minutos a gente te chama no WhatsApp para entender sua consultoria e te mostrar exemplos.
          </p>

          {/*
            Vídeo curto (vertical, gravado no celular). Para ativar, coloque o arquivo em
            public/videos/planejadores-obrigado.mp4 (e um poster .jpg) e descomente:

          <video
            src="/videos/planejadores-obrigado.mp4"
            poster="/images/planejadores/video-poster.jpg"
            controls
            playsInline
            preload="metadata"
            className="mx-auto mt-10 aspect-9/16 w-full max-w-xs rounded-2xl border border-white/15 bg-roxo-medio object-cover"
          />
          */}

          <a href={WHATSAPP_OBRIGADO_URL} target="_blank" rel="noreferrer" className={`${ctaPrimario} mt-10 w-full sm:w-auto`}>
            <WhatsAppIcon className="h-5 w-5" />
            Falar agora no WhatsApp
          </a>
        </div>
      </main>
      <PlanejadoresFooter />
    </>
  );
}
