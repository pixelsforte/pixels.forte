"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  animate,
  AnimationPlaybackControls,
} from "framer-motion";

interface CardItem {
  id: number;
  title: string;
  img: string;
  type: "image" | "video";
}

function LazyVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
      video.addEventListener("loadeddata", playVideo, { once: true });
      playVideo();
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className={className}
    />
  );
}

// Cards strictly mapped to matching assets in /public/videos/ and /public/images/
// All 4 video cards (card5, card11, card12, card13) use their exact MP4 video files
const BASE_CARDS: Omit<CardItem, "id">[] = [
  { title: "Interactive Design", img: "/images/idotive-service-image-two.webp", type: "image" },
  { title: "Creative Vision", img: "/videos/card5-1-1.mp4", type: "video" },
  { title: "Digital Experiences", img: "/images/card6.webp", type: "image" },
  { title: "Campaign Concepts", img: "/images/card7.webp", type: "image" },
  { title: "Experience-led Design", img: "/images/card8.webp", type: "image" },
  { title: "Brand Identity", img: "/images/card10.webp", type: "image" },
  { title: "Dynamic Media", img: "/videos/card11-1-1.mp4", type: "video" },
  { title: "Product Design", img: "/videos/card12-1-1.mp4", type: "video" },
  { title: "Digital Craft", img: "/videos/card13-1-1.mp4", type: "video" },
  { title: "Creative Direction", img: "/images/card14.webp", type: "image" },
];

const CARDS_DATA: CardItem[] = [
  ...BASE_CARDS.map((card, idx) => ({ ...card, id: idx + 1 })),
  ...BASE_CARDS.map((card, idx) => ({ ...card, id: idx + 1 + BASE_CARDS.length })),
];

const AVATARS = [
  { src: "/images/idotive-home-athour-1.webp" },
  { src: "/images/idotive-home-athour-2.webp" },
  { src: "/images/idotive-home-athour-3.webp" },
];

const PILLS = ["Strategy", "Storytelling", "Digital thinking"];

const PROJECT_IMAGES = [
  "/images/idotive-service-image-two.webp",
  "/images/img_6.webp",
  "/images/img_12.webp",
];

interface CounterProps {
  value: number;
}

