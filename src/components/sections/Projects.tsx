"use client";
import { useState, useEffect } from "react";
import Section from "@/components/Section";
import { useT } from "@/context/LanguageProvider";
// Iconos SVG nativos
const ChevronLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const ExternalLink = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" x2="21" y1="14" y2="3"/>
  </svg>
);

export default function Projects() {
  const t = useT();
  const [current, setCurrent] = useState(0);

  const projects = [
    {
      name: "Nova Store",
      tag: "E-commerce",
      desc: "Tienda online moderna con diseño minimalista y experiencia de usuario fluida",
      link: "https://nova-store-page.vercel.app/",
      image: "https://nova-store-page.vercel.app/og-image.png", // Fallback si no existe
    },
    {
      name: t("proj_motion"),
      tag: "Motion Design",
      desc: t("proj_motion_desc"),
      comingSoon: true,
    },
    {
      name: t("proj_i18n"),
      tag: "Developer Tools",
      desc: t("proj_i18n_desc"),
      comingSoon: true,
    },
  ];

  const next = () => setCurrent((prev) => (prev + 1) % projects.length);
  const prev = () => setCurrent((prev) => (prev - 1 + projects.length) % projects.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <Section id="projects" title={t("projects_title")} subtitle={t("projects_sub")}>
      <div className="relative mx-auto max-w-5xl">
        {/* Carrusel */}
        <div className="relative overflow-hidden rounded-3xl ring-1" 
          style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}>
          
          {/* Slides */}
          <div className="relative aspect-video md:aspect-[16/9]">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                  opacity: current === idx ? 1 : 0,
                  transform: `translateX(${(idx - current) * 100}%)`,
                  pointerEvents: current === idx ? "auto" : "none",
                }}
              >
                {project.comingSoon ? (
                  // Coming Soon Card
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-4 md:gap-4 md:p-8">
                    <div className="text-4xl md:text-6xl opacity-20">🚧</div>
                    <h3 className="text-xl md:text-3xl font-bold text-center">{project.name}</h3>
                    <p className="text-center text-sm md:text-lg opacity-70 max-w-md px-4">{project.desc}</p>
                    <div className="mt-2 md:mt-4 rounded-full px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm font-semibold ring-1"
                      style={{ background: "var(--bg)", borderColor: "var(--ring)" }}>
                      Coming Soon
                    </div>
                  </div>
                ) : (
                  // Preview real del proyecto
                  <div className="relative h-full w-full group">
                    {/* Preview iframe - más pequeño en móvil */}
                    <div className="h-full w-full overflow-hidden">
                      <iframe
                        src={project.link}
                        className="h-full w-full border-0 scale-75 md:scale-100 origin-top-left"
                        style={{ width: "133.33%", height: "133.33%" }}
                        title={project.name}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    </div>
                    
                    {/* Overlay con info - adaptado para móvil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent 
                      opacity-0 md:group-hover:opacity-100 transition-opacity duration-300
                      flex flex-col justify-end p-4 md:p-8
                      pointer-events-none md:pointer-events-auto">
                      <span className="text-[10px] md:text-xs font-semibold text-white/70 uppercase tracking-wider">
                        {project.tag}
                      </span>
                      <h3 className="mt-1 md:mt-2 text-xl md:text-3xl font-bold text-white">{project.name}</h3>
                      <p className="mt-1 md:mt-2 text-sm md:text-base text-white/90 max-w-xl line-clamp-2 md:line-clamp-none">
                        {project.desc}
                      </p>
                      
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 md:mt-4 inline-flex items-center gap-2 self-start rounded-full 
                          bg-white px-4 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-semibold text-black
                          hover:bg-white/90 transition-colors pointer-events-auto"
                      >
                        Visitar Proyecto
                        <ExternalLink />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Flechas de navegación */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full p-3
              backdrop-blur-xl transition-all hover:scale-110 active:scale-95"
            style={{ background: "var(--panel-alpha)", border: "1px solid var(--ring)" }}
            aria-label="Proyecto anterior"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full p-3
              backdrop-blur-xl transition-all hover:scale-110 active:scale-95"
            style={{ background: "var(--panel-alpha)", border: "1px solid var(--ring)" }}
            aria-label="Siguiente proyecto"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicadores */}
        <div className="mt-4 md:mt-6 flex justify-center gap-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className="h-1.5 md:h-2 rounded-full transition-all duration-300"
              style={{
                width: current === idx ? "24px" : "8px",
                background: current === idx ? "var(--text)" : "var(--ring)",
                opacity: current === idx ? 1 : 0.4,
              }}
              aria-label={`Ir al proyecto ${idx + 1}`}
            />
          ))}
        </div>

        {/* Info del proyecto actual */}
        <div className="mt-4 md:mt-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-semibold"
            style={{ background: "var(--panel-alpha)", border: "1px solid var(--ring)" }}>
            {projects[current].tag}
          </div>
          <div className="mt-2 text-xs md:text-sm opacity-60">
            {current + 1} / {projects.length}
          </div>
        </div>
      </div>
    </Section>
  );
}