import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Trasso — Criatividade e tecnologia no mesmo traço",
    short_name: "Trasso",
    description:
      "A Trasso é uma agência criativa que une estratégia, criatividade e tecnologia em um único movimento.",
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
