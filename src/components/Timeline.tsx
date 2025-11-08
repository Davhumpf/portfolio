"use client";
import Section from "./Section";
import { useState } from "react";

interface TimelineItem {
  id: number;
  emoji: string;
  period: string;
  role: string;
  title: string;
  description: string[];
  highlight?: {
    title: string;
    content: string;
  };
  keyLearning?: string;
  color: string;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    emoji: "🟣",
    period: "2025 — Presente",
    role: "Frontend Developer",
    title: "React / Next.js / TypeScript / GSAP / Framer Motion / Tailwind / Cloud",
    description: [
      "En la actualidad me dedico al desarrollo de experiencias web interactivas y visualmente inmersivas, donde cada transición, cada animación y cada detalle visual están diseñados para ofrecer una navegación fluida, atractiva y accesible.",
      "Trabajo principalmente con React y Next.js, potenciados por TypeScript para garantizar escalabilidad y mantenibilidad en los proyectos. Mi especialidad está en la animación y microinteracción, aplicando herramientas como GSAP, Framer Motion y Anime.js para dar vida a interfaces que se sienten naturales y con carácter.",
      "Integro además bases de datos en la nube (Firebase, Supabase, Google Cloud o Azure) para aplicaciones que requieren eficiencia y actualización en tiempo real. Combino esto con Tailwind CSS y un enfoque modular de componentes reutilizables, garantizando consistencia visual y velocidad en el desarrollo.",
    ],
    highlight: {
      title: "🛍️ Proyecto destacado: \"Nova Store\"",
      content: "Iniciada en 2023 y evolucionada hasta hoy. Se trata de un e-commerce híbrido que combina la venta de productos digitales y físicos con un sistema semi-automatizado de gestión y pedidos. Desde la concepción de la UI hasta la integración de la base de datos en la nube, cada parte del proyecto fue diseñada por mí con la meta de optimizar procesos y ofrecer una experiencia de compra moderna y ágil.",
    },
    keyLearning: "En esta etapa he consolidado una visión muy clara: una buena interfaz no solo se ve bien, se siente bien. Cada pixel, cada animación y cada decisión técnica apuntan a crear experiencias digitales que conecten emocionalmente con el usuario.",
    color: "purple",
  },
  {
    id: 2,
    emoji: "🟠",
    period: "2023 — 2024",
    role: "Full-stack Jr Developer",
    title: "Node.js / Python / Java / MySQL / SQLite / Docker / CI/CD / Cloud",
    description: [
      "Durante este periodo, me formé técnica y profesionalmente en los fundamentos del desarrollo web completo. Fue el punto de partida que me permitió entender cómo se estructura una aplicación desde el servidor hasta el cliente.",
      "Trabajé con Node.js y Express para la creación de APIs, explorando también Python y Java para ampliar mi dominio de la lógica de programación y diferentes paradigmas. A la par, implementé bases de datos relacionales (MySQL, SQLite) y practiqué despliegues con Docker, pipelines de CI/CD y servicios en la nube como Firebase, Azure y Google Cloud.",
      "Durante este tiempo nació Nova Store (2023) como un proyecto experimental, aplicando mis conocimientos full-stack para crear un producto real. Fue un laboratorio de aprendizaje que me permitió entender no solo cómo programar, sino cómo pensar un producto digital de principio a fin.",
    ],
    keyLearning: "🎯 Lección clave: comprender que la tecnología es solo una herramienta. El verdadero valor está en cómo la experiencia del usuario y la arquitectura del software se encuentran en armonía.",
    color: "orange",
  },
  {
    id: 3,
    emoji: "💡",
    period: "Filosofía",
    role: "Estilo de Trabajo",
    title: "Equilibrio entre creatividad visual y precisión técnica",
    description: [
      "Soy un desarrollador que encuentra equilibrio entre la creatividad visual y la precisión técnica. Me apasiona diseñar interfaces que transmitan emociones, que sean fluidas, responsivas y visualmente coherentes, pero también ligeras y eficientes.",
      "Trabajo cómodamente de forma autónoma, organizando mi flujo con metodologías modernas y cuidando la calidad de cada entrega. No obstante, cuando colaboro en equipo, asumo un rol de liderazgo natural, fomentando comunicación clara y dirección técnica orientada a resultados.",
    ],
    keyLearning: "Mi filosofía es simple: El código debe sentirse tan bien como se ve el diseño. Cada línea escrita y cada animación ejecutada deben construir una experiencia donde el usuario perciba tanto la estética como la ingeniería detrás del producto.",
    color: "blue",
  },
];

