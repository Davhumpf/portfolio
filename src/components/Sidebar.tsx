'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, FolderOpen, Mail, Clock, FileText, GitBranch, BookOpen, Mic, Wrench, Calendar, Sun, Moon, Laptop } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { useLang, type Lang } from '@/context/LanguageProvider';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const { lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

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
    switch (theme) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      case 'system': return 'System';
      default: return 'System';
    }
  };

  // Auto-expand on hover with smooth transition
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

  // GSAP animations - isolated to nav items only
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only animate nav items, not the entire sidebar
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
          clearProps: 'all', // Clear all inline styles after animation
        }
      );
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
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
            {/* Icon-only buttons - Always visible */}
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
                  const themes = ['light', 'dark', 'system'];
                  const currentIndex = themes.indexOf(theme || 'system');
                  const nextIndex = (currentIndex + 1) % themes.length;
                  setTheme(themes[nextIndex]);
                }}
                className="flex items-center justify-center w-full py-2.5 px-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-200"
                aria-label={`Current theme: ${theme || 'system'}`}
                title={`Switch theme (${theme || 'system'})`}
                style={{ color: 'var(--text-1)' }}
              >
                {theme === 'light' ? (
                  <Sun size={18} />
                ) : theme === 'dark' ? (
                  <Moon size={18} />
                ) : (
                  <Laptop size={18} />
                )}
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
                  const themes = ['light', 'dark', 'system'];
                  const currentIndex = themes.indexOf(theme || 'system');
                  const nextIndex = (currentIndex + 1) % themes.length;
                  setTheme(themes[nextIndex]);
                }}
                className="flex items-center justify-between w-full py-2.5 px-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-200 group"
                aria-label={`Current theme: ${getThemeLabel()}`}
                title="Click to switch theme"
                style={{ color: 'var(--text-1)' }}
              >
                <span className="text-sm font-medium">
                  {getThemeLabel()}
                </span>
                <span>
                  {theme === 'light' ? (
                    <Sun size={16} />
                  ) : theme === 'dark' ? (
                    <Moon size={16} />
                  ) : (
                    <Laptop size={16} />
                  )}
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
                <p className="text-center leading-relaxed" style={{
                  fontSize: 'clamp(9px, 0.7vw, 11px)',
                  color: 'var(--text-1)'
                }}>
                  {content.footer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;