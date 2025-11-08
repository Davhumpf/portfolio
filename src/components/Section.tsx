"use client";
import { ReactNode } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";

// Section component - Wrapper reutilizable para las secciones del portfolio
export default function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  const ref = useSectionReveal();

  return (
    <section id={id} ref={ref} className="w-full max-w-6xl mx-auto overflow-hidden" style={{
      marginTop: 'clamp(3rem, 8vw, 7rem)',
      paddingLeft: 'clamp(0.75rem, 2vw, 1rem)',
      paddingRight: 'clamp(0.75rem, 2vw, 1rem)',
    }}>
      <div className="card w-full" style={{
        padding: 'clamp(1rem, 3vw, 2.5rem)',
      }}>
        <header style={{
          marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
        }}>
          <h2 className="sr-item font-extrabold" style={{
            fontSize: 'clamp(1.25rem, 4vw, 1.875rem)',
          }}>{title}</h2>
          {subtitle && <p className="sr-item muted" style={{
            marginTop: 'clamp(0.375rem, 1vw, 0.5rem)',
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
          }}>{subtitle}</p>}
        </header>
        <div className="sr-fade w-full max-w-full overflow-hidden">{children}</div>
      </div>
    </section>
  );
}
