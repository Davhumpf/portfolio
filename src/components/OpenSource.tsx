"use client";
import React from "react";
import Section from "./Section";
import { useLang, useT } from "@/context/LanguageProvider";
import { ExternalLink, Github, Star, GitFork, Code2 } from "lucide-react";

interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  url: string;
  stars?: number;
  forks?: number;
  topics?: string[];
}

export default function OpenSource() {
  const t = useT();
  const { lang } = useLang();

  const ui = {
    es: {
      header: "Algunos de mis proyectos publicos en GitHub",
      viewProfile: "Ver perfil completo",
      footerStart: "Estos son algunos de mis proyectos publicos. Visita mi",
      footerLink: "perfil de GitHub",
      footerEnd: "para ver el listado completo de repositorios y contribuciones.",
    },
    en: {
      header: "Some of my public projects on GitHub",
      viewProfile: "View full profile",
      footerStart: "These are some of my public projects. Visit my",
      footerLink: "GitHub profile",
      footerEnd: "to see the full list of repositories and contributions.",
    },
    de: {
      header: "Einige meiner oeffentlichen GitHub-Projekte",
      viewProfile: "Vollstaendiges Profil ansehen",
      footerStart: "Das sind einige meiner oeffentlichen Projekte. Besuche mein",
      footerLink: "GitHub-Profil",
      footerEnd: "um die vollstaendige Liste meiner Repositories und Beitraege zu sehen.",
    },
  } as const;

  const copy = ui[lang];

  const featuredRepos: Repository[] = [
    {
      id: "1",
      name: "nova-store-page",
      description:
        lang === "de"
          ? "Moderner Online-Shop mit minimalistischem Design und fluessiger UX."
          : lang === "en"
          ? "Modern online store with minimalist design and smooth UX."
          : "Tienda online moderna con diseno minimalista y experiencia de usuario fluida.",
      language: "TypeScript",
      languageColor: "#3178c6",
      url: "https://github.com/Davhumpf/nova-store-page",
      topics: ["nextjs", "react", "ecommerce", "typescript"],
    },
    {
      id: "2",
      name: "portfolio",
      description:
        lang === "de"
          ? "Persoenliches Portfolio mit GSAP-Animationen und responsivem Design."
          : lang === "en"
          ? "Personal portfolio with GSAP animations and responsive design."
          : "Portfolio personal con animaciones GSAP y diseno responsivo.",
      language: "TypeScript",
      languageColor: "#3178c6",
      url: "https://github.com/Davhumpf/portfolio",
      topics: ["portfolio", "gsap", "nextjs", "animations"],
    },
    {
      id: "3",
      name: "ProgreS.O.S.",
      description:
        lang === "de"
          ? "Automatisierungs- und Verwaltungssystem mit Python."
          : lang === "en"
          ? "Automation and management system built with Python."
          : "Sistema de gestion y automatizacion desarrollado con Python.",
      language: "Python",
      languageColor: "#3572A5",
      url: "https://github.com/dexango/ProgreS.O.S.",
      topics: ["python", "automation", "backend"],
    },
    {
      id: "4",
      name: "gluter",
      description:
        lang === "de"
          ? "Mobile App in Flutter/Dart mit nativen Funktionen."
          : lang === "en"
          ? "Mobile app in Flutter/Dart with native capabilities."
          : "Aplicacion movil en Flutter/Dart con funcionalidades nativas.",
      language: "Dart",
      languageColor: "#00B4AB",
      url: "https://github.com/Davhumpf/gluter",
      topics: ["flutter", "dart", "mobile"],
    },
    {
      id: "5",
      name: "map_flutter",
      description:
        lang === "de"
          ? "Interaktive Karten in Flutter mit Geolokalisierung."
          : lang === "en"
          ? "Interactive maps in Flutter with geolocation."
          : "Mapas interactivos en Flutter con geolocalizacion.",
      language: "Dart",
      languageColor: "#00B4AB",
      url: "https://github.com/Davhumpf/map_flutter",
      topics: ["flutter", "maps", "geolocation"],
    },
    {
      id: "6",
      name: "bd_java_new_task",
      description:
        lang === "de"
          ? "Task-Management-System mit Java und modularer Architektur."
          : lang === "en"
          ? "Task management system in Java with modular architecture."
          : "Sistema de gestion de tareas en Java con arquitectura modular.",
      language: "Java",
      languageColor: "#b07219",
      url: "https://github.com/Davhumpf/bd_java_new_task",
      topics: ["java", "database", "backend"],
    },
  ];

  return (
    <Section id="opensource" title={t("opensource_title")} subtitle={t("opensource_subtitle")}>
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{copy.header}</p>
          </div>
          <a
            href="https://github.com/Davhumpf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-all group"
          >
            <Github size={18} />
            <span className="text-sm font-medium">{copy.viewProfile}</span>
            <ExternalLink size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Code2 size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {repo.name}
                  </h3>
                </div>
                <ExternalLink size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{repo.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{repo.language}</span>
                </div>

                {(repo.stars || repo.forks) && (
                  <div className="flex items-center gap-3">
                    {repo.stars && (
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <Star size={12} />
                        <span className="text-xs">{repo.stars}</span>
                      </div>
                    )}
                    {repo.forks && (
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <GitFork size={12} />
                        <span className="text-xs">{repo.forks}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="text-xs px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
                }}
              />
            </a>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {copy.footerStart}{" "}
              <a
                href="https://github.com/Davhumpf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {copy.footerLink}
              </a>{" "}
              {copy.footerEnd}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
