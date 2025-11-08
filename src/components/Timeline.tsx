"use client";
import React, { useState } from "react";
import Section from "./Section";

interface TimelineItem {
  id: number;
  emoji: string;
  year: number;
  month: string;
  role: string;
  title: string;
  description: string[];
  duration?: string;
  color: string;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    emoji: "🧠",
    year: 2019,
    month: "Septiembre",
    duration: "7 meses",
    role: "Primer contacto con la programación",
    title: "Inicio autodidacta | HTML puro | Curiosidad técnica",
    description: [
      "Año previo a la pandemia. Estaba en noveno de colegio, emocionado por la idea de estudiar Ingeniería de Sistemas. Sin saberlo, ese entusiasmo fue el inicio de todo: comencé a aprender HTML desde cero, creando mis primeras páginas sin CSS, solo por el gusto de ver algo construido por mis propias manos.",
      "Fue mi primer acercamiento real al mundo digital, donde descubrí la satisfacción de convertir ideas en código.",
    ],
    color: "cyan",
  },
  {
    id: 2,
    emoji: "🕹️",
    year: 2020,
    month: "Abril",
    duration: "10 meses",
    role: "Primeros experimentos y el impulso de los videojuegos",
    title: "Java | Lógica de programación | Creatividad aplicada",
    description: [
      "Con más tiempo libre durante la pandemia, me lancé de lleno al aprendizaje con Java, mi primer lenguaje formal. Desarrollé pequeños proyectos y hasta creé un juego propio, que luego borré (pero marcó mi inicio en la programación interactiva).",
      "Los videojuegos se convirtieron en mi motivación: quería entender cómo se creaban, y soñaba con construir uno propio algún día.",
    ],
    color: "green",
  },
  {
    id: 3,
    emoji: "🎓",
    year: 2021,
    month: "Febrero",
    duration: "15 meses",
    role: "Formación técnica y primeros proyectos personales",
    title: "Platzi | Autodidacta | Desarrollo full-stack inicial",
    description: [
      "Ingresé a cursos técnicos en Platzi, donde aprendí desde los fundamentos de la web hasta conceptos avanzados de backend y frontend. Durante este tiempo desarrollé múltiples proyectos personales, pequeños pero significativos:",
      "• Una app de recordatorios simples\n• Un sistema para administrar cuentas de streaming\n• Una página de plantas dedicada a una persona especial 🌱",
      "Aunque eran proyectos 'para un rato', me ayudaron a entender algo esencial: cada idea, por pequeña que sea, puede entrenar una habilidad grande.",
    ],
    color: "yellow",
  },
  {
    id: 4,
    emoji: "🧩",
    year: 2022,
    month: "Mayo",
    duration: "8 meses",
    role: "Consolidación técnica y visión de producto",
    title: "Node.js / Python / MySQL / Docker / Cloud",
    description: [
      "Ya con bases más sólidas, comencé a comprender el ecosistema completo del desarrollo. Aprendí sobre servidores, APIs, bases de datos y despliegues, aplicando buenas prácticas con Docker y flujos de CI/CD.",
      "Empecé a ver el código no solo como algo funcional, sino como una herramienta para construir productos reales y escalables.",
    ],
    color: "pink",
  },
  {
    id: 5,
    emoji: "🧮",
    year: 2023,
    month: "Enero",
    duration: "Continuo",
    role: "Transición universitaria y proyectos académicos",
    title: "Matemática aplicada | Cálculo | Java / Python / Frontend avanzado",
    description: [
      "Al ingresar a la universidad, empecé a sentir que el conocimiento se transformaba en poder crear de verdad. Mi proyecto más destacado fue una calculadora de variables e integrales, desarrollada para mi clase de cálculo, que me mostró cómo la programación podía resolver problemas académicos reales.",
      "Ese mismo año nació Nova Store, inicialmente como un proyecto frontend personal… sin imaginar que se convertiría en mi plataforma insignia.",
    ],
    color: "orange",
  },
];

