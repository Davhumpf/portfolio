"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Section from "./Section";

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  position: "top" | "bottom";
  color: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: "Siglo XIX",
    title: "Amplían la laguna",
    description: "Amplían la laguna ante las constantes inundaciones por desborde del río Rocha",
    position: "bottom",
    color: "#A78BFA",
  },
  {
    id: 2,
    year: "1939",
    title: "Construcción del túnel",
    description: "Inicia la construcción del túnel de conexión y la ampliación",
    position: "top",
    color: "#8B5CF6",
  },
  {
    id: 3,
    year: "1945",
    title: "Recibe agua del río Rocha",
    description: "La Laguna Alalay comienza a recibir agua del río Rocha y se evitan más inundaciones",
    position: "bottom",
    color: "#A78BFA",
  },
  {
    id: 4,
    year: "Años 80",
    title: "Proceso de eutrofización",
    description: "Se acelera el proceso de urbanización y se comienza a sentirse la eutrofización",
    position: "top",
    color: "#374151",
  },
  {
    id: 5,
    year: "1989-1990",
    title: "Exceso de precipitaciones",
    description: "Excesos de precipitaciones afectan la laguna",
    position: "bottom",
    color: "#8B5CF6",
  },
  {
    id: 6,
    year: "1991",
    title: "Incremento del nivel",
    description: "El nivel del agua de la laguna incrementa por las lluvias",
    position: "top",
    color: "#A78BFA",
  },
  {
    id: 7,
    year: "1992-1996",
    title: "Aguas cristalinas",
    description: "La laguna tiene períodos de agua cristalina y turbia",
    position: "bottom",
    color: "#8B5CF6",
  },
  {
    id: 8,
    year: "Años 90",
    title: "Plan de restauración",
    description: "La Alcaldía propuso un plan de restauración",
    position: "top",
    color: "#374151",
  },
  {
    id: 9,
    year: "1997",
    title: "Remoción y dragado",
    description: "Remoción y dragado de lodos para recuperar la laguna",
    position: "bottom",
    color: "#A78BFA",
  },
];

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    // Detectar preferencia de movimiento reducido
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mediaQuery.matches;

    // Detectar si es mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Configurar GSAP
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    });

    // Animación inicial de entrada
    initTimelineAnimation();

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const initTimelineAnimation = () => {
    if (!timelineLineRef.current) return;

    const timeScale = prefersReducedMotion.current ? 10 : 1;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.timeScale(timeScale);

    // Animar la línea principal
    tl.fromTo(
      timelineLineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power3.out" }
    );

    // Aparecer los puntos uno por uno
    pointsRef.current.forEach((point, index) => {
      if (point) {
        const dot = point.querySelector(".point-dot");
        const label = point.querySelector(".point-label");

        tl.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" },
          `-=${index === 0 ? 0.8 : 0.25}`
        );

        if (label) {
          tl.fromTo(
            label,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
            `-=0.35`
          );
        }
      }
    });
  };

  const showInfoCircle = (eventId: number) => {
    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    const point = pointsRef.current.find(
      (p) => p?.getAttribute("data-event-id") === String(eventId)
    );
    if (!point) return;

    const dot = point.querySelector(".point-dot") as HTMLElement;
    const circle = point.querySelector(".info-circle") as HTMLElement;
    const connectingLine = point.querySelector(".connecting-line") as HTMLElement;
    const contentItems = circle?.querySelectorAll(".content-item");

    if (!dot || !circle || !connectingLine) return;

    const timeScale = prefersReducedMotion.current ? 10 : 1;
    const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });
    tl.timeScale(timeScale);
    activeTimelineRef.current = tl;

    // Configurar will-change para performance
    gsap.set([circle, connectingLine, dot], { willChange: "transform, opacity" });

    // 1. Animar el punto pequeño
    tl.to(dot, {
      scale: 1.6,
      backgroundColor: "#8B5CF6",
      borderColor: "#8B5CF6",
      boxShadow: "0 0 0 8px rgba(139, 92, 246, 0.2)",
      duration: 0.3,
      ease: "elastic.out(1, 0.5)",
    });

    // 2. Aparecer la línea conectora
    tl.fromTo(
      connectingLine,
      {
        scaleY: 0,
        opacity: 0,
      },
      {
        scaleY: 1,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      },
      "-=0.15"
    );

    // 3. Aparecer el círculo de información
    const event = timelineEvents.find((e) => e.id === eventId);
    const yOffset = event?.position === "top" ? 20 : -20;

    tl.fromTo(
      circle,
      {
        scale: 0.5,
        opacity: 0,
        y: yOffset,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.2"
    );

    // 4. Animar el contenido interno
    if (contentItems && contentItems.length > 0) {
      tl.fromTo(
        contentItems,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }

    // Limpiar will-change después de la animación
    tl.eventCallback("onComplete", () => {
      gsap.set([circle, connectingLine, dot], { clearProps: "willChange" });
    });

    circle.classList.add("active");
  };

  const hideInfoCircle = (eventId: number) => {
    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    const point = pointsRef.current.find(
      (p) => p?.getAttribute("data-event-id") === String(eventId)
    );
    if (!point) return;

    const dot = point.querySelector(".point-dot") as HTMLElement;
    const circle = point.querySelector(".info-circle") as HTMLElement;
    const connectingLine = point.querySelector(".connecting-line") as HTMLElement;
    const contentItems = circle?.querySelectorAll(".content-item");

    if (!dot || !circle || !connectingLine) return;

    const timeScale = prefersReducedMotion.current ? 10 : 1;
    const tl = gsap.timeline({ defaults: { ease: "power2.in" } });
    tl.timeScale(timeScale);

    // 1. Desvanecer contenido interno
    if (contentItems && contentItems.length > 0) {
      tl.to(contentItems, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.in",
      });
    }

    // 2. Contraer el círculo
    tl.to(
      circle,
      {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.1"
    );

    // 3. Ocultar línea conectora
    tl.to(
      connectingLine,
      {
        scaleY: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      },
      "-=0.2"
    );

    // 4. Restaurar el punto pequeño
    tl.to(
      dot,
      {
        scale: 1,
        backgroundColor: "#FFFFFF",
        borderColor: "#6B7280",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        duration: 0.25,
        ease: "elastic.out(1, 0.4)",
      },
      "-=0.15"
    );

    circle.classList.remove("active");
  };

  const handlePointHover = (eventId: number) => {
    if (isMobile) return;

    if (activePoint !== null && activePoint !== eventId) {
      hideInfoCircle(activePoint);
    }

    setActivePoint(eventId);
    showInfoCircle(eventId);
  };

  const handlePointLeave = (eventId: number) => {
    if (isMobile) return;

    hideInfoCircle(eventId);
    setActivePoint(null);
  };

  const handlePointClick = (eventId: number) => {
    if (!isMobile) return;

    const point = pointsRef.current.find(
      (p) => p?.getAttribute("data-event-id") === String(eventId)
    );
    if (!point) return;

    const dot = point.querySelector(".point-dot") as HTMLElement;

    // Feedback táctil
    gsap.to(dot, {
      scale: 1.3,
      duration: 0.15,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });

    if (activePoint !== null && activePoint !== eventId) {
      hideInfoCircle(activePoint);
    }

    if (activePoint === eventId) {
      closeMobileInfo();
    } else {
      setActivePoint(eventId);
      setShowOverlay(true);
      showInfoCircle(eventId);
      scrollToPoint(point);
    }
  };

  const closeMobileInfo = () => {
    if (activePoint !== null) {
      hideInfoCircle(activePoint);
    }
    setActivePoint(null);
    setShowOverlay(false);
  };

  const scrollToPoint = (point: HTMLElement) => {
    const container = timelineRef.current;
    if (!container) return;

    const pointPosition = point.offsetLeft;
    const containerWidth = container.offsetWidth;
    const scrollPosition = pointPosition - containerWidth / 2;

    gsap.to(container, {
      scrollLeft: scrollPosition,
      duration: 0.8,
      ease: "power2.inOut",
    });
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      closeMobileInfo();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isMobile && activePoint !== null) {
        closeMobileInfo();
      }
    };

    if (isMobile) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile, activePoint]);

  return (
    <Section id="timeline" title="Laguna Alalay" subtitle="Historia de la Laguna Alalay en Cochabamba">
      <div
        ref={timelineRef}
        className="timeline-container w-full overflow-x-auto overflow-y-visible pb-8 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
        style={{
          padding: "100px 40px",
          scrollBehavior: "smooth",
        }}
      >
        <div
          className="timeline-wrapper relative flex items-center justify-between"
          style={{
            minWidth: "max-content",
            height: "400px",
            gap: isMobile ? "100px" : "80px",
          }}
        >
          {/* Línea horizontal principal */}
          <div
            ref={timelineLineRef}
            className="timeline-line absolute top-1/2 left-0 right-0"
            style={{
              height: "3px",
              background: "#9CA3AF",
              transform: "translateY(-50%)",
              transformOrigin: "left center",
            }}
          />

          {/* Puntos de eventos */}
          {timelineEvents.map((event, index) => (
            <div
              key={event.id}
              ref={(el) => {
                pointsRef.current[index] = el;
              }}
              data-event-id={event.id}
              className="timeline-point relative flex-shrink-0"
              style={{ zIndex: 2 }}
              onMouseEnter={() => handlePointHover(event.id)}
              onMouseLeave={() => handlePointLeave(event.id)}
              onClick={() => handlePointClick(event.id)}
              role="listitem"
              aria-label={`${event.year}: ${event.title}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (isMobile) {
                    handlePointClick(event.id);
                  } else {
                    handlePointHover(event.id);
                  }
                }
              }}
            >
              {/* Punto pequeño */}
              <div
                className="point-dot"
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "white",
                  border: "3px solid #6B7280",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: 3,
                  transition: "all 0.3s ease",
                }}
              />

              {/* Etiqueta de año */}
              <div
                className="point-label"
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "12px",
                  color: "#4B5563",
                  whiteSpace: "nowrap",
                  fontWeight: 500,
                }}
              >
                {event.year}
              </div>

              {/* Línea conectora */}
              <div
                className="connecting-line"
                style={{
                  position: "absolute",
                  width: "2px",
                  background: `linear-gradient(to bottom, ${event.color} 0%, ${event.color} 100%)`,
                  borderLeft: `2px dashed ${event.color}`,
                  left: "50%",
                  transform: "translateX(-50%) scaleY(0)",
                  transformOrigin: event.position === "top" ? "bottom center" : "top center",
                  opacity: 0,
                  zIndex: 1,
                  height: "60px",
                  [event.position === "top" ? "bottom" : "top"]: "100%",
                }}
              />

              {/* Círculo de información */}
              <div
                className="info-circle"
                style={{
                  position: "absolute",
                  width: isMobile ? "140px" : "180px",
                  height: isMobile ? "140px" : "180px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${event.color} 0%, ${event.color === "#374151" ? "#4B5563" : event.color} 100%)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: isMobile ? "20px" : "25px",
                  boxShadow: `0 8px 24px ${event.color === "#374151" ? "rgba(55, 65, 81, 0.3)" : "rgba(139, 92, 246, 0.3)"}`,
                  left: "50%",
                  transform: "translateX(-50%) scale(0)",
                  opacity: 0,
                  zIndex: 10,
                  pointerEvents: "none",
                  [event.position === "top" ? "bottom" : "top"]: "calc(100% + 60px)",
                }}
              >
                <div
                  className="content-item year"
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: isMobile ? "18px" : "20px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  {event.year}
                </div>
                <div
                  className="content-item title"
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: isMobile ? "14px" : "16px",
                    fontWeight: 600,
                    marginBottom: "8px",
                    lineHeight: 1.3,
                  }}
                >
                  {event.title}
                </div>
                <div
                  className="content-item description"
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: isMobile ? "12px" : "13px",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    opacity: 0.95,
                  }}
                >
                  {event.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && (
        <div
          className="mobile-overlay"
          onClick={handleOverlayClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 5,
            opacity: showOverlay ? 1 : 0,
            pointerEvents: showOverlay ? "all" : "none",
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
        .info-circle.active {
          pointer-events: all;
        }
        .timeline-point:focus {
          outline: 2px solid #8B5CF6;
          outline-offset: 4px;
          border-radius: 50%;
        }
      `}</style>
    </Section>
  );
}
