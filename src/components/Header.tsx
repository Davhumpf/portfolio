"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useLang, useT } from "@/context/LanguageProvider";
import { Sun, Moon, Laptop, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";

type NavItem = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
  download?: boolean;
};

export default function Header() {
  const t = useT();
  const { lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();

  const root = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState<NavItem["id"]>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fix hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------------- Items ---------------- */
  const mainNavItems: NavItem[] = useMemo(
    () => [
      { id: "about", label: t("about"), href: "#about" },
      { id: "projects", label: t("projects"), href: "#projects" },
      { id: "timeline", label: t("experience") ?? "Experiencia", href: "#timeline" },
      { id: "cases", label: t("caseStudies") ?? "Casos", href: "#cases" },
      { id: "contacts", label: t("contacts"), href: "#contacts" },
    ],
    [t]
  );

  const secondaryNavItems: NavItem[] = useMemo(
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

  const allNavItems = [...mainNavItems, ...secondaryNavItems];

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

  /* ---------------- Autoclose menu on scroll ---------------- */
  useEffect(() => {
    const close = () => setMobileMenuOpen(false);
    const onScroll = () => mobileMenuOpen && close();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
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

  /* ---------------- Language cycle ---------------- */
  const cycleLang = () => {
    const langs = ['es', 'en', 'de'] as const;
    const currentIndex = langs.indexOf(lang);
    const nextIndex = (currentIndex + 1) % langs.length;
    setLang(langs[nextIndex]);
  };

  return (
    <header
      ref={root}
      className="lg:hidden fixed z-[9999] w-full"
      style={{
        top: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        paddingLeft: '12px',
        paddingRight: '12px',
        maxWidth: 'calc(100vw - 24px)',
      }}
    >
      <div 
        className="w-full backdrop-blur-xl bg-gradient-to-r from-white/[0.07] to-white/[0.04] border border-white/10 shadow-2xl overflow-hidden"
        style={{
          borderRadius: '18px',
        }}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          {/* Left: Menu Button */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="flex items-center gap-2 px-3 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 active:scale-95 transition-all border border-white/10"
            style={{ color: 'var(--text-1)' }}
          >
            {mobileMenuOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
            <span className="text-sm font-medium">Menu</span>
          </button>

          {/* Right: Theme Controls */}
          <div className="flex items-center gap-2">
            {/* Language Cycle */}
            <button
              onClick={cycleLang}
              className="flex items-center justify-center min-w-[48px] h-10 px-3 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all border border-white/10"
              aria-label={`Language: ${lang.toUpperCase()}`}
              title="Click to cycle language"
            >
              <span className="text-xs font-bold tracking-wider" style={{ color: 'var(--text-1)' }}>
                {lang.toUpperCase()}
              </span>
            </button>

            {/* Theme Toggle Group */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
              {/* Light */}
              <button
                onClick={() => mounted && setTheme('light')}
                disabled={!mounted}
                className={`p-2 rounded-lg transition-all ${
                  mounted && theme === 'light'
                    ? 'bg-gradient-to-br from-amber-500/20 to-yellow-500/20 text-amber-400'
                    : 'hover:bg-white/5 opacity-60 hover:opacity-100'
                }`}
                aria-label="Light theme"
                style={{ color: mounted && theme === 'light' ? undefined : 'var(--text-1)' }}
              >
                <Sun size={16} />
              </button>

              {/* Dark */}
              <button
                onClick={() => mounted && setTheme('dark')}
                disabled={!mounted}
                className={`p-2 rounded-lg transition-all ${
                  mounted && theme === 'dark'
                    ? 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400'
                    : 'hover:bg-white/5 opacity-60 hover:opacity-100'
                }`}
                aria-label="Dark theme"
                style={{ color: mounted && theme === 'dark' ? undefined : 'var(--text-1)' }}
              >
                <Moon size={16} />
              </button>

              {/* System */}
              <button
                onClick={() => mounted && setTheme('system')}
                disabled={!mounted}
                className={`p-2 rounded-lg transition-all ${
                  mounted && (theme === 'system' || !theme)
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400'
                    : 'hover:bg-white/5 opacity-60 hover:opacity-100'
                }`}
                aria-label="System theme"
                style={{ color: mounted && (theme === 'system' || !theme) ? undefined : 'var(--text-1)' }}
              >
                <Laptop size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="overflow-hidden border-t w-full"
            style={{
              borderColor: 'var(--border)',
            }}
          >
            <div className="px-4 py-4 space-y-4">
              {/* Main Navigation */}
              <div className="space-y-1.5">
                {mainNavItems.map((n) => (
                  <a
                    key={n.id}
                    href={n.href}
                    onClick={(e) => onNavClick(e, n)}
                    download={n.download ? true : undefined}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all
                      ${active === n.id 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30' 
                        : 'hover:bg-white/5 border border-transparent'
                      }
                    `}
                    style={{
                      color: active === n.id ? undefined : 'var(--text-1)',
                      fontSize: '15px',
                    }}
                  >
                    <span>{n.label}</span>
                    {n.badge && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold">
                        {n.badge}
                      </span>
                    )}
                  </a>
                ))}
              </div>

              {/* Secondary Navigation */}
              <div className="pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="space-y-1">
                  {secondaryNavItems.map((n) => (
                    <a
                      key={n.id}
                      href={n.href}
                      onClick={(e) => onNavClick(e, n)}
                      download={n.download ? true : undefined}
                      target={n.external ? "_blank" : undefined}
                      rel={n.external ? "noopener noreferrer" : undefined}
                      className="flex items-center justify-between px-4 py-2.5 rounded-lg font-medium transition-all hover:bg-white/5"
                      style={{
                        color: 'var(--text-2)',
                        fontSize: '14px',
                        opacity: 0.8,
                      }}
                    >
                      <span>{n.label}</span>
                      {n.external && (
                        <svg
                          className="opacity-50"
                          width="14"
                          height="14"
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
