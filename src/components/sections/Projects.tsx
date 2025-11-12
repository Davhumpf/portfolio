"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Section from "@/components/Section";
import { useT } from "@/context/LanguageProvider";
import gsap from "gsap";

// Iconos SVG nativos
const ChevronLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ExternalLink = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" x2="21" y1="14" y2="3" />
  </svg>
);

interface Project {
  name: string;
  tag: string;
  desc: string;
  link?: string;
  image?: string;
  comingSoon?: boolean;
}

export default function Projects() {
  const t = useT();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const projects: Project[] = [
    {
      name: "Nova Store",
      tag: "E-commerce",
      desc: "Tienda online moderna con diseño minimalista y experiencia de usuario fluida",
      link: "https://nova-store-page.vercel.app/inicio",
      image: "https://nova-store-page.vercel.app/og-image.png",
    },
    {
      name: "ITIA",
      tag: "AI & Automation",
      desc: "Plataforma experimental — automatización e IA aplicada.",
      comingSoon: true,
    },
    {
      name: "MIZA",
      tag: "UI Tooling",
      desc: "Tooling para flujos UI — componentes y microinteracciones.",
      comingSoon: true,
    },
  ];

  const len = projects.length;

  // Transición GSAP con slide horizontal 3D épico pero sutil
  const transitionToSlide = useCallback((fromIndex: number, toIndex: number) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const direction = toIndex > fromIndex ? 1 : -1;
    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
    });

    // Animar todos los slides a su posición correcta
    slideRefs.current.forEach((slide, idx) => {
      if (!slide) return;

      const offset = idx - toIndex;
      const xPos = offset * 100; // Porcentaje de desplazamiento horizontal
      const isActive = idx === toIndex;

      timeline.to(
        slide,
        {
          x: `${xPos}%`,
          scale: isActive ? 1 : 0.85,
          rotationY: isActive ? 0 : offset * 15, // Rotación 3D sutil
          opacity: isActive ? 1 : 0, // Solo el activo es visible
          zIndex: isActive ? 10 : 1,
          duration: 0.8,
          ease: "power3.inOut",
        },
        0
      );
    });

    timelineRef.current = timeline;
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === current) return;
      transitionToSlide(current, index);
      setCurrent(index);
    },
    [current, transitionToSlide]
  );

  const next = useCallback(() => {
    const nextIndex = (current + 1) % len;
    goToSlide(nextIndex);
  }, [current, len, goToSlide]);

  const prev = useCallback(() => {
    const prevIndex = (current - 1 + len) % len;
    goToSlide(prevIndex);
  }, [current, len, goToSlide]);

  // Autoplay
  useEffect(() => {
    if (isPaused) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      return;
    }

    autoplayRef.current = setInterval(() => {
      next();
    }, 6000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [next, isPaused]);

  // Navegación por teclado
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  // Soporte para prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches && timelineRef.current) {
      timelineRef.current.duration(0.1);
    }
  }, []);

  // Inicializar slides con posiciones horizontales
  useEffect(() => {
    slideRefs.current.forEach((slide, idx) => {
      if (!slide) return;

      const offset = idx - 0; // Primer slide (idx 0) es el activo
      const xPos = offset * 100;
      const isActive = idx === 0;

      gsap.set(slide, {
        x: `${xPos}%`,
        scale: isActive ? 1 : 0.85,
        rotationY: isActive ? 0 : offset * 15,
        opacity: isActive ? 1 : 0,
        zIndex: isActive ? 10 : 1,
      });
    });
  }, []);

  return (
    <Section id="projects" title={t("projects_title")} subtitle={t("projects_sub")}>
      <div className="relative mx-auto max-w-5xl">
        {/* Carrusel */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
            boxShadow: "var(--shadow-sm)",
            perspective: "1500px", // Para efecto 3D
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Contenedor de slides con altura reservada */}
          <div
            ref={containerRef}
            className="relative w-full"
            style={{
              minHeight: "clamp(300px, 60vh, 720px)",
              transformStyle: "preserve-3d",
            }}
          >
            {projects.map((project, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  slideRefs.current[idx] = el;
                }}
                className="absolute inset-0 px-4 py-6"
                style={{
                  pointerEvents: current === idx ? "auto" : "none",
                  willChange: "transform",
                }}
              >
                {project.comingSoon ? (
                  // Coming Soon Projects
                  <div className="w-full h-full flex flex-col items-center justify-center text-center">
                    <div className="text-5xl md:text-7xl opacity-20 mb-4">🚧</div>
                    <h2
                      className="font-extrabold mb-3"
                      style={{
                        fontSize: "clamp(22px, 4.2vw, 34px)",
                        color: "var(--text-1)",
                      }}
                    >
                      {project.name}
                    </h2>
                    <p
                      className="mx-auto px-4 mb-6"
                      style={{
                        color: "var(--text-2)",
                        maxWidth: "56ch",
                        fontSize: "clamp(14px, 2vw, 16px)",
                      }}
                    >
                      {project.desc}
                    </p>
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-sm"
                      style={{
                        border: "1px solid var(--border)",
                        background: "var(--bg-card)",
                        fontSize: "clamp(12px, 1.6vw, 14px)",
                        fontWeight: 600,
                      }}
                    >
                      Coming Soon
                    </div>
                  </div>
                ) : (
                  // Nova Store con iframe interactivo
                  <div className="w-full h-full flex flex-col gap-4">
                    {/* Header del proyecto */}
                    <div className="flex items-center justify-between px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                          style={{
                            border: "1px solid var(--accent)",
                            background: "var(--accent)",
                            fontSize: "clamp(11px, 1.4vw, 13px)",
                            fontWeight: 700,
                            color: "#ffffff",
                          }}
                        >
                          {project.tag}
                        </div>
                        <h2
                          className="font-extrabold"
                          style={{
                            fontSize: "clamp(18px, 3vw, 24px)",
                            color: "var(--text-1)",
                          }}
                        >
                          {project.name}
                        </h2>
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-all hover:scale-105"
                        style={{
                          border: "1px solid var(--border)",
                          background: "var(--panel)",
                          fontSize: "clamp(11px, 1.4vw, 13px)",
                          fontWeight: 600,
                        }}
                      >
                        <ExternalLink width={14} height={14} />
                        Abrir
                      </a>
                    </div>

                    {/* Iframe interactivo */}
                    <div
                      className="flex-1 rounded-2xl overflow-hidden"
                      style={{
                        border: "2px solid var(--border)",
                        background: "var(--panel)",
                        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.2)",
                        aspectRatio: "16/9",
                        minHeight: "200px",
                      }}
                    >
                      <iframe
                        src={project.link}
                        className="w-full h-full"
                        title={`${project.name} Preview`}
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                        loading="lazy"
                        style={{
                          border: "none",
                        }}
                      />
                    </div>

                    {/* Descripción */}
                    <p
                      className="px-4 text-center"
                      style={{
                        color: "var(--text-2)",
                        fontSize: "clamp(13px, 1.8vw, 15px)",
                      }}
                    >
                      {project.desc}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Flechas de navegación */}
          <button
            onClick={prev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 rounded-full backdrop-blur-xl transition-all hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: "color-mix(in oklab, var(--panel) 80%, transparent)",
              border: "1px solid var(--border)",
              padding: "clamp(12px, 2vw, 16px)",
              boxShadow: "var(--shadow-md)",
              minWidth: "48px",
              minHeight: "48px",
            }}
            aria-label="Proyecto anterior"
            title="Proyecto anterior (←)"
          >
            <ChevronLeft width={20} height={20} />
          </button>

          <button
            onClick={next}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 rounded-full backdrop-blur-xl transition-all hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: "color-mix(in oklab, var(--panel) 80%, transparent)",
              border: "1px solid var(--border)",
              padding: "clamp(12px, 2vw, 16px)",
              boxShadow: "var(--shadow-md)",
              minWidth: "48px",
              minHeight: "48px",
            }}
            aria-label="Siguiente proyecto"
            title="Siguiente proyecto (→)"
          >
            <ChevronRight width={20} height={20} />
          </button>

          {/* Dots */}
          <div
            className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 backdrop-blur-sm rounded-full px-3 py-2"
            style={{
              background: "color-mix(in oklab, var(--panel) 60%, transparent)",
              border: "1px solid var(--border)",
            }}
          >
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className="rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-1 hover:opacity-100"
                style={{
                  width: current === idx ? "clamp(16px, 4vw, 24px)" : "clamp(6px, 1.5vw, 8px)",
                  height: "clamp(6px, 1.5vw, 8px)",
                  background: current === idx ? "var(--accent)" : "var(--text-2)",
                  opacity: current === idx ? 1 : 0.4,
                  cursor: "pointer",
                }}
                aria-label={`Ir al proyecto ${idx + 1}: ${projects[idx].name}`}
                aria-current={current === idx ? "true" : "false"}
                title={`${projects[idx].name}`}
              />
            ))}
          </div>
        </div>

        {/* Info del proyecto actual */}
        <div className="mt-6 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{
              background: "var(--panel-alpha)",
              border: "1px solid var(--border)",
            }}
          >
            {projects[current].tag}
          </div>
          <div className="mt-2 text-sm opacity-60">
            {current + 1} / {len}
          </div>
        </div>
      </div>
    </Section>
  );
}
