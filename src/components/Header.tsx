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
  const brandMobileRef = useRef<HTMLSpanElement | null>(null);
  const caretMobileRef = useRef<HTMLSpanElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState<NavItem["id"]>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    // En móvil nunca apagamos la animación. Si el usuario tiene "reducir movimiento",
    // la hacemos más lenta en lugar de desactivarla.
    const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

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
    e.preventDefault();
    document.querySelector(n.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(n.id);
    setMobileMenuOpen(false);
  };

  return (
    <header ref={root} className="fixed top-4 left-1/2 z-[999] w-full max-w-6xl -translate-x-1/2 px-4">
      <div className="glass px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Marca: Desktop */}
          <a
            href="#top"
            title="Top"
            className="nav-anim hidden lg:inline-flex items-center whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-semibold no-underline"
            style={{ color: "var(--text)", background: "var(--panel-alpha)", border: "1px solid var(--ring)", minWidth: "240px" }}
          >
            <span ref={brandRef} className="tabular-nums">{"<Clean UI/>"}</span>
            <span ref={caretRef} className="ml-1 inline-block opacity-70 after:ml-[1px] after:inline-block after:content-['|']" aria-hidden />
          </a>

          {/* Marca móvil (caret visible) */}
          <a
            href="#top"
            className="nav-anim lg:hidden flex-1 inline-flex items-center rounded-xl px-3 py-2 text-xs font-semibold no-underline
                       whitespace-nowrap min-w-0 overflow-visible"
            style={{ color: "var(--text)", background: "var(--panel-alpha)", border: "1px solid var(--ring)" }}
          >
            <span ref={brandMobileRef} className="tabular-nums overflow-visible">{"<Detalle Primero/>"}</span>
            <span ref={caretMobileRef} className="ml-1 inline-block opacity-70 after:ml-[1px] after:inline-block after:content-['|']" aria-hidden />
          </a>

          {/* NAV con indicador - Desktop */}
          <div className="relative nav-anim hidden lg:block">
            <div ref={navWrapRef} className="relative flex items-center gap-2 rounded-2xl ring-1" style={{ borderColor: "var(--ring)" }}>
              <div ref={indicatorRef} className="absolute left-0 top-0 z-0 rounded-xl" style={{ background: "var(--panel-alpha)" }} />
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

          {/* Menús - Desktop */}
          <div className="hidden lg:flex items-center gap-2 nav-anim">
            <LangMenu />
            <ThemeMenu />
          </div>

          {/* Burger con morph (compatible iOS) */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden nav-anim p-2 rounded-lg ring-1 transition focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <g style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
                 className={`transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-y-[1px] rotate-45" : ""}`}>
                <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
                      className={`transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
                <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
                      className={`transition-transform duration-300 ${mobileMenuOpen ? "rotate-90" : ""}`} />
                <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
                      className={`transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
              </g>
            </svg>
          </button>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden mt-4 pt-4 space-y-2 border-t"
            style={{ borderColor: "var(--ring)", overflow: "hidden" }}
          >
            {navItems.map((n) => (
              <a
                key={n.id}
                href={n.href}
                onClick={(e) => onNavClick(e, n)}
                className={`block px-4 py-2 rounded-lg text-sm font-semibold transition
                  ${active === n.id ? "opacity-100" : "opacity-70"}`}
                style={{ background: active === n.id ? "var(--panel-alpha)" : "transparent" }}
              >
                {n.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <div className="flex-1"><LangMenu /></div>
              <div className="flex-1"><ThemeMenu /></div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
