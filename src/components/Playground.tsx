"use client";
import Section from "./Section";
import SkillsPlayground from "./SkillsPlayground"; // si usas /sections/SkillsPlayground/index.tsx

export default function Playground() {
  return (
    <Section id="playground" title="Playground" subtitle="Demos rápidas y experimentos UI.">
      <SkillsPlayground />
    </Section>
  );
}
