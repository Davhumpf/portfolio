// src/app/page.tsx
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import SectionPlaceholder from "@/components/SectionPlaceholder";

const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <SectionPlaceholder title="Sobre mí" />,
});
const Projects = dynamic(() => import("@/components/sections/Projects"), {
  loading: () => <SectionPlaceholder title="Proyectos" />,
});
const Contacts = dynamic(() => import("@/components/sections/Contacts"), {
  loading: () => <SectionPlaceholder title="Contacto" />,
});
const Timeline = dynamic(() => import("@/components/Timeline"), {
  loading: () => <SectionPlaceholder title="Experiencia" />,
});
const CaseStudies = dynamic(() => import("@/components/CaseStudies"), {
  loading: () => <SectionPlaceholder title="Casos de estudio" />,
});
const OpenSource = dynamic(() => import("@/components/OpenSource"), {
  loading: () => <SectionPlaceholder title="Open Source" />,
});
const Blog = dynamic(() => import("@/components/Blog"), {
  loading: () => <SectionPlaceholder title="Blog" />,
});
const Talks = dynamic(() => import("@/components/Talks"), {
  loading: () => <SectionPlaceholder title="Charlas" />,
});
const Uses = dynamic(() => import("@/components/Uses"), {
  loading: () => <SectionPlaceholder title="Uses" />,
});
const Now = dynamic(() => import("@/components/Now"), {
  loading: () => <SectionPlaceholder title="Now" />,
});

export default function Home() {
  return (
    <div className="window-stack">
      <Hero />

      <div className="window-grid">
        <About />
        <Projects />
      </div>

      <div className="window-grid">
        <Timeline />
        <CaseStudies />
      </div>

      <div className="window-grid">
        <OpenSource />
        <Blog />
      </div>

      <div className="window-grid">
        <Talks />
        <Uses />
      </div>

      <div className="window-grid">
        <Now />
        <Contacts />
      </div>

      <footer className="mx-auto my-20 max-w-6xl px-4 text-sm muted">
        © {new Date().getFullYear()} David — UI/Frontend
      </footer>
    </div>
  );
}
