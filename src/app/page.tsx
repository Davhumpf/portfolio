"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import InteractiveProjectFrame from "@/components/InteractiveProjectFrame";
import { useLang, useT } from "@/context/LanguageProvider";
import WaveTitle from "@/components/WaveTitle";
import {
  BookOpen,
  BriefcaseBusiness,
  Clock3,
  FolderKanban,
  Github,
  Lightbulb,
  Mail,
  Radio,
  UserRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type Project = {
  name: string;
  category: string;
  status: string;
  description: string;
  href?: string;
  previewUrl?: string;
  stack: string[];
};

type CaseStudy = {
  title: string;
  problem: string;
  process: string;
  impact: string;
};

type LogoItem = {
  name: string;
  src: string;
};

const HOME_SECTION_ICONS: Record<string, LucideIcon> = {
  about: UserRound,
  timeline: Clock3,
  projects: FolderKanban,
  cases: BriefcaseBusiness,
  opensource: Github,
  blog: BookOpen,
  talks: Radio,
  uses: Wrench,
  now: Lightbulb,
  contacts: Mail,
};

function SectionHeading({ sectionId, title }: { sectionId: keyof typeof HOME_SECTION_ICONS; title: string }) {
  const Icon = HOME_SECTION_ICONS[sectionId];

  return (
    <div className="inline-flex items-center gap-2.5">
      <span
        className="section-accent-badge inline-flex h-9 w-9 items-center justify-center rounded-xl border"
        style={{
          color: "#c084fc",
          borderColor: "color-mix(in oklab, #c084fc 42%, var(--border))",
          background: "linear-gradient(135deg, rgba(192, 132, 252, 0.18), rgba(168, 85, 247, 0.08))",
          boxShadow: "0 8px 18px rgba(168, 85, 247, 0.10)",
        }}
        aria-hidden
      >
        <Icon size={17} strokeWidth={2.1} />
      </span>
      <span className="section-accent-trigger section-accent-textwrap">
        <WaveTitle
          text={title}
          className="section-accent-title text-xl font-semibold tracking-[-0.01em]"
        />
        <span className="section-accent-underline" aria-hidden />
      </span>
    </div>
  );
}

function SkillsTicker({ logos }: { logos: LogoItem[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstGroupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const firstGroup = firstGroupRef.current;
    if (!track || !firstGroup) return;

    let rafId = 0;
    let lastTs = 0;
    let x = 0;
    let groupWidth = firstGroup.offsetWidth;
    const speedPxPerSec = 24;

    const measure = () => {
      groupWidth = firstGroup.offsetWidth;
      if (groupWidth <= 0) groupWidth = 1;
    };

    measure();
    const resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(firstGroup);

    const tick = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const delta = ts - lastTs;
      lastTs = ts;

      x -= (speedPxPerSec * delta) / 1000;
      if (-x >= groupWidth) {
        x += groupWidth;
      }

      track.style.transform = `translate3d(${x}px, 0, 0)`;
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [logos]);

  return (
    <div className="skills-marquee">
      <div className="skills-track" ref={trackRef}>
        <div className="skills-group" ref={firstGroupRef}>
          {logos.map((item) => (
            <div
              key={`a-${item.name}`}
              className="skills-chip rounded-xl border p-2"
              style={{
                borderColor: "color-mix(in oklab, var(--border) 62%, transparent)",
                background: "color-mix(in oklab, var(--panel) 80%, transparent)",
              }}
              title={item.name}
            >
              <Image src={item.src} alt={item.name} width={52} height={52} className="mx-auto h-[34px] w-[34px] object-contain md:h-[38px] md:w-[38px]" />
            </div>
          ))}
        </div>
        <div className="skills-group" aria-hidden>
          {logos.map((item) => (
            <div
              key={`b-${item.name}`}
              className="skills-chip rounded-xl border p-2"
              style={{
                borderColor: "color-mix(in oklab, var(--border) 62%, transparent)",
                background: "color-mix(in oklab, var(--panel) 80%, transparent)",
              }}
              title={item.name}
            >
              <Image src={item.src} alt={item.name} width={52} height={52} className="mx-auto h-[34px] w-[34px] object-contain md:h-[38px] md:w-[38px]" />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .skills-marquee {
          position: relative;
          overflow: hidden;
          max-width: 100%;
          width: 100%;
          border-radius: 0.75rem;
          contain: layout paint;
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }

        .skills-track {
          display: flex;
          flex-wrap: nowrap;
          width: max-content;
          max-width: none;
          gap: 0;
          align-items: center;
          will-change: transform;
        }

        .skills-group {
          display: flex;
          flex-wrap: nowrap;
          gap: 0.75rem;
          padding-right: 0.75rem;
        }

        .skills-chip {
          flex: 0 0 auto;
          width: 66px;
          height: 66px;
          max-width: none;
          display: grid;
          place-items: center;
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const t = useT();
  const { lang } = useLang();

  const pageCopyByLang = {
    es: {
      heroDescription:
        "Software Developer orientado a frontend, producto digital y experiencia de usuario. Construyo interfaces profesionales, rapidas y mantenibles para contextos reales.",
      metricExperience: "Experiencia activa",
      metricProjects: "Proyectos clave",
      metricFocus: "Enfoque",
      metricFocusValue: "UI + Producto",
      profileAlt: "Foto de perfil de David",
      skillsTickerTitle: "Stack Tecnico y Habilidades Clave",
      projectsIntro: "Productos con orientacion a impacto real y ejecucion tecnica consistente.",
      openProject: "Abrir proyecto",
      reloadPreview: "Recargar preview",
      viewRepository: "Ver repositorio",
      projectPreviewLabel: "Vista previa de",
      projectLoading: "Cargando experiencia interactiva",
      projectLoadingHint: "Si tarda demasiado, puedes recargar el preview o abrir la tienda en una pestaña nueva.",
      projectFallback: "La demo esta tardando mas de lo normal",
      usesHardware: ["Acer Nitro AN515-58", "Intel Core i7-12700H", "24 GB RAM DDR4", "SSD NVMe 1 TB", "NVIDIA RTX 3060"],
      usesSoftware: ["VS Code + Material Icons", "Figma", "GitHub Desktop + Git CLI", "Node.js + PNPM/Bun", "PowerShell + Windows Terminal"],
      blogPosts: [
        "Solucionando errores de hidratacion en Next.js con next-themes.",
        "Animaciones GSAP sin romper layout ni accesibilidad.",
        "Sistema de themes estable en Next.js sin flash visual.",
        "Stack frontend 2025: decisiones tecnicas y trade-offs reales.",
      ],
      talks: [
        { title: "Seminario Nacional de Ingenieria de Software", year: "2022", focus: "Industria de software en Colombia" },
        { title: "Seminario Privado de Desarrollo Cali - Bogota", year: "2024", focus: "Colaboracion tecnica entre equipos distribuidos" },
        { title: "Desarrollo Frontend y Ciberseguridad", year: "2025", focus: "Buenas practicas de seguridad en aplicaciones web" },
      ],
    },
    en: {
      heroDescription:
        "Software Developer focused on frontend, digital products and user experience. I build professional, fast and maintainable interfaces for real-world contexts.",
      metricExperience: "Active experience",
      metricProjects: "Key projects",
      metricFocus: "Focus",
      metricFocusValue: "UI + Product",
      profileAlt: "David profile photo",
      skillsTickerTitle: "Technical Stack and Core Skills",
      projectsIntro: "Products built for real impact with consistent technical execution.",
      openProject: "Open project",
      reloadPreview: "Reload preview",
      viewRepository: "View repository",
      projectPreviewLabel: "Preview of",
      projectLoading: "Loading interactive experience",
      projectLoadingHint: "If it takes too long, you can reload the preview or open the store in a new tab.",
      projectFallback: "The demo is taking longer than usual",
      usesHardware: ["Acer Nitro AN515-58", "Intel Core i7-12700H", "24 GB DDR4 RAM", "1 TB NVMe SSD", "NVIDIA RTX 3060"],
      usesSoftware: ["VS Code + Material Icons", "Figma", "GitHub Desktop + Git CLI", "Node.js + PNPM/Bun", "PowerShell + Windows Terminal"],
      blogPosts: [
        "Fixing Next.js hydration issues with next-themes.",
        "GSAP animations without breaking layout or accessibility.",
        "Stable theming system in Next.js without visual flash.",
        "Frontend stack 2025: technical decisions and real trade-offs.",
      ],
      talks: [
        { title: "National Software Engineering Seminar", year: "2022", focus: "Software industry in Colombia" },
        { title: "Private Development Seminar Cali - Bogota", year: "2024", focus: "Technical collaboration across distributed teams" },
        { title: "Frontend Development and Cybersecurity", year: "2025", focus: "Web application security best practices" },
      ],
    },
    de: {
      heroDescription:
        "Softwareentwickler mit Fokus auf Frontend, digitale Produkte und User Experience. Ich entwickle professionelle, schnelle und wartbare Interfaces fuer reale Einsatzbereiche.",
      metricExperience: "Aktive Erfahrung",
      metricProjects: "Schluesselprojekte",
      metricFocus: "Fokus",
      metricFocusValue: "UI + Produkt",
      profileAlt: "Profilfoto von David",
      skillsTickerTitle: "Technischer Stack und Kernkompetenzen",
      projectsIntro: "Produkte mit Fokus auf echten Impact und konsistente technische Umsetzung.",
      openProject: "Projekt oeffnen",
      reloadPreview: "Vorschau neu laden",
      viewRepository: "Repository ansehen",
      projectPreviewLabel: "Vorschau von",
      projectLoading: "Interaktive Vorschau wird geladen",
      projectLoadingHint: "Wenn es zu lange dauert, kannst du die Vorschau neu laden oder den Shop in einem neuen Tab oeffnen.",
      projectFallback: "Die Demo braucht gerade laenger als ueblich",
      usesHardware: ["Acer Nitro AN515-58", "Intel Core i7-12700H", "24 GB DDR4 RAM", "1 TB NVMe SSD", "NVIDIA RTX 3060"],
      usesSoftware: ["VS Code + Material Icons", "Figma", "GitHub Desktop + Git CLI", "Node.js + PNPM/Bun", "PowerShell + Windows Terminal"],
      blogPosts: [
        "Hydration-Fehler in Next.js mit next-themes beheben.",
        "GSAP-Animationen ohne Layout- oder Accessibility-Probleme.",
        "Stabiles Theme-System in Next.js ohne visuellen Flash.",
        "Frontend-Stack 2025: technische Entscheidungen und reale Trade-offs.",
      ],
      talks: [
        { title: "Nationales Seminar fuer Software Engineering", year: "2022", focus: "Softwarebranche in Kolumbien" },
        { title: "Privates Entwicklungsseminar Cali - Bogota", year: "2024", focus: "Technische Zusammenarbeit in verteilten Teams" },
        { title: "Frontend-Entwicklung und Cybersicherheit", year: "2025", focus: "Best Practices fuer Websicherheit" },
      ],
    },
  } as const;

  const copy = pageCopyByLang[lang];

  const skillLogos: LogoItem[] = [
    { name: "Angular", src: "/angular.png" },
    { name: "Azure", src: "/azure.png" },
    { name: "CSS", src: "/css.png" },
    { name: "Dart", src: "/dart.png" },
    { name: "Docker", src: "/docker.png" },
    { name: "Firebase", src: "/firebase.png" },
    { name: "GitHub", src: "/github.png" },
    { name: "Google Cloud", src: "/googlecloud.png" },
    { name: "GSAP", src: "/gsap.png" },
    { name: "Java", src: "/java.png" },
    { name: "JavaScript", src: "/javascript.png" },
    { name: "MySQL", src: "/mysql.png" },
    { name: "Next.js", src: "/nextjs.png" },
    { name: "Node.js", src: "/nodejs.png" },
    { name: "Oracle", src: "/oracle.png" },
    { name: "Python", src: "/python.png" },
    { name: "React", src: "/react.png" },
    { name: "SQLite", src: "/sqlite.png" },
    { name: "Supabase", src: "/supabase.png" },
    { name: "Tailwind", src: "/tailwind.png" },
    { name: "TypeScript", src: "/typescript.png" },
    { name: "Vite", src: "/vite.png" },
  ];

  const projects: Project[] = [
    {
      name: "Nova Store",
      category: lang === "de" ? "E-Commerce Plattform" : lang === "en" ? "E-commerce Platform" : "Plataforma E-commerce",
      status: lang === "de" ? "In Produktion" : lang === "en" ? "In production" : "En producción",
      description: lang === "de" ? "Hybride Plattform fuer den Verkauf digitaler und physischer Produkte mit Fokus auf Geschwindigkeit, Kauferlebnis und stabilem Betrieb." : lang === "en" ? "Hybrid platform for selling digital and physical products with focus on speed, purchase experience and stable operations." : "Plataforma hibrida para venta de productos digitales y fisicos con enfoque en velocidad, experiencia de compra y operacion estable.",
      href: "https://novahub-app.vercel.app/",
      previewUrl: "https://novahub-app.vercel.app/",
      stack: ["React", "Next.js", "TypeScript", "Supabase"],
    },
    {
      name: "ITIA",
      category: lang === "de" ? "Computer Vision + IoT" : "Computer Vision + IoT",
      status: lang === "de" ? "In Entwicklung" : lang === "en" ? "In development" : "En desarrollo",
      description: lang === "de" ? "System fuer touristische Intelligenz mit Analyse von Personenstroemen und Datenvisualisierung fuer bessere Entscheidungen." : lang === "en" ? "System focused on tourism intelligence with people-flow analysis and data visualization for decision making." : "Sistema orientado a inteligencia turistica con analisis de flujo de personas y visualizacion de datos para toma de decisiones.",
      stack: ["Python", "Cloud", "Vision", "Data"],
    },
    {
      name: "MIZA",
      category: lang === "de" ? "KI-Assistent" : lang === "en" ? "AI Assistant" : "Asistente IA",
      status: lang === "de" ? "Fortgeschrittenes Konzept" : lang === "en" ? "Advanced concept" : "Concepto avanzado",
      description: lang === "de" ? "Assistent mit emotionalem Fokus fuer natuerlichere Interaktionen in digitalen Support- und Conversational-Product-Erlebnissen." : lang === "en" ? "Assistant with emotional focus for more natural interactions in digital support and conversational product experiences." : "Asistente con enfoque emocional para interacciones mas naturales en experiencias de soporte digital y producto conversacional.",
      stack: ["AI", "UX", "Frontend", "Product"],
    },
  ];

  const caseStudies: CaseStudy[] = [
    { title: t("case1_title"), problem: t("case1_problem"), process: t("case1_process"), impact: t("case1_impact") },
    { title: t("case3_title"), problem: t("case3_problem"), process: t("case3_process"), impact: t("case3_impact") },
    { title: t("case5_title"), problem: t("case5_problem"), process: t("case5_process"), impact: t("case5_impact") },
  ];

  const talks = copy.talks;

  const repos = [
    { name: "nova-store-page", stack: "TypeScript / Next.js", href: "https://github.com/Davhumpf/nova-store-page" },
    { name: "portfolio", stack: "TypeScript / Next.js", href: "https://github.com/Davhumpf/portfolio" },
    { name: "ProgreS.O.S.", stack: "Python", href: "https://github.com/dexango/ProgreS.O.S." },
    { name: "gluter", stack: "Dart / Flutter", href: "https://github.com/Davhumpf/gluter" },
  ];

  const cardStyle = {
    background: "color-mix(in oklab, var(--bg-card) 93%, transparent)",
    borderColor: "color-mix(in oklab, var(--border) 58%, transparent)",
  } as const;

  return (
    <div className="mx-auto w-full max-w-[1220px] px-4 pb-16">
      <section
        id="home"
        className="relative overflow-hidden rounded-3xl border p-6 md:p-8 lg:p-10"
        style={{
          ...cardStyle,
          boxShadow: "var(--shadow-md)",
          backgroundImage:
            "radial-gradient(620px 340px at 88% -20%, color-mix(in oklab, var(--accent) 20%, transparent), transparent 65%), radial-gradient(540px 280px at 10% 120%, color-mix(in oklab, var(--accent-2) 20%, transparent), transparent 70%)",
        }}
      >
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl" style={{ color: "var(--text-1)" }}>
              David Esteban Rodriguez Rump
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed md:text-lg" style={{ color: "var(--text-2)" }}>
              {copy.heroDescription}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <MetricCard label={copy.metricExperience} value="2019 - 2026" />
              <MetricCard label={copy.metricProjects} value="10+" />
              <MetricCard label={copy.metricFocus} value={copy.metricFocusValue} />
            </div>
          </div>

          <div className="mx-auto w-full max-w-[340px]">
            <div
              className="mx-auto relative overflow-hidden rounded-full border"
              style={{
                width: "clamp(228px, 32vw, 348px)",
                height: "clamp(228px, 32vw, 348px)",
                borderColor: "color-mix(in oklab, var(--accent) 36%, var(--border))",
                boxShadow: "0 14px 30px color-mix(in oklab, var(--accent) 16%, transparent)",
              }}
            >
              <Image src="/profile.png" alt={copy.profileAlt} width={640} height={640} className="h-full w-full object-cover" style={{ objectPosition: "center 28%" }} priority />
            </div>
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="mt-5 rounded-2xl border p-4"
        style={{
          ...cardStyle,
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="mb-3 flex items-center justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] muted">
            {copy.skillsTickerTitle}
          </p>
        </div>
        <SkillsTicker logos={skillLogos} />
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <section id="about" className="rounded-2xl border p-6 lg:col-span-7" style={cardStyle}>
          <SectionHeading sectionId="about" title={t("about_title")} />
          <p className="mt-3 leading-relaxed muted">{t("about_p1")}</p>
          <p className="mt-3 leading-relaxed muted">{t("about_p2")}</p>
        </section>

        <section id="timeline" className="rounded-2xl border p-6 lg:col-span-5" style={cardStyle}>
          <SectionHeading sectionId="timeline" title={t("timeline_title")} />
          <ul className="mt-4 space-y-3 text-sm">
            <li><strong>2019:</strong> {t("timeline_event1_title")}</li>
            <li><strong>2021:</strong> {t("timeline_event3_title")}</li>
            <li><strong>2023:</strong> {t("timeline_event5_title")}</li>
            <li><strong>2023-2025:</strong> {t("timeline_event6_title")}</li>
            <li><strong>2025:</strong> {t("timeline_event7_title")}</li>
          </ul>
        </section>

        <section id="projects" className="rounded-2xl border p-6 lg:col-span-12" style={cardStyle}>
          <SectionHeading sectionId="projects" title={t("projects_title")} />
          <p className="mt-1 text-sm muted">{copy.projectsIntro}</p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {projects.map((project, idx) => (
              <article key={project.name} className="rounded-2xl border p-4" style={{ borderColor: "color-mix(in oklab, var(--border) 60%, transparent)", background: "color-mix(in oklab, var(--panel) 82%, transparent)" }}>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] muted">{project.category}</p>
                    <h3 className="mt-1 text-lg font-semibold">{project.name}</h3>
                  </div>
                  <Image src={idx === 0 ? "/nextjs.png" : idx === 1 ? "/python.png" : "/javascript.png"} alt={`${project.name} icon`} width={36} height={36} className="h-9 w-9 rounded-md object-contain" />
                </div>
                {project.previewUrl && (
                  <InteractiveProjectFrame
                    className="mb-4"
                    heightClassName="h-[260px]"
                    url={project.previewUrl}
                    title={project.name}
                    openLabel={copy.openProject}
                    loadingLabel={copy.projectLoading}
                    loadingHint={copy.projectLoadingHint}
                    fallbackLabel={copy.projectFallback}
                    retryLabel={copy.reloadPreview}
                    frameLabel={`${copy.projectPreviewLabel} ${project.name}`}
                  />
                )}
                <p className="text-xs font-semibold" style={{ color: "var(--accent)" }}>{project.status}</p>
                <p className="mt-3 text-sm leading-relaxed muted">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full border px-2.5 py-1 text-[11px] font-semibold" style={{ borderColor: "color-mix(in oklab, var(--border) 65%, transparent)" }}>
                      {item}
                    </span>
                  ))}
                </div>
                {project.href && (
                  <a href={project.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold" style={{ color: "var(--text-1)" }}>
                    {copy.openProject}
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="cases" className="rounded-2xl border p-6 lg:col-span-12" style={cardStyle}>
          <SectionHeading sectionId="cases" title={t("cases_title")} />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {caseStudies.map((cs) => (
              <article key={cs.title} className="rounded-xl border p-4" style={{ borderColor: "color-mix(in oklab, var(--border) 60%, transparent)", background: "color-mix(in oklab, var(--panel) 82%, transparent)" }}>
                <h3 className="text-base font-semibold">{cs.title}</h3>
                <p className="mt-3 text-sm"><strong>{t("cases_problem_label")}:</strong> {cs.problem}</p>
                <p className="mt-3 text-sm"><strong>{t("cases_process_label")}:</strong> {cs.process}</p>
                <p className="mt-3 text-sm"><strong>{t("cases_impact_label")}:</strong> {cs.impact}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="opensource" className="rounded-2xl border p-6 lg:col-span-6" style={cardStyle}>
          <div className="mb-3">
            <SectionHeading sectionId="opensource" title={t("opensource_title")} />
          </div>
          <ul className="space-y-3">
            {repos.map((repo) => (
              <li key={repo.name} className="rounded-lg border p-3" style={{ borderColor: "color-mix(in oklab, var(--border) 62%, transparent)" }}>
                <p className="font-semibold">{repo.name}</p>
                <p className="text-sm muted">{repo.stack}</p>
                <a href={repo.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>
                  {copy.viewRepository}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="blog" className="rounded-2xl border p-6 lg:col-span-6" style={cardStyle}>
          <SectionHeading sectionId="blog" title={t("blog_title")} />
          <ul className="mt-4 space-y-3 text-sm">
            {copy.blogPosts.map((post) => (
              <li key={post}>{post}</li>
            ))}
          </ul>
        </section>

        <section id="talks" className="rounded-2xl border p-6 lg:col-span-6" style={cardStyle}>
          <SectionHeading sectionId="talks" title={t("talks_title")} />
          <ul className="mt-4 space-y-3 text-sm">
            {talks.map((talk) => (
              <li key={talk.title} className="rounded-lg border p-3" style={{ borderColor: "color-mix(in oklab, var(--border) 62%, transparent)" }}>
                <p className="font-semibold">{talk.title}</p>
                <p className="muted">{talk.year}</p>
                <p className="muted">{talk.focus}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="uses" className="rounded-2xl border p-6 lg:col-span-6" style={cardStyle}>
          <SectionHeading sectionId="uses" title={t("uses_title")} />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border p-3" style={{ borderColor: "color-mix(in oklab, var(--border) 62%, transparent)" }}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] muted">{t("uses_hardware_title")}</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {copy.usesHardware.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border p-3" style={{ borderColor: "color-mix(in oklab, var(--border) 62%, transparent)" }}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] muted">{t("uses_software_title")}</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {copy.usesSoftware.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="now" className="rounded-2xl border p-6 lg:col-span-8" style={cardStyle}>
          <SectionHeading sectionId="now" title={t("now_title")} />
          <ul className="mt-4 space-y-2 text-sm leading-relaxed">
            <li>{t("now_item1")}</li>
            <li>{t("now_item2")}</li>
            <li>{t("now_item3")}</li>
            <li>{t("now_item4")}</li>
            <li>{t("now_item5")}</li>
          </ul>
        </section>

        <section id="contacts" className="rounded-2xl border p-6 lg:col-span-4" style={cardStyle}>
          <SectionHeading sectionId="contacts" title={t("contacts_title")} />
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <a href="mailto:vincho0528@gmail.com" className="rounded-xl border p-3 text-center font-semibold" style={{ borderColor: "color-mix(in oklab, var(--border) 62%, transparent)" }}>
              <Image src="/gmail.png" alt="Gmail" width={28} height={28} className="mx-auto mb-1 h-6 w-6 object-contain" />
              Gmail
            </a>
            <a href="https://www.linkedin.com/in/david-esteban-rodriguez-rhumpf-689507301" target="_blank" rel="noopener noreferrer" className="rounded-xl border p-3 text-center font-semibold" style={{ borderColor: "color-mix(in oklab, var(--border) 62%, transparent)" }}>
              <Image src="/linkedin.png" alt="LinkedIn" width={28} height={28} className="mx-auto mb-1 h-6 w-6 object-contain" />
              LinkedIn
            </a>
            <a href="https://github.com/Davhumpf" target="_blank" rel="noopener noreferrer" className="rounded-xl border p-3 text-center font-semibold" style={{ borderColor: "color-mix(in oklab, var(--border) 62%, transparent)" }}>
              <Image src="/github.png" alt="GitHub" width={28} height={28} className="mx-auto mb-1 h-6 w-6 object-contain" />
              GitHub
            </a>
            <a href="https://wa.me/573188656961" target="_blank" rel="noopener noreferrer" className="rounded-xl border p-3 text-center font-semibold" style={{ borderColor: "color-mix(in oklab, var(--border) 62%, transparent)" }}>
              <Image src="/whatsapp.png" alt="WhatsApp" width={28} height={28} className="mx-auto mb-1 h-6 w-6 object-contain" />
              WhatsApp
            </a>
          </div>
        </section>
      </div>
      <style jsx>{``}</style>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-xl border px-4 py-3"
      style={{
        borderColor: "color-mix(in oklab, var(--border) 65%, transparent)",
        background: "color-mix(in oklab, var(--panel) 76%, transparent)",
      }}
    >
      <p className="text-xs uppercase tracking-[0.12em] muted">{label}</p>
      <p className="mt-1 text-sm font-semibold" style={{ color: "var(--text-1)" }}>{value}</p>
    </div>
  );
}
