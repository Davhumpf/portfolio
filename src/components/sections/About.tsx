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
        {/* Layout flexible que se apila en pantallas pequeñas */}
        <div className="w-full flex flex-col gap-6 items-stretch" style={{
          gap: 'clamp(1rem, 3vw, 2rem)',
        }}>

          {/* COLUMNA 1: Imagen + Textos */}
          <div className="flex flex-col items-center w-full" style={{
            gap: 'clamp(1rem, 2.5vw, 1.5rem)',
          }}>
            {/* Imagen profesional */}
            <div className="about-image relative flex-shrink-0 w-full max-w-xs">
              <div className="relative w-full aspect-square" style={{
                maxWidth: 'clamp(120px, 35vw, 224px)',
                margin: '0 auto',
              }}>
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
            <div className="w-full flex flex-col" style={{
              gap: 'clamp(0.75rem, 2vw, 1rem)',
            }}>
              <p className="about-text leading-relaxed" style={{
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              }}>{t("about_p1")}</p>
              <p className="about-text leading-relaxed opacity-70" style={{
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              }}>{t("about_p2")}</p>
            </div>
          </div>

          {/* COLUMNA 2: Botones arriba + Skills abajo */}
          <div className="w-full flex flex-col" style={{
            gap: 'clamp(1rem, 2.5vw, 1.5rem)',
          }}>
            {/* Botones de categorías - VERSIÓN MEJORADA SIN SCROLLBAR */}
            <div className="relative w-full overflow-hidden" style={{
              marginLeft: 'clamp(-0.375rem, -1vw, -0.5rem)',
              marginRight: 'clamp(-0.375rem, -1vw, -0.5rem)',
            }}>
              <div
                className="responsive-flex justify-center snap-x snap-mandatory overflow-x-auto w-full"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  padding: 'clamp(0.375rem, 1vw, 0.5rem)',
                }}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>

                <button
                  onClick={(e) => handleCategoryClick("frontend", e)}
                  className={`snap-center flex-shrink-0 rounded-xl font-bold transition-all ${
                    selectedCategory === "frontend" ? "ring-2 shadow-lg" : "ring-1"
                  }`}
                  style={{
                    background: selectedCategory === "frontend"
                      ? "var(--accent)"
                      : "color-mix(in oklab, var(--panel) 70%, transparent)",
                    borderColor: "var(--accent)",
                    color: selectedCategory === "frontend" ? "var(--bg)" : "inherit",
                    padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1.5rem)',
                    fontSize: 'clamp(10px, 1.3vw, 13px)',
                  }}
                >
                  Frontend
                </button>
                <button
                  onClick={(e) => handleCategoryClick("backend", e)}
                  className={`snap-center flex-shrink-0 rounded-xl font-bold transition-all ${
                    selectedCategory === "backend" ? "ring-2 shadow-lg" : "ring-1"
                  }`}
                  style={{
                    background: selectedCategory === "backend"
                      ? "var(--accent)"
                      : "color-mix(in oklab, var(--panel) 70%, transparent)",
                    borderColor: "var(--accent)",
                    color: selectedCategory === "backend" ? "var(--bg)" : "inherit",
                    padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1.5rem)',
                    fontSize: 'clamp(10px, 1.3vw, 13px)',
                  }}
                >
                  Backend
                </button>
                <button
                  onClick={(e) => handleCategoryClick("cloud", e)}
                  className={`snap-center flex-shrink-0 rounded-xl font-bold transition-all ${
                    selectedCategory === "cloud" ? "ring-2 shadow-lg" : "ring-1"
                  }`}
                  style={{
                    background: selectedCategory === "cloud"
                      ? "var(--accent)"
                      : "color-mix(in oklab, var(--panel) 70%, transparent)",
                    borderColor: "var(--accent)",
                    color: selectedCategory === "cloud" ? "var(--bg)" : "inherit",
                    padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1.5rem)',
                    fontSize: 'clamp(10px, 1.3vw, 13px)',
                  }}
                >
                  Cloud
                </button>
              </div>
            </div>

            {/* Contenedor de iconos - RESPONSIVE */}
            <div
              className="ring-1 backdrop-blur-sm flex items-start overflow-hidden w-full"
              style={{
                background: "color-mix(in oklab, var(--panel) 50%, transparent)",
                borderColor: "color-mix(in oklab, var(--accent) 30%, transparent)",
                borderRadius: 'clamp(12px, 3vw, 16px)',
                padding: 'clamp(0.75rem, 2.5vw, 1.5rem)',
                minHeight: 'clamp(200px, 40vw, 320px)',
              }}
            >
              <div className="responsive-grid w-full" style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(60px, 100%), 1fr))',
                gap: 'clamp(0.5rem, 1.5vw, 1rem)',
              }}>
                {TECH_STACK[selectedCategory].map((tech) => (
                  <div
                    key={tech}
                    className="tech-item group relative ring-1 backdrop-blur-sm transition-all hover:scale-110 hover:ring-2 cursor-pointer w-full"
                    style={{
                      background: "color-mix(in oklab, var(--panel) 80%, transparent)",
                      borderColor: "color-mix(in oklab, var(--accent) 40%, transparent)",
                      borderRadius: 'clamp(8px, 2vw, 12px)',
                      padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                    }}
                  >
                    <div className="flex flex-col items-center justify-center" style={{
                      gap: 'clamp(0.25rem, 0.8vw, 0.5rem)',
                    }}>
                      <img
                        src={`/${tech}.png`}
                        alt={tech}
                        className="object-contain"
                        style={{
                          width: 'clamp(24px, 7vw, 36px)',
                          height: 'clamp(24px, 7vw, 36px)',
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="font-medium text-center leading-tight" style={{
                        fontSize: 'clamp(8px, 1.2vw, 11px)',
                      }}>
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