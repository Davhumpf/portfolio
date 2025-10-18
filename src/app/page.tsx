"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contacts from "@/components/sections/Contacts";

export default function Home() {
  return (
    <main id="top">
      <Header />
      <Hero />

      <About />
      <Projects />
      <Skills />
      <Contacts />

      <footer className="mx-auto my-20 max-w-6xl px-4 text-sm muted">
        © {new Date().getFullYear()} David — UI/Frontend
      </footer>
    </main>
  );
}
