"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import TeamPage from "@/components/TeamPage";
import Footer from "@/components/Footer";

export default function TeamRoutePage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<string>("team");

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
        <TeamPage />
      </main>
      <Footer />
    </>
  );
}
