"use client";
import Section from "../Section";

export default function CaseStudies() {
  return (
    <Section id="cases" title="Casos de estudio" subtitle="Problema → Proceso → Impacto.">
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl p-4 ring-1" style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}>
          <h4 className="font-semibold">Checkout UX</h4>
          <p className="text-sm opacity-80">Rediseño redujo el abandono 18%. Focus visible, validaciones, motion sutil.</p>
        </article>
        <article className="rounded-xl p-4 ring-1" style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}>
          <h4 className="font-semibold">Design System</h4>
          <p className="text-sm opacity-80">Tokens, dark mode y 26 componentes; -35% tiempo de entrega.</p>
        </article>
      </div>
    </Section>
  );
}
