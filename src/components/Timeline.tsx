"use client";
import Section from "./Section";
import { useState } from "react";

interface TimelineItem {
  id: number;
  emoji: string;
  year: number;
  month: string;
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
    emoji: "🧠",
    year: 2019,
    month: "Septiembre",
    period: "2019",
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
    period: "2020",
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
    period: "2021",
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
    period: "2022",
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
    period: "2023",
    role: "Transición universitaria y proyectos académicos",
    title: "Matemática aplicada | Cálculo | Java / Python / Frontend avanzado",
    description: [
      "Al ingresar a la universidad, empecé a sentir que el conocimiento se transformaba en poder crear de verdad. Mi proyecto más destacado fue una calculadora de variables e integrales, desarrollada para mi clase de cálculo, que me mostró cómo la programación podía resolver problemas académicos reales.",
      "Ese mismo año nació Nova Store, inicialmente como un proyecto frontend personal… sin imaginar que se convertiría en mi plataforma insignia.",
    ],
    color: "orange",
  },
  {
    id: 6,
    emoji: "🛒",
    year: 2023,
    month: "Marzo",
    period: "2023 — 2025",
    role: "\"Nova Store\": de idea a producto funcional",
    title: "React / Next.js / Tailwind / Node / Flutter / Cloud / GSAP",
    description: [
      "Nova Store comenzó como un e-commerce sencillo, pero con el tiempo lo expandí hacia un sistema semi-automatizado que combina la venta de productos digitales y físicos. Integré un backend propio, gestión de usuarios avanzada, panel de administración optimizado y sincronización con la nube.",
      "Incluso desarrollé una versión complementaria en Flutter, explorando la convergencia entre web y mobile.",
    ],
    keyLearning: "💡 Hoy, Nova Store genera ganancias tanto para mí como para otros usuarios sin necesidad de inversión directa. Es un reflejo de mi evolución: de crear por curiosidad, a diseñar por propósito.",
    color: "purple",
  },
  {
    id: 7,
    emoji: "🎨",
    year: 2025,
    month: "Enero",
    period: "2025 — Presente",
    role: "Frontend Dev y Experiencia Interactiva",
    title: "React / Next.js / TypeScript / GSAP / Framer Motion / Tailwind / Supabase",
    description: [
      "Actualmente me dedico al desarrollo de interfaces modernas con un enfoque en animación, interacción y fluidez visual. Uso herramientas como GSAP, Framer Motion y Anime.js para crear experiencias inmersivas, dinámicas y naturales.",
      "Me apasiona que cada detalle tenga intención, que la navegación se sienta ligera y que la interfaz 'respire'.",
    ],
    keyLearning: "✨ \"Una buena interfaz no solo se ve bien, se siente bien.\" Cada transición, cada microinteracción, cada sombra es parte de una experiencia pensada para el usuario.",
    color: "blue",
  },
  {
    id: 8,
    emoji: "🌐",
    year: 2025,
    month: "Futuro",
    period: "Visión a Futuro",
    role: "Diseño interactivo | Realidad Virtual | Experiencias inmersivas",
    title: "Web VR | Interfaces táctiles | Experiencias que se viven",
    description: [
      "Mi meta a largo plazo es desarrollar páginas web con realidad virtual, donde el usuario pueda literalmente 'tocar la interfaz'.",
      "Quiero fusionar diseño, tecnología y emoción para crear experiencias que no solo se vean o usen, sino que se vivan.",
    ],
    color: "indigo",
  },
];

