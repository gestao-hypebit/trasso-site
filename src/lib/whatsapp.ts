/** Número com DDI e DDD, só dígitos (ex.: 5511912345678). Sem ele, os links de WhatsApp somem. */
const NUMERO = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");

const MENSAGEM = "Olá! Vim pelo site da Trasso e quero conversar sobre um projeto.";

export const whatsappUrl = NUMERO
  ? `https://wa.me/${NUMERO}?text=${encodeURIComponent(MENSAGEM)}`
  : null;
