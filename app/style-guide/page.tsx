"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import StyleGuidePage from "@/components/StyleGuidePage";
import Footer from "@/components/Footer";

export default function StyleGuideRoutePage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<string>("style-guide");

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
        <StyleGuidePage />
      </main>
      <Footer />
    </>
  );
}
