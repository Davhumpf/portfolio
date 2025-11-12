"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLang } from "@/context/LanguageProvider";

export default function BrandPopout() {
  const { lang } = useLang();
  const brandRef = useRef<HTMLSpanElement | null>(null);
  const caretRef = useRef<HTMLSpanElement | null>(null);
  const popoutRef = useRef<HTMLAnchorElement | null>(null);

  /* ---------------- Typewriter Animation (same as before) ---------------- */
  const phrasesByLang: Record<string, string[]> = {
    es: [
      "<Interfaz Limpia/>",
      "<Detalle Primero/>",
      "render(ideas → interfaz)",
      "useMotion(GSAP)",
      "design && code && coffee()",
      "console.log('hola 👋')",
    ],
    en: [
      "<Clean UI/>",
      "<Detail First/>",
      "render(ideas → interface)",
      "useMotion(GSAP)",
      "design && code && coffee()",
      "console.log('hello 👋')",
    ],
    de: [
      "<Klare UI/>",
      "<Detail zuerst/>",
      "render(Ideen → Oberfläche)",
      "useMotion(GSAP)",
      "design && code && kaffee()",
      "console.log('hallo 👋')",
    ],
  };

  useEffect(() => {
    const setText = (s: string) => {
      if (brandRef.current) brandRef.current.textContent = s;
    };

    const phrases = phrasesByLang[lang] ?? phrasesByLang.es;
    setText(phrases[0]);

    const caret = caretRef.current;
    const blink = caret
      ? gsap.to(caret, {
          opacity: 0.2,
          duration: 0.6,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
        })
      : undefined;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const speedType = reduceMotion ? 0.09 : 0.045;
    const speedErase = reduceMotion ? 0.06 : 0.03;
    const hold = reduceMotion ? 0.7 : 1.2;

    const shuffled = <T,>(arr: T[]) =>
      arr
        .map((v) => [Math.random(), v] as const)
        .sort((a, b) => a[0] - b[0])
        .map(([, v]) => v);

    let tl: gsap.core.Timeline | null = null;

    function playRound() {
      const round = shuffled(phrases);
      const tline = gsap.timeline({
        repeat: 0,
        repeatDelay: 0.3,
        delay: 0.5,
        onComplete: () => {
          tline.kill();
          playRound();
        },
      });
      tl = tline;

      round.forEach((text) => {
        tline.add(() => {
          setText("");
        });
        for (let i = 1; i <= text.length; i++)
          tline.add(() => {
            setText(text.slice(0, i));
          }, `+=${speedType}`);
        tline.to({}, { duration: hold });
        for (let i = text.length - 1; i >= 0; i--)
          tline.add(() => {
            setText(text.slice(0, i));
          }, `+=${speedErase}`);
        tline.to({}, { duration: 0.3 });
      });
    }
    playRound();

    return () => {
      tl?.kill();
      blink?.kill();
    };
  }, [lang]);

  /* ---------------- Entry Animation ---------------- */
  useEffect(() => {
    if (!popoutRef.current) return;
    gsap.from(popoutRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      delay: 0.3,
      ease: "back.out(1.7)",
    });
  }, []);

  /* ---------------- Scroll to Top ---------------- */
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a
      ref={popoutRef}
      href="#top"
      onClick={scrollToTop}
      className="hidden lg:flex fixed bottom-6 right-6 z-[50] items-center gap-2 rounded-2xl px-6 py-4 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
      style={{
        background: "var(--panel)",
        border: "2px solid var(--ring)",
        backdropFilter: "blur(24px)",
        minWidth: "280px",
      }}
      title="Scroll to top"
    >
      <div className="flex items-center gap-2 font-mono text-sm font-semibold overflow-hidden flex-1">
        <span
          ref={brandRef}
          className="tabular-nums"
          style={{ color: "var(--text)" }}
        >
          {"<Clean UI/>"}
        </span>
        <span
          ref={caretRef}
          className="inline-block opacity-70"
          style={{ color: "var(--accent)" }}
          aria-hidden
        >
          |
        </span>
      </div>

      {/* Arrow icon */}
      <svg
        className="w-5 h-5 transition-transform group-hover:-translate-y-1"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        style={{ color: "var(--accent)" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </a>
  );
}
