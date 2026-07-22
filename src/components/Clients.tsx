import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Reveal from "./Reveal";

const EMPRESAS_DIR = path.join(process.cwd(), "public", "images", "empresas");
const VALID_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg"]);

/** Known accent/casing fixes for auto-generated names — add entries as needed. */
const NAME_OVERRIDES: Record<string, string> = {
  "mais-saude": "Mais Saúde",
  "catalogo-place": "Catálogo Place",
  "viavel": "Viável Planejamento Financeiro",
  "planejamentocomproposito": "Planejamento Com Propósito",
  "mnakahodo": "Mnakahodo",
  "encheobolso": "Enche o Bolso",
  "logofluminous": "Fluminous",
};

/**
 * Logos are all sorts of colors — some near-white/beige, some full color.
 * A single card background can't show every logo cleanly, so each logo is
 * assigned the card surface ("light" or "dark") it contrasts best against.
 * Defaults to "light"; add an entry here whenever a new logo disappears on
 * the white card (typically white/near-white or very light artwork).
 */
const LOGO_SURFACE: Record<string, "light" | "dark"> = {
  mnakahodo: "dark",
  logofluminous: "dark",
  encheobolso: "dark",
};

function nameFromFilename(filename: string) {
  const base = filename.replace(/\.[^.]+$/, "");
  const override = NAME_OVERRIDES[base.toLowerCase()];
  if (override) return override;

  return base
    .replace(/[-_]+/g, " ")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function surfaceFromFilename(filename: string): "light" | "dark" {
  const base = filename.replace(/\.[^.]+$/, "").toLowerCase();
  return LOGO_SURFACE[base] ?? "light";
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
    .sort()
    .map((file) => ({
      name: nameFromFilename(file),
      logo: `/images/empresas/${file}`,
      surface: surfaceFromFilename(file),
    }));
}

/** Minimum tiles in one lap so the loop reads as a continuous strip, not a stutter. */
const MIN_MARQUEE_ITEMS = 8;

const SURFACE_STYLES = {
  light:
    "border-roxo-noite/10 bg-white shadow-[0_1px_0_rgba(26,5,51,0.03)] group-hover:border-lima/60",
  dark: "border-white/10 bg-roxo-noite group-hover:border-lima/60",
} as const;

const TEXT_STYLES = {
  light: "text-roxo-noite/50 group-hover:text-roxo-noite",
  dark: "text-nevoa/50 group-hover:text-nevoa",
} as const;

export default function Clients() {
  const clients = getClientLogos();

  if (clients.length === 0) return null;

  const lap: typeof clients = [];
  while (lap.length < MIN_MARQUEE_ITEMS) {
    lap.push(...clients);
  }
  const track = [...lap, ...lap];

  return (
    <section id="clientes" className="relative overflow-hidden bg-lavanda py-28 sm:py-40">
      <div
        className="aurora animate-float -left-40 top-10 h-[380px] w-[380px] bg-rosa/15"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-16 max-w-2xl">
          <p className="eyebrow mb-5 text-violeta">Nossos clientes</p>
          <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-roxo-noite text-balance sm:text-5xl lg:text-6xl">
            Marcas que confiam no nosso <span className="text-rosa">traço</span>.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-roxo-noite/55">
            Trabalhamos lado a lado com negócios de diferentes tamanhos e
            segmentos — de startups a operações já estabelecidas.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee flex w-max items-center gap-6 [animation-duration:42s] hover:[animation-play-state:paused]">
            {track.map((client, i) => (
              <div
                key={`${client.logo}-${i}`}
                className={`group flex h-28 w-64 shrink-0 flex-col items-center justify-center gap-3 rounded-3xl border px-6 transition-colors duration-300 ${SURFACE_STYLES[client.surface]}`}
              >
                <div className="relative h-12 w-full">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="160px"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span
                  className={`truncate text-xs font-semibold tracking-wide transition-colors duration-300 ${TEXT_STYLES[client.surface]}`}
                >
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
