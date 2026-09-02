'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

function ExperienceCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 1;
    const end = 25;
    const duration = 1400; // 1.4 seconds
    const startTime = performance.now();

    const animateCount = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 2);
      const currentCount = Math.floor(easeProgress * (end - start) + start);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView]);

  return (
    <span ref={ref}>
      {count}
    </span>
  );
}

export default function CraftedSection() {
  return (
    <section className="w-full bg-black text-white py-16 sm:py-24 pl-6 sm:pl-10 md:pl-16 lg:pl-20 pr-4 sm:pr-6 md:pr-8 overflow-hidden">
      <div className="w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Typography, CTA, Rotating Icon and Stats */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 sm:space-y-7">
          {/* Main Heading */}
          <motion.h2 
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-white leading-[1.12] tracking-tight max-w-xl"
          >
            Every step carefully crafted to push your brand forward with purpose
          </motion.h2>

          {/* Subtext Paragraph */}
          <motion.p 
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans font-normal text-[15px] sm:text-[16px] leading-relaxed text-white/70 max-w-lg"
          >
            We design meaningful brand experiences that inspire connection and drive growth. Through creativity and strategy, we help brands stand out, engage their audience, and move confidently toward the future.
          </motion.p>

          {/* VIEW OUR METHOD Button */}
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="group relative inline-flex h-[48px] items-center justify-center overflow-hidden rounded-full bg-white px-8 text-xs font-bold uppercase tracking-widest text-black transition-colors duration-300 hover:bg-[#f26b2c] hover:text-white cursor-pointer shadow-lg">
              VIEW OUR METHOD
            </button>
          </motion.div>

          {/* Constantly Rotating Orange Asterisk Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-2"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 relative animate-spin-continuous">
              <Image
                src="/icons/idotive-icon-3-orange.svg"
                alt="Rotating Orange Star"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-8 sm:gap-12 pt-2 w-full max-w-lg items-end"
          >
            {/* Stat 1: Avatar stack & Happy Clients */}
            <div className="flex flex-col gap-3">
              {/* Avatar Cluster */}
              <div className="flex items-center -space-x-2.5">
                <div className="relative w-8 h-8 rounded-full border-2 border-black overflow-hidden">
                  <Image 
                    fill 
                    className="object-cover" 
                    src="/images/client-image-1.webp" 
                    alt="Client 1" 
                    sizes="32px"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="relative w-8 h-8 rounded-full border-2 border-black overflow-hidden">
                  <Image 
                    fill 
                    className="object-cover" 
                    src="/images/client-image-2.webp" 
                    alt="Client 2" 
                    sizes="32px"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="relative w-8 h-8 rounded-full border-2 border-black overflow-hidden">
                  <Image 
                    fill 
                    className="object-cover" 
                    src="/images/client-image-3.webp" 
                    alt="Client 3" 
                    sizes="32px"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#f26b2c] border-2 border-black flex items-center justify-center text-xs font-bold text-white shadow-md relative z-10">
                  +
                </div>
              </div>
              <div>
                <span className="font-sans font-bold text-xl sm:text-2xl text-white block leading-tight">
                  4.9 ★
                </span>
                <span className="font-sans text-[11px] font-bold text-white/50 uppercase tracking-widest block mt-0.5">
                  HAPPY CLIENTS
                </span>
              </div>
            </div>

            {/* Stat 2: Giant 25+ Number & Years of Experience */}
            <div className="flex flex-col justify-end">
              <div className="relative inline-flex items-start">
                <span className="font-sans font-extrabold text-7xl sm:text-8xl md:text-[94px] lg:text-[104px] text-white leading-none tracking-tight">
                  <ExperienceCounter />
                </span>
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#f26b2c] flex items-center justify-center text-xs sm:text-sm font-black text-white shadow-md relative -top-1 sm:-top-2 ml-0.5 shrink-0">
                  +
                </span>
              </div>
              <span className="font-sans text-[11px] font-bold text-white/50 uppercase tracking-widest block mt-2">
                YEARS OF EXPERIENCE
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Visual Showcase Card extending rightwards */}
        <div className="lg:col-span-6 relative w-full flex justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[1.12/1] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl"
          >
            <Image
              src="/images/idotive-service-image-two.webp"
              alt="Crafted Visual representation"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover transition-transform duration-1000 hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}