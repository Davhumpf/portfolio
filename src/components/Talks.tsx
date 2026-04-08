"use client";
import React, { useState } from "react";
import Section from "./Section";
import { useLang, useT } from "@/context/LanguageProvider";
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
  const { lang } = useLang();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const ui = {
    es: {
      intro: "Participacion en conferencias, seminarios y eventos tecnicos. Aprendizaje continuo sobre desarrollo, industria tech y mejores practicas.",
      conference: "Conferencia",
      seminar: "Seminario",
      workshop: "Workshop",
      event: "Evento",
      speaker: "Speaker",
      attendee: "Asistente",
      showTakeaways: "Ver aprendizajes clave",
      hideTakeaways: "Ocultar aprendizajes",
      keyTakeaways: "Aprendizajes clave:",
      eventsAttended: "Eventos asistidos",
      topicsExplored: "Temas explorados",
      insights: "Aprendizajes clave",
      cta: "Siempre buscando nuevas oportunidades de aprendizaje y networking",
      linkedin: "Conecta en LinkedIn",
    },
    en: {
      intro: "Participation in conferences, seminars and technical events. Continuous learning about software development, tech industry and best practices.",
      conference: "Conference",
      seminar: "Seminar",
      workshop: "Workshop",
      event: "Event",
      speaker: "Speaker",
      attendee: "Attendee",
      showTakeaways: "Show key takeaways",
      hideTakeaways: "Hide key takeaways",
      keyTakeaways: "Key takeaways:",
      eventsAttended: "Events attended",
      topicsExplored: "Topics explored",
      insights: "Key insights",
      cta: "Always looking for new learning and networking opportunities",
      linkedin: "Connect on LinkedIn",
    },
    de: {
      intro: "Teilnahme an Konferenzen, Seminaren und technischen Events. Kontinuierliches Lernen zu Entwicklung, Tech-Industrie und Best Practices.",
      conference: "Konferenz",
      seminar: "Seminar",
      workshop: "Workshop",
      event: "Event",
      speaker: "Speaker",
      attendee: "Teilnehmer",
      showTakeaways: "Wichtige Learnings anzeigen",
      hideTakeaways: "Wichtige Learnings verbergen",
      keyTakeaways: "Wichtige Learnings:",
      eventsAttended: "Besuchte Events",
      topicsExplored: "Erforschte Themen",
      insights: "Wichtige Learnings",
      cta: "Immer auf der Suche nach neuen Lern- und Networking-Moeglichkeiten",
      linkedin: "Auf LinkedIn vernetzen",
    },
  } as const;

  const copy = ui[lang];

  const talksByLang = {
    es: [
      {
        id: "1",
        title: "Seminario Nacional de Ingenieria de Software",
        event: "Industria de Desarrollo del Software en Colombia",
        type: "conference",
        description: "Seminario nacional sobre tendencias, metodologias y futuro del desarrollo de software en Colombia.",
        location: "Colombia",
        date: "2022",
        topics: ["Industria", "Ingenieria", "Tendencias"],
        role: "attendee",
        keyTakeaways: [
          "Panorama actual de la industria colombiana",
          "Buenas practicas para equipos de desarrollo",
          "Oportunidades del mercado tech nacional",
        ],
      },
      {
        id: "2",
        title: "Seminario Privado de Desarrollo",
        event: "Estudio de Grupos: Cali - Bogota",
        type: "seminar",
        description: "Evento enfocado en colaboracion tecnica entre equipos distribuidos y dinamicas de trabajo compartido.",
        location: "Cali - Bogota, Colombia",
        date: "2024",
        topics: ["Colaboracion", "Investigacion", "Equipos"],
        role: "attendee",
        organizer: "Grupo de Estudios Cali-Bogota",
        keyTakeaways: [
          "Estrategias para colaboracion entre ciudades",
          "Comunicacion efectiva en equipos distribuidos",
          "Herramientas para trabajo remoto",
        ],
      },
      {
        id: "3",
        title: "Desarrollo Frontend y Ciberseguridad",
        event: "Conferencia Tecnica Especializada",
        type: "event",
        description: "Conferencia sobre seguridad web en aplicaciones modernas React y Next.js.",
        location: "Colombia",
        date: "2025",
        topics: ["Frontend", "Ciberseguridad", "XSS", "CSP"],
        role: "attendee",
        keyTakeaways: [
          "Vulnerabilidades comunes en apps web",
          "Buenas practicas de hardening frontend",
          "Autenticacion segura y manejo de tokens",
        ],
      },
    ],
    en: [
      {
        id: "1",
        title: "National Software Engineering Seminar",
        event: "Software Development Industry in Colombia",
        type: "conference",
        description: "National seminar on trends, methodologies and the future of software development in Colombia.",
        location: "Colombia",
        date: "2022",
        topics: ["Industry", "Engineering", "Trends"],
        role: "attendee",
        keyTakeaways: [
          "Current panorama of the Colombian software industry",
          "Best practices for software teams",
          "Opportunities in the national tech market",
        ],
      },
      {
        id: "2",
        title: "Private Development Seminar",
        event: "Group Study: Cali - Bogota",
        type: "seminar",
        description: "Event focused on technical collaboration between distributed teams and shared work dynamics.",
        location: "Cali - Bogota, Colombia",
        date: "2024",
        topics: ["Collaboration", "Research", "Teams"],
        role: "attendee",
        organizer: "Cali-Bogota Study Group",
        keyTakeaways: [
          "Strategies for cross-city collaboration",
          "Effective communication in distributed teams",
          "Remote work toolchains and practices",
        ],
      },
      {
        id: "3",
        title: "Frontend Development and Cybersecurity",
        event: "Specialized Technical Conference",
        type: "event",
        description: "Conference on web security for modern React and Next.js applications.",
        location: "Colombia",
        date: "2025",
        topics: ["Frontend", "Cybersecurity", "XSS", "CSP"],
        role: "attendee",
        keyTakeaways: [
          "Common vulnerabilities in web apps",
          "Frontend hardening best practices",
          "Secure auth and token handling",
        ],
      },
    ],
    de: [
      {
        id: "1",
        title: "Nationales Seminar fuer Software Engineering",
        event: "Softwareentwicklungsbranche in Kolumbien",
        type: "conference",
        description: "Nationales Seminar zu Trends, Methodologien und Zukunft der Softwareentwicklung in Kolumbien.",
        location: "Kolumbien",
        date: "2022",
        topics: ["Industrie", "Engineering", "Trends"],
        role: "attendee",
        keyTakeaways: [
          "Aktueller Stand der kolumbianischen Softwarebranche",
          "Best Practices fuer Entwicklungsteams",
          "Chancen im nationalen Tech-Markt",
        ],
      },
      {
        id: "2",
        title: "Privates Entwicklungsseminar",
        event: "Gruppenstudie: Cali - Bogota",
        type: "seminar",
        description: "Event mit Fokus auf technische Zusammenarbeit in verteilten Teams.",
        location: "Cali - Bogota, Kolumbien",
        date: "2024",
        topics: ["Zusammenarbeit", "Forschung", "Teams"],
        role: "attendee",
        organizer: "Studiengruppe Cali-Bogota",
        keyTakeaways: [
          "Strategien fuer Zusammenarbeit zwischen Staedten",
          "Effektive Kommunikation in verteilten Teams",
          "Tools und Praktiken fuer Remote-Arbeit",
        ],
      },
      {
        id: "3",
        title: "Frontend-Entwicklung und Cybersicherheit",
        event: "Spezialisierte technische Konferenz",
        type: "event",
        description: "Konferenz zu Websicherheit in modernen React- und Next.js-Apps.",
        location: "Kolumbien",
        date: "2025",
        topics: ["Frontend", "Cybersicherheit", "XSS", "CSP"],
        role: "attendee",
        keyTakeaways: [
          "Hauefige Schwachstellen in Webanwendungen",
          "Best Practices fuer Frontend-Hardening",
          "Sichere Authentifizierung und Token-Handling",
        ],
      },
    ],
  } as const;

  const talks: Talk[] = talksByLang[lang] as unknown as Talk[];

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
        return copy.conference;
      case "seminar":
        return copy.seminar;
      case "workshop":
        return copy.workshop;
      default:
        return copy.event;
    }
  };

  const getRoleBadge = (role: string) => {
    if (role === "speaker") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold border border-purple-500/30">
          <Mic size={12} />
          {copy.speaker}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/30">
        <Award size={12} />
        {copy.attendee}
      </span>
    );
  };

  return (
    <Section id="talks" title={t("talks_title")} subtitle={t("talks_subtitle")}>
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">{copy.intro}</p>
        </div>

        <div className="space-y-6">
          {talks.map((talk, index) => {
            const isExpanded = expandedId === talk.id;

            return (
              <div key={talk.id} className="group relative">
                {index !== talks.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 to-purple-500/50 -z-10" />
                )}

                <div className="flex gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                      {getTypeIcon(talk.type)}
                    </div>
                  </div>

                  <div className="flex-1 pb-8">
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
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

                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">{talk.event}</p>
                        </div>
                      </div>

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

                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{talk.description}</p>

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

                      {talk.keyTakeaways && talk.keyTakeaways.length > 0 && (
                        <>
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : talk.id)}
                            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-3"
                          >
                            {isExpanded ? `${copy.hideTakeaways} ?` : `${copy.showTakeaways} ?`}
                          </button>

                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <Award size={16} className="text-blue-500" />
                                {copy.keyTakeaways}
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

                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        style={{
                          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(147, 51, 234, 0.03) 100%)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{talks.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{copy.eventsAttended}</div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {talks.reduce((acc, talk) => acc + (talk.topics?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{copy.topicsExplored}</div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                {talks.reduce((acc, talk) => acc + (talk.keyTakeaways?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{copy.insights}</div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{copy.cta}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://www.linkedin.com/in/davhumpf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
            >
              {copy.linkedin}
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
