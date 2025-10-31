"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(ScrollToPlugin);

export default function AnimeIntro() {
  const introRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      let anime: any = null;
      try {
        const mod = await import("animejs");
        const cand: any = (mod as any).default ?? (mod as any);
        if (typeof cand === "function" && typeof cand.timeline === "function") {
          anime = cand;
        }
      } catch {
        // si falla, haremos fallback abajo
      }
      if (!mounted) return;

      if (anime) {
        anime
          .timeline({ loop: false })
          .add({
            targets: introRef.current,
            opacity: [0, 1],
            scale: [0.95, 1],
            duration: 1200,
            easing: "easeOutExpo",
          })
          .add(
            {
              targets: ".hero-title .char",
              translateY: [40, 0],
              opacity: [0, 1],
              delay: anime.stagger(30),
              easing: "easeOutElastic(1, .6)",
            },
            "-=900"
          )
          .add(
            {
              targets: ".hero-subtitle",
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 700,
              easing: "easeOutQuad",
            },
            "-=400"
          );

        anime({
          targets: ".floating-card",
          translateY: [-10, 10],
          duration: 2000,
          easing: "easeInOutSine",
          direction: "alternate",
          loop: true,
          delay: anime.stagger(200),
        });
      } else {
        // Fallback con GSAP
        gsap.fromTo(
          introRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
        );
        gsap.from(".hero-title .char", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.4)",
          stagger: 0.03,
          delay: 0.2,
        });
        gsap.from(".hero-subtitle", {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.5,
        });
        gsap.to(".floating-card", {
          y: 10,
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.2,
        });
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const scrollToSection = (id: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: id, offsetY: 100 },
      ease: "power3.inOut",
    });
  };

  return (
    <section
      ref={introRef}
      className="min-h-screen flex flex-col items-center justify-center relative px-6"
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      {/* Tarjetas flotantes */}
      <div className="absolute top-20 left-10 floating-card bg-white/5 backdrop-blur p-4 rounded-xl border border-white/10">
        <div className="text-green-400 font-bold">ScrollTrigger</div>
      </div>
      <div className="absolute top-40 right-20 floating-card bg-white/5 backdrop-blur p-4 rounded-xl border border-white/10">
        <div className="text-blue-400 font-bold">MotionPath</div>
      </div>
      <div className="absolute bottom-32 left-32 floating-card bg-white/5 backdrop-blur p-4 rounded-xl border border-white/10">
        <div className="text-purple-400 font-bold">Flip</div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-5xl">
        <h1 className="hero-title text-7xl md:text-9xl font-black mb-6 tracking-tight">
          {"GSAP".split("").map((char, i) => (
            <span
              key={i}
              className="char inline-block"
              style={{ color: i % 2 === 0 ? "#88ce02" : "#fff" }}
            >
              {char}
            </span>
          ))}
        </h1>
        <p className="hero-subtitle text-2xl md:text-4xl mb-8 text-gray-300">
          Professional-grade JavaScript animation
        </p>
        <div className="hero-subtitle flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => scrollToSection("#st")}
            className="px-8 py-4 bg-green-500 hover:bg-green-400 rounded-full font-bold text-lg transition-all hover:scale-105"
          >
            Explorar Demos
          </button>
          <a
            href="https://gsap.com/docs/"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 border-2 border-white/30 hover:border-white rounded-full font-bold text-lg transition-all hover:scale-105"
          >
            Documentación
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 animate-bounce">
        <div className="text-4xl">↓</div>
      </div>
    </section>
  );
}
