"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import MusicPulseBackground from "./MusicPulseBackground";

const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
};

export default function MusicSkills() {
  return (
    <section id="music" className="relative isolate min-h-[100svh] overflow-hidden bg-[#fbfbfa] text-slate-900">
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.08]"><MusicPulseBackground /></div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_21%_55%,rgba(218,225,231,0.10),transparent_31%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[18vh] bg-gradient-to-b from-transparent via-[#f2f3f3]/75 to-[#f3f4f6]" />

      <div className="relative z-[2] mx-auto flex min-h-[100svh] w-full max-w-[1720px] flex-col px-5 pb-7 pt-20 sm:px-10 sm:pt-24 lg:px-16 lg:pb-10">
        <div className="relative flex flex-1 items-center justify-start pb-24 sm:pb-28 lg:pb-32">
          <div className="relative z-10 w-full max-w-[760px] -translate-y-2 text-center lg:w-[54%] lg:translate-x-[5%] lg:text-left">
            <h1 className="text-[clamp(2rem,8.5vw,4.2rem)] font-light leading-[1.05] tracking-[0.01em] text-[#171d23] sm:whitespace-nowrap sm:text-[clamp(1.85rem,3.55vw,4.2rem)]">Studio. Stage. Sync.</h1>
            <p className="mx-auto mt-5 max-w-[34rem] text-[clamp(0.68rem,2.6vw,0.88rem)] font-light leading-[1.55] tracking-[-0.02em] text-slate-600 sm:max-w-[720px] sm:whitespace-nowrap sm:text-[clamp(0.62rem,0.82vw,0.88rem)] lg:mx-0">Musician for over a decade | Music teacher for 8 years | Sync licensing since 2022.</p>
            <p className="mx-auto mt-3 max-w-[31rem] text-[clamp(0.76rem,2.8vw,0.9rem)] font-light leading-[1.55] tracking-[-0.02em] text-slate-400 sm:max-w-[620px] sm:text-[clamp(0.72rem,0.95vw,0.9rem)] lg:mx-0">I write, record, perform, teach, and create sync-ready music for artists, brands, and film.</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-9">
              <Link href="#albums" onClick={(event) => handleSectionClick(event, "albums")} className="inline-flex min-h-[52px] cursor-pointer items-center justify-center rounded-full bg-[#20272d] px-8 text-[0.84rem] font-normal tracking-[0.01em] text-white shadow-[0_12px_24px_rgba(15,23,42,0.15)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20272d] focus-visible:ring-offset-4">Listen <span aria-hidden="true" className="ml-2 text-base">→</span></Link>
              <Link href="/?contactFromMusic=true#contact" className="inline-flex min-h-[52px] cursor-pointer items-center justify-center rounded-full border border-slate-300/80 bg-white/50 px-8 text-[0.84rem] font-normal tracking-[0.01em] text-[#20272d] shadow-[0_10px_22px_rgba(15,23,42,0.045)] backdrop-blur-[3px] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20272d] focus-visible:ring-offset-4">Let&apos;s talk</Link>
            </div>
          </div>

          <div className="pointer-events-none absolute right-[-8%] top-1/2 z-[2] hidden h-[min(52vw,620px)] w-[min(52vw,620px)] -translate-y-[47%] lg:block">
            <Image src="/images/music-hero/another-night-record-v3.png" alt="Another Night Beat Tape record and album sleeve" fill priority sizes="620px" className="object-contain" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2" aria-label="Music sections">
          <Link href="#albums" onClick={(event) => handleSectionClick(event, "albums")} className="group flex min-h-[104px] cursor-pointer items-center gap-4 overflow-hidden rounded-[28px] border border-white/90 bg-white/58 px-4 py-3 text-left shadow-[0_12px_35px_rgba(71,85,105,0.045)] backdrop-blur-[3px] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20272d] focus-visible:ring-offset-4 sm:min-h-[128px] sm:px-5">
            <span className="relative h-[78px] w-[106px] shrink-0 overflow-hidden rounded-[16px] border border-white/80 bg-[#f4f6f7] shadow-[0_5px_12px_rgba(71,85,105,0.05)] sm:h-[98px] sm:w-[132px]"><Image src="/images/another-night-album.jpg" alt="" fill sizes="132px" className="object-cover transition-transform duration-500 group-hover:scale-105" /></span>
            <span className="min-w-0"><span className="block text-[clamp(0.88rem,1.05vw,1.02rem)] font-normal tracking-[-0.035em] text-slate-800">Albums</span><span className="mt-1 block text-[0.72rem] font-light tracking-[-0.02em] text-slate-400">Listen to the releases</span></span>
          </Link>
          <Link href="#musicinstruments" onClick={(event) => handleSectionClick(event, "musicinstruments")} className="group flex min-h-[104px] cursor-pointer items-center gap-4 overflow-hidden rounded-[28px] border border-white/90 bg-white/58 px-4 py-3 text-left shadow-[0_12px_35px_rgba(71,85,105,0.045)] backdrop-blur-[3px] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20272d] focus-visible:ring-offset-4 sm:min-h-[128px] sm:px-5">
            <span className="relative flex h-[78px] w-[106px] shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-white/80 bg-white shadow-[0_5px_12px_rgba(71,85,105,0.05)] sm:h-[98px] sm:w-[132px]"><Image src="/images/instruments.jpg" alt="" fill sizes="132px" className="object-cover transition-transform duration-500 group-hover:scale-105" /></span>
            <span className="min-w-0"><span className="block text-[clamp(0.88rem,1.05vw,1.02rem)] font-normal tracking-[-0.035em] text-slate-800">Music skills</span><span className="mt-1 block text-[0.72rem] font-light tracking-[-0.02em] text-slate-400">Instruments, production, and teaching</span></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
