/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#10B981",
          foreground: "#FFFFFF",
        },
        background: "#F8FAFC",
        foreground: "#111827",
        muted: {
          DEFAULT: "#64748B",
          foreground: "#64748B",
        },
        accent: {
          DEFAULT: "#F59E0B",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#22C55E",
          foreground: "#FFFFFF",
        },
        border: "#E2E8F0",
        input: "#E2E8F0",
        ring: "#2563EB",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};