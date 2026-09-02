"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Mindful Spaces: Crafting Serenity at Home",
    category: "LIFESTYLE",
    date: "July 12, 2026",
    readTime: "5 min read",
    excerpt: "How intentional layout, soft organic textures, and natural lighting transform our daily living environments.",
    image: "/Blog/Blog-One-1.webp",
    content: [
      "Creating a peaceful home environment is more than an aesthetic pursuit; it is a vital practice for our mental and emotional well-being. By focusing on intentional placement, natural light, and organic textures, we can build spaces that act as sanctuaries from the fast-paced outside world.",
      "In this feature, we delve deep into the principles of minimalist design and interior styling. We discuss how decluttering can liberate mental energy, and how introducing living elements like houseplants and stone surfaces brings a grounding presence into our rooms.",
      "Whether you are working with a cozy studio apartment or a spacious family home, simple adjustments can yield dramatic improvements. Discover the power of breathing room, soft ambient lights, and color palettes inspired by the earth."
    ]
  },
  {
    id: "2",
    title: "Exploring Creative Horizons: A Journey Through Abstract Mediums",
    category: "CREATIVE & DESIGN",
    date: "June 28, 2026",
    readTime: "7 min read",
    excerpt: "Diving into contemporary painting and mixed-media design, exploring how color interactions influence emotional responses.",
    image: "/Blog/Blog-One-2.webp",
    content: [
      "Art is an ever-evolving dialogue between the creator and the canvas. In our latest exploration, we examine the rich, expressive world of abstract expressionism and how artists employ tactile textures to communicate raw emotion.",
      "We look at modern color theory and how contrasting pigment pairings can evoke states of excitement, reflection, or tranquility. Understanding these subconscious triggers allows us to curate art in our homes with greater sensitivity and impact.",
      "From dynamic palette knife strokes to delicate watercolor washes, we celebrate the diverse mediums that contemporary creators use to transcend words and touch the human spirit."
    ]
  },
  {
    id: "3",
    title: "Capturing Golden Hour: Lessons in Ambient Photography",
    category: "PHOTOGRAPHY",
    date: "June 14, 2026",
    readTime: "4 min read",
    excerpt: "How to leverage natural sunlight, shadows, and angle composition to produce evocative visual stories.",
    image: "/Blog/Blog-One-3.webp",
    content: [
      "Photography is the poetry of light. Among all times of day, the golden hour—just after sunrise or right before sunset—holds a special magic that can instantly elevate any portrait, landscape, or architectural capture.",
      "We discuss practical techniques for managing exposure, utilizing long dramatic shadows, and setting up backlit compositions that create a warm, ethereal glow. Learn to see light not just as an illumination source, but as a primary storytelling character.",
      "Whether you are shooting with a professional DSLR or a mobile phone, golden hour offers endless opportunities to create cinematic depth and intimate textures in your photographs."
    ]
  },
  {
    id: "4",
    title: "Sustaining Creative Flow: Rituals for Overcoming Blocks",
    category: "INSPIRATION",
    date: "May 30, 2026",
    readTime: "6 min read",
    excerpt: "Practical daily habits and routines that help writers, designers, and painters maintain inspiration and momentum.",
    image: "/Blog/Blog-One-4.webp",
    content: [
      "Every creative individual eventually encounters the quiet void of a blank page or empty canvas. Overcoming these periods of stagnation is not about waiting for a sudden strike of lightning, but about building reliable rituals.",
      "We explore the power of morning walks, structured journaling, and setting healthy digital boundaries. By creating small, pressure-free windows for play and experimentation, we can gently coax our creative minds back into flow.",
      "Explore how historical figures navigated their blocks, and discover how establishing a dedicated workspace can prime your subconscious to enter a state of focused productivity."
    ]
  },
  {
    id: "5",
    title: "The Quiet Elegance of Modern Ceramics and Claycraft",
    category: "CREATIVE & DESIGN",
    date: "May 15, 2026",
    readTime: "5 min read",
    excerpt: "An appreciation of handcrafted pottery, highlighting the beauty found in organic imperfections.",
    image: "/Blog/Blog-One-5.webp",
    content: [
      "In a world dominated by mass production, handcrafted ceramics stand as a testament to the beauty of slow, deliberate creation. Each pinch of the clay and spin of the wheel records the unique physical touch of the artisan.",
      "We highlight the ancient Japanese philosophy of Wabi-Sabi—finding perfection in imperfection. From asymmetrical bowls to rough, unglazed finishes, these organic textures tell stories of resilience, earth, and time.",
      "Learn about the resurgence of local pottery studios and how incorporating handmade vessels into your daily life can foster a deeper connection to our food and our tables."
    ]
  },
  {
    id: "6",
    title: "Curating a Minimalist Wardrobe: Quality Over Quantity",
    category: "LIFESTYLE",
    date: "April 29, 2026",
    readTime: "8 min read",
    excerpt: "A guide to building a capsule collection of timeless, durable, and ethically sourced garments.",
    image: "/Blog/Blog-One-6.webp",
    content: [
      "Simplifying your closet is one of the most rewarding steps toward a mindful lifestyle. A capsule wardrobe focuses on versatility, high-quality fabrics, and enduring silhouettes rather than fleeting seasonal trends.",
      "We outline practical steps to auditing your current clothes, defining your signature style palette, and investing in sustainable fabrics like linen, wool, and organic cotton that soften and age beautifully over time.",
      "Embracing a minimalist wardrobe not only saves morning decision-making fatigue but also supports an ethical fashion cycle that values craftsmanship, fair wages, and environmental preservation."
    ]
  },
  {
    id: "7",
    title: "The Symphony of Typographic Heritage and Modern Print",
    category: "CREATIVE & DESIGN",
    date: "April 10, 2026",
    readTime: "6 min read",
    excerpt: "Tracing the legacy of classic layout composition, letterpress printing, and their role in modern editorial systems.",
    image: "/Blog/Blog image one (13).webp",
    content: [
      "Typography is the physical voice of written thought. From the early days of metal letterpress printing to the modern screens of today, the selection of typefaces has always shaped how we perceive and absorb information.",
      "We dive into the rich history of classic editorial layouts and serif fonts. We look at how spacing, tracking, and layout margins establish a quiet visual rhythm that commands respect and guides readers through complex ideas.",
      "See how contemporary designers are marrying historical print aesthetics with clean, interactive web designs to create unique, highly readable, and editorial digital publications."
    ]
  },
  {
    id: "8",
    title: "Harmonizing Organic Tones: A Palette for Gentle Living",
    category: "LIFESTYLE",
    date: "March 24, 2026",
    readTime: "5 min read",
    excerpt: "A curation of soft whites, sand-beiges, and sage greens to bring the tranquility of nature indoors.",
    image: "/Blog/Blog image two (13).webp",
    content: [
      "Color has a profound ability to quiet the mind and settle the nervous system. By curating a color palette derived from organic landscapes—coastal sands, dried sage, and warm stone—we invite the gentle rhythms of nature into our daily lives.",
      "We explore interior paint selections, textile dye techniques, and natural linen styling tips. Discover how warm, muted undertones create a cohesive visual flow between different rooms, making even small spaces feel continuous and open.",
      "Embrace a design language centered on comfort, quiet elegance, and sustainable materials that resonate with natural, light-filled environments."
    ]
  }
];

