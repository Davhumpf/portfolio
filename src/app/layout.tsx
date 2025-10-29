// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageProvider from "@/context/LanguageProvider";

export const metadata: Metadata = {
  title: "David — UI/Frontend",
  description: "Micro-portafolio con Next.js, TypeScript, Tailwind y GSAP.",
  viewport: { width: "device-width", initialScale: 1, maximumScale: 1 },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        {/* Gradiente de fondo */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            background: `
              radial-gradient(900px circle at 20% 10%, var(--accent)/12 0, transparent 60%),
              radial-gradient(800px circle at 80% 30%, var(--accent-2)/10 0, transparent 60%)
            `,
          }}
        />

        {/* Providers + Header global */}
        <LanguageProvider>
          <ThemeProvider>
            <Header />
            {/* margen superior para que el header (fixed) no tape el contenido */}
            <main id="top" className="pt-24">
              {children}
            </main>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
