"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLang, useT } from "@/context/LanguageProvider";
import LangMenu from "./LangMenu";
import ThemeMenu from "./ThemeMenu";

type NavItem = {
  id: string;                  // extensible para nuevas secciones
  label: string;
  href: string;                // "#id" o "https://…"
  external?: boolean;          // true -> target="_blank"
  badge?: string;              // "New", "★", "5", etc
};

export default function Header() {
  const t = useT();
  const { lang } = useLang();

  const root = useRef<HTMLDivElement | null>(null);
  const navWrapRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const brandRef = useRef<HTMLSpanElement | null>(null);
  const caretRef = useRef<HTMLSpanElement | null>(null);
  const brandMobileRef = useRef<HTMLSpanElement | null>(null);
  const caretMobileRef = useRef<HTMLSpanElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState<NavItem["id"]>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* ---------------- Items (main + nuevas secciones) ---------------- */
  const navItems: NavItem[] = useMemo(
    () => [
      // core
      { id: "about",     label: t("about"),     href: "#about" },
      { id: "projects",  label: t("projects"),  href: "#projects" },
      { id: "skills",    label: t("skills"),    href: "#skills" },
      { id: "contacts",  label: t("contacts"),  href: "#contacts" },

      // nuevas (puedes crear secciones con esos ids)
      { id: "timeline",    label: t("experience") ?? "Experiencia",       href: "#timeline",   badge: "★" },
      { id: "cases",       label: t("caseStudies") ?? "Casos de estudio",  href: "#cases" },
      { id: "opensource",  label: "Open Source",                           href: "#opensource" },
      { id: "blog",        label: "Blog",                                  href: "#blog" },
      { id: "playground",  label: "Playground",                            href: "#playground", badge: "New" },
      { id: "talks",       label: t("talks") ?? "Charlas & Workshops",     href: "#talks" },
      { id: "uses",        label: "Uses",                                  href: "#uses" },
      { id: "now",         label: "Now()",                                 href: "#now" },
      // externo (ej. PDF del CV)
      { id: "cv",          label: "CV / PDF",                              href: "/cv.pdf", external: true },
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

  /* ---------------- Typewriter (robusto en móvil) ---------------- */
  const phrasesByLang: Record<string, string[]> = {
    es: ["<Interfaz Limpia/>", "<Detalle Primero/>", "render(ideas → interfaz)", "useMotion(GSAP)", "design && code && coffee()", "console.log('hola 👋')"],
    en: ["<Clean UI/>", "<Detail First/>", "render(ideas → interface)", "useMotion(GSAP)", "design && code && coffee()", "console.log('hello 👋')"],
    de: ["<Klare UI/>", "<Detail zuerst/>", "render(Ideen → Oberfläche)", "useMotion(GSAP)", "design && code && kaffee()", "console.log('hallo 👋')"],
  };

  useEffect(() => {
    const setText = (s: string) => {
      if (brandRef.current) brandRef.current.textContent = s;
      if (brandMobileRef.current) brandMobileRef.current.textContent = s;
    };

    const phrases = phrasesByLang[lang] ?? phrasesByLang.es;
    setText(phrases[0]);

    const caret = caretRef.current;
    const caretMobile = caretMobileRef.current;
    const blink = caret ? gsap.to(caret, { opacity: 0.15, duration: 0.6, yoyo: true, repeat: -1, ease: "none" }) : undefined;
    const blinkMobile = caretMobile ? gsap.to(caretMobile, { opacity: 0.15, duration: 0.6, yoyo: true, repeat: -1, ease: "none" }) : undefined;

    const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const speedType = reduceMotion ? 0.09 : 0.045;
    const speedErase = reduceMotion ? 0.06 : 0.03;
    const hold = reduceMotion ? 0.7 : 0.9;

    const shuffled = <T,>(arr: T[]) => arr.map(v => [Math.random(), v] as const).sort((a,b)=>a[0]-b[0]).map(([,v])=>v);

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
        for (let i = 1; i <= text.length; i++) tline.add(() => { setText(text.slice(0, i)); }, `+=${speedType}`);
        tline.to({}, { duration: hold });
        for (let i = text.length - 1; i >= 0; i--) tline.add(() => { setText(text.slice(0, i)); }, `+=${speedErase}`);
        tline.to({}, { duration: 0.2 });
      });
    }
    playRound();

    return () => { tl?.kill(); blink?.kill(); blinkMobile?.kill(); };
  }, [lang]);

  /* ---------------- Active nav highlight ---------------- */
  useEffect(() => {
    const sections = navItems
      .filter(n => n.href.startsWith("#"))
      .map(n => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];

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

  /* ---------------- Autoclose burger (scroll/touch/wheel) ---------------- */
  useEffect(() => {
    const close = () => setMobileMenuOpen(false);
    const onScroll = () => mobileMenuOpen && close();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    window.addEventListener("wheel", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("wheel", onScroll);
    };
  }, [mobileMenuOpen]);

  /* ---------------- Menu open animation ---------------- */
  useEffect(() => {
    const el = mobileMenuRef.current;
    if (!el) return;
    if (mobileMenuOpen) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.28, ease: "power2.out" });
    }
  }, [mobileMenuOpen]);

  /* ---------------- Nav click ---------------- */
  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, n: NavItem) => {
    if (n.external) {
      // dejar comportamiento por defecto (nuevo tab)
      return;
    }
    e.preventDefault();
    document.querySelector(n.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(n.id);
    setMobileMenuOpen(false);
  };

  const renderItem = (n: NavItem) => (
    <a
      key={n.id}
      ref={setItemRef(n.id)}
      href={n.href}
      onClick={(e) => onNavClick(e, n)}
      target={n.external ? "_blank" : undefined}
      rel={n.external ? "noopener noreferrer" : undefined}
      className={`relative z-10 rounded-xl px-3 py-2 text-sm font-semibold no-underline transition
        ${active === n.id ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
    >
      <span>{n.label}</span>
      {n.badge && (
        <span
          className="ml-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold align-middle"
          style={{ background: "var(--panel-alpha)", border: "1px solid var(--ring)" }}
        >
          {n.badge}
        </span>
      )}
    </a>
  );

  return (
    <header ref={root} className="fixed top-4 left-1/2 z-[999] w-full max-w-7xl -translate-x-1/2 px-4">
      <div className="glass px-4 py-3">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-6 lg:items-center">
          {/* Marca */}
          <a
            href="#top"
            title="Top"
            className="nav-anim inline-flex items-center whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold no-underline"
            style={{ color: "var(--text)", background: "var(--panel-alpha)", border: "1px solid var(--ring)", minWidth: "220px" }}
          >
            <span ref={brandRef} className="tabular-nums">{"<Clean UI/>"}</span>
            <span ref={caretRef} className="ml-1 inline-block opacity-70 after:ml-[1px] after:inline-block after:content-['|']" aria-hidden />
          </a>

          {/* NAV con indicador - centrado */}
          <div className="relative nav-anim flex justify-center">
            <div ref={navWrapRef} className="relative inline-flex items-center gap-1 rounded-2xl ring-1 px-1 py-1" style={{ borderColor: "var(--ring)" }}>
              <div ref={indicatorRef} className="absolute left-0 top-0 z-0 rounded-xl" style={{ background: "var(--panel-alpha)" }} />
              {navItems.slice(0, 4).map(renderItem)}
            </div>
          </div>

          {/* Menús derecha */}
          <div className="flex items-center gap-2 nav-anim">
            <LangMenu />
            <ThemeMenu />
          </div>
        </div>

        {/* Segunda fila Desktop - items adicionales */}
        <div className="hidden lg:flex mt-3 pt-3 border-t justify-center" style={{ borderColor: "var(--ring)" }}>
          <div className="nav-anim flex flex-wrap items-center justify-center gap-2">
            {navItems.slice(4).map((n) => (
              <a
                key={n.id}
                href={n.href}
                onClick={(e) => onNavClick(e, n)}
                target={n.external ? "_blank" : undefined}
                rel={n.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium no-underline transition opacity-70 hover:opacity-100"
                style={{ background: "var(--panel-alpha)", border: "1px solid var(--ring)" }}
              >
                <span>{n.label}</span>
                {n.badge && (
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                    style={{ background: "var(--ring)", opacity: 0.8 }}
                  >
                    {n.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex items-center justify-between gap-3">
          {/* Marca móvil */}
          <a
            href="#top"
            className="nav-anim flex-1 inline-flex items-center rounded-xl px-3 py-2 text-xs font-semibold no-underline whitespace-nowrap min-w-0"
            style={{ color: "var(--text)", background: "var(--panel-alpha)", border: "1px solid var(--ring)" }}
          >
            <span ref={brandMobileRef} className="tabular-nums truncate">{"<Clean UI/>"}</span>
            <span ref={caretMobileRef} className="ml-1 inline-block opacity-70 after:ml-[1px] after:inline-block after:content-['|']" aria-hidden />
          </a>

          {/* Burger */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-expanded={mobileMenuOpen}
            aria-label="Menu"
            className="nav-anim p-2.5 rounded-lg ring-1 transition focus:outline-none focus:ring-2"
            style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <g style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
                 className={`transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-y-[1px] rotate-45" : ""}`}>
                <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      className={`transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
                <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      className={`transition-transform duration-300 ${mobileMenuOpen ? "rotate-90" : ""}`} />
                <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      className={`transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
              </g>
            </svg>
          </button>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden mt-3 pt-3 border-t"
            style={{ borderColor: "var(--ring)", overflow: "hidden" }}
          >
            <div className="grid grid-cols-2 gap-2 mb-3">
              {navItems.slice(0, 4).map((n) => (
                <a
                  key={n.id}
                  href={n.href}
                  onClick={(e) => onNavClick(e, n)}
                  className={`block px-3 py-2 rounded-lg text-xs font-semibold text-center transition
                    ${active === n.id ? "opacity-100 ring-1" : "opacity-70"}`}
                  style={{ 
                    background: active === n.id ? "var(--panel-alpha)" : "transparent",
                    borderColor: active === n.id ? "var(--ring)" : "transparent"
                  }}
                >
                  {n.label}
                </a>
              ))}
            </div>
            <div className="space-y-1.5 mb-3">
              {navItems.slice(4).map((n) => (
                <a
                  key={n.id}
                  href={n.href}
                  onClick={(e) => onNavClick(e, n)}
                  target={n.external ? "_blank" : undefined}
                  rel={n.external ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition opacity-70 hover:opacity-100"
                  style={{ background: "var(--panel-alpha)" }}
                >
                  <span>{n.label}</span>
                  {n.badge && <span className="text-[9px] opacity-60">({n.badge})</span>}
                </a>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t" style={{ borderColor: "var(--ring)" }}>
              <LangMenu />
              <ThemeMenu />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}