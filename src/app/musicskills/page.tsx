"use client";

import React, { Suspense } from "react";
import MusicSkills from "@/components/MusicSkills";
import Music from "@/components/Music";
import MusicInstruments from "@/components/MusicIntruments";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function MusicPage() {
  return (
    <Suspense
      fallback={<LoadingScreen />}
    >
      <MusicSkills />
      <MusicInstruments />
      <Music />
      <Footer />
    </Suspense>
  );
}
