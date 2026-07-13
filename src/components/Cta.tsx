"use client";

import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContactMessage, type ContactState } from "@/app/actions";
import { DoodleCircle, DoodleDots } from "./Doodles";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

const initialState: ContactState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-3 rounded-full bg-lima px-10 py-4 text-base font-bold text-roxo-noite shadow-[0_0_0_rgba(168,243,0,0)] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(168,243,0,0.5)] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
    >
      {pending ? "Enviando…" : "Enviar"}
      <span aria-hidden="true">→</span>
    </button>
  );
}

export default function Cta() {
  const [state, formAction] = useActionState(sendContactMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-roxo-noite py-32 sm:py-44"
    >
      <div
        className="aurora animate-float left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 bg-violeta/18"
        aria-hidden="true"
      />
      <DoodleCircle className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 text-nevoa/10" />
      <DoodleDots className="pointer-events-none absolute bottom-10 left-10 h-16 w-16 text-nevoa/15" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="eyebrow mb-8 justify-center text-violeta">
            Vamos conversar
          </p>
          <h2 className="text-5xl leading-[0.95] font-black tracking-tight text-nevoa text-balance sm:text-7xl lg:text-8xl">
            Vamos{" "}
            <span className="relative inline-block whitespace-nowrap text-lima">
              traçar
              <svg
                className="absolute -bottom-1 left-0 w-full sm:-bottom-3"
                viewBox="0 0 300 24"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 14C60 4 140 2 180 10S260 20 296 8"
                  stroke="var(--color-lima)"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            o próximo projeto?
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-nevoa/60 sm:text-lg">
            Conta pra gente o que você quer construir. A gente responde com
            direção — não com um formulário automático.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <form
            ref={formRef}
            action={formAction}
            className="mx-auto mt-16 flex max-w-xl flex-col gap-8 text-left"
          >
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold tracking-wide text-nevoa/40 uppercase"
                >
                  Seu nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Como podemos te chamar?"
                  className="w-full border-b border-white/15 bg-transparent py-3 text-xl font-semibold text-nevoa placeholder:font-normal placeholder:text-nevoa/25 outline-none focus:border-lima"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold tracking-wide text-nevoa/40 uppercase"
                >
                  Seu e-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="voce@empresa.com"
                  className="w-full border-b border-white/15 bg-transparent py-3 text-xl font-semibold text-nevoa placeholder:font-normal placeholder:text-nevoa/25 outline-none focus:border-lima"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-semibold tracking-wide text-nevoa/40 uppercase"
              >
                Sobre o projeto
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={2}
                placeholder="Conta rapidamente o que você tem em mente"
                className="w-full resize-none border-b border-white/15 bg-transparent py-3 text-xl font-semibold text-nevoa placeholder:font-normal placeholder:text-nevoa/25 outline-none focus:border-lima"
              />
            </div>

            {state.status !== "idle" && (
              <p
                aria-live="polite"
                className={`text-sm font-semibold ${
                  state.status === "success" ? "text-lima" : "text-rosa"
                }`}
              >
                {state.message}
              </p>
            )}

            <Magnetic className="mx-auto mt-4">
              <SubmitButton />
            </Magnetic>
          </form>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-14 flex items-center justify-center gap-8 text-sm text-nevoa/60">
            <a
              href="mailto:gestao@trasso.com.br"
              className="border-b border-transparent font-semibold hover:border-lima hover:text-nevoa"
            >
              gestao@trasso.com.br
            </a>
            {/* <a
              href="https://instagram.com/trasso"
              target="_blank"
              rel="noreferrer"
              className="border-b border-transparent hover:border-lima hover:text-nevoa"
            >
              @trasso
            </a> */}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
