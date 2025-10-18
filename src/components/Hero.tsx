"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useT } from "@/context/LanguageProvider";

export default function Hero() {
  const t = useT();
  const scope = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".h-line", { y: 18, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 });
    }, scope);
    return () => ctx.revert();
  }, [t]);

  return (
    <section ref={scope} className="mx-auto mt-24 max-w-6xl px-4">
      <div className="relative overflow-hidden rounded-[30px] p-10 ring-1"
           style={{ background: "color-mix(in oklab, var(--panel) 85%, transparent)" }}>
        <div className="pointer-events-none absolute -inset-20 -z-10 blur-3xl"
             style={{ background:
               `radial-gradient(800px circle at 20% 30%, var(--accent)/14 0, transparent 60%),
                radial-gradient(700px circle at 80% 20%, var(--accent-2)/12 0, transparent 60%)` }} />

        <h1 className="h-line text-5xl font-extrabold leading-tight md:text-6xl">
          <span className="block">{t("hero_hello")} <span aria-hidden>👋</span></span>
          <span className="block">{t("hero_im")} <span className="accent">{t("hero_name")}</span></span>
        </h1>

        <p className="h-line mt-5 text-xl font-semibold muted">{t("hero_role")}</p>
      </div>
    </section>
  );
}
