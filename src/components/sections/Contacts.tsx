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
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Botones de contacto en grid horizontal */}
          <div className="contact-buttons">
            <h3 className="text-lg font-bold mb-6 text-center opacity-80">
              Métodos de contacto
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CONTACT_LINKS.map((contact) => (
                <a
                  key={contact.name}
                  href={contact.url}
                  target={contact.name !== "Gmail" ? "_blank" : undefined}
                  rel={contact.name !== "Gmail" ? "noopener noreferrer" : undefined}
                  onClick={(e) => handleButtonClick(contact.url, e)}
                  className="contact-btn group relative flex flex-col items-center justify-center gap-3 px-4 py-6 rounded-xl ring-1 backdrop-blur-sm transition-all hover:scale-105 hover:ring-2 cursor-pointer"
                  style={{ 
                    background: "color-mix(in oklab, var(--panel) 60%, transparent)",
                    borderColor: "color-mix(in oklab, var(--accent) 30%, transparent)"
                  }}
                >
                  {/* Icono */}
                  <div 
                    className="w-14 h-14 flex items-center justify-center rounded-lg ring-1"
                    style={{ 
                      background: "color-mix(in oklab, var(--panel) 80%, transparent)",
                      borderColor: "color-mix(in oklab, var(--accent) 20%, transparent)"
                    }}
                  >
                    <img
                      src={`/${contact.icon}.png`}
                      alt={contact.name}
                      className="w-8 h-8 object-contain"
                      loading="eager"
                    />
                  </div>

                  {/* Nombre */}
                  <div className="font-bold text-sm text-center">{contact.name}</div>

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
          <div className="contact-form">
            <h3 className="text-lg font-bold mb-6 text-center opacity-80">
              Enviar mensaje
            </h3>

            <form 
              className="space-y-4"
              onSubmit={(e) => { 
                e.preventDefault(); 
                alert("Mensaje enviado correctamente");
              }}
            >
              {/* Nombre y Email en grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  className="rounded-xl px-4 py-3 ring-1 bg-transparent transition-all focus:ring-2 outline-none"
                  style={{ borderColor: "var(--ring)" }} 
                  placeholder={t("form_name")} 
                  required
                />
                
                <input 
                  type="email" 
                  className="rounded-xl px-4 py-3 ring-1 bg-transparent transition-all focus:ring-2 outline-none"
                  style={{ borderColor: "var(--ring)" }} 
                  placeholder={t("form_email")} 
                  required
                />
              </div>
              
              {/* Mensaje y botón en grid */}
              <div className="grid md:grid-cols-[1fr_auto] gap-4 items-end">
                <textarea 
                  rows={4} 
                  className="rounded-xl px-4 py-3 ring-1 bg-transparent transition-all focus:ring-2 outline-none resize-none"
                  style={{ borderColor: "var(--ring)" }} 
                  placeholder={t("form_msg")} 
                  required
                />
                
                <button 
                  type="submit"
                  className="h-fit px-8 py-3 rounded-xl font-bold transition-all hover:scale-105"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg)"
                  }}
                >
                  {t("form_send")}
                </button>
              </div>
            </form>
          </div>

          {/* Info adicional */}
          <div 
            className="p-5 rounded-xl ring-1 text-center"
            style={{ 
              background: "color-mix(in oklab, var(--panel) 40%, transparent)",
              borderColor: "color-mix(in oklab, var(--accent) 20%, transparent)"
            }}
          >
            <p className="text-sm opacity-70 leading-relaxed">
              Disponible para colaboraciones, proyectos freelance y consultas profesionales.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}