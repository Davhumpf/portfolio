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
    <section ref={scope} className="mx-auto mt-24 max-w-6xl px-4">
      <div className="w-full relative overflow-hidden rounded-3xl p-6 md:p-8 ring-1 ring-white/5"
           style={{ background: "color-mix(in oklab, var(--panel) 90%, transparent)" }}>
        
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 blur-3xl"
             style={{ background: "radial-gradient(600px circle at 30% 40%, var(--accent)/15, transparent 70%)" }} />

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Contenido principal */}
          <div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="hero-text block muted mb-1">
                {t("hero_tagline_1")}
              </span>
              <span className="hero-text block mb-3">
                {t("hero_tagline_2")} <span className="accent font-extrabold">{t("hero_tagline_3")}</span>.
              </span>
            </h1>

            <div className="hero-line h-0.5 w-20 rounded-full mb-4" 
                 style={{ background: "var(--accent)" }} />

            <p className="hero-name text-lg md:text-xl font-medium">
              — <span className="accent">{t("hero_name")}</span>
            </p>
          </div>

          {/* Terminal de código con typing effect */}
          <div className="code-container relative">
            <div className="rounded-2xl p-3 ring-[3px]"
                 style={{ 
                   background: "color-mix(in oklab, var(--panel) 70%, transparent)",
                   borderColor: "var(--accent)",
                   boxShadow: `
                     0 0 0 1px var(--accent),
                     0 0 30px var(--accent)/30,
                     inset 0 0 20px var(--accent)/5
                   `
                 }}>
              
              {/* Header del terminal */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b-2"
                   style={{ borderColor: "var(--accent)/40" }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <span className="text-[11px] font-mono font-semibold" style={{ color: "var(--accent)" }}>
                  ~/coding-live
                </span>
              </div>

              {/* Código con efecto typing */}
              <div className="font-mono text-[12px] leading-relaxed min-h-[120px] relative">
                <pre className="whitespace-pre-wrap break-words" style={{ color: "var(--text)" }}>
                  {displayedCode}
                  {/* Cursor parpadeante */}
                  {isTyping && (
                    <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle animate-pulse"
                          style={{ background: "var(--accent)" }} />
                  )}
                </pre>
                
                {/* Cursor en reposo cuando termina */}
                {!isTyping && (
                  <div className="mt-1">
                    <span className="text-accent">{'>'}</span>
                    <span className="inline-block w-1.5 h-3.5 ml-1 animate-pulse"
                          style={{ background: "var(--accent)" }} />
                  </div>
                )}
              </div>
            </div>

            {/* Efecto de brillo externo más fuerte */}
            <div className="absolute -inset-2 rounded-2xl opacity-40 blur-2xl pointer-events-none -z-10"
                 style={{ background: "var(--accent)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}