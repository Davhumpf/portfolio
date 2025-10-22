"use client";
import { useEffect } from "react";
import gsap from "gsap";
import {
  ScrollTrigger,
  DrawSVGPlugin,
  MorphSVGPlugin,
  MotionPathPlugin,
  Flip,
  Draggable,
  SplitText,
  ScrambleTextPlugin,
  Physics2DPlugin,
} from "gsap/all";

gsap.registerPlugin(
  ScrollTrigger,
  DrawSVGPlugin,
  MorphSVGPlugin,
  MotionPathPlugin,
  Flip,
  Draggable,
  SplitText,
  ScrambleTextPlugin,
  Physics2DPlugin
);

export default function GSAPDemos() {
  useEffect(() => {
    // ScrollTrigger demo
    gsap.from(".demo-scroll", {
      x: -200,
      opacity: 0,
      scrollTrigger: { trigger: ".demo-scroll", start: "top 80%" },
    });

    // DrawSVG demo
    gsap.fromTo(".demo-svg path", { drawSVG: "0%" }, {
      drawSVG: "100%",
      duration: 2,
      ease: "power2.inOut",
      scrollTrigger: { trigger: ".demo-svg", start: "top 80%" },
    });

    // SplitText demo
    const split = new SplitText(".demo-split", { type: "chars" });
    gsap.from(split.chars, {
      opacity: 0,
      y: 40,
      stagger: 0.05,
      scrollTrigger: { trigger: ".demo-split", start: "top 80%" },
    });

    // MotionPath demo
    gsap.to(".demo-ball", {
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      motionPath: {
        path: [{ x: 0, y: 0 }, { x: 150, y: -100 }, { x: 300, y: 0 }],
        curviness: 1.5,
      },
    });
  }, []);

  return (
    <div className="space-y-64 py-40">
      <div className="demo-scroll text-center text-4xl font-bold">ScrollTrigger</div>
      <svg className="demo-svg w-64 mx-auto" viewBox="0 0 200 200">
        <path d="M10 100 Q 95 10 180 100 Q 95 190 10 100Z" stroke="currentColor" strokeWidth="4" fill="none" />
      </svg>
      <div className="demo-split text-center text-3xl font-semibold">SplitText Animation</div>
      <div className="relative h-64 flex justify-center items-center">
        <div className="demo-ball w-10 h-10 bg-green-400 rounded-full"></div>
      </div>
    </div>
  );
}