export default function Timeline() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const getColorClasses = (color: string, isHovered: boolean) => {
    const colors = {
      cyan: {
        border: isHovered ? "border-cyan-500" : "border-cyan-500/30",
        bg: "bg-cyan-500/10",
        glow: "shadow-cyan-500/50",
        dot: "bg-cyan-500",
      },
      green: {
        border: isHovered ? "border-green-500" : "border-green-500/30",
        bg: "bg-green-500/10",
        glow: "shadow-green-500/50",
        dot: "bg-green-500",
      },
      yellow: {
        border: isHovered ? "border-yellow-500" : "border-yellow-500/30",
        bg: "bg-yellow-500/10",
        glow: "shadow-yellow-500/50",
        dot: "bg-yellow-500",
      },
      pink: {
        border: isHovered ? "border-pink-500" : "border-pink-500/30",
        bg: "bg-pink-500/10",
        glow: "shadow-pink-500/50",
        dot: "bg-pink-500",
      },
      orange: {
        border: isHovered ? "border-orange-500" : "border-orange-500/30",
        bg: "bg-orange-500/10",
        glow: "shadow-orange-500/50",
        dot: "bg-orange-500",
      },
      purple: {
        border: isHovered ? "border-purple-500" : "border-purple-500/30",
        bg: "bg-purple-500/10",
        glow: "shadow-purple-500/50",
        dot: "bg-purple-500",
      },
      blue: {
        border: isHovered ? "border-blue-500" : "border-blue-500/30",
        bg: "bg-blue-500/10",
        glow: "shadow-blue-500/50",
        dot: "bg-blue-500",
      },
      indigo: {
        border: isHovered ? "border-indigo-500" : "border-indigo-500/30",
        bg: "bg-indigo-500/10",
        glow: "shadow-indigo-500/50",
        dot: "bg-indigo-500",
      },
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  const calculateMonthsBetween = (year1: number, month1: string, year2: number, month2: string): number => {
    const monthMap: { [key: string]: number } = {
      'Enero': 0, 'Febrero': 1, 'Marzo': 2, 'Abril': 3, 'Mayo': 4, 'Junio': 5,
      'Julio': 6, 'Agosto': 7, 'Septiembre': 8, 'Octubre': 9, 'Noviembre': 10, 'Diciembre': 11, 'Futuro': 0
    };

    const m1 = monthMap[month1] || 0;
    const m2 = monthMap[month2] || 0;

    return (year2 - year1) * 12 + (m2 - m1);
  };

  return (
    <Section id="timeline" title="Experiencia" subtitle="Línea de tiempo profesional.">
      <div className="w-full overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="min-w-max flex items-center gap-0 relative px-4 py-20">
          {/* Línea horizontal central */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gray-600 to-transparent transform -translate-y-1/2"
               style={{ width: '100%', zIndex: 0 }} />

          {timelineData.map((item, index) => {
            const isHovered = hoveredId === item.id;
            const colorClasses = getColorClasses(item.color, isHovered);
            const isEven = index % 2 === 0;
            const nextItem = timelineData[index + 1];
            const monthsBetween = nextItem ? calculateMonthsBetween(item.year, item.month, nextItem.year, nextItem.month) : 0;

            return (
              <React.Fragment key={item.id}>
                <div
                  className="relative flex flex-col items-center"
                  style={{ zIndex: isHovered ? 10 : 1 }}
                >
                  {/* Tarjeta que se expande - arriba o abajo según el índice */}
                  <div
                    className={`absolute ${isEven ? 'bottom-[calc(50%+3rem)]' : 'top-[calc(50%+3rem)]'} left-1/2 transform -translate-x-1/2
                                border-2 ${colorClasses.border} ${colorClasses.bg} rounded-xl p-6 backdrop-blur-sm
                                transition-all duration-500 ease-out cursor-pointer overflow-hidden
                                ${isHovered ? `w-[500px] ${colorClasses.glow} shadow-2xl scale-105` : 'w-[300px] shadow-md'}`}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Header siempre visible */}
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold mb-1 text-white/90">{item.year}</div>
                      <h3 className="text-lg font-bold mb-1">{item.period}</h3>
                      <h4 className="text-base font-semibold opacity-90">{item.role}</h4>
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
                          <p key={i} className="opacity-80 whitespace-pre-line">
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
                            <p className="text-sm opacity-90 italic whitespace-pre-line">{item.keyLearning}</p>
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

                    {/* Línea conectora a la timeline central */}
                    <div className={`absolute ${isEven ? 'top-full' : 'bottom-full'} left-1/2 transform -translate-x-1/2
                                    w-[2px] h-6 ${colorClasses.dot}`} />
                  </div>

                  {/* Punto en la línea central */}
                  <div className="relative z-10">
                    <div
                      className={`w-20 h-20 rounded-full border-4 ${colorClasses.border} ${colorClasses.bg}
                                 flex items-center justify-center text-3xl transition-all duration-300 cursor-pointer
                                 ${isHovered ? `scale-125 shadow-lg ${colorClasses.glow}` : 'scale-100'}`}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {item.emoji}
                    </div>
                    {/* Etiqueta del mes */}
                    <div className={`absolute ${isEven ? 'top-full mt-2' : 'bottom-full mb-2'} left-1/2 transform -translate-x-1/2
                                    text-xs font-semibold opacity-70 whitespace-nowrap`}>
                      {item.month}
                    </div>
                  </div>
                </div>

                {/* Conector al siguiente item con indicador de meses */}
                {index < timelineData.length - 1 && (
                  <div className="relative flex items-center justify-center" style={{ width: '150px' }}>
                    <div className={`h-[2px] w-full bg-gradient-to-r from-gray-600/50 to-gray-600/50`} />
                    {monthsBetween > 0 && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                      bg-gray-800/90 px-3 py-1 rounded-full text-xs font-semibold border border-gray-600/50">
                        {monthsBetween} {monthsBetween === 1 ? 'mes' : 'meses'}
                      </div>
                    )}
                  </div>
                )}
              </React.Fragment>
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
