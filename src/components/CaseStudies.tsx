"use client";
import Section from "./Section";
import { useT } from "@/context/LanguageProvider";

export default function CaseStudies() {
  const t = useT();

  const caseStudies = [
    {
      title: t("case1_title"),
      problem: t("case1_problem"),
      process: t("case1_process"),
      impact: t("case1_impact")
    },
    {
      title: t("case2_title"),
      problem: t("case2_problem"),
      process: t("case2_process"),
      impact: t("case2_impact")
    },
    {
      title: t("case3_title"),
      problem: t("case3_problem"),
      process: t("case3_process"),
      impact: t("case3_impact")
    },
    {
      title: t("case4_title"),
      problem: t("case4_problem"),
      process: t("case4_process"),
      impact: t("case4_impact")
    },
    {
      title: t("case5_title"),
      problem: t("case5_problem"),
      process: t("case5_process"),
      impact: t("case5_impact")
    },
    {
      title: t("case6_title"),
      problem: t("case6_problem"),
      process: t("case6_process"),
      impact: t("case6_impact")
    }
  ];

  return (
    <Section id="cases" title={t("cases_title")} subtitle={t("cases_subtitle")}>
      <div
        className="max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400/30 hover:scrollbar-thumb-gray-400/50"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(156, 163, 175, 0.3) transparent'
        }}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {caseStudies.map((study, index) => (
            <article
              key={index}
              className="rounded-xl p-6 ring-1 hover:ring-2 transition-all duration-300"
              style={{
                borderColor: "var(--ring)",
                background: "var(--panel-alpha)"
              }}
            >
              <h3 className="font-bold text-lg mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                {study.title}
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 flex items-start">
                    <span className="mr-2 text-red-500">•</span>
                    <span>{t("cases_problem_label")}</span>
                  </h4>
                  <p className="opacity-80 ml-4">
                    {study.problem}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-start">
                    <span className="mr-2 text-yellow-500">•</span>
                    <span>{t("cases_process_label")}</span>
                  </h4>
                  <p className="opacity-80 ml-4">
                    {study.process}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-start">
                    <span className="mr-2 text-green-500">•</span>
                    <span>{t("cases_impact_label")}</span>
                  </h4>
                  <p className="opacity-80 ml-4">
                    {study.impact}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
