"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLang, useT } from "@/context/LanguageProvider";
import LangMenu from "./LangMenu";
import ThemeMenu from "./ThemeMenu";

type NavItem = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
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

  /* ---------------- Items ---------------- */
  const mainNavItems: NavItem[] = useMemo(
    () => [
      { id: "about", label: t("about"), href: "#about" },
      { id: "projects", label: t("projects"), href: "#projects" },
      { id: "skills", label: t("skills"), href: "#skills" },
      { id: "contacts", label: t("contacts"), href: "#contacts" },
    ],
    [t]
  );

  const secondaryNavItems: NavItem[] = useMemo(
    () => [
      { id: "timeline", label: t("experience") ?? "Experiencia", href: "#timeline", badge: "★" },
      { id: "cases", label: t("caseStudies") ?? "Casos", href: "#cases" },
      { id: "opensource", label: "Open Source", href: "#opensource" },
      { id: "blog", label: "Blog", href: "#blog" },
      { id: "playground", label: "Playground", href: "#playground", badge: "New" },
      { id: "talks", label: t("talks") ?? "Talks", href: "#talks" },
      { id: "uses", label: "Uses", href: "#uses" },
      { id: "now", label: "Now()", href: "#now" },
      { id: "cv", label: "CV", href: "/cv.pdf", external: true },
    ],
    [t]
  );

  const allNavItems = [...mainNavItems, ...secondaryNavItems];

  const setItemRef = (id: NavItem["id"]) => (el: HTMLAnchorElement | null) => {
    itemRefs.current[id] = el;
  };

  /* ---------------- Entrada + glass ---------------- */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!root.current) return;
    const ctx = gsap.context(() => {
      // Use transform3d for GPU acceleration and avoid conflicts with header positioning
      gsap.from(".nav-anim", {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        force3D: true,
      });
      const glass = root.current!.querySelector(".glass");
      if (glass) {
        gsap.to(glass, {
          backdropFilter: "blur(24px)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.12)",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "200 top",
            scrub: true,
          },
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  /* ---------------- Typewriter (recuperado) ---------------- */
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
      if (brandMobileRef.current) brandMobileRef.current.textContent = s;
    };

    const phrases = phrasesByLang[lang] ?? phrasesByLang.es;
    setText(phrases[0]);

    const caret = caretRef.current;
    const caretMobile = caretMobileRef.current;
    const blink = caret
      ? gsap.to(caret, {
          opacity: 0.2,
          duration: 0.6,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
        })
      : undefined;
    const blinkMobile = caretMobile
      ? gsap.to(caretMobile, {
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
      blinkMobile?.kill();
    };
  }, [lang]);

  /* ---------------- Active nav highlight ---------------- */
  useEffect(() => {
    const sections = allNavItems
      .filter((n) => n.href.startsWith("#"))
      .map((n) => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as NavItem["id"]);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.2, 0.6] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [allNavItems]);

  function moveIndicator() {
    const ind = indicatorRef.current;
    const el = itemRefs.current[active];
    const parent = navWrapRef.current;
    if (!ind || !el || !parent) return;

    // Get the padding of the parent container
    const parentStyle = window.getComputedStyle(parent);
    const paddingLeft = parseInt(parentStyle.paddingLeft) || 0;
    const paddingTop = parseInt(parentStyle.paddingTop) || 0;

    gsap.to(ind, {
      x: el.offsetLeft - paddingLeft,
      y: el.offsetTop - paddingTop,
      width: el.offsetWidth,
      height: el.offsetHeight,
      duration: 0.3,
      ease: "power2.out",
      force3D: true,
    });
  }

  useEffect(() => {
    moveIndicator();
    const on = () => moveIndicator();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [active, allNavItems]);

  /* ---------------- Autoclose burger ---------------- */
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
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [mobileMenuOpen]);

  /* ---------------- Nav click ---------------- */
  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, n: NavItem) => {
    if (n.external) return;
    e.preventDefault();
    document.querySelector(n.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(n.id);
    setMobileMenuOpen(false);
  };

  // More menu state
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement | null>(null);
  const moreBtnRef = useRef<HTMLButtonElement | null>(null);

  // Close more menu when clicking outside
  useEffect(() => {
    if (!moreMenuOpen) return;
    const onDoc = (e: MouseEvent | TouchEvent) => {
      if (
        !moreBtnRef.current?.contains(e.target as Node) &&
        !moreMenuRef.current?.contains(e.target as Node)
      ) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
    };
  }, [moreMenuOpen]);

  return (
    <header
      ref={root}
      className="fixed top-3 left-1/2 z-[999] w-full max-w-7xl -translate-x-1/2 px-3 sm:px-6"
      style={{ willChange: "transform" }}
    >
      <div className="glass rounded-2xl" style={{ willChange: "backdrop-filter, box-shadow" }}>
        {/* ============ DESKTOP LAYOUT ============ */}
        <div className="hidden lg:block">
          {/* Single Row: Brand + Main Nav + More + Controls */}
          <div className="flex items-center justify-between gap-4 px-5 py-3.5">
            {/* Brand con typewriter */}
            <a
              href="#top"
              title="Top"
              className="nav-anim group flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "var(--panel-alpha)",
                border: "1px solid var(--ring)",
                minWidth: "240px",
                width: "240px",
                willChange: "transform",
              }}
            >
              <div className="flex items-center gap-1 font-mono text-sm font-semibold overflow-hidden w-full">
                <span
                  ref={brandRef}
                  className="tabular-nums flex-shrink-0"
                  style={{ color: "var(--text)" }}
                >
                  {"<Clean UI/>"}
                </span>
                <span
                  ref={caretRef}
                  className="inline-block opacity-70 flex-shrink-0"
                  style={{ color: "var(--accent)" }}
                  aria-hidden
                >
                  |
                </span>
              </div>
            </a>

            {/* Main Navigation con indicador */}
            <div className="nav-anim flex-1 flex justify-center">
              <div
                ref={navWrapRef}
                className="relative inline-flex items-center gap-1 rounded-xl px-2 py-2"
                style={{
                  background: "var(--panel-alpha)",
                  border: "1px solid var(--ring)",
                }}
              >
                <div
                  ref={indicatorRef}
                  className="absolute z-0 rounded-lg"
                  style={{
                    background: "var(--accent)",
                    opacity: 0.15,
                    left: 0,
                    top: 0,
                    willChange: "transform, width, height",
                    transform: "translate3d(0, 0, 0)",
                  }}
                />
                {mainNavItems.map((n) => (
                  <a
                    key={n.id}
                    ref={setItemRef(n.id)}
                    href={n.href}
                    onClick={(e) => onNavClick(e, n)}
                    className={`relative z-10 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200
                      ${
                        active === n.id
                          ? "opacity-100"
                          : "opacity-60 hover:opacity-90"
                      }`}
                    style={{
                      color: active === n.id ? "var(--accent)" : "var(--text)",
                    }}
                  >
                    {n.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Controls: More + Lang + Theme */}
            <div className="nav-anim flex items-center gap-2">
              {/* More dropdown */}
              <div className="relative">
                <button
                  ref={moreBtnRef}
                  onClick={() => setMoreMenuOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: "var(--panel-alpha)",
                    border: "1px solid var(--ring)",
                    color: "var(--text)",
                  }}
                  aria-label="More options"
                  aria-expanded={moreMenuOpen}
                >
                  <span>More</span>
                  <svg
                    className={`h-4 w-4 transition-transform ${moreMenuOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M5.25 7.5L10 12.25L14.75 7.5" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </button>

                {/* More dropdown menu */}
                {moreMenuOpen && (
                  <div
                    ref={moreMenuRef}
                    className="absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl overflow-hidden"
                    style={{
                      background: "var(--panel)",
                      border: "1px solid var(--ring)",
                    }}
                  >
                    <div className="max-h-96 overflow-y-auto py-2">
                      {secondaryNavItems.map((n) => (
                        <a
                          key={n.id}
                          href={n.href}
                          onClick={(e) => {
                            onNavClick(e, n);
                            setMoreMenuOpen(false);
                          }}
                          target={n.external ? "_blank" : undefined}
                          rel={n.external ? "noopener noreferrer" : undefined}
                          className="flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-all hover:bg-[var(--panel-alpha)]"
                          style={{ color: "var(--text)" }}
                        >
                          <span>{n.label}</span>
                          <div className="flex items-center gap-1.5">
                            {n.badge && (
                              <span
                                className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                                style={{
                                  background: "var(--accent)",
                                  color: "var(--bg)",
                                }}
                              >
                                {n.badge}
                              </span>
                            )}
                            {n.external && (
                              <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <LangMenu />
              <ThemeMenu />
            </div>
          </div>
        </div>

        {/* ============ MOBILE LAYOUT ============ */}
        <div className="lg:hidden px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Brand móvil con typewriter */}
            <a
              href="#top"
              className="nav-anim flex-1 flex items-center gap-1 rounded-xl px-3 py-2.5 min-w-0"
              style={{
                background: "var(--panel-alpha)",
                border: "1px solid var(--ring)",
                willChange: "transform",
              }}
            >
              <div className="flex items-center gap-1 overflow-hidden w-full">
                <span
                  ref={brandMobileRef}
                  className="font-mono text-xs font-semibold tabular-nums flex-shrink-0"
                  style={{ color: "var(--text)" }}
                >
                  {"<Clean UI/>"}
                </span>
                <span
                  ref={caretMobileRef}
                  className="inline-block opacity-70 flex-shrink-0"
                  style={{ color: "var(--accent)" }}
                  aria-hidden
                >
                  |
                </span>
              </div>
            </a>

            {/* Controls compactos */}
            <div className="nav-anim flex items-center gap-2">
              <LangMenu />
              <ThemeMenu />
            </div>

            {/* Burger button */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-label="Menu"
              className="nav-anim p-2.5 rounded-xl transition-all duration-200 active:scale-95"
              style={{
                background: "var(--panel-alpha)",
                border: "1px solid var(--ring)",
              }}
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1">
                <span
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    mobileMenuOpen
                      ? "rotate-45 translate-y-1.5 w-full"
                      : "w-full"
                  }`}
                  style={{ background: "currentColor" }}
                />
                <span
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0 w-0" : "w-3/4"
                  }`}
                  style={{ background: "currentColor" }}
                />
                <span
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    mobileMenuOpen
                      ? "-rotate-45 -translate-y-1.5 w-full"
                      : "w-full"
                  }`}
                  style={{ background: "currentColor" }}
                />
              </div>
            </button>
          </div>

          {/* Menú móvil desplegable */}
          {mobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="mt-3 pt-3 space-y-3 border-t overflow-hidden"
              style={{ borderColor: "var(--ring)" }}
            >
              {/* Main navigation - Grid 2x2 */}
              <div className="grid grid-cols-2 gap-2">
                {mainNavItems.map((n) => (
                  <a
                    key={n.id}
                    href={n.href}
                    onClick={(e) => onNavClick(e, n)}
                    className={`block px-3 py-2.5 rounded-lg text-xs font-semibold text-center transition-all
                      ${active === n.id ? "ring-1" : "opacity-70"}`}
                    style={{
                      background:
                        active === n.id ? "var(--panel-alpha)" : "transparent",
                      borderColor: active === n.id ? "var(--ring)" : "transparent",
                      color: active === n.id ? "var(--accent)" : "var(--text)",
                    }}
                  >
                    {n.label}
                  </a>
                ))}
              </div>

              {/* Secondary navigation - Lista vertical compacta */}
              <div className="space-y-1">
                {secondaryNavItems.map((n) => (
                  <a
                    key={n.id}
                    href={n.href}
                    onClick={(e) => onNavClick(e, n)}
                    target={n.external ? "_blank" : undefined}
                    rel={n.external ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all opacity-70 active:opacity-100 hover:bg-[var(--panel-alpha)]"
                    style={{ color: "var(--text)" }}
                  >
                    <span>{n.label}</span>
                    <div className="flex items-center gap-1.5">
                      {n.badge && (
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                          style={{ background: "var(--accent)", color: "var(--bg)" }}
                        >
                          {n.badge}
                        </span>
                      )}
                      {n.external && (
                        <svg
                          className="w-3 h-3 opacity-50"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}