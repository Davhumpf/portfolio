// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BrandPopout from "@/components/BrandPopout";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageProvider from "@/context/LanguageProvider";
import MainContent from "@/components/MainContent";
import MatrixRain from "@/components/MatrixRain";

export const metadata: Metadata = {
  title: "David — UI/Frontend",
  description: "Micro-portafolio con Next.js, TypeScript, Tailwind y GSAP.",
  viewport: { width: "device-width", initialScale: 1, maximumScale: 1 },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen antialiased overflow-x-hidden">
        {/* Animación Matrix de fondo */}
        <MatrixRain />

        {/* Gradiente de fondo */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            background: `
              radial-gradient(clamp(400px, 50vw, 900px) circle at 20% 10%, var(--accent)/12 0, transparent 60%),
              radial-gradient(clamp(350px, 45vw, 800px) circle at 80% 30%, var(--accent-2)/10 0, transparent 60%)
            `,
          }}
        />

        {/* Providers + Navigation */}
        <LanguageProvider>
          <ThemeProvider>
            {/* Header for mobile only */}
            <Header />

            {/* Sidebar for desktop only */}
            <Sidebar />

            {/* Brand popout with typewriter animations */}
            <BrandPopout />

            {/* Main content - margin for mobile header top, padding for desktop sidebar left */}
            <MainContent>
              {children}
            </MainContent>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
