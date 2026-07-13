import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import TracoLine from "@/components/TracoLine";
import About from "@/components/About";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import Process from "@/components/Process";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Slogan from "@/components/Slogan";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <TracoLine>
        <main>
          <Hero />
          <Marquee />
          <About />
          <Services />
          <Clients />
          <Process />
          <Work />
          <Testimonials />
          <Faq />
          <Slogan />
          <Cta />
        </main>
        <Footer />
      </TracoLine>
    </>
  );
}
