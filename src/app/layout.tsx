import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Permanent_Marker } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Rótulos e microtextos em mono, como nos posts do Instagram.
const mono = JetBrains_Mono({
  variable: "--font-mono-slick",
  subsets: ["latin"],
  weight: ["500", "600"],
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
const TITLE = "Slick | Sites, Apps e Sistemas";
const DESCRIPTION =
  "Slick: tecnologia e design sob medida pro seu negócio. Sites, sistemas, apps e identidade visual — do primeiro “oi” ao projeto no ar.";

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
  logo: `${SITE_URL}/images/slick/logo-slick-roxo.png`,
  image: `${SITE_URL}/opengraph-image`,
  description: DESCRIPTION,
  slogan: "Tecnologia e design sob medida pro seu negócio",
  email: "gestao@slick.com.br",
  sameAs: ["https://www.instagram.com/agenciaslick/"],
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
    // suppressHydrationWarning: o script do preloader (Preloader.tsx) marca o <html> antes da hidratação.
    <html
      lang="pt-BR"
      className={`${inter.variable} ${mono.variable} ${marker.variable} scroll-smooth`}
      suppressHydrationWarning
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
