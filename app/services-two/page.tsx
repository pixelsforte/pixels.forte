"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, ArrowRight, ArrowLeft, Plus, Star } from "lucide-react";
import Testimonials from "@/components/Testimonials";

type PageType = string;

// Slider Data
const SLIDER_ITEMS = [
  {
    title: "Purpose driven design for future brands",
    desc: "We build distinctive brand solutions for modern innovators, uniting strategic vision and creative precision to enhance visibility, earn credibility and drive long-term success in a dynamic marketplace.",
    image: "/service/features-slider-2.webp",
  },
  {
    title: "Refined visual design for future brands",
    desc: "We create elevated brand identities for progressive businesses, merging strategic thinking with creative expertise to amplify presence, foster trust and fuel enduring growth in a constantly shifting landscape.",
    image: "/service/features-slider-3.webp",
  },
  {
    title: "Distinguished design for future focused brands",
    desc: "We craft distinguished design for future-focused brands, combining strategic insight and creative excellence to strengthen recognition, build trust, and support lasting growth in an ever-changing market.",
    image: "/service/features-slider-4.webp",
  },
  {
    title: "Elevated design for future focused brands",
    desc: "We design refined experiences for forward-thinking brands, blending strategic clarity with creative mastery to elevate identity, inspire confidence, and enable sustainable growth in a rapidly evolving world.",
    image: "/service/features-slider.webp",
  }
];

// Overlapping Cards Data
const OVERLAP_CARDS = [
  {
    title: "Branding & identity",
    desc: "We shape compelling brand experiences built on strong strategic insight and realized through smart design, authentic storytelling, and flawless execution that ensures every detail connects and performs.",
    image: "/service/service-v3-branding.webp",
    bgColor: "bg-[#e5ddcd]",
  },
  {
    title: "Advertising & campaigns",
    desc: "We craft campaigns that capture attention and drive results, combining creative concepts, compelling visuals, and strategic messaging across all channels.",
    image: "/service/service-v3-branding-v2.webp",
    bgColor: "bg-[#f3dcd4]",
  },
  {
    title: "Content & storytelling",
    desc: "We shape clear narratives and persuasive copy that connect with audiences, build trust and inspire action.",
    image: "/service/service-v3-branding-3.webp",
    bgColor: "bg-[#d1e0d7]",
  },
  {
    title: "Web design & development",
    desc: "We design and develop seamless digital experiences that balance aesthetics, performance and scalability.",
    image: "/service/service-v3-branding-4.webp",
    bgColor: "bg-[#e3dcd3]",
  }
];

