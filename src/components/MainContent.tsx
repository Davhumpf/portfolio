"use client";

import React from "react";

export default function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main id="top" className="w-full max-w-full overflow-x-hidden relative" style={{
      paddingTop: 'clamp(5rem, 12vw, 6rem)',
      paddingLeft: '0',
      paddingRight: '0',
      zIndex: 1,
    }}>
      <style jsx>{`
        @media (min-width: 1024px) {
          main {
            padding-top: 0 !important;
            padding-left: clamp(16rem, 20vw, 18rem) !important;
          }
        }
      `}</style>
      {children}
    </main>
  );
}
