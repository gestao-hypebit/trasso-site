import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import CatalogoPlace from "@/components/CatalogoPlace";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getFormulario } from "@/lib/formulario";

// O formulário de contato vem do administrativo; atualiza a cada minuto.
export const revalidate = 60;

export default async function Home() {
  const formulario = await getFormulario();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <Services />
        <CatalogoPlace />
        <Work />
        <Process />
        {/* Depoimentos voltam quando houver falas reais de clientes (ver Testimonials.tsx). */}
        <Faq />
        <Cta formulario={formulario} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