function Counter({ value }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let animated = false;
    let controls: AnimationPlaybackControls | null = null;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.35 && !animated) {
        animated = true;
        controls = animate(0, value, {
          duration: 1.4,
          ease: "easeOut",
          onUpdate(latestValue) {
            node.textContent = String(Math.floor(latestValue));
          },
        });
      } else if (latest < 0.1 && animated) {
        animated = false;
        if (controls) {
          controls.stop();
        }
        node.textContent = "0";
      }
    });

    return () => {
      unsubscribe();
      if (controls) {
        controls.stop();
      }
    };
  }, [scrollYProgress, value]);

  return (
    <span className="inline-block tabular-nums" ref={ref}>
      0
    </span>
  );
}

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const arcContainerRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const currentRotationRef = useRef<number>(0);
  const targetRotationRef = useRef<number>(0);
  const autoRotationRef = useRef<number>(0);

  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartRotRef = useRef<number>(0);

  const [screenWidth, setScreenWidth] = useState(1200);

  // Scaled radius for wide 180-degree arch across screen sizes matching reference image
  const getRadius = useCallback(() => {
    if (typeof window === "undefined") return 1220;
    const w = window.innerWidth;
    if (w >= 1920) return 1500;
    if (w >= 1440) return 1350;
    if (w >= 1200) return 1220;
    if (w >= 1024) return 1050;
    return 880;
  }, []);

  const getCardWidth = useCallback(() => {
    if (typeof window === "undefined") return 300;
    const w = window.innerWidth;
    if (w >= 1920) return 350;
    if (w >= 1440) return 325;
    if (w >= 1200) return 300;
    if (w >= 1024) return 270;
    return 240;
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(window.innerWidth);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // GSAP split-character reveal on mount
  useEffect(() => {
    if (!headlineRef.current) return;
    const chars = headlineRef.current.querySelectorAll<HTMLElement>("[data-char]");

    gsap.fromTo(
      chars,
      { yPercent: 40, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.015,
      }
    );

    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, []);

  // 180-degree arch continuous rotation loop with mathematically locked non-overlapping card spacing
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const handleScroll = () => {
      if (!isDraggingRef.current) {
        targetRotationRef.current = window.scrollY * 0.05 + autoRotationRef.current;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const loop = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (!isDraggingRef.current) {
        // Continuous smooth rotation (~3.5 deg/sec)
        autoRotationRef.current += 3.5 * delta;
        targetRotationRef.current = window.scrollY * 0.05 + autoRotationRef.current;
      }

      // Smooth inertia interpolation
      currentRotationRef.current += (targetRotationRef.current - currentRotationRef.current) * 0.08;

      const rot = currentRotationRef.current;
      const radius = getRadius();
      const cardW = getCardWidth();
      
      // Dynamic angle step: maintains a clear, comfortable gap between cards so they never touch
      const gapPx = 90;
      const angleStep = 2 * Math.asin(Math.min(1, (cardW + gapPx) / (2 * radius))) * (180 / Math.PI);
      const totalCycleAngle = angleStep * CARDS_DATA.length;

      cardRefs.current.forEach((el, index) => {
        if (!el) return;
        
        // Calculate angle and normalize to [-totalCycleAngle/2, totalCycleAngle/2]
        let angleDeg = ((rot + index * angleStep) % totalCycleAngle + totalCycleAngle) % totalCycleAngle;
        if (angleDeg > totalCycleAngle / 2) angleDeg -= totalCycleAngle;

        // Visible across the 180-degree upper dome arc (-85 deg to +85 deg)
        const absAngle = Math.abs(angleDeg);
        
        if (absAngle > 90) {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
          return;
        }

        const angleRad = (angleDeg * Math.PI) / 180;

        // Position relative to top center apex of the arch:
        const x = Math.sin(angleRad) * radius;
        const y = (1 - Math.cos(angleRad)) * radius;

        // Smooth edge fade for cards entering/exiting the visible 180° arc
        let opacity = 1;
        if (absAngle > 70) {
          opacity = Math.max(0, (90 - absAngle) / 20);
        }

        el.style.opacity = opacity.toFixed(3);
        el.style.pointerEvents = opacity > 0.3 ? "auto" : "none";
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0px) rotate(${angleDeg.toFixed(2)}deg)`;
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [getRadius, getCardWidth]);

  // Pointer drag controls for smooth interactive wheel spinning
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartRotRef.current = targetRotationRef.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    targetRotationRef.current = dragStartRotRef.current + deltaX * 0.12;
    autoRotationRef.current = targetRotationRef.current - window.scrollY * 0.05;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Scroll tracking for About text opacity reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: bottomScrollY } = useScroll({
    target: bottomRowRef,
    offset: ["start end", "end center"],
  });

  const springConfig = { damping: 25, stiffness: 90 };
  const smoothBottomProgress = useSpring(bottomScrollY, springConfig);

  const textOpacity1 = useTransform(scrollYProgress, [0.15, 0.28], ["#d4d4d8", "#171717"]);
  const textOpacity2 = useTransform(scrollYProgress, [0.28, 0.42], ["#d4d4d8", "#171717"]);
  const textOpacity3 = useTransform(scrollYProgress, [0.42, 0.55], ["#d4d4d8", "#171717"]);

  // Dynamic responsive image placement for lower row
  const cardSpread = useTransform(smoothBottomProgress, [0.1, 0.75], [0, 1]);
  const cardOffset =
    screenWidth < 400 ? 55 :
    screenWidth < 640 ? 70 :
    screenWidth < 1024 ? 95 : 125;
  const initialY = screenWidth < 640 ? 60 : 120;

  const card1X = useTransform(cardSpread, (v) => v * -cardOffset);
  const card1Y = useTransform(smoothBottomProgress, [0.1, 0.75], [initialY, 0]);
  const card2Y = useTransform(smoothBottomProgress, [0.1, 0.75], [initialY, 0]);
  const card3X = useTransform(cardSpread, (v) => v * cardOffset);
  const card3Y = useTransform(smoothBottomProgress, [0.1, 0.75], [initialY, 0]);

  const renderWord = (word: string, baseDelay: number) =>
    word.split("").map((ch, i) => (
      <span
        key={`${word}-${i}`}
        className="inline-block overflow-visible align-baseline pb-1.5 sm:pb-2.5"
      >
        <span
          data-char
          className="inline-block will-change-transform"
          style={{ animationDelay: `${baseDelay + i * 0.02}s` }}
        >
          {ch}
        </span>
      </span>
    ));

  const renderLine = (line: string) => {
    const words = line.split(" ");
    return (
      <span className="flex flex-wrap items-baseline justify-center gap-x-[0.22em] overflow-visible">
        {words.map((w, i) => (
          <span key={i} className="inline-flex overflow-visible">
            {renderWord(w, i * 0.03)}
          </span>
        ))}
      </span>
    );
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-full overflow-hidden bg-[#faf8f3] select-none pt-10 sm:pt-14 pb-16 sm:pb-24 z-10 cursor-grab active:cursor-grabbing"
    >
      {/* ========================================================================= */}
      {/* 1. HEADLINE & LAUNCH BUTTON (APPEARS FIRST)                              */}
      {/* ========================================================================= */}
      <div className="relative z-30 mx-auto max-w-[1400px] px-6 text-center pointer-events-auto">
        <div ref={headlineRef} className="w-full flex flex-col items-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[100px] xl:text-[120px] font-semibold tracking-tight xl:tracking-[-3.76px] text-black font-display leading-[1.12] sm:leading-[1.15] xl:leading-[129.6px] pt-1 pb-3 sm:pb-4 overflow-visible">
            <span className="block overflow-visible pb-1 sm:pb-2">{renderLine("Branding through")}</span>
            <span className="block overflow-visible pt-0.5 pb-1 sm:pb-2">{renderLine("brilliant design")}</span>
          </h1>

          {/* "Launch your brand" button placed below headline with clean space */}
          <a
            ref={buttonRef}
            href="#contact"
            className="group relative inline-flex h-[42px] sm:h-[46px] items-center justify-center overflow-hidden rounded-none bg-black px-7 sm:px-9 text-[11px] sm:text-[12px] font-bold uppercase tracking-widest text-white transition-colors duration-300 mt-6 sm:mt-8 shadow-md cursor-pointer"
          >
            <span className="absolute inset-0 h-full w-full translate-y-full bg-[#f26b2c] transition-transform duration-300 ease-out group-hover:translate-y-0" />
            <span className="relative z-10 block h-4 overflow-hidden">
              <span className="block transform transition-transform duration-300 ease-out group-hover:-translate-y-full">
                Launch your brand
              </span>
              <span className="absolute left-0 top-0 block translate-y-full transform transition-transform duration-300 ease-out group-hover:translate-y-0">
                Launch your brand
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2A. DESKTOP/TABLET: 180° WIDE CURVED DOME ARCH CARDS (NON-OVERLAPPING)    */}
      {/* ========================================================================= */}
      <div
        ref={arcContainerRef}
        className="hidden md:flex relative w-full overflow-visible mt-18 sm:mt-24 lg:mt-28 h-[350px] lg:h-[410px] xl:h-[460px] justify-center items-start z-10 pointer-events-none"
        aria-hidden="true"
      >
        {/* Arch apex reference point: moved down slightly below the launch button */}
        <div className="relative w-0 h-0 overflow-visible top-28 sm:top-32 lg:top-36 xl:top-40">
          {CARDS_DATA.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="absolute left-0 top-0 w-0 h-0 flex items-center justify-center will-change-transform pointer-events-auto"
            >
              <div className="group w-[240px] md:w-[270px] lg:w-[300px] xl:w-[325px] 2xl:w-[350px] shrink-0 rounded-[6px] bg-white p-2.5 sm:p-3 pb-3 sm:pb-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-black/10 transition-transform duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:z-50 flex flex-col justify-between">
                <div className="aspect-[4/3.2] w-full overflow-hidden rounded-[4px] bg-neutral-100 relative min-h-[170px] sm:min-h-[195px] md:min-h-[215px] lg:min-h-[235px]">
                  {card.type === "video" ? (
                    <LazyVideo
                      src={card.img}
                      className="h-full w-full object-cover pointer-events-none"
                    />
                  ) : (
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      sizes="(max-width: 1024px) 270px, 350px"
                      className="object-cover pointer-events-none"
                      priority={index < 6}
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                <p className="mt-2.5 sm:mt-3 text-center font-sans text-[13px] sm:text-[14px] lg:text-[15px] font-bold tracking-tight text-black truncate h-5 flex items-center justify-center px-1">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2B. MOBILE SCREEN: FIXED 4 CARDS (NO ROTATION)                            */}
      {/* ========================================================================= */}
      <div className="block md:hidden relative z-20 mx-auto max-w-[540px] px-4 mt-8 pointer-events-auto">
        <div className="grid grid-cols-2 gap-3">
          {CARDS_DATA.slice(0, 4).map((card) => (
            <div
              key={card.id}
              className="group w-full rounded-[6px] bg-white p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-black/10 flex flex-col justify-between"
            >
              <div className="aspect-[4/3.2] w-full overflow-hidden rounded-[4px] bg-neutral-100 relative min-h-[145px]">
                {card.type === "video" ? (
                  <LazyVideo
                    src={card.img}
                    className="h-full w-full object-cover pointer-events-none"
                  />
                ) : (
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    sizes="180px"
                    className="object-cover pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
              <p className="mt-2 text-center font-sans text-[12px] font-bold tracking-tight text-black truncate h-4 flex items-center justify-center px-1">
                {card.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ORANGE ASTERISK ICON & PARAGRAPH (FROM PUBLIC ICONS)                    */}
      {/* ========================================================================= */}
      <div className="relative z-20 mx-auto max-w-[1400px] px-6 text-center -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-5 pointer-events-auto">
        {/* Rotating Orange Asterisk Starburst Icon with refined smaller size */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-22 lg:h-22 mx-auto pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-full h-full relative animate-spin-continuous">
            <Image
              src="/icons/idotive-icon-8-1.svg"
              alt="Orange Asterisk Starburst"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Subtitle Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs sm:text-[13px] md:text-[14px] font-normal leading-relaxed text-neutral-600 max-w-xl mx-auto mt-4 sm:mt-5"
        >
          We turn bold ideas into impactful brand experiences that inspire audiences, evoke emotion,
          and deliver measurable results through creativity and strategic design.
        </motion.p>
      </div>

      {/* ========================================================================= */}
      {/* 4. ABOUT US SECTION (UNIFIED BOTTOM COMPOSITION)                          */}
      {/* ========================================================================= */}
      <div className="relative z-20 mx-auto max-w-[1400px] px-6 sm:px-12 lg:px-16 pt-12 sm:pt-16 lg:pt-20 pointer-events-auto">
        {/* 3D Rotating Right Side Graphic - moved down slightly */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block absolute right-[3%] xl:right-[5%] top-[12%] lg:top-[16%] xl:top-[20%] z-0 pointer-events-none w-[220px] h-[220px] lg:w-[260px] lg:h-[260px] xl:w-[290px] xl:h-[290px] animate-spin-continuous"
          aria-hidden="true"
        >
          <Image
            src="/icons/idotive-icon-8.png"
            alt="Rotating 3D Graphic"
            fill
            className="object-contain"
          />
        </motion.div>

        <div className="relative z-10">
          {/* Mobile/Tablet Rotating Star Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="block lg:hidden mb-6 text-left"
          >
            <div
              className="w-[46px] h-[46px] sm:w-[54px] sm:h-[54px] relative pointer-events-none animate-spin-continuous"
              aria-hidden="true"
            >
              <Image
                src="/icons/idotive-icon-8.png"
                alt="Rotating 3D Graphic"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: false }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-neutral-400"
          >
            About Us
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: false }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-full lg:max-w-[62%] xl:max-w-[56%]"
          >
            <h2 className="font-display text-[1.4rem] sm:text-[2rem] lg:text-[45px] font-semibold leading-[1.2] lg:leading-[54.9px] tracking-tight lg:tracking-[-2.61px] text-neutral-900">
              We help brands express their vision through innovative design, compelling storytelling and strategic solutions that leave a lasting impression.
            </h2>

            <div className="mt-8 flex flex-col items-start gap-6 max-w-[550px]">
              {/* AVATARS + PLUS BUTTON */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                {/* 1st Image: Square */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.2, once: false }}
                  transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-xl sm:rounded-2xl shadow-sm bg-neutral-200 shrink-0 relative"
                >
                  <Image
                    src={AVATARS[0].src}
                    alt="Team member 1"
                    fill
                    sizes="(max-width: 640px) 64px, 80px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* 2nd Image: Circle (Middle) */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.2, once: false }}
                  transition={{ duration: 0.85, delay: 0.23, ease: [0.22, 1, 0.36, 1] }}
                  className="h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-full shadow-sm bg-neutral-200 shrink-0 relative"
                >
                  <Image
                    src={AVATARS[1].src}
                    alt="Team member 2"
                    fill
                    sizes="(max-width: 640px) 64px, 80px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* 3rd Image: Square */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.2, once: false }}
                  transition={{ duration: 0.85, delay: 0.31, ease: [0.22, 1, 0.36, 1] }}
                  className="h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-xl sm:rounded-2xl shadow-sm bg-neutral-200 shrink-0 relative"
                >
                  <Image
                    src={AVATARS[2].src}
                    alt="Team member 3"
                    fill
                    sizes="(max-width: 640px) 64px, 80px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* 4th Element: Orange Circle Plus Button */}
                <motion.button
                  type="button"
                  aria-label="View all team members"
                  initial={{ opacity: 0, scale: 0.85, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ amount: 0.2, once: false }}
                  transition={{ duration: 0.85, delay: 0.39, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#f26b2c] text-white text-2xl sm:text-3xl font-light hover:scale-105 transition-transform shadow-sm shrink-0 cursor-pointer"
                >
                  +
                </motion.button>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2, once: false }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="font-inter font-normal text-[14.4px] leading-[25.9px] tracking-[0.1px] text-neutral-500"
              >
                We help brands bring their vision to life through design,
                storytelling, and strategy, creating impactful experiences that
                engage audiences and strengthen brand identity.
              </motion.p>

              <motion.a
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2, once: false }}
                transition={{ duration: 0.85, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                href="#contact"
                className="group relative inline-flex h-[36px] items-center justify-center overflow-hidden rounded-none bg-black px-5 text-[11px] font-bold uppercase tracking-wider text-white transition-colors duration-300"
              >
                <span className="absolute inset-0 h-full w-full translate-y-full bg-[#f26b2c] transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <span className="relative z-10 block h-4 overflow-hidden">
                  <span className="block transform transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    Learn More
                  </span>
                  <span className="absolute left-0 top-0 block translate-y-full transform transition-transform duration-300 ease-out group-hover:translate-y-0">
                    Learn More
                  </span>
                </span>
              </motion.a>
            </div>
          </motion.div>

          {/* Lower Row Section */}
          <div
            ref={bottomRowRef}
            className="mt-12 sm:mt-16 pt-8 border-t border-neutral-200/70 flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-4 items-center"
          >
            {/* 1. Stats Numbering Column */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2, once: false }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 md:order-2 md:col-span-4 lg:col-span-4 flex items-center gap-6 sm:gap-8 justify-start w-full pb-4 md:pb-0 border-b md:border-b-0 border-neutral-200/60"
            >
              <div>
                <div className="font-display text-[2.2rem] sm:text-[3rem] lg:text-[3.2rem] font-bold leading-none tracking-tighter text-neutral-900 flex items-center">
                  <Counter value={98} />%
                </div>
                <div className="mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                  Client happiness rate
                </div>
              </div>

              <div className="h-10 w-px bg-neutral-200" aria-hidden="true" />

              <div>
                <div className="font-display text-[2.2rem] sm:text-[3rem] lg:text-[3.2rem] font-bold leading-none tracking-tighter text-neutral-900 flex items-center">
                  <Counter value={300} />+
                </div>
                <div className="mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                  Brands transformed
                </div>
              </div>
            </motion.div>

            {/* 2. Mobile Bottom Section / Desktop Columns */}
            <div className="order-2 w-full flex items-center justify-between gap-4 md:contents">
              {/* Pill Buttons Div */}
              <div className="md:order-1 md:col-span-4 lg:col-span-3 flex flex-col items-start gap-1.5">
                {PILLS.map((pill, idx) => (
                  <motion.span
                    key={pill}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2, once: false }}
                    transition={{ duration: 0.75, delay: 0.15 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-full border border-neutral-300 px-3 sm:px-4 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-800 bg-white/60 backdrop-blur-sm"
                  >
                    {pill}
                  </motion.span>
                ))}
              </div>

              {/* Stacked Images Container */}
              <motion.div
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2, once: false }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="md:order-3 md:col-span-4 lg:col-span-5 flex items-center justify-end lg:justify-center pr-6 xs:pr-8 sm:pr-10 md:pr-0 overflow-visible"
              >
                <div className="relative w-[65px] xs:w-[75px] sm:w-[90px] md:w-[105px] lg:w-[125px] aspect-[1.35/1] flex-shrink-0">
                  {/* Card 3 */}
                  <motion.div
                    style={{
                      x: card3X,
                      y: card3Y,
                    }}
                    className="absolute inset-0 w-full h-full z-10"
                  >
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-full h-full overflow-hidden rounded-none shadow-md cursor-pointer relative bg-neutral-200 border border-black/5"
                    >
                      <Image
                        src={PROJECT_IMAGES[2]}
                        alt="Project Preview 3"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Card 2 */}
                  <motion.div
                    style={{
                      y: card2Y,
                    }}
                    className="absolute inset-0 w-full h-full z-20"
                  >
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-full h-full overflow-hidden rounded-none shadow-md cursor-pointer relative bg-neutral-200 border border-black/5"
                    >
                      <Image
                        src={PROJECT_IMAGES[1]}
                        alt="Project Preview 2"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Card 1 */}
                  <motion.div
                    style={{
                      x: card1X,
                      y: card1Y,
                    }}
                    className="absolute inset-0 w-full h-full z-30"
                  >
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-full h-full overflow-hidden rounded-none shadow-md cursor-pointer relative bg-neutral-200 border border-black/5"
                    >
                      <Image
                        src={PROJECT_IMAGES[0]}
                        alt="Project Preview 1"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
