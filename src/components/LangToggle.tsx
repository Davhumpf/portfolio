"use client";
import { useLang } from "@/context/LanguageProvider";

export default function LangToggle() {
  const { lang, cycle } = useLang();
  return (
    <button onClick={cycle} className="btn-outline h-10" title="ES → EN → DE">
      {lang.toUpperCase()}
    </button>
  );
}
