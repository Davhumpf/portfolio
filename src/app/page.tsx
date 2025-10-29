import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contacts from "@/components/sections/Contacts";

// nuevas
import Timeline from "@/components/Timeline";
import CaseStudies from "@/components/CaseStudies";
import OpenSource from "@/components/OpenSource";
import Blog from "@/components/Blog";
import Playground from "@/components/Playground";
import Talks from "@/components/Talks";
import Uses from "@/components/Uses";
import Now from "@/components/Now";

export default function Home() {
  return (
    <>
      <About />
      <Projects />
      <Skills />
      <Timeline />
      <CaseStudies />
      <OpenSource />
      <Blog />
      <Playground />
      <Talks />
      <Uses />
      <Now />
      <Contacts />
    </>
  );
}
