'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, FolderOpen, Mail, Clock, FileText, GitBranch, BookOpen, Mic, Wrench, Calendar, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { useLang, type Lang } from '@/context/LanguageProvider';
import LangMenu from './LangMenu';
import ThemeMenu from './ThemeMenu';

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
        className="hidden lg:flex fixed left-0 top-0 bottom-0 flex-col justify-between backdrop-blur-xl bg-white/5 border-r border-white/10 transition-all duration-500 ease-in-out"
        style={{
          width: collapsed ? '4.5rem' : '14rem',
          zIndex: 10000,
          borderRadius: '0 32px 32px 0',
          isolation: 'isolate',
          padding: '1.25rem 0.75rem',
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
                  relative flex items-center gap-3 rounded-lg
                  transition-all duration-300 ease-out cursor-pointer group
                  ${collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'}
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
                  transition-all duration-200 flex items-center justify-center
                  ${collapsed ? 'w-5 h-5' : 'w-5 h-5 flex-shrink-0'}
                  ${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300'}
                `}>
                  {item.icon}
                </span>

                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className={`
                        text-xs font-medium overflow-hidden whitespace-nowrap
                        ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}
                      `}
                    >
                      {item.text}
                    </motion.span>
                  )}
                </AnimatePresence>
              </a>
            );
          })}
        </nav>

        {/* Bottom Section - Controls + Footer */}
        <div className="space-y-4">
          {/* Controls Section */}
          {collapsed ? (
            /* Collapsed: Icon-only buttons */
            <div className="flex flex-col gap-2">
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
                <span className="text-xs font-bold text-gray-300">
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
              >
                {theme === 'light' ? (
                  <Sun size={18} className="text-gray-300" />
                ) : (
                  <Moon size={18} className="text-gray-300" />
                )}
              </button>
            </div>
          ) : (
            /* Expanded: Dropdown menus */
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="space-y-3"
                style={{
                  position: 'relative',
                  zIndex: 10002, // Higher than sidebar
                }}
              >
                <LangMenu />
                <ThemeMenu />
              </motion.div>
            </AnimatePresence>
          )}

          {/* Footer - Hidden when collapsed */}
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
                className="pt-4 border-t border-white/10"
              >
                <div className="w-full p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <p className="text-[11px] text-center text-gray-400 leading-relaxed">
                    {content.footer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;