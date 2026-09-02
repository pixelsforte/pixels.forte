import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import PageTransition from "@/components/providers/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Sirf Variable Font istemal karein (sare weights automatically handle ho jayenge)
const parkinsans = localFont({
  src: "../public/fonts/Parkinsans-VariableFont_wght.ttf",
  variable: "--font-parkinsans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pixels Forte | Creative Agency",
  description: "Creative agency portfolio website.",
  icons: {
    icon: "/logo-3.png",
    shortcut: "/logo-3.png",
    apple: "/logo-3.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${parkinsans.variable} ${inter.variable}`}>
      <head>
        {/* Icons ki zaroorat nahi hai yahan, metadata handles it */}
        <link rel="preload" href="/images/card1.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="/videos/card5-1-1.mp4" as="video" type="video/mp4" fetchPriority="high" />
        <link rel="preload" href="/videos/card11-1-1.mp4" as="video" type="video/mp4" fetchPriority="high" />
        <link rel="preload" href="/images/card6.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="/images/card7.webp" as="image" type="image/webp" fetchPriority="high" />
      </head>
      <body className={`min-h-screen overflow-x-hidden bg-[#F4F1EA] text-black antialiased font-sans ${parkinsans.className}`}>
        <Providers>
          <PageTransition>{children}</PageTransition>
        </Providers>
      </body>
    </html>
  );
}
