"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Check, Minus } from "lucide-react";

// Inline SVGs for elegant geometric logos on pricing cards
const GeometricLogo1 = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
    <rect x="13" y="13" width="14" height="14" stroke="currentColor" strokeWidth="2" />
    <circle cx="20" cy="20" r="4" fill="currentColor" />
  </svg>
);

const GeometricLogo2 = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <circle cx="20" cy="20" r="18" fill="black" />
    <path d="M12 20H28M20 12V28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="20" cy="20" r="5" fill="#f26b2c" />
  </svg>
);

const GeometricLogo3 = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <circle cx="20" cy="20" r="18" fill="black" />
    <path d="M13 13L27 27M27 13L13 27" stroke="white" strokeWidth="2" />
    <rect x="15" y="15" width="10" height="10" stroke="#f26b2c" strokeWidth="2" fill="black" />
  </svg>
);

// Pricing structures
const PRICING_PLANS = [
  {
    id: "starter",
    title: "Starter plan",
    desc: "Perfect for small businesses or startups looking to make a strong first impression.",
    priceMonthly: "29.00",
    priceYearly: "20.00",
    logo: <GeometricLogo1 />,
    features: [
      "Brand discovery session",
      "Logo and identity design",
      "Basic website or landing page",
      "Basic website or landing page",
      "Social media kit",
    ],
    buttonText: "SELECT THIS PLAN",
    hasPopularBadge: false,
    hoverBg: "hover:bg-neutral-50",
  },
  {
    id: "growth",
    title: "Growth plan",
    desc: "Designed for brands ready to expand and build stronger visibility.",
    priceMonthly: "49.00",
    priceYearly: "40.00",
    logo: <GeometricLogo2 />,
    features: [
      "Full brand strategy",
      "Website design & development",
      "Copywriting & content creation",
      "Campaign design",
      "Priority email and chat support",
    ],
    buttonText: "SELECT THIS PLAN",
    hasPopularBadge: true,
    hoverBg: "hover:bg-[#faf8f4]",
  },
  {
    id: "premium",
    title: "Premium plan",
    desc: "A comprehensive creative partnership for established brands.",
    priceMonthly: "99.00",
    priceYearly: "90.00",
    logo: <GeometricLogo3 />,
    features: [
      "Advanced brand identity system",
      "Multi-platform campaign strategy",
      "Motion graphics & video content",
      "Ongoing creative support",
      "Strategic content & copywriting",
    ],
    buttonText: "SELECT THIS PLAN",
    hasPopularBadge: false,
    hoverBg: "hover:bg-neutral-50",
  },
];

