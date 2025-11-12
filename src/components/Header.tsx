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
      { id: "talks", label: t("talks") ?? "Talks", href: "#talks" },
      { id: "uses", label: "Uses", href: "#uses" },
      { id: "now", label: "Now()", href: "#now" },
      { id: "cv", label: "CV", href: "/cv.pdf", external: true },
    ],
    [t]
  );

  const allNavItems = [...mainNavItems, ...secondaryNavItems];

  /* ---------------- Entrada + glass (mobile only) ---------------- */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".nav-anim", {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
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
      if (brandMobileRef.current) brandMobileRef.current.textContent = s;
    };

    const phrases = phrasesByLang[lang] ?? phrasesByLang.es;
    setText(phrases[0]);

    const caretMobile = caretMobileRef.current;
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
      blinkMobile?.kill();
    };
  }, [lang]);

  /* ---------------- Active section tracking ---------------- */
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

  return (
    <header
      ref={root}
      className="lg:hidden fixed z-[9999] w-full max-w-full overflow-x-hidden"
      style={{
        willChange: "transform",
        top: 'clamp(0.5rem, 1vw, 0.75rem)',
        left: '50%',
        transform: 'translateX(-50%)',
        paddingLeft: 'clamp(0.5rem, 1.5vw, 1rem)',
        paddingRight: 'clamp(0.5rem, 1.5vw, 1rem)',
      }}
    >
      <div className="glass w-full max-w-full overflow-hidden" style={{
        willChange: "backdrop-filter, box-shadow",
        borderRadius: 'clamp(12px, 3vw, 16px)',
        padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
      }}>
          <div className="flex items-center justify-between gap-2 flex-wrap w-full">
            {/* Brand móvil con typewriter */}
            <a
              href="#top"
              className="nav-anim flex items-center gap-1 rounded-xl min-w-0 flex-shrink-0"
              style={{
                background: "var(--panel-alpha)",
                border: "1px solid var(--ring)",
                willChange: "transform",
                padding: 'clamp(0.375rem, 1vw, 0.625rem) clamp(0.5rem, 1.5vw, 0.75rem)',
                maxWidth: 'min(180px, 45vw)',
              }}
            >
              <div className="flex items-center gap-1 overflow-hidden w-full">
                <span
                  ref={brandMobileRef}
                  className="font-mono font-semibold tabular-nums truncate"
                  style={{
                    color: "var(--text)",
                    fontSize: 'clamp(9px, 1.2vw, 12px)',
                  }}
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
            <div className="nav-anim flex items-center gap-1 flex-shrink-0">
              <LangMenu />
              <ThemeMenu />
            </div>

            {/* Burger button */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-label="Menu"
              className="nav-anim rounded-xl transition-all duration-200 active:scale-95 flex-shrink-0"
              style={{
                background: "var(--panel-alpha)",
                border: "1px solid var(--ring)",
                padding: 'clamp(0.375rem, 1vw, 0.625rem)',
                minWidth: '36px',
                minHeight: '36px',
              }}
            >
              <div className="flex flex-col justify-center gap-1" style={{
                width: 'clamp(16px, 4vw, 20px)',
                height: 'clamp(16px, 4vw, 20px)',
              }}>
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
              className="overflow-hidden border-t w-full max-w-full"
              style={{
                borderColor: "var(--ring)",
                marginTop: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                paddingTop: 'clamp(0.5rem, 1.5vw, 0.75rem)',
              }}
            >
              {/* Main navigation - Grid responsive */}
              <div className="responsive-grid w-full" style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(120px, 100%), 1fr))',
                gap: 'clamp(0.375rem, 1vw, 0.5rem)',
                marginBottom: 'clamp(0.5rem, 1.5vw, 0.75rem)',
              }}>
                {mainNavItems.map((n) => (
                  <a
                    key={n.id}
                    href={n.href}
                    onClick={(e) => onNavClick(e, n)}
                    className={`block rounded-lg font-semibold text-center transition-all
                      ${active === n.id ? "ring-1" : "opacity-70"}`}
                    style={{
                      background:
                        active === n.id ? "var(--panel-alpha)" : "transparent",
                      borderColor: active === n.id ? "var(--ring)" : "transparent",
                      color: active === n.id ? "var(--accent)" : "var(--text)",
                      padding: 'clamp(0.375rem, 1vw, 0.625rem) clamp(0.5rem, 1.5vw, 0.75rem)',
                      fontSize: 'clamp(10px, 1.2vw, 12px)',
                    }}
                  >
                    {n.label}
                  </a>
                ))}
              </div>

              {/* Secondary navigation - Lista vertical compacta */}
              <div className="w-full" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.25rem, 0.5vw, 0.375rem)',
              }}>
                {secondaryNavItems.map((n) => (
                  <a
                    key={n.id}
                    href={n.href}
                    onClick={(e) => onNavClick(e, n)}
                    target={n.external ? "_blank" : undefined}
                    rel={n.external ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-between rounded-lg font-medium transition-all opacity-70 active:opacity-100 hover:bg-[var(--panel-alpha)] w-full"
                    style={{
                      color: "var(--text)",
                      padding: 'clamp(0.375rem, 1vw, 0.5rem) clamp(0.5rem, 1.5vw, 0.75rem)',
                      fontSize: 'clamp(10px, 1.2vw, 12px)',
                    }}
                  >
                    <span className="truncate flex-1">{n.label}</span>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {n.badge && (
                        <span
                          className="rounded-full font-bold"
                          style={{
                            background: "var(--accent)",
                            color: "var(--bg)",
                            fontSize: 'clamp(8px, 1vw, 9px)',
                            padding: 'clamp(0.125rem, 0.3vw, 0.25rem) clamp(0.25rem, 0.6vw, 0.375rem)',
                          }}
                        >
                          {n.badge}
                        </span>
                      )}
                      {n.external && (
                        <svg
                          className="opacity-50"
                          style={{
                            width: 'clamp(10px, 2vw, 12px)',
                            height: 'clamp(10px, 2vw, 12px)',
                          }}
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
    </header>
  );
}