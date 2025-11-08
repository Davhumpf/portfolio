"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/Section";
import { useT } from "@/context/LanguageProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// GitHub Icon SVG - mismo componente que en Contacts
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

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

  // Soporte para prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
      gsap.globalTimeline.timeScale(0.1);
    }
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
        {/* Layout con FENG SHUI: Grid en desktop, stack en móvil - Versión compacta */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-start">

          {/* COLUMNA IZQUIERDA: Imagen + Bio (Punto focal) */}
          <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-5">
            {/* Imagen profesional - Punto de entrada visual */}
            <div className="about-image relative flex-shrink-0 w-full max-w-[240px] lg:max-w-[260px] mx-auto lg:mx-0">
              <div className="relative w-full aspect-square">
                {/* Borde con glow */}
                <div
                  className="absolute inset-0 rounded-3xl ring-2"
                  style={{
                    borderColor: "var(--accent)",
                    boxShadow: "0 0 30px var(--accent)/30, inset 0 0 15px var(--accent)/10"
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
                  className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl -z-10"
                  style={{ background: "var(--accent)" }}
                />
              </div>
            </div>

            {/* Textos con espacio para respirar */}
            <div className="w-full flex flex-col gap-3 max-w-[240px] lg:max-w-none mx-auto lg:mx-0">
              <p className="about-text text-sm lg:text-base leading-relaxed text-center lg:text-left">
                {t("about_p1")}
              </p>
              <p className="about-text text-xs lg:text-sm leading-relaxed opacity-75 text-center lg:text-left">
                {t("about_p2")}
              </p>
            </div>
          </div>

          {/* SEPARADOR VERTICAL (solo desktop) - Feng Shui: división de espacios */}
          <div className="hidden lg:block relative h-full min-h-[320px] w-px">
            <div
              className="absolute inset-0 w-px"
              style={{
                background: "linear-gradient(to bottom, transparent, var(--accent)/20, var(--accent)/40, var(--accent)/20, transparent)"
              }}
            />
            {/* Ornamento central */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 10px var(--accent)/50"
              }}
            />
          </div>

          {/* COLUMNA DERECHA: Tech Stack con jerarquía clara */}
          <div className="w-full flex flex-col gap-4 lg:gap-5">
            {/* Título de sección (jerarquía visual) */}
            <div className="flex flex-col gap-1 text-center lg:text-left">
              <h3 className="text-base lg:text-lg font-bold" style={{ color: "var(--accent)" }}>
                Tech Stack
              </h3>
              <p className="text-xs opacity-60">
                Herramientas y tecnologías que domino
              </p>
            </div>

            {/* Botones de categorías - Mejorados con más espacio */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              <button
                onClick={(e) => handleCategoryClick("frontend", e)}
                className={`rounded-xl font-bold transition-all ${
                  selectedCategory === "frontend" ? "ring-2 shadow-lg scale-105" : "ring-1 hover:scale-105"
                }`}
                style={{
                  background: selectedCategory === "frontend"
                    ? "var(--accent)"
                    : "color-mix(in oklab, var(--panel) 70%, transparent)",
                  borderColor: "var(--accent)",
                  color: selectedCategory === "frontend" ? "var(--bg)" : "inherit",
                  padding: "0.5rem 1rem",
                  fontSize: "0.8125rem",
                }}
              >
                Frontend
              </button>
              <button
                onClick={(e) => handleCategoryClick("backend", e)}
                className={`rounded-xl font-bold transition-all ${
                  selectedCategory === "backend" ? "ring-2 shadow-lg scale-105" : "ring-1 hover:scale-105"
                }`}
                style={{
                  background: selectedCategory === "backend"
                    ? "var(--accent)"
                    : "color-mix(in oklab, var(--panel) 70%, transparent)",
                  borderColor: "var(--accent)",
                  color: selectedCategory === "backend" ? "var(--bg)" : "inherit",
                  padding: "0.5rem 1rem",
                  fontSize: "0.8125rem",
                }}
              >
                Backend
              </button>
              <button
                onClick={(e) => handleCategoryClick("cloud", e)}
                className={`rounded-xl font-bold transition-all ${
                  selectedCategory === "cloud" ? "ring-2 shadow-lg scale-105" : "ring-1 hover:scale-105"
                }`}
                style={{
                  background: selectedCategory === "cloud"
                    ? "var(--accent)"
                    : "color-mix(in oklab, var(--panel) 70%, transparent)",
                  borderColor: "var(--accent)",
                  color: selectedCategory === "cloud" ? "var(--bg)" : "inherit",
                  padding: "0.5rem 1rem",
                  fontSize: "0.8125rem",
                }}
              >
                Cloud
              </button>
            </div>

            {/* Contenedor de iconos - Compacto con margen derecho */}
            <div
              className="ring-1 backdrop-blur-sm overflow-hidden w-full lg:mr-2"
              style={{
                background: "color-mix(in oklab, var(--panel) 50%, transparent)",
                borderColor: "color-mix(in oklab, var(--accent) 30%, transparent)",
                borderRadius: "0.875rem",
                padding: "1rem",
                minHeight: "240px",
              }}
            >
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {TECH_STACK[selectedCategory].map((tech) => (
                  <div
                    key={tech}
                    className="tech-item group relative ring-1 backdrop-blur-sm transition-all hover:scale-110 hover:ring-2 cursor-pointer aspect-square"
                    style={{
                      background: "color-mix(in oklab, var(--panel) 80%, transparent)",
                      borderColor: "color-mix(in oklab, var(--accent) 40%, transparent)",
                      borderRadius: "0.625rem",
                      padding: "0.625rem",
                    }}
                  >
                    <div className="flex flex-col items-center justify-center h-full gap-1.5">
                      {tech === 'github' ? (
                        <div
                          style={{
                            width: "2rem",
                            height: "2rem",
                            color: 'var(--text-1)',
                          }}
                        >
                          <GitHubIcon />
                        </div>
                      ) : (
                        <img
                          src={`/${tech}.png`}
                          alt={tech}
                          className="object-contain"
                          style={{
                            width: "2rem",
                            height: "2rem",
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <span className="font-medium text-center leading-tight" style={{ fontSize: "0.625rem" }}>
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