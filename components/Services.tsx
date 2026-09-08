"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Service {
  n: string;
  title: string;
  desc: string;
  img: string;
}

const SERVICES: Service[] = [
  {
    n: "01",
    title: "Branding & Design",
    desc: "We shape cohesive brand identities and strategic design systems that define your personality, build trust, and forge lasting connections across every touchpoint.",
    img: "/images/card1.webp",
  },
  {
    n: "02",
    title: "Web Design",
    desc: "We design striking, high-performance web experiences and interactive digital platforms tailored to elevate your presence and convert visitors seamlessly.",
    img: "/images/card10.webp",
  },
  {
    n: "03",
    title: "Marketing Design",
    desc: "We craft high-impact marketing visuals and multi-channel campaign collateral that capture attention, deliver clear messaging, and accelerate business growth.",
    img: "/images/card8.webp",
  },
  {
    n: "04",
    title: "Mobile Design",
    desc: "We engineer intuitive mobile UI/UX layouts and native responsive application designs that delight users, enhance retention, and amplify your brand ecosystem.",
    img: "/images/card7.webp",
  },
  {
    n: "05",
    title: "AI & Automation",
    desc: "We deploy intelligent AI workflows and custom conversational agents that streamline customer interactions, automate repetitive tasks, and scale operational efficiency.",
    img: "/images/card1.webp",
  },
];

function Icon({ i }: { i: number }) {
  const stroke = "currentColor";
  if (i === 0)
    return (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke={stroke} strokeWidth="1.2">
        <circle cx="20" cy="24" r="10" />
        <circle cx="30" cy="24" r="10" />
      </svg>
    );
  if (i === 1)
    return (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke={stroke} strokeWidth="1.2">
        <rect x="10" y="14" width="20" height="20" transform="rotate(15 20 24)" />
        <rect x="18" y="14" width="20" height="20" transform="rotate(-15 28 24)" />
      </svg>
    );
  if (i === 2)
    return (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke={stroke} strokeWidth="1.2">
        <rect x="10" y="10" width="20" height="20" />
        <circle cx="32" cy="32" r="8" />
      </svg>
    );
  if (i === 3)
    return (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke={stroke} strokeWidth="1.2">
        <polygon points="24,8 40,18 40,30 24,40 8,30 8,18" />
      </svg>
    );
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke={stroke} strokeWidth="1.2">
      <path d="M12 24a12 12 0 1 0 24 0 12 12 0 1 0-24 0" />
      <path d="M24 12v24M12 24h24" />
    </svg>
  );
}

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const boxHeight = 200; 
  const halfHeight = boxHeight / 2;

  const handleCardClick = (index: number) => {
    setClickedIndex(index);
    setTimeout(() => {
      setClickedIndex(null);
    }, 1000);
  };

  return (
    <section className="bg-[#f4f1ea] py-24 px-6 sm:px-12 overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: false }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-[10px] sm:text-xs tracking-[0.3em] text-neutral-500 uppercase"
        >
          Our Services
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: false }}
          transition={{ duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-center font-display font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[45px] text-neutral-900 leading-[1.2] lg:leading-[54.9px] tracking-tight lg:tracking-[-2.61px]"
        >
          Where creative thinking meets<br className="hidden sm:inline" /> strategic brand impact
        </motion.h2>

        {/* space-y-14 provides physical clearance for the 3D rotation */}
        <div className="mt-14 sm:mt-20 space-y-10 sm:space-y-14 w-full">
          {SERVICES.map((s, i) => {
            const isHovered = hoveredIndex === i;
            const isClicked = clickedIndex === i;

            // -45 degrees yields a balanced 50/50 visual split
            let rotateX = 0;
            if (isClicked) {
              rotateX = -405; // -45 - 360 for a smooth continuous spin
            } else if (isHovered) {
              rotateX = -45; 
            }

            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.25, once: false }}
                transition={{ duration: 0.95, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleCardClick(i)}
                className="relative w-full cursor-pointer select-none"
                style={{ 
                  perspective: "1800px", 
                  height: `${boxHeight}px`,
                  zIndex: isHovered || isClicked ? 50 : 10,
                }}
              >
                <motion.div
                  animate={{ 
                    rotateX,
                    scale: isHovered || isClicked ? 0.96 : 1 // Recedes slightly to stay elegantly spaced
                  }}
                  transition={{ 
                    duration: isClicked ? 0.95 : 0.55, 
                    ease: [0.25, 1, 0.5, 1] 
                  }}
                  style={{ 
                    transformStyle: "preserve-3d",
                    height: "100%",
                    width: "100%"
                  }}
                  className="relative"
                >
                  {/* FRONT FACE: Clean warm-toned off-white background */}
                  <motion.div
                    animate={{ opacity: isHovered ? 0.85 : 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      transform: `rotateX(0deg) translateZ(${halfHeight}px)`,
                      backfaceVisibility: "hidden",
                      height: "100%",
                      width: "100%"
                    }}
                    className="absolute inset-0 bg-[#faf9f6] border border-[#e1dacb] rounded-lg flex items-center px-4 sm:px-8 md:px-10 py-4 sm:py-6 shadow-sm"
                  >
                    <div className="grid grid-cols-12 items-center gap-3 sm:gap-6 w-full">
                      <div className="col-span-12 md:col-span-5 flex items-center gap-3 sm:gap-6">
                        <span className="text-neutral-400 text-sm sm:text-base font-mono">{s.n}</span>
                        <span className="h-px w-6 sm:w-8 bg-neutral-300" />
                        <h3 className="font-display font-semibold text-xl sm:text-2xl text-neutral-900 tracking-tight">{s.title}</h3>
                      </div>
                      
                      <p className="col-span-12 md:col-span-6 font-inter font-medium text-[15px] leading-[25.9px] tracking-[0.45px] text-neutral-600 line-clamp-2 md:line-clamp-none">
                        {s.desc}
                      </p>
                      
                      <div className="col-span-12 md:col-span-1 hidden md:flex justify-end text-neutral-700">
                        <Icon i={i} />
                      </div>
                    </div>
                  </motion.div>

                  {/* TOP FACE: Image presentation (No overlay text on hover) */}
                  <div
                    style={{
                      transform: `rotateX(90deg) translateZ(${halfHeight}px)`,
                      backfaceVisibility: "hidden",
                      height: "100%",
                      width: "100%"
                    }}
                    className="absolute inset-0 rounded-lg overflow-hidden border border-[#e1dacb] shadow-md bg-neutral-900"
                  >
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      priority
                    />
                  </div>

                  {/* BOTTOM FACE: Color-matched stabilizing structural panel */}
                  <div
                    style={{
                      transform: `rotateX(-90deg) translateZ(${halfHeight}px)`,
                      backfaceVisibility: "hidden",
                      height: "100%",
                      width: "100%"
                    }}
                    className="absolute inset-0 bg-[#e6e2d8] border border-[#d8d1bf] rounded-lg"
                  />

                  {/* BACK FACE: Color-matched stabilizing structural panel */}
                  <div
                    style={{
                      transform: `rotateX(180deg) translateZ(${halfHeight}px)`,
                      backfaceVisibility: "hidden",
                      height: "100%",
                      width: "100%"
                    }}
                    className="absolute inset-0 bg-[#faf9f6] border border-[#e1dacb] rounded-lg flex items-center justify-center"
                  >
                    <span className="font-serif text-neutral-400 italic text-lg">{s.title}</span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
