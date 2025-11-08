"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/context/LanguageProvider";

const CODE_SNIPPETS = [
  // JavaScript
  "const notas = [4.2, 3.8, 4.5, 5.0];\nconst promedio = notas.reduce((a, b) => a + b) / notas.length;\nconsole.log(`Promedio: ${promedio.toFixed(2)}`);",
  
  // TypeScript
  "interface Product {\n  id: number;\n  name: string;\n  price: number;\n}\nconst cart: Product[] = [];",
  
  // Python
  "def fibonacci(n):\n  if n <= 1: return n\n  return fibonacci(n-1) + fibonacci(n-2)\nprint(fibonacci(10))",
  
  // React
  "const [data, setData] = useState([]);\nuseEffect(() => {\n  fetch('/api/users').then(r => r.json()).then(setData);\n}, []);",
  
  // Array manipulation
  "const users = data.filter(u => u.active)\n  .map(u => ({ ...u, role: 'developer' }))\n  .sort((a, b) => a.name.localeCompare(b.name));",
  
  // Async/Await
  "async function loadData() {\n  try {\n    const res = await fetch('/api/data');\n    return await res.json();\n  } catch (err) {\n    console.error(err);\n  }\n}",
  
  // CSS/Tailwind
  "const styles = {\n  container: 'flex items-center justify-between',\n  button: 'px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600'\n};",
  
  // SQL
  "SELECT u.name, COUNT(o.id) as orders\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id\nHAVING orders > 5;",
];

