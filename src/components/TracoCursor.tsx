"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#a8f300", "#ff358d", "#7c3aed"];
const MAX_AGE = 650;

/**
 * The pointer literally draws a traço as it moves — the brand's core idea
 * ("cada projeto começa com um traço") made into an interactive signature.
 * Desktop only; respects prefers-reduced-motion.
 */
export default function TracoCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type Point = { x: number; y: number; t: number };
    let points: Point[] = [];

    const onMove = (e: PointerEvent) => {
      points.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (points.length > 80) points.shift();
    };
    window.addEventListener("pointermove", onMove);

    let raf = 0;
    const loop = () => {
      const now = performance.now();
      points = points.filter((p) => now - p.t < MAX_AGE);
      ctx.clearRect(0, 0, width, height);

      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const age = now - p1.t;
        const life = 1 - age / MAX_AGE;
        if (life <= 0) continue;

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = COLORS[i % COLORS.length];
        ctx.globalAlpha = life * 0.55;
        ctx.lineWidth = Math.max(0.6, life * 5.5);
        ctx.lineCap = "round";
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 hidden mix-blend-screen sm:block"
      aria-hidden="true"
    />
  );
}
