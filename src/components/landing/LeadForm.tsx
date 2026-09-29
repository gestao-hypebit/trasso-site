"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { trackPixel } from "@/lib/metaPixel";
import { mascaraTelefone } from "@/lib/telefone";
import { WHATSAPP_LANDING_URL } from "./constants";

const initialState: ContactState = { status: "idle", message: "" };
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const UTM_STORAGE = "trasso-landing-utm";
/** Formulário do administrativo (trasso-app → Leads → Formulários) que recebe estes leads. */
const FORMULARIO = "landing-site";

const labelClass = "mb-2 block text-sm font-semibold text-nevoa/85";
const inputClass =
  "w-full rounded-xl border border-white/20 bg-roxo-noite/60 px-4 py-3.5 text-base text-nevoa placeholder:text-nevoa/50 outline-none transition-colors focus:border-lima aria-invalid:border-rosa";

/** UTMs do carregamento da página; guardadas na sessão para sobreviver a um refresh. */
function lerUtms(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const daUrl = Object.fromEntries(UTM_KEYS.map((k) => [k, params.get(k) ?? ""]).filter(([, v]) => v));
  try {
    if (Object.keys(daUrl).length > 0) {
      sessionStorage.setItem(UTM_STORAGE, JSON.stringify(daUrl));
      return daUrl;
    }
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE) ?? "{}");
  } catch {
    return daUrl;
  }
}

function Erro({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-2 text-sm font-semibold text-rosa">
      {msg}
    </p>
  );
}

export default function LeadForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const [erros, setErros] = useState<Record<string, string>>({});
  const utms = useRef<Record<string, string>>({});

  useEffect(() => {
    utms.current = lerUtms();
  }, []);

  // Cada resposta nova do servidor reinicia os erros por campo.
  const [ultimoState, setUltimoState] = useState(state);
  if (state !== ultimoState) {
    setUltimoState(state);
    setErros(state.erros ?? {});
  }

  useEffect(() => {
    if (state.status === "success") trackPixel("Lead");
  }, [state]);

  // Submissão manual: com `action={...}` o React limpa o formulário mesmo
  // quando dá erro, e o visitante perderia o que digitou.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("_formulario", FORMULARIO);
    fd.set("_origem", "landing-site");
    fd.set("_pagina", window.location.pathname);
    for (const [k, v] of Object.entries(utms.current)) fd.set(`_${k}`, v);
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

  const campoProps = (chave: string) => ({
    id: `lead-${chave}`,
    name: chave,
    required: true,
    "aria-invalid": erros[chave] ? true : undefined,
    "aria-describedby": erros[chave] ? `lead-${chave}-erro` : undefined,
    onChange: () => limparErro(chave),
  });

  return (
    <section id="formulario" className="relative scroll-mt-16 overflow-hidden bg-roxo-medio/40 py-20 sm:py-28">
      <div className="aurora top-0 left-1/2 h-[480px] w-[480px] -translate-x-1/2 bg-violeta/20" aria-hidden="true" />

      <div className="relative mx-auto max-w-xl px-5 sm:px-8">
        <h2 className="text-center text-3xl leading-[1.08] font-black tracking-tight text-nevoa text-balance sm:text-5xl">
          Vamos colocar seu negócio <span className="text-lima">no ar</span>?
        </h2>
        <p className="mt-4 text-center text-base text-nevoa/75">
          Deixe seu contato e a gente te chama no WhatsApp com o orçamento.
        </p>

        {state.status === "success" ? (
          <div
            role="status"
            className="mt-10 rounded-3xl border border-lima/30 bg-roxo-noite/70 px-6 py-10 text-center"
          >
            <p className="text-4xl text-lima" aria-hidden="true">
              ✓
            </p>
            <p className="mt-3 text-2xl font-black text-nevoa">{state.message}</p>
            <p className="mt-2 text-base text-nevoa/75">Quer adiantar? Chama a gente agora mesmo.</p>
            <a
              href={WHATSAPP_LANDING_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-lima px-7 py-3.5 text-base font-bold text-roxo-noite"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Continuar no WhatsApp
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-5 rounded-3xl border border-white/10 bg-roxo-noite/70 p-6 sm:p-8"
          >
            {/* Honeypot: pessoas não veem este campo, bots costumam preencher. */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div>
              <label htmlFor="lead-nome" className={labelClass}>
                Nome
              </label>
              <input {...campoProps("nome")} type="text" autoComplete="name" placeholder="Como podemos te chamar?" className={inputClass} />
              <Erro id="lead-nome-erro" msg={erros.nome} />
            </div>

            <div>
              <label htmlFor="lead-telefone" className={labelClass}>
                WhatsApp
              </label>
              <input
                {...campoProps("telefone")}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="(16) 91234-5678"
                minLength={14}
                title="Informe o número com DDD"
                onInput={(e) => {
                  e.currentTarget.value = mascaraTelefone(e.currentTarget.value);
                }}
                className={inputClass}
              />
              <Erro id="lead-telefone-erro" msg={erros.telefone} />
            </div>

            <div>
              <label htmlFor="lead-tipo_negocio" className={labelClass}>
                Tipo de negócio
              </label>
              <input
                {...campoProps("tipo_negocio")}
                type="text"
                placeholder="Ex.: clínica, restaurante, loja…"
                className={inputClass}
              />
              <Erro id="lead-tipo_negocio-erro" msg={erros.tipo_negocio} />
            </div>

            {state.status === "error" && (
              <p aria-live="polite" className="text-sm font-semibold text-rosa">
                {state.message}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-lima px-7 py-3.5 text-base font-bold text-roxo-noite transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(168,243,0,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Enviando…" : "Quero meu site"}
              {!pending && <span aria-hidden="true">→</span>}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