export default function Hero() {
  const t = useT();
  const scope = useRef<HTMLDivElement | null>(null);
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Efecto de typing letra por letra
  useEffect(() => {
    const snippet = CODE_SNIPPETS[currentSnippet];
    let currentIndex = 0;
    setDisplayedCode("");
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (currentIndex < snippet.length) {
        setDisplayedCode(snippet.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        // Esperar 3 segundos antes de cambiar al siguiente snippet
        setTimeout(() => {
          setCurrentSnippet((prev) => (prev + 1) % CODE_SNIPPETS.length);
        }, 3000);
      }
    }, 50); // Velocidad de typing (50ms por caracter)

    return () => clearInterval(typingInterval);
  }, [currentSnippet]);

  // Animaciones GSAP iniciales
  useEffect(() => {
    if (!scope.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.from(".hero-text", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12
      })
      .from(".hero-line", {
        scaleX: 0,
        duration: 0.8
      }, "-=0.5")
      .from(".hero-name", {
        scale: 0.9,
        opacity: 0,
        duration: 0.6
      }, "-=0.4")
      .from(".code-container", {
        opacity: 0,
        x: 50,
        duration: 0.8
      }, "-=0.6");
    }, scope);
    
    return () => ctx.revert();
  }, [t]);

  return (
    <section ref={scope} className="w-full max-w-6xl mx-auto overflow-hidden" style={{
      marginTop: 'clamp(1.5rem, 4vw, 2rem)',
      paddingLeft: 'clamp(0.75rem, 2vw, 1rem)',
      paddingRight: 'clamp(0.75rem, 2vw, 1rem)',
    }}>
      <div className="w-full relative overflow-hidden"
           style={{
             background: "color-mix(in oklab, var(--panel) 90%, transparent)",
             border: "1px solid var(--border)",
             borderRadius: 'clamp(16px, 4vw, 24px)',
             padding: 'clamp(1rem, 3vw, 2rem)',
           }}>

        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 blur-3xl"
             style={{ background: "radial-gradient(clamp(300px, 40vw, 600px) circle at 30% 40%, var(--accent)/15, transparent 70%)" }} />

        <div className="w-full flex flex-col gap-6 items-stretch">
          {/* Contenido principal */}
          <div className="w-full">
            <h1 className="font-bold leading-tight" style={{
              fontSize: 'clamp(1.25rem, 5vw, 3rem)',
            }}>
              <span className="hero-text block muted" style={{
                marginBottom: 'clamp(0.25rem, 0.5vw, 0.5rem)',
              }}>
                {t("hero_tagline_1")}
              </span>
              <span className="hero-text block" style={{
                marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)',
              }}>
                {t("hero_tagline_2")} <span className="accent font-extrabold">{t("hero_tagline_3")}</span>.
              </span>
            </h1>

            <div className="hero-line rounded-full"
                 style={{
                   background: "var(--accent)",
                   height: 'clamp(1px, 0.15vw, 2px)',
                   width: 'clamp(3rem, 10vw, 5rem)',
                   marginBottom: 'clamp(0.5rem, 1vw, 1rem)',
                 }} />

            <p className="hero-name font-medium" style={{
              fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)',
            }}>
              — <span className="accent">{t("hero_name")}</span>
            </p>
          </div>

          {/* Terminal de código con typing effect */}
          <div className="code-container relative w-full">
            <div className="ring-[3px] w-full"
                 style={{
                   background: "color-mix(in oklab, var(--panel) 70%, transparent)",
                   borderColor: "var(--accent)",
                   boxShadow: `
                     0 0 0 1px var(--accent),
                     0 0 30px var(--accent)/30,
                     inset 0 0 20px var(--accent)/5
                   `,
                   borderRadius: 'clamp(12px, 3vw, 16px)',
                   padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                 }}>

              {/* Header del terminal */}
              <div className="flex items-center gap-2 border-b-2"
                   style={{
                     borderColor: "var(--accent)/40",
                     marginBottom: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                     paddingBottom: 'clamp(0.375rem, 1vw, 0.5rem)',
                   }}>
                <div className="flex gap-1 hide-xs">
                  <div className="rounded-full bg-red-500" style={{
                    width: 'clamp(6px, 1.5vw, 10px)',
                    height: 'clamp(6px, 1.5vw, 10px)',
                  }} />
                  <div className="rounded-full bg-yellow-500" style={{
                    width: 'clamp(6px, 1.5vw, 10px)',
                    height: 'clamp(6px, 1.5vw, 10px)',
                  }} />
                  <div className="rounded-full bg-green-500" style={{
                    width: 'clamp(6px, 1.5vw, 10px)',
                    height: 'clamp(6px, 1.5vw, 10px)',
                  }} />
                </div>
                <span className="font-mono font-semibold truncate" style={{
                  color: "var(--accent)",
                  fontSize: 'clamp(9px, 1.2vw, 11px)',
                }}>
                  ~/coding-live
                </span>
              </div>

              {/* Código con efecto typing */}
              <div className="font-mono leading-relaxed relative w-full overflow-hidden" style={{
                fontSize: 'clamp(9px, 1.3vw, 12px)',
                minHeight: 'clamp(80px, 15vw, 120px)',
              }}>
                <pre className="whitespace-pre-wrap break-words w-full" style={{ color: "var(--text)" }}>
                  {displayedCode}
                  {/* Cursor parpadeante */}
                  {isTyping && (
                    <span className="inline-block ml-0.5 align-middle animate-pulse"
                          style={{
                            background: "var(--accent)",
                            width: 'clamp(4px, 0.8vw, 6px)',
                            height: 'clamp(10px, 2vw, 14px)',
                          }} />
                  )}
                </pre>

                {/* Cursor en reposo cuando termina */}
                {!isTyping && (
                  <div style={{ marginTop: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}>
                    <span className="text-accent">{'>'}</span>
                    <span className="inline-block ml-1 animate-pulse"
                          style={{
                            background: "var(--accent)",
                            width: 'clamp(4px, 0.8vw, 6px)',
                            height: 'clamp(10px, 2vw, 14px)',
                          }} />
                  </div>
                )}
              </div>
            </div>

            {/* Efecto de brillo externo más fuerte */}
            <div className="absolute rounded-2xl opacity-40 blur-2xl pointer-events-none -z-10 hide-xs"
                 style={{
                   background: "var(--accent)",
                   inset: 'clamp(-0.5rem, -1vw, -0.25rem)',
                 }} />
          </div>
        </div>
      </div>
    </section>
  );
}