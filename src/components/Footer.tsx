import Image from "next/image";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-preto pt-24 pb-10">
      <Image
        src="/images/cropped/logo-nevoa.png"
        alt=""
        aria-hidden="true"
        width={752}
        height={257}
        className="pointer-events-none absolute -left-6 top-6 w-[70vw] max-w-3xl opacity-[0.035] sm:w-[45vw]"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 sm:flex-row sm:items-end sm:justify-between lg:px-10">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-nevoa/40">
            Criatividade e tecnologia no mesmo traço.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-nevoa/55">
          <a href="#sobre" className="hover:text-lima">Sobre</a>
          <a href="#servicos" className="hover:text-lima">Serviços</a>
          <a href="#clientes" className="hover:text-lima">Clientes</a>
          <a href="#trabalhos" className="hover:text-lima">Trabalhos</a>
          <a href="#faq" className="hover:text-lima">FAQ</a>
          <a href="#contato" className="hover:text-lima">Contato</a>
        </nav>

        <div className="flex items-center gap-6 text-sm text-nevoa/55">
          <a href="https://instagram.com/_agenciatrasso" target="_blank" rel="noreferrer" className="hover:text-lima">
            Instagram
          </a>
          <a href="mailto:gestao@trasso.com.br" className="hover:text-lima">
            E-mail
          </a>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-7xl border-t border-white/10 px-6 pt-6 text-xs text-nevoa/30 lg:px-10">
        Trasso — Creative Agency · Since 2026
      </div>
    </footer>
  );
}
