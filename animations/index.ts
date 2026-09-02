import { Variants } from "framer-motion";

/**
 * Shared easing curve used across the whole site to keep motion consistent.
 */
export const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Default viewport settings for scroll-reveal animations.
 * Animate once, when 30% of the element is visible.
 */
export const viewportOnce = {
  once: true,
  amount: 0.3,
};

/** Fade up + in. The workhorse reveal animation for most sections. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

/** Parent wrapper that staggers its children's reveal animations. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/** Scale in from slightly smaller, used for cards / images / badges. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

/** Slide in from the right. */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

/** Slide in from the left. */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

/** Word/char level stagger reveal for big editorial headings. */
export const staggerText: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const staggerTextWord: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEase },
  },
};

/** Hover lift for cards / buttons. Spread this into whileHover. */
export const hoverLift = {
  y: -8,
  transition: { duration: 0.4, ease: smoothEase },
};

/** Button hover - subtle lift, used with whileHover. */
export const buttonHover = {
  y: -3,
  transition: { duration: 0.3, ease: smoothEase },
};

/** Image zoom on hover - pair with overflow-hidden wrapper. */
export const imageHoverZoom = {
  scale: 1.08,
  transition: { duration: 0.6, ease: smoothEase },
};

/** Sidebar slide in from the right (off-canvas menu). */
export const sidebarSlide: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.6, ease: smoothEase },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.5, ease: smoothEase },
  },
};

/** Overlay backdrop fade, pairs with sidebarSlide. */
export const overlayFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: smoothEase } },
  exit: { opacity: 0, transition: { duration: 0.4, ease: smoothEase } },
};

/** Simple page-level fade, used by the PageTransition wrapper. */
export const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.15, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.08, ease: "easeIn" },
  },
};

/** Parallax helper - pass a MotionValue<number> from useScroll into y. */
export const parallaxTransition = { type: "tween", ease: "linear", duration: 0 };
