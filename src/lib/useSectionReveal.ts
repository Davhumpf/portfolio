"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Reveal seguro: anima al montar sin depender de ScrollTrigger.
 * Evita estados en blanco cuando el observer falla en producción.
 */
export function useSectionReveal() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(".sr-item");
    const fades = el.querySelectorAll(".sr-fade");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set([...items, ...fades], { clearProps: "all", opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    if (items.length) {
      tl.fromTo(
        items,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, clearProps: "transform,opacity" }
      );
    }

    if (fades.length) {
      tl.fromTo(
        fades,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, clearProps: "opacity" },
        items.length ? "<" : 0
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return ref;
}
