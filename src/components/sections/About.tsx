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
  const githubIconRef = useRef<HTMLAnchorElement>(null);
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

      // Animación del icono de GitHub - mismo estilo que Contacts
      gsap.from(".github-icon", {
        scrollTrigger: {
          trigger: ".github-icon",
          start: "top 80%",
          once: true,
          toggleActions: "play none none none",
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        clearProps: "all",
      });

      // Efecto magnético en hover para GitHub icon
      const githubIcon = githubIconRef.current;
      if (githubIcon) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = githubIcon.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(githubIcon, {
            x: x * 0.15,
            y: y * 0.15,
            scale: 1.08,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(githubIcon, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
          });
        };

        githubIcon.addEventListener("mousemove", handleMouseMove);
        githubIcon.addEventListener("mouseleave", handleMouseLeave);
      }

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

            {/* GitHub Icon - mismo estilo que Contactos */}
            <a
              ref={githubIconRef}
              href="https://github.com/Davhumpf"
              target="_blank"
              rel="noopener noreferrer"
              className="github-icon group relative flex items-center justify-center cursor-pointer"
              style={{
                aspectRatio: "1 / 1",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "clamp(16px, 3vw, 24px)",
                boxShadow: "var(--shadow-sm)",
                transition: "box-shadow 0.3s ease",
                minHeight: "clamp(80px, 20vw, 140px)",
                maxWidth: "clamp(80px, 20vw, 140px)",
                margin: "0 auto",
                willChange: "transform",
              }}
              aria-label="GitHub"
              title="Ver perfil en GitHub"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              }}
            >
              {/* Ícono */}
              <div
                className="relative z-10 transition-colors"
                style={{
                  width: "clamp(40px, 12vw, 64px)",
                  height: "clamp(40px, 12vw, 64px)",
                  color: "var(--text-1)",
                }}
              >
                <GitHubIcon />
              </div>

              {/* Glow effect en hover - color GitHub */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                style={{
                  background: "radial-gradient(circle at center, #18171720, transparent 70%)",
                  borderRadius: "clamp(16px, 3vw, 24px)",
                }}
              />

              {/* Nombre en tooltip accesible */}
              <span className="sr-only">GitHub</span>
            </a>

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