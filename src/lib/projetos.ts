// Projetos mostrados na home (hero e portfólio). As imagens em /images/projetos
// são capturas dos sites no ar (desktop 1440×900 e celular 390×844).
// A landing /site continua usando SHOTS de lib/cases.ts.

export type Projeto = {
  slug: string;
  titulo: string;
  tipo: "Site institucional" | "Landing page" | "Identidade visual";
  url: string;
  dominio: string;
  /** Captura desktop do site; para identidade visual, a arte de apresentação. */
  imagem: string;
  /** Captura no celular (só sites). */
  mobile?: string;
};

export const PROJETOS: Projeto[] = [
  {
    slug: "nakahodo",
    titulo: "Maurício Nakahodo",
    tipo: "Site institucional",
    url: "https://www.mnakahodo.com.br/",
    dominio: "mnakahodo.com.br",
    imagem: "/images/projetos/nakahodo-desktop.jpg",
    mobile: "/images/projetos/nakahodo-mobile.jpg",
  },
  {
    slug: "fluminous",
    titulo: "Fluminous",
    tipo: "Site institucional",
    url: "https://www.ffluminous.com.br/",
    dominio: "ffluminous.com.br",
    imagem: "/images/projetos/fluminous-desktop.jpg",
    mobile: "/images/projetos/fluminous-mobile.jpg",
  },
  {
    slug: "encheobolso",
    titulo: "Enche o Bolso",
    tipo: "Landing page",
    url: "https://encheobolso.com.br/",
    dominio: "encheobolso.com.br",
    imagem: "/images/projetos/encheobolso-desktop.jpg",
    mobile: "/images/projetos/encheobolso-mobile.jpg",
  },
  {
    slug: "viavel",
    titulo: "Viável Planejamento Financeiro",
    tipo: "Site institucional",
    url: "https://xn--vivelfinanaspessoais-jxb4l.com.br/",
    dominio: "viávelfinançaspessoais.com.br",
    imagem: "/images/projetos/viavel-desktop.jpg",
    mobile: "/images/projetos/viavel-mobile.jpg",
  },
  {
    slug: "planejamentocomproposito",
    titulo: "Planejamento Com Propósito",
    tipo: "Site institucional",
    url: "https://planejamentocomproposito.com.br/",
    dominio: "planejamentocomproposito.com.br",
    imagem: "/images/projetos/planejamentocomproposito-desktop.jpg",
    mobile: "/images/projetos/planejamentocomproposito-mobile.jpg",
  },
  {
    slug: "nakahodo-identidade",
    titulo: "Maurício Nakahodo",
    tipo: "Identidade visual",
    url: "https://www.mnakahodo.com.br/",
    dominio: "mnakahodo.com.br",
    imagem: "/images/idvisualmnakahodo.jpg",
  },
];

/** Sites que alternam no mockup do topo da página. */
export const PROJETOS_HERO = PROJETOS.filter((p) => p.mobile);
