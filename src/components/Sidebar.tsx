"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useT } from "@/context/LanguageProvider";
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
  const [active, setActive] = useState<NavItem["id"]>("about");
  const [collapsed, setCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

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

  /* ---------------- Entry Animation ---------------- */
  useEffect(() => {
    if (!sidebarRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".sidebar-nav-item", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05,
      });
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
      className={`hidden lg:flex fixed left-0 top-0 h-screen z-[998] transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
      style={{ willChange: "width" }}
    >
      <div
        className="h-full w-full flex flex-col backdrop-blur-2xl"
        style={{
          background: "var(--panel-alpha)",
          borderRight: "1px solid var(--ring)",
        }}
      >
        {/* Header with collapse button */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--ring)" }}>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <LangMenu />
              <ThemeMenu />
            </div>
          )}
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="p-2 rounded-lg transition-all hover:bg-[var(--panel-alpha)]"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            style={{ marginLeft: collapsed ? "auto" : "0" }}
          >
            <svg
              className={`w-5 h-5 transition-transform ${collapsed ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 relative">
          {/* Active indicator */}
          <div
            ref={indicatorRef}
            className="absolute left-3 rounded-lg transition-all"
            style={{
              background: "var(--accent)",
              opacity: 0.15,
              width: collapsed ? "56px" : "calc(100% - 24px)",
              willChange: "transform, height",
            }}
          />

          {/* Nav items */}
          <div className="space-y-1 relative">
            {navItems.map((n) => (
              <a
                key={n.id}
                ref={setItemRef(n.id)}
                href={n.href}
                onClick={(e) => onNavClick(e, n)}
                target={n.external ? "_blank" : undefined}
                rel={n.external ? "noopener noreferrer" : undefined}
                className={`sidebar-nav-item flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 relative group ${
                  active === n.id ? "opacity-100" : "opacity-60 hover:opacity-90"
                }`}
                style={{
                  color: active === n.id ? "var(--accent)" : "var(--text)",
                }}
                title={collapsed ? n.label : undefined}
              >
                {/* Icon placeholder - you can add custom icons here */}
                <div
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{
                    background: active === n.id ? "var(--accent)" : "var(--panel)",
                    color: active === n.id ? "var(--bg)" : "var(--text)",
                  }}
                >
                  {n.label.charAt(0).toUpperCase()}
                </div>

                {!collapsed && (
                  <>
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
                  </>
                )}

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <div
                    className="absolute left-full ml-2 px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-xs font-medium"
                    style={{
                      background: "var(--panel)",
                      border: "1px solid var(--ring)",
                      color: "var(--text)",
                    }}
                  >
                    {n.label}
                    {n.badge && (
                      <span
                        className="ml-2 rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                        style={{
                          background: "var(--accent)",
                          color: "var(--bg)",
                        }}
                      >
                        {n.badge}
                      </span>
                    )}
                  </div>
                )}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}
