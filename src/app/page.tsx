// app/page.tsx
import React, { Suspense } from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen text-center">
          Loading...
        </div>
      }
    >
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </Suspense>
  );
}
