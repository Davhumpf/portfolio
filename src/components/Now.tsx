"use client";
import Section from "./Section";

export default function Now() {
  return (
    <Section id="now" title="Now()" subtitle="Qué hago este mes.">
      <ul className="text-sm list-disc pl-5 space-y-1">
        <li>Refactor de componentes a slots.</li>
        <li>Animaciones de entrada con GSAP y ScrollTrigger.</li>
        <li>Preparando un artículo sobre accesibilidad de menús.</li>
      </ul>
    </Section>
  );
}