// Comparison table definitions
const COMPARISON_CATEGORIES = [
  {
    id: "brand",
    name: "Brand strategy session",
    features: [
      { name: "Social profiles optimized", plans: [true, true, true] },
      { name: "Logo & identity design", plans: [true, true, true] },
      { name: "Website design", plans: [true, true, true] },
      { name: "Advertising campaigns", plans: [false, true, true] },
      { name: "Revisions included", plans: [true, true, true] },
      { name: "Multi-channel campaigns", plans: [false, false, true] },
    ],
  },
  {
    id: "manager",
    name: "Dedicated project manager",
    features: [
      { name: "Dedicated manager", plans: [false, true, true] },
      { name: "Single point of contact", plans: [false, false, true] },
      { name: "Regular updates", plans: [true, true, true] },
      { name: "Priority handling", plans: [false, true, true] },
    ],
  },
  {
    id: "turnaround",
    name: "Turnaround time",
    features: [
      { name: "7-10 business days", plans: [true, true, true] },
      { name: "5-7 business days", plans: [false, true, true] },
      { name: "3-5 business days", plans: [false, false, true] },
      { name: "Rush delivery", plans: [false, false, true] },
    ],
  },
  {
    id: "support",
    name: "Ongoing support",
    features: [
      { name: "Post-launch support", plans: [true, true, true] },
      { name: "Bug fixes", plans: [true, true, true] },
      { name: "Content updates", plans: [false, true, true] },
      { name: "Priority support", plans: [false, false, true] },
    ],
  },
  {
    id: "addons",
    name: "Custom add-ons",
    features: [
      { name: "Extra pages", plans: [true, true, true] },
      { name: "CMS setup", plans: [false, true, true] },
      { name: "Advanced animations", plans: [false, false, true] },
      { name: "SEO optimization", plans: [false, true, true] },
    ],
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<string>("pricing");
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    brand: true,
    manager: false,
    turnaround: false,
    support: false,
    addons: false,
  });

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

      <main className="w-full bg-[#f4f1ea] text-black min-h-screen pt-24 pb-32 px-6 md:px-16 overflow-hidden">
        {/* HERO HEADER SECTION */}
        <div className="max-w-7xl mx-auto text-center space-y-4 mt-6 sm:mt-12 mb-12 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-3xl font-bold tracking-tight text-neutral-900 uppercase"
          >
            Pricing plans for
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-6xl lg:text-8xl font-black text-black tracking-tight leading-[1.05] sm:leading-none uppercase"
          >
            every creative journey
          </motion.h2>
        </div>

        {/* BILLING TOGGLE SWITCH */}
        <div className="flex items-center justify-center gap-4 mb-16 sm:mb-24">
          <button
            onClick={() => setIsYearly(false)}
            className={`text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
              !isYearly ? "text-black" : "text-neutral-400"
            }`}
          >
            Monthly
          </button>

          {/* CAPSULE TOGGLE CONTAINER */}
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-16 h-8 bg-black rounded-full p-1 cursor-pointer transition-colors duration-300 flex items-center"
          >
            <motion.div
              animate={{ x: isYearly ? 32 : 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className="w-6 h-6 bg-white rounded-full shadow"
            />
          </button>

          <button
            onClick={() => setIsYearly(true)}
            className={`text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
              isYearly ? "text-black" : "text-neutral-400"
            }`}
          >
            Yearly
          </button>
        </div>

        {/* THREE PRICING PLANS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-40">
          {PRICING_PLANS.map((plan, idx) => {
            const displayPrice = isYearly ? plan.priceYearly : plan.priceMonthly;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex flex-col justify-between bg-white rounded-none border border-black/10 p-6 sm:p-10 shadow-lg min-h-auto lg:min-h-[680px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${plan.hoverBg}`}
              >
                {/* Pop tag on Growth card */}
                {plan.hasPopularBadge && (
                  <div className="absolute top-6 right-6 border border-black/15 bg-white text-[9px] font-bold tracking-wider text-black px-4 py-1.5 uppercase rounded-none shadow-sm font-mono">
                    MOST POPULAR
                  </div>
                )}

                {/* Top content wrapper */}
                <div className="space-y-8">
                  {/* Circle emblem */}
                  <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center bg-white shadow-sm">
                    {plan.logo}
                  </div>

                  {/* Plan Name & Desc */}
                  <div className="space-y-3">
                    <h3 className="text-3xl font-black text-black uppercase tracking-tight">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                      {plan.desc}
                    </p>
                  </div>

                  {/* Animated Price */}
                  <div className="pt-2">
                    <div className="flex items-baseline text-black">
                      <span className="text-4xl font-extrabold">$</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={displayPrice}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.25 }}
                          className="text-6xl font-black tracking-tight"
                        >
                          {displayPrice}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="w-full h-px bg-black/10 my-2" />

                  {/* Feature Lists */}
                  <ul className="space-y-4">
                    {plan.features.map((feature, fIdx) => {
                      // Growth plan has special vibrant orange features which transition to white/black on hover!
                      const isGrowth = plan.id === "growth";
                      return (
                        <li key={fIdx} className="flex items-center gap-3">
                          {/* Circle checkmark */}
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${
                              isGrowth
                                ? "bg-[#f26b2c] text-white border border-transparent group-hover:bg-neutral-100 group-hover:text-black group-hover:border-black/10"
                                : "bg-black/5 text-black border border-black/5"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </div>

                          {/* Feature name with orange bg capsule for Growth card */}
                          {isGrowth ? (
                            <span className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white bg-[#f26b2c] border border-transparent rounded-none transition-all duration-500 group-hover:bg-neutral-100 group-hover:text-black group-hover:border-black/5">
                              {feature}
                            </span>
                          ) : (
                            <span className="text-xs font-bold uppercase tracking-wide text-neutral-800">
                              {feature}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* SELECT THIS PLAN action button */}
                <div className="pt-10">
                  <button
                    className={`w-full group relative flex h-[54px] items-center justify-center overflow-hidden rounded-none text-[11px] font-bold tracking-widest uppercase transition-all duration-300 border ${
                      plan.id === "growth"
                        ? "bg-[#f26b2c] text-white border-transparent hover:border-black"
                        : "bg-neutral-100 text-black border-black/10 hover:border-black"
                    }`}
                  >
                    {/* Hover slider block */}
                    <span className="absolute inset-0 h-full w-full translate-y-full bg-black transition-transform duration-300 ease-out group-hover:translate-y-0" />

                    <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                      <span>{plan.buttonText}</span>
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* DYNAMIC AND TAILORED SOLUTIONS HEADING SECTION */}
        <div className="max-w-7xl mx-auto text-center space-y-6 mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black leading-tight max-w-4xl mx-auto uppercase">
            Intelligent, flexible solutions tailored to fit your goals and budget
          </h2>
        </div>

        {/* 4-COLUMN HORIZONTAL BANNERS ROW */}
        {/* Left column is empty, other three columns contain cards aligning with comparison grid below */}
        <div className="hidden md:grid grid-cols-12 gap-6 max-w-7xl mx-auto mb-10 items-stretch">
          {/* Column 1 Placeholder spacing */}
          <div className="col-span-3" />

          {/* Card 2: Starter plan box (Orange) */}
          <div className="col-span-3 group relative bg-[#f26b2c] text-white p-8 rounded-none flex flex-col justify-between min-h-[220px] shadow-lg border border-black/10 transition-all duration-500 hover:bg-white hover:text-black hover:border-black">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-white/80 group-hover:text-neutral-500 transition-colors duration-500">
                Starter plan
              </span>
              <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                ${isYearly ? "20.00" : "29.00"} <span className="text-sm font-normal">/ Month</span>
              </h4>
            </div>

            <button className="w-full mt-6 h-10 bg-white text-black text-[10px] font-bold tracking-wider uppercase rounded-none border border-transparent hover:bg-black hover:text-white transition-all duration-300">
              SELECT THIS PLAN
            </button>
          </div>

          {/* Card 3: Growth plan box (Brown) */}
          <div className="col-span-3 group relative bg-[#5c4033] text-white p-8 rounded-none flex flex-col justify-between min-h-[220px] shadow-lg border border-black/10 transition-all duration-500 hover:bg-white hover:text-black hover:border-black">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-white/80 group-hover:text-neutral-500 transition-colors duration-500">
                Growth plan
              </span>
              <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                ${isYearly ? "40.00" : "49.00"} <span className="text-sm font-normal">/ Month</span>
              </h4>
            </div>

            <button className="w-full mt-6 h-10 bg-white text-black text-[10px] font-bold tracking-wider uppercase rounded-none border border-transparent hover:bg-black hover:text-white transition-all duration-300">
              SELECT THIS PLAN
            </button>
          </div>

          {/* Card 4: Premium plan box (Purple) */}
          <div className="col-span-3 group relative bg-[#4c1d95] text-white p-8 rounded-none flex flex-col justify-between min-h-[220px] shadow-lg border border-black/10 transition-all duration-500 hover:bg-white hover:text-black hover:border-black">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-white/80 group-hover:text-neutral-500 transition-colors duration-500">
                Premium plan
              </span>
              <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                ${isYearly ? "90.00" : "99.00"} <span className="text-sm font-normal">/ Month</span>
              </h4>
            </div>

            <button className="w-full mt-6 h-10 bg-white text-black text-[10px] font-bold tracking-wider uppercase rounded-none border border-transparent hover:bg-black hover:text-white transition-all duration-300">
              SELECT THIS PLAN
            </button>
          </div>
        </div>

        {/* DETAILED PLAN COMPARISON SECTION (GRID ACCORDION) */}
        <div className="max-w-7xl mx-auto space-y-6">
          {COMPARISON_CATEGORIES.map((category) => {
            const isExpanded = expandedCategories[category.id];

            return (
              <div key={category.id} className="border border-black/10 bg-white shadow-md rounded-none overflow-hidden">
                {/* Header bar: toggler */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full h-16 bg-black text-white px-8 flex items-center justify-between cursor-pointer transition-colors hover:bg-neutral-900"
                >
                  <span className="text-sm sm:text-base font-black uppercase tracking-wider">
                    {category.name}
                  </span>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white" />
                  )}
                </button>

                {/* Accordion panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden bg-[#faf8f4]"
                    >
                      {/* Grid Body */}
                      <div className="p-1 md:p-0">
                        {category.features.map((feature, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-12 gap-4 md:gap-6 py-5 px-8 items-center border-b border-black/5 hover:bg-neutral-50 transition-colors"
                          >
                            {/* Feature Title (Col 1) */}
                            <div className="col-span-12 md:col-span-3 text-left">
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-neutral-800">
                                {feature.name}
                              </span>
                            </div>

                            {/* Plan 1 (Starter) Check Status (Col 2) */}
                            <div className="col-span-4 md:col-span-3 flex justify-start md:justify-center items-center gap-2">
                              <span className="md:hidden text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                                Starter:
                              </span>
                              {feature.plans[0] ? (
                                <div className="w-6 h-6 rounded-full border border-black/15 bg-black/5 flex items-center justify-center text-black">
                                  <Check className="w-3.5 h-3.5" />
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full border border-black/5 bg-transparent flex items-center justify-center text-neutral-300">
                                  <Minus className="w-3.5 h-3.5" />
                                </div>
                              )}
                            </div>

                            {/* Plan 2 (Growth) Check Status (Col 3) */}
                            <div className="col-span-4 md:col-span-3 flex justify-start md:justify-center items-center gap-2">
                              <span className="md:hidden text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                                Growth:
                              </span>
                              {feature.plans[1] ? (
                                <div className="w-6 h-6 rounded-full border border-black/15 bg-black/5 flex items-center justify-center text-black">
                                  <Check className="w-3.5 h-3.5" />
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full border border-black/5 bg-transparent flex items-center justify-center text-neutral-300">
                                  <Minus className="w-3.5 h-3.5" />
                                </div>
                              )}
                            </div>

                            {/* Plan 3 (Premium) Check Status (Col 4) */}
                            <div className="col-span-4 md:col-span-3 flex justify-start md:justify-center items-center gap-2">
                              <span className="md:hidden text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                                Premium:
                              </span>
                              {feature.plans[2] ? (
                                <div className="w-6 h-6 rounded-full border border-black/15 bg-black/5 flex items-center justify-center text-black">
                                  <Check className="w-3.5 h-3.5" />
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full border border-black/5 bg-transparent flex items-center justify-center text-neutral-300">
                                  <Minus className="w-3.5 h-3.5" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}
