"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link"; 
import { motion } from "framer-motion";

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!headlineRef.current || !paraRef.current) return;

    const chars = headlineRef.current.querySelectorAll<HTMLElement>("[data-char]");
    
    gsap.set(chars, { yPercent: 60, opacity: 0 });
    gsap.set(paraRef.current, { y: 35, opacity: 0 });

    const headlineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(chars, {
              yPercent: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.02,
            });
            headlineObserver.disconnect;
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    const paraObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(paraRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out",
            });
            paraObserver.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    headlineObserver.observe(headlineRef.current);
    paraObserver.observe(paraRef.current);

    return () => {
      headlineObserver.disconnect();
      paraObserver.disconnect();
    };
  }, []);

  const renderWord = (word: string, baseDelay: number) =>
    word.split("").map((ch, i) => (
      <span
        key={`${word}-${i}`}
        className="inline-block overflow-hidden align-bottom"
        style={{ lineHeight: "0.9" }}
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
      <span className="flex flex-wrap items-end justify-center gap-x-[0.2em] overflow-hidden">
        {words.map((w, i) => (
          <span key={i} className="inline-flex overflow-hidden">
            {renderWord(w, i * 0.04)}
          </span>
        ))}
      </span>
    );
  };

  return (
    <section 
      ref={sectionRef} 
      id="work" 
      className="bg-[#faf8f3] pt-0 pb-20 mt-0 block relative z-30"
    >
      <div className="mx-auto max-w-[1400px] px-6 pt-0">
        
        {/* MAIN HEADING CONTAINER */}
        <div ref={headlineRef} className="relative mx-auto max-w-5xl flex flex-col items-center justify-center -space-y-2 sm:-space-y-4 md:-space-y-6">
          
          {/* LINE 1: [*] Featured */}
          <div className="w-full flex items-center justify-center">
            <div className="relative inline-flex items-center justify-center">
              
              {/* Black Asterisk Icon - Tied close to 'F' */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-full mr-1 sm:mr-2 -top-1 sm:top-0 md:top-1 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 shrink-0 select-none pointer-events-none"
                aria-hidden="true"
              >
                <div className="w-full h-full relative">
                  <Image
                    src="/icons/idotive-icon-3-1.svg"
                    alt="Black Asterisk"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* Featured Text */}
              <h2 
                className="text-center font-display text-6xl sm:text-8xl md:text-[110px] lg:text-[130px] xl:text-[150px] font-bold leading-none text-black m-0 p-0 tracking-tight xl:tracking-[-3px] whitespace-nowrap"
              >
                <span className="inline-block overflow-hidden">
                  {renderLine("Featured")}
                </span>
              </h2>
            </div>
          </div>

          {/* LINE 2: work [Orange Badge] */}
          <div className="w-full flex items-center justify-center">
            <div className="relative inline-flex items-center justify-center">
              
              {/* work Text */}
              <h2 
                className="text-center font-display text-6xl sm:text-8xl md:text-[110px] lg:text-[130px] xl:text-[150px] font-bold leading-none text-black m-0 p-0 tracking-tight xl:tracking-[-3px] whitespace-nowrap"
              >
                <span className="inline-block overflow-hidden">
                  {renderLine("work")}
                </span>
              </h2>

  {/* Orange Badge Icon - Exact Size Retained, Shifted Upwards to Match 'k' */}
<motion.div
  initial={{ opacity: 0, scale: 0.7, rotate: 30 }}
  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
  className="absolute left-full ml-1 sm:ml-2 md:ml-3 -top-1 sm:top-0 md:top-2 -translate-y-2 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 shrink-0 select-none pointer-events-none"
  aria-hidden="true"
>
  <div className="relative w-full h-full animate-spin-continuous">
    <Image
      src="/icons/idotive-icon-2-1.svg"
      alt="Creative Lead Badge"
      fill
      className="object-contain"
    />
  </div>
</motion.div>

            </div>
          </div>
        </div>
        
        {/* Divider line */}
        <motion.div 
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mx-auto my-6 sm:my-8 h-8 sm:h-10 w-[1.5px] bg-black/30 origin-top" 
        />
        
        {/* Paragraph */}
        <p ref={paraRef} className="mx-auto max-w-xl text-center font-inter font-medium text-[15px] leading-[25.9px] tracking-[0.45px] text-black/70 will-change-transform">
          Discover our standout projects where creativity meets strategy and
          storytelling. Each piece shows how we help brands connect, build
          identity, and achieve results across every platform.
        </p>

        {/* Outer Grid Wrapper */}
        <div className="mt-14 flex flex-col gap-10">
          {/* ROW 1 */}
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
            <WorkCard
              img="/images/portoflio20one-p-1080.webp"
              tag="Web Design"
              tags={["Website UI/UX", "Web Apps" , "SaaS Designs" , "Webflow Websites" ,"E-commerce Websites"]}
              marqueeLabel="Web Design"
              big
              delay={0.1}
            />
            <WorkCard
              img="/images/img_11.webp"
              tag="Branding & Design"
              tags={["Graphic Design", "Packaging Design" , "Brand Assets"]}
              marqueeLabel="Branding & Design"
              delay={0.2}
            />
          </div>

          {/* ROW 2 */}
          <div className="w-full flex justify-center">
            <div className="w-full md:max-w-[75%]">
              <WorkCard
                img="/images/img_12.webp"
                tag="Marketing Design"
                tags={["Social Media Design ", "Blog Graphics","Email Newsletter Designs" ,"Campaign Creatives"]}
                marqueeLabel="Marketing Design"
                big
                delay={0.1}
              />
            </div>
          </div>

          {/* ROW 3 */}
          <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
            <WorkCard
              img="/images/idotive-portfolio-image-five-p-1080.webp"
              tag="Mobile Design"
              tags={["Mobile App UI/UX " , "Android App Design" , "iOS App Design" , "Hybrid App Design"]}
              marqueeLabel="Mobile Design"
              delay={0.1}
            />
            <WorkCard
              img="/images/card14.webp"
              tag="AI & Automation"
              tags={["AI Chatbots", "AI Agents" , "Workflow Automation" , "Business Automation " , "Custom AI Solutions"]}
              marqueeLabel="AI & Automation"
              big
              delay={0.2}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

interface WorkCardProps {
  img: any;
  tag: string;
  tags: string[];
  marqueeLabel: string;
  big?: boolean;
  delay?: number;
}

function WorkCard({ img, tag, tags, marqueeLabel, big = false, delay = 0 }: WorkCardProps) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 75 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2, once: false }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer w-full"
    >
      <div className={`zoom-wrap relative ${big ? "h-[260px] sm:h-[340px] md:h-[440px]" : "h-[210px] sm:h-[260px] md:h-[290px]"} overflow-hidden rounded-2xl bg-neutral-200/50`}>
        <Image
          src={img}
          alt={tag}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
          className="object-cover transition-all duration-500 lg:group-hover:blur-[6px]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 lg:group-hover:opacity-100">
          <div className="absolute inset-x-0 bg-white py-3.5 shadow-sm transform -translate-y-1/2 top-1/2">
            <div className="marquee">
              <div className="marquee__track text-[11px] font-bold uppercase tracking-widest text-black flex items-center">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span key={i} className="flex items-center gap-3 shrink-0">
                    {marqueeLabel}
                    <span className="h-2 w-2 rounded-full bg-orange-500 inline-block mx-1" />
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="z-10 transition-transform duration-500 scale-90 lg:group-hover:scale-100">
            <div className="w-[70px] h-[70px] rounded-full flex items-center justify-center bg-white/25 text-white text-xl backdrop-blur-md border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-105">
              ↗
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-black">{tag}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-600 bg-white/80 cursor-default">
                {t}
              </span>
            ))}
          </div>
        </div>
        <Link href="#" className="text-black text-xl hover:translate-x-1 transition-transform">
          →
        </Link>
      </div>
    </motion.article>
  );
}
