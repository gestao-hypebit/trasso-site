import Navbar from "@/components/Navbar";
import Preloader, { SCRIPT_PULAR_PRELOADER } from "@/components/Preloader";
import Hero from "@/components/Hero";
import Showreel from "@/components/Showreel";
import Sobre from "@/components/Sobre";
import Numeros from "@/components/Numeros";
import Services from "@/components/Services";
import Duvida from "@/components/Duvida";
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
      <script dangerouslySetInnerHTML={{ __html: SCRIPT_PULAR_PRELOADER }} />
      <noscript>
        <style>{".preloader{display:none}"}</style>
      </noscript>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Showreel />
        <Sobre />
        <Services />
        <Work />
        <Numeros />
        <Duvida />
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
