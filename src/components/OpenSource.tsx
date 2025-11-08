"use client";
import Section from "./Section";
import { useT } from "@/context/LanguageProvider";

export default function OpenSource() {
  const t = useT();

  return (
    <Section id="opensource" title={t("opensource_title")} subtitle={t("opensource_subtitle")}>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>{t("opensource_item1")}</li>
        <li>{t("opensource_item2")}</li>
      </ul>
    </Section>
  );
}
