"use client";

import { ReactNode, useRef } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // On the very first render (initial page load / SSR), skip the opacity:0
  // starting state so content is visible immediately, even before JS
  // hydrates. This was causing a white/blank screen on slower mobile
  // connections where hydration lags behind first paint.
  // On later client-side route changes, JS is already running, so the
  // fade-in transition applies normally.
  const initial = isFirstRender.current ? false : { opacity: 0 };
  isFirstRender.current = false;

  return (
    <motion.div
      key={pathname}
      initial={initial}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

