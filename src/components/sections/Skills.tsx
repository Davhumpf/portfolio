"use client";
import Section from "@/components/Section";
import { useRouter } from "next/navigation";
import { useT } from "@/context/LanguageProvider";

export default function Skills() {
  const t = useT();
  const router = useRouter();

  return (
    <Section id="skills" title={t("skills_title")} subtitle={t("skills_sub")}>
      {/* Botón "glass/outline" acorde a tu UI */}
      <div className="text-center">
        <button
          onClick={() => router.push("/skills-playground")}
          className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 ring-1 transition
                     hover:translate-y-[-1px]"
          style={{
            background: "color-mix(in oklab, var(--panel-alpha) 70%, transparent)",
            borderColor: "var(--ring)",
            color: "var(--fg)",
            boxShadow: "0 8px 30px -12px color-mix(in oklab, var(--accent) 40%, transparent)",
          }}
        >
          <span className="i">🧪</span>
          <span className="font-semibold">Abrir Playground de Animaciones</span>
          <span
            className="ml-1 inline-block"
            style={{ color: "var(--accent)" }}
          >
            → 
          </span>
        </button>
      </div>
    </Section>
  );
}