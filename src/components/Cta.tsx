"use client";

import { useActionState, useState, startTransition, type FormEvent } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions";
import type { Campo, FormularioPublico } from "@/lib/formulario";
import { mascaraTelefone } from "@/lib/telefone";
import { whatsappUrl } from "@/lib/whatsapp";
import Reveal from "./Reveal";
import Traco from "./Traco";
import WhatsAppIcon from "./WhatsAppIcon";

const initialState: ContactState = { status: "idle", message: "" };
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

const labelClass = "mb-2 block text-xs font-semibold tracking-wide text-nevoa/50 uppercase";
const inputClass =
  "w-full rounded-lg border border-white/[0.12] bg-roxo-noite/70 px-4 py-3 text-base text-nevoa placeholder:text-nevoa/30 outline-none transition-colors focus:border-lima aria-invalid:border-rosa";

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
              className="cursor-pointer rounded-full border border-white/15 px-3.5 py-1.5 text-sm font-medium text-nevoa/70 transition-colors select-none hover:border-nevoa/40 hover:text-nevoa has-checked:border-lima has-checked:bg-lima has-checked:text-roxo-noite has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-lima"
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
    <section id="contato" className="relative overflow-hidden border-t border-white/[0.06] bg-roxo-noite py-28 sm:py-36">
      <div
        className="pointer-events-none absolute left-[-10%] top-[20%] h-[520px] w-[520px] rounded-full bg-violeta/15 blur-[140px]"
        aria-hidden="true"
      />

      <div
        className={`relative mx-auto grid max-w-7xl gap-14 px-6 lg:px-10 ${
          formulario ? "lg:grid-cols-[1fr_1.1fr] lg:gap-20" : "max-w-3xl text-center"
        }`}
      >
        <Reveal className={formulario ? "lg:sticky lg:top-32 lg:self-start" : ""}>
          <p className={`rotulo mb-6 ${formulario ? "" : "justify-center"}`}>Contato</p>
          <h2 className="text-4xl leading-[1.02] font-extrabold tracking-[-0.04em] text-balance text-nevoa sm:text-5xl lg:text-6xl">
            Vamos tirar seu projeto do <Traco delay={0.3}><span className="text-lima">papel</span></Traco>?
          </h2>
          <p className={`mt-6 max-w-md text-base leading-relaxed text-nevoa/65 sm:text-lg ${formulario ? "" : "mx-auto"}`}>
            {formulario?.subtitulo ??
              "Conta pra gente o que você quer construir. A gente responde com direção, não com uma mensagem automática."}
          </p>

          <div className={`mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 ${formulario ? "" : "justify-center"}`}>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-lima px-7 py-3.5 text-sm font-bold text-roxo-noite transition-transform duration-300 hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Conversar pelo WhatsApp
              </a>
            )}
            <a
              href="mailto:gestao@trasso.com.br"
              className="text-sm font-semibold text-nevoa/70 underline decoration-white/20 underline-offset-4 hover:text-nevoa hover:decoration-lima"
            >
              gestao@trasso.com.br
            </a>
          </div>
        </Reveal>

        {formulario && (
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-white/[0.08] bg-roxo-medio/40 p-7 sm:p-10">
              {enviado ? (
                <div role="status" className="py-10 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lima text-2xl font-bold text-roxo-noite" aria-hidden="true">
                    ✓
                  </span>
                  <p className="mt-6 text-2xl font-extrabold text-nevoa">{state.message}</p>
                  <button
                    type="button"
                    onClick={() => setEnviado(false)}
                    className="mt-6 border-b border-nevoa/30 text-sm font-semibold text-nevoa/60 hover:border-lima hover:text-nevoa"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
                  <p className="text-sm font-semibold text-nevoa sm:col-span-2">Prefere mandar os detalhes por escrito?</p>
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

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

                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-lima/70 px-8 py-3.5 text-sm font-bold text-lima transition-colors hover:bg-lima hover:text-roxo-noite disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 sm:justify-self-start"
                  >
                    {pending ? "Enviando…" : formulario.botao_texto}
                    <span aria-hidden="true">→</span>
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
