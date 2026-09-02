"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight, Plus, Star } from "lucide-react";
import { gsap } from "gsap";

type PageType = string;

// Partners List with alternating default bg color flag for visual rhythm
const PARTNERS = [
  { name: "AEH", label: "FASHION STUDIO", defaultDark: false },
  { name: "Lunlap", label: "FINANCIAL APP", defaultDark: true },
  { name: "MILK", label: "EDITORIAL HOUSE", defaultDark: false },
  { name: "urban", label: "COWORKING SPACE", defaultDark: false },
  { name: "marquee", label: "CREATIVE HUB", defaultDark: false },
  { name: "Shopia", label: "E-COMMERCE", defaultDark: false },
  { name: "creatival", label: "BRAND AGENCY", defaultDark: false },
  { name: "leagone", label: "LEGAL CONSULT", defaultDark: true }
];

// Service Rows data
const SERVICES_DATA = [
  {
    num: "01",
    title: "Branding & identity",
    desc: "We blend strategy and creativity to build identities that elevate your brand presence and drive long-term growth.",
    images: [
      "/service/service-v3-branding.webp",
      "/service/service-v3-branding-3.webp",
      "/service/service-v3-branding-4.webp"
    ]
  },
  {
    num: "02",
    title: "Advertising & campaigns",
    desc: "We craft compelling campaigns and bold ideas that capture attention, amplify your message and deliver results.",
    images: [
      "/service/features-slider.webp",
      "/service/features-slider-2.webp",
      "/service/features-slider-3.webp"
    ]
  },
  {
    num: "03",
    title: "Content & copywriting",
    desc: "We shape clear narratives and persuasive copy that connect with audiences, build trust and inspire action.",
    images: [
      "/service/Blog-One.webp",
      "/service/Blog-One-2.webp",
      "/service/slider-main-image.webp"
    ]
  },
  {
    num: "04",
    title: "Web design & development",
    desc: "We design and develop seamless digital experiences that balance aesthetics, performance and scalability.",
    images: [
      "/service/digital-1.webp",
      "/service/digital-2.webp",
      "/service/crafting-image-1.webp"
    ]
  }
];

// Dark Cards Bento-grid
const DARK_CARDS = [
  {
    title: "Brand strategy",
    desc: "In-depth market research and customized strategies designed to align with your business vision and fuel long-term development.",
    image: "/service/service-v3-strategy.webp"
  },
  {
    title: "Market research",
    desc: "Targeted competitive analysis and user insights to position your brand precisely where it matters to your ideal audience.",
    image: "/service/service-v3-branding.webp"
  },
  {
    title: "Refine & improve",
    desc: "Iterative testing and refinement to keep your brand's assets, campaigns, and digital footprint modern and highly performant.",
    image: "/service/service-v3-drop-3.webp"
  }
];

// Slide/Stack images for "Creative Solutions"
const SLIDE_IMAGES = [
  "/service/features-slider.webp",
  "/service/slider-main-image.webp",
  "/service/service-v3.webp"
];

