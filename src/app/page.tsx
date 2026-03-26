// src/app/page.tsx
import Hero from "@/components/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Timeline from "@/components/Timeline";
import CaseStudies from "@/components/CaseStudies";
import Contacts from "@/components/sections/Contacts";
import OpenSource from "@/components/OpenSource";
import Blog from "@/components/Blog";
import Talks from "@/components/Talks";
import Uses from "@/components/Uses";
import Now from "@/components/Now";

export default function Home() {
  return (
    <div className="window-stack portfolio-flow">
      <Hero />

      <div className="portfolio-rows">
        <div className="portfolio-row">
          <div className="portfolio-cell"><About /></div>
          <div className="portfolio-cell"><Projects /></div>
        </div>

        <div className="portfolio-row">
          <div className="portfolio-cell"><Timeline /></div>
          <div className="portfolio-cell"><CaseStudies /></div>
        </div>

        <div className="portfolio-row">
          <div className="portfolio-cell"><Contacts /></div>
          <div className="portfolio-cell"><OpenSource /></div>
        </div>

        <div className="portfolio-row">
          <div className="portfolio-cell"><Blog /></div>
          <div className="portfolio-cell"><Talks /></div>
        </div>

        <div className="portfolio-row">
          <div className="portfolio-cell"><Uses /></div>
          <div className="portfolio-cell"><Now /></div>
        </div>
      </div>

      <footer className="mx-auto mt-10 mb-8 max-w-6xl px-4 text-sm muted">
        © {new Date().getFullYear()} David — UI/Frontend
      </footer>
    </div>
  );
}
