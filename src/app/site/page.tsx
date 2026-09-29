import type { Metadata } from "next";
import LandingFaq from "@/components/landing/Faq";
import LeadForm from "@/components/landing/LeadForm";
import MetaPixel from "@/components/landing/MetaPixel";
import Portfolio from "@/components/landing/Portfolio";
import {
  LandingFooter,
  LandingHeader,
  LandingHero,
  LandingIncluso,
  LandingPassos,
  LandingProblema,
  LandingWhatsAppFlutuante,
} from "@/components/landing/Secoes";

// Landing das campanhas (Meta Ads / Google Ads): oferta única de criação de site.

const TITLE = "Criação de Sites | Trasso";
const DESCRIPTION =
  "Site profissional para o seu negócio, a partir de R$750. Domínio próprio, visual sob medida e suporte. Peça seu orçamento pelo WhatsApp.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/site" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/site",
    siteName: "Trasso",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function SiteLanding() {
  return (
    <>
      <MetaPixel />
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingProblema />
        <Portfolio />
        <LandingIncluso />
        <LandingPassos />
        <LandingFaq />
        <LeadForm />
      </main>
      <LandingFooter />
      <LandingWhatsAppFlutuante />
    </>
  );
}
