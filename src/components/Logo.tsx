import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="#topo"
      aria-label="Trasso — início"
      className={`group inline-flex items-center ${className}`}
    >
      <Image
        src="/images/cropped/monogram-ss-lima.png"
        alt="Trasso"
        width={862}
        height={292}
        priority
        className="h-8 w-auto transition-transform duration-300 group-hover:-rotate-6 sm:h-9"
      />
    </Link>
  );
}
