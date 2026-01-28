"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/context/LanguageProvider";

const CODE_SNIPPETS = [
  "const notas = [4.2, 3.8, 4.5, 5.0];\nconst promedio = notas.reduce((a, b) => a + b) / notas.length;\nconsole.log(`Promedio: ${promedio.toFixed(2)}`);",
  "interface Product {\n  id: number;\n  name: string;\n  price: number;\n}\nconst cart: Product[] = [];",
  "def fibonacci(n):\n  if n <= 1: return n\n  return fibonacci(n-1) + fibonacci(n-2)\nprint(fibonacci(10))",
  "const [data, setData] = useState([]);\nuseEffect(() => {\n  fetch('/api/users').then(r => r.json()).then(setData);\n}, []);",
  "const users = data.filter(u => u.active)\n  .map(u => ({ ...u, role: 'developer' }))\n  .sort((a, b) => a.name.localeCompare(b.name));",
  "async function loadData() {\n  try {\n    const res = await fetch('/api/data');\n    return await res.json();\n  } catch (err) {\n    console.error(err);\n  }\n}",
  "const styles = {\n  container: 'flex items-center justify-between',\n  button: 'px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600'\n};",
  "SELECT u.name, COUNT(o.id) as orders\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id\nHAVING orders > 5;",
];

export default function Hero() {
  const t = useT();
  const scope = useRef<HTMLDivElement | null>(null);
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

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

        setTimeout(() => {
          setCurrentSnippet((prev) => (prev + 1) % CODE_SNIPPETS.length);
        }, 3000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentSnippet]);

  useEffect(() => {
    if (!scope.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-text", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
      })
        .from(
          ".hero-line",
          {
            scaleX: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".hero-name",
          {
            scale: 0.95,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.4"
        )
        .from(
          ".code-container",
          {
            opacity: 0,
            x: 40,
            duration: 0.7,
          },
          "-=0.5"
        );
    }, scope);

    return () => ctx.revert();
  }, [t]);

  return (
    <section ref={scope} className="window-section">
      <div className="window-panel relative overflow-hidden">
        <header className="window-bar">
          <div className="window-dots" aria-hidden>
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <div className="window-title">
            <span className="text-xs uppercase tracking-[0.2em] muted">{t("hero_hello")}</span>
            <span className="text-sm font-semibold">{t("hero_role")}</span>
          </div>
        </header>

        <div className="window-content">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(clamp(300px, 40vw, 600px) circle at 30% 40%, var(--accent)/15, transparent 70%)",
            }}
          />

          <div className="w-full flex flex-col gap-6 items-stretch">
            <div className="w-full">
              <h1 className="font-bold leading-tight" style={{ fontSize: "clamp(1.25rem, 5vw, 3rem)" }}>
                <span className="hero-text block muted" style={{ marginBottom: "clamp(0.25rem, 0.5vw, 0.5rem)" }}>
                  {t("hero_tagline_1")}
                </span>
                <span className="hero-text block" style={{ marginBottom: "clamp(0.5rem, 1vw, 0.75rem)" }}>
                  {t("hero_tagline_2")} <span className="accent font-extrabold">{t("hero_tagline_3")}</span>.
                </span>
              </h1>

              <div
                className="hero-line rounded-full"
                style={{
                  background: "var(--accent)",
                  height: "clamp(1px, 0.15vw, 2px)",
                  width: "clamp(3rem, 10vw, 5rem)",
                  marginBottom: "clamp(0.5rem, 1vw, 1rem)",
                }}
              />

              <p className="hero-name font-medium" style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.25rem)" }}>
                — <span className="accent">{t("hero_name")}</span>
              </p>
            </div>

            <div className="code-container relative w-full">
              <div
                className="ring-[2px] w-full"
                style={{
                  background: "color-mix(in oklab, var(--panel) 70%, transparent)",
                  borderColor: "var(--accent)",
                  boxShadow: "0 0 0 1px var(--accent), 0 0 22px var(--accent)/20",
                  borderRadius: "clamp(12px, 3vw, 16px)",
                  padding: "clamp(0.5rem, 1.5vw, 0.75rem)",
                }}
              >
                <div
                  className="flex items-center gap-2 border-b"
                  style={{
                    borderColor: "var(--accent)/30",
                    marginBottom: "clamp(0.5rem, 1.5vw, 0.75rem)",
                    paddingBottom: "clamp(0.375rem, 1vw, 0.5rem)",
                  }}
                >
                  <div className="flex gap-1 hide-xs">
                    <div className="rounded-full bg-red-400" style={{ width: "8px", height: "8px" }} />
                    <div className="rounded-full bg-yellow-400" style={{ width: "8px", height: "8px" }} />
                    <div className="rounded-full bg-green-400" style={{ width: "8px", height: "8px" }} />
                  </div>
                  <span
                    className="font-mono font-semibold truncate"
                    style={{ color: "var(--accent)", fontSize: "clamp(9px, 1.2vw, 11px)" }}
                  >
                    ~/coding-live
                  </span>
                </div>

                <div
                  className="font-mono leading-relaxed relative w-full overflow-hidden"
                  style={{ fontSize: "clamp(9px, 1.3vw, 12px)", minHeight: "clamp(80px, 15vw, 120px)" }}
                >
                  <pre className="whitespace-pre-wrap break-words w-full" style={{ color: "var(--text)" }}>
                    {displayedCode}
                    {isTyping && (
                      <span
                        className="inline-block ml-0.5 align-middle animate-pulse"
                        style={{ background: "var(--accent)", width: "6px", height: "12px" }}
                      />
                    )}
                  </pre>

                  {!isTyping && (
                    <div style={{ marginTop: "clamp(0.25rem, 0.5vw, 0.5rem)" }}>
                      <span className="text-accent">{">"}</span>
                      <span
                        className="inline-block ml-1 animate-pulse"
                        style={{ background: "var(--accent)", width: "6px", height: "12px" }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div
                className="absolute rounded-2xl opacity-30 blur-2xl pointer-events-none -z-10 hide-xs"
                style={{ background: "var(--accent)", inset: "clamp(-0.5rem, -1vw, -0.25rem)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
