"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import LicensePage from "@/components/LicensePage";
import Footer from "@/components/Footer";

export default function LicenseRoutePage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<string>("license");

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
        <LicensePage />
      </main>
      <Footer />
    </>
  );
}
