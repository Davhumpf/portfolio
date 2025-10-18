"use client";
import { ReactNode } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";

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
    <section id={id} ref={ref} className="mx-auto mt-28 max-w-6xl px-4">
      <div className="card p-8 md:p-10">
        <header className="mb-6">
          <h2 className="sr-item text-2xl font-extrabold md:text-3xl">{title}</h2>
          {subtitle && <p className="sr-item mt-2 muted">{subtitle}</p>}
        </header>
        <div className="sr-fade">{children}</div>
      </div>
    </section>
  );
}
