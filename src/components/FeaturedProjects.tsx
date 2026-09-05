"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  featuredProjectIds,
  featuredProjectImages,
  projectsData,
} from "@/utils/ProjectData";
import ProjectModal from "./ProjectModal";

const SNAP_DISTANCE = 340;
const CARD_LAYOUTS = [
  { x: "0vw", y: 22, scale: 1.08, rotate: 0, opacity: 1 },
  { x: "clamp(7rem, 27vw, 32rem)", y: 46, scale: 0.78, rotate: 1.5, opacity: 0.88 },
  {
    x: "calc(-1 * clamp(7rem, 27vw, 32rem))",
    y: 58,
    scale: 0.66,
    rotate: -1.5,
    opacity: 0.7,
  },
  {
    x: "clamp(5rem, 18vw, 20rem)",
    y: 8,
    scale: 0.54,
    rotate: 2.5,
    opacity: 0.52,
  },
] as const;

type Project = (typeof projectsData)[number];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProjects = featuredProjectIds
    .map((id) => projectsData.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section || !featuredProjects.length) return;

      const sectionScroll = window.scrollY - section.offsetTop;
      const nextIndex = clamp(
        Math.floor(Math.max(0, sectionScroll) / SNAP_DISTANCE),
        0,
        featuredProjects.length - 1
      );
      setActiveIndex(nextIndex);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT"
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          clamp(current + 1, 0, featuredProjects.length - 1)
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          clamp(current - 1, 0, featuredProjects.length - 1)
        );
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [featuredProjects.length]);

  if (!featuredProjects.length) return null;

  const scrollTrackLength = SNAP_DISTANCE * featuredProjects.length;

  return (
    <section
      id="featured-work"
      ref={sectionRef}
      style={
        {
          "--featured-scroll-track": `${scrollTrackLength}px`,
          backgroundImage:
            "radial-gradient(ellipse at 50% 64%, rgba(255, 255, 255, 0.9) 0%, rgba(229, 231, 235, 0.28) 38%, rgba(229, 229, 229, 0) 70%), linear-gradient(to bottom, #e5e5e5 0%, #e5e7eb 50%, #e5e5e5 100%)",
        } as CSSProperties
      }
      className="relative h-[calc(100dvh+var(--featured-scroll-track))] text-gray-800"
    >
      <div className="sticky top-0 grid h-[100dvh] place-items-center px-5 py-6 sm:px-8 sm:py-8">
        <h2 className="sr-only">Featured projects</h2>

        <div className="pointer-events-none absolute bottom-[8%] left-1/2 h-24 w-[min(72vw,900px)] -translate-x-1/2 rounded-[50%] bg-gray-500/10 blur-3xl" />

        <div className="grid-stack relative w-full max-w-[680px]">
          {featuredProjects.map((project, index) => {
            const offsetIndex = index - activeIndex;
            const isPast = activeIndex > index;
            const layoutIndex = clamp(
              offsetIndex,
              0,
              CARD_LAYOUTS.length - 1
            );
            const layout = CARD_LAYOUTS[layoutIndex];
            const activeScale =
              offsetIndex === 0 && project.id === 3 ? 1.2 : layout.scale;
            const horizontalPosition =
              offsetIndex === 1 && project.id === 4
                ? "clamp(8rem, 32vw, 38rem)"
                : layout.x;
            const image =
              featuredProjectImages[project.id] ?? project.backgroundImage;
            const isCustomImage = Boolean(featuredProjectImages[project.id]);

            return (
              <motion.button
                key={project.id}
                type="button"
                aria-label={`Open details for ${project.title}`}
                onClick={() => setSelectedProject(project)}
                className={`relative h-[56vh] max-h-[620px] min-h-[300px] w-[min(92vw,680px)] cursor-pointer bg-transparent text-left outline-none focus-visible:ring-2 focus-visible:ring-gray-800 sm:h-[64vh] ${
                  isCustomImage
                    ? "overflow-visible shadow-none"
                    : "overflow-hidden rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.05)]"
                }`}
                initial={false}
                animate={{
                  x: horizontalPosition,
                  y: layout.y,
                  scale: activeScale,
                  rotate: layout.rotate,
                  transition: {
                    type: "spring",
                    stiffness: 180,
                    damping: 22,
                    mass: 0.8,
                  },
                }}
                style={{
                  willChange: "opacity, filter, transform",
                  filter: `blur(${isPast ? 2 : 0}px)`,
                  opacity: isPast ? 0 : layout.opacity,
                  transitionProperty: "opacity, filter",
                  transitionDuration: "200ms",
                  transitionTimingFunction: "ease-in-out",
                  zIndex: featuredProjects.length - index,
                  pointerEvents: isPast ? "none" : "auto",
                }}
              >
                <div
                  className={`absolute inset-0 bg-center bg-no-repeat ${
                    isCustomImage ? "bg-contain" : "bg-cover"
                  }`}
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
