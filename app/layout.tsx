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

const parkinsans = localFont({
  src: [
    {
      path: "../public/fonts/static/Parkinsans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/static/Parkinsans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/static/Parkinsans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/static/Parkinsans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/static/Parkinsans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/static/Parkinsans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Parkinsans-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-parkinsans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pixels Forte | Creative Agency",
  description: "Creative agency portfolio website.",
  icons: {
    icon: "/Pixels Forte Logo-03.png",
    shortcut: "/Pixels Forte Logo-03.png",
    apple: "/Pixels Forte Logo-03.png",
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
        <link rel="icon" href="/logo-3.png" type="image/png" />
        <link rel="shortcut icon" href="/logo-3.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-3.png" />
        {/* Priority Preloading for Above-the-Fold Hero Media */}
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

