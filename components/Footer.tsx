"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const col1 = [
    { label: 'Home', href: '/' },
    { label: 'Service', href: '/services-two' },
    { label: 'Portfolio', href: '/portfolio-one' },
  ];

  const socials = [
    { name: 'Behance', href: 'https://www.behance.net/pixels-forte' },
    { name: 'Instagram', href: 'https://www.instagram.com/pixels.forte/' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/pixels-forte-private-limited/about/?viewAsMember=true' },
  ];

  return (
    <footer className="w-full bg-black text-white pt-20 pb-16 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden relative selection:bg-white selection:text-black">
      {/* Top Main Section */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-neutral-800 items-start">
        
        {/* Left Column: Logo, Contact info */}
        <div className="md:col-span-4 lg:col-span-4 flex flex-col justify-start">
          
          {/* Logo Section */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="group block w-fit"
            >
              <div className="relative h-[68px] sm:h-[86px] md:h-[98px] w-[192px] sm:w-[242px] md:w-[276px]">
                <Image
                  src="/logo-1.png"
                  alt="Pixels Forte wordmark"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Mail info */}
          <div className="mb-8">
            <span className="text-xs tracking-[0.15em] text-neutral-400 font-sans uppercase block mb-1.5 font-medium">
              MAIL :
            </span>
            <a 
              href="mailto:info@pixelsforte.com" 
              className="text-2xl sm:text-[28px] font-bold text-white hover:text-neutral-300 transition-colors tracking-tight block"
            >
              info@pixelsforte.com
            </a>
          </div>

          {/* Call info */}
          <div>
            <span className="text-xs tracking-[0.15em] text-neutral-400 font-sans uppercase block mb-1.5 font-medium">
              CALL :
            </span>
            <a 
              href="tel:+923320041234" 
              className="text-2xl sm:text-[28px] font-bold text-white hover:text-neutral-300 transition-colors tracking-tight block"
            >
              +92 332 004 1234
            </a>
          </div>
        </div>

        {/* Middle Column: Nav Links */}
        <div className="md:col-span-4 lg:col-span-4 flex flex-col items-center justify-start gap-4 text-center">
          {col1.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-2xl sm:text-[28px] font-bold text-white hover:text-neutral-300 transition-colors tracking-tight w-fit block"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Column: Socials */}
        <div className="md:col-span-4 lg:col-span-4 flex flex-col items-center justify-start gap-4 text-center">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              className="inline-flex items-center gap-1.5 text-2xl sm:text-[28px] font-bold text-white hover:text-neutral-300 transition-colors pb-1 border-b border-white w-fit tracking-tight group"
            >
              <span>{s.name}</span>
              <ArrowUpRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>

      </div>

      {/* Middle Bar: Copyright & Address */}
      <div className="max-w-[1400px] mx-auto pt-8 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-xs sm:text-sm text-neutral-400 font-sans">
        <p className="text-[13px] sm:text-[14px]">
          © <span className="text-white font-medium">{new Date().getFullYear()} Pixels Forte Private Limited. All Rights Reserved.</span>
        </p>

        <div className="flex items-start gap-2 text-[13px] sm:text-[14px] text-neutral-300 font-medium max-w-xl text-left">
          <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 mt-2" />
          <span>
            Office No. 802, Dominion Business Center 3,<br />
            Main Jinnah Avenue, Bahria Town Karachi, Pakistan
          </span>
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="max-w-[1400px] mx-auto pt-6 sm:pt-10 flex items-center sm:items-end justify-between gap-12 sm:gap-20 md:gap-28 select-none pointer-events-none pb-2 sm:pb-4">
        <div className="shrink-0 relative w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mb-1 sm:mb-2">
          <div className="w-full h-full relative animate-spin-continuous">
            <Image
              src="/icons/idotive-icon-3-orange.svg"
              alt="Orange Starburst"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="w-auto text-right flex items-end justify-end ml-auto">
          <span className="font-sans font-semibold text-[15vw] sm:text-[14vw] md:text-[13vw] lg:text-[145px] xl:text-[160px] leading-none text-white tracking-[-0.02em] block">
            Agency
          </span>
        </div>
      </div>
    </footer>
  );
}