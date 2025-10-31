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

export default function Sidebar() {
  const t = useT();
  const { lang } = useLang();
  const [active, setActive] = useState<NavItem["id"]>("about");
  const [collapsed, setCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const brandRef = useRef<HTMLSpanElement | null>(null);
  const caretRef = useRef<HTMLSpanElement | null>(null);

  /* ---------------- Navigation Items ---------------- */
  const navItems: NavItem[] = useMemo(
    () => [
      { id: "about", label: t("about"), href: "#about" },
      { id: "projects", label: t("projects"), href: "#projects" },
      { id: "skills", label: t("skills"), href: "#skills" },
      { id: "timeline", label: t("experience") ?? "Experiencia", href: "#timeline", badge: "★" },
      { id: "cases", label: t("caseStudies") ?? "Casos", href: "#cases" },
      { id: "opensource", label: "Open Source", href: "#opensource" },
      { id: "blog", label: "Blog", href: "#blog" },
      { id: "playground", label: "Playground", href: "#playground", badge: "New" },
      { id: "talks", label: t("talks") ?? "Talks", href: "#talks" },
      { id: "uses", label: "Uses", href: "#uses" },
      { id: "now", label: "Now()", href: "#now" },
      { id: "contacts", label: t("contacts"), href: "#contacts" },
      { id: "cv", label: "CV", href: "/cv.pdf", external: true },
    ],
    [t]
  );

  const setItemRef = (id: NavItem["id"]) => (el: HTMLAnchorElement | null) => {
    itemRefs.current[id] = el;
  };

  /* ---------------- Typewriter Animation ---------------- */
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

  /* ---------------- Entry Animation + Glass Effect ---------------- */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sidebarRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".sidebar-nav-item", {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
      });

      const glass = sidebarRef.current!.querySelector(".glass");
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
    }, sidebarRef);
    return () => ctx.revert();
  }, []);

  /* ---------------- Active Section Detection ---------------- */
  useEffect(() => {
    const sections = navItems
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
  }, [navItems]);

  /* ---------------- Active Indicator Animation ---------------- */
  function moveIndicator() {
    const ind = indicatorRef.current;
    const el = itemRefs.current[active];
    if (!ind || !el) return;

    gsap.to(ind, {
      y: el.offsetTop,
      height: el.offsetHeight,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  useEffect(() => {
    moveIndicator();
    const on = () => moveIndicator();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [active, navItems]);

  /* ---------------- Navigation Click ---------------- */
  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, n: NavItem) => {
    if (n.external) return;
    e.preventDefault();
    document.querySelector(n.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(n.id);
  };

  return (
    <aside
      ref={sidebarRef}
      className="hidden lg:flex fixed left-3 top-3 bottom-3 z-[998] w-64"
    >
      <div className="glass h-full w-full flex flex-col overflow-hidden">
        {/* Brand with typewriter */}
        <a
          href="#top"
          title="Top"
          className="sidebar-nav-item group flex items-center gap-2 m-3 rounded-xl px-4 py-3 transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: "var(--panel-alpha)",
            border: "1px solid var(--ring)",
          }}
        >
          <div className="flex items-center gap-1 font-mono text-xs font-semibold w-full">
            <span
              ref={brandRef}
              className="tabular-nums truncate flex-1"
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

        {/* Controls */}
        <div className="sidebar-nav-item flex items-center gap-2 mx-3 mb-3">
          <LangMenu />
          <ThemeMenu />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-3 relative">
          {/* Active indicator */}
          <div
            ref={indicatorRef}
            className="absolute left-3 rounded-lg transition-all"
            style={{
              background: "var(--accent)",
              opacity: 0.15,
              width: "calc(100% - 24px)",
              willChange: "transform, height",
            }}
          />

          {/* Nav items */}
          <div className="space-y-0.5 relative">
            {navItems.map((n) => (
              <a
                key={n.id}
                ref={setItemRef(n.id)}
                href={n.href}
                onClick={(e) => onNavClick(e, n)}
                target={n.external ? "_blank" : undefined}
                rel={n.external ? "noopener noreferrer" : undefined}
                className={`sidebar-nav-item flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 relative group ${
                  active === n.id ? "opacity-100" : "opacity-60 hover:opacity-90"
                }`}
                style={{
                  color: active === n.id ? "var(--accent)" : "var(--text)",
                }}
              >
                {/* Icon */}
                <div
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{
                    background: active === n.id ? "var(--accent)" : "var(--panel)",
                    color: active === n.id ? "var(--bg)" : "var(--text)",
                  }}
                >
                  {n.label.charAt(0).toUpperCase()}
                </div>

                <span className="flex-1 truncate">{n.label}</span>

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
        </nav>
      </div>
    </aside>
  );
}
