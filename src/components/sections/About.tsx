"use client";
import Section from "@/components/Section";
import { useT } from "@/context/LanguageProvider";

export default function About() {
  const t = useT();
  return (
    <Section id="about" title={t("about_title")} subtitle={t("about_sub")}>
      <div className="prose prose-invert max-w-none">
        <p className="sr-item">{t("about_p1")}</p>
        <p className="sr-item mt-4">{t("about_p2")}</p>
      </div>
    </Section>
  );
}