export default function ServicesOnePage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<PageType>("services-one");
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [stackIndex, setStackIndex] = useState(0);

  // References for GSAP Heading Animation on Scroll
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const cycleStack = () => {
    setStackIndex((prev) => (prev + 1) % SLIDE_IMAGES.length);
  };

  const onContactClick = () => {
    router.push("/contact");
  };

  // GSAP Intersection Observer setup for "Our Services" Headline character split animation
  useEffect(() => {
    if (!headlineRef.current) return;

    const chars = headlineRef.current.querySelectorAll<HTMLElement>("[data-char]");
    
    // Initial hidden state matching the home page design
    gsap.set(chars, { yPercent: 40, opacity: 0 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline();
            tl.to(chars, {
              yPercent: 0,
              opacity: 1,
              duration: 0.65,
              ease: "power3.out",
              stagger: 0.015,
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.01 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Word & letter character splitting helpers for standard Home Page headings animation
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
          style={{ transitionDelay: `${baseDelay + i * 0.02}s` }}
        >
          {ch}
        </span>
      </span>
    ));

  const renderLine = (line: string) => {
    const words = line.split(" ");
    return (
      <span className="flex flex-wrap items-end justify-start gap-x-[0.25em] overflow-hidden text-left">
        {words.map((w, i) => (
          <span key={i} className="inline-flex overflow-hidden">
            {renderWord(w, i * 0.04)}
          </span>
        ))}
      </span>
    );
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

      <main className="w-full bg-[#f4f1ea] text-black min-h-screen overflow-hidden">
        
        {/* HERO SECTION - FIRST ITEM IMAGE WITH PARALLAX EFFECT OVERLAY */}
        <section className="relative w-full h-[60vh] min-h-[480px] flex flex-col justify-center items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/service/service-v3-hero-image.webp"
              alt="Services header scenery"
              fill
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
            {/* Elegant dark overlay matching About page */}
            <div className="absolute inset-0 bg-black/35" />
          </div>

          {/* Content overlay */}
          <div className="relative z-10 text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[11px] font-bold tracking-[0.3em] text-white/90 uppercase mb-3 font-mono"
            >
              EXPERTISE & BRAND SUCCESS
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight"
            >
              Our Services
            </motion.h1>
          </div>
        </section>

        {/* SECTION 1: TRUSTED BY LOGO GRID - ENLARGED WITH SLIDING HOVER INVERSION */}
        <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#f26b2c] uppercase font-black block">
              TRUSTED BY 150,000+ FOUNDERS & BUSINESS OWNERS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-black uppercase tracking-tight max-w-2xl mx-auto leading-tight">
              Creative solutions powered by lasting partner trust
            </h2>
          </div>

          {/* Grid of Typographic Client Logo Blocks with Straight Corners - Enlarged and Alternating */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/15 border border-black/15 rounded-none overflow-hidden mt-8">
            {PARTNERS.map((partner, index) => {
              const isDark = partner.defaultDark;
              return (
                <div
                  key={index}
                  className={`relative aspect-[1.3/1] min-h-[180px] sm:min-h-[220px] flex flex-col items-center justify-center p-8 transition-colors duration-500 ease-out cursor-pointer group overflow-hidden ${
                    isDark 
                      ? "bg-neutral-900 text-white hover:bg-[#f4f1ea] hover:text-black" 
                      : "bg-[#f4f1ea] text-black hover:bg-neutral-900 hover:text-white"
                  }`}
                >
                  {/* Sliding Name Container */}
                  <div className="relative overflow-hidden h-10 w-full flex flex-col items-center justify-center select-none">
                    {/* First Word: Slides up and out */}
                    <span
                      className={`block font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter transition-all duration-500 transform group-hover:-translate-y-full ${
                        isDark 
                          ? "text-white opacity-90 group-hover:text-black group-hover:opacity-100" 
                          : "text-black opacity-80 group-hover:text-white group-hover:opacity-100"
                      }`}
                    >
                      {partner.name}
                    </span>

                    {/* Second Word: Slides up into center */}
                    <span
                      className={`absolute font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter transition-all duration-500 transform translate-y-full group-hover:translate-y-0 ${
                        isDark ? "text-black" : "text-white"
                      }`}
                    >
                      {partner.name}
                    </span>
                  </div>

                  {/* Sliding Subtitle Label Container */}
                  <div className="relative overflow-hidden h-4 w-full flex flex-col items-center justify-center select-none mt-1">
                    {/* First Label: Slides up and out */}
                    <span
                      className={`block font-mono text-[9px] tracking-widest uppercase transition-all duration-500 transform group-hover:-translate-y-full ${
                        isDark ? "text-neutral-400 group-hover:text-neutral-500" : "text-neutral-500 group-hover:text-neutral-400"
                      }`}
                    >
                      {partner.label}
                    </span>

                    {/* Second Label: Slides up into center */}
                    <span
                      className={`absolute font-mono text-[9px] tracking-widest uppercase transition-all duration-500 transform translate-y-full group-hover:translate-y-0 ${
                        isDark ? "text-neutral-500" : "text-neutral-400"
                      }`}
                    >
                      {partner.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: WHO WE ARE HERO */}
        <section className="max-w-7xl mx-auto py-20 px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left block info */}
          <div className="lg:col-span-7 space-y-10 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/50 px-4 py-1.5 text-xs text-neutral-800 font-bold uppercase tracking-wider shadow-sm">
              <Plus className="w-4 h-4 text-[#f26b2c] stroke-[2.5]" />
              <span>Who we are</span>
            </div>

            <h1 className="text-2.5xl sm:text-4xl lg:text-6xl font-black text-black leading-tight uppercase tracking-tight">
              We combine thoughtful strategy and bold creativity to create brand identities that truly stand out in the market
            </h1>

            <div className="h-px bg-black/10 w-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 items-start">
              <div className="space-y-4">
                <h3 className="text-lg font-black uppercase tracking-tight text-neutral-900">
                  Where vision becomes visual identity
                </h3>
                <p className="text-xs leading-relaxed text-neutral-600 font-semibold">
                  We combine strategic insight with bold creativity to build brand identities that truly stand out. By understanding what makes your business unique, we create impactful visuals and messaging that enhance recognition.
                </p>

                {/* Orange Button */}
                <button
                  onClick={() => router.push("/portfolio-details")}
                  className="group mt-6 inline-flex items-center gap-2.5 bg-[#f26b2c] hover:bg-black text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all duration-300 pointer-events-auto"
                >
                  <span>Elevate your brand</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

              {/* Avatars pile list */}
              <div className="flex flex-col gap-4 justify-center h-full bg-white/40 p-6 border border-black/5 rounded-2xl shadow-sm">
                <div className="flex -space-x-4">
                  {["/images/idotive-home-athour-1.webp", "/images/idotive-home-athour-2.webp", "/images/idotive-home-athour-3.webp"].map((img, idx) => (
                    <div key={idx} className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <Image
                        src={img}
                        alt="Author Team Avatar"
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border border-neutral-300 text-[#f26b2c] flex items-center justify-center text-sm font-black bg-white shadow-md">
                    +
                  </div>
                </div>
                <div>
                  <span className="text-xl font-black text-black block tracking-tight leading-none">
                    4.5 million
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
                    HAPPY CLIENTS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right block large portrait */}
          <div className="lg:col-span-5 h-full">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-xl border border-black/15 group">
              <Image
                src="/service/idotive-service-v3-image.webp"
                alt="Who we are main theme image"
                fill
                referrerPolicy="no-referrer"
                sizes="(max-w-[600px]) 100vw, 600px"
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                priority
              />
            </div>
          </div>
        </section>

        {/* SECTION 3: CONTINUOUS SLIDING INFINITE MARQUEE */}
        <section className="w-full bg-white border-y border-black/10 py-6 overflow-hidden flex">
          <div className="marquee-track flex whitespace-nowrap gap-8 items-center shrink-0 animate-marquee-loop">
            {Array.from({ length: 8 }).map((_, outerIdx) => (
              <React.Fragment key={outerIdx}>
                <span className="text-3xl sm:text-5xl font-black uppercase text-black flex items-center gap-8">
                  <span>Crafting brands</span>
                  
                  {/* Miniature Circle Image inside Marquee */}
                  <div className="relative w-12 h-7 sm:w-16 sm:h-9 overflow-hidden rounded-full border border-black/15 shrink-0 inline-block">
                    <Image
                      src={outerIdx % 2 === 0 ? "/images/idotive-home-athour-1.webp" : "/images/idotive-home-athour-2.webp"}
                      alt="Mini brand illustration"
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  
                  <span>Visual design</span>
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 text-[#f26b2c] fill-[#f26b2c] stroke-none shrink-0" />
                </span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* SECTION 4: PARTNERS & SERVICE ROW HOVER GALLERY - HEADINGS WITH GSAP CHARACTER STAGGER */}
        <section ref={sectionRef} className="max-w-7xl mx-auto py-24 px-6 md:px-16 text-left">
          <div className="space-y-4 mb-16">
            <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase font-black">
              OUR SERVICES
            </span>
            <h2
              ref={headlineRef}
              className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-none uppercase max-w-3xl"
            >
              {renderLine("Building meaningful brand presence through strategy led creativity")}
            </h2>
          </div>

          {/* Service Accordion-Rows */}
          <div className="flex flex-col border-t border-black/10">
            {SERVICES_DATA.map((service, index) => {
              const isHovered = hoveredService === index;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                  onClick={() => router.push("/portfolio-details")}
                  className="group relative border-b border-black/10 py-10 px-4 transition-all duration-500 cursor-pointer"
                >
                  {/* Subtle Background Highlight Grid block */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-white/40 z-0 pointer-events-none"
                  />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    {/* Index & Title */}
                    <div className="flex items-center gap-6 md:w-1/3">
                      <span className="text-sm font-mono font-black text-neutral-400">
                        {service.num}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black uppercase text-black tracking-tight group-hover:text-[#f26b2c] transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-xs sm:text-sm text-neutral-500 font-medium leading-relaxed md:w-1/3">
                      {service.desc}
                    </p>

                    {/* Right elements: Image Row & Button */}
                    <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/3">
                      
                      {/* Floating Gallery of 3 Images (Slides up & Scales on Hover) */}
                      <div className="relative h-16 w-48 overflow-visible hidden sm:flex items-center justify-center">
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 15, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute flex items-center gap-1 bg-white/95 border border-black/10 p-1.5 shadow-xl rounded-xl backdrop-blur-md z-20"
                            >
                              {service.images.map((img, imgIdx) => (
                                <div
                                  key={imgIdx}
                                  className="relative w-12 h-12 overflow-hidden rounded-md border border-black/5"
                                >
                                  <Image
                                    src={img}
                                    alt="Service Preview Card"
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                  />
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Transparent Arrow Icon */}
                      <ArrowRight className="w-6 h-6 text-black group-hover:text-[#f26b2c] transition-colors duration-300 transform group-hover:translate-x-1" />
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: BRAND CONFIDENCE PROMO */}
        <section className="bg-white border-y border-black/10 py-24 px-6 md:px-16 text-left">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Glass wrap high fashion portrait */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-black/15 shadow-xl group">
                <Image
                  src="/service/service-v3.webp"
                  alt="Glass fashion visual aesthetic"
                  fill
                  sizes="(max-w-[600px]) 100vw, 600px"
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Column: Copywriting & Desert sub-card */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black leading-tight uppercase tracking-tight">
                  Giving your brand the confidence to stand out and lead with purpose
                </h2>
                <p className="text-sm leading-relaxed text-neutral-600 font-semibold">
                  We combine strategic insight with bold creativity to build brand identities that truly stand out. By understanding what makes your business unique, we create visual stories that speak directly to your audience.
                </p>

                {/* Grow button */}
                <button
                  onClick={() => router.push("/portfolio-details")}
                  className="group inline-flex items-center gap-2.5 bg-[#f26b2c] hover:bg-black text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all duration-300"
                >
                  <span>Grow your brand</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>

              <div className="h-px bg-black/10 w-full" />

              {/* Sub-row with details and landscape image */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-lg font-black uppercase tracking-tight text-neutral-900">
                    Creativity that propels brand growth
                  </h3>
                  <p className="text-xs leading-relaxed text-neutral-500 font-semibold">
                    Strategic creativity that boosts your brand's presence, engages your audience, and drives meaningful growth across every single client touchpoint.
                  </p>
                </div>

                {/* Sub-card landscape image on the right */}
                <div className="md:col-span-5">
                  <div className="relative aspect-[1.5/1] w-full overflow-hidden rounded-xl border border-black/10 shadow-md group">
                    <Image
                      src="/service/slider-main-image.webp"
                      alt="Desert Landscape Accent Card"
                      fill
                      sizes="(max-w-[300px]) 100vw, 300px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 6: METHODOLOGY THREE CARDS (WHITE/BLACK -> BLACK/WHITE HOVER, ENLARGED, NO BG ICONS) */}
        <section className="bg-[#faf8f4] py-28 px-6 md:px-16 text-left border-t border-b border-black/10">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Header info */}
            <div className="space-y-4 max-w-3xl">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#f26b2c] uppercase font-black">
                OUR METHODOLOGY
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight leading-none uppercase">
                Boosting brand visibility trust and audience connection
              </h2>
            </div>

            {/* Grid of luxury interactive cards - White/Black to Black/White hover, Enlarged */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {DARK_CARDS.map((card, idx) => {
                // Select Lucide Icon per card
                const IconComponent = idx === 0 ? Star : idx === 1 ? ArrowUpRight : Plus;
                return (
                  <motion.div
                    key={idx}
                    onClick={() => router.push("/portfolio-details")}
                    className="group relative bg-white border border-black/15 rounded-3xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:shadow-2xl min-h-[500px]"
                    animate={{
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    }}
                    whileHover={{
                      backgroundColor: "rgba(10, 10, 10, 1)",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {/* Card Header */}
                    <div className="flex justify-between items-center z-10">
                      <span className="text-xs font-mono text-[#f26b2c] font-black uppercase tracking-widest">
                        PHASE {idx + 1}
                      </span>
                      {/* Transparent Icon, NO background color attached */}
                      <IconComponent className="w-6 h-6 text-black group-hover:text-[#f26b2c] transition-colors duration-300" />
                    </div>

                    {/* Hover Zoom Image Container */}
                    <div className="relative aspect-[1.8/1] w-full overflow-hidden rounded-2xl border border-black/5 bg-neutral-100 my-8 z-10">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-w-[400px]) 100vw, 400px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Text Details */}
                    <div className="space-y-3 z-10">
                      <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black group-hover:text-white transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300 font-medium">
                        {card.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* SECTION 7: CREATIVE SOLUTIONS LAYERED STACK SHUFFLER */}
        <section className="bg-[#f4f1ea] py-24 px-6 md:px-16 text-left border-t border-black/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side wording & clicker arrow button */}
            <div className="lg:col-span-5 space-y-8">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#f26b2c] uppercase font-black">
                OUR IMPACT
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black leading-tight uppercase tracking-tight">
                Creative solutions that shape ideas into remarkable brand achievements
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-semibold leading-relaxed">
                Our recent projects highlight our dedication to strategy, creativity, and structural perfection. Click the shuffle control to browse our active showcases.
              </p>

              {/* Stack click controller arrow */}
              <button
                onClick={cycleStack}
                className="w-14 h-14 rounded-full flex items-center justify-center bg-black text-white hover:bg-[#f26b2c] transition-all duration-300 shadow-lg transform active:scale-95 group"
              >
                <ArrowRight className="w-6 h-6 transition-transform duration-500 group-hover:rotate-180" />
              </button>
            </div>

            {/* Right side interactive card deck */}
            <div className="lg:col-span-7 flex justify-center items-center py-10">
              <div className="relative w-full max-w-md aspect-[1.2/1] h-[320px] sm:h-[400px]">
                {SLIDE_IMAGES.map((img, idx) => {
                  const relativeIdx = (idx - stackIndex + SLIDE_IMAGES.length) % SLIDE_IMAGES.length;
                  const isActive = relativeIdx === 0;

                  return (
                    <motion.div
                      key={idx}
                      style={{
                        zIndex: SLIDE_IMAGES.length - relativeIdx,
                      }}
                      animate={{
                        scale: isActive ? 1 : 0.95 - relativeIdx * 0.05,
                        y: relativeIdx * 18,
                        x: relativeIdx * 12,
                        rotate: relativeIdx * -2,
                        opacity: isActive ? 1 : 0.45 - relativeIdx * 0.15,
                      }}
                      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => {
                        if (isActive) {
                          router.push("/portfolio-details");
                        } else {
                          cycleStack();
                        }
                      }}
                      className="absolute inset-0 w-full h-full rounded-2xl border border-black/10 overflow-hidden shadow-xl bg-white cursor-pointer origin-bottom"
                    >
                      <Image
                        src={img}
                        alt="Creative solution portfolio card"
                        fill
                        sizes="(max-w-[500px]) 100vw, 500px"
                        className="object-cover"
                        priority={idx === 0}
                      />

                      {/* Hover / click overlay */}
                      {isActive && (
                        <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-white/25 text-white flex items-center justify-center border border-white/40 shadow-xl backdrop-blur-md">
                            ↗
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 8: CREATIVE CARD CHOREOGRAPHY (NO PEOPLE, OBJECTS/PLACES) */}
        <section className="py-24 px-6 md:px-16 bg-[#f4f1ea] text-black text-center border-t border-black/10 relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-6 mb-16">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#f26b2c] uppercase font-black">
              DESIGN MOTION
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase text-black leading-tight tracking-tight">
              CHOREOGRAPHED SPACE
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-semibold max-w-2xl mx-auto leading-relaxed">
              Watch our creative concepts glide through three-dimensional space. An elegant dance of structures, angles, and architectural expressions.
            </p>
          </div>

          {/* Interactive Choreographed Cards Stage */}
          <div className="relative w-full max-w-5xl mx-auto h-[480px] flex items-center justify-center overflow-hidden bg-neutral-900 rounded-3xl shadow-2xl border border-black/10 p-8 group">
            {/* Ambient Background Light Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/20 via-transparent to-black pointer-events-none" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f26b2c_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Animation Stage */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Card 1 (Left to Right movement) */}
              <motion.div
                className="absolute w-[220px] h-[300px] sm:w-[280px] sm:h-[360px] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                style={{ originX: 0.5, originY: 0.5 }}
                animate={{
                  x: ["-120%", "120%", "-120%"],
                  rotate: [-6, 6, -6],
                  scale: [0.9, 1, 0.9],
                  zIndex: [10, 30, 10],
                }}
                transition={{
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <div className="absolute inset-0 bg-black/15 z-10" />
                <Image
                  src="/service/crafting-image-1.webp"
                  alt="Modern office architectural structure"
                  fill
                  sizes="(max-w-[300px]) 100vw, 300px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
                  <span className="text-[10px] font-mono tracking-wider text-[#f26b2c] font-black uppercase bg-black/60 px-2 py-1 rounded">
                    PERSPECTIVE I
                  </span>
                  <h4 className="text-sm font-black text-white mt-2 drop-shadow-md">STRUCTURE</h4>
                </div>
              </motion.div>

              {/* Card 2 (Center following Card 1) */}
              <motion.div
                className="absolute w-[220px] h-[300px] sm:w-[280px] sm:h-[360px] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                style={{ originX: 0.5, originY: 0.5 }}
                animate={{
                  x: ["0%", "-120%", "120%", "0%"],
                  rotate: [0, -6, 6, 0],
                  scale: [1, 0.9, 1, 1],
                  zIndex: [20, 10, 30, 20],
                }}
                transition={{
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <div className="absolute inset-0 bg-black/15 z-10" />
                <Image
                  src="/service/crafting-image-2.webp"
                  alt="Minimalist design interior object"
                  fill
                  sizes="(max-w-[300px]) 100vw, 300px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
                  <span className="text-[10px] font-mono tracking-wider text-[#f26b2c] font-black uppercase bg-black/60 px-2 py-1 rounded">
                    PERSPECTIVE II
                  </span>
                  <h4 className="text-sm font-black text-white mt-2 drop-shadow-md">CHOREOGRAPHY</h4>
                </div>
              </motion.div>

              {/* Card 3 (Right to Center, and follow-through) */}
              <motion.div
                className="absolute w-[220px] h-[300px] sm:w-[280px] sm:h-[360px] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                style={{ originX: 0.5, originY: 0.5 }}
                animate={{
                  x: ["120%", "0%", "-120%", "120%"],
                  rotate: [6, 0, -6, 6],
                  scale: [1, 1, 0.9, 1],
                  zIndex: [30, 20, 10, 30],
                }}
                transition={{
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <div className="absolute inset-0 bg-black/15 z-10" />
                <Image
                  src="/service/crafting-image-3.webp"
                  alt="Vast desert horizon landscape"
                  fill
                  sizes="(max-w-[300px]) 100vw, 300px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
                  <span className="text-[10px] font-mono tracking-wider text-[#f26b2c] font-black uppercase bg-black/60 px-2 py-1 rounded">
                    PERSPECTIVE III
                  </span>
                  <h4 className="text-sm font-black text-white mt-2 drop-shadow-md">HORIZON</h4>
                </div>
              </motion.div>
            </div>

            {/* Custom Interactive Trigger Controls on Hover */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-2 rounded-full border border-white/10 text-[10px] font-mono text-white/80 tracking-widest uppercase flex items-center gap-2 pointer-events-none">
              <span className="w-1.5 h-1.5 bg-[#f26b2c] rounded-full animate-ping" />
              <span>DYNAMIC OBJECTS FEED</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* CSS Styles */}
      <style jsx global>{`
        @keyframes marquee-loop {
          from { transform: translateX(0%); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-loop {
          animation: marquee-loop 30s linear infinite;
        }
      `}</style>
    </>
  );
}
