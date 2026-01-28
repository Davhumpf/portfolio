"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLang, useT } from "@/context/LanguageProvider";
import { Sun, Moon, Laptop, Menu, X, Download } from "lucide-react";
import { useTheme } from "next-themes";

const LANGS = ["es", "en", "de"] as const;

type NavItem = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

export default function Header() {
  const t = useT();
  const { lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();

  const [active, setActive] = useState<NavItem["id"]>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const primaryNav = useMemo<NavItem[]>(
    () => [
      { id: "about", label: t("about"), href: "#about" },
      { id: "projects", label: t("projects"), href: "#projects" },
      { id: "timeline", label: t("experience") ?? "Experiencia", href: "#timeline" },
      { id: "cases", label: t("caseStudies") ?? "Casos", href: "#cases" },
      { id: "contacts", label: t("contacts"), href: "#contacts" },
    ],
    [t]
  );

  const secondaryNav = useMemo<NavItem[]>(
    () => [
      { id: "opensource", label: "Open Source", href: "#opensource" },
      { id: "blog", label: "Blog", href: "#blog" },
      { id: "talks", label: t("talks") ?? "Talks", href: "#talks" },
      { id: "uses", label: "Uses", href: "#uses" },
      { id: "now", label: "Now()", href: "#now" },
      { id: "cv", label: "Mi CV", href: "/MyCv.pdf", external: true, download: true },
    ],
    [t]
  );

  const allNavItems = [...primaryNav, ...secondaryNav];

  useEffect(() => {
    const sections = allNavItems
      .filter((n) => n.href.startsWith("#"))
      .map((n) => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id as NavItem["id"]);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.2, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [allNavItems]);

  useEffect(() => {
    const closeMenu = () => setMobileMenuOpen(false);
    const handleScroll = () => mobileMenuOpen && closeMenu();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, n: NavItem) => {
    if (n.external) return;
    e.preventDefault();
    document.querySelector(n.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(n.id);
    setMobileMenuOpen(false);
    setMoreOpen(false);
  };

  const cycleLang = () => {
    const currentIndex = LANGS.indexOf(lang);
    const nextIndex = (currentIndex + 1) % LANGS.length;
    setLang(LANGS[nextIndex]);
  };

  return (
    <header
      className="fixed z-[9999] w-full"
      style={{
        top: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        paddingLeft: "12px",
        paddingRight: "12px",
        maxWidth: "calc(100vw - 24px)",
      }}
    >
      <div
        className="w-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl"
        style={{ borderRadius: "18px" }}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="lg:hidden flex items-center gap-2 px-3 h-10 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all border border-white/10"
              style={{ color: "var(--text-1)" }}
            >
              {mobileMenuOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
              <span className="text-sm font-medium">Menu</span>
            </button>

            <nav className="hidden lg:flex items-center gap-2 flex-wrap">
              {primaryNav.map((n) => (
                <a
                  key={n.id}
                  href={n.href}
                  onClick={(e) => onNavClick(e, n)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                    active === n.id
                      ? "bg-white/10 border-white/30"
                      : "border-transparent hover:border-white/20 hover:bg-white/5"
                  }`}
                  style={{ color: "var(--text-1)" }}
                >
                  {n.label}
                </a>
              ))}

              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen((open) => !open)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                    moreOpen
                      ? "bg-white/10 border-white/30"
                      : "border-transparent hover:border-white/20 hover:bg-white/5"
                  }`}
                  style={{ color: "var(--text-1)" }}
                  aria-expanded={moreOpen}
                  aria-haspopup="true"
                >
                  Más
                </button>
                {moreOpen && (
                  <div
                    className="absolute left-0 mt-2 min-w-[200px] rounded-xl border border-white/10 backdrop-blur-xl shadow-xl overflow-hidden"
                    style={{
                      zIndex: 50,
                      background: "color-mix(in oklab, var(--panel) 85%, transparent)",
                    }}
                  >
                    {secondaryNav.map((n) => (
                      <a
                        key={n.id}
                        href={n.href}
                        onClick={(e) => onNavClick(e, n)}
                        download={n.download ? true : undefined}
                        target={n.external ? "_blank" : undefined}
                        rel={n.external ? "noopener noreferrer" : undefined}
                        className="flex items-center justify-between gap-3 px-4 py-3 text-sm transition-all hover:bg-white/10"
                        style={{ color: "var(--text-1)" }}
                      >
                        <span>{n.label}</span>
                        {n.external && <Download size={14} />}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={cycleLang}
              className="flex items-center justify-center min-w-[48px] h-10 px-3 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all border border-white/10"
              aria-label={`Language: ${lang.toUpperCase()}`}
              title="Click to cycle language"
            >
              <span className="text-xs font-bold tracking-wider" style={{ color: "var(--text-1)" }}>
                {lang.toUpperCase()}
              </span>
            </button>

            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
              <button
                onClick={() => mounted && setTheme("light")}
                disabled={!mounted}
                className={`p-2 rounded-lg transition-all ${
                  mounted && theme === "light"
                    ? "bg-gradient-to-br from-amber-500/20 to-yellow-500/20 text-amber-400"
                    : "hover:bg-white/5 opacity-60 hover:opacity-100"
                }`}
                aria-label="Light theme"
                style={{ color: mounted && theme === "light" ? undefined : "var(--text-1)" }}
              >
                <Sun size={16} />
              </button>

              <button
                onClick={() => mounted && setTheme("dark")}
                disabled={!mounted}
                className={`p-2 rounded-lg transition-all ${
                  mounted && theme === "dark"
                    ? "bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400"
                    : "hover:bg-white/5 opacity-60 hover:opacity-100"
                }`}
                aria-label="Dark theme"
                style={{ color: mounted && theme === "dark" ? undefined : "var(--text-1)" }}
              >
                <Moon size={16} />
              </button>

              <button
                onClick={() => mounted && setTheme("system")}
                disabled={!mounted}
                className={`p-2 rounded-lg transition-all ${
                  mounted && (theme === "system" || !theme)
                    ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400"
                    : "hover:bg-white/5 opacity-60 hover:opacity-100"
                }`}
                aria-label="System theme"
                style={{ color: mounted && (theme === "system" || !theme) ? undefined : "var(--text-1)" }}
              >
                <Laptop size={16} />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10">
            <div className="px-4 py-4 space-y-4">
              <div className="space-y-1.5">
                {primaryNav.map((n) => (
                  <a
                    key={n.id}
                    href={n.href}
                    onClick={(e) => onNavClick(e, n)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all border ${
                      active === n.id
                        ? "bg-white/10 border-white/30"
                        : "border-transparent hover:bg-white/5"
                    }`}
                    style={{ color: "var(--text-1)", fontSize: "15px" }}
                  >
                    <span>{n.label}</span>
                  </a>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10">
                <div className="space-y-1">
                  {secondaryNav.map((n) => (
                    <a
                      key={n.id}
                      href={n.href}
                      onClick={(e) => onNavClick(e, n)}
                      download={n.download ? true : undefined}
                      target={n.external ? "_blank" : undefined}
                      rel={n.external ? "noopener noreferrer" : undefined}
                      className="flex items-center justify-between px-4 py-2.5 rounded-lg font-medium transition-all hover:bg-white/5"
                      style={{ color: "var(--text-2)", fontSize: "14px", opacity: 0.9 }}
                    >
                      <span>{n.label}</span>
                      {n.external && <Download size={14} className="opacity-70" />}
                    </a>
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
