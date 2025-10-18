"use client";
import Section from "@/components/Section";
import { useT } from "@/context/LanguageProvider";

export default function Projects() {
  const t = useT();
  const data = [
    { name: t("proj_ui"), tag: "UI Kit", desc: t("proj_ui_desc") },
    { name: t("proj_motion"), tag: "Motion", desc: t("proj_motion_desc") },
    { name: t("proj_i18n"), tag: "DX", desc: t("proj_i18n_desc") },
  ];

  return (
    <Section id="projects" title={t("projects_title")} subtitle={t("projects_sub")}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((p) => (
          <article key={p.name} className="sr-item rounded-2xl ring-1 p-4"
            style={{ background: "var(--panel-alpha)", borderColor: "var(--ring)" }}>
            <div className="text-xs muted">{p.tag}</div>
            <h3 className="mt-1 text-lg font-bold">{p.name}</h3>
            <p className="mt-2 text-sm muted">{p.desc}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