export default function Timeline() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; bg: string; shadow: string; dot: string }> = {
      cyan: {
        border: "border-cyan-300/40",
        bg: "bg-cyan-50/10",
        shadow: "shadow-cyan-500/30",
        dot: "bg-cyan-400",
      },
      green: {
        border: "border-green-300/40",
        bg: "bg-green-50/10",
        shadow: "shadow-green-500/30",
        dot: "bg-green-400",
      },
      yellow: {
        border: "border-yellow-300/40",
        bg: "bg-yellow-50/10",
        shadow: "shadow-yellow-500/30",
        dot: "bg-yellow-400",
      },
      pink: {
        border: "border-pink-300/40",
        bg: "bg-pink-50/10",
        shadow: "shadow-pink-500/30",
        dot: "bg-pink-400",
      },
      orange: {
        border: "border-orange-300/40",
        bg: "bg-orange-50/10",
        shadow: "shadow-orange-500/30",
        dot: "bg-orange-400",
      },
      purple: {
        border: "border-purple-300/40",
        bg: "bg-purple-50/10",
        shadow: "shadow-purple-500/30",
        dot: "bg-purple-400",
      },
      blue: {
        border: "border-blue-300/40",
        bg: "bg-blue-50/10",
        shadow: "shadow-blue-500/30",
        dot: "bg-blue-400",
      },
      indigo: {
        border: "border-indigo-300/40",
        bg: "bg-indigo-50/10",
        shadow: "shadow-indigo-500/30",
        dot: "bg-indigo-400",
      },
    };
    return colors[color] || colors.purple;
  };

  return (
    <Section id="timeline" title="Experiencia" subtitle="Línea de tiempo profesional.">
      <div className="w-full overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="relative min-w-max px-8 py-24">
          {/* Línea horizontal continua */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-500/50 to-transparent transform -translate-y-1/2" />

          {/* Contenedor de puntos */}
          <div className="flex items-center justify-center gap-16">
            {timelineData.map((item, index) => {
              const isHovered = hoveredId === item.id;
              const colorClasses = getColorClasses(item.color);

              return (
                <div
                  key={item.id}
                  className="relative flex items-center"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Punto en la línea */}
                  <div className="relative z-10">
                    <div
                      className={`
                        w-16 h-16 rounded-full border-3 ${colorClasses.border} ${colorClasses.bg}
                        backdrop-blur-sm flex items-center justify-center
                        transition-all duration-300 cursor-pointer
                        ${isHovered ? `scale-125 shadow-xl ${colorClasses.shadow}` : 'scale-100'}
                      `}
                    >
                      {/* Punto pequeño interior */}
                      <div className={`w-3 h-3 rounded-full ${colorClasses.dot} transition-all duration-300`} />
                    </div>
                  </div>

                  {/* Tarjeta emergente al hacer hover */}
                  <div
                    className={`
                      absolute bottom-[calc(100%+2rem)] left-1/2 transform -translate-x-1/2
                      w-80 ${colorClasses.border} ${colorClasses.bg} border-2
                      rounded-2xl p-6 backdrop-blur-md
                      transition-all duration-300 ease-out pointer-events-none
                      ${isHovered
                        ? `opacity-100 translate-y-0 shadow-2xl ${colorClasses.shadow}`
                        : 'opacity-0 translate-y-4'
                      }
                    `}
                  >
                    {/* Emoji destacado */}
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-3">{item.emoji}</div>
                      <div className="text-sm font-semibold text-white/60 mb-1">{item.month}</div>
                      <div className="text-2xl font-bold text-white mb-1">{item.year}</div>
                      {item.duration && (
                        <div className={`inline-block px-3 py-1 rounded-full ${colorClasses.bg} ${colorClasses.border} border text-xs font-medium`}>
                          {item.duration}
                        </div>
                      )}
                    </div>

                    {/* Información */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-white/90 leading-snug">{item.role}</h3>
                      <p className="text-xs text-white/70 font-mono leading-relaxed">{item.title}</p>
                    </div>

                    {/* Flecha hacia abajo */}
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rotate-45 ${colorClasses.bg} ${colorClasses.border} border-r-2 border-b-2`} />
                  </div>

                  {/* Conector entre puntos */}
                  {index < timelineData.length - 1 && (
                    <div className="absolute left-full w-16 h-0.5 bg-gray-500/30" />
                  )}
                </div>
              );
            })}
          </div>
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
