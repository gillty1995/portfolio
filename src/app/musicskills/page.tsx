"use client";

import React, { Suspense } from "react";
import MusicSkills from "@/components/MusicSkills";
import Music from "@/components/Music";
import MusicInstruments from "@/components/MusicIntruments";
import Footer from "@/components/Footer";

export default function MusicPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen text-center">
          Loading...
        </div>
      }
    >
      <MusicSkills />
      <MusicInstruments />
      <Music />
      <Footer />
    </Suspense>
  );
}
