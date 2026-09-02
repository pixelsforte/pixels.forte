"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Quote } from "lucide-react";
import { BLOG_POSTS } from "./BlogPage";

function BlogPostInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "1";

  // Find corresponding post, default to first post
  const post = BLOG_POSTS.find((p) => p.id === id) || BLOG_POSTS[0];

  return (
    <div className="w-full bg-[#f4f1ea] text-black">
      {/* SECTION 1: HERO (Displays the exact clicked picture at the top) */}
      <section className="relative w-full h-[60vh] min-h-[450px] flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image - Exactly the clicked image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-bold tracking-[0.3em] text-[#f26b2c] uppercase mb-4"
          >
            {post.category}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2.5xl sm:text-4xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex items-center justify-center gap-6 text-xs text-white/80"
          >
            <span>{post.date}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f26b2c]" />
            <span>{post.readTime}</span>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: BLOG POST BODY */}
      <section className="py-20 px-6 md:px-16 max-w-4xl mx-auto">
        {/* Back to Blog Button */}
        <div className="mb-12">
          <button
            onClick={() => {
              router.push("/blog");
            }}
            className="group flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-[#f26b2c] hover:text-black transition-colors"
            id="back-to-blog-btn"
          >
            <div className="w-8 h-8 rounded-full border border-[#f26b2c]/20 flex items-center justify-center bg-white text-[#f26b2c] group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Back to all posts</span>
          </button>
        </div>

        {/* Editorial Body Content */}
        <article className="space-y-8 text-left text-neutral-800 text-[16px] sm:text-[18px] leading-[1.8] font-sans">
          {post.content.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? "first-letter:text-5xl first-letter:font-extrabold first-letter:mr-3 first-letter:float-left first-letter:text-[#f26b2c] first-letter:font-sans"
                  : ""
              }
            >
              {paragraph}
            </p>
          ))}
        </article>

        {/* Pull Quote Accent */}
        <div className="my-16 border-l-4 border-[#f26b2c] pl-8 py-2 text-left bg-[#faf8f4] p-6">
          <Quote className="w-8 h-8 text-[#f26b2c]/25 mb-4" />
          <p className="text-lg sm:text-xl font-bold text-black italic leading-relaxed">
            &quot;Creativity is the voice of the soul, turning silent thoughts into striking physical forms that enrich our daily lives.&quot;
          </p>
          <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mt-4">
            — Maternal Inspiration
          </p>
        </div>

        {/* SECTION 3: TESTIMONIAL / AUTHOR SHAPE SECTION (The two 'idotted testimonial' photos) */}
        <div className="mt-20 border-t border-black/10 pt-16">
          <h4 className="text-xl sm:text-2xl font-black uppercase text-black mb-10 tracking-tight text-center">
            Reflective Perspectives
          </h4>

          {/* Dual photo showcase utilizing the only allowed images from the public folder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image 1: idotive-testimonial-1 */}
            <div className="group space-y-4 text-center">
              <div className="relative aspect-square w-full max-w-[280px] mx-auto overflow-hidden rounded-none border border-black/5 bg-neutral-200">
                <Image
                  src="/images/idotive-testimonial-1.webp"
                  alt="Testimonial Perspective One"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs font-bold tracking-wider text-neutral-500 uppercase">
                Graceful Living & Comfort
              </p>
            </div>

            {/* Image 2: idotive-testimonial-2 */}
            <div className="group space-y-4 text-center">
              <div className="relative aspect-square w-full max-w-[280px] mx-auto overflow-hidden rounded-none border border-black/5 bg-neutral-200">
                <Image
                  src="/images/idotive-testimonial-2.webp"
                  alt="Testimonial Perspective Two"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs font-bold tracking-wider text-neutral-500 uppercase">
                Thoughtful Spaces & Balance
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BlogPostPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f4f1ea]">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-[#f26b2c] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-neutral-500 font-bold uppercase tracking-wider">
              Loading Post...
            </p>
          </div>
        </div>
      }
    >
      <BlogPostInner />
    </Suspense>
  );
}
