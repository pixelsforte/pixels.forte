"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type PageType = string;

interface HeaderProps {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
  onContactClick: () => void;
  transparent?: boolean;
}

interface MenuItem {
  name: string;
  type: 'link' | 'dropdown';
  key?: string;
  page?: PageType;
  columns?: { name: string; page: PageType }[][];
}

export default function Header ({ activePage, setActivePage, onContactClick, transparent = false }: HeaderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  const toggleSubMenu = (menuKey: string) => {
    if (activeSubMenu === menuKey) {
      setActiveSubMenu(null);
    } else {
      setActiveSubMenu(menuKey);
    }
  };

  const handleNavClick = (page: PageType, e?: React.MouseEvent) => {
    if (isNavigating) {
      if (e) e.preventDefault();
      return;
    }
    setIsNavigating(true);
    setActivePage(page);
    setIsOpen(false);
    setActiveSubMenu(null);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    setTimeout(() => {
      setIsNavigating(false);
    }, 500);
  };

  const menuItems: MenuItem[] = [
    { name: 'Home', type: 'link', page: 'home' },
    {
      name: 'Pages',
      type: 'dropdown',
      key: 'pages',
      columns: [
        [
          { name: 'About', page: 'about' },
          // { name: 'Team', page: 'team' },
          // { name: 'Portfolio ', page: 'portfolio-one' },
          // { name: 'Portfolio two', page: 'portfolio-two' },
          // { name: 'Portfolio three', page: 'portfolio-three' },
        ],
        [
          // { name: 'Pricing', page: 'pricing' },
          // { name: 'License', page: 'license' },
          // { name: 'Style guide', page: 'style-guide' },
          // { name: 'Changelog', page: 'changelog' },
          // { name: '404', page: '404' },
        ],
      ],
    },
    {
      name: 'Service',
      type: 'dropdown',
      key: 'service',
      columns: [
        [
          // { name: 'Service one', page: 'services-one' },
          { name: 'Service', page: 'services-two' },
          // { name: 'Service three', page: 'services-three' },
        ]
      ],
    },
    // {
    //   name: 'Blog',
    //   type: 'dropdown',
    //   key: 'blog',
    //   columns: [
    //     [
    //       { name: 'Blog', page: 'blog' },
    //       { name: 'Blog post', page: 'blog-post' },
    //     ]
    //   ],
    // },
    {
      name: 'Portfolio',
      type: 'dropdown',
      key: 'portfolio',
      columns: [
        [
          { name: 'Portfolio', page: 'portfolio-one' },
          // { name: 'Portfolio two', page: 'portfolio-two' },
          // { name: 'Portfolio three', page: 'portfolio-three' },
          // { name: 'Portfolio details', page: 'portfolio-details' },
        ],
      ],
    },
    { name: 'Contact', type: 'link', page: 'contact' },
  ];

  return (
    <header className={`relative z-50 w-full ${transparent ? 'bg-transparent border-transparent' : 'border-b border-black/10 bg-[#f9f8f4]'} px-4 sm:px-8 md:px-12 py-2.5 sm:py-3`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          onClick={(e) => {
            handleNavClick('home', e);
            setIsOpen(false);
            setActiveSubMenu(null);
          }}
          className="group inline-flex items-center cursor-pointer text-left shrink-0"
          id="header-logo-btn"
        >
          <div className="relative flex items-center h-12 sm:h-16 md:h-20 w-[190px] sm:w-[260px] md:w-[320px] overflow-visible">
            <Image
              src="/logo-2.png"
              alt="Pixel Forte"
              fill
              className="object-contain object-left scale-[1.45] sm:scale-[1.65] origin-left transition-opacity duration-300 group-hover:opacity-85"
              priority
            />
          </div>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <button
            onClick={() => {
              onContactClick();
              setIsOpen(false);
            }}
            className="group relative hidden sm:inline-flex h-[40px] items-center justify-center overflow-hidden rounded-none bg-black px-5 text-[11px] font-bold uppercase tracking-wider text-white transition-all duration-500 cursor-pointer whitespace-nowrap shrink-0"
          >
            <div className="absolute inset-0 w-full h-full flex translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
              <div className="w-1/2 h-full bg-[#f26b2c]" />
              <div className="w-1/2 h-full bg-white" />
            </div>

            <span className="relative z-10 block h-4 overflow-hidden">
              <span className="block transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full text-white">
                Let&apos;s Collaborate
              </span>
              <span className="absolute left-0 top-0 block translate-y-full transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-black font-black">
                Let&apos;s Collaborate
              </span>
            </span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group flex h-10 w-10 items-center justify-center text-black transition-transform duration-200 active:scale-95 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg
                className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <div className="grid h-5 w-5 grid-cols-2 gap-1 transition-transform duration-300 group-hover:scale-110">
                <span className="h-2 w-2 rounded-full bg-black group-hover:bg-[#FF5A1F] transition-colors" />
                <span className="h-2 w-2 rounded-full bg-black group-hover:bg-[#FF5A1F] transition-colors" />
                <span className="h-2 w-2 rounded-full bg-black group-hover:bg-[#FF5A1F] transition-colors" />
                <span className="h-2 w-2 rounded-full bg-black group-hover:bg-[#FF5A1F] transition-colors" />
              </div>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, scale: 0.95 }}
            animate={{ height: 'auto', opacity: 1, scale: 1 }}
            exit={{ height: 0, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-6 top-full z-50 w-[calc(100vw-48px)] max-w-[340px] overflow-hidden rounded-2xl border border-black/10 bg-[#f9f8f4] p-6 shadow-xl md:right-12 text-left"
          >
            <nav className="flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-black/[0.04] pb-2 last:border-none"
                >
                  {item.type === 'link' ? (
                    <Link
                      href={item.page === 'home' ? '/' : `/${item.page}`}
                      onClick={(e) => {
                        handleNavClick(item.page || 'home', e);
                      }}
                      className="block w-full text-left py-1 text-[18px] font-bold text-black transition-colors duration-200 hover:text-[#f26b2c] cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => item.key && toggleSubMenu(item.key)}
                        className="flex w-full items-center justify-between py-1 text-left text-[18px] font-bold text-black transition-colors duration-200 hover:text-[#f26b2c] cursor-pointer"
                      >
                        <span>{item.name}</span>
                        <span className="text-sm font-light text-black/40">
                          {activeSubMenu === item.key ? '—' : '+'}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {activeSubMenu === item.key && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-2 gap-4 py-2 pl-3">
                              {item.columns?.map((col, cIdx) => (
                                <ul key={cIdx} className="space-y-1.5">
                                  {col.map((subLink, lIdx) => (
                                    <li key={lIdx}>
                                      <Link
                                        href={subLink.page === 'home' ? '/' : `/${subLink.page}`}
                                        onClick={(e) => {
                                          handleNavClick(subLink.page, e);
                                        }}
                                        className="block text-left text-[13px] font-semibold text-gray-500 transition-colors duration-200 hover:text-black cursor-pointer"
                                      >
                                        {subLink.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
            </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}