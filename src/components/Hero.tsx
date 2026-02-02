"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useLang, useT } from "@/context/LanguageProvider";

let hasPlayedIntro = false;

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
  const { lang } = useLang();
  const scope = useRef<HTMLDivElement | null>(null);
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [heroLine1, setHeroLine1] = useState("");
  const [heroLine2Prefix, setHeroLine2Prefix] = useState("");
  const [heroLine2Accent, setHeroLine2Accent] = useState("");
  const [heroNameLine, setHeroNameLine] = useState("");
  const [introComplete, setIntroComplete] = useState(false);
  const [consoleMode, setConsoleMode] = useState<"idle" | "guide" | "code">("idle");
  const [shouldPlayIntro, setShouldPlayIntro] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const introCancelRef = useRef<(() => void) | null>(null);

  const introTagline = t("hero_intro_welcome");
  const finalLine1 = t("hero_tagline_1");
  const finalLine2Prefix = `${t("hero_tagline_2")} `;
  const finalLine2Accent = `${t("hero_tagline_3")}.`;
  const introNameLine = t("hero_intro_alias_line1");
  const introNameLineAlt = t("hero_intro_alias_line2");
  const introNameFull = `${introNameLine} ${introNameLineAlt}`;
  const finalNameLine = t("hero_name");
  const guideSnippet = t("hero_intro_guide");
  const skipLabel = t("hero_intro_skip");

  const setFinalDisplay = () => {
    setHeroLine1(finalLine1);
    setHeroLine2Prefix(finalLine2Prefix);
    setHeroLine2Accent(finalLine2Accent);
    setHeroNameLine(finalNameLine);
  };

  const typeText = (
    text: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    speed: number,
    isCancelled: () => boolean,
    timers: number[]
  ) =>
    new Promise<void>((resolve) => {
      let index = 0;
      setter("");
      const id = window.setInterval(() => {
        if (isCancelled()) {
          window.clearInterval(id);
          resolve();
          return;
        }
        setter(text.slice(0, index + 1));
        index += 1;
        if (index >= text.length) {
          window.clearInterval(id);
          resolve();
        }
      }, speed);
      timers.push(id);
    });

  const deleteText = (
    text: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    speed: number,
    isCancelled: () => boolean,
    timers: number[]
  ) =>
    new Promise<void>((resolve) => {
      let index = text.length;
      const id = window.setInterval(() => {
        if (isCancelled()) {
          window.clearInterval(id);
          resolve();
          return;
        }
        setter(text.slice(0, index - 1));
        index -= 1;
        if (index <= 0) {
          window.clearInterval(id);
          setter("");
          resolve();
        }
      }, speed);
      timers.push(id);
    });

  const typeTextAppend = (
    base: string,
    text: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    speed: number,
    isCancelled: () => boolean,
    timers: number[]
  ) =>
    new Promise<void>((resolve) => {
      let index = 0;
      const id = window.setInterval(() => {
        if (isCancelled()) {
          window.clearInterval(id);
          resolve();
          return;
        }
        setter(`${base} ${text.slice(0, index + 1)}`);
        index += 1;
        if (index >= text.length) {
          window.clearInterval(id);
          resolve();
        }
      }, speed);
      timers.push(id);
    });

  useEffect(() => {
    if (consoleMode !== "code") return;
    if (prefersReducedMotion) {
      setDisplayedCode(CODE_SNIPPETS[0]);
      setIsTyping(false);
      return;
    }
    const snippet = CODE_SNIPPETS[currentSnippet];
    let currentIndex = 0;
    setDisplayedCode("");
    setIsTyping(true);
    let timeoutId: number | undefined;

    const typingInterval = window.setInterval(() => {
      if (currentIndex < snippet.length) {
        setDisplayedCode(snippet.slice(0, currentIndex + 1));
        currentIndex += 1;
      } else {
        window.clearInterval(typingInterval);
        setIsTyping(false);
        timeoutId = window.setTimeout(() => {
          setCurrentSnippet((prev) => (prev + 1) % CODE_SNIPPETS.length);
        }, 3000);
      }
    }, 50);

    return () => {
      window.clearInterval(typingInterval);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [currentSnippet, consoleMode, prefersReducedMotion]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPrefersReducedMotion(prefersReduced);
    const playIntro = !(prefersReduced || hasPlayedIntro);
    setShouldPlayIntro(playIntro);

    if (!playIntro) {
      hasPlayedIntro = true;
      setFinalDisplay();
      setIntroComplete(true);
      setConsoleMode("code");
    }
  }, []);

  useEffect(() => {
    if (!shouldPlayIntro || introComplete) {
      setFinalDisplay();
    }
  }, [finalLine1, finalLine2Accent, finalLine2Prefix, finalNameLine, introComplete, shouldPlayIntro]);

  useEffect(() => {
    if (!shouldPlayIntro || prefersReducedMotion) return;
    let cancelled = false;
    const timers: number[] = [];
    const isCancelled = () => cancelled;
    const pause = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => resolve(), ms);
        timers.push(id);
      });

    introCancelRef.current = () => {
      cancelled = true;
      timers.forEach((id) => {
        window.clearTimeout(id);
        window.clearInterval(id);
      });
    };

    const runIntro = async () => {
      setIntroComplete(false);
      setHeroLine1("");
      setHeroLine2Prefix("");
      setHeroLine2Accent("");
      setHeroNameLine("");
      setDisplayedCode("");
      setIsTyping(true);
      setConsoleMode("idle");
      await typeText(introTagline, setHeroLine1, 40, isCancelled, timers);
      await pause(450);
      await deleteText(introTagline, setHeroLine1, 30, isCancelled, timers);
      await typeText(finalLine1, setHeroLine1, 36, isCancelled, timers);
      await typeText(finalLine2Prefix, setHeroLine2Prefix, 36, isCancelled, timers);
      await typeText(finalLine2Accent, setHeroLine2Accent, 36, isCancelled, timers);
      await pause(250);
      await typeText(introNameLine, setHeroNameLine, 38, isCancelled, timers);
      await pause(250);
      await typeTextAppend(introNameLine, introNameLineAlt, setHeroNameLine, 38, isCancelled, timers);
      await pause(300);
      await deleteText(introNameFull, setHeroNameLine, 30, isCancelled, timers);
      await typeText(finalNameLine, setHeroNameLine, 36, isCancelled, timers);
      hasPlayedIntro = true;
      setIntroComplete(true);
    };

    runIntro();

    return () => {
      introCancelRef.current?.();
      introCancelRef.current = null;
    };
  }, [finalLine1, finalLine2Accent, finalLine2Prefix, finalNameLine, introNameLineAlt, introNameLine, prefersReducedMotion, shouldPlayIntro]);

  useEffect(() => {
    if (!introComplete || !shouldPlayIntro) return;
    setConsoleMode("guide");
  }, [introComplete, shouldPlayIntro]);

  useEffect(() => {
    if (consoleMode !== "guide") return;
    let cancelled = false;
    const timers: number[] = [];
    const isCancelled = () => cancelled;

    setDisplayedCode("");
    setIsTyping(true);

    const runGuide = async () => {
      await typeText(guideSnippet, setDisplayedCode, 28, isCancelled, timers);
      setIsTyping(false);
      const id = window.setTimeout(() => {
        setConsoleMode("code");
        setCurrentSnippet(0);
      }, 1200);
      timers.push(id);
    };

    runGuide();

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [consoleMode, guideSnippet]);

  useEffect(() => {
    if (!shouldPlayIntro || introComplete) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleSkipIntro();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [introComplete, shouldPlayIntro]);

  const handleSkipIntro = () => {
    introCancelRef.current?.();
    introCancelRef.current = null;
    hasPlayedIntro = true;
    setShouldPlayIntro(false);
    setIntroComplete(true);
    setFinalDisplay();
    setConsoleMode("code");
  };

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
  }, [lang]);

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  return (
    <section ref={scope} className="window-section hero-section">
      <div className="window-panel hero-panel relative overflow-hidden">
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
          {shouldPlayIntro && !introComplete && (
            <div className="ml-auto">
              <button
                type="button"
                onClick={handleSkipIntro}
                className="text-[11px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition"
                style={{ color: "var(--text-2)" }}
              >
                {skipLabel}
              </button>
            </div>
          )}
        </header>

        <div className="window-content hero-content">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(clamp(300px, 40vw, 600px) circle at 30% 40%, var(--accent)/15, transparent 70%)",
            }}
          />

          <div className="w-full flex flex-col gap-6 items-stretch">
            <div className="w-full">
              <h1 className="font-bold leading-tight" style={{ fontSize: "var(--hero-title-size, clamp(1.25rem, 5vw, 3rem))" }}>
                <span className="hero-text block muted" style={{ marginBottom: "clamp(0.25rem, 0.5vw, 0.5rem)" }}>
                  {heroLine1}
                </span>
                <span className="hero-text block" style={{ marginBottom: "clamp(0.5rem, 1vw, 0.75rem)" }}>
                  {heroLine2Prefix}
                  {heroLine2Accent && <span className="accent font-extrabold">{heroLine2Accent}</span>}
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

              <p className="hero-name font-medium" style={{ fontSize: "var(--hero-name-size, clamp(0.875rem, 2.5vw, 1.25rem))" }}>
                — <span className="accent">{heroNameLine}</span>
              </p>
            </div>

            <div className="code-container hero-terminal relative w-full">
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
                  style={{
                    fontSize: "var(--hero-code-size, clamp(9px, 1.3vw, 12px))",
                    minHeight: "var(--hero-terminal-height, clamp(80px, 15vw, 120px))",
                  }}
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
