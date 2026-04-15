"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useLang, useT } from "@/context/LanguageProvider";
import { Download, Globe, Menu, Monitor, Moon, Search, Sun, X } from "lucide-react";

const LANGS = ["es", "en", "de"] as const;
const PLACEHOLDER_MESSAGES_BY_LANG: Record<(typeof LANGS)[number], string[]> = {
  es: [
    "Pregunta aquí tus dudas",
    "quiero ver tus proyectos de frontend",
    "muéstrame tu experiencia",
    "dónde puedo contactarte",
    "abre tus casos de estudio",
  ],
  en: [
    "Ask your question",
    "show me your frontend projects",
    "show me your experience",
    "how can I contact you",
    "open your case studies",
  ],
  de: [
    "Frage hier",
    "zeige mir deine Frontend Projekte",
    "zeige mir deine Erfahrung",
    "wie kann ich dich kontaktieren",
    "oeffne deine Fallstudien",
  ],
};

const INTENT_KEYWORDS_BY_LANG: Record<
  (typeof LANGS)[number],
  Record<Exclude<SectionId, "home">, string[]>
> = {
  es: {
    about: ["sobre mi", "sobre mí", "perfil", "quien eres", "quién eres", "resumen", "bio"],
    projects: ["proyecto", "proyectos", "portfolio", "trabajos", "apps", "nova", "itia", "miza", "frontend"],
    timeline: ["experiencia", "trayectoria", "historia", "recorrido", "carrera"],
    cases: ["caso", "casos", "estudio", "impacto", "problema", "proceso", "resultado"],
    opensource: ["github", "open source", "repos", "repositorios", "codigo", "código", "code"],
    blog: ["blog", "articulos", "artículos", "posts", "notas", "aprendizaje"],
    talks: ["charlas", "eventos", "seminario", "seminarios", "conferencia", "workshop"],
    uses: ["uses", "setup", "herramientas", "tools", "hardware", "software", "stack"],
    now: ["now", "actual", "ahora", "actualmente", "trabajando", "roadmap"],
    contacts: ["contacto", "contactos", "email", "correo", "linkedin", "whatsapp", "hablar"],
  },
  en: {
    about: ["about", "profile", "who are you", "summary", "bio"],
    projects: ["project", "projects", "portfolio", "work", "apps", "nova", "itia", "miza", "frontend"],
    timeline: ["experience", "timeline", "career", "journey", "background"],
    cases: ["case", "cases", "study", "impact", "problem", "process", "result"],
    opensource: ["github", "open source", "repos", "repositories", "code"],
    blog: ["blog", "articles", "posts", "notes", "writing", "learning"],
    talks: ["talks", "events", "seminar", "conference", "workshop"],
    uses: ["uses", "setup", "tools", "hardware", "software", "stack"],
    now: ["now", "current", "currently", "working", "roadmap"],
    contacts: ["contact", "contacts", "email", "linkedin", "whatsapp", "talk"],
  },
  de: {
    about: ["uber mich", "über mich", "profil", "wer bist du", "bio", "zusammenfassung"],
    projects: ["projekt", "projekte", "portfolio", "arbeiten", "apps", "nova", "itia", "miza", "frontend"],
    timeline: ["erfahrung", "laufbahn", "reise", "hintergrund", "karriere"],
    cases: ["fall", "fallstudie", "fallstudien", "problem", "prozess", "ergebnis", "wirkung"],
    opensource: ["github", "open source", "repos", "repositories", "code", "beitrage", "beiträge"],
    blog: ["blog", "artikel", "posts", "notizen", "lernen", "lerninhalte"],
    talks: ["vortrage", "vorträge", "events", "seminar", "konferenz", "workshop"],
    uses: ["uses", "setup", "werkzeuge", "tools", "hardware", "software", "stack"],
    now: ["now", "aktuell", "gerade", "derzeit", "arbeite", "roadmap"],
    contacts: ["kontakt", "kontakte", "email", "linkedin", "whatsapp", "sprechen"],
  },
};
const HEADER_UI_BY_LANG: Record<
  (typeof LANGS)[number],
  {
    openMenu: string;
    search: string;
    go: string;
    changeLanguage: string;
    changeTheme: string;
    downloadCv: string;
    goToSection: string;
    noIntent: string;
    recommendedSectionPrefix: string;
    aboutHint: string;
    projectsHint: string;
    timelineHint: string;
    casesHint: string;
    openSourceHint: string;
    blogHint: string;
    talksHint: string;
    usesHint: string;
    nowHint: string;
    contactsHint: string;
  }
