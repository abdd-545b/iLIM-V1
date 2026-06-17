import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        honey: {
          50: "#fffdf0",
          100: "#fff8c6",
          200: "#ffef77",
          300: "#ffe24a",
          400: "#ffd21f",
          500: "#f6bd00",
          600: "#d89800"
        },
        ink: "#1f2937",
        leaf: "#16a34a",
        skysoft: "#dff4ff",
        coral: "#ff7a59"
      },
      boxShadow: {
        glow: "0 18px 50px rgba(246, 189, 0, 0.28)",
        soft: "0 16px 40px rgba(31, 41, 55, 0.1)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(-3deg)" },
          "50%": { transform: "translateY(-12px) rotate(3deg)" }
        },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "100%": { transform: "scale(1.25)", opacity: "0" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" }
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        pulseRing: "pulseRing 1.8s ease-out infinite",
        shimmer: "shimmer 2.6s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
