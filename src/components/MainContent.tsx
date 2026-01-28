"use client";

import React from "react";

export default function MainContent({ children }: { children: React.ReactNode }) {
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
