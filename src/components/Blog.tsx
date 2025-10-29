"use client";
import Section from "../Section";

export default function Blog() {
  return (
    <Section id="blog" title="Blog" subtitle="Notas cortas, TIL y post-mortems.">
      <div className="space-y-3">
        <a className="block rounded-xl p-3 ring-1 no-underline hover:opacity-100 opacity-80"
           style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}
           href="#" target="_blank" rel="noopener noreferrer">
          <strong>Accesibilidad en componentes de menú</strong>
          <div className="text-sm">Focus trap, roles y teclado.</div>
        </a>
        <a className="block rounded-xl p-3 ring-1 no-underline hover:opacity-100 opacity-80"
           style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}
           href="#" target="_blank" rel="noopener noreferrer">
          <strong>Motion con intención</strong>
          <div className="text-sm">GSAP + prefers-reduced-motion.</div>
        </a>
      </div>
    </Section>
  );
}
