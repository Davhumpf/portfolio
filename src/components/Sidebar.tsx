'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Home, User, FolderOpen, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import LangMenu from './LangMenu';
import ThemeMenu from './ThemeMenu';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const [lang, setLang] = useState<'en' | 'es'>('es');
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const sidebarContent = {
    en: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      footer: 'Created with ❤️ by Davhumpf'
    },
    es: {
      home: 'Inicio',
      about: 'Sobre mí',
      projects: 'Proyectos',
      contact: 'Contacto',
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
    { id: 'about', href: '#about', icon: <User size={20} />, text: content.about },
    { id: 'projects', href: '#projects', icon: <FolderOpen size={20} />, text: content.projects },
    { id: 'contacts', href: '#contacts', icon: <Mail size={20} />, text: content.contact }
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
    <aside
      ref={sidebarRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`hidden lg:flex fixed left-0 top-0 bottom-0 flex-col justify-between backdrop-blur-xl bg-white/5 border-r border-white/10 transition-all duration-500 ease-in-out ${
        collapsed ? 'py-6 px-3' : 'p-6'
      }`}
      style={{
        width: collapsed ? '4rem' : '16rem',
        zIndex: 10000,
        borderRadius: '0 48px 48px 0',
        isolation: 'isolate', // Create new stacking context
      }}
    >
        {/* Top spacer for balance */}
        <div className="h-4" />

        {/* Navigation - Icons always visible */}
        <nav className="flex-1 space-y-3">
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
                  flex items-center gap-3 py-3 rounded-xl
                  transition-all duration-300 ease-out cursor-pointer
                  ${collapsed ? 'px-2 justify-center' : 'px-3'}
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 shadow-lg'
                    : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                  }
                `}
              >
                <span className={`
                  transition-all duration-200 flex-shrink-0
                  ${isActive ? 'text-blue-400' : 'text-gray-400'}
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
                        text-sm font-medium overflow-hidden whitespace-nowrap
                        ${isActive ? 'text-white' : 'text-gray-300'}
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
          {/* Controls Section - Hidden when collapsed */}
          <AnimatePresence mode="wait">
            {!collapsed && (
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
            )}
          </AnimatePresence>

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
  );
};

export default Sidebar;