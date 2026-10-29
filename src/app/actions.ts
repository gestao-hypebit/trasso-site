"use server";

import { after } from "next/server";
import { Resend } from "resend";
import { adminUrl, FORM_SLUG } from "@/lib/formulario";
import { enviarLeadCapi } from "@/lib/metaCapi";

const CONTACT_TO = "gestao@slick.com.br";
/** Must be a verified sender in Resend. Falls back to their shared test address. */
const CONTACT_FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
// fbclid vai junto das UTMs (só a landing /planejadores envia).
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid"];
/** Formulários do administrativo que o site pode usar (landings /site e /planejadores). */
const FORMULARIOS_PERMITIDOS = new Set([FORM_SLUG, "landing-site", "landing-planejadores"]);

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  erros?: Record<string, string>;
};

const ERRO_ENVIO: ContactState = {
  status: "error",
  message: "Não conseguimos enviar agora. Tenta de novo ou manda um e-mail pra gestao@slick.com.br.",
};

/** Agrupa o FormData: campos repetidos (múltipla escolha) viram lista. */
function coletarValores(formData: FormData) {
  const valores: Record<string, string | string[]> = {};
  for (const chave of new Set(formData.keys())) {
    if (chave.startsWith("$") || chave.startsWith("_") || chave === "company") continue;
    const todos = formData.getAll(chave).map(String);
    valores[chave] = todos.length > 1 ? todos : todos[0];
  }
  return valores;
}

/**
 * Plano B: se o administrativo não responder, o lead chega por e-mail
 * para não se perder.
 */
async function enviarPorEmail(valores: Record<string, string | string[]>, extras: Record<string, string>) {
  if (!process.env.RESEND_API_KEY) return false;
  try {
    const nome = String(valores.nome ?? "Sem nome");
    const email = Object.values(valores).find((v) => typeof v === "string" && v.includes("@"));
    const corpo = Object.entries({ ...valores, ...extras })
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
      .join("\n");
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: `Site Slick <${CONTACT_FROM}>`,
      to: CONTACT_TO,
      replyTo: typeof email === "string" ? email : undefined,
      subject: `Novo projeto — ${nome}${extras.origem ? ` [${extras.origem}]` : ""} (administrativo fora do ar)`,
      text: corpo,
    });
    return !error;
  } catch (error) {
    console.error("Falha no e-mail de contingência:", error);
    return false;
  }
}

/**
 * Lead quente (landing /planejadores) pede resposta em minutos: avisa por e-mail
 * na hora, com o link do WhatsApp da pessoa. Não bloqueia nem derruba o envio.
 */
async function alertarLeadQuente(valores: Record<string, string | string[]>, extras: Record<string, string>) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    const nome = String(valores.nome ?? "Sem nome");
    const digitos = String(valores.telefone ?? "").replace(/\D/g, "");
    const whatsapp = digitos ? `https://wa.me/55${digitos}?text=${encodeURIComponent(`Oi ${nome.split(" ")[0]}! Aqui é da Slick, vi que você pediu um site.`)}` : "";
    const corpo = [
      `${nome} acabou de preencher o formulário e foi classificado como QUENTE.`,
      whatsapp ? `Chamar agora: ${whatsapp}` : "Sem telefone válido.",
      "",
      ...Object.entries({ ...valores, ...extras }).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`),
    ].join("\n");
    await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: `Site Slick <${CONTACT_FROM}>`,
      to: CONTACT_TO,
      subject: `🔥 Lead quente — ${nome}`,
      text: corpo,
    });
  } catch (error) {
    console.error("Falha no alerta de lead quente:", error);
  }
}

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real visitors never fill this hidden field, bots usually do.
  if (String(formData.get("company") ?? "").trim()) {
    return { status: "success", message: "Recebemos! A gente te responde em breve." };
  }

  const valores = coletarValores(formData);
  const utm = Object.fromEntries(
    UTM_KEYS.map((k) => [k, String(formData.get(`_${k}`) ?? "")]).filter(([, v]) => v),
  );

  const pagina = String(formData.get("_pagina") ?? "");
  const origem = String(formData.get("_origem") ?? "");
  const pedido = String(formData.get("_formulario") ?? "");
  const slug = FORMULARIOS_PERMITIDOS.has(pedido) ? pedido : FORM_SLUG;
  // Só vão no e-mail de contingência; no administrativo já seguem em pagina/utm.
  const extras: Record<string, string> = {};
  if (origem) extras.origem = origem;
  if (pagina) extras.pagina = pagina;
  for (const [k, v] of Object.entries(utm)) extras[k] = String(v);

  // Com event_id (landing /planejadores), o Lead também vai pela API de Conversões
  // depois da resposta, com o mesmo id do Pixel para o Meta não contar duas vezes.
  const eventId = String(formData.get("_event_id") ?? "");
  const sucesso = (message: string): ContactState => {
    if (valores.classificacao === "quente") after(() => alertarLeadQuente(valores, extras));
    if (/^[\w-]{8,64}$/.test(eventId)) {
      after(() =>
        enviarLeadCapi({
          eventId,
          telefone: String(valores.telefone ?? ""),
          nome: String(valores.nome ?? ""),
          pagina,
          fbclid: utm.fbclid ? String(utm.fbclid) : undefined,
        }),
      );
    }
    return { status: "success", message };
  };

  const alvo = adminUrl(`/api/publico/formularios/${slug}`);
  if (alvo) {
    try {
      const res = await fetch(alvo.url, {
        method: "POST",
        headers: { ...alvo.headers, "content-type": "application/json" },
        body: JSON.stringify({ valores, pagina, origem: origem || undefined, utm }),
        cache: "no-store",
      });
      const data = (await res.json().catch(() => ({}))) as {
        mensagem?: string;
        error?: string;
        erros?: Record<string, string>;
      };

      if (res.ok) {
        return sucesso(data.mensagem ?? "Recebemos! A gente te responde em breve.");
      }
      if (res.status === 422) {
        return { status: "error", message: data.error ?? "Confere os campos destacados.", erros: data.erros };
      }
      console.error("Administrativo recusou o lead:", res.status, data);
    } catch (error) {
      console.error("Falha ao enviar lead ao administrativo:", error);
    }
  } else {
    console.error("SLICK_ADMIN_URL/LEADS_API_KEY não configuradas — usando e-mail.");
  }

  return (await enviarPorEmail(valores, extras))
    ? sucesso("Recebemos! A gente te responde em breve.")
    : ERRO_ENVIO;
}
