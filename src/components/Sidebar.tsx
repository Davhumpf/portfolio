'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, FolderOpen, Mail, Clock, FileText, GitBranch, BookOpen, Mic, Wrench, Calendar, Sun, Moon, Laptop, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { useLang, type Lang } from '@/context/LanguageProvider';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Fix hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const sidebarContent = {
    en: {
      about: 'About',
      projects: 'Projects',
      timeline: 'Timeline',
      cases: 'Case Studies',
      opensource: 'Open Source',
      blog: 'Blog',
      talks: 'Talks',
      uses: 'Uses',
      now: 'Now',
      contact: 'Contact',
      footer: 'Created with ❤️ by Davhumpf'
    },
    es: {
      about: 'Sobre mí',
      projects: 'Proyectos',
      timeline: 'Experiencia',
      cases: 'Casos de estudio',
      opensource: 'Open Source',
      blog: 'Blog',
      talks: 'Charlas',
      uses: 'Uses',
      now: 'Now',
      contact: 'Contacto',
      footer: 'Created with ❤️ by Davhumpf'
    },
    de: {
      about: 'Über mich',
      projects: 'Projekte',
      timeline: 'Erfahrung',
      cases: 'Fallstudien',
      opensource: 'Open Source',
      blog: 'Blog',
      talks: 'Vorträge',
      uses: 'Uses',
      now: 'Now',
      contact: 'Kontakt',
      footer: 'Created with ❤️ by Davhumpf'
    }
  };

  const content = sidebarContent[lang];

  // Helper functions for labels
  const getLangLabel = () => {
    switch (lang) {
      case 'en': return 'English';
      case 'es': return 'Español';
      case 'de': return 'Deutsch';
      default: return 'Español';
    }
  };

  const getThemeLabel = () => {
    if (!mounted) return 'System';
    switch (theme) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      case 'system': return 'System';
      default: return 'System';
    }
  };

  // Auto-expand on hover (desktop only)
  const handleMouseEnter = () => {
    setCollapsed(false);
  };

  const handleMouseLeave = () => {
    setCollapsed(true);
  };

  const navItems = [
    { id: 'about', href: '#about', icon: <User size={18} />, text: content.about },
    { id: 'projects', href: '#projects', icon: <FolderOpen size={18} />, text: content.projects },
    { id: 'timeline', href: '#timeline', icon: <Clock size={18} />, text: content.timeline },
    { id: 'cases', href: '#cases', icon: <FileText size={18} />, text: content.cases },
    { id: 'opensource', href: '#opensource', icon: <GitBranch size={18} />, text: content.opensource },
    { id: 'blog', href: '#blog', icon: <BookOpen size={18} />, text: content.blog },
    { id: 'talks', href: '#talks', icon: <Mic size={18} />, text: content.talks },
    { id: 'uses', href: '#uses', icon: <Wrench size={18} />, text: content.uses },
    { id: 'now', href: '#now', icon: <Calendar size={18} />, text: content.now },
    { id: 'contacts', href: '#contacts', icon: <Mail size={18} />, text: content.contact }
  ];

  // Handle navigation click with smooth scroll
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    e.preventDefault();
    const target = document.querySelector(item.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(item.id);
      setMobileMenuOpen(false); // Close mobile menu on navigation
    }
  };

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.2, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  // GSAP animations - isolated to nav items only
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navItemsRef.current.filter(Boolean),
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'all',
        }
      );
    }, sidebarRef);

    return () => ctx.revert();
  }, [mounted]);

  // Theme icon component (fixes hydration)
  const ThemeIcon = ({ size = 18 }: { size?: number }) => {
    if (!mounted) {
      return <Laptop size={size} />;
    }
    
    if (theme === 'light') return <Sun size={size} />;
    if (theme === 'dark') return <Moon size={size} />;
    return <Laptop size={size} />;
  };

  return (
    <>
      {/* Mobile Header - Clean & Simple */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <div 
          className="mx-3 mt-3 backdrop-blur-xl bg-gradient-to-r from-white/[0.07] to-white/[0.04] border border-white/10 shadow-2xl"
          style={{
            borderRadius: '18px',
          }}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            {/* Left: Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-2 px-3 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 active:scale-95 transition-all border border-white/10"
              aria-label="Toggle navigation menu"
              style={{ color: 'var(--text-1)' }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                {mobileMenuOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
              </motion.div>
              <span className="text-sm font-medium">Menu</span>
            </button>

            {/* Right: Theme Toggles (Direct buttons, no dropdowns) */}
            <div className="flex items-center gap-2">
              {/* Language Cycle Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const langs: Lang[] = ['es', 'en', 'de'];
                  const currentIndex = langs.indexOf(lang);
                  const nextIndex = (currentIndex + 1) % langs.length;
                  setLang(langs[nextIndex]);
                }}
                className="flex items-center justify-center min-w-[48px] h-10 px-3 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all border border-white/10"
                aria-label={`Language: ${getLangLabel()}`}
                title="Click to cycle language"
              >
                <span className="text-xs font-bold tracking-wider" style={{ color: 'var(--text-1)' }}>
                  {lang.toUpperCase()}
                </span>
              </button>

              {/* Light/Dark Direct Toggle */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
                {/* Light Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!mounted) return;
                    setTheme('light');
                  }}
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

                {/* Dark Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!mounted) return;
                    setTheme('dark');
                  }}
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

                {/* System Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!mounted) return;
                    setTheme('system');
                  }}
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
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              style={{ top: '88px' }}
            />

            {/* Mobile Menu */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="lg:hidden fixed left-0 bottom-0 w-[min(320px,85vw)] backdrop-blur-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] z-50 overflow-y-auto border-r border-white/10 shadow-2xl"
              style={{
                top: '88px',
                borderRadius: '0 24px 0 0',
              }}
            >
              <nav className="px-4 py-6 space-y-1.5">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`
                        relative flex items-center gap-3 rounded-xl px-4 py-3
                        transition-all duration-200 ease-out
                        ${isActive
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-lg'
                          : 'hover:bg-white/5 active:bg-white/10'
                        }
                      `}
                      style={{
                        border: isActive ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                      }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeMobileIndicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full"
                          style={{
                            height: 'calc(100% - 12px)',
                            background: 'linear-gradient(180deg, #60a5fa 0%, #a78bfa 100%)',
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}

                      <span
                        className={`flex-shrink-0 ${isActive ? 'text-blue-400' : ''}`}
                        style={{ color: isActive ? undefined : 'var(--text-1)' }}
                      >
                        {item.icon}
                      </span>

                      <span
                        className={`font-medium text-[15px] ${isActive ? 'text-white' : ''}`}
                        style={{
                          color: isActive ? undefined : 'var(--text-1)',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {item.text}
                      </span>
                    </a>
                  );
                })}
              </nav>

              {/* Footer in mobile menu */}
              <div className="px-4 pb-6 mt-6 border-t border-white/10 pt-4">
                <div className="rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-3.5">
                  <div className="flex items-center gap-3">
                    <p className="flex-1 text-[10px] leading-relaxed text-center md:text-left" style={{ color: 'var(--text-2)', opacity: 0.7 }}>
                      {content.footer}
                    </p>
                    <a
                      href="/MyCv.pdf"
                      download
                      aria-label="Descargar CV"
                      className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition"
                    >
                      <FileText size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        ref={sidebarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-state={collapsed ? 'collapsed' : 'expanded'}
        className="sidebar hidden lg:flex fixed left-0 top-0 bottom-0 flex-col justify-between backdrop-blur-xl bg-white/5 overflow-hidden"
        style={{
          width: collapsed ? '84px' : '280px',
          transition: 'width 0.3s ease',
          zIndex: 10000,
          borderRadius: '0 clamp(24px, 3vw, 32px) clamp(24px, 3vw, 32px) 0',
          isolation: 'isolate',
          padding: 'clamp(1rem, 1.5vw, 1.25rem) clamp(0.5rem, 1vw, 0.75rem)',
          willChange: 'width',
          maxWidth: '18rem',
          borderRight: '1px solid var(--border)',
        }}
      >
        {/* Top spacer for balance */}
        <div className="h-4" />

        {/* Navigation - Icons always visible */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                ref={(el) => {
                  navItemsRef.current[index] = el;
                }}
                className={`
                  relative flex items-center justify-start gap-3 rounded-lg px-3 py-2.5
                  transition-all duration-300 ease-out cursor-pointer group
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-lg'
                    : 'hover:bg-white/5'
                  }
                `}
                style={{
                  border: isActive ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
                }}
              >
                {/* Active indicator line */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full"
                    style={{
                      height: 'calc(100% - 8px)',
                      background: 'linear-gradient(to bottom, #60a5fa, #a78bfa)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                <span className={`
                  flex items-center justify-center flex-shrink-0 w-5 h-5
                  transition-colors duration-200
                  ${isActive ? 'text-blue-400' : ''}
                `}
                style={{
                  color: isActive ? undefined : 'var(--text-1)'
                }}>
                  {item.icon}
                </span>

                <span
                  className={`
                    label font-medium whitespace-nowrap overflow-hidden text-ellipsis
                    ${isActive ? 'text-white' : ''}
                  `}
                  style={{
                    opacity: collapsed ? 0 : 1,
                    maxWidth: collapsed ? '0px' : '150px',
                    fontSize: 'clamp(11px, 0.8vw, 12px)',
                    transition: 'opacity 0.2s ease, max-width 0.3s ease',
                    color: isActive ? undefined : 'var(--text-1)'
                  }}
                >
                  {item.text}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Bottom Section - Controls + Footer */}
        <div className="space-y-4">
          {/* Controls Section */}
          <div className="relative">
            {/* Icon-only buttons - Always visible when collapsed */}
            <div
              className="flex flex-col gap-2 transition-opacity duration-300 ease-in-out"
              style={{
                opacity: collapsed ? 1 : 0,
                pointerEvents: collapsed ? 'auto' : 'none',
                position: collapsed ? 'relative' : 'absolute',
                inset: 0,
              }}
            >
              {/* Language Toggle Button */}
              <button
                onClick={() => {
                  const langs: Lang[] = ['es', 'en', 'de'];
                  const currentIndex = langs.indexOf(lang);
                  const nextIndex = (currentIndex + 1) % langs.length;
                  setLang(langs[nextIndex]);
                }}
                className="flex items-center justify-center w-full py-2.5 px-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-200"
                aria-label={`Current language: ${lang.toUpperCase()}`}
                title={`Switch language (${lang.toUpperCase()})`}
              >
                <span className="text-xs font-bold" style={{ color: 'var(--text-1)' }}>
                  {lang.toUpperCase()}
                </span>
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={() => {
                  if (!mounted) return;
                  const themes = ['light', 'dark', 'system'];
                  const currentIndex = themes.indexOf(theme || 'system');
                  const nextIndex = (currentIndex + 1) % themes.length;
                  setTheme(themes[nextIndex]);
                }}
                className="flex items-center justify-center w-full py-2.5 px-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-200"
                aria-label={mounted ? `Current theme: ${theme || 'system'}` : 'Theme toggle'}
                title={mounted ? `Switch theme (${theme || 'system'})` : 'Switch theme'}
                style={{ color: 'var(--text-1)' }}
                disabled={!mounted}
              >
                <ThemeIcon />
              </button>
            </div>

            {/* Expanded: Toggle buttons with labels */}
            <div
              className="space-y-2 transition-opacity duration-300 ease-in-out"
              style={{
                opacity: collapsed ? 0 : 1,
                pointerEvents: collapsed ? 'none' : 'auto',
                position: collapsed ? 'absolute' : 'relative',
                inset: 0,
              }}
            >
              {/* Language Toggle Button - Expanded */}
              <button
                onClick={() => {
                  const langs: Lang[] = ['es', 'en', 'de'];
                  const currentIndex = langs.indexOf(lang);
                  const nextIndex = (currentIndex + 1) % langs.length;
                  setLang(langs[nextIndex]);
                }}
                className="flex items-center justify-between w-full py-2.5 px-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-200 group"
                aria-label={`Current language: ${getLangLabel()}`}
                title="Click to switch language"
              >
                <span className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>
                  {getLangLabel()}
                </span>
                <span className="text-xs font-bold" style={{ color: 'var(--text-1)' }}>
                  {lang.toUpperCase()}
                </span>
              </button>

              {/* Theme Toggle Button - Expanded */}
              <button
                onClick={() => {
                  if (!mounted) return;
                  const themes = ['light', 'dark', 'system'];
                  const currentIndex = themes.indexOf(theme || 'system');
                  const nextIndex = (currentIndex + 1) % themes.length;
                  setTheme(themes[nextIndex]);
                }}
                className="flex items-center justify-between w-full py-2.5 px-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-200 group"
                aria-label={mounted ? `Current theme: ${getThemeLabel()}` : 'Theme toggle'}
                title="Click to switch theme"
                style={{ color: 'var(--text-1)' }}
                disabled={!mounted}
              >
                <span className="text-sm font-medium">
                  {getThemeLabel()}
                </span>
                <span>
                  <ThemeIcon size={16} />
                </span>
              </button>
            </div>
          </div>

          {/* Footer - Altura fija sin brinco */}
          <div
            className="sidebar__footer relative border-t border-white/10"
            style={{
              height: 'var(--footer-h)',
              padding: '12px 14px 16px',
            }}
          >
            <div
              className="footer__credit absolute left-[14px] right-[14px] bottom-[12px] whitespace-nowrap overflow-hidden text-ellipsis"
              style={{
                opacity: collapsed ? 0 : 1,
                transform: collapsed ? 'translateY(8px)' : 'translateY(0)',
                transition: 'opacity 0.2s ease, transform 0.3s ease',
                pointerEvents: collapsed ? 'none' : 'auto',
              }}
            >
              <div className="w-full rounded-xl bg-white/5 backdrop-blur-sm border border-white/10" style={{
                padding: 'clamp(0.5rem, 1vw, 0.75rem)',
              }}>
                <div className="flex items-center gap-3">
                  <p className="flex-1 text-center leading-relaxed" style={{
                    fontSize: 'clamp(9px, 0.7vw, 11px)',
                    color: 'var(--text-1)'
                  }}>
                    {content.footer}
                  </p>
                  <a
                    href="/MyCv.pdf"
                    download
                    aria-label="Descargar CV"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition"
                  >
                    <FileText size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
