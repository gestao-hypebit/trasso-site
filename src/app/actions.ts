"use server";

import { Resend } from "resend";

const CONTACT_TO = "gestao@trasso.com.br";
/** Must be a verified sender in Resend. Falls back to their shared test address. */
const CONTACT_FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real visitors never fill this hidden field, bots usually do.
  const honeypot = String(formData.get("company") ?? "").trim();
  if (honeypot) {
    return {
      status: "success",
      message: "Mensagem enviada! A gente te responde em breve.",
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Preenche todos os campos antes de enviar." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Esse e-mail não parece válido." };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY não configurada — e-mail de contato não enviado.");
    return {
      status: "error",
      message: "Não conseguimos enviar agora. Manda um e-mail direto pra gestao@trasso.com.br.",
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: `Site Trasso <${CONTACT_FROM}>`,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Novo projeto — ${name}`,
      text: `${message}\n\n— ${name} (${email})`,
    });

    if (error) {
      console.error("Resend rejeitou o envio:", error);
      return {
        status: "error",
        message: "Não conseguimos enviar agora. Tenta de novo em instantes.",
      };
    }
  } catch (error) {
    console.error("Falha ao enviar e-mail de contato:", error);
    return {
      status: "error",
      message: "Não conseguimos enviar agora. Tenta de novo em instantes.",
    };
  }

  return {
    status: "success",
    message: "Mensagem enviada! A gente te responde em breve.",
  };
}
