"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ArrowRight,
  Star,
  Plus,
  Search,
  Compass,
  Users,
  PenTool,
  Globe,
  FileText,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

type PageType = string;

// Reusable Split Sliding Button component
interface SplitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

const SplitButton = ({ children, className = "", ...props }: SplitButtonProps) => {
  return (
    <button
      className={`group relative inline-flex h-[52px] items-center justify-center overflow-hidden bg-black px-8 text-xs font-bold uppercase tracking-widest text-white transition-all duration-500 rounded-full cursor-pointer ${className}`}
      {...props}
    >
      {/* Dual sliding background (orange left, white right) */}
      <div className="absolute inset-0 w-full h-full flex translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
        <div className="w-1/2 h-full bg-[#f26b2c]" />
        <div className="w-1/2 h-full bg-white" />
      </div>

      {/* Text Sliding Wrapper */}
      <span className="relative z-10 block h-4 overflow-hidden">
        <span className="block transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full text-white">
          {children}
        </span>
        <span className="absolute left-0 top-0 block translate-y-full transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-black font-black">
          {children}
        </span>
      </span>
    </button>
  );
};

// Reusable Animated Counter component
const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalDuration = 1500; // ms
    const incrementTime = Math.abs(Math.floor(totalDuration / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

// Data models
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

const SERVICES_DATA = [
  {
    num: "01",
    title: "Branding & identity",
    desc: "We develop creative campaigns that amplify your message, boost audience engagement, and deliver measurable results across all channels.",
    image: "/service/service-v3-branding.webp"
  },
  {
    num: "02",
    title: "Advertising & campaigns",
    desc: "We deliver strong brand storytelling through compelling content and copy that informs, engages, and motivates your audience to act.",
    image: "/service/features-slider-2.webp"
  },
  {
    num: "03",
    title: "Content & copywriting",
    desc: "We build innovative campaigns that elevate your voice, engage the right audiences, and drive proven results across all touchpoints.",
    image: "/service/Blog-One-2.webp"
  },
  {
    num: "04",
    title: "Web design & development",
    desc: "We design and develop smart, creative websites that showcase your brand, enhance user experience, and drive stronger online performance.",
    image: "/service/digital-1.webp"
  }
];

const ACCORDION_DATA = [
  {
    title: "Clear team collaboration",
    desc: "We keep everything clear and open, so you always understand the progress, decisions, and value progress.",
    image: "/service/service-v3-branding-3.webp"
  },
  {
    title: "Transparent collaboration",
    desc: "You get full visibility as we work, communicate clearly and explain reasons behind every choice visibility.",
    image: "/service/service-v3-branding-4.webp"
  },
  {
    title: "Strategy-driven creativity",
    desc: "We maintain transparency throughout the process, ensuring you always know what's happening and why it matters.",
    image: "/service/service-v3-drop-3.webp"
  }
];

const BENTO_CARDS = [
  {
    title: "Discover & define",
    desc: "Every project begins with discovery understanding your purpose, vision, and audience to define a strong foundation.",
    image: "/service/service-v3-strategy.webp",
    icon: Search
  },
  {
    title: "Strategic planning",
    desc: "We build a solid strategy that aligns creativity with business goals, ensuring every idea is purposeful and drives measurable results.",
    image: "/service/service-v3-branding.webp",
    icon: Compass
  },
  {
    title: "Collaborative process",
    desc: "Together, we build creative solutions blending your insights with our expertise to craft meaningful, results-driven outcomes.",
    image: "/service/service-v3-drop-3.webp",
    icon: Users
  },
  {
    title: "Creative execution",
    desc: "Our creative execution blends imagination with precision, ensuring every concept is beautifully crafted and aligned with your brand's vision.",
    image: "/service/service-v3-drop-4.webp",
    icon: PenTool
  },
  {
    title: "Explore & plan",
    desc: "Every journey starts with exploration—learning, to create a clear roadmap and a solid, focused direction from the beginning.",
    image: "/service/slider-main-image.webp",
    icon: Globe
  },
  {
    title: "Research & shape",
    desc: "Each project begins with research, identifying needs, refining ideas, users to shape a clear vision and establish a reliable foundation.",
    image: "/service/crafting-image-1.webp",
    icon: FileText
  }
];

const TESTIMONIALS_DATA = [
  {
    name: "Randy Vaccaro",
    role: "CEO, NovaTech Solutions",
    img: "/images/idotive-home-athour-1.webp",
    quote: "From concept to execution, their strategic insight and creative expertise elevated our brand presence. Their innovative design and campaign solutions connected with our audience, strengthened our identity, and delivered measurable results that reflect their deep understanding of our vision."
  },
  {
    name: "Sophia Bennett",
    role: "Marketing Director, CoreLabs",
    img: "/images/idotive-home-athour-2.webp",
    quote: "From ideation to launch, their strategic mindset and creative execution amplified our brand reach. Their impactful design and campaign solutions connected with users, reinforced our identity, and achieved measurable results that show a deep understanding of our direction."
  },
  {
    name: "Alex Morgan",
    role: "Founder, BrightWave Studio",
    img: "/images/idotive-home-athour-3.webp",
    quote: "From planning through execution, their strategic expertise and creative precision improved our brand visibility. Their effective design and campaign solutions engaged audiences, strengthened brand alignment, and delivered measurable performance reflecting a strong understanding of our business goals."
  }
];

interface CardProps {
  card: {
    src: string;
    alt: string;
    rot: number;
    x: number;
    y: number;
  };
  index: number;
  spread: any;
}

const FanningCardItem = ({ card, index, spread }: CardProps) => {
  const router = useRouter();
  const r = useTransform(spread, [0, 1], [0, card.rot]);
  const tx = useTransform(spread, [0, 1], [0, card.x]);
  const ty = useTransform(spread, [0, 1], [0, card.y]);

  return (
    <motion.div
      style={{
        rotate: r,
        x: tx,
        y: ty,
        transformOrigin: "bottom center",
        zIndex: 10 + index,
      }}
      whileHover={{ 
        scale: 1.08, 
        zIndex: 50,
        transition: { duration: 0.2 } 
      }}
      className="absolute w-36 h-52 sm:w-44 sm:h-64 rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-neutral-900 cursor-pointer group"
      onClick={() => router.push("/portfolio-details")}
    >
      <Image
        src={card.src}
        alt={card.alt}
        fill
        sizes="(max-w-[180px]) 100vw, 180px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={index === 2}
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
};

// Reusable Fanning Cards component that spreads into a half-circle on scroll
const FanningCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the parent container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create a smooth spring-physic progress representation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001
  });

  // We want the fan-out to start as soon as it enters (e.g. 15% on-screen)
  // and be fully open when in the center of viewport (e.g. 52% on-screen).
  const spread = useTransform(smoothProgress, [0.15, 0.52], [0, 1]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleFactor = isMobile ? 0.55 : 1.0;

  // 5 Images from the service directory as requested
  const cards = [
    { src: "/service/crafting-image-1.webp", alt: "Crafting Image 1", rot: -44, x: -160 * scaleFactor, y: 32 * scaleFactor },
    { src: "/service/crafting-image-2.webp", alt: "Crafting Image 2", rot: -22, x: -80 * scaleFactor, y: 8 * scaleFactor },
    { src: "/service/crafting-image-3.webp", alt: "Crafting Image 3", rot: 0, x: 0, y: 0 },
    { src: "/service/crafting-image-4.webp", alt: "Crafting Image 4", rot: 22, x: 80 * scaleFactor, y: 8 * scaleFactor },
    { src: "/service/crafting-image-5.webp", alt: "Crafting Image 5", rot: 44, x: 160 * scaleFactor, y: 32 * scaleFactor },
  ];

  return (
    <div ref={containerRef} className="relative w-full h-[360px] sm:h-[450px] flex items-center justify-center overflow-visible">
      {cards.map((card, i) => (
        <FanningCardItem key={i} card={card} index={i} spread={spread} />
      ))}
    </div>
  );
};

export default function ServicesThreePage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<PageType>("services-three");
  const [activeService, setActiveService] = useState<number>(0);
  const [activeAccordion, setActiveAccordion] = useState<number>(0);
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);

  const onContactClick = () => {
    router.push("/contact");
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const tItem = TESTIMONIALS_DATA[currentTestimonial];
  const tPrev = TESTIMONIALS_DATA[(currentTestimonial - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length];
  const tNext = TESTIMONIALS_DATA[(currentTestimonial + 1) % TESTIMONIALS_DATA.length];

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

      <main className="w-full bg-[#f4f1ea] text-black min-h-screen overflow-hidden text-left pb-16">
        
        {/* 1. HERO SECTION */}
        <section className="relative w-full h-[70vh] min-h-[500px] flex flex-col justify-center items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/service/service-v3-hero-image.webp"
              alt="Floating orange cubes background"
              fill
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[11px] font-mono tracking-[0.3em] text-white/95 uppercase font-bold bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-sm"
            >
              SERVICE
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase"
            >
              What we do
            </motion.h1>
          </div>
        </section>

        {/* 2. PARTNERS LOGO GRID */}
        <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto text-center space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/15 border border-black/15 rounded-none overflow-hidden">
            {PARTNERS.map((partner, index) => {
              const isDark = partner.defaultDark;
              return (
                <div
                  key={index}
                  className={`relative aspect-[1.3/1] min-h-[160px] sm:min-h-[200px] flex flex-col items-center justify-center p-8 transition-colors duration-500 ease-out cursor-pointer group overflow-hidden ${
                    isDark 
                      ? "bg-neutral-900 text-white hover:bg-[#f4f1ea] hover:text-black" 
                      : "bg-[#f4f1ea] text-black hover:bg-neutral-900 hover:text-white"
                  }`}
                >
                  {/* Sliding Name Container */}
                  <div className="relative overflow-hidden h-10 w-full flex flex-col items-center justify-center select-none">
                    <span
                      className={`block font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter transition-all duration-500 transform group-hover:-translate-y-full ${
                        isDark 
                          ? "text-white opacity-90 group-hover:text-black group-hover:opacity-100" 
                          : "text-black opacity-80 group-hover:text-white group-hover:opacity-100"
                      }`}
                    >
                      {partner.name}
                    </span>
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
                    <span
                      className={`block font-mono text-[9px] tracking-widest uppercase transition-all duration-500 transform group-hover:-translate-y-full ${
                        isDark ? "text-neutral-400 group-hover:text-neutral-500" : "text-neutral-500 group-hover:text-neutral-400"
                      }`}
                    >
                      {partner.label}
                    </span>
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

        {/* 3. WHO WE ARE SECTION */}
        <section className="max-w-7xl mx-auto py-24 px-6 md:px-16 space-y-16">
          
          {/* Top Row: Badge & Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Badge */}
            <div className="lg:col-span-3 pt-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-black pl-1.5 pr-4 py-1.5 text-xs text-white font-bold uppercase tracking-wider">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#f26b2c] text-white font-black text-xs select-none">
                  +
                </span>
                <span>Who we are</span>
              </div>
            </div>

            {/* Right: Large Heading */}
            <div className="lg:col-span-9">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black leading-tight tracking-tight uppercase">
                We combine strategy, storytelling, and design to help brands grow stand out and stay memorable in every space
              </h2>
            </div>
          </div>

          {/* Bottom Row: Three Columns (Asterisk, Image, Info & Stats) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Column 1: Large Spinning Asterisk (Left) */}
            <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="relative w-48 h-48 sm:w-56 sm:h-56"
              >
                <Image
                  src="/icons/idotive-icon-8.png"
                  alt="Spinning orange asterisk"
                  fill
                  sizes="224px"
                  className="object-contain"
                />
              </motion.div>
            </div>

            {/* Column 2: Blurred Motion Portrait (Middle) */}
            <div className="md:col-span-4 lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-[320px] aspect-[1/1.1] rounded-[32px] overflow-hidden border border-black/10 shadow-lg bg-neutral-200">
                <Image
                  src="/service/idotive-service-v3-image.webp"
                  alt="Who we are creative visual"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Column 3: Rating, Text Description & Stats (Right) */}
            <div className="md:col-span-4 lg:col-span-5 space-y-8">
              
              {/* Rating & Avatars Header */}
              <div className="flex items-center gap-6">
                {/* Profile Avatars */}
                <div className="flex -space-x-3 shrink-0">
                  {["/images/idotive-home-athour-1.webp", "/images/idotive-home-athour-2.webp", "/images/idotive-home-athour-3.webp"].map((img, idx) => (
                    <div key={idx} className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#f4f1ea] shadow-md bg-neutral-200">
                      <Image
                        src={img}
                        alt="Team Avatar"
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Rating Number & Stars */}
                <div className="space-y-0.5">
                  <div className="text-xl font-black text-black">4.5</div>
                  <div className="flex text-amber-500">
                    {"★★★★★".split("").map((s, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Description Text */}
              <p className="text-sm leading-relaxed text-neutral-600 font-semibold max-w-md">
                Strategy, storytelling, and design working together to help your brand grow, stand out, and remain memorable everywhere.
              </p>

              {/* Divider line */}
              <div className="h-px bg-black/15 w-full" />

              {/* Stats Columns side-by-side */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 20, suffix: "K+", label: "Successful projects" },
                  { value: 8, suffix: "K+", label: "Satisfied clients" },
                  { value: 28, suffix: "+", label: "Years of experience" }
                ].map((c, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-3xl font-black text-black select-none">
                      <AnimatedCounter value={c.value} suffix={c.suffix} />
                    </div>
                    <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-tight leading-tight">
                      {c.label}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* 4. OUR SERVICE INTERACTIVE ROWS */}
        <section className="max-w-7xl mx-auto py-24 px-6 md:px-16 text-left space-y-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/50 px-4 py-1.5 text-xs text-neutral-800 font-bold uppercase tracking-wider shadow-sm">
              <span className="relative w-4 h-4 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="w-3.5 h-3.5"
                >
                  <Image
                    src="/icons/idotive-icon-8.png"
                    alt="asterisk"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </span>
              <span>Our Service</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tight leading-none uppercase max-w-3xl">
              Innovative services designed for measurable impact
            </h2>
          </div>

          {/* Interactive Accordion-Rows */}
          <div className="flex flex-col border-t border-black/15">
            {SERVICES_DATA.map((service, index) => {
              const isSelected = activeService === index;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveService(index)}
                  className="border-b border-black/10 relative overflow-hidden group"
                >
                  {/* Row content */}
                  <div className="py-10 px-4 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 transition-colors duration-300">
                    
                    {/* Index & Title */}
                    <div className="flex items-center gap-6 md:w-[35%] shrink-0">
                      <span className="text-sm font-mono font-black text-[#f26b2c]">
                        {service.num}
                      </span>
                      <h3
                        className={`text-2xl sm:text-3xl font-black uppercase tracking-tight transition-colors duration-300 ${
                          isSelected ? "text-[#f26b2c]" : "text-black group-hover:text-[#f26b2c]"
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    {/* Middle: Panoramic Image (Expands on select) */}
                    <div className="md:w-[30%] flex justify-center items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] h-0 md:h-[120px]">
                      <div
                        className={`relative w-full max-w-[280px] h-[100px] overflow-hidden rounded-2xl border border-black/10 bg-neutral-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                          isSelected ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
                        }`}
                      >
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="280px"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Right: Description & CTA */}
                    <div className="md:w-[35%] flex flex-col items-start md:items-end text-left md:text-right gap-3 shrink-0">
                      <p className="text-xs text-neutral-500 font-semibold leading-relaxed max-w-sm">
                        {service.desc}
                      </p>
                      <button
                        onClick={() => router.push("/portfolio-details")}
                        className="group inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-black hover:text-[#f26b2c] transition-colors"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. BOOST YOUR BRAND ACCORDION (DARK THEME) */}
        <section className="bg-black text-white py-24 px-6 md:px-16 text-left border-y border-white/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side: Large vertical image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4.2] w-full max-w-[420px] mx-auto overflow-hidden rounded-3xl border border-white/10 shadow-2xl group">
                <Image
                  src="/service/service-v3.webp"
                  alt="Elegant abstract jellyfish shape background"
                  fill
                  sizes="(max-w-[500px]) 100vw, 500px"
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-103"
                  priority
                />
              </div>
            </div>

            {/* Right side: Accordions and Header info */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tight">
                  Delivering standout work with measurable success
                </h2>
                
                {/* Button with exact split hover animation */}
                <div className="pt-2">
                  <SplitButton onClick={() => router.push("/portfolio-details")}>
                    Boost your brand
                  </SplitButton>
                </div>
              </div>

              {/* Accordions */}
              <div className="flex flex-col border-t border-white/10 pt-4">
                {ACCORDION_DATA.map((item, index) => {
                  const isOpen = activeAccordion === index;
                  return (
                    <div
                      key={index}
                      onClick={() => setActiveAccordion(index)}
                      className="border-b border-white/10 py-6 cursor-pointer group select-none"
                    >
                      <div className="flex justify-between items-center">
                        <h3
                          className={`text-lg sm:text-xl font-bold uppercase tracking-tight transition-colors duration-300 ${
                            isOpen ? "text-[#f26b2c]" : "text-white group-hover:text-[#f26b2c]"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <span className="text-xl font-light text-white/50 group-hover:text-white transition-colors">
                          {isOpen ? "—" : "+"}
                        </span>
                      </div>

                      {/* Expandable text body */}
                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                          <p className="text-xs sm:text-sm text-neutral-400 font-semibold leading-relaxed max-w-md">
                            {item.desc}
                          </p>

                          {/* Preview image inside expanded accordion */}
                          <div className="relative w-32 h-16 rounded-xl overflow-hidden border border-white/5 bg-neutral-900 shrink-0 shadow-md">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="128px"
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* 6. TRANSITION AREA / OVERLAPPING FLOATING IMAGES */}
        <section className="py-24 px-6 md:px-16 bg-black text-white text-center relative overflow-hidden border-b border-white/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side fanning floating cards */}
            <div className="lg:col-span-5 relative h-[360px] sm:h-[420px] flex items-center justify-center">
              <FanningCards />
            </div>

            {/* Right side wording and split button */}
            <div className="lg:col-span-7 text-left space-y-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tight">
                Crafting memorable brands through creative strategy and thoughtful design
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-semibold leading-relaxed max-w-2xl">
                We craft memorable brands by blending creative strategy with thoughtful design, helping businesses communicate their story clearly, connect.
              </p>

              <div className="pt-4">
                <SplitButton onClick={() => router.push("/portfolio-details")}>
                  Craft your brand
                </SplitButton>
              </div>
            </div>

          </div>
        </section>

        {/* 7. BENTO GRID SECTION */}
        <section className="max-w-7xl mx-auto py-24 px-6 md:px-16 text-left space-y-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/50 px-4 py-1.5 text-xs text-neutral-800 font-bold uppercase tracking-wider shadow-sm">
              <span className="relative w-4 h-4 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="w-3.5 h-3.5"
                >
                  <Image
                    src="/icons/idotive-icon-8.png"
                    alt="asterisk"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </span>
              <span>Who we are</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight leading-none uppercase max-w-3xl">
              Transforming creative insight into purposeful high-impact brand work
            </h2>
          </div>

          {/* 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENTO_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  onClick={() => router.push("/portfolio-details")}
                  className="group relative bg-white border border-black/15 rounded-3xl p-8 sm:p-10 min-h-[320px] flex flex-col justify-between overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Background Image that reveals on hover */}
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-3xl">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-w-[400px]) 100vw, 400px"
                      className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                  </div>

                  {/* Header element (Icon) */}
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-[#f4f1ea] group-hover:bg-[#f26b2c] flex items-center justify-center text-black group-hover:text-white transition-all duration-500">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                  </div>

                  {/* Footer wording */}
                  <div className="space-y-3 relative z-10 pt-12">
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black group-hover:text-white transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-neutral-500 group-hover:text-neutral-200 transition-colors duration-300 font-semibold">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. TESTIMONIALS CAROUSEL */}
        <section className="bg-[#faf8f4] border-t border-b border-black/10 py-24 px-6 md:px-16 text-left">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Header info */}
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/50 px-4 py-1.5 text-xs text-neutral-800 font-bold uppercase tracking-wider shadow-sm">
                <span className="relative w-4 h-4 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="w-3.5 h-3.5"
                  >
                    <Image
                      src="/icons/idotive-icon-8.png"
                      alt="asterisk"
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                </span>
                <span>Testimonial</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight leading-none uppercase">
                Success stories shaped through creativity and collaboration
              </h2>
            </div>

            {/* Testimonial Active Display Card with dim side cards */}
            <div className="relative w-full flex items-center justify-center gap-8 py-10">
              
              {/* Left Side Small Dim Card (Previous Avatar) */}
              <button
                onClick={prevTestimonial}
                className="hidden lg:flex flex-col items-center justify-center relative w-24 h-40 overflow-hidden rounded-2xl opacity-40 hover:opacity-80 transition-opacity duration-300 group cursor-pointer border border-black/5 shrink-0 bg-neutral-200 shadow-md"
              >
                <Image
                  src={tPrev.img}
                  alt={tPrev.name}
                  fill
                  sizes="96px"
                  className="object-cover scale-103 group-hover:scale-100 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <ChevronLeft className="w-8 h-8 drop-shadow" />
                </div>
              </button>

              {/* ACTIVE CENTER CARD */}
              <div className="w-full max-w-4xl bg-white border border-black/10 rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center gap-10 relative">
                
                {/* Active profile image */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden shrink-0 border-4 border-[#f26b2c]/10 shadow-lg bg-neutral-100">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tItem.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={tItem.img}
                        alt={tItem.name}
                        fill
                        sizes="176px"
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Narrative block */}
                <div className="space-y-6 flex-grow text-left">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-black leading-none">
                      {tItem.name}
                    </h3>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                      {tItem.role}
                    </p>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex text-amber-500">
                    {"★★★★★".split("").map((s, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  {/* Quote block */}
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={tItem.quote}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="text-sm sm:text-base leading-relaxed text-neutral-600 font-semibold"
                      >
                        &ldquo;{tItem.quote}&rdquo;
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Mobile controls inside card */}
                <div className="absolute right-6 bottom-6 flex lg:hidden gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

              </div>

              {/* Right Side Small Dim Card (Next Avatar) */}
              <button
                onClick={nextTestimonial}
                className="hidden lg:flex flex-col items-center justify-center relative w-24 h-40 overflow-hidden rounded-2xl opacity-40 hover:opacity-80 transition-opacity duration-300 group cursor-pointer border border-black/5 shrink-0 bg-neutral-200 shadow-md"
              >
                <Image
                  src={tNext.img}
                  alt={tNext.name}
                  fill
                  sizes="96px"
                  className="object-cover scale-103 group-hover:scale-100 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <ArrowRight className="w-8 h-8 drop-shadow" />
                </div>
              </button>

            </div>

            {/* Large screen layout navigation buttons */}
            <div className="hidden lg:flex justify-center gap-4 pt-4">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center bg-white text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center bg-white text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-md"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
