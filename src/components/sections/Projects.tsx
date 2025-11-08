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

const Monitor = (props: React.SVGProps<SVGSVGElement>) => (
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
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <line x1="12" x2="12" y1="17" y2="21" />
  </svg>
);

const X = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
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
  const [showPreview, setShowPreview] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
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

  // Transición GSAP suave con parallax, fade, scale y blur
  const transitionToSlide = useCallback((fromIndex: number, toIndex: number) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        // Limpiar estilos inline después de la animación
        slideRefs.current.forEach((slide, idx) => {
          if (slide && idx !== toIndex) {
            gsap.set(slide, { clearProps: "all" });
          }
        });
      },
    });

    const outgoingSlide = slideRefs.current[fromIndex];
    const incomingSlide = slideRefs.current[toIndex];
    const outgoingImage = imageRefs.current[fromIndex];
    const incomingImage = imageRefs.current[toIndex];

    if (outgoingSlide) {
      // Slide saliente: fade out, scale down, blur
      timeline.to(
        outgoingSlide,
        {
          opacity: 0,
          scale: 0.96,
          filter: "blur(6px)",
          y: 8,
          duration: 0.5,
          ease: "power2.out",
        },
        0
      );

      // Parallax en imagen saliente
      if (outgoingImage) {
        timeline.to(
          outgoingImage,
          {
            y: -12,
            duration: 0.5,
            ease: "power2.out",
          },
          0
        );
      }
    }

    if (incomingSlide) {
      // Configurar estado inicial del slide entrante
      gsap.set(incomingSlide, {
        opacity: 0,
        scale: 0.98,
        filter: "blur(6px)",
        y: 8,
        zIndex: 10,
      });

      // Slide entrante: fade in, scale up, deblur
      timeline.to(
        incomingSlide,
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.2
      );

      // Parallax en imagen entrante
      if (incomingImage) {
        gsap.set(incomingImage, { y: 12 });
        timeline.to(
          incomingImage,
          {
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0.2
        );
      }
    }

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

  // Manejo de ESC para cerrar modal y bloqueo de scroll
  useEffect(() => {
    if (showPreview) {
      // Bloquear scroll del body cuando el modal está abierto
      document.body.style.overflow = "hidden";

      // Listener para cerrar con ESC
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setShowPreview(false);
        }
      };
      window.addEventListener("keydown", handleEsc);

      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [showPreview]);

  // Inicializar primer slide
  useEffect(() => {
    if (slideRefs.current[0]) {
      gsap.set(slideRefs.current[0], {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        zIndex: 10,
      });
    }
    // Ocultar todos los demás
    slideRefs.current.forEach((slide, idx) => {
      if (slide && idx !== 0) {
        gsap.set(slide, {
          opacity: 0,
          scale: 0.98,
          filter: "blur(6px)",
          y: 8,
          zIndex: 1,
        });
      }
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
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Contenedor de slides con altura reservada */}
          <div
            className="relative w-full"
            style={{
              minHeight: "clamp(320px, 50vh, 560px)",
            }}
          >
            {projects.map((project, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  slideRefs.current[idx] = el;
                }}
                className="absolute inset-0 grid place-items-center px-4"
                style={{
                  minHeight: "clamp(320px, 50vh, 560px)",
                  pointerEvents: current === idx ? "auto" : "none",
                }}
              >
                {/* Fondo con gradiente */}
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    background: `
                      radial-gradient(900px circle at 20% 10%, var(--accent-2) 0%, transparent 60%),
                      radial-gradient(800px circle at 80% 30%, var(--accent-2) 0%, transparent 60%)
                    `,
                    opacity: 0.08,
                  }}
                />

                {/* Imagen de fondo con parallax */}
                {project.image && !project.comingSoon && (
                  <div
                    ref={(el) => {
                      imageRefs.current[idx] = el;
                    }}
                    className="absolute inset-0 -z-5"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: 0.15,
                      filter: "blur(8px)",
                    }}
                  />
                )}

                {/* Contenido del slide */}
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                  {project.comingSoon ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                        style={{
                          border: "1px solid var(--border)",
                          background: "var(--bg-card)",
                          fontSize: "clamp(11px, 1.4vw, 13px)",
                          fontWeight: 700,
                          color: "var(--text-2)",
                        }}
                      >
                        {project.tag}
                      </div>
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
                      <button
                        onClick={() => setShowPreview(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                        style={{
                          border: "1px solid var(--accent)",
                          background: "var(--accent)",
                          fontSize: "clamp(12px, 1.6vw, 14px)",
                          fontWeight: 600,
                          color: "#ffffff",
                        }}
                      >
                        <Monitor />
                        Vista Previa Interactiva
                      </button>
                    </>
                  )}
                </div>
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
              padding: "clamp(8px, 2vw, 12px)",
              boxShadow: "var(--shadow-md)",
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
              padding: "clamp(8px, 2vw, 12px)",
              boxShadow: "var(--shadow-md)",
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

      {/* Modal de Vista Previa Interactiva */}
      {showPreview && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{
            background: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setShowPreview(false)}
        >
          <div
            className="relative w-full h-full max-w-7xl max-h-[90vh] rounded-2xl overflow-hidden"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{
                borderBottom: "1px solid var(--border)",
                background: "var(--panel)",
              }}
            >
              <div className="flex items-center gap-3">
                <Monitor width={20} height={20} style={{ color: "var(--accent)" }} />
                <div>
                  <h3 className="font-bold text-lg" style={{ color: "var(--text-1)" }}>
                    Nova Store - Vista Previa Interactiva
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-2)" }}>
                    Interactúa con el proyecto en tiempo real
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="rounded-full p-2 transition-all hover:bg-opacity-80 active:scale-95"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
                aria-label="Cerrar vista previa"
              >
                <X />
              </button>
            </div>

            {/* Iframe */}
            <div className="w-full h-[calc(100%-80px)]">
              <iframe
                src="https://nova-store-page.vercel.app/inicio"
                className="w-full h-full"
                title="Nova Store Preview"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
