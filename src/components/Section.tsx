"use client";
import { ReactNode } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";
import WaveTitle from "@/components/WaveTitle";
import {
  BookOpen,
  BriefcaseBusiness,
  Clock3,
  FolderKanban,
  Github,
  Lightbulb,
  Mail,
  MonitorSmartphone,
  Radio,
  Sparkles,
  UserRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const SECTION_ICONS: Record<string, LucideIcon> = {
  about: UserRound,
  projects: FolderKanban,
  skills: Sparkles,
  timeline: Clock3,
  cases: BriefcaseBusiness,
  opensource: Github,
  blog: BookOpen,
  talks: Radio,
  uses: Wrench,
  now: Lightbulb,
  contacts: Mail,
};

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: {
  id: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}) {
  const ref = useSectionReveal();
  const Icon = SECTION_ICONS[id] ?? MonitorSmartphone;

  return (
    <section
      id={id}
      ref={ref}
      className={`window-section ${className}`}
    >
      <div className="window-panel">
        <header className="window-bar">
          <div className="window-dots" aria-hidden>
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <div className="window-title">
            <div className="sr-item inline-flex items-center gap-2.5">
              <span
                className="section-accent-badge inline-flex h-8 w-8 items-center justify-center rounded-xl border"
                style={{
                  color: "#c084fc",
                  borderColor: "color-mix(in oklab, #c084fc 42%, var(--border))",
                  background: "linear-gradient(135deg, rgba(192, 132, 252, 0.18), rgba(168, 85, 247, 0.08))",
                  boxShadow: "0 8px 18px rgba(168, 85, 247, 0.10)",
                }}
                aria-hidden
              >
                <Icon size={16} strokeWidth={2.1} />
              </span>
              <span className="section-accent-trigger section-accent-textwrap">
                <WaveTitle
                  text={title}
                  className="section-accent-title font-semibold tracking-[-0.01em]"
                />
                <span className="section-accent-underline" aria-hidden />
              </span>
            </div>
            {subtitle && <p className="sr-item muted text-sm">{subtitle}</p>}
          </div>
        </header>
        <div className="window-content sr-fade">{children}</div>
      </div>
    </section>
  );
}
