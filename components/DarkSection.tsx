'use client';

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

type CardData = {
  image: string;
  title: string;
  description: string;
};

const CARDS: CardData[] = [
  {
    image: "/images/DarkSection1.webp", 
    title: "Multi-industry focus",
    description: "We design brands for all industries. Our creative scope ranges from fashion to high tech and beyond.",
  },
  {
    image: "/images/DarkSection2.webp", 
    title: "Tailored creative execution",
    description: "We merge insight and imagination to craft bespoke physical and digital assets.",
  },
  {
    image: "/images/Darksection3.webp", 
    title: "Results-driven design",
    description: "We create performance-driven designs. Every pixel is shaped to deliver measurable outcomes.",
  },
];

const CARD_EASE = [
  (t: number) => 1 - Math.pow(1 - t, 3),
  (t: number) => 1 - Math.pow(1 - t, 3),
  (t: number) => 1 - Math.pow(1 - t, 3),
];

function frameMap(index: number, total: number) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  if (isFirst) {
    return {
      input:   [0,      0.22,    0.45,     1],
      y:       ["0%",   "0%",    "-85%",   "-85%"],
      z:       [0,      0,       -350,     -350],
      scale:   [1,      1,       0.75,     0.75],
      rotateX: [0,      0,       -20,      -20],
      opacity: [1,      1,       0,        0],
      blur:    [0,      0,       8,        8],
    };
  }

  const start = index * 0.28;
  const settled = start + 0.20;
  const exit = settled + 0.25;

  if (isLast) {
    return {
      input:   [0,        start,    settled, 1],
      y:       ["160%",   "160%",   "0%",    "0%"],
      z:       [-150,     -150,     0,       0],
      scale:   [0.85,     0.85,     1,       1],
      rotateX: [-70,      -70,      0,       0],
      opacity: [0,        0,        1,       1],
      blur:    [8,        8,        0,       0],
    };
  }

  return {
    input:   [0,        start,    settled, exit,     1],
    y:       ["160%",   "160%",   "0%",    "-85%",   "-85%"],
    z:       [-150,     -150,     0,       -350,     -350],
    scale:   [0.85,     0.85,     1,       0.75,     0.75],
    rotateX: [-70,      -70,      0,       -20,      -20],
    opacity: [0,        0,        1,       0,        0],
    blur:    [8,        8,        0,       8,        8],
  };
}

function Card({
  data,
  index,
  total,
  progress,
}: {
  data: CardData;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
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
        transformOrigin: "50% 100%",
      }}
      className="absolute inset-0 flex items-center justify-center will-change-transform pointer-events-none"
    >
      <div className="w-[90vw] max-w-[1100px] pointer-events-auto rounded-2xl bg-white p-4 sm:p-6 shadow-2xl border border-white/5">
        <div className="aspect-[1.93/1] overflow-hidden rounded-xl relative w-full bg-neutral-900">
          <Image
            src={data.image}
            alt={data.title}
            fill
            sizes="(max-width: 1100px) 90vw, 1100px"
            className="object-cover"
            draggable={false}
          />
        </div>
        <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-3 sm:gap-6 md:grid-cols-2 items-start">
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black tracking-tight leading-tight">
            {data.title}
          </h3>
          <p className="font-inter font-medium text-[15px] leading-[25.9px] tracking-[0.45px] text-neutral-700">
            {data.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function DarkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 28,
    mass: 0.5,
    restDelta: 0.001,
  });

  return (
    <div className="w-full bg-black">
      <div className="pt-20 pb-8 sm:pt-28 sm:pb-12 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-5xl md:text-[52px] lg:text-[58px] font-sans font-semibold text-white tracking-tight leading-[1.18]">
          Your vision our creativity a<br />
          perfect partnership for success
        </h2>
      </div>

      <section
        id="dark-cards-section"
        ref={sectionRef}
        className="relative w-full bg-black block"
        style={{ height: "400vh" }}
      >
        <div
          className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
          style={{
            perspective: "1000px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div
            className="relative h-full w-full flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {CARDS.map((card, i) => (
              <Card
                key={i}
                data={card}
                index={i}
                total={CARDS.length}
                progress={smoothProgress}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}