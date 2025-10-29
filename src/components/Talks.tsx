"use client";
import Section from "../Section";

export default function Talks() {
  return (
    <Section id="talks" title="Charlas & Workshops" subtitle="Slides y grabaciones.">
      <ul className="space-y-2 text-sm">
        <li><strong>Motion accesible</strong> — meetup React (slides + video).</li>
        <li><strong>Design tokens</strong> — taller 90’ (repo público).</li>
      </ul>
    </Section>
  );
}
