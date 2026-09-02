"use client";

import React, { useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PORTFOLIO_PROJECTS, PORTFOLIO_ONE_IDS } from "@/lib/portfolioData";

type PageType = string;

const PORTFOLIO_ONE_PROJECTS = PORTFOLIO_ONE_IDS.map((id) => PORTFOLIO_PROJECTS[id]);

function ScrollCard({ project }: { project: typeof PORTFOLIO_ONE_PROJECTS[0] }) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    mass: 0.2
  });

  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.92, 1.04, 0.92]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [0.7, 1, 0.7]);

  return (
    <div 
      id={`card-${project.id}`}
      ref={cardRef} 
      className="w-full flex flex-col items-center justify-center py-8 px-4 md:px-0"
    >
      <motion.div
        style={{ scale, opacity }}
        onClick={() => {
          router.push(`/portfolio-details?id=${project.id}`);
        }}
        className="group cursor-pointer relative w-full max-w-5xl aspect-[4/3] sm:aspect-[16/9] md:aspect-[2/1] bg-neutral-900 overflow-hidden shadow-2xl rounded-2xl border border-black/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <Image
          src={project.bannerImage}
          alt={project.title}
          fill
          referrerPolicy="no-referrer"
          sizes="(max-w-5xl) 100vw, 1200px"
          priority
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />

        {/* Floating white hover circle button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-white/30 text-white text-2xl backdrop-blur-md border border-white/50 shadow-2xl transition-transform duration-300 hover:scale-110">
            ↗
          </div>
        </div>

        {/* Floating Category Tag */}
        <div className="absolute top-6 left-6">
          <span className="px-4 py-1.5 rounded-full bg-black/70 text-white text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md border border-white/20">
            {project.category}
          </span>
        </div>
      </motion.div>

      {/* Centered title below card */}
      <div className="mt-5 text-center space-y-1">
        <h3 
          className="text-2xl sm:text-3.5xl font-black text-black uppercase tracking-tight hover:text-[#f26b2c] transition-colors cursor-pointer"
          onClick={() => {
            router.push(`/portfolio-details?id=${project.id}`);
          }}
        >
          {project.title}
        </h3>
        <p className="text-xs font-mono text-neutral-500 font-bold uppercase tracking-widest">
          {project.subtitle}
        </p>
      </div>
    </div>
  );
}

export default function PortfolioOnePage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<PageType>("portfolio-one");

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

      <main className="w-full bg-[#f4f1ea] text-black min-h-screen pt-20 pb-24 overflow-hidden">
        {/* HERO TITLE SECTION */}
        <div className="max-w-4xl mx-auto text-center space-y-3 mt-8 mb-12 px-6">
          <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase font-black">
            PORTFOLIO SHOWCASE
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-black tracking-tight leading-none uppercase">
            Our Work
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

        {/* LINE-UP SCROLLING CONTAINER */}
        <div className="max-w-6xl mx-auto flex flex-col gap-8 px-6">
          {PORTFOLIO_ONE_PROJECTS.map((project) => (
            <ScrollCard key={project.id} project={project} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
