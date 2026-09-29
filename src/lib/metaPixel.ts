// Meta Pixel: só é carregado na landing /site (components/landing/MetaPixel).
// As chamadas são seguras — se o Pixel não carregou, nada acontece.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Só dígitos, para não injetar nada no script inline. Vazio = Pixel desligado. */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.replace(/\D/g, "") ?? "";

export function trackPixel(evento: "Lead" | "Contact", params?: Record<string, unknown>) {
  window.fbq?.("track", evento, params);
}
