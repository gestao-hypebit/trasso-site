import { DoodleScribble } from "./Doodles";
import Reveal from "./Reveal";

export default function Slogan() {
  return (
    <section className="relative overflow-hidden bg-lavanda py-24 sm:py-32">
      <DoodleScribble className="pointer-events-none absolute left-1/2 top-10 h-8 w-40 -translate-x-1/2 text-violeta/25" />

      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="eyebrow mb-8 justify-center text-rosa">Nosso lema</p>
          <p className="text-3xl leading-[1.15] font-black tracking-tight text-roxo-noite text-balance sm:text-5xl lg:text-6xl">
            <span className="text-violeta">Criatividade</span> e{" "}
            <span className="text-rosa">tecnologia</span> no mesmo{" "}
            <span className="relative inline-block whitespace-nowrap text-rosa">
              traço.
              <svg
                className="hero-underline absolute -bottom-1 left-0 w-full sm:-bottom-2"
                viewBox="0 0 300 24"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 14C60 4 140 2 180 10S260 20 296 8"
                  stroke="var(--color-rosa)"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
