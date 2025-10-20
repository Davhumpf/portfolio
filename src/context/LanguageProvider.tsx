"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "es" | "en" | "de";

type Messages = {
  brand: string;
  about: string;
  projects: string;
  skills: string;
  contacts: string;
  // Hero
  hero_hello: string;
  hero_im: string;
  hero_role: string;
  hero_name: string;
  hero_tagline_1: string; // "Diseñando el futuro"
  hero_tagline_2: string; // "del"
  hero_tagline_3: string; // "software"
  // About
  about_title: string;
  about_sub: string;
  about_p1: string;
  about_p2: string;
  // Projects
  projects_title: string;
  projects_sub: string;
  proj_ui: string; proj_ui_desc: string;
  proj_motion: string; proj_motion_desc: string;
  proj_i18n: string; proj_i18n_desc: string;
  // Skills
  skills_title: string;
  skills_sub: string;
  skills_frontend: string;
  skills_quality: string;
  skills_tools: string;
  // Contacts
  contacts_title: string;
  contacts_sub: string;
  form_name: string; form_email: string; form_msg: string; form_send: string;
};

const messages: Record<Lang, Messages> = {
  es: {
    brand: "<DreamInCode />",
    about: "Sobre mi",
    projects: "Proyectos",
    skills: "Habilidades",
    contacts: "Contactos",
    hero_hello: "¡Hola!",
    hero_im: "Yo soy",
    hero_role: "Software Developer",
    hero_name: "David",
    hero_tagline_1: "Diseñando el futuro",
    hero_tagline_2: "del",
    hero_tagline_3: "software",

    about_title: "Sobre mi",
    about_sub: "UI & Frontend — enfoque en detalle y armonía diseño/función.",
    about_p1: "Me gusta construir interfaces limpias, accesibles y con microinteracciones sutiles. Trabajo con React/Next, TypeScript y GSAP.",
    about_p2: "Valoro la consistencia visual, el rendimiento y el cuidado por el usuario final. En este micro-portfolio iré agregando ejemplos y prácticas de UI.",

    projects_title: "Proyectos",
    projects_sub: "Muestras rápidas — luego enlazamos a repos o demos.",
    proj_ui: "DreamInCode UI",
    proj_ui_desc: "Componentes y patrones pastel/dark listos para producción.",
    proj_motion: "GSAP Lab",
    proj_motion_desc: "Microinteracciones y transiciones aplicadas a UI real.",
    proj_i18n: "i18n Starter",
    proj_i18n_desc: "Estructura mínima para sitios multilenguaje con Context.",

    skills_title: "Habilidades",
    skills_sub: "Stack principal y áreas donde más aporto.",
    skills_frontend: "Frontend",
    skills_quality: "Calidad",
    skills_tools: "Herramientas",

    contacts_title: "Contactos",
    contacts_sub: "¿Charlamos? Deja un mensaje o conecta por tus redes.",
    form_name: "Tu nombre",
    form_email: "Email",
    form_msg: "Mensaje",
    form_send: "Enviar",
  },
  en: {
    brand: "<DreamInCode />",
    about: "About",
    projects: "Projects",
    skills: "Skills",
    contacts: "Contact",
    hero_hello: "Hello!",
    hero_im: "I am",
    hero_role: "Software Developer",
    hero_name: "David",
    hero_tagline_1: "Designing the future",
    hero_tagline_2: "of",
    hero_tagline_3: "software",

    about_title: "About me",
    about_sub: "UI & Frontend — detail-oriented, harmony between design & function.",
    about_p1: "I build clean, accessible interfaces with subtle micro-interactions. I work with React/Next, TypeScript and GSAP.",
    about_p2: "I care about visual consistency, performance and user delight. This micro-portfolio will grow with UI experiments.",

    projects_title: "Projects",
    projects_sub: "Quick samples — we'll link repos/demos soon.",
    proj_ui: "DreamInCode UI",
    proj_ui_desc: "Pastel/dark components & patterns ready for production.",
    proj_motion: "GSAP Lab",
    proj_motion_desc: "Micro-interactions & transitions applied to real UI.",
    proj_i18n: "i18n Starter",
    proj_i18n_desc: "Minimal multi-language structure using Context.",

    skills_title: "Skills",
    skills_sub: "Main stack and where I add the most value.",
    skills_frontend: "Frontend",
    skills_quality: "Quality",
    skills_tools: "Tools",

    contacts_title: "Contact",
    contacts_sub: "Let's talk! Send a message or connect.",
    form_name: "Your name",
    form_email: "Email",
    form_msg: "Message",
    form_send: "Send",
  },
  de: {
    brand: "<DreamInCode />",
    about: "Über mich",
    projects: "Projekte",
    skills: "Fähigkeiten",
    contacts: "Kontakt",
    hero_hello: "Hallo!",
    hero_im: "Ich bin",
    hero_role: "Softwareentwickler",
    hero_name: "David",
    hero_tagline_1: "Die Zukunft der Software",
    hero_tagline_2: "wird",
    hero_tagline_3: "gestaltet",

    about_title: "Über mich",
    about_sub: "UI & Frontend — Fokus auf Details und Balance zwischen Design & Funktion.",
    about_p1: "Ich baue klare, zugängliche Interfaces mit subtilen Mikro-Interaktionen. Ich arbeite mit React/Next, TypeScript und GSAP.",
    about_p2: "Wichtig sind mir visuelle Konsistenz, Performance und Freude am Produkt. Dieses Mikro-Portfolio wächst mit UI-Experimenten.",

    projects_title: "Projekte",
    projects_sub: "Schnelle Beispiele — Repos/Demos folgen.",
    proj_ui: "DreamInCode UI",
    proj_ui_desc: "Pastell/Dark-Komponenten & Patterns für die Produktion.",
    proj_motion: "GSAP Lab",
    proj_motion_desc: "Mikro-Interaktionen & Übergänge in echter UI.",
    proj_i18n: "i18n Starter",
    proj_i18n_desc: "Minimale Mehrsprachen-Struktur mit Context.",

    skills_title: "Fähigkeiten",
    skills_sub: "Hauptstack und Bereiche mit größtem Mehrwert.",
    skills_frontend: "Frontend",
    skills_quality: "Qualität",
    skills_tools: "Tools",

    contacts_title: "Kontakt",
    contacts_sub: "Lass uns sprechen! Nachricht senden oder verbinden.",
    form_name: "Dein Name",
    form_email: "E-Mail",
    form_msg: "Nachricht",
    form_send: "Senden",
  },
};

type LangContext = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof Messages) => string;
};

const LanguageContext = createContext<LangContext>({
  lang: "es",
  setLang: () => {},
  t: (k) => k as string,
});

export function useLang() { return useContext(LanguageContext); }
export function useT() { return useLang().t as (key: keyof Messages) => string; }

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (saved && ["es","en","de"].includes(saved)) setLang(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("lang", lang);
  }, [lang]);

  const t = (key: keyof Messages) => messages[lang][key] ?? (key as string);
  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}