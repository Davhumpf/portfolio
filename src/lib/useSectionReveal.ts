"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

/**
 * Aplica reveal on scroll a hijos con clases:
 *  - .sr-item  (se anima con stagger)
 *  - .sr-fade  (fade suave)
 */
export function useSectionReveal() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        once: true,
      },
    });

    const items = el.querySelectorAll(".sr-item");
    const fades = el.querySelectorAll(".sr-fade");

    if (items.length) {
      tl.from(items, {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });
    }
    if (fades.length) {
      tl.from(fades, { opacity: 0, duration: 0.6, ease: "power2.out" }, "<");
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return ref;
}
