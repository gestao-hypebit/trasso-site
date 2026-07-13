"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

/** Wraps a control so it drifts gently toward the cursor on hover. */
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }

  function onPointerLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
