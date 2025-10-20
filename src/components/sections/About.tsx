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

  // Animación de click en botones de categoría
  const handleCategoryClick = (category: CategoryType, event: React.MouseEvent) => {
    setSelectedCategory(category);
    
    const button = event.currentTarget;
    gsap.fromTo(
      button,
      { scale: 0.9 },
      { 
        scale: 1, 
        duration: 0.3,
        ease: "back.out(1.7)"
      }
    );
  };

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
        {/* Layout 2 columnas bien distribuidas */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-start">
          
          {/* COLUMNA 1: Imagen + Textos */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-6 items-start">
            {/* Imagen profesional */}
            <div className="about-image relative mx-auto sm:mx-0 flex-shrink-0">
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 lg:w-56 lg:h-56">
                {/* Borde con glow */}
                <div 
                  className="absolute inset-0 rounded-3xl ring-2"
                  style={{ 
                    borderColor: "var(--accent)",
                    boxShadow: "0 0 20px var(--accent)/30, inset 0 0 10px var(--accent)/10"
                  }} 
                />
                
                {/* Imagen */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden"
                     style={{ background: "var(--panel)" }}>
                  <img
                    src="/profile.png"
                    alt="David - Software Developer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-5xl">👨‍💻</div>';
                      }
                    }}
                  />
                </div>
                
                {/* Glow effect exterior */}
                <div 
                  className="absolute -inset-3 rounded-3xl opacity-20 blur-xl -z-10"
                  style={{ background: "var(--accent)" }} 
                />
              </div>
            </div>

            {/* Textos */}
            <div className="space-y-4 flex flex-col justify-start flex-1 w-full">
              <p className="about-text text-base leading-relaxed">{t("about_p1")}</p>
              <p className="about-text text-base leading-relaxed opacity-70">{t("about_p2")}</p>
            </div>
          </div>

          {/* COLUMNA 2: Botones arriba + Skills abajo */}
          <div className="w-full flex flex-col gap-6">
            {/* Botones de categorías - MÁS ARRIBA */}
            <div className="flex gap-3">
              <button
                onClick={(e) => handleCategoryClick("frontend", e)}
                className={`flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  selectedCategory === "frontend" ? "ring-2 shadow-lg" : "ring-1"
                }`}
                style={{
                  background: selectedCategory === "frontend" 
                    ? "var(--accent)" 
                    : "color-mix(in oklab, var(--panel) 70%, transparent)",
                  borderColor: "var(--accent)",
                  color: selectedCategory === "frontend" ? "var(--bg)" : "inherit"
                }}
              >
                Frontend
              </button>
              <button
                onClick={(e) => handleCategoryClick("backend", e)}
                className={`flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  selectedCategory === "backend" ? "ring-2 shadow-lg" : "ring-1"
                }`}
                style={{
                  background: selectedCategory === "backend" 
                    ? "var(--accent)" 
                    : "color-mix(in oklab, var(--panel) 70%, transparent)",
                  borderColor: "var(--accent)",
                  color: selectedCategory === "backend" ? "var(--bg)" : "inherit"
                }}
              >
                Backend
              </button>
              <button
                onClick={(e) => handleCategoryClick("cloud", e)}
                className={`flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  selectedCategory === "cloud" ? "ring-2 shadow-lg" : "ring-1"
                }`}
                style={{
                  background: selectedCategory === "cloud" 
                    ? "var(--accent)" 
                    : "color-mix(in oklab, var(--panel) 70%, transparent)",
                  borderColor: "var(--accent)",
                  color: selectedCategory === "cloud" ? "var(--bg)" : "inherit"
                }}
              >
                Cloud
              </button>
            </div>

            {/* Contenedor de iconos */}
            <div 
              className="p-6 rounded-2xl ring-1 backdrop-blur-sm min-h-[320px] flex items-start"
              style={{ 
                background: "color-mix(in oklab, var(--panel) 50%, transparent)",
                borderColor: "color-mix(in oklab, var(--accent) 30%, transparent)"
              }}
            >
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 w-full content-start">
                {TECH_STACK[selectedCategory].map((tech) => (
                  <div
                    key={tech}
                    className="tech-item group relative px-3 py-4 rounded-xl ring-1 backdrop-blur-sm transition-all hover:scale-110 hover:ring-2 cursor-pointer"
                    style={{ 
                      background: "color-mix(in oklab, var(--panel) 80%, transparent)",
                      borderColor: "color-mix(in oklab, var(--accent) 40%, transparent)"
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={`/${tech}.png`}
                        alt={tech}
                        width="36"
                        height="36"
                        className="object-contain w-8 h-8 sm:w-9 sm:h-9"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="text-[10px] sm:text-[11px] font-medium text-center leading-tight">
                        {getTechName(tech)}
                      </span>
                    </div>
                    
                    {/* Hover effect */}
                    <div 
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-md"
                      style={{ background: "color-mix(in oklab, var(--accent) 25%, transparent)" }} 
                    />
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