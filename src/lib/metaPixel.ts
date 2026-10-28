// Meta Pixel: só é carregado nas landings /site e /planejadores (components/landing/MetaPixel).
// As chamadas são seguras — se o Pixel não carregou, nada acontece.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Só dígitos, para não injetar nada no script inline. Vazio = Pixel desligado. */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.replace(/\D/g, "") ?? "";

/** `eventID` é o mesmo enviado pela API de Conversões (lib/metaCapi), para deduplicar. */
export function trackPixel(
  evento: "PageView" | "Lead" | "Contact",
  params?: Record<string, unknown>,
  opcoes?: { eventID: string },
) {
  if (opcoes) window.fbq?.("track", evento, params ?? {}, opcoes);
  else window.fbq?.("track", evento, params);
}
