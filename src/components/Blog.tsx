"use client";
import React, { useState } from "react";
import Section from "./Section";
import { useT } from "@/context/LanguageProvider";
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
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const posts: BlogPost[] = [
    {
      id: "1",
      title: "Solucionando errores de hidratación en Next.js con next-themes",
      excerpt: "Cómo resolver el clásico error 'Hydration failed' al usar themes dinámicos en Next.js 15. Implementación del patrón mounted para evitar mismatch servidor/cliente.",
      date: "2025-01-18",
      readTime: "5 min",
      tags: ["Next.js", "React", "SSR", "Hydration"],
      content: `
El error de hidratación es uno de los problemas más comunes al trabajar con Next.js y temas dinámicos. El problema ocurre cuando el servidor renderiza un valor diferente al que el cliente intenta hidratar.

**El Problema:**
\`\`\`tsx
// ❌ Esto causa error de hidratación
const { theme } = useTheme();
return <div>{theme === 'dark' ? '🌙' : '☀️'}</div>;
\`\`\`

El servidor no conoce el theme del usuario, así que renderiza un valor por defecto. Cuando React se hidrata en el cliente, detecta que el DOM real es diferente al esperado.

**La Solución: Patrón Mounted**
\`\`\`tsx
// ✅ Solución correcta
const [mounted, setMounted] = useState(false);
const { theme } = useTheme();

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return <div>💻</div>; // Placeholder durante SSR
}

return <div>{theme === 'dark' ? '🌙' : '☀️'}</div>;
\`\`\`

**Clave del patrón:**
1. Estado \`mounted\` inicia en \`false\`
2. Solo cambia a \`true\` en el cliente (useEffect no corre en servidor)
3. Mostramos placeholder neutro hasta que monte
4. Una vez montado, renderizamos el valor real del theme

**Bonus: Para contenedores completos**
\`\`\`tsx
// Siempre renderiza el contenedor con ID para navegación
return (
  <Section id="mi-seccion">
    {!mounted ? (
      <SkeletonLoader />
    ) : (
      <ContenidoReal theme={theme} />
    )}
  </Section>
);
\`\`\`

Esto mantiene el elemento en el DOM para que la navegación funcione, pero evita el mismatch de contenido.
      `
    },
    {
      id: "2",
      title: "Animaciones GSAP que no rompen tu layout",
      excerpt: "Mejores prácticas para usar GSAP en React sin que las animaciones muevan elementos no deseados. Scope, clearProps y control de refs.",
      date: "2025-01-15",
      readTime: "4 min",
      tags: ["GSAP", "React", "Animations", "Performance"],
      content: `
GSAP es increíble para animaciones, pero puede causar efectos secundarios no deseados si no se usa correctamente en React.

**Problema común:**
\`\`\`tsx
// ❌ Esto anima TODO el sidebar
useEffect(() => {
  gsap.from('.sidebar', { x: -100 });
}, []);
\`\`\`

**Solución 1: Usar contexto (scope)**
\`\`\`tsx
// ✅ Solo anima dentro del ref
const sidebarRef = useRef(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.nav-item', { 
      opacity: 0, 
      x: -30,
      stagger: 0.1 
    });
  }, sidebarRef);

  return () => ctx.revert(); // Limpia al desmontar
}, []);

return <aside ref={sidebarRef}>...</aside>;
\`\`\`

**Solución 2: clearProps después de animar**
\`\`\`tsx
gsap.to(element, {
  opacity: 1,
  y: 0,
  duration: 0.8,
  clearProps: 'all' // Remueve estilos inline después
});
\`\`\`

**Solución 3: Refs específicos**
\`\`\`tsx
const navItemsRef = useRef<(HTMLElement | null)[]>([]);

// Anima solo los refs asignados
gsap.from(navItemsRef.current.filter(Boolean), {
  opacity: 0,
  x: -30
});
\`\`\`

**Bonus: Respeta preferencias de accesibilidad**
\`\`\`tsx
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  gsap.timeline().timeScale(10); // Acelera 10x
}
\`\`\`

Esto hace que las animaciones sean instantáneas para usuarios que prefieren menos movimiento.
      `
    },
    {
      id: "3",
      title: "Sistema de themes sin flash en Next.js",
      excerpt: "Implementación completa de dark/light mode usando next-themes. Cómo evitar el flash de tema incorrecto y mantener preferencias del usuario.",
      date: "2025-01-10",
      readTime: "6 min",
      tags: ["Next.js", "Themes", "UX", "CSS"],
      content: `
Un buen sistema de themes debe ser instantáneo, sin flash, y respetar las preferencias del usuario.

**Setup básico con next-themes**
\`\`\`bash
npm install next-themes
\`\`\`

**1. Configurar el Provider**
\`\`\`tsx
// app/layout.tsx
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
\`\`\`

**2. Script inline para evitar flash**
next-themes inyecta automáticamente un script que se ejecuta ANTES de que React cargue, leyendo la preferencia guardada.

**3. Componente de toggle seguro**
\`\`\`tsx
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      <button onClick={() => setTheme('light')}>☀️</button>
      <button onClick={() => setTheme('dark')}>🌙</button>
      <button onClick={() => setTheme('system')}>💻</button>
    </div>
  );
}
\`\`\`

**4. CSS Variables para transiciones suaves**
\`\`\`css
:root {
  --bg: white;
  --text: black;
}

[data-theme='dark'] {
  --bg: black;
  --text: white;
}

* {
  transition: background-color 0.3s ease, color 0.3s ease;
}
\`\`\`

**Por qué funciona:**
- El script inline corre antes de React
- Lee localStorage y aplica la clase inmediatamente
- suppressHydrationWarning en <html> permite esta diferencia
- El patrón mounted evita errores de hidratación

**Resultado:** Zero flash, instant theme, happy users.
      `
    },
    {
      id: "4",
      title: "Mi stack de desarrollo frontend 2025",
      excerpt: "React, Next.js, TypeScript, GSAP, Tailwind CSS. Por qué elegí estas tecnologías y cómo trabajan juntas para crear interfaces increíbles.",
      date: "2025-01-05",
      readTime: "7 min",
      tags: ["React", "Next.js", "TypeScript", "Stack"],
      content: `
Después de trabajar en múltiples proyectos, este es el stack que uso para crear interfaces profesionales y performantes.

**El Stack:**

**1. Next.js 15 (App Router)**
- SSR/SSG out of the box
- Routing basado en archivos
- API routes integrados
- Optimización automática de imágenes
- Excelente DX

**2. TypeScript**
- Type safety que previene bugs
- Autocompletado increíble
- Refactoring seguro
- Documentación viva en el código

**3. Tailwind CSS**
- Utility-first = velocidad de desarrollo
- No context switching (CSS en JSX)
- Purge automático = bundle pequeño
- Dark mode nativo
- Responsive fácil

**4. GSAP (GreenSock)**
- Animaciones fluidas a 60fps
- Timeline control preciso
- ScrollTrigger para parallax
- Mejor performance que CSS animations
- Browser compatibility excelente

**5. Lucide Icons**
- Tree-shakeable = solo importas lo que usas
- Consistente y profesional
- React-first
- Customizable

**Cómo trabajan juntos:**

\`\`\`tsx
// Componente típico en mi stack
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Sparkles } from 'lucide-react';

interface Props {
  title: string;
  description: string;
}

export function FeatureCard({ title, description }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div 
      ref={cardRef}
      className="p-6 rounded-2xl bg-white dark:bg-gray-900 
                 border border-gray-200 dark:border-gray-800
                 hover:shadow-xl transition-shadow"
    >
      <Sparkles className="w-6 h-6 text-blue-500 mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
\`\`\`

**Lo que NO uso (y por qué):**
- CSS-in-JS (styled-components) → Runtime overhead
- CSS Modules → Tailwind es más rápido
- Redux → Context + Zustand cuando se necesita
- Class components → Hooks son superiores

**Resultado:** Código limpio, performante, mantenible y escalable.
      `
    }
  ];

  const handleReadMore = (postId: string) => {
    setSelectedPost(selectedPost === postId ? null : postId);
  };

  return (
    <Section 
      id="blog" 
      title={t("blog_title") || "Notas Técnicas"} 
      subtitle={t("blog_subtitle") || "Aprendizajes y soluciones del día a día"}
    >
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        
        {/* Intro */}
        <div className="mb-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Documentando soluciones a problemas reales, mejores prácticas y aprendizajes técnicos. 
            Basado en experiencia trabajando con React, Next.js, TypeScript y animaciones.
          </p>
        </div>

        {/* Posts grid */}
        <div className="space-y-8">
          {posts.map((post) => {
            const isExpanded = selectedPost === post.id;
            
            return (
              <article
                key={post.id}
                className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <time>{new Date(post.date).toLocaleDateString('es-ES', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</time>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{post.readTime} lectura</span>
                      </div>
                    </div>
                  </div>
                  
                  <BookOpen 
                    size={24} 
                    className="text-gray-300 dark:text-gray-700 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex-shrink-0" 
                  />
                </div>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Tags */}
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

                {/* Expanded content */}
                {isExpanded && post.content && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      {post.content.split('\n').map((paragraph, idx) => {
                        // Handle code blocks
                        if (paragraph.trim().startsWith('```')) {
                          return null; // Skip code fence markers
                        }
                        
                        // Handle bold
                        if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                          return (
                            <h4 key={idx} className="text-lg font-bold mt-6 mb-3 text-gray-900 dark:text-white">
                              {paragraph.replace(/\*\*/g, '')}
                            </h4>
                          );
                        }
                        
                        // Handle code blocks content
                        if (paragraph.match(/^(const|function|import|export|return|\/\/|<|>|\{|\}|if|useEffect)/)) {
                          return (
                            <pre key={idx} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4">
                              <code className="text-sm text-gray-800 dark:text-gray-200 font-mono">
                                {paragraph}
                              </code>
                            </pre>
                          );
                        }
                        
                        // Regular paragraphs
                        if (paragraph.trim()) {
                          return (
                            <p key={idx} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                              {paragraph}
                            </p>
                          );
                        }
                        
                        return null;
                      })}
                    </div>
                  </div>
                )}

                {/* Read more button */}
                <button
                  onClick={() => handleReadMore(post.id)}
                  className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:gap-3 transition-all mt-4"
                >
                  {isExpanded ? 'Leer menos' : 'Leer más'}
                  <ArrowRight 
                    size={16} 
                    className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                  />
                </button>

                {/* Gradient effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
                  }}
                />
              </article>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              ¿Quieres más contenido técnico? Sígueme en GitHub para ver proyectos y código real.
            </p>
            <a
              href="https://github.com/Davhumpf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-all font-medium"
            >
              Sígueme en GitHub
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}