"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }, 5000);
    }
  };

  const socials = [
    { name: "Behance", href: "https://www.behance.net/pixels-forte" },
    { name: "Instagram", href: "https://www.instagram.com/pixels.forte/" },
    { name: "Linkedin", href: "https://www.linkedin.com/company/pixels-forte-private-limited/" },
  ];

  return (
    <div className="w-full bg-[#f4f1ea] text-black">
      {/* SECTION 1: HERO TITLE */}
      <section className="w-full pt-28 sm:pt-36 md:pt-44 pb-8 sm:pb-12 px-6 sm:px-12 md:px-16 lg:px-24 max-w-[1400px] mx-auto text-left">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[115px] font-black text-black tracking-[-0.03em] leading-none"
        >
          Get in touch
        </motion.h1>
      </section>

      {/* SECTION 2: SUB-HEADER COLLABORATION ROW (BORDERS MATCHING VIDEO LAYOUT) */}
      <section className="w-full border-t border-b border-black/10 bg-[#f4f1ea]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12">
          {/* Left: Collaborator / Creative Director Info (No image as requested) */}
          <div className="md:col-span-4 lg:col-span-3.5 p-6 sm:p-10 md:border-r border-black/10 flex flex-col justify-center text-left">
            <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight">
              Mirza Hashim Ali Baig
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
              Creative Director &amp; Lead
            </p>
          </div>

          {/* Right: Inspirational Lead Statement */}
          <div className="md:col-span-8 lg:col-span-8.5 p-6 sm:p-10 flex items-center text-left">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] font-medium text-black leading-snug tracking-tight max-w-4xl">
              Let&apos;s collaborate to turn your ideas into impactful creative solutions that inspire and perform
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: MAIN CONTACT & FORM GRID (VIDEO EXACT LAYOUT) */}
      <section className="w-full border-b border-black/10 bg-[#f4f1ea]" id="contact-card">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Social Links & Message Blurb */}
          <div className="md:col-span-4 lg:col-span-3.5 p-6 sm:p-10 md:border-r border-black/10 flex flex-col justify-between gap-12 text-left">
            {/* Social Links */}
            <div className="space-y-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 text-xl sm:text-2xl font-bold text-black hover:text-[#f26b2c] transition-colors group cursor-pointer"
                >
                  <span>{social.name}</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>

            {/* Message info blurb */}
            <div className="space-y-2 pt-6 border-t border-black/10 md:border-t-0">
              <h4 className="text-base font-bold text-black">
                Message
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                We&apos;d love to hear from you! Share your ideas or project goals, and we&apos;ll get back to you to bring your vision to life.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Details & Architectural Form */}
          <div className="md:col-span-8 lg:col-span-8.5 p-6 sm:p-10 lg:p-12 text-left flex flex-col justify-between">
            
            {/* Top: Phone & Email */}
            <div className="mb-10 sm:mb-12">
              <a
                href="tel:+923320041234"
                className="text-xs sm:text-sm text-neutral-600 font-medium block hover:text-[#f26b2c] transition-colors mb-1"
              >
                +92 332 004 1234
              </a>
              <a
                href="mailto:info@pixelsforte.com"
                className="text-2xl sm:text-3xl md:text-4xl font-black text-black hover:text-[#f26b2c] transition-colors tracking-tight block"
              >
                info@pixelsforte.com
              </a>
            </div>

            {/* The Form Grid */}
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  {/* 2x2 Grid for standard inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                    
                    {/* Name */}
                    <div className="space-y-2 border-b border-black/15 pb-2 focus-within:border-black transition-colors">
                      <label className="text-xs sm:text-sm font-bold text-black block">
                        Name*
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder=""
                        className="w-full bg-transparent text-black text-sm sm:text-base py-1 outline-none placeholder:text-neutral-400"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2 border-b border-black/15 pb-2 focus-within:border-black transition-colors">
                      <label className="text-xs sm:text-sm font-bold text-black block">
                        Email*
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder=""
                        className="w-full bg-transparent text-black text-sm sm:text-base py-1 outline-none placeholder:text-neutral-400"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2 border-b border-black/15 pb-2 focus-within:border-black transition-colors">
                      <label className="text-xs sm:text-sm font-bold text-black block">
                        Phone*
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder=""
                        className="w-full bg-transparent text-black text-sm sm:text-base py-1 outline-none placeholder:text-neutral-400"
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-2 border-b border-black/15 pb-2 focus-within:border-black transition-colors">
                      <label className="text-xs sm:text-sm font-bold text-black block">
                        Subject*
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder=""
                        className="w-full bg-transparent text-black text-sm sm:text-base py-1 outline-none placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2 border-b border-black/15 pb-2 focus-within:border-black transition-colors">
                    <label className="text-xs sm:text-sm font-bold text-black block">
                      Your message*
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder=""
                      className="w-full bg-transparent text-black text-sm sm:text-base py-1 outline-none resize-none placeholder:text-neutral-400"
                    />
                  </div>

                  {/* Bottom Action: Submit Button Aligned to Right */}
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="group relative inline-flex items-center justify-center overflow-hidden bg-black px-8 sm:px-10 py-4 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#f26b2c] cursor-pointer shadow-md"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <span>Let&apos;s collaborate</span>
                        <Send className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="flex flex-col items-center justify-center py-16 text-center space-y-4 bg-black/5 p-8 border border-black/10"
                >
                  <div className="w-16 h-16 rounded-full bg-[#f26b2c]/10 flex items-center justify-center text-[#f26b2c] border border-[#f26b2c]/30">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black text-black">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-neutral-600 max-w-md">
                    Thank you for reaching out to Pixelsforte. Our creative team has received your message and will get back to you shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* SECTION 4: THREE PRESERVED CARDS BELOW CONTACT SECTION */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto bg-[#f4f1ea]">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.25em] text-[#f26b2c] font-bold uppercase block mb-3">
            EXPLORE OPPORTUNITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black">
            How to reach us
          </h2>
        </div>

        {/* Three beautiful image cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col justify-between items-start border border-black/5 bg-[#faf8f4] p-6 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="w-full space-y-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                <Image
                  src="/about/about-Darksec1.webp"
                  alt="Our Main Studio"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-lg font-bold text-black group-hover:text-[#f26b2c] transition-colors">
                Creative Studio
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Step inside our physical environment. A highly collaborative open-office hosting developers, visual directors, and designers working in tandem.
              </p>
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-[#f26b2c] mt-6 block">
              Learn More
            </span>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col justify-between items-start border border-black/5 bg-[#faf8f4] p-6 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="w-full space-y-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                <Image
                  src="/about/about-Darksec2.webp"
                  alt="Partnership Projects"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-lg font-bold text-black group-hover:text-[#f26b2c] transition-colors">
                Project Inquiries
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Interested in working together on branding, custom web assets, or full campaign designs? Request an introductory creative workshop or strategy call.
              </p>
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-[#f26b2c] mt-6 block">
              Learn More
            </span>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col justify-between items-start border border-black/5 bg-[#faf8f4] p-6 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="w-full space-y-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                <Image
                  src="/about/about-Darksec3.webp"
                  alt="Our Careers"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-lg font-bold text-black group-hover:text-[#f26b2c] transition-colors">
                Artist Partnerships
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                We consistently sponsor artist fellowships, local craftsmanship fairs, and gallery displays. Let&apos;s unite to bring rich organic expression back into digital spaces.
              </p>
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-[#f26b2c] mt-6 block">
              Learn More
            </span>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
