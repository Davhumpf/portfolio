"use client";
import Section from "../Section";

export default function Timeline() {
  return (
    <Section id="timeline" title="Experiencia" subtitle="Línea de tiempo con hitos clave.">
      <ul className="space-y-4">
        <li>
          <h4 className="font-semibold">2025 — Presente · Frontend Dev</h4>
          <p className="text-sm opacity-80">React/Next, TypeScript, GSAP. UI accesible y microinteracciones.</p>
        </li>
        <li>
          <h4 className="font-semibold">2023 — 2024 · Full-stack Jr</h4>
          <p className="text-sm opacity-80">Node, REST, CI/CD. Diseño de componentes reutilizables.</p>
        </li>
      </ul>
    </Section>
  );
}
