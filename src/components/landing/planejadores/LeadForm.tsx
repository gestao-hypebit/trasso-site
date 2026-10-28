"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { sendContactMessage, type ContactState } from "@/app/actions";
import { mascaraTelefone } from "@/lib/telefone";
import { FORMULARIO, LEAD_PENDENTE, PERGUNTAS_QUALIFICACAO, qualificar, type Pergunta } from "./constants";

// Mesmo envio da landing /site (server action → administrativo), com as
// perguntas de qualificação e redirecionamento para /planejadores/obrigado.

const initialState: ContactState = { status: "idle", message: "" };
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "fbclid"];
const UTM_STORAGE = "slick-planejadores-utm";

const labelClass = "mb-2 block text-sm font-semibold text-nevoa/85";
const inputClass =
  "w-full rounded-xl border border-white/20 bg-roxo-noite/60 px-4 py-3.5 text-base text-nevoa placeholder:text-nevoa/50 outline-none transition-colors focus:border-lima aria-invalid:border-rosa";

/** UTMs e fbclid do carregamento da página; guardados na sessão para sobreviver a um refresh. */
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

/** Escolha única em botões: radios nativos (validação `required` e teclado de graça). */
function Opcoes({ pergunta, erro, onChange }: { pergunta: Pergunta; erro?: string; onChange: () => void }) {
  return (
    <fieldset aria-describedby={erro ? `lead-${pergunta.chave}-erro` : undefined}>
      <legend className={`${labelClass} text-balance`}>{pergunta.rotulo}</legend>
      {/* Chips de um toque: rápido de responder no celular. */}
      <div className="flex flex-wrap gap-2">
        {pergunta.opcoes.map((opcao) => (
          <label
            key={opcao.valor}
            className={`inline-flex min-h-11 cursor-pointer items-center rounded-full border bg-roxo-noite/60 px-4 py-2 text-sm font-semibold text-nevoa transition-colors has-checked:border-lima has-checked:bg-lima has-checked:text-roxo-noite has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-lima ${
              erro ? "border-rosa" : "border-white/20 hover:border-white/40"
            }`}
          >
            <input
              type="radio"
              name={pergunta.chave}
              value={opcao.valor}
              required
              onChange={onChange}
              className="sr-only"
            />
            {opcao.valor}
          </label>
        ))}
      </div>
      <Erro id={`lead-${pergunta.chave}-erro`} msg={erro} />
    </fieldset>
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

  // Navegação completa: a página de obrigado carrega o Pixel do zero e dispara
  // PageView + Lead (sem risco de o evento se perder na troca de página).
  useEffect(() => {
    if (state.status !== "success") return;
    try {
      sessionStorage.setItem(LEAD_PENDENTE, "1");
    } catch {}
    window.location.assign("/planejadores/obrigado");
  }, [state]);

  // Submissão manual: com `action={...}` o React limpa o formulário mesmo
  // quando dá erro, e o visitante perderia o que digitou.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const respostas = Object.fromEntries(PERGUNTAS_QUALIFICACAO.map((p) => [p.chave, String(fd.get(p.chave) ?? "")]));
    const { pontuacao, classificacao } = qualificar(respostas);
    fd.set("pontuacao", String(pontuacao));
    fd.set("classificacao", classificacao);
    fd.set("_formulario", FORMULARIO);
    fd.set("_origem", "landing-planejadores");
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

  const enviado = state.status === "success";

  return (
    <section id="formulario" className="relative scroll-mt-16 overflow-hidden bg-roxo-medio/40 py-20 sm:py-28">
      <div className="aurora top-0 left-1/2 h-[480px] w-[480px] -translate-x-1/2 bg-violeta/20" aria-hidden="true" />

      <div className="relative mx-auto max-w-xl px-5 sm:px-8">
        <h2 className="text-center text-3xl leading-[1.08] font-black tracking-tight text-nevoa text-balance sm:text-5xl">
          Vamos colocar seu site <span className="text-lima">no ar</span>?
        </h2>
        <p className="mt-4 text-center text-base text-nevoa/75">
          São 5 respostas rápidas, quase tudo com um toque. A gente te chama no WhatsApp.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-6 rounded-3xl border border-white/10 bg-roxo-noite/70 p-5 sm:p-8"
        >
          {/* Honeypot: pessoas não veem este campo, bots costumam preencher. */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor="lead-nome" className={labelClass}>
              Nome
            </label>
            <input {...campoProps("nome")} type="text" autoComplete="name" placeholder="Seu nome" className={inputClass} />
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
          </div>

          {PERGUNTAS_QUALIFICACAO.map((p) => (
            <Opcoes key={p.chave} pergunta={p} erro={erros[p.chave]} onChange={() => limparErro(p.chave)} />
          ))}

          {state.status === "error" && (
            <p aria-live="polite" className="text-sm font-semibold text-rosa">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={pending || enviado}
            className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-lima px-7 py-3.5 text-base font-bold text-roxo-noite transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(168,243,0,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending || enviado ? "Enviando…" : "Quero meu site"}
            {!pending && !enviado && <span aria-hidden="true">→</span>}
          </button>

          <p className="-mt-2 text-center text-xs leading-relaxed text-nevoa/55">
            Seus dados são usados só para entrarmos em contato.{" "}
            <Link href="/privacidade" target="_blank" className="underline underline-offset-2 hover:text-lima">
              Política de privacidade
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
