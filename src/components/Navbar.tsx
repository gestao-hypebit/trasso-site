"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#clientes", label: "Clientes" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-preto/85 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Logo />

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-nevoa/80 transition-colors hover:text-lima"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contato"
          className="hidden rounded-full bg-lima px-5 py-2.5 text-sm font-semibold text-roxo-noite transition-transform hover:scale-105 md:inline-block"
        >
          Iniciar um projeto
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-nevoa transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-nevoa transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-nevoa transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-preto px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-1 pt-4">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-base font-medium text-nevoa/85 hover:bg-white/5 hover:text-lima"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-lima px-5 py-3 text-center text-sm font-semibold text-roxo-noite"
          >
            Iniciar um projeto
          </a>
        </div>
      )}
    </header>
  );
}
