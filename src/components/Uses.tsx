"use client";
import Section from "./Section";
import { useT } from "@/context/LanguageProvider";

export default function Uses() {
  const t = useT();

  return (
    <Section id="uses" title={t("uses_title")} subtitle={t("uses_subtitle")}>
      <div className="grid gap-3 sm:grid-cols-2">

        {/* HARDWARE */}
        <div
          className="rounded-xl p-3 ring-1"
          style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}
        >
          <h4 className="font-semibold mb-1">{t("uses_hardware_title")}</h4>
          <ul className="text-sm list-disc pl-5 leading-relaxed">
            <li>Acer Nitro AN515-58 (2025)</li>
            <li>Intel Core i7-12700H — 14 cores hybrid</li>
            <li>24 GB RAM DDR4</li>
            <li>SSD NVMe 1 TB</li>
            <li>NVIDIA RTX 3060 Laptop GPU</li>
            <li>Monitor externo 27"</li>
            <li>Windows 11 Pro Modified — build 26100</li>
            <li>Killer Wi-Fi 6 AX1650i + Killer E2600 Ethernet</li>
          </ul>
        </div>

        {/* SOFTWARE */}
        <div
          className="rounded-xl p-3 ring-1"
          style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}
        >
          <h4 className="font-semibold mb-1">{t("uses_software_title")}</h4>
          <ul className="text-sm list-disc pl-5 leading-relaxed">
            <li>VS Code — Tema: Tokyo Night / Material Icons</li>
            <li>Figma — UI design, prototyping & auto-layout</li>
            <li>GitHub Desktop + Git CLI</li>
            <li>Arc Browser / Commet Browser</li>
            <li>Notion — documentación / project planning</li>
            <li>Adobe After Effects</li>
            <li>Illustrator / Photoshop (branding & assets)</li>
            <li>Node.js + PNPM / Bun</li>
            <li>Windows Terminal + PowerShell + Starship Prompt</li>
          </ul>
        </div>

      </div>
    </Section>
  );
}
