import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Montserrat, Poppins } from "next/font/google";
import "./performei.css";

// Prévia de site para apresentar em reunião (cliente: Performei Consultoria).
// Fica fora de busca: noindex aqui e fora do sitemap.
// Bricolage Grotesque nos títulos, Poppins no texto corrido; Montserrat só no logo,
// que é a fonte da marca do cliente.

// Variável com tamanho óptico: nos títulos grandes as letras ficam mais refinadas.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { absolute: "Performei Consultoria | Rubens Queiroz" },
  description:
    "Consultoria financeira e planejamento estratégico para empresas.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: { canonical: null },
  openGraph: null,
};

export const viewport: Viewport = {
  themeColor: "#1C2147",
  colorScheme: "light",
};

export default function PerformeiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`pf ${poppins.variable} ${bricolage.variable} ${montserrat.variable} min-h-screen bg-[#F5F2EC] text-[#1C2147] antialiased selection:bg-[#4BA6E2] selection:text-white`}>
      {children}
    </div>
  );
}
