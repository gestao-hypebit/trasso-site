import { whatsappUrl } from "@/lib/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppButton() {
  if (!whatsappUrl) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar pelo WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-lima text-roxo-noite shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-110 sm:right-8 sm:bottom-8"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
