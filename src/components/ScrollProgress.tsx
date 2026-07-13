"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin lima traço at the very top of the viewport, tracking scroll position. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    mass: 0.2,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2.5px] origin-left bg-lima"
      aria-hidden="true"
    />
  );
}
