"use client";

import { useActionState, useState, startTransition, type FormEvent } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions";
import type { Campo, FormularioPublico } from "@/lib/formulario";
import { mascaraTelefone } from "@/lib/telefone";
import { whatsappUrl } from "@/lib/whatsapp";
import { DoodleCircle, DoodleDots } from "./Doodles";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

const initialState: ContactState = { status: "idle", message: "" };
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

const labelClass = "mb-2 block text-xs font-semibold tracking-wide text-nevoa/40 uppercase";
const inputClass =
  "w-full border-b border-white/15 bg-transparent py-3 text-xl font-semibold text-nevoa placeholder:font-normal placeholder:text-nevoa/25 outline-none transition-colors focus:border-lima aria-invalid:border-rosa";

function CampoInput({ campo, erro, onChange }: { campo: Campo; erro?: string; onChange: () => void }) {
  const id = `campo-${campo.chave}`;
  const common = {
    id,
    name: campo.chave,
    required: campo.obrigatorio,
    "aria-invalid": erro ? true : undefined,
    "aria-describedby": erro ? `${id}-erro` : undefined,
    onChange,
  };

  const rotulo = (
    <>
      {campo.rotulo}
      {!campo.obrigatorio && <span className="ml-1.5 normal-case tracking-normal text-nevoa/25">(opcional)</span>}
    </>
  );

  let controle;
  if (campo.tipo === "opcoes" || campo.tipo === "multiplas") {
    const multipla = campo.tipo === "multiplas";
    return (
      <fieldset aria-describedby={erro ? `${id}-erro` : undefined}>
        <legend className={labelClass}>
          {rotulo}
          {multipla && <span className="ml-1.5 normal-case tracking-normal text-nevoa/25">— pode marcar mais de um</span>}
        </legend>
        <div className="mt-1 flex flex-wrap gap-2">
          {(campo.opcoes ?? []).map((opcao) => (
            <label
              key={opcao}
              className="cursor-pointer rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-nevoa/70 transition-colors select-none hover:border-nevoa/40 hover:text-nevoa has-checked:border-lima has-checked:bg-lima has-checked:text-roxo-noite has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-lima"
            >
              <input
                type={multipla ? "checkbox" : "radio"}
                name={campo.chave}
                value={opcao}
                required={!multipla && campo.obrigatorio}
                onChange={onChange}
                className="sr-only"
              />
              {opcao}
            </label>
          ))}
        </div>
        {erro && <p id={`${id}-erro`} className="mt-2 text-sm font-semibold text-rosa">{erro}</p>}
      </fieldset>
    );
  } else if (campo.tipo === "textarea") {
    controle = (
      <textarea
        {...common}
        rows={3}
        placeholder={campo.placeholder}
        className={`${inputClass} resize-none`}
      />
    );
  } else if (campo.tipo === "select") {
    controle = (
      <select {...common} defaultValue="" className={`${inputClass} cursor-pointer appearance-none [&:has(option[value='']:checked)]:text-nevoa/25`}>
        <option value="" disabled>{campo.placeholder || "Selecione"}</option>
        {(campo.opcoes ?? []).map((opcao) => (
          <option key={opcao} value={opcao} className="bg-roxo-noite text-nevoa">{opcao}</option>
        ))}
      </select>
    );
  } else {
    const tipo = campo.tipo === "email" ? "email" : campo.tipo === "telefone" ? "tel" : "text";
    controle = (
      <input
        {...common}
        type={tipo}
        placeholder={campo.placeholder}
        autoComplete={campo.chave === "nome" ? "name" : tipo === "email" ? "email" : tipo === "tel" ? "tel" : undefined}
        inputMode={tipo === "tel" ? "tel" : undefined}
        onInput={
          tipo === "tel"
            ? (e) => {
                e.currentTarget.value = mascaraTelefone(e.currentTarget.value);
              }
            : undefined
        }
        className={inputClass}
      />
    );
  }

  return (
    <div>
      <label htmlFor={id} className={labelClass}>{rotulo}</label>
      {controle}
      {erro && <p id={`${id}-erro`} className="mt-2 text-sm font-semibold text-rosa">{erro}</p>}
    </div>
  );
}

export default function Cta({ formulario }: { formulario: FormularioPublico | null }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);

  // Cada resposta nova do servidor reinicia os erros por campo.
  const [ultimoState, setUltimoState] = useState(state);
  if (state !== ultimoState) {
    setUltimoState(state);
    setErros(state.erros ?? {});
    if (state.status === "success") setEnviado(true);
  }

  // Submissão manual: com `action={...}` o React limpa o formulário mesmo
  // quando dá erro, e o visitante perderia tudo o que digitou.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("_pagina", window.location.pathname);
    const params = new URLSearchParams(window.location.search);
    UTM_KEYS.forEach((k) => params.get(k) && fd.set(`_${k}`, params.get(k)!));
    startTransition(() => formAction(fd));
  }

  function limparErro(chave: string) {
    if (!erros[chave]) return;
    setErros((atual) => {
      const resto = { ...atual };
      delete resto[chave];
      return resto;
    });
  }

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
            {formulario?.subtitulo ??
              "Conta pra gente o que você quer construir. A gente responde com direção — não com um formulário automático."}
          </p>
        </Reveal>

        {formulario && (
          <Reveal delay={0.2}>
            {enviado ? (
              <div
                role="status"
                className="mx-auto mt-16 max-w-xl rounded-3xl border border-lima/30 bg-lima/5 px-8 py-12"
              >
                <p className="text-5xl" aria-hidden="true">✓</p>
                <p className="mt-4 text-2xl font-black text-nevoa">{state.message}</p>
                <button
                  type="button"
                  onClick={() => setEnviado(false)}
                  className="mt-6 border-b border-nevoa/30 text-sm font-semibold text-nevoa/60 hover:border-lima hover:text-nevoa"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-16 grid max-w-xl gap-x-8 gap-y-10 text-left sm:grid-cols-2"
              >
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {formulario.campos.map((campo) => (
                  <div key={campo.id} className={campo.largura === "metade" ? "" : "sm:col-span-2"}>
                    <CampoInput campo={campo} erro={erros[campo.chave]} onChange={() => limparErro(campo.chave)} />
                  </div>
                ))}

                {state.status === "error" && (
                  <p aria-live="polite" className="text-sm font-semibold text-rosa sm:col-span-2">
                    {state.message}
                  </p>
                )}

                <Magnetic className="mx-auto mt-2 sm:col-span-2">
                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex items-center gap-3 rounded-full bg-lima px-10 py-4 text-base font-bold text-roxo-noite shadow-[0_0_0_rgba(168,243,0,0)] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(168,243,0,0.5)] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
                  >
                    {pending ? "Enviando…" : formulario.botao_texto}
                    <span aria-hidden="true">→</span>
                  </button>
                </Magnetic>
              </form>
            )}
          </Reveal>
        )}

        <Reveal delay={0.3}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-nevoa/60">
            {formulario && <span className="text-nevoa/40">Prefere falar direto?</span>}
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="border-b border-transparent font-semibold hover:border-lima hover:text-nevoa"
              >
                WhatsApp
              </a>
            )}
            <a
              href="mailto:gestao@trasso.com.br"
              className="border-b border-transparent font-semibold hover:border-lima hover:text-nevoa"
            >
              gestao@trasso.com.br
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
