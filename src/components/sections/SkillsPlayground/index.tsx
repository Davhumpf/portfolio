"use client";
import { useEffect, useRef, useState } from "react";
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
import AnimeIntro from "./animeIntro";
import GSAPDemos from "./gsapDemos";

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
  DrawSVGPlugin?: any;
  MorphSVGPlugin?: any;
  SplitText?: any;
  ScrambleTextPlugin?: any;
  InertiaPlugin?: any;
  Physics2DPlugin?: any;
  PhysicsPropsPlugin?: any;
  GSDevTools?: any;
  MotionPathHelper?: any;
  ScrollSmoother?: any;
};

export default function SkillsPlayground() {
  const contentRef = useRef(null);
  const [clubPlugins, setClubPlugins] = useState<Club>({});

  // Carga opcional de plugins Club (si no existen, no rompen)
  useEffect(() => {
    const tryLoad = async (spec: string) => {
      try {
        const mod: any = await import(/* webpackIgnore: true */ spec);
        const plugin = mod?.default ?? mod;
        if (plugin) {
          try { gsap.registerPlugin(plugin); } catch {}
          return plugin;
        }
      } catch {
        // no instalado: ignorar
      }
      return undefined;
    };

    (async () => {
      const [
        DrawSVGPlugin,
        MorphSVGPlugin,
        SplitText,
        ScrambleTextPlugin,
        InertiaPlugin,
        Physics2DPlugin,
        PhysicsPropsPlugin,
        GSDevTools,
        MotionPathHelper,
        ScrollSmoother,
      ] = await Promise.all([
        tryLoad("gsap/DrawSVGPlugin"),
        tryLoad("gsap/MorphSVGPlugin"),
        tryLoad("gsap/SplitText"),
        tryLoad("gsap/ScrambleTextPlugin"),
        tryLoad("gsap/InertiaPlugin"),
        tryLoad("gsap/Physics2DPlugin"),
        tryLoad("gsap/PhysicsPropsPlugin"),
        tryLoad("gsap/GSDevTools"),
        tryLoad("gsap/MotionPathHelper"),
        tryLoad("gsap/ScrollSmoother"),
      ]);
      setClubPlugins({
        DrawSVGPlugin,
        MorphSVGPlugin,
        SplitText,
        ScrambleTextPlugin,
        InertiaPlugin,
        Physics2DPlugin,
        PhysicsPropsPlugin,
        GSDevTools,
        MotionPathHelper,
        ScrollSmoother,
      });
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div ref={contentRef}>
        <AnimeIntro />
        <GSAPDemos clubPlugins={clubPlugins} />
      </div>
    </div>
  );
}