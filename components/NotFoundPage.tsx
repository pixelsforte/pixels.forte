"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface NotFoundPageProps {
  onBackToHome?: () => void;
}

export default function NotFoundPage({ onBackToHome }: NotFoundPageProps) {
  const router = useRouter();

  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="w-full min-h-[75vh] flex flex-col items-center justify-center bg-[#f4f1ea] text-black px-6 py-20">
      <div className="max-w-md text-center flex flex-col items-center justify-center space-y-8">
        
        {/* BIG 404 GRAPHIC WITH STYLIZED ORANGE MIDDLE ZERO */}
        <div className="flex items-center justify-center font-black select-none leading-none tracking-tighter text-[10rem] sm:text-[12rem] lg:text-[14rem]">
          <motion.span 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-black"
          >
            4
          </motion.span>
          
          <motion.span 
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 150, damping: 15 }}
            className="text-[#f26b2c] px-2"
          >
            0
          </motion.span>
          
          <motion.span 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-black"
          >
            4
          </motion.span>
        </div>

        {/* DETAILS SECTION */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-neutral-950"
          >
            Oops! page not found
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-base text-neutral-500 font-medium max-w-sm mx-auto"
          >
            The page you are looking for doesn't exist or has been moved.
          </motion.p>
        </div>

        {/* BUTTON WITH ELEGANT ACTION TRANSITIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-center animate-fade-in"
        >
          <button 
            onClick={handleBackToHome}
            className="group relative inline-flex h-[48px] items-center justify-center overflow-hidden rounded-none bg-black px-8 text-xs font-bold uppercase tracking-widest text-white transition-colors duration-300 cursor-pointer"
          >
            {/* Sliding Orange Background */}
            <span className="absolute inset-0 h-full w-full translate-y-full bg-[#f26b2c] transition-transform duration-300 ease-out group-hover:translate-y-0" />

            {/* Sliding Text Element */}
            <span className="relative z-10 block h-4 overflow-hidden">
              <span className="block transform transition-transform duration-300 ease-out group-hover:-translate-y-full">
                Back To Home
              </span>
              <span className="absolute left-0 top-0 block translate-y-full transform transition-transform duration-300 ease-out group-hover:translate-y-0">
                Back To Home
              </span>
            </span>
          </button>

          <button 
            onClick={() => { router.push("/license"); }}
            className="group relative inline-flex h-[48px] items-center justify-center overflow-hidden rounded-none border border-black/20 bg-transparent px-8 text-xs font-bold uppercase tracking-widest text-black transition-colors duration-300 cursor-pointer hover:border-black"
          >
            {/* Sliding Dark-Grey Background */}
            <span className="absolute inset-0 h-full w-full translate-y-full bg-black/5 transition-transform duration-300 ease-out group-hover:translate-y-0" />
            
            {/* Sliding Text Element */}
            <span className="relative z-10 block h-4 overflow-hidden">
              <span className="block transform transition-transform duration-300 ease-out group-hover:-translate-y-full">
                View License
              </span>
              <span className="absolute left-0 top-0 block translate-y-full transform transition-transform duration-300 ease-out group-hover:translate-y-0">
                View License
              </span>
            </span>
          </button>
        </motion.div>

      </div>
    </div>
  );
}