> = {
  es: {
    openMenu: "Abrir menu",
    search: "Buscar",
    go: "Ir",
    changeLanguage: "Cambiar idioma",
    changeTheme: "Cambiar tema",
    downloadCv: "Descargar CV",
    goToSection: "Ir a seccion",
    noIntent: "Te puedo guiar a Proyectos, Experiencia, Casos, Código abierto, Blog, Charlas, Setup, Ahora o Contactos.",
    recommendedSectionPrefix: "Seccion recomendada",
    aboutHint: "Perfil profesional, enfoque y stack base.",
    projectsHint: "Proyectos principales y estado actual.",
    timelineHint: "Trayectoria academica y profesional.",
    casesHint: "Problema, proceso y resultados de casos reales.",
    openSourceHint: "Repositorios y aportes publicos.",
    blogHint: "Notas tecnicas y aprendizajes.",
    talksHint: "Charlas, eventos y formacion continua.",
    usesHint: "Hardware y software de trabajo.",
    nowHint: "En que esta trabajando actualmente.",
    contactsHint: "Canales de contacto directo.",
  },
  en: {
    openMenu: "Open menu",
    search: "Search",
    go: "Go",
    changeLanguage: "Change language",
    changeTheme: "Change theme",
    downloadCv: "Download CV",
    goToSection: "Go to section",
    noIntent: "I can guide you to Projects, Experience, Case Studies, Open Source, Blog, Talks, Uses, Now or Contact.",
    recommendedSectionPrefix: "Recommended section",
    aboutHint: "Professional profile, focus and core stack.",
    projectsHint: "Main projects and current status.",
    timelineHint: "Academic and professional journey.",
    casesHint: "Problem, process and outcomes from real cases.",
    openSourceHint: "Repositories and public contributions.",
    blogHint: "Technical notes and lessons learned.",
    talksHint: "Talks, events and continuous learning.",
    usesHint: "Work hardware and software.",
    nowHint: "What I'm currently working on.",
    contactsHint: "Direct contact channels.",
  },
  de: {
    openMenu: "Menue oeffnen",
    search: "Suchen",
    go: "Los",
    changeLanguage: "Sprache wechseln",
    changeTheme: "Design wechseln",
    downloadCv: "CV herunterladen",
    goToSection: "Zum Bereich",
    noIntent: "Ich kann dich zu Projekten, Erfahrung, Fallstudien, Open-Source, Artikel, Vortraegen, Setup, Aktuell oder Kontakt fuehren.",
    recommendedSectionPrefix: "Empfohlener Bereich",
    aboutHint: "Berufsprofil, Fokus und Kern-Stack.",
    projectsHint: "Hauptprojekte und aktueller Status.",
    timelineHint: "Akademischer und beruflicher Werdegang.",
    casesHint: "Problem, Prozess und Ergebnisse realer Fallstudien.",
    openSourceHint: "Repositories und oeffentliche Beitraege.",
    blogHint: "Technische Notizen und Learnings.",
    talksHint: "Vortraege, Events und kontinuierliches Lernen.",
    usesHint: "Hardware und Software im Arbeitsalltag.",
    nowHint: "Woran aktuell gearbeitet wird.",
    contactsHint: "Direkte Kontaktkanaele.",
  },
};

type SectionId =
  | "home"
  | "about"
  | "projects"
  | "timeline"
  | "cases"
  | "contacts"
  | "opensource"
  | "blog"
  | "talks"
  | "uses"
  | "now";

type NavItem = {
  id: string;
  label: string;
  href: string;
  sectionId?: SectionId;
  external?: boolean;
  download?: boolean;
};

type Intent = {
  id: string;
  sectionId: SectionId;
  label: string;
  hint: string;
  keywords: string[];
};