export default function Timeline() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const getColorClasses = (color: string, isHovered: boolean) => {
    const colors = {
      purple: {
        border: isHovered ? "border-purple-500" : "border-purple-500/30",
        bg: "bg-purple-500/10",
        glow: "shadow-purple-500/50",
        dot: "bg-purple-500",
      },
      orange: {
        border: isHovered ? "border-orange-500" : "border-orange-500/30",
        bg: "bg-orange-500/10",
        glow: "shadow-orange-500/50",
        dot: "bg-orange-500",
      },
      blue: {
        border: isHovered ? "border-blue-500" : "border-blue-500/30",
        bg: "bg-blue-500/10",
        glow: "shadow-blue-500/50",
        dot: "bg-blue-500",
      },
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  return (
    <Section id="timeline" title="Experiencia" subtitle="Línea de tiempo profesional.">
      <div className="w-full overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="min-w-max flex items-start gap-0 relative px-4">
          {/* Línea horizontal de fondo */}
          <div className="absolute top-[40px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gray-600 to-transparent"
               style={{ width: '100%', zIndex: 0 }} />

          {timelineData.map((item, index) => {
            const isHovered = hoveredId === item.id;
            const colorClasses = getColorClasses(item.color, isHovered);

            return (
              <div
                key={item.id}
                className="relative flex flex-col items-center"
                style={{ zIndex: isHovered ? 10 : 1 }}
              >
                {/* Punto en la línea */}
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 rounded-full border-4 ${colorClasses.border} ${colorClasses.bg}
                               flex items-center justify-center text-3xl transition-all duration-300 cursor-pointer
                               ${isHovered ? `scale-110 shadow-lg ${colorClasses.glow}` : 'scale-100'}`}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {item.emoji}
                  </div>
                  {/* Pequeño dot de conexión */}
                  <div className={`absolute bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full ${colorClasses.dot}`} />
                </div>

                {/* Tarjeta que se expande */}
                <div
                  className={`border-2 ${colorClasses.border} ${colorClasses.bg} rounded-xl p-6 backdrop-blur-sm
                             transition-all duration-500 ease-out cursor-pointer overflow-hidden
                             ${isHovered ? `w-[500px] ${colorClasses.glow} shadow-2xl scale-105` : 'w-[300px] shadow-md'}`}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Header siempre visible */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold mb-1">{item.period}</h3>
                    <h4 className="text-lg font-semibold opacity-90">{item.role}</h4>
                    <p className="text-xs opacity-70 mt-2 font-mono">{item.title}</p>
                  </div>

                  {/* Contenido expandible */}
                  <div
                    className={`transition-all duration-500 ${
                      isHovered ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-3 text-sm leading-relaxed">
                      {item.description.map((paragraph, i) => (
                        <p key={i} className="opacity-80">
                          {paragraph}
                        </p>
                      ))}

                      {item.highlight && (
                        <div className={`mt-4 p-4 rounded-lg border ${colorClasses.border} ${colorClasses.bg}`}>
                          <h5 className="font-semibold mb-2">{item.highlight.title}</h5>
                          <p className="text-sm opacity-80">{item.highlight.content}</p>
                        </div>
                      )}

                      {item.keyLearning && (
                        <div className="mt-4 p-4 rounded-lg bg-black/20 border border-white/10">
                          <p className="text-sm opacity-90 italic">{item.keyLearning}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Indicador de hover */}
                  {!isHovered && (
                    <div className="text-center mt-4 text-xs opacity-50">
                      Pasa el mouse para ver más
                    </div>
                  )}
                </div>

                {/* Conector al siguiente item (excepto el último) */}
                {index < timelineData.length - 1 && (
                  <div className="absolute top-[40px] right-[-80px] w-[80px] h-[2px] bg-gradient-to-r from-gray-600/50 to-transparent"
                       style={{ zIndex: 0 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

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
      `}</style>
    </Section>
  );
}
