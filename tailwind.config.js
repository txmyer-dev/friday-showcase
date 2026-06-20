/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0807",
        foreground: "#F6EAE0",
        accent: "#E03223",
        success: "#00ff88",
        error: "#ff3b30",
        muted: "#D2B48C",
        charcoal: "#1A1716",
        card: "rgba(246, 234, 224, 0.03)",
      },
      fontFamily: {
        sans: ["Bricolage Grotesque", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "scroll-reveal": "scrollReveal 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scrollReveal: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
}
