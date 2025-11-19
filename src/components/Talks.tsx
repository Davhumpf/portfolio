"use client";
import React, { useState } from "react";
import Section from "./Section";
import { useT } from "@/context/LanguageProvider";
import { Mic, MapPin, Calendar, Users, ExternalLink, Award, BookOpen, Code } from "lucide-react";

interface Talk {
  id: string;
  title: string;
  event: string;
  type: "conference" | "seminar" | "workshop" | "event";
  description: string;
  location: string;
  date: string;
  topics: string[];
  role: "attendee" | "speaker";
  keyTakeaways?: string[];
  organizer?: string;
}

export default function Talks() {
  const t = useT();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const talks: Talk[] = [
    {
      id: "1",
      title: "Seminario Nacional de Ingeniería de Software",
      event: "Industria de Desarrollo del Software en Colombia",
      type: "conference",
      description: "Seminario nacional enfocado en el estado actual de la industria del software en Colombia. Discusión sobre tendencias, metodologías, y el futuro del desarrollo de software a nivel nacional.",
      location: "Colombia",
      date: "2022",
      topics: ["Industria Software", "Desarrollo Nacional", "Metodologías", "Tendencias"],
      role: "attendee",
      keyTakeaways: [
        "Panorama actual de la industria del software colombiana",
        "Mejores prácticas en ingeniería de software a nivel empresarial",
        "Oportunidades y desafíos en el mercado tech nacional",
        "Networking con profesionales del sector"
      ]
    },
    {
      id: "2",
      title: "Seminario Privado de Desarrollo",
      event: "Estudio de Grupos: Cali - Bogotá",
      type: "seminar",
      description: "Seminario privado enfocado en investigación y desarrollo colaborativo entre equipos de las principales ciudades tecnológicas de Colombia. Intercambio de conocimientos y experiencias entre desarrolladores.",
      location: "Cali - Bogotá, Colombia",
      date: "2024",
      topics: ["Desarrollo Colaborativo", "Investigación", "Best Practices", "Team Dynamics"],
      role: "attendee",
      organizer: "Grupo de Estudios Cali-Bogotá",
      keyTakeaways: [
        "Metodologías de trabajo colaborativo entre ciudades",
        "Estrategias de comunicación en equipos distribuidos",
        "Frameworks y herramientas para desarrollo remoto",
        "Casos de estudio de proyectos exitosos"
      ]
    },
    {
      id: "3",
      title: "Desarrollo Frontend y Ciberseguridad",
      event: "Conferencia Técnica Especializada",
      type: "event",
      description: "Evento técnico centrado en la intersección entre desarrollo frontend moderno y principios de ciberseguridad. Exploración de vulnerabilidades comunes, mejores prácticas de seguridad en aplicaciones web, y herramientas de protección.",
      location: "Colombia",
      date: "2025",
      topics: ["Frontend", "Ciberseguridad", "Web Security", "React Security", "XSS", "CSRF"],
      role: "attendee",
      keyTakeaways: [
        "Vulnerabilidades comunes en aplicaciones React/Next.js",
        "Implementación de Content Security Policy (CSP)",
        "Sanitización de inputs y prevención de XSS",
        "Autenticación segura y manejo de tokens",
        "HTTPS, CORS y configuraciones de seguridad"
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "conference":
        return <Users size={20} />;
      case "seminar":
        return <BookOpen size={20} />;
      case "workshop":
        return <Code size={20} />;
      default:
        return <Mic size={20} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "conference":
        return "Conferencia";
      case "seminar":
        return "Seminario";
      case "workshop":
        return "Workshop";
      default:
        return "Evento";
    }
  };

  const getRoleBadge = (role: string) => {
    if (role === "speaker") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold border border-purple-500/30">
          <Mic size={12} />
          Speaker
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/30">
        <Award size={12} />
        Asistente
      </span>
    );
  };

  return (
    <Section 
      id="talks" 
      title={t("talks_title") || "Charlas & Eventos"} 
      subtitle={t("talks_subtitle") || "Conferencias y aprendizaje continuo"}
    >
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        
        {/* Intro */}
        <div className="mb-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Participación en conferencias, seminarios y eventos técnicos. 
            Aprendizaje continuo sobre desarrollo de software, industria tech y mejores prácticas.
          </p>
        </div>

        {/* Timeline de eventos */}
        <div className="space-y-6">
          {talks.map((talk, index) => {
            const isExpanded = expandedId === talk.id;
            
            return (
              <div
                key={talk.id}
                className="group relative"
              >
                {/* Timeline line (except for last item) */}
                {index !== talks.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 to-purple-500/50 -z-10" />
                )}

                {/* Card */}
                <div className="flex gap-4 md:gap-6">
                  {/* Icon circle */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                      {getTypeIcon(talk.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
                      
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
                              {getTypeLabel(talk.type)}
                            </span>
                            {getRoleBadge(talk.role)}
                          </div>
                          
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {talk.title}
                          </h3>
                          
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                            {talk.event}
                          </p>
                        </div>
                      </div>

                      {/* Meta info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          <span>{talk.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          <span>{talk.location}</span>
                        </div>
                        {talk.organizer && (
                          <div className="flex items-center gap-1.5">
                            <Users size={14} />
                            <span className="text-xs">{talk.organizer}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        {talk.description}
                      </p>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {talk.topics.map((topic) => (
                          <span
                            key={topic}
                            className="text-xs px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Key takeaways - Expandible */}
                      {talk.keyTakeaways && talk.keyTakeaways.length > 0 && (
                        <>
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : talk.id)}
                            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-3"
                          >
                            {isExpanded ? "Ocultar aprendizajes ↑" : "Ver aprendizajes clave →"}
                          </button>

                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <Award size={16} className="text-blue-500" />
                                Aprendizajes clave:
                              </h4>
                              <ul className="space-y-2">
                                {talk.keyTakeaways.map((takeaway, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 flex-shrink-0" />
                                    <span>{takeaway}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      )}

                      {/* Gradient effect on hover */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(147, 51, 234, 0.03) 100%)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer stats */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {talks.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Eventos asistidos
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {talks.reduce((acc, talk) => acc + (talk.topics?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Temas explorados
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                {talks.reduce((acc, talk) => acc + (talk.keyTakeaways?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Aprendizajes clave
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Siempre buscando nuevas oportunidades de aprendizaje y networking
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://www.linkedin.com/in/davhumpf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
            >
              Conecta en LinkedIn
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}