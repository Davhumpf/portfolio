import React from "react";

export default function SectionPlaceholder({ title }: { title: string }) {
  return (
    <section className="window-section" aria-busy="true">
      <div className="window-panel">
        <header className="window-bar">
          <div className="window-dots" aria-hidden>
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <div className="window-title">
            <span className="text-sm font-semibold">{title}</span>
            <span className="text-xs muted">Cargando...</span>
          </div>
        </header>
        <div className="window-content">
          <div className="h-24 rounded-xl bg-white/5 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
