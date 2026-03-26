"use client";

import React, { useEffect } from "react";

export default function MainContent({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.location.pathname !== "/") return;

    const main = document.getElementById("top");
    if (!main) return;

    const dedupeSections = () => {
      const seen = new Set<string>();
      const sections = main.querySelectorAll<HTMLElement>("section[id]");

      sections.forEach((section) => {
        if (!section.id) return;
        if (seen.has(section.id)) {
          section.remove();
          return;
        }
        seen.add(section.id);
      });
    };

    dedupeSections();

    const observer = new MutationObserver(() => dedupeSections());
    observer.observe(main, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <main id="top" className="w-full max-w-full overflow-x-hidden relative" style={{
      paddingTop: 'clamp(4.5rem, 12vw, 6.5rem)',
      paddingLeft: '0',
      paddingRight: '0',
      zIndex: 1,
    }}>
      <style jsx>{`
        @media (max-width: 360px) {
          main {
            padding-top: clamp(3.5rem, 10vw, 4.5rem) !important;
          }
        }
      `}</style>
      {children}
    </main>
  );
}
