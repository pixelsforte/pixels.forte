"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import BlogPostPage from "@/components/BlogPostPage";
import Footer from "@/components/Footer";

export default function BlogPostRoutePage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState<string>("blog-post");

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
        <BlogPostPage />
      </main>
      <Footer />
    </>
  );
}
