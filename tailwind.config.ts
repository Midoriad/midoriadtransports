import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      spacing: {
        18: "4.5rem",
      },
      colors: {
        // « Midori » = vert en japonais : identité verte premium.
        brand: {
          50: "#edfdf4",
          100: "#d2f8e1",
          200: "#a8efc6",
          300: "#70e0a6",
          400: "#37c984",
          500: "#12b065",
          600: "#069050",
          700: "#057243",
          800: "#085a37",
          900: "#0a4a2f",
          950: "#03291b",
        },
        gold: {
          300: "#ecd9a3",
          400: "#dcc078",
          500: "#c8a24a",
          600: "#ab8438",
          700: "#86662c",
        },
        ink: {
          DEFAULT: "#071611",
          800: "#0c2118",
          700: "#123124",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(7, 22, 17, 0.12)",
        card: "0 10px 40px -16px rgba(7, 22, 17, 0.22)",
        glow: "0 0 0 1px rgba(18,176,101,0.18), 0 18px 50px -20px rgba(6,144,80,0.45)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee 28s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
