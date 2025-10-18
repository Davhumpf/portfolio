"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLang, useT } from "@/context/LanguageProvider";
import LangMenu from "./LangMenu";
import ThemeMenu from "./ThemeMenu";

type NavItem = { id: "about" | "projects" | "skills" | "contacts"; label: string; href: string };

export default function Header() {
  const t = useT();
  const { lang } = useLang();

  const root = useRef<HTMLDivElement | null>(null);
  const navWrapRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const brandRef = useRef<HTMLSpanElement | null>(null);
  const caretRef = useRef<HTMLSpanElement | null>(null);

  const [active, setActive] = useState<NavItem["id"]>("about");

  const navItems: NavItem[] = useMemo(
    () => [
      { id: "about", label: t("about"), href: "#about" },
      { id: "projects", label: t("projects"), href: "#projects" },
      { id: "skills", label: t("skills"), href: "#skills" },
      { id: "contacts", label: t("contacts"), href: "#contacts" },
    ],
    [t]
  );

  const setItemRef = (id: NavItem["id"]) => (el: HTMLAnchorElement | null) => {
    itemRefs.current[id] = el;
  };

  /* ---------------- Entrada + glass ---------------- */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".nav-anim", { y: -10, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.06 });
      const glass = root.current!.querySelector(".glass");
      if (glass) {
        gsap.to(glass, {
          backdropFilter: "blur(20px)",
          boxShadow: "0 10px 28px 0 color-mix(in oklab, black 45%, transparent)",
          scrollTrigger: { trigger: document.documentElement, start: "top top", end: "250 top", scrub: true },
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);
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
      const n = brandRef.current;
      if (n) n.textContent = s;
    };

    const phrases = phrasesByLang[lang] ?? phrasesByLang.es;
    setText(phrases[0]);
    const caret = caretRef.current;
    const blink = caret ? gsap.to(caret, { opacity: 0.15, duration: 0.6, yoyo: true, repeat: -1, ease: "none" }) : undefined;

    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return () => { blink?.kill(); };

    const speedType = 0.045, speedErase = 0.03, hold = 0.9;

    const shuffled = <T,>(arr: T[]) =>
      arr.map(v => [Math.random(), v] as const).sort((a,b)=>a[0]-b[0]).map(([,v])=>v);

    let tl: gsap.core.Timeline | null = null;

    function playRound() {
      const round = shuffled(phrases);
      const tline = gsap.timeline({
        repeat: 0, repeatDelay: 0.15, delay: 0.3,
        onComplete: () => { tline.kill(); playRound(); }
      });
      tl = tline;

      round.forEach((text) => {
        tline.add(() => { setText(""); });
        for (let i = 1; i <= text.length; i++) {
          tline.add(() => { setText(text.slice(0, i)); }, `+=${speedType}`);
        }
        tline.to({}, { duration: hold });
        for (let i = text.length - 1; i >= 0; i--) {
          tline.add(() => { setText(text.slice(0, i)); }, `+=${speedErase}`);
        }
        tline.to({}, { duration: 0.2 });
      });
    }
    playRound();

    return () => { tl?.kill(); blink?.kill(); };
  }, [lang]);

  useEffect(() => {
    const sections = navItems.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id as NavItem["id"]); });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.2, 0.6] });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, [navItems]);
  function moveIndicator() {
    const ind = indicatorRef.current;
    const el = itemRefs.current[active];
    if (!ind || !el) return;
    gsap.to(ind, { x: el.offsetLeft, width: el.offsetWidth, height: el.offsetHeight, duration: 0.25, ease: "power3.out" });
  }
  useEffect(() => {
    moveIndicator();
    const on = () => moveIndicator();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [active, navItems]);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, n: NavItem) => {
    e.preventDefault();
    document.querySelector(n.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(n.id);
  };

  return (
    <header
      ref={root}
      className="fixed top-4 left-1/2 z-[999] w-full max-w-6xl -translate-x-1/2 px-4"
    >
      <div className="glass px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Marca: pill visible SIEMPRE (sin depender de la clase .pill) */}
          <a
            href="#top"
            title="Top"
            className="nav-anim inline-flex items-center whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-semibold no-underline"
            style={{
              color: "var(--text)",
              background: "var(--panel-alpha)",
              border: "1px solid var(--ring)",
              minWidth: "240px",
            }}
          >
            <span ref={brandRef} className="tabular-nums">
              {"<Clean UI/>"}
            </span>
            <span
              ref={caretRef}
              className="ml-1 inline-block opacity-70 after:ml-[1px] after:inline-block after:content-['|']"
              aria-hidden
            />
          </a>

          {/* NAV con indicador */}
          <div className="relative nav-anim">
            <div
              ref={navWrapRef}
              className="relative flex items-center gap-2 rounded-2xl ring-1"
              style={{ borderColor: "var(--ring)" }}
            >
              <div
                ref={indicatorRef}
                className="absolute left-0 top-0 z-0 rounded-xl"
                style={{ background: "var(--panel-alpha)" }}
              />
              {navItems.map((n) => (
                <a
                  key={n.id}
                  ref={setItemRef(n.id)}
                  href={n.href}
                  onClick={(e) => onNavClick(e, n)}
                  className={`relative z-10 rounded-xl px-4 py-2 text-sm font-semibold no-underline transition
                    ${active === n.id ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
                >
                  {n.label}
                </a>
              ))}
            </div>
          </div>

          {/* Menús */}
          <div className="flex items-center gap-2 nav-anim">
            <LangMenu />
            <ThemeMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
