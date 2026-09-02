"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { Plus, Play, Pause } from "lucide-react";

// High-performance count-up animation component that triggers when scrolled into view
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const node = ref.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1], // Custom cubic ease-out
      onUpdate(latestValue) {
        node.textContent = String(Math.floor(latestValue)) + suffix;
      },
    });

    return () => controls.stop();
  }, [value, suffix, isInView]);

  return (
    <span ref={ref} className="inline-block tabular-nums">
      0{suffix}
    </span>
  );
}

// Icons components for capabilities (inline SVGs for clear backgrounds and instant loading)
const Icon1 = () => (
  <svg width="24" height="24" viewBox="0 0 85 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 object-contain text-black group-hover:text-[#f26b2c] transition-colors duration-300">
    <path fillRule="evenodd" clipRule="evenodd" d="M30.8635 80.0004C13.846 80.0004 0 66.103 0 49.0194C0 31.9358 13.846 18.0383 30.8635 18.0383C47.8811 18.0383 61.727 31.9358 61.727 49.0194C61.727 66.103 47.8811 80.0004 30.8635 80.0004ZM30.8635 20.2408C15.0574 20.2408 2.20244 33.1471 2.20244 49.0194C2.20244 64.8843 15.0574 77.798 30.8635 77.798C46.6624 77.798 59.5246 64.8843 59.5246 49.0194C59.5246 33.1471 46.6624 20.2408 30.8635 20.2408Z" fill="currentColor"/>
    <path d="M58.8791 61.4775C58.3579 61.4775 57.8954 61.1031 57.7999 60.5745C57.6898 59.9725 58.0862 59.3999 58.6809 59.2898C72.2846 56.7937 82.1516 44.8858 82.1516 30.981C82.1516 15.1161 69.2966 2.20244 53.4904 2.20244C37.6916 2.20244 24.8294 15.1161 24.8294 30.981C24.8294 37.838 27.2741 44.4747 31.701 49.6724C32.0901 50.135 32.0387 50.8324 31.5762 51.2288C31.1137 51.6179 30.4163 51.5665 30.0198 51.104C25.2552 45.5025 22.627 38.3592 22.627 30.981C22.627 13.8974 36.4729 0 53.4904 0C70.508 0 84.354 13.8974 84.354 30.981C84.354 45.9503 73.7236 58.7685 59.0773 61.4555C59.0137 61.4702 58.9476 61.4775 58.8791 61.4775Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M35.5691 57.807C33.675 57.807 32.126 56.258 32.126 54.3492C32.126 52.4477 33.675 50.8987 35.5691 50.8987C37.4706 50.8987 39.0123 52.4477 39.0123 54.3492C39.0123 56.258 37.4706 57.807 35.5691 57.807ZM35.5691 53.1011C34.8864 53.1011 34.3284 53.6591 34.3284 54.3492C34.3284 55.0393 34.8864 55.6046 35.5691 55.6046C36.2519 55.6046 36.8098 55.0393 36.8098 54.3492C36.8098 53.6591 36.2519 53.1011 35.5691 53.1011Z" fill="currentColor"/>
  </svg>
);

