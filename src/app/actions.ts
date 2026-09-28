"use server";

import { Resend } from "resend";
import { adminUrl, FORM_SLUG } from "@/lib/formulario";

const CONTACT_TO = "gestao@trasso.com.br";
/** Must be a verified sender in Resend. Falls back to their shared test address. */
const CONTACT_FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  erros?: Record<string, string>;
};

const ERRO_ENVIO: ContactState = {
  status: "error",
  message: "Não conseguimos enviar agora. Tenta de novo ou manda um e-mail pra gestao@trasso.com.br.",
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
async function enviarPorEmail(valores: Record<string, string | string[]>) {
  if (!process.env.RESEND_API_KEY) return false;
  try {
    const nome = String(valores.nome ?? "Sem nome");
    const email = Object.values(valores).find((v) => typeof v === "string" && v.includes("@"));
    const corpo = Object.entries(valores)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
      .join("\n");
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: `Site Trasso <${CONTACT_FROM}>`,
      to: CONTACT_TO,
      replyTo: typeof email === "string" ? email : undefined,
      subject: `Novo projeto — ${nome} (administrativo fora do ar)`,
      text: corpo,
    });
    return !error;
  } catch (error) {
    console.error("Falha no e-mail de contingência:", error);
    return false;
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
    UTM_KEYS.map((k) => [k.replace("utm_", ""), String(formData.get(`_${k}`) ?? "")]).filter(([, v]) => v),
  );

  const alvo = adminUrl(`/api/publico/formularios/${FORM_SLUG}`);
  if (alvo) {
    try {
      const res = await fetch(alvo.url, {
        method: "POST",
        headers: { ...alvo.headers, "content-type": "application/json" },
        body: JSON.stringify({ valores, pagina: String(formData.get("_pagina") ?? ""), utm }),
        cache: "no-store",
      });
      const data = (await res.json().catch(() => ({}))) as {
        mensagem?: string;
        error?: string;
        erros?: Record<string, string>;
      };

      if (res.ok) {
        return { status: "success", message: data.mensagem ?? "Recebemos! A gente te responde em breve." };
      }
      if (res.status === 422) {
        return { status: "error", message: data.error ?? "Confere os campos destacados.", erros: data.erros };
      }
      console.error("Administrativo recusou o lead:", res.status, data);
    } catch (error) {
      console.error("Falha ao enviar lead ao administrativo:", error);
    }
  } else {
    console.error("TRASSO_ADMIN_URL/LEADS_API_KEY não configuradas — usando e-mail.");
  }

  return (await enviarPorEmail(valores))
    ? { status: "success", message: "Recebemos! A gente te responde em breve." }
    : ERRO_ENVIO;
}
