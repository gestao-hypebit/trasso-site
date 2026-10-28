import type { Metadata } from "next";
import MetaPixel from "@/components/landing/MetaPixel";
import Grain from "@/components/Grain";
import PlanejadoresFaq from "@/components/landing/planejadores/Faq";
import LeadForm from "@/components/landing/planejadores/LeadForm";
import {
  PlanejadoresFooter,
  PlanejadoresGarantias,
  PlanejadoresDepoimentos,
  PlanejadoresHeader,
  PlanejadoresHero,
  PlanejadoresIncluso,
  PlanejadoresInvestimento,
  PlanejadoresPassos,
  PlanejadoresPortfolio,
  PlanejadoresProblema,
  PlanejadoresWhatsAppFlutuante,
} from "@/components/landing/planejadores/Secoes";

// Landing das campanhas do Meta Ads para planejadores, consultores e educadores financeiros.

const TITLE = "Sites para Planejadores Financeiros | Slick";
const DESCRIPTION =
  "Site profissional para planejadores e consultores financeiros, no ar em 7 dias úteis, por R$ 947 com domínio do primeiro ano incluso.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/planejadores" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/planejadores",
    siteName: "Slick",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function PlanejadoresLanding() {
  return (
    <>
      <Grain />
      <MetaPixel />
      <PlanejadoresHeader />
      <main>
        <PlanejadoresHero />
        <PlanejadoresProblema />
        <PlanejadoresPortfolio />
        <PlanejadoresDepoimentos />
        <PlanejadoresIncluso />
        <PlanejadoresInvestimento />
        <PlanejadoresPassos />
        <PlanejadoresGarantias />
        <PlanejadoresFaq />
        <LeadForm />
      </main>
      <PlanejadoresFooter />
      <PlanejadoresWhatsAppFlutuante />
    </>
  );
}