const Icon2 = () => (
  <svg width="24" height="24" viewBox="0 0 196 193" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 object-contain text-black group-hover:text-white transition-colors duration-300">
    <path d="M81.8209 13.3935C85.4109 -4.22604 110.589 -4.22604 114.179 13.3935C116.64 25.47 130.985 30.6911 140.633 23.0219C154.709 11.8325 173.996 28.0161 165.421 43.8211C159.543 54.6541 167.176 67.8751 179.497 68.2011C197.472 68.6781 201.844 93.472 185.116 100.068C173.65 104.589 170.999 119.622 180.227 127.792C193.691 139.711 181.102 161.515 164.048 155.815C152.359 151.908 140.665 161.72 142.483 173.91C145.135 191.695 121.476 200.306 112.076 184.978C105.633 174.471 90.3669 174.471 83.9239 184.978C74.5239 200.306 50.8649 191.695 53.5169 173.91C55.3349 161.72 43.6409 151.908 31.952 155.815C14.8978 161.515 2.30925 139.711 15.7728 127.792C25.0009 119.622 22.35 104.589 10.8844 100.068C-5.84396 93.472 -1.47195 68.6781 16.5033 68.2011C28.8237 67.8751 36.4569 54.6541 30.5791 43.8211C22.004 28.0161 41.2909 11.8325 55.3669 23.0219C65.0149 30.6911 79.3599 25.47 81.8209 13.3935Z" fill="#f26b2c"/>
    <path d="M91 106L105 92" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M92.167 92H105V104.833" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Icon3 = () => (
  <svg width="24" height="24" viewBox="0 0 92 94" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 object-contain text-black group-hover:text-[#f26b2c] transition-colors duration-300">
    <path d="M78.5751 14.7373L50.9356 40.2288L62.3863 2.78814L45.4077 0L44.2232 38.2373L25.6652 4.38136L13.03 14.7373L37.5107 41.4237L2.3691 30.6695L0 47.7966C12.6352 48.1949 37.6687 49.0712 36.721 49.3898C35.7734 49.7085 14.7411 61.4718 4.34335 67.3136L14.2146 81.2542L41.4592 54.9661L30.4034 91.2119L46.9871 94L47.7768 56.161L65.9399 89.6186L78.97 80.0593L53.6996 52.178L89.6309 63.7288L92 47L54.8841 45.8051L88.0515 27.8814L78.5751 14.7373Z" fill="currentColor"/>
  </svg>
);

const Icon4 = () => (
  <svg width="24" height="24" viewBox="0 0 75 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 object-contain text-black group-hover:text-[#f26b2c] transition-colors duration-300">
    <path fillRule="evenodd" clipRule="evenodd" d="M24.9059 80C18.5365 80 12.1611 77.5716 7.31023 72.7147C-1.18028 64.2242 -2.42164 50.931 4.35752 41.1028C4.64074 40.693 5.20719 40.5905 5.61695 40.8738C6.02671 41.157 6.12916 41.7234 5.84594 42.1332C-0.433066 51.2443 0.717877 63.5673 8.58772 71.4372C17.5663 80.4158 32.1551 80.4459 41.0976 71.5035C47.3042 65.2968 49.1843 56.3785 46.7559 48.4966H26.6715C26.4305 48.4966 26.2015 48.4001 26.0328 48.2254C25.864 48.0566 25.7676 47.8277 25.7676 47.5866L25.852 31.4071C25.858 31.154 25.9604 30.9189 26.1473 30.7442C26.3341 30.5754 26.5811 30.4911 26.8282 30.5092C32.7155 30.9853 38.0665 33.4739 42.3088 37.7162C44.93 40.3435 46.8463 43.4107 48.0575 46.6888H72.4564V1.80777H27.5754V14.8538C27.5754 15.354 27.1717 15.7577 26.6715 15.7577C26.1714 15.7577 25.7676 15.354 25.7676 14.8538V0.903887C25.7676 0.409762 26.1714 0 26.6715 0H73.3603C73.8544 0 74.2642 0.409762 74.2642 0.903887V47.5927C74.2642 48.0868 73.8544 48.4966 73.3603 48.4966H48.642C51.0162 56.8605 48.9312 66.2248 42.375 72.781C37.5603 77.5957 31.2392 80 24.9059 80ZM27.5814 46.6888H46.1171C44.9903 43.8867 43.297 41.2594 41.0252 38.9937C37.3314 35.2938 32.7215 33.034 27.6597 32.4134L27.5814 46.6888Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M26.744 26.5021C24.7494 26.5021 23.1284 24.8811 23.1284 22.8865C23.1284 20.892 24.7494 19.271 26.744 19.271C28.7385 19.271 30.3595 20.892 30.3595 22.8865C30.3595 24.8811 28.7385 26.5021 26.744 26.5021ZM26.744 21.0788C25.7497 21.0788 24.9362 21.8923 24.9362 22.8865C24.9362 23.8808 25.7497 24.6943 26.744 24.6943C27.7443 24.6943 28.5517 23.8808 28.5517 22.8865C28.5517 21.8923 27.7443 21.0788 26.744 21.0788Z" fill="currentColor"/>
  </svg>
);

// Capabilities configuration
const CAPABILITIES = [
  {
    num: "01",
    title: "Branding & identity",
    desc: "We blend strategy and creativity to build identities that elevate your brand presence and drive long-term growth.",
    icon: Icon1,
  },
  {
    num: "02",
    title: "Advertising & campaigns",
    desc: "We merge insight and imagination to craft campaigns that strengthen your brand presence and fuel lasting growth.",
    icon: Icon2,
  },
  {
    num: "03",
    title: "Web design & development",
    desc: "We unite strategy and creativity to shape digital experiences that enhance your brand presence and aid long-term growth.",
    icon: Icon3,
  },
  {
    num: "04",
    title: "Content & copywriting",
    desc: "We combine planning and creativity to develop narratives that elevate brand presence and enable sustained growth.",
    icon: Icon4,
  },
];

// Process steps with corresponding preview images matching video exactly
const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discover & define",
    img: "/about/about-Darksec1.webp",
  },
  {
    num: "02",
    title: "Strategic planning",
    img: "/about/about-Darksec2.webp",
  },
  {
    num: "03",
    title: "Creative execution",
    img: "/about/about-Darksec3.webp",
  },
  {
    num: "04",
    title: "Collaborative process",
    img: "/about/about-Darksec4.webp",
  },
  {
    num: "05",
    title: "Refine & improve",
    img: "/about/about-Darksec5.webp",
  },
];

