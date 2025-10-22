"use client";
import dynamic from "next/dynamic";

// Carga diferida del contenedor (evita que pese tu home)
const SkillsPlayground = dynamic(
  () => import("@/components/sections/SkillsPlayground"),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen grid place-items-center text-lg opacity-80">
        Cargando animaciones…
      </div>
    ),
  }
);

export default function SkillsPlaygroundPage() {
  return <SkillsPlayground />;
}
