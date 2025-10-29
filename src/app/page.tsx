import About from "@/app/components/sections/About";
import Projects from "@/app/components/sections/Projects";
import Skills from "@/app/components/sections/Skills";
import Contacts from "@/app/components/sections/Contacts";

// nuevas
import Timeline from "@/app/components/sections/Timeline";
import CaseStudies from "@/app/components/sections/CaseStudies";
import OpenSource from "@/app/components/sections/OpenSource";
import Blog from "@/app/components/sections/Blog";
import Playground from "@/app/components/sections/Playground";
import Talks from "@/app/components/sections/Talks";
import Uses from "@/app/components/sections/Uses";
import Now from "@/app/components/sections/Now";

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
