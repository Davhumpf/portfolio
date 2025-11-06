"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/Section";
import { useT } from "@/context/LanguageProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CONTACT_LINKS = [
  {
    name: "WhatsApp",
    url: "https://wa.me/573188656961",
    display: "+57 318 865 6961",
    icon: "whatsapp"
  },
  {
    name: "GitHub",
    url: "https://github.com/Davhumpf",
    display: "Davhumpf",
    icon: "github"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/david-esteban-rodriguez-rhumpf-689507301",
    display: "David Esteban Rodriguez",
    icon: "linkedin"
  },
  {
    name: "Gmail",
    url: "mailto:vincho0528@gmail.com",
    display: "vincho0528@gmail.com",
    icon: "gmail"
  }
];

export default function Contacts() {
  const t = useT();
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scope.current) return;

    const ctx = gsap.context(() => {
      // Animación de los botones de contacto
      gsap.from(".contact-btn", {
        scrollTrigger: {
          trigger: ".contact-buttons",
          start: "top 80%",
          once: true,
          toggleActions: "play none none none"
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        clearProps: "all"
      });

      // Animación del formulario
      gsap.from(".contact-form", {
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
          once: true,
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all"
      });

      // Refrescar ScrollTrigger después de cargar
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, scope);

    return () => ctx.revert();
  }, []);

  const handleButtonClick = (url: string, event: React.MouseEvent) => {
    const button = event.currentTarget;
    gsap.fromTo(
      button,
      { scale: 0.95 },
      { 
        scale: 1, 
        duration: 0.3,
        ease: "back.out(1.7)"
      }
    );
  };

  return (
    <div ref={scope}>
      <Section id="contacts" title={t("contacts_title")} subtitle={t("contacts_sub")}>
        <div className="w-full max-w-4xl mx-auto" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(1.5rem, 4vw, 2rem)',
        }}>

          {/* Botones de contacto en grid horizontal */}
          <div className="contact-buttons w-full">
            <h3 className="font-bold text-center opacity-80" style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
            }}>
              Métodos de contacto
            </h3>

            <div className="responsive-grid w-full" style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100px, 100%), 1fr))',
              gap: 'clamp(0.5rem, 1.5vw, 1rem)',
            }}>
              {CONTACT_LINKS.map((contact) => (
                <a
                  key={contact.name}
                  href={contact.url}
                  target={contact.name !== "Gmail" ? "_blank" : undefined}
                  rel={contact.name !== "Gmail" ? "noopener noreferrer" : undefined}
                  onClick={(e) => handleButtonClick(contact.url, e)}
                  className="contact-btn group relative flex items-center justify-center ring-1 backdrop-blur-sm transition-all hover:scale-105 hover:ring-2 cursor-pointer w-full"
                  style={{
                    background: "color-mix(in oklab, var(--panel) 60%, transparent)",
                    borderColor: "color-mix(in oklab, var(--accent) 30%, transparent)",
                    borderRadius: 'clamp(10px, 2.5vw, 12px)',
                    padding: 'clamp(0.75rem, 2vw, 1.5rem)',
                  }}
                >
                  {/* Icono */}
                  <div
                    className="flex items-center justify-center rounded-lg ring-1"
                    style={{
                      background: "color-mix(in oklab, var(--panel) 80%, transparent)",
                      borderColor: "color-mix(in oklab, var(--accent) 20%, transparent)",
                      width: 'clamp(40px, 12vw, 64px)',
                      height: 'clamp(40px, 12vw, 64px)',
                    }}
                  >
                    <img
                      src={`/${contact.icon}.png`}
                      alt={contact.name}
                      className={`object-contain transition-all ${
                        contact.icon === "github" ? "dark:invert" : ""
                      }`}
                      style={{
                        width: 'clamp(24px, 7vw, 40px)',
                        height: 'clamp(24px, 7vw, 40px)',
                      }}
                      loading="eager"
                    />
                  </div>

                  {/* Hover effect */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-md"
                    style={{ background: "color-mix(in oklab, var(--accent) 20%, transparent)" }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="contact-form w-full">
            <h3 className="font-bold text-center opacity-80" style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
            }}>
              Enviar mensaje
            </h3>

            <form
              className="w-full"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.75rem, 2vw, 1rem)',
              }}
              onSubmit={(e) => {
                e.preventDefault();
                alert("Mensaje enviado correctamente");
              }}
            >
              {/* Nombre y Email en grid */}
              <div className="responsive-grid w-full" style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
                gap: 'clamp(0.5rem, 1.5vw, 1rem)',
              }}>
                <input
                  className="ring-1 bg-transparent transition-all focus:ring-2 outline-none w-full"
                  style={{
                    borderColor: "var(--ring)",
                    borderRadius: 'clamp(10px, 2.5vw, 12px)',
                    padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                    fontSize: 'clamp(12px, 1.5vw, 14px)',
                  }}
                  placeholder={t("form_name")}
                  required
                />

                <input
                  type="email"
                  className="ring-1 bg-transparent transition-all focus:ring-2 outline-none w-full"
                  style={{
                    borderColor: "var(--ring)",
                    borderRadius: 'clamp(10px, 2.5vw, 12px)',
                    padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                    fontSize: 'clamp(12px, 1.5vw, 14px)',
                  }}
                  placeholder={t("form_email")}
                  required
                />
              </div>

              {/* Mensaje y botón */}
              <div className="w-full flex flex-col" style={{
                gap: 'clamp(0.5rem, 1.5vw, 1rem)',
              }}>
                <textarea
                  rows={4}
                  className="ring-1 bg-transparent transition-all focus:ring-2 outline-none resize-none w-full"
                  style={{
                    borderColor: "var(--ring)",
                    borderRadius: 'clamp(10px, 2.5vw, 12px)',
                    padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                    fontSize: 'clamp(12px, 1.5vw, 14px)',
                  }}
                  placeholder={t("form_msg")}
                  required
                />

                <button
                  type="submit"
                  className="font-bold transition-all hover:scale-105 w-full"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg)",
                    borderRadius: 'clamp(10px, 2.5vw, 12px)',
                    padding: 'clamp(0.625rem, 1.8vw, 0.75rem)',
                    fontSize: 'clamp(12px, 1.5vw, 14px)',
                    minHeight: '40px',
                  }}
                >
                  {t("form_send")}
                </button>
              </div>
            </form>
          </div>

          {/* Info adicional */}
          <div
            className="ring-1 text-center w-full"
            style={{
              background: "color-mix(in oklab, var(--panel) 40%, transparent)",
              borderColor: "color-mix(in oklab, var(--accent) 20%, transparent)",
              borderRadius: 'clamp(10px, 2.5vw, 12px)',
              padding: 'clamp(0.75rem, 2vw, 1.25rem)',
            }}
          >
            <p className="opacity-70 leading-relaxed" style={{
              fontSize: 'clamp(11px, 1.4vw, 14px)',
            }}>
              Disponible para colaboraciones, proyectos freelance y consultas profesionales.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}