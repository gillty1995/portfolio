// app/page.tsx
import React, { Suspense } from "react";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function HomePage() {
  return (
    <Suspense
      fallback={<LoadingScreen />}
    >
      <Hero />
      <FeaturedProjects />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </Suspense>
  );
}
