"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import FeaturedWork from "@/components/FeaturedWork";
import Projects from "@/components/Projects";
import { Services } from "@/components/Services";
import { DarkSection } from "@/components/DarkSection";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import AboutPage from "@/components/AboutPage";


export default function Home() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<string>("home");

  const onContactClick = () => {
    router.push("/contact");
  };

  return (
    <>
      <Header
        activePage={activePage}
        setActivePage={(page) => {
          if (page === "home") {
            setActivePage("home");
          } else {
            router.push(`/${page}`);
          }
        }}
        onContactClick={onContactClick}
      />
      <main className="overflow-hidden">
        {activePage === "home" ? (
          <>
            <Hero />
            <FeaturedWork />
            <Services />
            <Projects />
            <div className="bg-black">
              <Stats />
              <DarkSection />
            </div>
            <Process />
            {/* <Testimonials /> */}
          </>
        ) : activePage === "about" ? (
          <AboutPage />
        ) : (
          <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 bg-[#f4f1ea]">
            <h2 className="text-2xl font-bold uppercase tracking-widest text-[#f26b2c] mb-4">Page Coming Soon</h2>
            <p className="text-sm text-neutral-500 font-medium">This page is currently being designed and developed.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
