type DoodleProps = {
  className?: string;
};

/** Hand-drawn scribble motifs pulled from the brand's graphic-element sheet. */

export function DoodleCircle({ className = "" }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M40 8c18 0 30 12 31 28 1 17-12 32-31 32S8 55 9 38C10 21 22 8 40 8Z"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

export function DoodleArrow({ className = "" }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 90 60"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 52 C30 20, 55 8, 84 6"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M64 4 L85 6 L80 26"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleX({ className = "" }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6 L44 44 M45 7 L7 45"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleDots({ className = "" }: DoodleProps) {
  const dots = Array.from({ length: 9 });
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      {dots.map((_, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return <circle key={i} cx={10 + col * 20} cy={10 + row * 20} r="2.4" />;
      })}
    </svg>
  );
}

export function DoodleScribble({ className = "" }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 100 40"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 20 C 14 4, 22 36, 34 20 S 54 4, 66 20 S 86 36, 98 18"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A loose spiral coil — echoes the "cccc" mark on the brand's element sheet. */
export function DoodleSpiral({ className = "" }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 30c0-8 6-14 14-14s12 6 12 12-5 10-10 10-8-4-8-8 3-6 6-6"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A single confident marker stroke — the literal "traço". */
export function DoodleStroke({ className = "" }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 140 20"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 14C36 4 92 2 136 10"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A quick asterisk / impact mark. */
export function DoodleStar({ className = "" }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 3v34M6 11l28 18M34 11L6 29"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Two parallel underline strokes, like a hand-drawn emphasis mark. */
export function DoodleUnderline({ className = "" }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 120 26"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 8C40 2 84 2 116 7"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M8 20C42 16 80 16 112 19"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

/** A tight zigzag scribble. */
export function DoodleZigzag({ className = "" }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 100 26"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 22 20 4 38 22 56 4 74 22 92 4"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
