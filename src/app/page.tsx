// app/page.tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import MusicSkills from "@/components/MusicSkills";
import Music from "@/components/Music";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <MusicSkills />
      <Music />
      <Contact />
      <Footer />
    </>
  );
}
