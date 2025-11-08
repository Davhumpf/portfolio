"use client";
import Section from "./Section";
import { useT } from "@/context/LanguageProvider";

export default function Uses() {
  const t = useT();

  return (
    <Section id="uses" title={t("uses_title")} subtitle={t("uses_subtitle")}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl p-3 ring-1" style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}>
          <h4 className="font-semibold mb-1">{t("uses_hardware_title")}</h4>
          <ul className="text-sm list-disc pl-5">
            <li>{t("uses_hardware_item1")}</li>
            <li>{t("uses_hardware_item2")}</li>
          </ul>
        </div>
        <div className="rounded-xl p-3 ring-1" style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}>
          <h4 className="font-semibold mb-1">{t("uses_software_title")}</h4>
          <ul className="text-sm list-disc pl-5">
            <li>{t("uses_software_item1")}</li>
            <li>{t("uses_software_item2")}</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
