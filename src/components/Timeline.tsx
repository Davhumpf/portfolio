"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTheme } from "next-themes";
import Section from "./Section";

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  details?: string[];
  colorLight: string; // Color más oscuro para light mode
  colorDark: string;  // Color más claro para dark mode
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: "2019",
    title: "Primer contacto con la programación",
    subtitle: "Inicio autodidacta | HTML puro | Curiosidad técnica",
    description: "Año previo a la pandemia. Estaba en noveno de colegio, emocionado por la idea de estudiar Ingeniería de Sistemas. Sin saberlo, ese entusiasmo fue el inicio de todo: comencé a aprender HTML desde cero, creando mis primeras páginas sin CSS, solo por el gusto de ver algo construido por mis propias manos. Fue mi primer acercamiento real al mundo digital, donde descubrí la satisfacción de convertir ideas en código.",
    colorLight: "#6D28D9",  // Púrpura oscuro para light mode
    colorDark: "#A78BFA",   // Púrpura claro para dark mode
  },
  {
    id: 2,
    year: "2020",
    title: "Primeros experimentos y el impulso de los videojuegos",
    subtitle: "Java | Lógica de programación | Creatividad aplicada",
    description: "Con más tiempo libre durante la pandemia, me lancé de lleno al aprendizaje con Java, mi primer lenguaje formal. Desarrollé pequeños proyectos y hasta creé un juego propio, que luego borré (pero marcó mi inicio en la programación interactiva). Los videojuegos se convirtieron en mi motivación: quería entender cómo se creaban, y soñaba con construir uno propio algún día.",
    colorLight: "#7C3AED",  // Púrpura medio oscuro
    colorDark: "#C4B5FD",   // Púrpura más claro
  },
  {
    id: 3,
    year: "2021",
    title: "Formación técnica y primeros proyectos personales",
    subtitle: "Platzi | Autodidacta | Desarrollo full-stack inicial",
    description: "Ingresé a cursos técnicos en Platzi, donde aprendí desde los fundamentos de la web hasta conceptos avanzados de backend y frontend. Durante este tiempo desarrollé múltiples proyectos personales, pequeños pero significativos.",
    details: [
      "Una app de recordatorios simples",
      "Un sistema para administrar cuentas de streaming",
      "Una página de plantas dedicada a una persona especial"
    ],
    colorLight: "#5B21B6",
    colorDark: "#A78BFA",
  },
  {
    id: 4,
    year: "2022",
    title: "Consolidación técnica y visión de producto",
    subtitle: "Node.js / Python / MySQL / Docker / Cloud",
    description: "Ya con bases más sólidas, comencé a comprender el ecosistema completo del desarrollo. Aprendí sobre servidores, APIs, bases de datos y despliegues, aplicando buenas prácticas con Docker y flujos de CI/CD. Empecé a ver el código no solo como algo funcional, sino como una herramienta para construir productos reales y escalables.",
    colorLight: "#4C1D95",
    colorDark: "#8B5CF6",
  },
  {
    id: 5,
    year: "2023",
    title: "Transición universitaria y proyectos académicos",
    subtitle: "Matemática aplicada | Cálculo | Java / Python / Frontend avanzado",
    description: "Al ingresar a la universidad, empecé a sentir que el conocimiento se transformaba en poder crear de verdad. Mi proyecto más destacado fue una calculadora de variables e integrales, desarrollada para mi clase de cálculo, que me mostró cómo la programación podía resolver problemas académicos reales. Ese mismo año nació Nova Store, inicialmente como un proyecto frontend personal… sin imaginar que se convertiría en mi plataforma insignia.",
    colorLight: "#6D28D9",
    colorDark: "#A78BFA",
  },
  {
    id: 6,
    year: "2023 - 2025",
    title: "Nova Store: de idea a producto funcional",
    subtitle: "React / Next.js / Tailwind / Node / Flutter / Cloud / GSAP",
    description: "Nova Store comenzó como un e-commerce sencillo, pero con el tiempo lo expandí hacia un sistema semi-automatizado que combina la venta de productos digitales y físicos. Integré un backend propio, gestión de usuarios avanzada, panel de administración optimizado y sincronización con la nube. Incluso desarrollé una versión complementaria en Flutter, explorando la convergencia entre web y mobile.",
    details: [
      "Hoy, Nova Store genera ganancias tanto para mí como para otros usuarios sin necesidad de inversión directa.",
      "Es un reflejo de mi evolución: de crear por curiosidad, a diseñar por propósito."
    ],
    colorLight: "#5B21B6",
    colorDark: "#C4B5FD",
  },
  {
    id: 7,
    year: "2025",
    title: "Actualidad: Frontend Dev y Experiencia Interactiva",
    subtitle: "React / Next.js / TypeScript / GSAP / Framer Motion / Tailwind / Supabase",
    description: "Actualmente me dedico al desarrollo de interfaces modernas con un enfoque en animación, interacción y fluidez visual. Uso herramientas como GSAP, Framer Motion y Anime.js para crear experiencias inmersivas, dinámicas y naturales. Me apasiona que cada detalle tenga intención, que la navegación se sienta ligera y que la interfaz respire.",
    details: [
      "Una buena interfaz no solo se ve bien, se siente bien.",
      "Cada transición, cada microinteracción, cada sombra es parte de una experiencia pensada para el usuario."
    ],
    colorLight: "#7C3AED",
    colorDark: "#A78BFA",
  },
  {
    id: 8,
    year: "Visión a Futuro",
    title: "Diseño interactivo y experiencias inmersivas",
    subtitle: "Diseño interactivo | Realidad Virtual | Experiencias inmersivas",
    description: "Mi meta a largo plazo es desarrollar páginas web con realidad virtual, donde el usuario pueda literalmente tocar la interfaz. Quiero fusionar diseño, tecnología y emoción para crear experiencias que no solo se vean o usen, sino que se vivan.",
    colorLight: "#6D28D9",
    colorDark: "#C4B5FD",
  },
];