export default function BlogPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const cardsPerPage = 6;

  // Split logic: Page 1 gets 6 cards (indexes 0-5), Page 2 gets 2 cards (indexes 6-7)
  const displayedPosts = currentPage === 1 
    ? BLOG_POSTS.slice(0, 6) 
    : BLOG_POSTS.slice(6, 8);

  const handlePostClick = (id: string) => {
    router.push(`/blog-post?id=${id}`);
  };

  return (
    <div className="w-full bg-[#f4f1ea] text-black">
      {/* SECTION 1: HERO */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Blog/blog-banner.webp"
            alt="Our Blog Background"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          {/* Subtle dark overlay for text contrast */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[11px] font-bold tracking-[0.3em] text-white/90 uppercase mb-3"
          >
            OUR STORIES & IDEAS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight"
          >
            The Blog
          </motion.h1>
        </div>
      </section>

      {/* SECTION 2: BLOG GRID & PAGINATION */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col items-start gap-4 mb-16 text-left">
          <span className="inline-block bg-[#f26b2c] text-white text-[10px] font-bold tracking-[0.2em] px-4 py-1.5 rounded-none uppercase">
            CREATIVE PERSPECTIVES
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight max-w-3xl">
            Insights on design, art, style, and mindful living from our creative desk
          </h2>
        </div>

        {/* Grid Container with Framer Motion Staggered Entrance */}
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12"
        >
          {displayedPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              className="group flex flex-col justify-between items-start text-left cursor-pointer border border-black/5 bg-[#faf8f4] hover:bg-[#fff] p-6 hover:shadow-xl hover:border-[#f26b2c]/20 transition-all duration-300"
              id={`blog-card-${post.id}`}
            >
              <div className="w-full space-y-4">
                {/* Clickable Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-200">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category badge floating in image */}
                  <div className="absolute top-4 left-4 bg-black/75 px-3 py-1">
                    <span className="text-[9px] font-extrabold tracking-wider text-white uppercase">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs text-neutral-400">
                  <span>{post.date}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f26b2c]" />
                  <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-black group-hover:text-[#f26b2c] transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* READ POST Button */}
              <div className="mt-6 pt-6 border-t border-black/5 w-full flex items-center justify-between text-[#f26b2c]">
                <span className="text-[10px] font-black uppercase tracking-widest text-black group-hover:text-[#f26b2c] transition-colors">
                  Read Article
                </span>
                <div className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center bg-[#faf8f4] text-black group-hover:bg-[#f26b2c] group-hover:border-[#f26b2c] group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        {/* PAGINATION BUTTONS */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-black/10 pt-8">
          <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">
            Showing {currentPage === 1 ? "1 - 6" : "7 - 8"} of 8 articles
          </p>

          <div className="flex items-center gap-2">
            {/* Prev Button */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`flex h-10 px-4 items-center justify-center gap-2 border text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                currentPage === 1
                  ? "border-black/5 text-neutral-300 cursor-not-allowed"
                  : "border-black/10 hover:bg-black hover:text-white hover:border-black text-black"
              }`}
              id="prev-page-btn"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            {/* Page 1 indicator */}
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-10 h-10 flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                currentPage === 1
                  ? "bg-[#f26b2c] text-white"
                  : "border border-black/10 hover:border-black text-black"
              }`}
              id="page-1-btn"
            >
              1
            </button>

            {/* Page 2 indicator */}
            <button
              onClick={() => setCurrentPage(2)}
              className={`w-10 h-10 flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                currentPage === 2
                  ? "bg-[#f26b2c] text-white"
                  : "border border-black/10 hover:border-black text-black"
              }`}
              id="page-2-btn"
            >
              2
            </button>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(2)}
              disabled={currentPage === 2}
              className={`flex h-10 px-4 items-center justify-center gap-2 border text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                currentPage === 2
                  ? "border-black/5 text-neutral-300 cursor-not-allowed"
                  : "border-black/10 hover:bg-black hover:text-white hover:border-black text-black"
              }`}
              id="next-page-btn"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
