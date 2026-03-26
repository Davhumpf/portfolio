"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLang, useT } from "@/context/LanguageProvider";
import { Sun, Moon, Laptop, Menu, X, Download } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LANGS = ["es", "en", "de"] as const;
const PRIMARY_SECTION_ORDER = ["home", "about", "projects", "timeline", "cases"] as const;
const SCROLL_OFFSET = 180;

type SectionId = (typeof PRIMARY_SECTION_ORDER)[number] | "contacts" | "opensource" | "blog" | "talks" | "uses" | "now";

type NavItem = {
  id: string;
  label: string;
  href: string;
  sectionId?: SectionId;
  external?: boolean;
  download?: boolean;
};

export default function Header() {
  const t = useT();
  const { lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const moreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  const primaryNav = useMemo<NavItem[]>(
    () => [
      { id: "home", label: t("nav_home"), href: "/", sectionId: "home" },
      { id: "about", label: t("about"), href: "/about", sectionId: "about" },
      { id: "projects", label: t("projects"), href: "/projects", sectionId: "projects" },
      { id: "timeline", label: t("experience") ?? "Experiencia", href: "/experience", sectionId: "timeline" },
      { id: "cases", label: t("caseStudies") ?? "Casos", href: "/case-studies", sectionId: "cases" },
    ],
    [t]
  );

  const dynamicNavItems = useMemo<NavItem[]>(
    () => [
      { id: "contacts", label: t("contacts"), href: "/contacts", sectionId: "contacts" },
      { id: "opensource", label: "Open Source", href: "/open-source", sectionId: "opensource" },
      { id: "blog", label: "Blog", href: "/blog", sectionId: "blog" },
      { id: "talks", label: t("talks") ?? "Talks", href: "/talks", sectionId: "talks" },
      { id: "uses", label: "Uses", href: "/uses", sectionId: "uses" },
      { id: "now", label: "Now()", href: "/now", sectionId: "now" },
    ],
    [t]
  );

  const secondaryNav = useMemo<NavItem[]>(
    () => [
      { id: "opensource", label: "Open Source", href: "/open-source", sectionId: "opensource" },
      { id: "blog", label: "Blog", href: "/blog", sectionId: "blog" },
      { id: "talks", label: t("talks") ?? "Talks", href: "/talks", sectionId: "talks" },
      { id: "uses", label: "Uses", href: "/uses", sectionId: "uses" },
      { id: "now", label: "Now()", href: "/now", sectionId: "now" },
      { id: "cv", label: "Mi CV", href: "/MyCv.pdf", external: true, download: true },
    ],
    [t]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const ids: SectionId[] = [
      ...PRIMARY_SECTION_ORDER,
      "contacts",
      "opensource",
      "blog",
      "talks",
      "uses",
      "now",
    ];

    const getSections = () =>
      ids
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((item): item is { id: SectionId; el: HTMLElement } => Boolean(item.el))
        .sort((a, b) => a.el.offsetTop - b.el.offsetTop);

    let sections = getSections();
    let ticking = false;

    const updateActiveSection = () => {
      if (!sections.length) sections = getSections();
      const marker = window.scrollY + SCROLL_OFFSET;
      let current: SectionId = "home";
      for (const section of sections) if (section.el.offsetTop <= marker) current = section.id;
      setActiveSection(current);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActiveSection);
    };

    const onResize = () => {
      sections = getSections();
      onScroll();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  const isHome = pathname === "/";

  const isActive = (item: NavItem) => {
    if (item.external) return false;
    if (isHome && item.sectionId) return item.sectionId === activeSection;
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  };

  const resolveHref = (item: NavItem) => {
    if (!isHome || !item.sectionId) return item.href;
    return item.sectionId === "home" ? "#top" : `#${item.sectionId}`;
  };

  const dynamicIds: SectionId[] = ["contacts", "opensource", "blog", "talks", "uses", "now"];
  const activeDynamicItem = dynamicNavItems.find((item) => item.sectionId === activeSection) ?? dynamicNavItems[0];
  const isDynamicActive = dynamicIds.includes(activeSection);

  const onNavClick = () => {
    setMobileMenuOpen(false);
    setMoreOpen(false);
  };

  const cycleLang = () => {
    const currentIndex = LANGS.indexOf(lang);
    setLang(LANGS[(currentIndex + 1) % LANGS.length]);
  };

  return (
    <header className="fixed z-[9999] w-full" style={{ top: "12px", left: "50%", transform: "translateX(-50%)", paddingLeft: "12px", paddingRight: "12px", maxWidth: "calc(100vw - 24px)" }}>
      <div className="w-full backdrop-blur-xl bg-white/5 shadow-2xl" style={{ borderRadius: "18px", border: "1px solid color-mix(in oklab, var(--border) 35%, transparent)" }}>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <button onClick={() => setMobileMenuOpen((v) => !v)} aria-expanded={mobileMenuOpen} aria-label="Toggle navigation menu" className="lg:hidden flex items-center gap-2 px-3 h-10 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all" style={{ color: "var(--text-1)" }}>
              {mobileMenuOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}<span className="text-sm font-medium">Menu</span>
            </button>

            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 flex-wrap">
              {primaryNav.map((n) => (
                <Link key={n.id} href={resolveHref(n)} onClick={onNavClick} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive(n) ? "bg-black/20 shadow-inner" : "hover:bg-white/5"}`} style={{ color: "var(--text-1)" }}>{n.label}</Link>
              ))}

              <Link href={resolveHref(activeDynamicItem)} onClick={onNavClick} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${isDynamicActive ? "bg-black/20 shadow-inner" : "hover:bg-white/5"}`} style={{ color: "var(--text-1)" }}>
                {activeDynamicItem.label}
              </Link>

              <div className="relative" ref={moreRef}>
                <button onClick={() => setMoreOpen((open) => !open)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${moreOpen ? "bg-black/20 shadow-inner" : "hover:bg-white/5"}`} style={{ color: "var(--text-1)" }} aria-expanded={moreOpen} aria-haspopup="true">{t("nav_more")}</button>
                {moreOpen && (
                  <div className="absolute left-0 mt-2 min-w-[200px] rounded-xl backdrop-blur-xl shadow-xl overflow-hidden" style={{ zIndex: 50, background: "color-mix(in oklab, var(--panel) 85%, transparent)", border: "1px solid color-mix(in oklab, var(--border) 40%, transparent)" }}>
                    {secondaryNav.map((n) => n.external ? (
                      <a key={n.id} href={n.href} onClick={onNavClick} download={n.download ? true : undefined} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 px-4 py-3 text-sm transition-all hover:bg-white/10" style={{ color: "var(--text-1)" }}><span>{n.label}</span><Download size={14} /></a>
                    ) : (
                      <Link key={n.id} href={resolveHref(n)} onClick={onNavClick} className={`flex items-center justify-between gap-3 px-4 py-3 text-sm transition-all ${isActive(n) ? "bg-black/20" : "hover:bg-white/10"}`} style={{ color: "var(--text-1)" }}><span>{n.label}</span></Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={cycleLang} className="flex items-center justify-center min-w-[48px] h-10 px-3 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all" aria-label={`Language: ${lang.toUpperCase()}`} title="Click to cycle language">
              <span className="text-xs font-bold tracking-wider" style={{ color: "var(--text-1)" }}>{lang.toUpperCase()}</span>
            </button>

            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5">
              <button onClick={() => mounted && setTheme("light")} disabled={!mounted} className={`p-2 rounded-lg transition-all ${mounted && theme === "light" ? "bg-gradient-to-br from-amber-500/20 to-yellow-500/20 text-amber-400" : "hover:bg-white/5 opacity-60 hover:opacity-100"}`} aria-label="Light theme" style={{ color: mounted && theme === "light" ? undefined : "var(--text-1)" }}><Sun size={16} /></button>
              <button onClick={() => mounted && setTheme("dark")} disabled={!mounted} className={`p-2 rounded-lg transition-all ${mounted && theme === "dark" ? "bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400" : "hover:bg-white/5 opacity-60 hover:opacity-100"}`} aria-label="Dark theme" style={{ color: mounted && theme === "dark" ? undefined : "var(--text-1)" }}><Moon size={16} /></button>
              <button onClick={() => mounted && setTheme("system")} disabled={!mounted} className={`p-2 rounded-lg transition-all ${mounted && (theme === "system" || !theme) ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400" : "hover:bg-white/5 opacity-60 hover:opacity-100"}`} aria-label="System theme" style={{ color: mounted && (theme === "system" || !theme) ? undefined : "var(--text-1)" }}><Laptop size={16} /></button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden" style={{ borderTop: "1px solid color-mix(in oklab, var(--border) 40%, transparent)" }}>
            <div className="px-4 py-4 space-y-4">
              <div className="space-y-1.5">
                {primaryNav.map((n) => (
                  <Link key={n.id} href={resolveHref(n)} onClick={onNavClick} className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${isActive(n) ? "bg-black/20" : "hover:bg-white/5"}`} style={{ color: "var(--text-1)", fontSize: "15px" }}><span>{n.label}</span></Link>
                ))}
                <Link href={resolveHref(activeDynamicItem)} onClick={onNavClick} className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${isDynamicActive ? "bg-black/20" : "hover:bg-white/5"}`} style={{ color: "var(--text-1)", fontSize: "15px" }}><span>{activeDynamicItem.label}</span></Link>
              </div>

              <div className="pt-3" style={{ borderTop: "1px solid color-mix(in oklab, var(--border) 40%, transparent)" }}>
                <div className="space-y-1">
                  {secondaryNav.map((n) => n.external ? (
                    <a key={n.id} href={n.href} onClick={onNavClick} download={n.download ? true : undefined} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-2.5 rounded-lg font-medium transition-all hover:bg-white/5" style={{ color: "var(--text-2)", fontSize: "14px", opacity: 0.9 }}><span>{n.label}</span><Download size={14} className="opacity-70" /></a>
                  ) : (
                    <Link key={n.id} href={resolveHref(n)} onClick={onNavClick} className={`flex items-center justify-between px-4 py-2.5 rounded-lg font-medium transition-all ${isActive(n) ? "bg-black/20" : "hover:bg-white/5"}`} style={{ color: "var(--text-2)", fontSize: "14px", opacity: 0.9 }}><span>{n.label}</span></Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
