"use client";
import Section from "./Section";

const caseStudies = [
  {
    title: "Nova Store — E-commerce híbrido inteligente",
    problem: "Las pequeñas tiendas y creadores digitales necesitaban una plataforma sencilla para vender productos físicos y digitales sin depender de intermediarios.",
    process: "Desarrollé una plataforma completa con React, Next.js, Tailwind y Node.js, integrando bases de datos en la nube con Supabase y Firebase. Añadí paneles de administración, gestión de usuarios avanzada, y animaciones con GSAP y Framer Motion.",
    impact: "Reduje el tiempo de gestión en un 70%, aumenté la velocidad de carga, y generé un sistema semi-automatizado que permite a otros generar ingresos sin inversión inicial."
  },
  {
    title: "Miza — Asistente inteligente con IA emocional",
    problem: "Los asistentes virtuales tradicionales ofrecen respuestas mecánicas y sin empatía, lo que reduce la conexión con el usuario.",
    process: "Diseñé Miza, una asistente con enfoque psicológico y emocional, capaz de interactuar desde una app de escritorio o móvil. Combina IA conversacional y principios de psicología cognitiva, creando una experiencia más humana y adaptable al estado del usuario.",
    impact: "Miza logra interacciones más naturales y empáticas, reduciendo la frustración del usuario y mejorando la retención en apps con soporte virtual. Es un proyecto que une tecnología y bienestar digital."
  },
  {
    title: "Itia — Inteligencia turística por visión computacional",
    problem: "Varias zonas rurales y poco concurridas de Colombia carecen de herramientas tecnológicas que impulsen su turismo y visibilidad.",
    process: "Desarrollé el proyecto Itia, un sistema IoT con cámaras y análisis de video en tiempo real, capaz de estudiar el flujo de personas y resaltar puntos de interés locales. Usa cloud computing y procesamiento de datos visuales para generar mapas de calor y reportes de atracción turística.",
    impact: "Propone una forma sostenible de impulsar el turismo con tecnología, ayudando a comunidades a destacar su potencial sin alterar su entorno."
  },
  {
    title: "Calculadora de Integrales y Variables — Aplicación Académica",
    problem: "Los estudiantes de cálculo perdían tiempo resolviendo integrales manualmente durante las clases.",
    process: "Creé una app en Java con interfaz sencilla que ejecuta operaciones simbólicas y numéricas de forma automática.",
    impact: "Reduje en más del 60% el tiempo de resolución de ejercicios, permitiendo centrarse en la interpretación matemática."
  },
  {
    title: "Design System — Estandarización visual multiplataforma",
    problem: "Los proyectos que desarrollaba presentaban inconsistencias visuales y tiempos largos de diseño.",
    process: "Construí un Design System modular con Tailwind y tokens reutilizables, incorporando modo oscuro y 26 componentes base.",
    impact: "Reduje los tiempos de entrega en un 35% y logré coherencia visual total entre proyectos web y móviles."
  },
  {
    title: "Portfolio Personal — Experiencia inmersiva en movimiento",
    problem: "Mi portafolio anterior no representaba mi enfoque creativo ni mi dominio en animación y UI.",
    process: "Rediseñé toda la experiencia visual con React, Next.js, GSAP y Framer Motion, priorizando accesibilidad, velocidad y sensación de movimiento orgánico.",
    impact: "Logré una experiencia de usuario fluida, viva y memorable, alineada con mi identidad como desarrollador de interfaces interactivas."
  }
];

export default function CaseStudies() {
  return (
    <Section id="cases" title="Casos de Estudio" subtitle="Problema → Proceso → Impacto.">
      <div
        className="max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400/30 hover:scrollbar-thumb-gray-400/50"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(156, 163, 175, 0.3) transparent'
        }}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {caseStudies.map((study, index) => (
            <article
              key={index}
              className="rounded-xl p-6 ring-1 hover:ring-2 transition-all duration-300"
              style={{
                borderColor: "var(--ring)",
                background: "var(--panel-alpha)"
              }}
            >
              <h3 className="font-bold text-lg mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                {study.title}
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 flex items-start">
                    <span className="mr-2 text-red-500">•</span>
                    <span>Problema</span>
                  </h4>
                  <p className="opacity-80 ml-4">
                    {study.problem}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-start">
                    <span className="mr-2 text-yellow-500">•</span>
                    <span>Proceso</span>
                  </h4>
                  <p className="opacity-80 ml-4">
                    {study.process}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-start">
                    <span className="mr-2 text-green-500">•</span>
                    <span>Impacto</span>
                  </h4>
                  <p className="opacity-80 ml-4">
                    {study.impact}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
