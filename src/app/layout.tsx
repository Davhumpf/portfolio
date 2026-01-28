// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageProvider from "@/context/LanguageProvider";
import MainContent from "@/components/MainContent";

export const metadata: Metadata = {
  title: "David — UI/Frontend",
  description: "Micro-portafolio con Next.js, TypeScript, Tailwind y GSAP.",
  viewport: { width: "device-width", initialScale: 1 },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen antialiased overflow-x-hidden">
        {/* Providers + Navigation */}
        <LanguageProvider>
          <ThemeProvider>
            {/* CAPA 1 (z-index: 1) - Color de fondo semi-transparente */}
            <div
              aria-hidden
              className="pointer-events-none fixed inset-0"
              style={{
                zIndex: 1,
                backgroundColor: 'var(--bg-page)',
                opacity: 0.85,
              }}
            />

            {/* CAPA 2 (z-index: 2) - Gradientes decorativos */}
            <div
              aria-hidden
              className="pointer-events-none fixed inset-0"
              style={{
                zIndex: 2,
                background: `
                  radial-gradient(clamp(400px, 50vw, 900px) circle at 20% 10%, var(--accent)/12 0, transparent 60%),
                  radial-gradient(clamp(350px, 45vw, 800px) circle at 80% 30%, var(--accent-2)/10 0, transparent 60%)
                `,
              }}
            />

            {/* CAPA 10+ - Contenido y navegación */}
            <Header />

            {/* Main content - spacing for header */}
            <MainContent>
              {children}
            </MainContent>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
