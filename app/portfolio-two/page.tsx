"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PORTFOLIO_PROJECTS, PORTFOLIO_TWO_IDS } from "@/lib/portfolioData";

type PageType = string;

const PORTFOLIO_TWO_PROJECTS = PORTFOLIO_TWO_IDS.map((id) => PORTFOLIO_PROJECTS[id]);

function WorkCard({ project }: { project: typeof PORTFOLIO_TWO_PROJECTS[0] }) {
  const router = useRouter();
  return (
    <article 
      onClick={() => {
        router.push(`/portfolio-details?id=${project.id}`);
      }}
      className="group cursor-pointer w-full text-left"
    >
      {/* Horizontal Image Container */}
      <div className="relative aspect-[16/10] sm:aspect-[2/1] overflow-hidden rounded-2xl bg-neutral-900 border border-black/10 shadow-lg">
        <Image
          src={project.bannerImage}
          alt={project.title}
          fill
          referrerPolicy="no-referrer"
          sizes="(max-w-[800px]) 100vw, 800px"
          className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:blur-[2px]"
        />

        {/* Marquee horizontal stripe and circular arrow on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-black/10">
          
          {/* Moving track banner */}
          <div className="absolute inset-x-0 bg-white py-3.5 shadow-md transform -translate-y-1/2 top-1/2 border-y border-black/10 overflow-hidden flex">
            <div className="marquee-track flex whitespace-nowrap gap-6 items-center shrink-0 animate-marquee-spin">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="flex items-center gap-3 font-black text-xs uppercase tracking-widest text-black">
                  <span>{project.title}</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f26b2c] inline-block" />
                </span>
              ))}
            </div>
          </div>

          {/* Glowing cursor button in center */}
          <div className="z-10 transition-transform duration-500 scale-90 group-hover:scale-100">
            <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-white/30 text-white text-2xl backdrop-blur-md border border-white/50 shadow-2xl transition-transform duration-300 hover:scale-105">
              ↗
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4">
          <span className="px-3.5 py-1 rounded-full bg-black/80 text-white text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md border border-white/20">
            {project.category}
          </span>
        </div>
      </div>

      {/* Info details row */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-black uppercase hover:text-[#f26b2c] transition-colors">
            {project.title}
          </h3>
          <p className="text-xs font-mono text-neutral-500 font-bold uppercase tracking-wider mt-1">
            {project.subtitle}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="rounded-full border border-neutral-300 px-3.5 py-1 text-[11px] text-neutral-700 bg-white/90 font-bold uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button 
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-black text-white shrink-0 hover:bg-[#f26b2c] transition-colors duration-300 shadow-md"
        >
          →
        </button>
      </div>
    </article>
  );
}

export default function PortfolioTwoPage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<PageType>("portfolio-two");

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

      <main className="w-full bg-[#f4f1ea] text-black min-h-screen pt-20 pb-24 px-6 md:px-16 overflow-hidden">
        {/* HERO HEADER TITLE */}
        <div className="max-w-7xl mx-auto text-center space-y-3 mt-8 mb-14">
          <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase font-black">
            PORTFOLIO STUDIO
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-black tracking-tight leading-none uppercase">
            Our Studio
          </h1>

          {/* SPINNING ORANGE STAR */}
          <div className="flex justify-center pt-4">
            <motion.div
              animate={{ rotate: -360 }}
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

        {/* TWO COLUMN GRID OF WORKCARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {PORTFOLIO_TWO_PROJECTS.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
