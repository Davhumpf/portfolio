"use client";
import Section from "../Section";

export default function OpenSource() {
  return (
    <Section id="opensource" title="Open Source" subtitle="PRs, issues y paquetes publicados.">
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>Contribución a <code>awesome-animations</code> — ejemplo GSAP/ARIA.</li>
        <li>Paquete <code>@dreamincode/use-keypress</code> — hook de accesibilidad.</li>
      </ul>
    </Section>
  );
}
