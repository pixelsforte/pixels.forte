import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F4F1EA",
        accent: "#F26B2C",
        ink: "#0A0A0A",
      },
      fontFamily: {
        sans: ["var(--font-parkinsans)", "Parkinsans", "WebsiteCustomFont", "Satoshi", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-parkinsans)", "Parkinsans", "WebsiteCustomFont", "Satoshi", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-parkinsans)", "Parkinsans", "WebsiteCustomFont", "Satoshi", "monospace"],
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22,1,0.36,1)",
      },
      maxWidth: {
        container: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
