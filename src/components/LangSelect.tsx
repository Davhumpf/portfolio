"use client";
import { useLang, Lang } from "@/context/LanguageProvider";

const options: { value: Lang; label: string }[] = [
  { value: "es", label: "Español" },
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
];

export default function LangSelect() {
  const { lang, setLang } = useLang();

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="muted">Idioma</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
        className="rounded-xl bg-transparent px-3 py-2 ring-1 transition focus:outline-none"
        style={{ borderColor: "transparent", boxShadow: "none", WebkitAppearance: "none" }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[var(--panel)] text-[var(--text)]">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