export default function Timeline() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mediaQuery.matches;

    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    });

    animateCardIn();
  }, []);

  const animateCardIn = () => {
    if (!cardRef.current) return;

    const timeScale = prefersReducedMotion.current ? 10 : 1;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.timeScale(timeScale);

    const elements = cardRef.current.querySelectorAll('.animate-element');

    tl.fromTo(
      cardRef.current,
      {
        opacity: 0,
        scale: 0.9,
        rotationY: -15
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "power3.out"
      }
    );

    tl.fromTo(
      elements,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      },
      "-=0.5"
    );
  };

  const animateTransition = (direction: 'next' | 'prev') => {
    if (isAnimating || !cardRef.current) return;

    setIsAnimating(true);

    const timeScale = prefersReducedMotion.current ? 10 : 1;
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        setIsAnimating(false);
      }
    });
    tl.timeScale(timeScale);

    const elements = cardRef.current.querySelectorAll('.animate-element');
    const xOut = direction === 'next' ? -100 : 100;
    const xIn = direction === 'next' ? 100 : -100;

    // Salida
    tl.to(elements, {
      opacity: 0,
      x: xOut * 0.3,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in"
    });

    tl.to(
      cardRef.current,
      {
        opacity: 0,
        x: xOut,
        scale: 0.95,
        rotationY: direction === 'next' ? 10 : -10,
        duration: 0.5,
        ease: "power3.in"
      },
      "-=0.3"
    );

    // Cambiar índice
    tl.call(() => {
      if (direction === 'next') {
        setCurrentIndex((prev) => (prev + 1) % timelineEvents.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + timelineEvents.length) % timelineEvents.length);
      }
    });

    // Entrada
    tl.fromTo(
      cardRef.current,
      {
        opacity: 0,
        x: xIn,
        scale: 0.95,
        rotationY: direction === 'next' ? -10 : 10
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.6,
        ease: "power3.out"
      }
    );

    tl.fromTo(
      cardRef.current.querySelectorAll('.animate-element'),
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      },
      "-=0.4"
    );
  };

  const handleNext = () => {
    animateTransition('next');
  };

  const handlePrev = () => {
    animateTransition('prev');
  };

  const handleDotClick = (index: number) => {
    if (index === currentIndex || isAnimating) return;

    const direction = index > currentIndex ? 'next' : 'prev';
    setCurrentIndex(index);

    if (!cardRef.current) return;

    const timeScale = prefersReducedMotion.current ? 10 : 1;
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => setIsAnimating(false)
    });
    tl.timeScale(timeScale);

    setIsAnimating(true);

    const elements = cardRef.current.querySelectorAll('.animate-element');

    tl.to(elements, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      stagger: 0.03
    });

    tl.to(cardRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3
    }, "-=0.2");

    tl.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4 }
    );

    tl.fromTo(
      cardRef.current.querySelectorAll('.animate-element'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
      "-=0.3"
    );
  };

  // No renderizar hasta que el tema esté montado
  if (!mounted) return null;

  const currentEvent = timelineEvents[currentIndex];
  const isDark = resolvedTheme === 'dark';
  const currentColor = isDark ? currentEvent.colorDark : currentEvent.colorLight;

  return (
    <Section id="timeline" title="Mi Trayectoria" subtitle="Evolución profesional y técnica">
      <div className="timeline-slider-container relative w-full max-w-4xl mx-auto px-4 py-8">

        {/* Tarjeta principal */}
        <div className="relative min-h-[400px] md:min-h-[450px] flex items-center justify-center">
          <div
            ref={cardRef}
            className={`timeline-card relative w-full rounded-2xl shadow-2xl p-6 md:p-10 ${
              isDark
                ? 'bg-gradient-to-br from-gray-900 to-gray-800'
                : 'bg-gradient-to-br from-white to-gray-50'
            }`}
            style={{
              border: `2px solid ${currentColor}`,
              boxShadow: `0 20px 60px ${currentColor}40, 0 0 40px ${currentColor}20`
            }}
          >
            {/* Año destacado */}
            <div
              className="animate-element absolute -top-6 left-8 px-5 py-2 md:px-6 md:py-3 rounded-full font-bold text-lg md:text-xl text-white"
              style={{
                background: `linear-gradient(135deg, ${currentColor}, ${currentColor}dd)`,
                boxShadow: `0 4px 20px ${currentColor}60`
              }}
            >
              {currentEvent.year}
            </div>

            {/* Contenido */}
            <div className="space-y-4 md:space-y-6 pt-8">
              <h3 className={`animate-element text-xl md:text-2xl font-bold leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {currentEvent.title}
              </h3>

              {currentEvent.subtitle && (
                <p
                  className="animate-element text-sm md:text-base font-medium"
                  style={{ color: currentColor }}
                >
                  {currentEvent.subtitle}
                </p>
              )}

              <p className={`animate-element text-sm md:text-base leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {currentEvent.description}
              </p>

              {currentEvent.details && currentEvent.details.length > 0 && (
                <div className="animate-element space-y-3 pt-4">
                  {currentEvent.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 text-sm md:text-base ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: currentColor }}
                      />
                      <p className="leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Flechas de navegación */}
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg z-10 ${
              isDark
                ? 'bg-gray-800 hover:bg-gray-700 border-gray-600 text-white hover:shadow-purple-400/50'
                : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-800 hover:shadow-purple-600/50'
            }`}
            style={{
              borderColor: isAnimating ? '' : currentColor,
            }}
            aria-label="Anterior"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={isAnimating}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg z-10 ${
              isDark
                ? 'bg-gray-800 hover:bg-gray-700 border-gray-600 text-white hover:shadow-purple-400/50'
                : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-800 hover:shadow-purple-600/50'
            }`}
            style={{
              borderColor: isAnimating ? '' : currentColor,
            }}
            aria-label="Siguiente"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicadores de posición (dots) */}
        <div className="flex items-center justify-center gap-2 md:gap-3 mt-8 md:mt-10">
          {timelineEvents.map((event, index) => {
            const dotColor = isDark ? event.colorDark : event.colorLight;
            return (
              <button
                key={event.id}
                onClick={() => handleDotClick(index)}
                disabled={isAnimating}
                className="relative group"
                aria-label={`Ir a ${event.year}`}
              >
                <div
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'scale-125' : 'scale-100 hover:scale-110'
                  }`}
                  style={{
                    backgroundColor: index === currentIndex ? dotColor : (isDark ? '#4B5563' : '#9CA3AF'),
                    boxShadow: index === currentIndex ? `0 0 12px ${dotColor}` : 'none'
                  }}
                />

                {/* Tooltip con el año */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${
                  isDark ? 'bg-gray-800 text-white' : 'bg-gray-700 text-white'
                }`}>
                  {event.year}
                </div>
              </button>
            );
          })}
        </div>

        {/* Contador de slides */}
        <div className={`text-center mt-4 md:mt-6 text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {currentIndex + 1} / {timelineEvents.length}
        </div>
      </div>

      <style jsx>{`
        .timeline-card {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
      `}</style>
    </Section>
  );
}
