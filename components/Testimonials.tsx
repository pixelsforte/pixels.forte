"use client";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";



interface Testimonial {
  name: string;
  role: string;
  quote: string;
  img: string | StaticImageData;
}

const testimonials: Testimonial[] = [
  {
    name: "James Walker",
    role: "CEO, Summit Digital",
    img: "/images/testimonial-image-big-1.webp", 
    quote: "From concept to execution, their expertise in strategy design and campaigns elevated our brand...",
  },
  {
    name: "Alena Kenter",
    role: "CEO, NovaTech Solutions",
    img: "/images/testimonial-image-big-2.webp", 
    quote: "Their team transformed our vision into a powerful brand experience...",
  },
  {
    name: "Michael Anderson",
    role: "CEO, Horizon Digital",
    img: "/images/testimonial-image-big-3.webp", 
    quote: "Bold design, thoughtful storytelling, and a clear strategic direction helped us stand apart...",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // AUTO SLIDER
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  const item = testimonials[current];

  return (
    <section className="px-6 sm:px-10 py-12 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-[0.9fr_1fr_90px] gap-10 lg:gap-16 items-stretch">
        
        {/* IMAGE */}
        <motion.div 
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: false }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[320px] sm:h-[450px] lg:h-[700px] overflow-hidden rounded-[18px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={item.name} 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={item.img}
                alt={item.name}
                fill
                priority
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CONTENT */}
        <motion.div 
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: false }}
          transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="h-auto lg:h-[700px] flex flex-col justify-center text-left"
        >
          <span className="text-[13px] uppercase tracking-[0.3em] text-neutral-500">
            Testimonial
          </span>

          <h2 className="mt-4 lg:mt-5 max-w-[700px] text-2.5xl sm:text-4xl lg:text-[45px] font-display font-semibold leading-[1.15] lg:leading-[54.9px] tracking-tight lg:tracking-[-2.61px] text-neutral-950">
            Success stories from the brands we’ve helped
          </h2>

          <p className="mt-4 lg:mt-7 max-w-[560px] font-inter font-medium text-[15px] leading-[25.9px] tracking-[0.45px] text-neutral-500">
            See how we help brands grow through smart strategy, bold design, and impactful campaigns that engage audiences and drive lasting results.
          </p>

          <div className="mt-6 lg:mt-auto pb-4 lg:pb-10">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={item.quote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-[760px] text-lg sm:text-2xl lg:text-3xl font-semibold leading-[1.4] tracking-tight text-neutral-900"
              >
                &ldquo;{item.quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-6 lg:mt-10">
              <h3 className="text-[20px] lg:text-[22px] font-semibold">{item.name}</h3>
              <p className="text-neutral-500 mt-1 text-sm">{item.role}</p>
              <div className="mt-3 flex gap-1 text-orange-500 text-lg">
                ★★★★★
              </div>
            </div>
          </div>
        </motion.div>

        {/* SIDE SLIDER / RESPONSIVE CONTROLS (DESKTOP ONLY) */}
        <motion.div 
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: false }}
          transition={{ duration: 0.95, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex h-[700px] flex-col items-center justify-between"
        >
          <button
            onClick={prev}
            className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
          >
            ↑
          </button>

          <div className="flex flex-col gap-3">
            {testimonials.map((person, index) => (
              <button
                key={person.name}
                onClick={() => setCurrent(index)}
                className={`relative w-[90px] h-[140px] overflow-hidden rounded-lg transition-all ${
                  current === index ? "scale-105 ring-2 ring-black" : "opacity-60 hover:opacity-80"
                }`}
              >
                <Image
                  src={person.img}
                  alt={person.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="w-12 h-12 rounded-md bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
          >
            ↓
          </button>
        </motion.div>

        {/* Mobile controls - Simple dots & next/prev buttons (MOBILE ONLY) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex lg:hidden items-center justify-between gap-4 mt-4"
        >
          <button
            onClick={prev}
            className="w-10 h-10 rounded-md bg-black text-white flex items-center justify-center font-bold text-lg active:scale-95 transition-transform"
          >
            ←
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  current === idx ? "w-6 bg-[#f26b2c]" : "bg-neutral-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-md bg-black text-white flex items-center justify-center font-bold text-lg active:scale-95 transition-transform"
          >
            →
          </button>
        </motion.div>

      </div>
    </section>
  );
}