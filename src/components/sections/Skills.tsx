"use client";
import Section from "@/components/Section";
import { useT } from "@/context/LanguageProvider";

export default function Skills() {
  const t = useT();

  return (
    <Section id="skills" title={t("skills_title")} subtitle={t("skills_sub")}>
      {/* Skills content can be added here */}
    </Section>
  );
}