import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

const EMPRESAS_DIR = path.join(process.cwd(), "public", "images", "empresas");
const VALID_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg"]);

/** Nosso próprio produto — tem seção própria (CatalogoPlace.tsx), não entra na faixa de clientes. */
const PRODUTO_PROPRIO = "catalogo-place";

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
  if (clients.length === 0) return null;

  return (
    <section id="clientes" className="border-y border-white/[0.06] bg-roxo-noite py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-10">
        <p className="shrink-0 text-sm text-nevoa/45 lg:w-48">Empresas que já colocamos no ar</p>
        <ul className="grid flex-1 grid-cols-3 items-center gap-x-8 gap-y-8 sm:grid-cols-6">
          {clients.map((client) => (
            <li
              key={client.logo}
              className="relative h-12 opacity-70 transition-opacity duration-300 hover:opacity-100 sm:h-14"
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
      </div>
    </section>
  );
}