// Brand slider cards (for section 5)
const BRAND_CARDS = [
  { title: "Markivo", desc: "Design & Campaign", img: "/images/idotive-boy-image.webp" },
  { title: "Creativo", desc: "Brand Strategy", img: "/service/slider-main-image.webp" },
  { title: "Vibe", desc: "Digital Identity", img: "/service/crafting-image-1.webp" },
  { title: "Sleek", desc: "Minimal Object", img: "/service/service-v3.webp" },
];

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const duration = 1800; // 1.8 seconds for smooth elite transition
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function - easeOutQuad
        const easeProgress = progress * (2 - progress);
        const currentCount = Math.floor(easeProgress * (end - start) + start);
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function ServicesTwoPage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<PageType>("services-two");
  const [slideIndex, setSlideIndex] = useState(0);

  const onContactClick = () => {
    router.push("/contact");
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Dynamic panel widths that sum to exactly 100%
  const p1Width = useTransform(scrollYProgress, [0, 0.35, 0.7], ["50%", "30%", "0%"]);
  const p2Width = useTransform(scrollYProgress, [0, 0.35, 0.7, 1.0], ["35%", "50%", "65%", "50%"]);
  const p3Width = useTransform(scrollYProgress, [0, 0.35, 0.7, 1.0], ["15%", "20%", "35%", "50%"]);

  // Opacities for micro-interactions
  const p1Overlay = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.3]);
  const p1ContentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const p1TextOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.5], [0, 1, 1, 0]);
  const p2TextOpacity = useTransform(scrollYProgress, [0, 0.25], [0.4, 1]);
  const p3TextOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0.4, 1]);

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
        
        {/* HERO SECTION */}
        <section className="relative w-full h-[60vh] min-h-[480px] flex flex-col justify-center items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/service/service-v3-hero-image.webp"
              alt="Services header background"
              fill
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/45" />
          </div>

          {/* Floating Rotating Orange/Red Sticker in Center */}
          <div className="absolute inset-0 flex items-center justify-center z-5 pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="relative w-72 h-72 opacity-60 sm:opacity-75"
            >
              <Image
                src="/icons/idotive-icon-8.png"
                alt="Rotating Star Graphic"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>

          {/* Content overlay */}
          <div className="relative z-10 text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[11px] font-bold tracking-[0.3em] text-white/90 uppercase mb-3 font-mono"
            >
              WHAT WE CREATE
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase"
            >
              Our service
            </motion.h1>
          </div>
        </section>

        {/* SECTION 2: SPLIT SCREEN SLIDER */}
        <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Fixed Left Large Image */}
            <div className="lg:col-span-6 w-full h-full flex justify-center items-center">
              <div className="relative aspect-[3/4] w-full max-w-[500px] overflow-hidden rounded-2xl border border-black/15 shadow-xl group">
                <Image
                  src="/service/service-card.png"
                  alt="Service Visual Representative"
                  fill
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103"
                  priority
                />
              </div>
            </div>

            {/* Right Column: Sliding Content Container */}
            <div className="lg:col-span-6 space-y-12">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#f26b2c] uppercase font-black">
                  WHAT WE CREATE
                </span>
                
                <div className="relative h-[160px] sm:h-[180px] overflow-hidden mt-4">
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={slideIndex}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-tight uppercase tracking-tight"
                    >
                      {SLIDER_ITEMS[slideIndex].title}
                    </motion.h2>
                  </AnimatePresence>
                </div>
              </div>

              {/* Miniature sliding/zooming image box */}
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-black/10 shadow-md bg-neutral-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slideIndex}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={SLIDER_ITEMS[slideIndex].image}
                      alt="Miniature artwork"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Description Paragraph with Fade Animation */}
              <div className="relative min-h-[100px] sm:min-h-[120px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={slideIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="text-sm leading-relaxed text-neutral-500 font-semibold"
                  >
                    {SLIDER_ITEMS[slideIndex].desc}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Slide Navigation Controls */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={() => setSlideIndex((prev) => (prev - 1 + SLIDER_ITEMS.length) % SLIDER_ITEMS.length)}
                  className="w-12 h-12 rounded-full border border-black/15 bg-white text-black hover:bg-[#f26b2c] hover:text-white hover:border-[#f26b2c] flex items-center justify-center transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSlideIndex((prev) => (prev + 1) % SLIDER_ITEMS.length)}
                  className="w-12 h-12 rounded-full border border-black/15 bg-white text-black hover:bg-[#f26b2c] hover:text-white hover:border-[#f26b2c] flex items-center justify-center transition-all duration-300"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 3: OVERLAPPING SERVICE CARDS */}
        <section className="bg-white border-y border-black/10 py-24 px-6 md:px-16 text-left">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left side text column */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/50 px-4 py-1.5 text-xs text-neutral-800 font-bold uppercase tracking-wider shadow-sm">
                <span className="w-4 h-4 rounded-full bg-[#f26b2c] flex items-center justify-center text-[10px] text-white font-black">
                  +
                </span>
                <span>Our Service</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-black text-black leading-tight uppercase tracking-tight">
                Crafting memorable brand experiences from strategy to execution
              </h2>

              <p className="text-sm leading-relaxed text-neutral-500 font-semibold">
                We shape compelling brand experiences built on strong strategic insight and realized through smart design, authentic storytelling, and flawless execution that ensures every detail connects and performs.
              </p>

              {/* Black to Orange Button */}
              <button
                onClick={() => router.push("/portfolio-details")}
                className="group inline-flex items-center gap-2.5 bg-black hover:bg-[#f26b2c] text-white px-7 py-4 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all duration-300"
              >
                <span>Elevate your brand</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Right side overlapping cards stack */}
            <div className="lg:col-span-7 space-y-16 pl-0 lg:pl-12 relative">
              {OVERLAP_CARDS.map((card, idx) => (
                <div
                  key={idx}
                  className="sticky top-[140px] w-full"
                  style={{ zIndex: (idx + 1) * 10 }}
                >
                  <motion.div
                    whileHover={{ y: -8, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-[#faf8f4] border border-black/10 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6 flex flex-col justify-between min-h-[460px] cursor-pointer"
                    onClick={() => router.push("/portfolio-details")}
                  >
                    <div className="flex justify-between items-center border-b border-black/10 pb-6">
                      <h3 className="text-2xl sm:text-3xl font-black uppercase text-black tracking-tight">
                        {card.title}
                      </h3>
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-500 font-semibold leading-relaxed">
                      {card.desc}
                    </p>

                    <div className="relative aspect-[2.2/1] w-full overflow-hidden rounded-2xl border border-black/5 bg-neutral-100">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-w-xl) 100vw, 600px"
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION 4: STATS SECTION & COLORFUL BOTTOM BAR */}
        <section className="bg-[#f4f1ea] py-24 px-6 md:px-16 text-left">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Header info */}
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/50 px-4 py-1.5 text-xs text-neutral-800 font-bold uppercase tracking-wider shadow-sm">
                <span className="w-4 h-4 rounded-full bg-[#f26b2c] flex items-center justify-center text-[10px] text-white font-black">
                  +
                </span>
                <span>Our Impact</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black leading-tight uppercase tracking-tight">
                Creativity that delivers measurable results and drives brand success
              </h2>
            </div>

            {/* Grid of stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-6">
              <div className="space-y-4 border-l-2 border-[#f26b2c] pl-6">
                <h3 className="text-4xl sm:text-5xl font-black text-black tracking-tight">
                  <AnimatedCounter value={20} prefix="+ " suffix="K" />
                </h3>
                <span className="text-xs font-bold uppercase tracking-widest text-[#f26b2c] block">
                  Successful projects
                </span>
                <p className="text-xs text-neutral-500 font-semibold leading-relaxed">
                  Our portfolio showcases impactful projects built on strategy, creativity, and seamless delivery, ensuring success that clients can see and celebrate.
                </p>
              </div>

              <div className="space-y-4 border-l-2 border-[#f26b2c] pl-6">
                <h3 className="text-4xl sm:text-5xl font-black text-black tracking-tight">
                  <AnimatedCounter value={8} prefix="+ " suffix="K" />
                </h3>
                <span className="text-xs font-bold uppercase tracking-widest text-[#f26b2c] block">
                  Satisfied clients
                </span>
                <p className="text-xs text-neutral-500 font-semibold leading-relaxed">
                  We build lasting client relationships through collaboration, and results-driven solutions that consistently exceed expectations.
                </p>
              </div>

              <div className="space-y-4 border-l-2 border-[#f26b2c] pl-6">
                <h3 className="text-4xl sm:text-5xl font-black text-black tracking-tight">
                  <AnimatedCounter value={22} prefix="+ " />
                </h3>
                <span className="text-xs font-bold uppercase tracking-widest text-[#f26b2c] block">
                  Years of experience
                </span>
                <p className="text-xs text-neutral-500 font-semibold leading-relaxed">
                  Over the years, we've partnered with brands of every scale, perfecting our craft and consistently delivering exceptional outcomes.
                </p>
              </div>
            </div>

            {/* Colorful Bottom Stripe Palette blocks */}
            <div className="w-full h-8 flex overflow-hidden rounded-full border border-black/10 shadow-sm">
              <div className="bg-black w-[20%] h-full" />
              <div className="bg-[#2f221c] w-[20%] h-full" />
              <div className="bg-[#62473a] w-[20%] h-full" />
              <div className="bg-[#f26b2c] w-[20%] h-full" />
              <div className="bg-[#e5ddcd] w-[20%] h-full" />
            </div>

          </div>
        </section>

        {/* SECTION 5: BOOST YOUR BRAND HORIZONTAL ACCORDION ON SCROLL */}
        <section ref={scrollRef} className="relative w-full h-[300vh] bg-black">
          <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center">
            <div className="w-full h-full flex flex-row">
              
              {/* PANEL 1: MARKIVO */}
              <motion.div
                style={{ width: p1Width }}
                className="relative h-full overflow-hidden flex-shrink-0 flex flex-col justify-between border-r border-white/5 bg-black group"
              >
                {/* Replaced person's image with a solid black screen background */}
                <div className="absolute inset-0 z-0 bg-black" />

                {/* Floating content on top */}
                <motion.div style={{ opacity: p1ContentOpacity }} className="relative z-10 p-10 sm:p-16 h-full flex flex-col justify-between">
                  {/* Header / Text on top */}
                  <div className="space-y-6 max-w-xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-xs text-white font-bold uppercase tracking-wider shadow-sm">
                      <span className="w-4 h-4 rounded-full bg-[#f26b2c] flex items-center justify-center text-[10px] text-white font-black">
                        +
                      </span>
                      <span>Our Impact</span>
                    </div>
                    
                    <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight uppercase tracking-tight">
                      Impactful brand experiences that build recognition and lasting connections
                    </h2>
                  </div>

                  {/* Button */}
                  <div>
                    <button
                      onClick={() => router.push("/portfolio-details")}
                      className="group inline-flex items-center gap-2.5 bg-[#f26b2c] hover:bg-white hover:text-black text-white px-7 py-4 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all duration-300"
                    >
                      <span>Boost your brand</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </motion.div>

                {/* Bottom Card Identity Label (Visible when Panel 1 is open or closing) */}
                <motion.div style={{ opacity: p1TextOpacity }} className="absolute bottom-10 left-10 z-20 pointer-events-none">
                  <h4 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                    Markivo
                  </h4>
                  <span className="text-[10px] sm:text-xs font-mono uppercase text-white/70 tracking-widest font-bold">
                    Design & Campaign
                  </span>
                </motion.div>
              </motion.div>

              {/* PANEL 2: CREATIVO */}
              <motion.div
                style={{ width: p2Width }}
                className="relative h-full overflow-hidden flex-shrink-0 flex flex-col justify-end border-r border-white/5 bg-neutral-900 group"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/service/slider-main-image.webp"
                    alt="Creativo background"
                    fill
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                    priority
                    referrerPolicy="no-referrer"
                  />
                  {/* Soft overlay */}
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Bottom Card Identity Label */}
                <motion.div style={{ opacity: p2TextOpacity }} className="absolute bottom-10 left-10 z-20 p-6 pointer-events-none">
                  <h4 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                    Creativo
                  </h4>
                  <span className="text-[10px] sm:text-xs font-mono uppercase text-white/70 tracking-widest font-bold">
                    Brand Strategy
                  </span>
                </motion.div>
              </motion.div>

              {/* PANEL 3: VIBE */}
              <motion.div
                style={{ width: p3Width }}
                className="relative h-full overflow-hidden flex-shrink-0 flex flex-col justify-end bg-neutral-900 group"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/service/crafting-image-1.webp"
                    alt="Vibe background"
                    fill
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                    priority
                    referrerPolicy="no-referrer"
                  />
                  {/* Soft overlay */}
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Bottom Card Identity Label */}
                <motion.div style={{ opacity: p3TextOpacity }} className="absolute bottom-10 left-10 z-20 p-6 pointer-events-none">
                  <h4 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                    Vibe
                  </h4>
                  <span className="text-[10px] sm:text-xs font-mono uppercase text-white/70 tracking-widest font-bold">
                    Digital Identity
                  </span>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* SECTION 6: SERVICES LIST IN THE DARK WITH TWIN PICTURES */}
        <section className="bg-black text-white py-24 px-6 md:px-16 text-left">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side side-by-side zoom-on-hover artwork images with autonomous up-and-down animation */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 max-w-[350px] mx-auto w-full">
              <motion.div
                animate={{ y: [0, 48] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.03 }}
                className="relative aspect-[3/4.2] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl group cursor-pointer"
              >
                <Image
                  src="/service/crafting-image-1.webp"
                  alt="Aesthetic creative visual of person"
                  fill
                  sizes="(max-w-[300px]) 100vw, 300px"
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103"
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, -48] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.03 }}
                className="relative aspect-[3/4.2] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl mt-12 group cursor-pointer"
              >
                <Image
                  src="/service/crafting-image-5.webp"
                  alt="Sleek abstract visual of fresh juice"
                  fill
                  sizes="(max-w-[300px]) 100vw, 300px"
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103"
                />
              </motion.div>
            </div>

            {/* Right side capabilities list */}
            <div className="lg:col-span-7 space-y-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tight">
                We create standout brands engaging content and digital experiences people love
              </h2>

              <div className="flex flex-col gap-3 pt-4 border-t border-white/15">
                {[
                  { num: "01", name: "Digital growth strategy" },
                  { num: "02", name: "Personalized email campaigns" },
                  { num: "03", name: "Social media marketing" },
                  { num: "04", name: "Website content writing" },
                  { num: "05", name: "Website speed optimization" },
                  { num: "06", name: "Competitor reputation analysis" }
                ].map((item, index) => (
                  <div
                    key={index}
                    onClick={() => router.push("/portfolio-details")}
                    className="flex justify-between items-center p-5 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent hover:bg-white text-white hover:text-black group"
                  >
                    <div className="flex gap-6 items-center">
                      <span className="text-xs font-mono text-[#f26b2c] font-black group-hover:text-black transition-colors duration-300">
                        {item.num}
                      </span>
                      <h3 className="text-md sm:text-lg font-bold uppercase tracking-tight text-white group-hover:text-black transition-colors duration-300">
                        {item.name}
                      </h3>
                    </div>
                    
                    {/* Circle button that turns black on hover with a white arrow */}
                    <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:bg-black group-hover:border-black text-white group-hover:text-white">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 8: RESEARCH & INSIGHTS (BLOG SECTION) */}
        <section className="bg-[#faf8f4] border-t border-b border-black/10 py-24 px-6 md:px-16 text-left">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Header block */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/50 px-4 py-1.5 text-xs text-neutral-800 font-bold uppercase tracking-wider shadow-sm">
                  <span className="w-4 h-4 rounded-full bg-[#f26b2c] flex items-center justify-center text-[10px] text-white font-black">
                    +
                  </span>
                  <span>Our Latest Post</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tight leading-none uppercase max-w-2xl">
                  Our research and insights about creative innovation
                </h2>
              </div>
              
              <button
                onClick={() => router.push("/portfolio-details")}
                className="group shrink-0 inline-flex items-center gap-2 border border-black/15 bg-transparent px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300"
              >
                <span>Read all articles</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Grid of 3 blog items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              {[
                {
                  date: "19 JANUARY 2026",
                  title: "Building narratives where strategy meets emotion",
                  img: "/service/Blog-One.webp",
                  author: "Emma Collins",
                  authorAvatar: "/images/idotive-home-athour-1.webp"
                },
                {
                  date: "19 JANUARY 2026",
                  title: "Creating meaningful stories driven by strategy",
                  img: "/service/service-v3.webp",
                  author: "Sophie Laurent",
                  authorAvatar: "/images/idotive-home-athour-2.webp"
                },
                {
                  date: "19 JANUARY 2026",
                  title: "Building emotional connections through design",
                  img: "/service/Blog-One-2.webp",
                  author: "Michael Grant",
                  authorAvatar: "/images/idotive-home-athour-3.webp"
                }
              ].map((blog, index) => (
                <div
                  key={index}
                  onClick={() => router.push("/portfolio-details")}
                  className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col justify-between p-6 h-full min-h-[480px]"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono tracking-widest text-[#f26b2c] font-bold block uppercase">
                      {blog.date}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight leading-tight group-hover:text-[#f26b2c] transition-colors duration-300">
                      {blog.title}
                    </h3>
                  </div>

                  <div className="relative aspect-[1.6/1] w-full overflow-hidden rounded-xl border border-black/5 bg-neutral-50 my-6">
                    <Image
                      src={blog.img}
                      alt={blog.title}
                      fill
                      sizes="(max-w-[400px]) 100vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center gap-3 border-t border-black/5 pt-4">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-black/5 bg-neutral-100">
                      <Image
                        src={blog.authorAvatar}
                        alt={blog.author}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-black uppercase block tracking-tight">
                        {blog.author}
                      </span>
                      <span className="text-[9px] font-mono uppercase text-neutral-400 font-bold block">
                        Creative Writer
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION 9: TESTIMONIALS SECTION */}
        <Testimonials />

      </main>

      <Footer />

      {/* Embedded style tag for animations */}
      <style jsx global>{`
        @keyframes marquee-loop {
          from { transform: translateX(0%); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-loop {
          animation: marquee-loop 25s linear infinite;
        }
      `}</style>
    </>
  );
}
