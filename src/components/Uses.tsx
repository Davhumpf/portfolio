"use client";
import Section from "./Section";
import { useLang, useT } from "@/context/LanguageProvider";

export default function Uses() {
  const t = useT();
  const { lang } = useLang();

  const copy = {
    es: {
      hardware: [
        "Acer Nitro AN515-58 (2025)",
        "Intel Core i7-12700H - 14 nucleos hibridos",
        "24 GB RAM DDR4",
        "SSD NVMe 1 TB",
        "NVIDIA RTX 3060 Laptop GPU",
        'Monitor externo 27"',
        "Windows 11 Pro Modified - build 26100",
        "Killer Wi-Fi 6 AX1650i + Killer E2600 Ethernet",
      ],
      software: [
        "VS Code - tema: Tokyo Night / Material Icons",
        "Figma - diseno UI, prototipado y auto-layout",
        "GitHub Desktop + Git CLI",
        "Arc Browser / Commet Browser",
        "Notion - documentacion / project planning",
        "Adobe After Effects",
        "Illustrator / Photoshop (branding y assets)",
        "Node.js + PNPM / Bun",
        "Windows Terminal + PowerShell + Starship Prompt",
      ],
    },
    en: {
      hardware: [
        "Acer Nitro AN515-58 (2025)",
        "Intel Core i7-12700H - 14 hybrid cores",
        "24 GB DDR4 RAM",
        "1 TB NVMe SSD",
        "NVIDIA RTX 3060 Laptop GPU",
        '27" external monitor',
        "Windows 11 Pro Modified - build 26100",
        "Killer Wi-Fi 6 AX1650i + Killer E2600 Ethernet",
      ],
      software: [
        "VS Code - theme: Tokyo Night / Material Icons",
        "Figma - UI design, prototyping and auto layout",
        "GitHub Desktop + Git CLI",
        "Arc Browser / Commet Browser",
        "Notion - documentation / project planning",
        "Adobe After Effects",
        "Illustrator / Photoshop (branding and assets)",
        "Node.js + PNPM / Bun",
        "Windows Terminal + PowerShell + Starship Prompt",
      ],
    },
    de: {
      hardware: [
        "Acer Nitro AN515-58 (2025)",
        "Intel Core i7-12700H - 14 hybride Kerne",
        "24 GB DDR4 RAM",
        "1 TB NVMe SSD",
        "NVIDIA RTX 3060 Laptop GPU",
        '27" externer Monitor',
        "Windows 11 Pro Modified - Build 26100",
        "Killer Wi-Fi 6 AX1650i + Killer E2600 Ethernet",
      ],
      software: [
        "VS Code - Theme: Tokyo Night / Material Icons",
        "Figma - UI-Design, Prototyping und Auto-Layout",
        "GitHub Desktop + Git CLI",
        "Arc Browser / Commet Browser",
        "Notion - Dokumentation / Projektplanung",
        "Adobe After Effects",
        "Illustrator / Photoshop (Branding und Assets)",
        "Node.js + PNPM / Bun",
        "Windows Terminal + PowerShell + Starship Prompt",
      ],
    },
  } as const;

  const content = copy[lang];

  return (
    <Section id="uses" title={t("uses_title")} subtitle={t("uses_subtitle")}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div
          className="rounded-xl p-3 ring-1"
          style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}
        >
          <h4 className="font-semibold mb-1">{t("uses_hardware_title")}</h4>
          <ul className="text-sm list-disc pl-5 leading-relaxed">
            {content.hardware.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-xl p-3 ring-1"
          style={{ borderColor: "var(--ring)", background: "var(--panel-alpha)" }}
        >
          <h4 className="font-semibold mb-1">{t("uses_software_title")}</h4>
          <ul className="text-sm list-disc pl-5 leading-relaxed">
            {content.software.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
