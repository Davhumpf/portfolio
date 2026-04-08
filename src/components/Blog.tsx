"use client";
import React, { useState } from "react";
import Section from "./Section";
import { useLang, useT } from "@/context/LanguageProvider";
import { Calendar, Clock, Tag, ArrowRight, BookOpen } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content?: string;
}

export default function Blog() {
  const t = useT();
  const { lang } = useLang();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const ui = {
    es: {
      intro:
        "Documentando soluciones a problemas reales, mejores practicas y aprendizajes tecnicos con React, Next.js y TypeScript.",
      readWord: "lectura",
      readMore: "Leer mas",
      readLess: "Leer menos",
      footer: "Quieres mas contenido tecnico? Sigueme en GitHub para ver proyectos y codigo real.",
      followGithub: "Sigueme en GitHub",
      dateLocale: "es-ES",
    },
    en: {
      intro:
        "Documenting solutions to real problems, best practices and technical learnings with React, Next.js and TypeScript.",
      readWord: "read",
      readMore: "Read more",
      readLess: "Read less",
      footer: "Want more technical content? Follow me on GitHub to see projects and real code.",
      followGithub: "Follow me on GitHub",
      dateLocale: "en-US",
    },
    de: {
      intro:
        "Dokumentation von Loesungen fuer reale Probleme, Best Practices und technische Learnings mit React, Next.js und TypeScript.",
      readWord: "Lesezeit",
      readMore: "Mehr lesen",
      readLess: "Weniger lesen",
      footer: "Mehr technischer Content? Folge mir auf GitHub fuer Projekte und echten Code.",
      followGithub: "Folge mir auf GitHub",
      dateLocale: "de-DE",
    },
  } as const;

  const postsByLang = {
    es: [
      {
        id: "1",
        title: "Hidratacion en Next.js con next-themes",
        excerpt: "Como evitar mismatch servidor/cliente usando el patron mounted y placeholders seguros.",
        date: "2025-01-18",
        readTime: "5 min",
        tags: ["Next.js", "React", "Hydration"],
        content:
          "El error de hidratacion aparece cuando el servidor renderiza un valor y el cliente hidrata otro.\n\nLa solucion mas estable es usar un estado mounted, renderizar contenido neutro en SSR y mostrar el valor real cuando el componente monta en cliente.",
      },
      {
        id: "2",
        title: "GSAP sin romper el layout",
        excerpt: "Uso de scope con refs, limpieza con context.revert y animaciones accesibles.",
        date: "2025-01-15",
        readTime: "4 min",
        tags: ["GSAP", "React", "UI"],
        content:
          "GSAP es muy potente, pero requiere control de alcance.\n\nUsar gsap.context con un contenedor evita que una animacion afecte elementos fuera del componente y mejora el mantenimiento del codigo.",
      },
      {
        id: "3",
        title: "Sistema de temas sin flash",
        excerpt: "Dark/light mode estable con next-themes y estrategia para minimizar flash visual.",
        date: "2025-01-10",
        readTime: "6 min",
        tags: ["Themes", "Next.js", "UX"],
        content:
          "Un buen sistema de temas debe ser instantaneo y predecible.\n\nCombinando script temprano, suppressHydrationWarning y patron mounted se logra una transicion limpia entre server y client.",
      },
      {
        id: "4",
        title: "Mi stack frontend 2025",
        excerpt: "Por que uso Next.js, TypeScript, Tailwind y GSAP para interfaces de producto.",
        date: "2025-01-05",
        readTime: "7 min",
        tags: ["Stack", "Frontend", "TypeScript"],
        content:
          "El stack ideal equilibra velocidad de desarrollo, mantenimiento y rendimiento.\n\nNext.js + TypeScript + Tailwind + GSAP me permite construir interfaces solidas, con animacion intencional y buena experiencia de usuario.",
      },
    ],
    en: [
      {
        id: "1",
        title: "Next.js hydration with next-themes",
        excerpt: "How to prevent server/client mismatch using the mounted pattern and safe placeholders.",
        date: "2025-01-18",
        readTime: "5 min",
        tags: ["Next.js", "React", "Hydration"],
        content:
          "Hydration errors happen when the server renders one value and the client hydrates another.\n\nThe most stable fix is using a mounted state, rendering neutral SSR content and showing the real value once the component mounts on the client.",
      },
      {
        id: "2",
        title: "GSAP animations without layout breaks",
        excerpt: "Scoped refs, context cleanup and accessible animation practices.",
        date: "2025-01-15",
        readTime: "4 min",
        tags: ["GSAP", "React", "UI"],
        content:
          "GSAP is powerful, but it needs clear scope control.\n\nUsing gsap.context with a container prevents animations from leaking outside the component and keeps code maintainable.",
      },
      {
        id: "3",
        title: "No-flash theme system",
        excerpt: "Reliable dark/light mode with next-themes and a strategy to minimize visual flash.",
        date: "2025-01-10",
        readTime: "6 min",
        tags: ["Themes", "Next.js", "UX"],
        content:
          "A good theme system should be instant and predictable.\n\nCombining early theme script, suppressHydrationWarning and the mounted pattern gives a clean transition between server and client.",
      },
      {
        id: "4",
        title: "My frontend stack for 2025",
        excerpt: "Why I use Next.js, TypeScript, Tailwind and GSAP for product interfaces.",
        date: "2025-01-05",
        readTime: "7 min",
        tags: ["Stack", "Frontend", "TypeScript"],
        content:
          "An ideal stack balances development speed, maintainability and performance.\n\nNext.js + TypeScript + Tailwind + GSAP lets me build robust interfaces with intentional motion and strong user experience.",
      },
    ],
    de: [
      {
        id: "1",
        title: "Next.js Hydration mit next-themes",
        excerpt: "Wie man Server/Client-Mismatch mit Mounted-Pattern und sicheren Platzhaltern vermeidet.",
        date: "2025-01-18",
        readTime: "5 min",
        tags: ["Next.js", "React", "Hydration"],
        content:
          "Hydration-Fehler entstehen, wenn Server und Client unterschiedliche Werte rendern.\n\nDie stabilste Loesung ist ein Mounted-State: neutrales SSR-Rendering und echte Werte erst nach dem Mount im Client.",
      },
      {
        id: "2",
        title: "GSAP ohne Layout-Probleme",
        excerpt: "Scoped Refs, Cleanup mit context.revert und barrierearme Animation.",
        date: "2025-01-15",
        readTime: "4 min",
        tags: ["GSAP", "React", "UI"],
        content:
          "GSAP ist sehr stark, braucht aber klare Scope-Kontrolle.\n\nMit gsap.context und Container-Ref bleibt die Animation im vorgesehenen Bereich und der Code wartbar.",
      },
      {
        id: "3",
        title: "Theme-System ohne Flash",
        excerpt: "Zuverlaessiger Dark/Light Mode mit next-themes und weniger visuellem Flash.",
        date: "2025-01-10",
        readTime: "6 min",
        tags: ["Themes", "Next.js", "UX"],
        content:
          "Ein gutes Theme-System muss schnell und vorhersehbar sein.\n\nFruehes Theme-Script, suppressHydrationWarning und Mounted-Pattern sorgen fuer sauberen Wechsel zwischen Server und Client.",
      },
      {
        id: "4",
        title: "Mein Frontend-Stack 2025",
        excerpt: "Warum ich Next.js, TypeScript, Tailwind und GSAP fuer Produkt-Interfaces nutze.",
        date: "2025-01-05",
        readTime: "7 min",
        tags: ["Stack", "Frontend", "TypeScript"],
        content:
          "Ein guter Stack balanciert Entwicklungszeit, Wartbarkeit und Performance.\n\nNext.js + TypeScript + Tailwind + GSAP ermoeglicht robuste Interfaces mit sinnvoller Motion und starker User Experience.",
      },
    ],
  } as const;

  const copy = ui[lang];
  const posts: BlogPost[] = postsByLang[lang] as unknown as BlogPost[];

  const handleReadMore = (postId: string) => {
    setSelectedPost(selectedPost === postId ? null : postId);
  };

  return (
    <Section id="blog" title={t("blog_title")} subtitle={t("blog_subtitle")}>
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">{copy.intro}</p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => {
            const isExpanded = selectedPost === post.id;

            return (
              <article
                key={post.id}
                className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <time>
                          {new Date(post.date).toLocaleDateString(copy.dateLocale, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>
                          {post.readTime} {copy.readWord}
                        </span>
                      </div>
                    </div>
                  </div>

                  <BookOpen
                    size={24}
                    className="text-gray-300 dark:text-gray-700 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex-shrink-0"
                  />
                </div>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{post.excerpt}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>

                {isExpanded && post.content && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="space-y-3">
                      {post.content.split("\n\n").map((paragraph, idx) => (
                        <p key={idx} className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleReadMore(post.id)}
                  className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:gap-3 transition-all mt-4"
                >
                  {isExpanded ? copy.readLess : copy.readMore}
                  <ArrowRight size={16} className={`transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                </button>

                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)",
                  }}
                />
              </article>
            );
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{copy.footer}</p>
            <a
              href="https://github.com/Davhumpf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-all font-medium"
            >
              {copy.followGithub}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
