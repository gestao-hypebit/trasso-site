import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Reveal from "./Reveal";

const EMPRESAS_DIR = path.join(process.cwd(), "public", "images", "empresas");
const VALID_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg"]);

/** Nosso próprio produto — ganha destaque à parte, não entra na faixa de clientes. */
const PRODUTO_PROPRIO = "catalogo-place";

/**
 * Número de prova social do Catálogo Place (ex.: "+120 lojas").
 * Deixe null enquanto não houver um número real — o bloco se adapta.
 */
const CATALOGO_STAT: string | null = null;

/** Known accent/casing fixes for auto-generated names — add entries as needed. */
const NAME_OVERRIDES: Record<string, string> = {
  "mais-saude": "Mais Saúde",
  "viavel": "Viável Planejamento Financeiro",
  "planejamentocomproposito": "Planejamento Com Propósito",
  "mnakahodo": "Maurício Nakahodo",
  "encheobolso": "Enche o Bolso",
  "logofluminous": "Fluminous",
};

/**
 * Every logo is shown in a single light tone so the strip reads as one piece.
 * - "silhueta" (default): transparent artwork flattened to a light silhouette.
 * - "fundo": artwork on a solid white background — inverted and screened so
 *   the background disappears against the dark section.
 * - "cinza": artwork whose details would vanish as a silhouette (e.g. a white
 *   cross inside a shape) — kept in grayscale instead.
 */
type Tratamento = "silhueta" | "fundo" | "cinza";

const LOGO_TRATAMENTO: Record<string, Tratamento> = {
  planejamentocomproposito: "fundo",
  "mais-saude": "cinza",
};

const TRATAMENTO_STYLES: Record<Tratamento, string> = {
  silhueta: "brightness-0 invert",
  fundo: "grayscale invert mix-blend-screen",
  cinza: "grayscale brightness-150 contrast-125",
};

function baseName(filename: string) {
  return filename.replace(/\.[^.]+$/, "").toLowerCase();
}

function nameFromFilename(filename: string) {
  const base = baseName(filename);
  const override = NAME_OVERRIDES[base];
  if (override) return override;

  return base
    .replace(/[-_]+/g, " ")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Reads public/images/empresas/ so new logo files show up automatically. */
function getClientLogos() {
  let files: string[] = [];
  try {
    files = fs.readdirSync(EMPRESAS_DIR);
  } catch {
    return [];
  }

  return files
    .filter((file) => VALID_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .filter((file) => baseName(file) !== PRODUTO_PROPRIO)
    .sort()
    .map((file) => ({
      name: nameFromFilename(file),
      logo: `/images/empresas/${file}`,
      tratamento: LOGO_TRATAMENTO[baseName(file)] ?? "silhueta",
    }));
}

export default function Clients() {
  const clients = getClientLogos();

  return (
    <section
      id="clientes"
      className="relative bg-roxo-noite pt-28 pb-20 sm:pt-32 sm:pb-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {clients.length > 0 && (
          <Reveal className="grid items-center gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
            <p className="text-sm leading-relaxed text-nevoa/50">
              Marcas que já colocamos{" "}
              <span className="font-semibold text-nevoa">no ar</span>
            </p>

            <ul className="grid grid-cols-3 items-center gap-x-8 gap-y-10 sm:grid-cols-6">
              {clients.map((client) => (
                <li
                  key={client.logo}
                  className="relative h-12 opacity-55 transition-opacity duration-300 hover:opacity-100 sm:h-14"
                  title={client.name}
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="140px"
                    className={`object-contain ${TRATAMENTO_STYLES[client.tratamento]}`}
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <a
            href="#catalogo-place"
            className="group mt-16 flex flex-col gap-6 rounded-3xl border border-lima/20 bg-roxo-medio/40 p-6 transition-colors duration-300 hover:border-lima/60 sm:flex-row sm:items-center sm:gap-8 sm:p-8"
          >
            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white">
              <Image
                src="/images/empresas/catalogo-place.png"
                alt="Catálogo Place"
                fill
                sizes="64px"
                className="object-contain p-1.5"
              />
            </span>

            <div className="flex-1">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-lima">
                Software feito pela Trasso
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-nevoa/70 sm:text-lg">
                <span className="font-bold text-nevoa">Catálogo Place</span> —
                nosso próprio SaaS de catálogo digital com pedidos via WhatsApp.
                Projetado, desenvolvido e mantido pelo mesmo time que vai cuidar
                do seu projeto.
              </p>
            </div>

            {CATALOGO_STAT && (
              <p className="shrink-0 text-3xl font-black tracking-tight text-lima sm:text-4xl">
                {CATALOGO_STAT}
              </p>
            )}

            <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-lima">
              Ver o case
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
