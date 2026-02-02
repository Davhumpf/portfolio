"use client";

import React from "react";

export default function SectionPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="window-stack">
      {children}
      <footer className="mx-auto my-20 max-w-6xl px-4 text-sm muted">
        © {new Date().getFullYear()} David — UI/Frontend
      </footer>
    </div>
  );
}
