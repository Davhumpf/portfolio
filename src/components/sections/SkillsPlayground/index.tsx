"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ScrollTrigger,
  ScrollSmoother,
} from "gsap/all";
import Section from "@/components/Section";
import AnimeIntro from "./animeIntro";
import GSAPDemos from "./gsapDemos";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SkillsPage() {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: container.current!,
      content: container.current!,
      smooth: 1.2,
      effects: true,
    });

    return () => smoother.kill();
  }, []);

  return (
    <Section id="skills" title="Skill Playground" subtitle="GSAP + Anime.js">
      <div ref={container} className="relative overflow-hidden">
        <AnimeIntro />
        <GSAPDemos />
      </div>
    </Section>
  );
}
