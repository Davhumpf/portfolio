// src/app/page.tsx
import Hero from "@/components/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contacts from "@/components/sections/Contacts";

export default function Home() {
  return (
    <div className="window-stack portfolio-flow">
      <Hero />
      <About />
      <Projects />
      <Contacts />

      <footer className="mx-auto mt-10 mb-8 max-w-6xl px-4 text-sm muted">
        © {new Date().getFullYear()} David — UI/Frontend
      </footer>
    </div>
  );
}
