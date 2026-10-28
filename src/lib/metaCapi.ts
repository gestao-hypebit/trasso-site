// API de Conversões do Meta (CAPI): reforço do Pixel pelo servidor.
// Bloqueadores, DNS com filtro e o iOS derrubam muitos eventos do navegador; este
// envio chega mesmo assim. O mesmo event_id do navegador faz o Meta contar uma vez só.
// Só roda no servidor (lê META_CAPI_ACCESS_TOKEN).

import { createHash } from "node:crypto";
import { cookies, headers } from "next/headers";
import { META_PIXEL_ID } from "@/lib/metaPixel";

const GRAPH_VERSION = "v26.0";

const sha256 = (valor: string) => createHash("sha256").update(valor).digest("hex");

/** Telefone em E.164 sem o "+", como o Meta pede antes do hash (ex.: 5516991234567). */
function telefoneE164(telefone: string) {
  const d = telefone.replace(/\D/g, "");
  if (d.length === 10 || d.length === 11) return `55${d}`;
  return d.length >= 12 ? d : "";
}

/** Primeiro nome em minúsculas, sem acento e pontuação (normalização do Meta). */
function primeiroNome(nome: string) {
  return (nome.trim().split(/\s+/)[0] ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

export type LeadCapi = {
  eventId: string;
  telefone: string;
  nome: string;
  pagina: string;
  fbclid?: string;
};

/** Envia o evento Lead. Nunca lança erro: falha aqui não pode derrubar o lead. */
export async function enviarLeadCapi({ eventId, telefone, nome, pagina, fbclid }: LeadCapi) {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!META_PIXEL_ID || !token) return;

  try {
    const h = await headers();
    const c = await cookies();
    const host = h.get("x-forwarded-host") ?? h.get("host") ?? "";
    // O navegador manda a página do formulário como referer na chamada da server action.
    const url = h.get("referer") || (host ? `https://${host}${pagina}` : undefined);
    const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || undefined;
    // _fbc só existe se o Pixel carregou; sem ele, monta a partir do fbclid do anúncio.
    const fbc = c.get("_fbc")?.value || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined);

    const ph = telefoneE164(telefone);
    const fn = primeiroNome(nome);

    const evento = {
      event_name: "Lead",
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: "website",
      event_source_url: url,
      user_data: {
        ph: ph ? [sha256(ph)] : undefined,
        fn: fn ? [sha256(fn)] : undefined,
        country: [sha256("br")],
        client_ip_address: ip,
        client_user_agent: h.get("user-agent") ?? undefined,
        fbp: c.get("_fbp")?.value,
        fbc,
      },
    };

    const testCode = process.env.META_TEST_EVENT_CODE?.trim();
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${META_PIXEL_ID}/events`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      // Token no corpo, não na URL, para não aparecer em logs de acesso.
      body: JSON.stringify({ data: [evento], access_token: token, ...(testCode ? { test_event_code: testCode } : {}) }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      const erro = (await res.json().catch(() => ({}))) as { error?: { message?: string; code?: number } };
      console.error("CAPI recusou o Lead:", res.status, erro.error?.code, erro.error?.message);
    }
  } catch (error) {
    console.error("Falha ao enviar Lead para a CAPI:", error);
  }
}
