const WORDS = [
  "Criatividade",
  "Tecnologia",
  "Estratégia",
  "Direção",
  "Movimento",
  "Autenticidade",
];

export default function Marquee() {
  const items = [...WORDS, ...WORDS];

  return (
    <div className="relative z-10 -my-8 rotate-[-2deg] overflow-hidden bg-lima py-4 shadow-[0_0_60px_rgba(168,243,0,0.25)] sm:-my-9 sm:py-5">
      <div className="animate-marquee flex w-max items-center gap-10">
        {[...items, ...items].map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex items-center gap-10 text-xl font-black uppercase tracking-tight text-roxo-noite sm:text-2xl"
          >
            {word}
            <span className="text-2xl text-roxo-noite/40" aria-hidden="true">
              ✳
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
