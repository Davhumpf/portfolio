"use client";
import Section from "./Section";
import { useT } from "@/context/LanguageProvider";

export default function Blog() {
  const t = useT();

  return (
    <Section id="blog" title={t("blog_title")} subtitle={t("blog_subtitle")}>
      <div className="space-y-3">
        <a className="block rounded-xl p-3 ring-1 no-underline hover:opacity-100 opacity-80"
           style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}
           href="#" target="_blank" rel="noopener noreferrer">
          <strong>{t("blog_article1_title")}</strong>
          <div className="text-sm">{t("blog_article1_desc")}</div>
        </a>
        <a className="block rounded-xl p-3 ring-1 no-underline hover:opacity-100 opacity-80"
           style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}
           href="#" target="_blank" rel="noopener noreferrer">
          <strong>{t("blog_article2_title")}</strong>
          <div className="text-sm">{t("blog_article2_desc")}</div>
        </a>
      </div>
    </Section>
  );
}
