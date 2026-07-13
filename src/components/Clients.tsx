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
    }));
}

/** Minimum tiles in one lap so the loop reads as a continuous strip, not a stutter. */
const MIN_MARQUEE_ITEMS = 8;

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
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
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
          <div className="animate-marquee flex w-max items-center gap-5 [animation-duration:38s] hover:[animation-play-state:paused]">
            {track.map((client, i) => (
              <div
                key={`${client.logo}-${i}`}
                className="group flex h-24 w-56 shrink-0 items-center justify-center gap-4 rounded-2xl border border-roxo-noite/10 bg-white px-6"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={80}
                  height={80}
                  className="h-11 w-11 shrink-0 object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                />
                <span className="truncate text-sm font-semibold text-roxo-noite/45 transition-colors duration-300 group-hover:text-roxo-noite/80">
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
