"use client";
import { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";

export default function AnimeIntro() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    anime.timeline({ loop: false })
      .add({
        targets: ref.current,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 2000,
        easing: "easeOutExpo",
      })
      .add({
        targets: ".anime-title span",
        translateY: [100, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        easing: "easeOutElastic(1, .8)",
      });
  }, []);

  return (
    <div ref={ref} className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="anime-title text-6xl font-bold">
        {"GSAP Motion Playground".split("").map((l, i) => (
          <span key={i} className="inline-block">{l}</span>
        ))}
      </h1>
      <p className="mt-4 text-lg opacity-70">Explora cada plugin mientras haces scroll ↓</p>
    </div>
  );
}
