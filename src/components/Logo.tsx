import Image from "next/image";
import Link from "next/link";

/**
 * Logotipo oficial da Slick ("slick" em névoa com o pingo do "i" em lima),
 * recortado de VISUAL DE MARCA/Logotipo e Variações/logos slick/slick-logo-transparent.png.
 * Feito para fundos escuros. Versões em arquivo: public/images/slick/.
 */
export function Wordmark({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/images/slick/logo-slick.png"
      alt="Slick"
      width={1200}
      height={422}
      priority={priority}
      className={className}
    />
  );
}

type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="#topo" aria-label="Slick — início" className={`inline-flex items-center ${className}`}>
      <Wordmark priority className="h-7 w-auto sm:h-8" />
    </Link>
  );
}
