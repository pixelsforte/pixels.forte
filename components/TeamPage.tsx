"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";

const TEAM_MEMBERS = [
  {
    id: "1",
    name: "Mila Rodriguez",
    role: "Creative Director",
    img: "/team/team-1.webp",
  },
  {
    id: "2",
    name: "Lucas Bennett",
    role: "Strategy Director",
    img: "/team/team-2.webp",
  },
  {
    id: "3",
    name: "Olivia Turner",
    role: "Tech Lead",
    img: "/team/team-3.webp",
  },
  {
    id: "4",
    name: "Noah Kim",
    role: "Senior Product Designer",
    img: "/team/team-4.webp",
  },
  {
    id: "5",
    name: "Ava Mitchell",
    role: "UI/UX Design Lead",
    img: "/team/team-5.webp",
  },
  {
    id: "6",
    name: "Lily Anderson",
    role: "Content & Storytelling Lead",
    img: "/team/team-6.webp",
  },
  {
    id: "7",
    name: "Ethan Wright",
    role: "Brand Strategist",
    img: "/team/team-7.webp",
  },
  {
    id: "8",
    name: "Sophia Martinez",
    role: "Brand Designer",
    img: "/team/team-8.webp",
  },
  {
    id: "9",
    name: "Marcus Vance",
    role: "Art Director",
    img: "/team/team-9.webp",
  },
];

export default function TeamPage() {
  const router = useRouter();
  return (
    <div className="w-full bg-[#f4f1ea] text-black">
      {/* HERO SECTION */}
      <section className="relative w-full h-[60vh] min-h-[480px] flex flex-col justify-center items-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/team/team-page-banner.webp"
            alt="The Crew Banner"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          {/* Dark gradient overlay for extreme high-end cinematic feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[11px] font-bold tracking-[0.4em] text-white/95 uppercase mb-3"
          >
            TEAM
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight animate-[fade-in-up_1s_ease]"
          >
            The crew
          </motion.h1>
        </div>
      </section>

      {/* TEAM GRID SECTION */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
              onClick={() => {
                router.push(`/team/${member.id}`);
              }}
              className="group relative aspect-[4/5] rounded-none overflow-hidden bg-neutral-200 shadow-lg border border-black/5 cursor-pointer"
            >
              {/* Profile Image */}
              <Image
                src={member.img}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Black Panel Slide-up Hover Overlay */}
              <div className="absolute inset-0 bg-black/85 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                {/* Text Wrapper */}
                <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] space-y-4">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#f26b2c] font-mono tracking-wider uppercase mt-1">
                      {member.role}
                    </p>
                  </div>

                  {/* Social Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs text-neutral-400 font-mono">View Portfolio</span>
                    <span className="w-6 h-6 rounded-none border border-white/20 flex items-center justify-center text-white bg-[#f26b2c]/20 group-hover:bg-[#f26b2c] transition-all duration-300">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white">
                        <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
