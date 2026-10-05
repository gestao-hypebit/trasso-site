import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Slick — Criatividade e tecnologia, sem atrito",
    short_name: "Slick",
    description:
      "A Slick é uma agência criativa que une estratégia, design e tecnologia — da ideia ao ar, sem atrito.",
    start_url: "/",
    display: "standalone",
    background_color: "#1a0533",
    theme_color: "#1a0533",
    lang: "pt-BR",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
