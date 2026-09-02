"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ArrowRight, Sparkles } from "lucide-react";

export default function StyleGuidePage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colors = [
    { name: "Brand Orange", hex: "#f26b2c", desc: "Primary Brand Accent" },
    { name: "Deep Charcoal", hex: "#111111", desc: "Text & Core Contrasts" },
    { name: "Cosmic Black", hex: "#000000", desc: "Dark Sections & Rails" },
    { name: "Warm Off-White", hex: "#faf8f3", desc: "Alternative Background" },
    { name: "Sandy Beige", hex: "#f4f1ea", desc: "Default Page Canvas" },
  ];

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="w-full bg-[#f4f1ea] text-black">
      {/* HERO SECTION */}
      <section className="relative py-24 border-b border-black/10 bg-[#faf8f3]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-left space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-[#f26b2c] text-white text-[10px] font-bold tracking-[0.2em] px-4 py-1.5 rounded-full uppercase">
            <Sparkles className="w-3 h-3" />
            <span>DESIGN SYSTEM</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-neutral-950">
            Style guide
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 max-w-xl leading-relaxed">
            A showcase of the visual foundation, typography rules, interactive states, and color harmonies that compose our brand identity.
          </p>
        </div>
      </section>

      {/* CORE SYSTEM DETAILS */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto space-y-24">
        
        {/* 1. COLOR SYSTEM */}
        <div className="space-y-8 text-left">
          <div className="border-b border-black/10 pb-4">
            <h2 className="text-2xl font-black uppercase text-black">
              01. Color Palette
            </h2>
            <p className="text-xs text-neutral-500 mt-1 uppercase font-mono tracking-wider">Tone & contrast values</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {colors.map((color) => {
              const isCopied = copiedColor === color.hex;
              return (
                <div 
                  key={color.hex} 
                  className="bg-white rounded-2xl p-4 border border-black/5 shadow-sm space-y-4 hover:shadow-md transition-shadow duration-300 group"
                >
                  <div 
                    className="w-full aspect-[4/3] rounded-xl relative overflow-hidden flex items-end justify-end p-2 cursor-pointer shadow-inner border border-black/5"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => copyToClipboard(color.hex)}
                  >
                    <button className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                      {isCopied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-600" />}
                    </button>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-neutral-900">{color.name}</h3>
                    <p className="text-xs text-neutral-400 font-mono uppercase mt-0.5">{color.hex}</p>
                    <p className="text-[11px] text-neutral-500 font-medium mt-1 leading-tight">{color.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. TYPOGRAPHY SYSTEM */}
        <div className="space-y-8 text-left">
          <div className="border-b border-black/10 pb-4">
            <h2 className="text-2xl font-black uppercase text-black">
              02. Typography
            </h2>
            <p className="text-xs text-neutral-500 mt-1 uppercase font-mono tracking-wider">Fonts, scales & line heights</p>
          </div>

          <div className="space-y-12 bg-white rounded-[2rem] p-8 md:p-12 border border-black/5 shadow-sm">
            {/* Display Font */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 border-b border-black/5 pb-8">
              <div className="space-y-1">
                <p className="font-mono text-xs uppercase text-neutral-400">Display Heading</p>
                <h4 className="font-black text-sm uppercase">Satoshi</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">Used for hero headers, big display metrics, and main sections.</p>
              </div>
              <div className="md:col-span-3 space-y-4">
                <h1 className="text-5xl sm:text-6xl font-black uppercase text-black">
                  The Crew
                </h1>
                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-black">
                  Brand success
                </h2>
              </div>
            </div>

            {/* Body Sans */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 border-b border-black/5 pb-8">
              <div className="space-y-1">
                <p className="font-mono text-xs uppercase text-neutral-400">Body & Controls</p>
                <h4 className="font-black text-sm uppercase">Inter / Sans</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">Primary sans-serif typeface used for description, buttons, and system controls.</p>
              </div>
              <div className="md:col-span-3 space-y-4">
                <p className="text-lg text-neutral-800 leading-relaxed max-w-2xl font-sans">
                  We blend strategy and creativity to build digital identities that elevate brand presence and drive long-term business performance across all campaigns.
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed max-w-2xl font-sans">
                  We blend strategy and creativity to build digital identities that elevate brand presence and drive long-term business performance across all campaigns.
                </p>
              </div>
            </div>

            {/* Monospace font */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12">
              <div className="space-y-1">
                <p className="font-mono text-xs uppercase text-neutral-400">Data / Indicators</p>
                <h4 className="font-black text-sm uppercase">JetBrains Mono</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">Used for statistics, numerical indices, active pills, and timeline indexes.</p>
              </div>
              <div className="md:col-span-3 space-y-2">
                <p className="font-mono text-lg text-neutral-800">
                  01 / CAPABILITIES / 98%
                </p>
                <p className="font-mono text-sm text-neutral-500 uppercase tracking-widest">
                  Brand guidelines / print campaign
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BUTTONS & CONTROLS */}
        <div className="space-y-8 text-left">
          <div className="border-b border-black/10 pb-4">
            <h2 className="text-2xl font-black uppercase text-black">
              03. UI Elements & Buttons
            </h2>
            <p className="text-xs text-neutral-500 mt-1 uppercase font-mono tracking-wider">Interactivity and active states</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Primary Button */}
            <div className="bg-white rounded-[2rem] p-8 border border-black/5 flex flex-col justify-between items-start h-64 shadow-sm">
              <div className="space-y-1">
                <h4 className="font-bold text-xs uppercase tracking-widest text-neutral-400 font-mono">Primary Button</h4>
                <p className="text-xs text-neutral-500">Black sliding transition to brand orange with sliding text reveal on hover.</p>
              </div>
              
              <button className="group relative inline-flex h-[48px] items-center justify-center overflow-hidden rounded-none bg-black px-8 text-xs font-bold uppercase tracking-widest text-white transition-colors duration-300 cursor-pointer w-full sm:w-auto">
                <span className="absolute inset-0 h-full w-full translate-y-full bg-[#f26b2c] transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <span className="relative z-10 block h-4 overflow-hidden">
                  <span className="block transform transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    Learn More
                  </span>
                  <span className="absolute left-0 top-0 block translate-y-full transform transition-transform duration-300 ease-out group-hover:translate-y-0">
                    Learn More
                  </span>
                </span>
              </button>
            </div>

            {/* Text Link & Pills */}
            <div className="bg-white rounded-[2rem] p-8 border border-black/5 flex flex-col justify-between items-start h-64 shadow-sm">
              <div className="space-y-1">
                <h4 className="font-bold text-xs uppercase tracking-widest text-neutral-400 font-mono">Pills & Text Links</h4>
                <p className="text-xs text-neutral-500">Pills represent capabilities, text links allow seamless subpage navigation.</p>
              </div>

              <div className="space-y-4 w-full">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block bg-[#f26b2c] text-white text-[9px] font-bold tracking-[0.2em] px-3.5 py-1.5 rounded-full uppercase">
                    BRAND SUCCESS
                  </span>
                  <span className="rounded-full border border-neutral-300 px-3.5 py-1.5 text-[10px] font-bold text-neutral-600 bg-[#f4f1ea] uppercase tracking-wider">
                    Strategy
                  </span>
                </div>

                <button className="group text-[10px] font-bold tracking-widest uppercase text-black hover:text-[#f26b2c] transition-colors duration-300 flex items-center gap-1.5 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f26b2c] group-hover:scale-150 transition-transform duration-200" />
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Custom Interactive Badges */}
            <div className="bg-white rounded-[2rem] p-8 border border-black/5 flex flex-col justify-between items-start h-64 shadow-sm">
              <div className="space-y-1">
                <h4 className="font-bold text-xs uppercase tracking-widest text-neutral-400 font-mono">Interactive Badges</h4>
                <p className="text-xs text-neutral-500">Pulsing indicator buttons and custom expandable accordion indexes.</p>
              </div>

              <div className="flex gap-4 items-center">
                <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f26b2c] text-white text-xl font-light hover:scale-110 transition-transform shadow-sm">
                  +
                </button>
                <div className="font-mono text-sm font-semibold text-neutral-500">
                  <span className="text-black font-bold mr-2">01</span>
                  Our Accordion Index
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
