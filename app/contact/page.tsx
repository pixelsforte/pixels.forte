"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ContactPage from "@/components/ContactPage";
import Footer from "@/components/Footer";

export default function ContactRoutePage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<string>("contact");

  const onContactClick = () => {
    // Already on contact page, scroll to form or do nothing
    const el = document.getElementById("contact-card");
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
