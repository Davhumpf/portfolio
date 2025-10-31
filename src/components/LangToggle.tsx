"use client";
import { useLang, type Lang } from "@/context/LanguageProvider";

export default function LangToggle() {
  const { lang, setLang } = useLang();
  
  const cycle = () => {
    const languages: Lang[] = ['es', 'en', 'de'];
    const currentIndex = languages.indexOf(lang);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLang(languages[nextIndex]);
  };
  
  return (
    <button onClick={cycle} className="btn-outline h-10" title="ES → EN → DE">
      {lang.toUpperCase()}
    </button>
  );
}