"use client";
import Dropdown from "./Dropdown";
import { useLang, type Lang } from "@/context/LanguageProvider";

const LANGS: { value: Lang; label: string }[] = [
  { value: "es", label: "Español" },
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
];

export default function LangMenu() {
  const { lang, setLang } = useLang();
  return (
    <Dropdown
      ariaLabel="Cambiar idioma"
      value={lang}
      items={LANGS}
      onChange={(v) => setLang(v as Lang)}
    />
  );
}
