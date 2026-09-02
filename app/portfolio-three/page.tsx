"use client";

import React, { useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { PORTFOLIO_PROJECTS, PORTFOLIO_THREE_IDS, PortfolioProject } from "@/lib/portfolioData";

type PageType = string;

const CARDS: PortfolioProject[] = PORTFOLIO_THREE_IDS.map((id) => PORTFOLIO_PROJECTS[id]);

const CARD_EASE = [
  (t: number) => 1 - Math.pow(1 - t, 4),
  (t: number) => 1 - Math.pow(1 - t, 3),
  (t: number) => t * t * (3 - 2 * t),
  (t: number) => t * t * t,
];

function frameMap(index: number, total: number) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  if (isFirst) {
    return {
      input:   [0,     0.05,   0.20,   0.35,  1],
      y:       ["4vh", "4vh",  "-30vh","-64vh","-64vh"],
      z:       [0,     0,      -500,   -1180, -1180],
      scale:   [0.95,  0.95,   0.82,   0.72,  0.72],
      rotateX: [0,     0,      -20,    -31,   -31],
      opacity: [1,     1,      0.6,    0,     0],
      blur:    [0,     0,      6,      12,    12],
    };
  }

  const start = index * 0.22;
  const settled = start + 0.12;
  const exit = start + 0.24;
  const gone = start + 0.36;

  if (isLast) {
    return {
      input:   [0,       start,   settled, 1],
      y:       ["121vh", "121vh", "4vh",   "4vh"],
      z:       [560,     560,     0,       0],
      scale:   [1.38,    1.38,    0.95,    0.95],
      rotateX: [64,      64,      0,       0],
      opacity: [0,       0,       1,       1],
      blur:    [0,       0,       0,       0],
    };
  }

  return {
    input:   [0,       start,   settled, exit,   gone,    1],
    y:       ["121vh", "121vh", "4vh",   "-20vh","-50vh", "-50vh"],
    z:       [560,     560,     0,      -400,   -1080,   -1080],
    scale:   [1.38,    1.38,    0.95,    0.85,   0.73,    0.73],
    rotateX: [64,      64,      0,      -15,    -30,     -30],
    opacity: [0,       0,       1,       0.7,    0,       0],
    blur:    [0,       0,       0,       3,      11,      11],
  };
}

function StackCard({
  data,
  index,
  total,
  progress,
}: {
  data: PortfolioProject;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const router = useRouter();
  const map = frameMap(index, total);
  const ease = CARD_EASE[index % CARD_EASE.length];

  const y       = useTransform(progress, map.input, map.y,       { ease });
  const z       = useTransform(progress, map.input, map.z,       { ease });
  const scale   = useTransform(progress, map.input, map.scale,   { ease });
  const rotateX = useTransform(progress, map.input, map.rotateX, { ease });
  const opacity = useTransform(progress, map.input, map.opacity, { ease });
  const blurNum = useTransform(progress, map.input, map.blur,    { ease });

  const filter = useTransform(blurNum, (v: number) => `blur(${v}px)`);

  return (
    <motion.article
      style={{
        y,
        z,
        scale,
        rotateX,
        opacity,
        filter,
        zIndex: index + 1,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
      }}
      onClick={() => {
        router.push(`/portfolio-details?id=${data.id}`);
      }}
      className="absolute inset-0 flex items-center justify-center will-change-transform cursor-pointer p-4"
    >
      <div className="w-[min(92vw,1100px)] min-w-[280px] rounded-2xl bg-white p-4 sm:p-8 shadow-2xl border border-black/10 transition-all duration-300 hover:border-black/30">
        <div className="aspect-[16/10] sm:aspect-[2/1] overflow-hidden rounded-xl relative w-full border border-black/5 bg-neutral-900">
          <Image
            src={data.bannerImage}
            alt={data.title}
            fill
            referrerPolicy="no-referrer"
            sizes="(max-w-1100px) 92vw, 1100px"
            className="object-cover transition-transform duration-700 hover:scale-105"
            draggable={false}
            priority={index === 0}
          />
          <div className="absolute top-4 left-4">
            <span className="px-3.5 py-1 rounded-full bg-black/80 text-white text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md">
              {data.category}
            </span>
          </div>
        </div>
        <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 text-left items-start">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3.5xl font-black text-black uppercase tracking-tight hover:text-[#f26b2c] transition-colors">
              {data.title}
            </h3>
            <p className="text-xs font-mono text-neutral-500 font-bold uppercase tracking-widest mt-0.5 sm:mt-1">
              {data.subtitle}
            </p>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 font-medium line-clamp-2 sm:line-clamp-3">
            {data.description.paragraphs[0]}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function PortfolioThreePage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<PageType>("portfolio-three");
  const sectionRef = useRef<HTMLDivElement>(null);

  const CARDS: PortfolioProject[] = PORTFOLIO_THREE_IDS.map((id) => PORTFOLIO_PROJECTS[id]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 25,
    mass: 0.4,
    restDelta: 0.001,
  });

  const onContactClick = () => {
    router.push("/contact");
  };

  return (
    <>
      <Header
        activePage={activePage}
        setActivePage={(page) => {
          if (page === "home") {
            router.push("/");
          } else {
            router.push(`/${page}`);
          }
        }}
        onContactClick={onContactClick}
        transparent={true}
      />

      <main className="w-full bg-[#f4f1ea] text-black min-h-screen pt-20 overflow-hidden">
        {/* HERO TITLE SECTION */}
        <div className="max-w-4xl mx-auto text-center space-y-3 mt-8 mb-12 px-6">
          <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase font-black">
            PORTFOLIO STACK
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-black tracking-tight leading-none uppercase">
            Selected Works
          </h1>

          {/* SPINNING ORANGE STAR */}
          <div className="flex justify-center pt-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="relative w-12 h-12"
            >
              <Image
                src="/icons/idotive-icon-8.png"
                alt="Rotating Star Icon"
                fill
                sizes="48px"
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>

        {/* STACK SCROLL CONTAINER */}
        <section ref={sectionRef} className="relative h-[350vh] w-full">
          <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
            
            {/* STACKED CARDS */}
            <div className="relative h-[75vh] w-full max-w-6xl flex items-center justify-center [perspective:1200px]">
              {CARDS.map((card, idx) => (
                <StackCard
                  key={card.id}
                  data={card}
                  index={idx}
                  total={CARDS.length}
                  progress={smoothProgress}
                />
              ))}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
