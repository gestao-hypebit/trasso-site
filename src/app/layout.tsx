import type { Metadata } from "next";
import { Inter, Permanent_Marker } from "next/font/google";
import "./globals.css";
import Grain from "@/components/Grain";
import ScrollProgress from "@/components/ScrollProgress";
import TracoCursor from "@/components/TracoCursor";
import SectionIndex from "@/components/SectionIndex";

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

export const metadata: Metadata = {
  title: "Trasso — Criatividade e tecnologia no mesmo traço",
  description:
    "Trasso é uma agência criativa que une estratégia, criatividade e tecnologia em um único movimento. Cada projeto começa com um traço.",
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
        <ScrollProgress />
        <TracoCursor />
        <SectionIndex />
        <Grain />
        {children}
      </body>
    </html>
  );
}
