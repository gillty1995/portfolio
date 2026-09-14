"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LiquidHeroBackground from "./LiquidHeroBackground";
import ProjectModal from "./ProjectModal";
import { projectsData } from "@/utils/ProjectData";

const selectedProjects = [
  {
    projectId: 0,
    name: "Picio",
    type: "Mobile product",
    image: "/images/portfolio-hero/picio-single-hero.png",
    className: "scale-[0.66]",
    imageFit: "object-contain",
  },
  {
    projectId: 1,
    name: "LeapLogger",
    type: "Web app",
    image: "/images/portfolio-hero/leaplogger-card-ui.png",
    className: "scale-[1.04]",
    imageFit: "object-cover",
  },
  {
    projectId: 2,
    name: "Clickk",
    type: "Creator platform",
    image: "/images/portfolio-hero/clickk-card-ui.png",
    className: "scale-[1.04]",
    imageFit: "object-cover",
  },
] as const;

export default function Hero() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const router = useRouter();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const featuredProjects = selectedProjects
    .map((project) => projectsData.find((projectData) => projectData.id === project.projectId))
    .filter((project): project is (typeof projectsData)[number] => Boolean(project));
  const selectedProjectIndex = selectedProjectId === null
    ? -1
    : featuredProjects.findIndex((project) => project.id === selectedProjectId);
  const selectedProject = selectedProjectIndex >= 0 ? featuredProjects[selectedProjectIndex] : null;

  return (
    <section
      id="hero"
      className={`relative isolate min-h-[100svh] overflow-hidden bg-[#fbfbfa] text-slate-900 ${
        selectedProjectId !== null ? "z-[1001]" : ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.08]">
        <LiquidHeroBackground />
      </div>
      <Image
        src="/images/portfolio-hero/picio-hero-background-v1.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none absolute inset-0 z-0 hidden origin-right scale-[0.58] object-cover object-center lg:block"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_21%_55%,rgba(218,225,231,0.10),transparent_31%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[18vh] bg-gradient-to-b from-transparent via-[#f2f3f3]/75 to-[#e5e5e5]" />

      <div
        className="relative z-[2] mx-auto flex min-h-[100svh] w-full max-w-[1720px] flex-col justify-center gap-4 px-5 pb-7 pt-20 sm:justify-between sm:gap-0 sm:px-10 sm:pt-24 lg:px-16 lg:pb-10"
        style={{ fontFamily: "LexendZetta, Arial, sans-serif" }}
      >
        <div className="relative flex flex-none items-center justify-center pb-0 sm:flex-1 sm:pb-28 lg:pb-32">
          <div className="relative z-10 max-w-[1000px] translate-y-0 text-center sm:translate-y-[29%]">
            <h1 className="text-[clamp(2.25rem,4.6vw,5rem)] font-light leading-[1.08] tracking-[0.02em] text-[#171d23]">
              Gill Hermelin
            </h1>
            <p className="mx-auto mt-6 max-w-[680px] text-[clamp(0.7rem,0.9vw,0.88rem)] font-light leading-[1.6] tracking-[-0.02em] text-slate-500">
              full-stack engineer building maintainable systems and modern products.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-9 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={() => router.push("/projects")}
                className="inline-flex min-h-[52px] w-full max-w-[24rem] cursor-pointer items-center justify-center rounded-full bg-[#20272d] px-8 text-[0.84rem] font-normal tracking-[0.01em] text-white shadow-[0_12px_24px_rgba(15,23,42,0.15)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20272d] focus-visible:ring-offset-4 sm:w-auto"
              >
                All projects
              </button>
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="inline-flex min-h-[52px] w-full max-w-[24rem] cursor-pointer items-center justify-center rounded-full border border-slate-300/80 bg-white/50 px-8 text-[0.84rem] font-normal tracking-[0.01em] text-[#20272d] shadow-[0_10px_22px_rgba(15,23,42,0.045)] backdrop-blur-[3px] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20272d] focus-visible:ring-offset-4 sm:w-auto"
              >
                Let&apos;s talk
              </button>
            </div>
          </div>

        </div>

        <div className="grid gap-4 sm:grid-cols-3" aria-label="Selected projects">
          {selectedProjects.map((project) => (
            <button
              type="button"
              key={project.name}
              onClick={() => setSelectedProjectId(project.projectId)}
              className="group flex min-h-[104px] cursor-pointer items-center gap-4 overflow-hidden rounded-[28px] border border-white/90 bg-white/58 px-4 py-3 text-left shadow-[0_12px_35px_rgba(71,85,105,0.045)] backdrop-blur-[3px] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20272d] focus-visible:ring-offset-4 sm:min-h-[128px] sm:px-5"
            >
              <span className="relative h-[78px] w-[106px] shrink-0 overflow-hidden rounded-[16px] border border-white/80 bg-[#f4f6f7] shadow-[0_5px_12px_rgba(71,85,105,0.05)] sm:h-[98px] sm:w-[132px]">
                <span className="absolute inset-[6px] overflow-hidden rounded-[11px] bg-white">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 90px, 114px"
                    className={`${project.imageFit} ${project.className}`}
                  />
                </span>
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[clamp(0.88rem,1.05vw,1.02rem)] font-normal tracking-[-0.035em] text-slate-800">
                  {project.name}
                </span>
                <span className="mt-1 block text-[0.72rem] font-light tracking-[-0.02em] text-slate-400">
                  {project.type}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedProject && selectedProjectIndex >= 0 && (
        <ProjectModal
          project={selectedProject}
          position={selectedProjectIndex + 1}
          total={featuredProjects.length}
          onClose={() => setSelectedProjectId(null)}
          onPrevious={
            selectedProjectIndex > 0
              ? () => setSelectedProjectId(featuredProjects[selectedProjectIndex - 1].id)
              : undefined
          }
          onNext={
            selectedProjectIndex < featuredProjects.length - 1
              ? () => setSelectedProjectId(featuredProjects[selectedProjectIndex + 1].id)
              : undefined
          }
        />
      )}
    </section>
  );
}
