// Só roda no servidor (lê LEADS_API_KEY); o Cta importa apenas os tipos.
// O formulário de contato é montado no administrativo (trasso-app → Leads →
// Formulários). O site busca a definição por aqui e envia as respostas para lá.

export type CampoTipo =
  | "texto"
  | "email"
  | "telefone"
  | "textarea"
  | "select"
  | "opcoes"
  | "multiplas";

export type Campo = {
  id: string;
  chave: string;
  rotulo: string;
  tipo: CampoTipo;
  placeholder?: string;
  obrigatorio: boolean;
  largura: "metade" | "inteira";
  opcoes?: string[];
};

export type FormularioPublico = {
  slug: string;
  titulo: string | null;
  subtitulo: string | null;
  botao_texto: string;
  mensagem_sucesso: string;
  campos: Campo[];
};

export const FORM_SLUG = process.env.LEADS_FORM_SLUG ?? "site-contato";

/** Usado quando o administrativo está fora do ar ou não configurado. */
export const FORMULARIO_PADRAO: FormularioPublico = {
  slug: FORM_SLUG,
  titulo: null,
  subtitulo: null,
  botao_texto: "Enviar",
  mensagem_sucesso: "Recebemos! A gente te responde em até 1 dia útil.",
  campos: [
    { id: "nome", chave: "nome", rotulo: "Seu nome", tipo: "texto", placeholder: "Como podemos te chamar?", obrigatorio: true, largura: "metade" },
    { id: "telefone", chave: "telefone", rotulo: "WhatsApp", tipo: "telefone", placeholder: "(11) 91234-5678", obrigatorio: true, largura: "metade" },
    { id: "email", chave: "email", rotulo: "Seu e-mail", tipo: "email", placeholder: "voce@empresa.com", obrigatorio: true, largura: "inteira" },
    { id: "mensagem", chave: "mensagem", rotulo: "Sobre o projeto", tipo: "textarea", placeholder: "Conta rapidamente o que você tem em mente", obrigatorio: true, largura: "inteira" },
  ],
};

export function adminUrl(path: string) {
  const base = process.env.TRASSO_ADMIN_URL?.replace(/\/$/, "");
  const key = process.env.LEADS_API_KEY;
  if (!base || !key) return null;
  return { url: `${base}${path}`, headers: { "x-api-key": key } };
}

/**
 * Definição atual do formulário (cache de 60s).
 * `null` quando o formulário foi pausado no administrativo.
 */
export async function getFormulario(): Promise<FormularioPublico | null> {
  const alvo = adminUrl(`/api/publico/formularios/${FORM_SLUG}`);
  if (!alvo) return FORMULARIO_PADRAO;

  try {
    const res = await fetch(alvo.url, {
      headers: alvo.headers,
      next: { revalidate: 60 },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as FormularioPublico;
    return Array.isArray(data.campos) && data.campos.length > 0 ? data : FORMULARIO_PADRAO;
  } catch (error) {
    console.error("Não foi possível carregar o formulário do administrativo:", error);
    return FORMULARIO_PADRAO;
  }
}
