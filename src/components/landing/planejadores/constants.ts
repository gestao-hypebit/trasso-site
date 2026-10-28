// Landing de anúncios /planejadores: sites para planejadores e consultores financeiros.

const WHATSAPP = "5516996177828";

const whatsapp = (mensagem: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

export const WHATSAPP_DUVIDA_URL = whatsapp("Olá! Vi a página de sites para planejadores e tenho uma dúvida.");
export const WHATSAPP_OBRIGADO_URL = whatsapp("Olá! Acabei de preencher o formulário de sites para planejadores.");

export const PRECO = "R$ 947";
export const ENTRADA = "R$ 284";
export const RESTANTE = "R$ 663";

/** Formulário do administrativo (slick-app → Leads → Formulários) que recebe estes leads. */
export const FORMULARIO = "landing-planejadores";
/** Marcado pelo formulário antes de ir para /obrigado; lá o Pixel dispara `Lead`. */
export const LEAD_PENDENTE = "slick-planejadores-lead";

/**
 * Depoimentos de clientes do segmento (seção depois do portfólio).
 * Lista vazia = a seção não aparece. Use só frases reais, aprovadas pelo cliente.
 * `foto` é opcional (ex.: "/images/planejadores/depoimento-fernanda.jpg").
 */
export type Depoimento = { texto: string; nome: string; negocio: string; foto?: string };

export const DEPOIMENTOS: Depoimento[] = [
  // { texto: "…", nome: "Fernanda", negocio: "Planejamento Com Propósito" },
  // { texto: "…", nome: "Raquel", negocio: "Enche o Bolso" },
];

export const FAQ = [
  { q: "Quanto tempo leva?", a: "7 dias úteis depois do envio do briefing completo e da entrada." },
  {
    q: "Preciso ter logo?",
    a: "Não. Se você não tiver, criamos o site com tipografia e cores profissionais, com seu nome em destaque.",
  },
  { q: "O site e o domínio ficam no meu nome?", a: "Sim. O domínio é registrado no seu nome e o site é seu." },
  {
    q: "O que a manutenção inclui?",
    a: "Hospedagem, segurança, backup, atualizações e 1 ajuste pequeno por mês, como trocar um texto, uma foto ou um depoimento.",
  },
  {
    q: "E se eu cancelar a manutenção?",
    a: "O site e o domínio continuam seus, e você recebe os arquivos para levar a outra hospedagem.",
  },
  {
    q: "Posso pedir alterações maiores depois?",
    a: "Sim. Alterações maiores que o ajuste mensal são orçadas à parte.",
  },
  {
    q: "Como é o pagamento?",
    a: "30% de entrada no Pix ou cartão, e o restante na entrega, no Pix ou em até 3x no cartão.",
  },
];

/**
 * Perguntas de escolha. Os textos precisam bater com as opções cadastradas
 * no administrativo (migration formulario_landing_planejadores), senão o lead é recusado.
 * `pontos` não aparece para o visitante: vira `pontuacao` e `classificacao` no lead.
 */
export type Pergunta = {
  chave: string;
  rotulo: string;
  opcoes: { valor: string; pontos: number }[];
};

export const PERGUNTAS_QUALIFICACAO: Pergunta[] = [
  {
    chave: "tem_site",
    rotulo: "Você já tem site?",
    opcoes: [
      { valor: "Não tenho", pontos: 2 },
      { valor: "Tenho, mas está desatualizado", pontos: 2 },
      { valor: "Tenho e gosto", pontos: 0 },
    ],
  },
  {
    chave: "prazo",
    rotulo: "Quando quer o site no ar?",
    opcoes: [
      { valor: "Este mês", pontos: 3 },
      { valor: "Nos próximos 2 meses", pontos: 1 },
      { valor: "Só pesquisando", pontos: 0 },
    ],
  },
  {
    chave: "orcamento",
    rotulo: `O site sai por ${PRECO}, com entrada de 30% (${ENTRADA}). Faz sentido para você?`,
    opcoes: [
      { valor: "Sim, quero conversar", pontos: 3 },
      { valor: "Quero entender melhor", pontos: 1 },
      { valor: "Está fora do meu orçamento", pontos: 0 },
    ],
  },
];

/** 0 a 8 pontos → quente (7–8), morno (3–6), frio (0–2). */
export function qualificar(respostas: Record<string, string>) {
  const pontuacao = PERGUNTAS_QUALIFICACAO.reduce(
    (total, p) => total + (p.opcoes.find((o) => o.valor === respostas[p.chave])?.pontos ?? 0),
    0,
  );
  const classificacao = pontuacao >= 7 ? "quente" : pontuacao >= 3 ? "morno" : "frio";
  return { pontuacao, classificacao };
}
