import type { Config } from "tailwindcss"

const config = {
  darkMode: false,
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Enhanced vibrant color palette
        purple: {
          light: "#9D50BB",
          DEFAULT: "#6E48AA",
          dark: "#5D3F92",
        },
        teal: {
          light: "#00D2FF",
          DEFAULT: "#00A6C9",
          dark: "#007A94",
        },
        orange: {
          light: "#FF8C42",
          DEFAULT: "#FF6B35",
          dark: "#E54F21",
        },
        pink: {
          light: "#FF3E78",
          DEFAULT: "#FF0A54",
          dark: "#D10046",
        },
        blue: {
          light: "#4CC9F0",
          DEFAULT: "#3A86FF",
          dark: "#2667D4",
        },
        green: {
          light: "#57CC99",
          DEFAULT: "#38B000",
          dark: "#2D8A00",
        },
        yellow: {
          light: "#FFDD00",
          DEFAULT: "#FFBD00",
          dark: "#DB9A00",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "morph-blob": {
          "0%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40%/50% 60% 30% 60%" },
          "100%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "scale-out": {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(1.1)" },
        },
        "rotate-in": {
          "0%": { opacity: "0", transform: "rotate(-5deg)" },
          "100%": { opacity: "1", transform: "rotate(0deg)" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "80%": { transform: "scale(1.1)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        wave: {
          "0%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-5px)" },
          "50%": { transform: "translateY(0)" },
          "75%": { transform: "translateY(5px)" },
          "100%": { transform: "translateY(0)" },
        },
        ripple: {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-y": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center bottom",
          },
        },
        "background-pan": {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        "text-flicker": {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
            opacity: "1",
          },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
            opacity: "0.33",
          },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px theme(colors.primary.DEFAULT), 0 0 10px theme(colors.primary.DEFAULT)" },
          "50%": { boxShadow: "0 0 20px theme(colors.primary.DEFAULT), 0 0 30px theme(colors.primary.DEFAULT)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "bounce-slow": "bounce-slow 6s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
        "morph-blob": "morph-blob 8s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "fade-in-down": "fade-in-down 0.5s ease-out forwards",
        "fade-in-left": "fade-in-left 0.5s ease-out forwards",
        "fade-in-right": "fade-in-right 0.5s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "scale-out": "scale-out 0.5s ease-out forwards",
        "rotate-in": "rotate-in 0.5s ease-out forwards",
        "bounce-in": "bounce-in 0.6s ease-out forwards",
        wave: "wave 2s ease-in-out infinite",
        ripple: "ripple 1.5s ease-out infinite",
        "gradient-x": "gradient-x 5s ease infinite",
        "gradient-y": "gradient-y 5s ease infinite",
        "background-pan": "background-pan 3s linear infinite",
        "text-flicker": "text-flicker 2s linear infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern": "url('/placeholder.svg?height=1080&width=1920')",
        "gradient-shine": "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
        "gradient-mesh":
          "radial-gradient(at 40% 20%, hsla(var(--primary), 0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(var(--secondary), 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(var(--accent), 0.1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(var(--primary), 0.1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(var(--secondary), 0.1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(var(--accent), 0.1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(var(--primary), 0.1) 0px, transparent 50%)",
      },
      boxShadow: {
        neon: "0 0 5px theme(colors.primary.DEFAULT), 0 0 20px theme(colors.primary.DEFAULT)",
        "neon-secondary": "0 0 5px theme(colors.secondary.DEFAULT), 0 0 20px theme(colors.secondary.DEFAULT)",
        "neon-accent": "0 0 5px theme(colors.accent.DEFAULT), 0 0 20px theme(colors.accent.DEFAULT)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
