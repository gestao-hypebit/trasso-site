"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { META_PIXEL_ID, trackPixel } from "@/lib/metaPixel";

/**
 * Pageview da carga inicial já saiu pelo script abaixo. Fica no módulo (e não no
 * componente) porque o componente remonta a cada página, mas o script não roda de novo.
 */
let pageViewInicialFeito = false;

/**
 * Carrega o Meta Pixel (init + PageView uma vez por carga, deduplicado pelo `id`
 * do next/script), dispara PageView nas trocas de rota do client e `Contact`
 * em qualquer clique num link de WhatsApp da página.
 */
export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pageViewInicialFeito) {
      pageViewInicialFeito = true;
      return;
    }
    trackPixel("PageView");
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href*="wa.me/"]');
      if (link) trackPixel("Contact");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!META_PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