function normalizeText(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(input: string) {
  return normalizeText(input).split(" ").filter(Boolean);
}

export default function Header() {
  const t = useT();
  const { lang, setLang } = useLang();
  const ui = HEADER_UI_BY_LANG[lang];
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [assistantText, setAssistantText] = useState("");
  const [suggestedSection, setSuggestedSection] = useState<SectionId | null>(null);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => setMounted(true), []);

  const navItems = useMemo<NavItem[]>(
    () => [
      { id: "home", label: t("nav_home"), href: "/", sectionId: "home" },
      { id: "about", label: t("about"), href: "/about", sectionId: "about" },
      { id: "projects", label: t("projects"), href: "/projects", sectionId: "projects" },
      { id: "timeline", label: t("experience") ?? "Experiencia", href: "/experience", sectionId: "timeline" },
      { id: "cases", label: t("caseStudies") ?? "Casos", href: "/case-studies", sectionId: "cases" },
      { id: "contacts", label: t("contacts"), href: "/contacts", sectionId: "contacts" },
      { id: "opensource", label: t("opensource_title"), href: "/open-source", sectionId: "opensource" },
      { id: "blog", label: t("blog_title"), href: "/blog", sectionId: "blog" },
      { id: "talks", label: t("talks") ?? "Talks", href: "/talks", sectionId: "talks" },
      { id: "uses", label: t("uses_title"), href: "/uses", sectionId: "uses" },
      { id: "now", label: t("now_title"), href: "/now", sectionId: "now" },
    ],
    [t]
  );

  const intents = useMemo<Intent[]>(
    () => [
      {
        id: "about",
        sectionId: "about",
        label: t("about"),
        hint: ui.aboutHint,
        keywords: INTENT_KEYWORDS_BY_LANG[lang].about,
      },
      {
        id: "projects",
        sectionId: "projects",
        label: t("projects"),
        hint: ui.projectsHint,
        keywords: INTENT_KEYWORDS_BY_LANG[lang].projects,
      },
      {
        id: "timeline",
        sectionId: "timeline",
        label: t("experience"),
        hint: ui.timelineHint,
        keywords: INTENT_KEYWORDS_BY_LANG[lang].timeline,
      },
      {
        id: "cases",
        sectionId: "cases",
        label: t("caseStudies"),
        hint: ui.casesHint,
        keywords: INTENT_KEYWORDS_BY_LANG[lang].cases,
      },
      {
        id: "opensource",
        sectionId: "opensource",
        label: t("opensource_title"),
        hint: ui.openSourceHint,
        keywords: INTENT_KEYWORDS_BY_LANG[lang].opensource,
      },
      {
        id: "blog",
        sectionId: "blog",
        label: t("blog_title"),
        hint: ui.blogHint,
        keywords: INTENT_KEYWORDS_BY_LANG[lang].blog,
      },
      {
        id: "talks",
        sectionId: "talks",
        label: t("talks"),
        hint: ui.talksHint,
        keywords: INTENT_KEYWORDS_BY_LANG[lang].talks,
      },
      {
        id: "uses",
        sectionId: "uses",
        label: t("uses_title"),
        hint: ui.usesHint,
        keywords: INTENT_KEYWORDS_BY_LANG[lang].uses,
      },
      {
        id: "now",
        sectionId: "now",
        label: t("now_title"),
        hint: ui.nowHint,
        keywords: INTENT_KEYWORDS_BY_LANG[lang].now,
      },
      {
        id: "contacts",
        sectionId: "contacts",
        label: t("contacts"),
        hint: ui.contactsHint,
        keywords: INTENT_KEYWORDS_BY_LANG[lang].contacts,
      },
    ],
    [lang, t, ui]
  );

  useEffect(() => {
    const messages = PLACEHOLDER_MESSAGES_BY_LANG[lang];
    if (!messages.length) return;

    let msgIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId = 0;

    const run = () => {
      const current = messages[msgIndex];

      if (!deleting) {
        charIndex += 1;
        setAnimatedPlaceholder(current.slice(0, charIndex));

        if (charIndex >= current.length) {
          deleting = true;
          timeoutId = window.setTimeout(run, 1300);
          return;
        }

        timeoutId = window.setTimeout(run, 55);
        return;
      }

      charIndex -= 1;
      setAnimatedPlaceholder(current.slice(0, Math.max(0, charIndex)));

      if (charIndex <= 0) {
        deleting = false;
        msgIndex = (msgIndex + 1) % messages.length;
        timeoutId = window.setTimeout(run, 280);
        return;
      }

      timeoutId = window.setTimeout(run, 35);
    };

    setAnimatedPlaceholder("");
    timeoutId = window.setTimeout(run, 320);

    return () => window.clearTimeout(timeoutId);
  }, [lang]);

  const navigateToSection = (sectionId: SectionId) => {
    if (pathname === "/") {
      const target = sectionId === "home" ? document.getElementById("top") : document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    if (sectionId === "home") {
      router.push("/");
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const findBestIntent = (rawQuery: string) => {
    const q = normalizeText(rawQuery);
    if (!q) return null;

    let best: Intent | null = null;
    let bestScore = 0;

    for (const intent of intents) {
      let score = 0;

      const labelNorm = normalizeText(intent.label);
      const hintNorm = normalizeText(intent.hint);
      const idNorm = normalizeText(intent.id);
      const sectionNorm = normalizeText(intent.sectionId);

      if (q.includes(labelNorm)) score += 5;
      if (q.includes(idNorm) || q.includes(sectionNorm)) score += 4;
      if (q.includes(hintNorm)) score += 3;

      for (const key of intent.keywords) {
        const k = normalizeText(key);
        if (!k) continue;
        if (q.includes(k)) score += Math.max(2, k.split(" ").length);
      }

      const tokens = tokenize(q);
      for (const token of tokens) {
        if (token.length < 3) continue;
        if (
          intent.keywords.some((k) => normalizeText(k).includes(token)) ||
          labelNorm.includes(token) ||
          hintNorm.includes(token) ||
          idNorm.includes(token) ||
          sectionNorm.includes(token)
        ) {
          score += 1;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        best = intent;
      }
    }

    if (!best || bestScore < 1) return null;
    return best;
  };

  const handleAssistantSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const value = query.trim();
    if (!value) {
      setAssistantText("");
      setSuggestedSection(null);
      return;
    }

    const intent = findBestIntent(value);

    if (!intent) {
      setAssistantText(ui.noIntent);
      setSuggestedSection(null);
      return;
    }

    setSuggestedSection(intent.sectionId);
    setAssistantText(`${ui.recommendedSectionPrefix}: ${intent.label}. ${intent.hint}`);

    navigateToSection(intent.sectionId);
    setMobileOpen(false);
  };

  const cycleLang = () => {
    const idx = LANGS.indexOf(lang);
    setLang(LANGS[(idx + 1) % LANGS.length]);
  };

  const getThemeIcon = () => {
    if (!mounted || theme === "system") return <Monitor size={14} />;
    if (theme === "dark") return <Moon size={14} />;
    return <Sun size={14} />;
  };

  const cycleTheme = () => {
    if (!mounted) return;
    const order: Array<"light" | "dark" | "system"> = ["light", "dark", "system"];
    const current = theme === "light" || theme === "dark" || theme === "system" ? theme : "system";
    const idx = order.indexOf(current);
    setTheme(order[(idx + 1) % order.length]);
  };

  const quickSuggestions = useMemo(() => {
    const q = normalizeText(query);
    if (!q) return [];

    return intents
      .filter((intent) => intent.keywords.some((k) => normalizeText(k).includes(q) || q.includes(normalizeText(k))))
      .slice(0, 4);
  }, [intents, query]);

  return (
    <header className="fixed top-3 left-1/2 z-[9999] w-full max-w-[1240px] -translate-x-1/2 px-3">
      <div
        className="rounded-2xl border backdrop-blur-xl"
        style={{
          background: "color-mix(in oklab, var(--panel) 84%, transparent)",
          borderColor: "color-mix(in oklab, var(--border) 45%, transparent)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="flex min-h-[56px] items-center gap-2 px-3 py-2 md:px-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border lg:hidden"
              style={{ borderColor: "color-mix(in oklab, var(--border) 55%, transparent)" }}
              aria-label={ui.openMenu}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

            <Link href="#top" className="rounded-md px-2 py-1 text-sm font-semibold" style={{ color: "var(--text-1)" }}>
              David
            </Link>
          </div>

          <form onSubmit={handleAssistantSubmit} className="hidden min-w-0 flex-1 items-center gap-2 lg:flex">
            <div
              className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-xl border px-3"
              style={{
                borderColor: "color-mix(in oklab, var(--border) 55%, transparent)",
                background: "color-mix(in oklab, var(--panel) 80%, transparent)",
              }}
            >
              <Search size={14} className="shrink-0" style={{ color: "var(--text-2)" }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full min-w-0 bg-transparent text-sm outline-none"
                style={{ color: "var(--text-1)" }}
                placeholder={animatedPlaceholder || PLACEHOLDER_MESSAGES_BY_LANG[lang][0]}
              />
            </div>
            <button
              type="submit"
              className="h-9 rounded-lg px-3 text-xs font-semibold"
              style={{ background: "var(--accent)", color: "#0b1220" }}
            >
              {ui.search}
            </button>
          </form>

          <div className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={cycleLang}
              className="inline-flex h-8 items-center gap-1 rounded-lg border px-2 text-xs font-semibold"
              style={{ borderColor: "color-mix(in oklab, var(--border) 55%, transparent)", color: "var(--text-1)" }}
              title={ui.changeLanguage}
            >
              <Globe size={13} /> {lang.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={cycleTheme}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border"
              style={{ borderColor: "color-mix(in oklab, var(--border) 55%, transparent)", color: "var(--text-1)" }}
              title={ui.changeTheme}
              aria-label={ui.changeTheme}
            >
              {getThemeIcon()}
            </button>
            <a
              href="/MyCv.pdf"
              download
              className="inline-flex h-8 items-center gap-1 rounded-lg border px-2 text-xs font-semibold"
              style={{ borderColor: "color-mix(in oklab, var(--border) 55%, transparent)", color: "var(--text-1)" }}
              title={ui.downloadCv}
            >
              CV <Download size={13} />
            </a>
          </div>
        </div>

        {(assistantText || quickSuggestions.length > 0) && (
          <div className="hidden border-t px-3 py-2 lg:block" style={{ borderColor: "color-mix(in oklab, var(--border) 45%, transparent)" }}>
            {assistantText && (
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-xs" style={{ color: "var(--text-2)" }}>
                  {assistantText}
                </p>
                {suggestedSection && (
                  <button
                    type="button"
                    onClick={() => navigateToSection(suggestedSection)}
                    className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold"
                    style={{ background: "color-mix(in oklab, var(--accent) 20%, transparent)", color: "var(--text-1)" }}
                  >
                    {ui.goToSection}
                  </button>
                )}
              </div>
            )}

            {quickSuggestions.length > 0 && (
              <div className={`flex flex-wrap gap-1.5 ${assistantText ? "mt-2" : ""}`}>
                {quickSuggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSuggestedSection(item.sectionId);
                      setAssistantText(`${ui.recommendedSectionPrefix}: ${item.label}. ${item.hint}`);
                      navigateToSection(item.sectionId);
                    }}
                    className="rounded-full border px-2 py-0.5 text-[11px]"
                    style={{ borderColor: "color-mix(in oklab, var(--border) 60%, transparent)", color: "var(--text-2)" }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {mobileOpen && (
          <div className="border-t px-3 py-3 lg:hidden" style={{ borderColor: "color-mix(in oklab, var(--border) 45%, transparent)" }}>
            <form onSubmit={handleAssistantSubmit} className="mb-3 flex items-center gap-2">
              <div
                className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-xl border px-3"
                style={{
                  borderColor: "color-mix(in oklab, var(--border) 55%, transparent)",
                  background: "color-mix(in oklab, var(--panel) 80%, transparent)",
                }}
              >
                <Search size={14} className="shrink-0" style={{ color: "var(--text-2)" }} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full min-w-0 bg-transparent text-sm outline-none"
                  style={{ color: "var(--text-1)" }}
                  placeholder={animatedPlaceholder || PLACEHOLDER_MESSAGES_BY_LANG[lang][0]}
                />
              </div>
              <button type="submit" className="h-9 rounded-lg px-3 text-xs font-semibold" style={{ background: "var(--accent)", color: "#0b1220" }}>
                {ui.go}
              </button>
            </form>

            {assistantText && (
              <p className="mb-2 text-xs" style={{ color: "var(--text-2)" }}>
                {assistantText}
              </p>
            )}

            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.sectionId ? (item.sectionId === "home" ? "/#top" : `/#${item.sectionId}`) : item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm"
                  style={{ color: "var(--text-1)", background: "color-mix(in oklab, var(--panel) 80%, transparent)" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
