"use client";
import Section from "./Section";
import SkillsPlayground from "./sections/SkillsPlayground";

export default function Playground() {
  return (
    <Section id="playground" title="Playground" subtitle="Demos rápidas y experimentos UI.">
      <SkillsPlayground />
    </Section>
  );
}
