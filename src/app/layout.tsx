import type { Metadata, Viewport } from "next";
import { Inter, Permanent_Marker } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const marker = Permanent_Marker({
  variable: "--font-marker",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const SITE_URL = "https://slick.com.br";
const SITE_NAME = "Slick";
const TITLE = "Slick — Criatividade e tecnologia, sem atrito";
const DESCRIPTION =
  "A Slick é uma agência criativa que une estratégia, design e tecnologia: identidade de marca, sites, sistemas, apps e automação. Da ideia ao ar, sem atrito.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Slick",
  },
  description: DESCRIPTION,
  keywords: [
    "agência criativa",
    "agência de branding",
    "identidade visual",
    "design de marca",
    "criação de sites",
    "desenvolvimento de produtos digitais",
    "aplicativos mobile",
    "automação e integração de sistemas",
    "agência digital",
  ],
  authors: [{ name: "Slick", url: SITE_URL }],
  creator: "Slick",
  publisher: "Slick",
  applicationName: SITE_NAME,
  category: "business",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#1a0533",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: "Slick",
  url: SITE_URL,
  logo: `${SITE_URL}/images/slick/logo-roxo.png`,
  image: `${SITE_URL}/opengraph-image`,
  description: DESCRIPTION,
  slogan: "Criatividade e tecnologia, sem atrito",
  email: "gestao@slick.com.br",
  sameAs: ["https://instagram.com/_agenciaslick"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
  },
  areaServed: "BR",
  knowsAbout: [
    "Branding",
    "Identidade visual",
    "Desenvolvimento web",
    "Aplicativos mobile",
    "Automação e integração de sistemas",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${marker.variable} scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-roxo-noite text-nevoa antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
