"use client";
import Section from "@/components/Section";
import { useT } from "@/context/LanguageProvider";

export default function Skills() {
  const t = useT();
  const blocks = [
    { title: t("skills_frontend"), list: ["React", "Next.js", "TypeScript", "Tailwind", "GSAP"] },
    { title: t("skills_quality"), list: ["Accessibility", "Performance", "Design systems"] },
    { title: t("skills_tools"), list: ["Figma", "Storybook", "Git"] },
  ];

  return (
    <Section id="skills" title={t("skills_title")} subtitle={t("skills_sub")}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map((b) => (
          <div key={b.title} className="sr-item rounded-2xl ring-1 p-4"
            style={{ background: "var(--panel-alpha)", borderColor: "var(--ring)" }}>
            <h4 className="font-semibold">{b.title}</h4>
            <ul className="mt-2 space-y-1 text-sm muted">
              {b.list.map((x) => <li key={x}>• {x}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
