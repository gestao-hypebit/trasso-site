// Cases reais do portfólio. Usado pela home (Work) e pela landing /site.

export type Shot = {
  title: string;
  tag: string;
  gradient: string;
  video?: string;
  /** Primeiro frame do vídeo, mostrado antes de ele carregar. */
  poster?: string;
  image?: string;
  url?: string;
};

export const SHOTS: Shot[] = [
  // {
  //   title: "Mais Saúde",
  //   tag: "Sistema para clínica médica",
  //   gradient: "from-violeta/50 via-roxo-medio to-roxo-noite",
  // },
  {
    title: "Maurício Nakahodo",
    tag: "Site institucional",
    gradient: "from-rosa/40 via-roxo-medio to-roxo-noite",
    video: "/images/videonakahodo.mp4",
    poster: "/images/posters/nakahodo.jpg",
    url: "https://www.mnakahodo.com.br/",
  },
  {
    title: "Viável Planejamento Financeiro",
    tag: "Site institucional",
    gradient: "from-rosa/40 via-roxo-medio to-roxo-noite",
    video: "/images/videoviavel.mp4",
    poster: "/images/posters/viavel.jpg",
    url: "https://xn--vivelfinanaspessoais-jxb4l.com.br/",
  },
  {
    title: "Enche o Bolso",
    tag: "Landing Page",
    gradient: "from-rosa/40 via-roxo-medio to-roxo-noite",
    video: "/images/videoencheobolso.mp4",
    poster: "/images/posters/encheobolso.jpg",
    url: "https://encheobolso.com.br/",
  },
  {
    title: "Fluminous",
    tag: "Site institucional",
    gradient: "from-rosa/40 via-roxo-medio to-roxo-noite",
    video: "/images/videofluminous.mp4",
    poster: "/images/posters/fluminous.jpg",
    url: "https://www.ffluminous.com.br/",
  },
  {
    title: "Planejamento Com Propósito",
    tag: "Site institucional",
    gradient: "from-rosa/40 via-roxo-medio to-roxo-noite",
    video: "/images/videoplanejamentocomproposito.mp4",
    poster: "/images/posters/planejamentocomproposito.jpg",
    url: "https://planejamentocomproposito.com.br/",
  },
  {
    title: "Identidade Visual - Mnakahodo",
    tag: "Identidade visual",
    gradient: "from-rosa/40 via-roxo-medio to-roxo-noite",
    image: "/images/idvisualmnakahodo.jpg",
    url: "https://www.mnakahodo.com.br/",
  },

  // {
  //   title: "Maurício Nakahodo",
  //   tag: "Identidade visual",
  //   gradient: "from-lima/25 via-roxo-medio to-roxo-noite",
  // },
];
