"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/Section";
import { useT } from "@/context/LanguageProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Iconos SVG inline para mejor control
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);

const CONTACT_LINKS = [
  {
    name: "WhatsApp",
    url: "https://wa.me/573188656961",
    icon: <WhatsAppIcon />,
    color: "#25D366",
  },
  {
    name: "GitHub",
    url: "https://github.com/Davhumpf",
    icon: <GitHubIcon />,
    color: "#181717",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/david-esteban-rodriguez-rhumpf-689507301",
    icon: <LinkedInIcon />,
    color: "#0A66C2",
  },
  {
    name: "Gmail",
    url: "mailto:vincho0528@gmail.com",
    icon: <GmailIcon />,
    color: "#EA4335",
  },
];

export default function Contacts() {
  const t = useT();
  const scope = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!scope.current) return;

    const ctx = gsap.context(() => {
      // Animación de entrada con stagger
      gsap.from(".contact-icon", {
        scrollTrigger: {
          trigger: ".contact-grid",
          start: "top 80%",
          once: true,
          toggleActions: "play none none none",
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "back.out(1.7)",
        clearProps: "all",
      });

      // Efecto magnético suave en hover
      iconRefs.current.forEach((icon) => {
        if (!icon) return;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = icon.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(icon, {
            x: x * 0.15,
            y: y * 0.15,
            scale: 1.08,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(icon, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
          });
        };

        icon.addEventListener("mousemove", handleMouseMove);
        icon.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          icon.removeEventListener("mousemove", handleMouseMove);
          icon.removeEventListener("mouseleave", handleMouseLeave);
        };
      });

      // Refrescar ScrollTrigger
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, scope);

    return () => ctx.revert();
  }, []);

  // Soporte para prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
      gsap.globalTimeline.timeScale(0.1);
    }
  }, []);

  return (
    <div ref={scope}>
      <Section
        id="contacts"
        title={t("contacts_title")}
        subtitle={t("contacts_sub")}
      >
        <div className="w-full max-w-2xl mx-auto">
          {/* Grid 2×2 de iconos */}
          <div
            className="contact-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(120px, 100%), 1fr))",
              gap: "clamp(1rem, 3vw, 2rem)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {CONTACT_LINKS.map((contact, idx) => (
              <a
                key={contact.name}
                href={contact.url}
                target={contact.name !== "Gmail" ? "_blank" : undefined}
                rel={contact.name !== "Gmail" ? "noopener noreferrer" : undefined}
                ref={(el) => {
                  iconRefs.current[idx] = el;
                }}
                className="contact-icon group relative flex items-center justify-center cursor-pointer"
                style={{
                  aspectRatio: "1 / 1",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "clamp(16px, 3vw, 24px)",
                  boxShadow: "var(--shadow-sm)",
                  transition: "box-shadow 0.3s ease",
                  minHeight: "clamp(80px, 20vw, 140px)",
                  willChange: "transform",
                }}
                aria-label={`Contactar via ${contact.name}`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                }}
              >
                {/* Ícono */}
                <div
                  className="relative z-10 transition-colors"
                  style={{
                    width: "clamp(40px, 12vw, 64px)",
                    height: "clamp(40px, 12vw, 64px)",
                    color: "var(--text-1)",
                  }}
                >
                  {contact.icon}
                </div>

                {/* Glow effect en hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                  style={{
                    background: `radial-gradient(circle at center, ${contact.color}20, transparent 70%)`,
                    borderRadius: "clamp(16px, 3vw, 24px)",
                  }}
                />

                {/* Nombre en tooltip accesible */}
                <span className="sr-only">{contact.name}</span>
              </a>
            ))}
          </div>

          {/* Mensaje opcional sutil */}
          <p
            className="text-center mt-8 opacity-60"
            style={{
              fontSize: "clamp(12px, 1.5vw, 14px)",
              color: "var(--text-2)",
            }}
          >
            {t("contacts_available") || "Disponible para colaboraciones y consultas profesionales"}
          </p>
        </div>
      </Section>
    </div>
  );
}
