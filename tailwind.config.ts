import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['ui-sans-serif', 'system-ui', 'Inter', 'sans-serif'],
      },
      colors: {
        ink: {
          50:  "#f6f6f6",
          100: "#e7e7e7",
          900: "#111113",
        }
      }
    },
  },
  plugins: [],
};
export default config;
