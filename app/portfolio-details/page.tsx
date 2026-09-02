"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Sparkles, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_PROJECTS, PortfolioProject } from "@/lib/portfolioData";

type PageType = string;

function PortfolioDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawId = searchParams.get("id") || "horizon";
  const project: PortfolioProject = PORTFOLIO_PROJECTS[rawId] || PORTFOLIO_PROJECTS["horizon"];

  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  // Other projects for bottom recommendation section
  const otherProjects = Object.values(PORTFOLIO_PROJECTS).filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <main className="w-full bg-[#f4f1ea] text-black min-h-screen pt-20 pb-24 overflow-hidden">
      
      {/* TOP CATEGORY BADGE & HERO TITLE */}
      <div className="max-w-7xl mx-auto text-center space-y-3 mt-8 mb-6 px-6 md:px-16">
        <motion.div
          key={`badge-${project.id}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-[10px] font-mono tracking-[0.2em] font-black uppercase text-neutral-600"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#f26b2c]" />
          {project.category}
        </motion.div>

        <motion.h1
          key={`title-${project.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-2.5xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black uppercase tracking-tight leading-tight sm:leading-none max-w-5xl mx-auto"
        >
          {project.title}
        </motion.h1>
        <p className="text-xs sm:text-sm font-mono tracking-widest text-neutral-500 font-bold uppercase">
          {project.subtitle}
        </p>
      </div>

      {/* METADATA HORIZONTAL BAR */}
      <div className="max-w-7xl mx-auto border-y border-black/10 py-4 mb-10 grid grid-cols-2 md:grid-cols-4 text-center text-[10px] sm:text-xs font-mono tracking-[0.2em] font-black uppercase text-neutral-500 px-6 md:px-16 gap-2">
        <div>YEAR: 2024–2025</div>
        <div>CATEGORY: {project.category}</div>
        <div>ROLE: BRAND & WEB DESIGN</div>
        <div>TAGS: {project.tags.slice(0, 2).join(", ")}</div>
      </div>

      {/* HERO COVER PROJECT BANNER (First Image) */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-16">
        <motion.div
          key={`banner-${project.id}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-[16/10] sm:aspect-[2/1] overflow-hidden rounded-2xl border border-black/10 shadow-2xl bg-neutral-900 group cursor-pointer"
          onClick={() => setSelectedImage({ src: project.bannerImage, title: `${project.title} – Main Banner` })}
        >
          <Image
            src={project.bannerImage}
            alt={project.title}
            fill
            referrerPolicy="no-referrer"
            sizes="(max-w-[1400px]) 100vw, 1400px"
            priority
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest text-black flex items-center gap-2 shadow-xl">
              <ZoomIn className="w-4 h-4 text-[#f26b2c]" /> View Full Image
            </div>
          </div>
        </motion.div>
      </div>

      {/* TWO-COLUMN CONTENT GRID SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-20">
        
        {/* Column 1: Left Project Spec Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-black/10 p-6 sm:p-8 shadow-xl rounded-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight mb-3">
              Project Specifications
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-semibold mb-6">
              Core highlights, strategic roadmap, and creative deliverables for {project.title}.
            </p>

            <div className="space-y-5 border-t border-black/10 pt-6">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-neutral-400 font-bold uppercase block mb-1">
                  CLIENT / PROJECT
                </span>
                <span className="text-sm font-black uppercase text-black">
                  {project.title}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-neutral-400 font-bold uppercase block mb-1">
                  INDUSTRY
                </span>
                <span className="text-sm font-black uppercase text-black">
                  {project.category}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-neutral-400 font-bold uppercase block mb-1">
                  DELIVERABLES
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.deliverables.map((item) => (
                    <span key={item} className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-neutral-100 border border-black/5 text-neutral-800">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {project.colorPalette && project.colorPalette.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-neutral-400 font-bold uppercase block mb-1">
                    COLOR PALETTE
                  </span>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    {project.colorPalette.map((col) => (
                      <div key={col.name} className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: col.hex }} />
                        <span className="text-xs font-bold text-black uppercase">{col.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: Right Exact Provided Project Content */}
        <div className="lg:col-span-8 space-y-6 text-left flex flex-col justify-center">
          <div className="space-y-4">
            <span className="text-xs font-mono font-black uppercase text-[#f26b2c] tracking-widest">
              PROJECT DESCRIPTION
            </span>
            <h2 className="text-3xl sm:text-4.5xl font-black text-black uppercase tracking-tight leading-tight">
              {project.description.heading}
            </h2>

            {project.description.subheading && (
              <h3 className="text-lg font-bold text-neutral-800 uppercase tracking-wide">
                {project.description.subheading}
              </h3>
            )}
            
            <div className="space-y-4 text-neutral-800 text-base leading-relaxed font-medium">
              {project.description.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* DELIVERABLE CHECKMARKS */}
          <div className="pt-5 border-t border-black/10">
            <span className="text-[10px] font-mono font-black uppercase text-neutral-400 tracking-wider block mb-3">
              KEY DELIVERABLES & FEATURES
            </span>
            <div className="flex flex-wrap gap-2.5">
              {project.deliverables.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-xs font-bold uppercase tracking-wider text-black shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#f26b2c]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GALLERY SECTION (IF GALLERY IMAGES EXIST) */}
      {project.galleryImages.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-16 mb-20">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-mono font-black text-[#f26b2c] uppercase tracking-widest">
              GALLERY & COLLATERAL
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-black uppercase tracking-tight">
              Project Showcase
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-semibold">
              Explore the design, brand collateral, and digital interfaces created for {project.title}.
            </p>
          </div>

          {/* GRID OF REMAINING GALLERY IMAGES */}
          <div className={`grid grid-cols-1 ${project.galleryImages.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1 max-w-4xl mx-auto"} gap-8`}>
            {project.galleryImages.map((imgSrc, idx) => (
              <motion.div
                key={imgSrc}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group cursor-pointer bg-white border border-black/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                onClick={() => setSelectedImage({ src: imgSrc, title: `${project.title} - Asset ${idx + 1}` })}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={imgSrc}
                    alt={`${project.title} Asset ${idx + 1}`}
                    fill
                    referrerPolicy="no-referrer"
                    sizes="(max-w-[700px]) 100vw, 700px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/80 text-white text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md">
                      ASSET #{idx + 1}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-5 h-5 text-[#f26b2c]" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-black text-black uppercase tracking-tight group-hover:text-[#f26b2c] transition-colors">
                    {project.title} – View {idx + 1}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* BOTTOM PORTFOLIO EXPLORATION MODULE */}
      <div className="bg-white border-t border-black/10 py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-black uppercase tracking-tight leading-tight">
              Explore Other Portfolio Projects
            </h2>
          </div>

          {/* Other Projects Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
            {otherProjects.map((other) => (
              <article 
                key={other.id}
                onClick={() => {
                  router.push(`/portfolio-details?id=${other.id}`);
                }}
                className="group cursor-pointer w-full text-left"
              >
                <div className="relative h-[220px] sm:h-[260px] overflow-hidden rounded-2xl bg-neutral-100 border border-black/5 shadow-sm">
                  <Image
                    src={other.bannerImage}
                    alt={other.title}
                    fill
                    referrerPolicy="no-referrer"
                    sizes="(max-w-[500px]) 100vw, 500px"
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black text-xl shadow-xl">
                      ↗
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-black uppercase hover:text-[#f26b2c] transition-colors">
                      {other.title}
                    </h3>
                    <p className="text-xs text-neutral-500 font-semibold mt-1">
                      {other.subtitle}
                    </p>
                  </div>
                  <button className="w-9 h-9 rounded-full flex items-center justify-center bg-black text-white shrink-0 hover:bg-[#f26b2c] transition-colors">
                    →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 md:p-10 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full h-full max-h-[75vh] rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-contain"
                />
              </div>
              <p className="mt-4 text-white text-sm font-black uppercase tracking-widest text-center">
                {selectedImage.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

export default function PortfolioDetailsPage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<PageType>("portfolio-details");

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

      <Suspense fallback={<div className="min-h-screen bg-[#f4f1ea] pt-32 text-center font-mono text-sm uppercase">Loading project...</div>}>
        <PortfolioDetailsContent />
      </Suspense>

      <Footer />
    </>
  );
}
