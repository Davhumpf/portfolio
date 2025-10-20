"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/Section";
import { useT } from "@/context/LanguageProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TECH_STACK = {
  frontend: [
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "vite",
    "angular",
    "tailwind",
    "gsap",
    "css",
    "dart"
  ],
  backend: [
    "nodejs",
    "java",
    "python",
    "mysql",
    "sqlite"
  ],
  cloud: [
    "googlecloud",
    "firebase",
    "supabase",
    "azure",
    "oracle",
    "docker",
    "github"
  ]
};

type CategoryType = "frontend" | "backend" | "cloud";

export default function About() {
  const t = useT();
  const scope = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("frontend");

  useEffect(() => {
    if (!scope.current) return;

    const ctx = gsap.context(() => {
      // Animación de la imagen
      gsap.from(".about-image", {
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 80%",
          once: true,
          toggleActions: "play none none none"
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Animación de los textos
      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
          once: true,
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Refrescar ScrollTrigger después de cargar
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, scope);

    return () => ctx.revert();
  }, []);

  // Animar iconos cuando cambia categoría
  useEffect(() => {
    gsap.fromTo(
      ".tech-item",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        stagger: 0.03,
        ease: "back.out(1.7)"
      }
    );
  }, [selectedCategory]);

  const getTechName = (tech: string) => {
    if (tech === "nextjs") return "Next.js";
    if (tech === "nodejs") return "Node.js";
    if (tech === "googlecloud") return "Google Cloud";
    if (tech === "sqlite") return "SQLite";
    return tech.charAt(0).toUpperCase() + tech.slice(1);
  };

  return (
    <div ref={scope}>
      <Section id="about" title={t("about_title")} subtitle={t("about_sub")}>
        {/* Layout horizontal: foto | textos | skills */}
        <div className="grid lg:grid-cols-[180px_300px_1fr] gap-6 items-start">
          {/* Imagen profesional compacta */}
          <div className="about-image relative mx-auto lg:mx-0">
            <div className="relative w-40 h-40 lg:w-[180px] lg:h-[180px]">
              {/* Borde con glow */}
              <div className="absolute inset-0 rounded-2xl ring-[2px]"
                   style={{ 
                     borderColor: "var(--accent)",
                     boxShadow: "0 0 20px var(--accent)/30, inset 0 0 10px var(--accent)/10"
                   }} />
              
              {/* Imagen */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--panel)] to-[var(--panel)]">
                <img
                  src="/profile.png"
                  alt="David - Software Developer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-4xl">👨‍💻</div>';
                  }}
                />
              </div>
              
              {/* Glow effect exterior */}
              <div className="absolute -inset-2 rounded-2xl opacity-20 blur-lg -z-10"
                   style={{ background: "var(--accent)" }} />
            </div>
          </div>

          {/* Textos compactos y verticales */}
          <div className="space-y-3 flex flex-col justify-center">
            <p className="about-text text-sm leading-relaxed">{t("about_p1")}</p>
            <p className="about-text text-sm leading-relaxed muted">{t("about_p2")}</p>
          </div>

          {/* Skills: botones + iconos - MÁS GRANDE */}
          <div className="flex flex-col gap-4">
            {/* Botones de categorías */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedCategory("frontend")}
                className={`flex-1 px-4 py-2.5 rounded-lg font-bold text-xs transition-all ${
                  selectedCategory === "frontend"
                    ? "ring-2 scale-105"
                    : "ring-1 hover:scale-105"
                }`}
                style={{
                  background: selectedCategory === "frontend" 
                    ? "var(--accent)" 
                    : "color-mix(in oklab, var(--panel) 60%, transparent)",
                  borderColor: "var(--accent)",
                  color: selectedCategory === "frontend" ? "var(--bg)" : "inherit"
                }}
              >
                Frontend
              </button>
              <button
                onClick={() => setSelectedCategory("backend")}
                className={`flex-1 px-4 py-2.5 rounded-lg font-bold text-xs transition-all ${
                  selectedCategory === "backend"
                    ? "ring-2 scale-105"
                    : "ring-1 hover:scale-105"
                }`}
                style={{
                  background: selectedCategory === "backend" 
                    ? "var(--accent)" 
                    : "color-mix(in oklab, var(--panel) 60%, transparent)",
                  borderColor: "var(--accent)",
                  color: selectedCategory === "backend" ? "var(--bg)" : "inherit"
                }}
              >
                Backend
              </button>
              <button
                onClick={() => setSelectedCategory("cloud")}
                className={`flex-1 px-4 py-2.5 rounded-lg font-bold text-xs transition-all ${
                  selectedCategory === "cloud"
                    ? "ring-2 scale-105"
                    : "ring-1 hover:scale-105"
                }`}
                style={{
                  background: selectedCategory === "cloud" 
                    ? "var(--accent)" 
                    : "color-mix(in oklab, var(--panel) 60%, transparent)",
                  borderColor: "var(--accent)",
                  color: selectedCategory === "cloud" ? "var(--bg)" : "inherit"
                }}
              >
                Cloud
              </button>
            </div>

            {/* Contenedor de iconos MÁS GRANDE */}
            <div 
              className="p-5 rounded-xl ring-1 backdrop-blur-sm min-h-[220px]"
              style={{ 
                background: "color-mix(in oklab, var(--panel) 40%, transparent)",
                borderColor: "var(--accent)/20"
              }}
            >
              <div className="grid grid-cols-5 gap-3">
                {TECH_STACK[selectedCategory].map((tech) => (
                  <div
                    key={tech}
                    className="tech-item group relative px-3 py-3 rounded-lg ring-1 backdrop-blur-sm transition-all hover:scale-110 hover:ring-2 cursor-pointer"
                    style={{ 
                      background: "color-mix(in oklab, var(--panel) 80%, transparent)",
                      borderColor: "var(--accent)/30"
                    }}
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <img
                        src={`/${tech}.png`}
                        alt={tech}
                        width="28"
                        height="28"
                        className="object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="text-[10px] font-medium text-center leading-tight">
                        {getTechName(tech)}
                      </span>
                    </div>
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-sm"
                         style={{ background: "var(--accent)/20" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}