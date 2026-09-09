// app/page.tsx
import React, { Suspense } from "react";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
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
      <Skills />
      <Contact />
      <Footer />
    </Suspense>
  );
}
