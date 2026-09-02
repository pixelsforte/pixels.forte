"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import AboutPage from "@/components/AboutPage";
import Footer from "@/components/Footer";

export default function AboutRoutePage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<string>("about");

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
      />
      <main className="overflow-hidden">
        <AboutPage />
      </main>
      <Footer />
    </>
  );
}
