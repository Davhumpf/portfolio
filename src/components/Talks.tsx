"use client";
import Section from "./Section";
import { useT } from "@/context/LanguageProvider";

export default function Talks() {
  const t = useT();

  return (
    <Section id="talks" title={t("talks_title")} subtitle={t("talks_subtitle")}>
      <ul className="space-y-2 text-sm">
        <li><strong>{t("talks_item1")}</strong> — {t("talks_item1_desc")}</li>
        <li><strong>{t("talks_item2")}</strong> — {t("talks_item2_desc")}</li>
      </ul>
    </Section>
  );
}
