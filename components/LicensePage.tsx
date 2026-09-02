"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, ShieldCheck } from "lucide-react";

export default function LicensePage() {
  const assets = [
    {
      title: "Photography & Portraits",
      source: "Unsplash / Midjourney",
      license: "Free Web Use / CC0 License",
      details: "All team member portraits, background textures, and project visuals are fully cleared for personal and commercial digital displays.",
    },
    {
      title: "Icons & Vectors",
      source: "Lucide React / Custom SVG Assets",
      license: "MIT License",
      details: "Lucide-React vectors and custom 8-point geometric star icons used throughout the layout are fully open-source and adaptable.",
    },
    {
      title: "Typography & Web Fonts",
      source: "Google Fonts (Inter & Satoshi)",
      license: "Open Font License (OFL)",
      details: "Inter sans-serif body fonts and Satoshi block heading display typographies are freely served, modification-ready, and embeddable.",
    },
    {
      title: "Open-Source Packages",
      source: "Next.js, Framer Motion, GSAP, Tailwind CSS",
      license: "MIT License",
      details: "Underlying frameworks, layout sheets, animation timelines, and gesture recognizers are maintained under the respective MIT Licenses.",
    },
  ];

  return (
    <div className="w-full bg-[#f4f1ea] text-black">
      {/* HERO BANNER */}
      <section className="relative py-24 border-b border-black/10 bg-[#faf8f4]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-left space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-[#f26b2c] text-white text-[10px] font-bold tracking-[0.2em] px-4 py-1.5 rounded-full uppercase">
            <ShieldCheck className="w-3 h-3" />
            <span>LEGAL & USE TERMS</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-neutral-950">
            License
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 max-w-xl leading-relaxed">
            All rights, clearances, and open-source licenses covering the graphics, typography, photography, and scripts utilized on our platform.
          </p>
        </div>
      </section>

      {/* DETAILED LICENSE TERMS */}
      <section className="py-20 px-6 md:px-16 max-w-5xl mx-auto space-y-16">
        
        {/* TOP DESCRIPTION CARD */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-black/5 shadow-sm text-left grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <h2 className="text-2xl font-black uppercase text-black">
              Creative Agency Assets Clearance
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We take copyright, asset usage, and framework agreements very seriously. This platform is built entirely using open-source, CC0, or specifically generated AI assets. No unauthorized trademarks or licensed premium graphics are used in this template.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-[#f26b2c]/10 flex items-center justify-center text-[#f26b2c]">
              <FileText className="w-10 h-10" />
            </div>
          </div>
        </div>

        {/* DETAILED TABLE OF LICENSES */}
        <div className="space-y-6 text-left">
          <h3 className="text-xl font-bold uppercase text-black">
            Digital Assets List
          </h3>
          
          <div className="grid grid-cols-1 gap-6">
            {assets.map((asset, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-[2rem] p-6 md:p-8 border border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="space-y-1.5 max-w-xl">
                  <h4 className="text-lg font-bold uppercase text-neutral-950 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#f26b2c]" />
                    {asset.title}
                  </h4>
                  <p className="text-xs text-neutral-400 font-mono">
                    SOURCE: {asset.source}
                  </p>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {asset.details}
                  </p>
                </div>
                
                <div className="bg-neutral-100 px-4 py-2 rounded-xl text-xs font-bold text-neutral-700 font-mono shrink-0">
                  {asset.license}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
