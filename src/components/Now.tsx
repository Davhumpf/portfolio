"use client";
import Section from "./Section";
import { useT } from "@/context/LanguageProvider";

export default function Now() {
  const t = useT();

  return (
    <Section id="now" title={t("now_title")} subtitle={t("now_subtitle")}>
      <ul className="text-sm list-disc pl-5 space-y-1 leading-relaxed">
        <li>{t("now_item1")}</li>
        <li>{t("now_item2")}</li>
        <li>{t("now_item3")}</li>
        <li>{t("now_item4")}</li>
        <li>{t("now_item5")}</li>
      </ul>
    </Section>
  );
}
