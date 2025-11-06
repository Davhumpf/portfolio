import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'xxs': '200px',
      },
      fontFamily: {
        display: ['ui-sans-serif', 'system-ui', 'Inter', 'sans-serif'],
      },
      colors: {
        ink: {
          50:  "#f6f6f6",
          100: "#e7e7e7",
          900: "#111113",
        }
      },
      spacing: {
        'fluid-xs': 'clamp(0.25rem, 0.5vw, 0.5rem)',
        'fluid-sm': 'clamp(0.5rem, 1vw, 0.75rem)',
        'fluid-md': 'clamp(0.75rem, 1.5vw, 1rem)',
        'fluid-lg': 'clamp(1rem, 2vw, 1.5rem)',
        'fluid-xl': 'clamp(1.5rem, 3vw, 2rem)',
      },
      fontSize: {
        'fluid-xs': 'clamp(10px, 1.2vw, 12px)',
        'fluid-sm': 'clamp(11px, 1.3vw, 13px)',
        'fluid-base': 'clamp(13px, 1.6vw, 16px)',
        'fluid-lg': 'clamp(14px, 1.8vw, 18px)',
        'fluid-xl': 'clamp(16px, 2vw, 20px)',
      },
      minHeight: {
        'touch': '40px',
        'touch-sm': '36px',
      },
      minWidth: {
        'touch': '40px',
        'touch-sm': '36px',
      },
    },
  },
  plugins: [],
};
export default config;
