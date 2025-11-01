// src/app/page.tsx
import Hero from "@/components/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contacts from "@/components/sections/Contacts";

// nuevas en src/components/
import Timeline from "@/components/Timeline";
import CaseStudies from "@/components/CaseStudies";
import OpenSource from "@/components/OpenSource";
import Blog from "@/components/Blog";
import Talks from "@/components/Talks";
import Uses from "@/components/Uses";
import Now from "@/components/Now";

export default function Home() {
  return (
    <>
      <Hero />         {/* <- el Hero va aquí, arriba del resto */}

      <About />
      <Projects />

      <Timeline />
      <CaseStudies />
      <OpenSource />
      <Blog />
      <Talks />
      <Uses />
      <Now />

      <Contacts />

      <footer className="mx-auto my-20 max-w-6xl px-4 text-sm muted">
        © {new Date().getFullYear()} David — UI/Frontend
      </footer>
    </>
  );
}
