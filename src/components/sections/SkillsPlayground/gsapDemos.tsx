"use client";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import {
  ScrollTrigger,
  ScrollToPlugin,
  MotionPathPlugin,
  Draggable,
  Flip,
  Observer,
  TextPlugin,
} from "gsap/all";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  MotionPathPlugin,
  Draggable,
  Flip,
  Observer,
  TextPlugin
);

type Club = {
  DrawSVG?: any;
  MorphSVG?: any;
  SplitText?: any;
  ScrambleTextPlugin?: any;
  InertiaPlugin?: any;
  Physics2DPlugin?: any;
  PhysicsPropsPlugin?: any;
  GSDevTools?: any;
  MotionPathHelper?: any;
};

export default function GSAPDemos({ clubPlugins = {} as Club }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const noiseRef = useRef<HTMLDivElement | null>(null);

  // accesibilidad: respetar reduced-motion
  const reduceMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const container = rootRef.current!;
    const track = trackRef.current!;
    const progressEl = progressRef.current!;
    if (!container || !track) return;

    // ---  PERF: promote to GPU & cache setters
    gsap.set(track, { willChange: "transform" });
    const setNoiseOpacity = gsap.quickSetter(noiseRef.current, "opacity");

    // === HORIZONTAL PIN & CONTAINER ANIMATION =================================
    const getDist = () => track.scrollWidth - window.innerWidth;

    const scrollTween = gsap.to(track, {
      x: () => -getDist(),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        end: () => `+=${getDist()}`,
        invalidateOnRefresh: true,
      },
    });

    // Progress bar ultra precisa
    ScrollTrigger.create({
      trigger: container,
      start: 0,
      end: () => `+=${getDist()}`,
      scrub: 1,
      onUpdate: (self) => {
        progressEl.style.transform = `scaleX(${self.progress})`;
        // ruido sutil cuando hay movimiento
        setNoiseOpacity(0.08 + self.getVelocity() / 8000);
      },
      onScrubComplete: () => setNoiseOpacity(0.06),
    });

    // === UTIL: crear triggers atados al containerAnimation =====================
    const within = (selector: string, cfg: ScrollTrigger.Vars) => ({
      trigger: selector,
      containerAnimation: scrollTween,
      ...cfg,
    });

    // === NAV inteligente: ir a sección moviendo la progress del tween =========
    const sections = gsap.utils.toArray<HTMLElement>(".sec");
    const goTo = (id: string) => {
      const el = document.querySelector<HTMLElement>(id);
      if (!el) return;
      const total = getDist();
      const progress = el.offsetLeft / total;
      gsap.to(scrollTween, { progress, duration: 0.9, ease: "power3.inOut" });
    };
    // expone para el nav local (delegación)
    (container as any).__goTo = goTo;

    // === ENTRADAS GLOBALES: clipPath reveal + blur in ==========================
    sections.forEach((s) => {
      gsap.fromTo(
        s,
        { filter: "blur(10px)", opacity: 0, clipPath: "inset(0 30% 0 30% round 24px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          clipPath: "inset(0 0% 0 0% round 24px)",
          duration: reduceMotion ? 0 : 0.9,
          ease: "power3.out",
          scrollTrigger: within(s, { start: "left 80%", end: "left 40%", scrub: 1 }),
        }
      );
    });

    // === SCROLLTRIGGER: box coreografía ======================================
    gsap.fromTo(
      ".st-box",
      { scale: 0, rotate: -180, opacity: 0 },
      {
        scale: 1,
        rotate: 0,
        opacity: 1,
        ease: "back.out(1.7)",
        scrollTrigger: within("#sec-st", { start: "left 75%", end: "left 45%", scrub: 1 }),
      }
    );
    gsap.to(".st-box", {
      keyframes: [
        { rotate: 180, scale: 1.15, duration: 1.2 },
        { y: -24, scale: 1.05, duration: 0.6 },
        { y: 0, rotate: 360, scale: 1, duration: 0.6 },
      ],
      ease: "power2.inOut",
      scrollTrigger: within("#sec-st", { start: "center center", end: "right center", scrub: 1 }),
    });

    // === MOTION PATH: nave con easing suave ===================================
    gsap.to(".mp-ship", {
      duration: 10,
      repeat: -1,
      ease: "sine.inOut",
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: 260, y: -100 },
          { x: 520, y: 0 },
          { x: 260, y: 100 },
          { x: 0, y: 0 },
        ],
        curviness: 2.2,
      },
    });

    // === FLIP: auto-flip + botón manual ======================================
    const flipOnce = () => {
      const items = gsap.utils.toArray<HTMLElement>(".flip-item");
      const state = Flip.getState(items);
      const grid = document.querySelector(".flip-grid")!;
      grid.classList.toggle("alt");
      Flip.from(state, {
        duration: 0.65,
        ease: "power1.inOut",
        stagger: 0.035,
        absolute: true,
        scale: true,
      });
    };
    ScrollTrigger.create(within("#sec-flip", { start: "center center", end: "right center", onEnter: flipOnce }));

    // === DRAGGABLE: inercia si existe + snap elegante =========================
    Draggable.create(".drag-ball", {
      type: "x,y",
      bounds: ".drag-area",
      edgeResistance: 0.65,
      inertia: !!(clubPlugins?.InertiaPlugin || (window as any).InertiaPlugin),
      onPress() { gsap.to(this.target, { scale: 1.08, duration: 0.15 }); },
      onDrag()  { gsap.to(this.target, { rotation: this.x * 0.12, duration: 0.08 }); },
      onRelease() { gsap.to(this.target, { scale: 1, rotation: 0, duration: 0.28, ease: "back.out(1.6)" }); },
    });

    // === OBSERVER: dirección del scroll ======================================
    Observer.create({
      target: window,
      type: "wheel,touch,scroll",
      onUp:   () => gsap.to(".obs-arrow", { rotation: -180, y: -22, duration: 0.25 }),
      onDown: () => gsap.to(".obs-arrow", { rotation: 0,     y:  22, duration: 0.25 }),
    });

    // === TEXTO: rotación de palabras =========================================
    const words = ["PODEROSO", "FLUIDO", "PROFESIONAL", "PRECISO", "ELEGANTE"];
    let i = 0;
    const tick = () => gsap.to(".text-rot", { duration: 0.55, text: words[(i++) % words.length], ease: "power2.inOut" });
    ScrollTrigger.create(within("#sec-text", { start: "left 78%", end: "left 40%", onEnter: tick, onEnterBack: tick }));

    // === BOTONES MAGNÉTICOS (micro-interacción) ===============================
    const magnets = gsap.utils.toArray<HTMLButtonElement>(".magnet");
    magnets.forEach((btn) => {
      const setX = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3" });
      const setY = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3" });
      const strength = 18;
      const enter = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        setX((mx / (r.width / 2)) * strength);
        setY((my / (r.height / 2)) * strength);
      };
      const leave = () => { setX(0); setY(0); };
      btn.addEventListener("mousemove", enter);
      btn.addEventListener("mouseleave", leave);
    });

    // === 3D tilt en tarjetas (perf con quickSetter) ===========================
    gsap.utils.toArray<HTMLElement>(".tilt").forEach((card) => {
      const rx = gsap.quickSetter(card, "rotateX", "deg");
      const ry = gsap.quickSetter(card, "rotateY", "deg");
      const tz = gsap.quickSetter(card, "z", "px");
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry(px * 12);
        rx(-py * 12);
        tz(24);
      };
      const off = () => { rx(0); ry(0); tz(0); };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", off);
    });

    // === Recompute on resize (distancia) ======================================
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(track);

    return () => {
      ro.disconnect();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      scrollTween.kill();
    };
  }, [reduceMotion, clubPlugins?.InertiaPlugin]);

  // click handler para el nav (usa __goTo inyectado)
  const handleNav = (to: string) => (rootRef.current as any)?.__goTo?.(to);

  return (
    <div ref={rootRef} className="relative w-full h-screen overflow-hidden text-white">
      {/* overlay de noise sutil, constante */}
      <div
        ref={noiseRef}
        className="pointer-events-none absolute inset-0 opacity-[.06] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        }}
      />

      {/* nav fijo superior */}
      <div className="sticky top-4 z-20 mx-auto max-w-6xl px-6 flex gap-2">
        {[
          ["#sec-st", "ScrollTrigger"],
          ["#sec-mp", "MotionPath"],
          ["#sec-flip", "Flip"],
          ["#sec-drag", "Draggable"],
          ["#sec-obs", "Observer"],
          ["#sec-text", "Text"],
        ].map(([to, label]) => (
          <button
            key={to}
            onClick={() => handleNav(to)}
            className="magnet px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition will-change-transform"
          >
            {label}
          </button>
        ))}
      </div>

      {/* pista horizontal */}
      <div ref={trackRef} className="flex h-full will-change-transform">
        {/* SCROLLTRIGGER */}
        <section id="sec-st" className="sec min-w-full h-full grid place-items-center px-16">
          <div className="tilt max-w-4xl text-center p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10">
            <h2 className="text-5xl md:text-6xl font-extrabold">ScrollTrigger</h2>
            <p className="mt-3 opacity-70">Control total del scroll como timeline</p>
            <div className="mt-8 h-72 grid place-items-center">
              <div className="st-box w-36 h-36 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 shadow-[0_20px_60px_rgba(0,0,0,.35)]" />
            </div>
          </div>
        </section>

        {/* MOTION PATH */}
        <section id="sec-mp" className="sec min-w-full h-full grid place-items-center px-16">
          <div className="tilt max-w-4xl text-center p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10">
            <h2 className="text-5xl md:text-6xl font-extrabold">MotionPath</h2>
            <p className="mt-3 opacity-70">Trayectorias curvas con rotación automática</p>
            <div className="relative mx-auto mt-8 w-full max-w-2xl h-64">
              <div className="mp-ship absolute w-20 h-20 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 grid place-items-center text-2xl shadow-[0_20px_60px_rgba(0,0,0,.35)]">
                🚀
              </div>
            </div>
          </div>
        </section>

        {/* FLIP */}
        <section id="sec-flip" className="sec min-w-full h-full grid place-items-center px-16">
          <div className="tilt max-w-5xl w-full p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10">
            <h2 className="text-center text-5xl md:text-6xl font-extrabold">Flip</h2>
            <p className="text-center mt-3 opacity-70">Transiciones reales entre layouts</p>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => document.querySelector(".flip-grid")?.classList.toggle("alt") || null}
                className="magnet px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
              >
                Toggle Layout
              </button>
            </div>

            <div className="flip-grid mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="flip-item h-28 md:h-32 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_20px_60px_rgba(0,0,0,.35)]"
                />
              ))}
            </div>

            <style jsx>{`
              .flip-grid.alt { display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap: .75rem; }
            `}</style>
          </div>
        </section>

        {/* DRAGGABLE */}
        <section id="sec-drag" className="sec min-w-full h-full grid place-items-center px-16">
          <div className="tilt max-w-4xl text-center w-full p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10">
            <h2 className="text-5xl md:text-6xl font-extrabold">Draggable</h2>
            <p className="mt-3 opacity-70">Inercia, límites y feedback</p>
            <div className="drag-area relative mx-auto mt-8 w-full max-w-3xl h-80 rounded-3xl border border-white/10 bg-white/[0.03]">
              <div className="drag-ball absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-2xl grid place-items-center text-3xl font-bold bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_20px_60px_rgba(0,0,0,.35)]">
                🎯
              </div>
            </div>
          </div>
        </section>

        {/* OBSERVER */}
        <section id="sec-obs" className="sec min-w-full h-full grid place-items-center px-16">
          <div className="tilt max-w-4xl text-center p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10">
            <h2 className="text-5xl md:text-6xl font-extrabold">Observer</h2>
            <p className="mt-3 opacity-70">Lee la dirección del scroll</p>
            <div className="mt-8 h-56 grid place-items-center">
              <div className="obs-arrow text-7xl select-none">⬇</div>
            </div>
          </div>
        </section>

        {/* TEXT */}
        <section id="sec-text" className="sec min-w-full h-full grid place-items-center px-16">
          <div className="tilt max-w-5xl text-center p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10">
            <h2 className="text-5xl md:text-6xl font-extrabold">TextPlugin</h2>
            <p className="mt-3 opacity-70">Mensajes que evolucionan</p>
            <div className="mt-8 text-5xl md:text-7xl font-black tracking-tight">
              GSAP es{" "}
              <span className="text-rot text-emerald-400 inline-block min-w-[10ch] align-baseline">
                INCREÍBLE
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* progress bar */}
      <div className="pointer-events-none absolute bottom-6 left-6 right-6 h-[3px] bg-white/10 overflow-hidden rounded">
        <div ref={progressRef} className="h-full origin-left bg-white/50" style={{ transform: "scaleX(0)" }} />
      </div>
    </div>
  );
}
