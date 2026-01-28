"use client";
import { ReactNode } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: {
  id: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}) {
  const ref = useSectionReveal();

  return (
    <section
      id={id}
      ref={ref}
      className={`window-section ${className}`}
    >
      <div className="window-panel">
        <header className="window-bar">
          <div className="window-dots" aria-hidden>
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <div className="window-title">
            <h2 className="sr-item font-semibold">{title}</h2>
            {subtitle && <p className="sr-item muted text-sm">{subtitle}</p>}
          </div>
        </header>
        <div className="window-content sr-fade">{children}</div>
      </div>
    </section>
  );
}
