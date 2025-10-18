"use client";
import { useLang } from "@/context/LanguageProvider";

export default function LangToggle() {
  const { lang, setLang } = useLang();
  
  const cycle = () => {
    const languages = ['es', 'en', 'de'] as const;
    const currentIndex = languages.indexOf(lang);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLang(languages[nextIndex] as any);
  };
  
  return (
    <button onClick={cycle} className="btn-outline h-10" title="ES → EN → DE">
      {lang.toUpperCase()}
    </button>
  );
}