// Clients list
const CLIENTS = [
  { name: "AC2H", label: "AC2H" },
  { name: "Luntap", label: "Luntap" },
  { name: "MILK", label: "MILK" },
  { name: "urban", label: "urban" },
  { name: "MARQUE", label: "MARQUE" },
  { name: "Shopia", label: "Shopia" },
  { name: "creativail", label: "creativail" },
  { name: "leagone", label: "leagone" },
];

export default function AboutPage() {
  const [activeProcessIdx, setActiveProcessIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/Pause video handler
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch((err) => console.log("Play failed:", err));
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Sync state with actual video playback events to prevent state out of sync
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Initial play check & trigger
    if (video.paused) {
      video.play().catch((err) => {
        console.log("Autoplay failed/prevented:", err);
        setIsPlaying(false);
      });
    } else {
      setIsPlaying(true);
    }

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <div className="w-full bg-[#f4f1ea] text-black">
      {/* SECTION 1: HERO */}
      <section className="relative w-full h-[60vh] min-h-[480px] flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/about/about-banner.webp"
            alt="About us scene background"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          {/* Subtle dark overlay for text contrast */}
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[11px] font-bold tracking-[0.3em] text-white/90 uppercase mb-3"
          >
            VISION TO LIFE
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight"
          >
            About us
          </motion.h1>
        </div>
      </section>

      {/* SECTION 2: BRAND SUCCESS */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col items-start gap-4 mb-16 text-left">
          <span className="inline-block bg-[#f26b2c] text-white text-[10px] font-bold tracking-[0.2em] px-4 py-1.5 rounded-none uppercase">
            BRAND SUCCESS
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight max-w-4xl">
            Converting smart strategy into eye catching design that helps your
            brand stand out and succeed
          </h2>
        </div>

        {/* 4 Columns Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group border-t border-black/10 pt-8 flex flex-col justify-between items-start text-left gap-6 h-full hover:border-[#f26b2c] transition-colors duration-300"
            >
              <div className="space-y-4 w-full">
                <span className="font-mono text-xs text-neutral-400 block">
                  {cap.num}
                </span>
                <div className="relative w-12 h-12 flex items-center justify-center bg-transparent rounded-none group-hover:scale-110 transition-transform duration-300">
                  <cap.icon />
                </div>
                <h3 className="text-lg font-bold text-black group-hover:text-[#f26b2c] transition-colors duration-200">
                  {cap.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {cap.desc}
                </p>
              </div>

              {/* Button: LEARN MORE with Premium Sliding Text Effect */}
              <button className="group/btn relative flex h-[36px] items-center justify-center overflow-hidden rounded-none border border-black/10 px-4 text-[9px] font-bold tracking-widest uppercase text-black hover:text-[#f26b2c] transition-colors duration-300 pt-0 cursor-pointer">
                {/* Sliding Background */}
                <span className="absolute inset-0 h-full w-full translate-y-full bg-black/5 transition-transform duration-300 ease-out group-hover/btn:translate-y-0" />
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-none bg-[#f26b2c] group-hover/btn:scale-125 transition-transform duration-200" />
                  <span>Learn More</span>
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: METRICS GRID SECTION */}
      <section className="py-20 bg-[#faf8f4] border-t border-b border-black/5 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-black tracking-tight text-left mb-8 sm:mb-12 uppercase max-w-2xl">
            Successful projects delivered with proven client satisfaction
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Black Card with Abstract Floating Shape */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.01, borderColor: "#f26b2c" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-black text-white rounded-none p-8 flex flex-col justify-between min-h-[360px] relative overflow-hidden group border border-white/5 cursor-pointer"
            >
              <div className="flex justify-between items-start z-10">
                <h3 className="text-2xl font-bold uppercase tracking-tight max-w-[150px]">
                  Creative art design
                </h3>
                <div className="w-10 h-10 rounded-none border border-white/20 flex items-center justify-center hover:bg-[#f26b2c] hover:border-[#f26b2c] transition-all duration-300">
                  <Plus className="w-5 h-5" />
                </div>
              </div>

              {/* Central Abstract Graphics (Rotating shape using about-card1.webp moved down slightly) */}
              <div className="absolute right-[-20px] bottom-[-35px] w-52 h-52 opacity-80 pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full relative"
                >
                  <Image
                    src="/about/about-card1.webp"
                    alt="Abstract Creative Art shape"
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed max-w-[200px] z-10">
                We design creative visuals with purpose connecting aesthetics with strategy to deliver real impact.
              </p>
            </motion.div>

            {/* Card 2: Orange Card with Avatar Stack */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-[#f26b2c] text-white rounded-none p-8 flex flex-col justify-between min-h-[360px] relative overflow-hidden group cursor-pointer"
            >
              <div className="flex justify-between items-start z-10">
                <div className="space-y-1">
                  <h3 className="text-5xl font-black tracking-tighter">
                    <AnimatedCounter value={25} suffix="k+" />
                  </h3>
                  <p className="text-xs font-semibold tracking-wider uppercase opacity-90">
                    Happy customers
                  </p>
                </div>
                <div className="w-10 h-10 rounded-none border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#f26b2c] transition-all duration-300">
                  <Plus className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4 z-10">
                {/* Overlapping Avatar Stack with Straight Corners */}
                <div className="flex items-center -space-x-2">
                  <div className="h-10 w-10 overflow-hidden rounded-none border-[2px] border-[#f26b2c] shadow-sm bg-white">
                    <Image
                      src="/images/idotive-home-athour-1.webp"
                      alt="Customer face"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="h-10 w-10 overflow-hidden rounded-none border-[2px] border-[#f26b2c] shadow-sm bg-white">
                    <Image
                      src="/images/idotive-home-athour-2.webp"
                      alt="Customer face"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="h-10 w-10 overflow-hidden rounded-none border-[2px] border-[#f26b2c] shadow-sm bg-white">
                    <Image
                      src="/images/idotive-home-athour-3.webp"
                      alt="Customer face"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="h-10 w-10 overflow-hidden rounded-none border-[2px] border-[#f26b2c] shadow-sm bg-white">
                    <Image
                      src="/images/idotive-profile-image.webp"
                      alt="Customer face"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <p className="text-xs text-white/90 leading-relaxed max-w-[220px]">
                  Delivering consistent smiles through digital innovation, custom development, and reliable client support.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Image background Card (Customer satisfaction rate) */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="rounded-none p-8 flex flex-col justify-between min-h-[360px] relative overflow-hidden group border border-black/5 cursor-pointer"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src="/about/about.webp"
                  alt="Customer satisfaction background"
                  fill
                  className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              <div className="relative z-10 flex justify-between items-start text-white">
                <div className="space-y-1">
                  <h3 className="text-5xl font-black tracking-tighter">
                    <AnimatedCounter value={99} suffix="%" />
                  </h3>
                  <p className="text-xs font-semibold tracking-wider uppercase opacity-90">
                    Customer satisfaction rate
                  </p>
                </div>
                <div className="w-10 h-10 rounded-none border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                  <Plus className="w-5 h-5" />
                </div>
              </div>

              <p className="relative z-10 text-xs text-white/80 leading-relaxed max-w-[200px]">
                Proven results driven by attention to details and consistent communication with every single client.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CREATIVITY WITH PURPOSE */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-black leading-[1.1] tracking-tight">
              Creativity with purpose building brands that people trust admire and remember
            </h2>

            {/* Premium Interactive Button with Sliding Text and straight corners */}
            <button className="group relative inline-flex h-[48px] items-center justify-center overflow-hidden rounded-none bg-black px-8 text-[11px] font-bold uppercase tracking-widest text-white transition-colors duration-300 cursor-pointer border border-transparent">
              {/* Orange sliding background on hover */}
              <span className="absolute inset-0 h-full w-full translate-y-full bg-[#f26b2c] transition-transform duration-300 ease-out group-hover:translate-y-0" />

              {/* Sliding Text Block */}
              <span className="relative z-10 block h-4 overflow-hidden">
                <span className="block transform transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  Create with us
                </span>
                <span className="absolute left-0 top-0 block translate-y-full transform transition-transform duration-300 ease-out group-hover:translate-y-0">
                  Create with us
                </span>
              </span>
            </button>
          </div>

          {/* Right Column Image with straight corners */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full aspect-[4/5] rounded-none overflow-hidden group shadow-lg border border-black/5">
              <Image
                src="/about/about-main.webp"
                alt="Creativity with purpose showcase"
                fill
                className="object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: "CRAFTING" VIDEO SECTION */}
      <section className="relative w-full aspect-video min-h-[350px] md:min-h-[500px] flex items-center justify-center overflow-hidden bg-black group/video">
         {/* Background Video - No poster, full opacity, guaranteed autoplay on client mount */}
         <video
          ref={videoRef}
          src="/about/card2.mp4"
          autoPlay
          loop
          muted
          playsInline
          onClick={togglePlay}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 cursor-pointer"
        />

        {/* Big "Crafting" Text overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <h2 className="text-4xl sm:text-7xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-black text-white/90 select-none uppercase tracking-tighter font-sans">
            Crafting
          </h2>
        </div>

        {/* Play / Pause Toggle Button - round circle with thin border and hover effect */}
        <button
          onClick={togglePlay}
          className="absolute left-6 bottom-6 md:left-12 md:bottom-12 z-20 w-14 h-14 rounded-full flex items-center justify-center bg-black/20 text-white backdrop-blur-md border border-white/30 shadow-lg hover:scale-110 hover:bg-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-white text-white" />
          ) : (
            <Play className="w-5 h-5 fill-white text-white translate-x-[1px]" />
          )}
        </button>
      </section>

      {/* SECTION 6: THE PROCESS ACCORDIONS WITH HOVER IMAGES */}
      <section className="bg-black text-white py-24 px-6 md:px-16 border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Image Box with Straight Corners */}
            <div className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-none overflow-hidden bg-neutral-900 border border-white/10 lg:sticky lg:top-24 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProcessIdx}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 0.95, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={PROCESS_STEPS[activeProcessIdx].img}
                    alt={PROCESS_STEPS[activeProcessIdx].title}
                    fill
                    className="object-cover animate-[subtle-zoom_20s_infinite_alternate]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Gentle vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Process Accordions */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left py-4">
              <span className="text-[10px] tracking-[0.25em] text-[#f26b2c] font-bold uppercase block mb-4">
                Our Process
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white leading-none tracking-tight mb-12">
                Workflow engineered for perfection
              </h2>

              <div className="flex flex-col border-t border-white/10">
                {PROCESS_STEPS.map((step, idx) => {
                  const isActive = activeProcessIdx === idx;
                  return (
                    <div
                      key={step.num}
                      onMouseEnter={() => setActiveProcessIdx(idx)}
                      className="border-b border-white/10 py-6 md:py-8 flex items-center justify-between cursor-pointer group transition-all duration-300"
                    >
                      <div className="flex items-center gap-6 md:gap-10">
                        <span
                          className={`font-mono text-sm transition-colors duration-300 ${
                            isActive ? "text-[#f26b2c]" : "text-neutral-500"
                          }`}
                        >
                          {step.num}
                        </span>
                        <h3
                          className={`text-xl sm:text-2xl md:text-3xl font-extrabold uppercase transition-all duration-300 tracking-tight ${
                            isActive
                              ? "text-white translate-x-3 scale-[1.02]"
                              : "text-neutral-500 group-hover:text-neutral-300"
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>

                      {/* Right Indicator Icon - straight corners */}
                      <div
                        className={`w-10 h-10 rounded-none border flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-[#f26b2c] border-[#f26b2c] text-white rotate-45"
                            : "border-white/10 text-neutral-500 group-hover:border-white/30 group-hover:text-white"
                        }`}
                      >
                        <Plus className="w-5 h-5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CLIENTS LOGO WALL - STRAIGHT CORNERS AND ADVANCED SLIDING HOVER EFFECT */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-black uppercase tracking-tight text-center mb-12 hover:text-white transition-colors duration-300 cursor-pointer">
          Creative solutions powered by lasting client trust
        </h2>

        {/* Grid of Typographic Client Logo Blocks with Straight Corners */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/15 border border-black/15 rounded-none overflow-hidden"
        >
          {CLIENTS.map((client) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              key={client.name}
              className="bg-[#f4f1ea] aspect-video flex items-center justify-center p-6 text-black hover:bg-black transition-colors duration-300 ease-out cursor-pointer group relative overflow-hidden"
            >
              {/* Sliding Text Block Container */}
              <div className="relative overflow-hidden h-7 w-full flex flex-col items-center justify-center select-none">
                {/* First Word: Slides up and out */}
                <span className="block font-display font-black text-xl md:text-2xl uppercase tracking-tighter opacity-70 group-hover:opacity-100 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-full">
                  {client.label}
                </span>

                {/* Second Word: Slides up into center and turns white */}
                <span className="absolute font-display font-black text-xl md:text-2xl uppercase tracking-tighter text-white opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0">
                  {client.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
