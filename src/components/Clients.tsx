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

export default function Clients() {
  const clients = getClientLogos();

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

        {clients.length > 0 && (
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-6">
              {clients.map((client) => (
                <div
                  key={client.logo}
                  className="group flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-2xl border border-roxo-noite/10 bg-nevoa p-5 transition-colors duration-300 hover:bg-white"
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={80}
                    height={80}
                    className="h-14 w-14 object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                  />
                  <span className="text-center text-[11px] font-semibold text-roxo-noite/40 transition-colors duration-300 group-hover:text-roxo-noite/70">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
