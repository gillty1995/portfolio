"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  featuredProjectIds,
  featuredProjectImages,
  projectsData,
} from "@/utils/ProjectData";
import ProjectModal from "./ProjectModal";

const CARD_LAYOUTS = [
  { x: "0vw", y: 22, scale: 1.08, rotate: 0, opacity: 1 },
  {
    x: "clamp(7rem, 27vw, 32rem)",
    y: 46,
    scale: 0.78,
    rotate: 1.5,
    opacity: 0.88,
  },
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
  const shouldReduceMotion = useReducedMotion();
  const wheelLockRef = useRef(false);
  const wheelTimerRef = useRef<number | undefined>(undefined);
  const [{ index: activeIndex, direction }, setNavigation] = useState({
    index: 0,
    direction: 1,
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProjects = featuredProjectIds
    .map((id) => projectsData.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));

  const navigateTo = useCallback(
    (nextIndex: number) => {
      setNavigation((current) => {
        const index = clamp(nextIndex, 0, featuredProjects.length - 1);
        if (index === current.index) return current;

        return {
          index,
          direction: index > current.index ? 1 : -1,
        };
      });
    },
    [featuredProjects.length]
  );

  const openProject = useCallback(
    (project: Project) => {
      const projectIndex = featuredProjects.findIndex(
        (featuredProject) => featuredProject.id === project.id
      );
      if (projectIndex < 0) return;

      navigateTo(projectIndex);
      setSelectedProject(project);
    },
    [featuredProjects, navigateTo]
  );

  if (!featuredProjects.length) return null;

  const carouselEntries = (
    activeIndex === 0
      ? featuredProjects.slice(0, CARD_LAYOUTS.length)
      : featuredProjects.slice(
          activeIndex - 1,
          activeIndex + CARD_LAYOUTS.length - 1
        )
  ).map((project, slot) => ({ project, slot }));
  const selectedProjectIndex = selectedProject
    ? featuredProjects.findIndex((project) => project.id === selectedProject.id)
    : -1;

  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    const horizontalDelta =
      Math.abs(event.deltaX) >= Math.abs(event.deltaY)
        ? event.deltaX
        : event.shiftKey
        ? event.deltaY
        : 0;

    if (Math.abs(horizontalDelta) < 12 || wheelLockRef.current) return;

    event.preventDefault();
    wheelLockRef.current = true;
    navigateTo(activeIndex + (horizontalDelta > 0 ? 1 : -1));
    wheelTimerRef.current = window.setTimeout(() => {
      wheelLockRef.current = false;
    }, shouldReduceMotion ? 0 : 520);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) => {
    if (Math.abs(info.offset.x) < 56) return;
    navigateTo(activeIndex + (info.offset.x < 0 ? 1 : -1));
  };

  return (
    <section
      id="featured-work"
      aria-label="My work"
      style={
        {
          backgroundImage:
            "radial-gradient(ellipse at 50% 52%, rgba(255, 255, 255, 0.92) 0%, rgba(229, 231, 235, 0.3) 42%, rgba(229, 229, 229, 0) 74%), linear-gradient(to bottom, #e5e5e5 0%, #e5e7eb 50%, #e5e5e5 100%)",
        } as CSSProperties
      }
      className="relative overflow-hidden py-20 text-gray-800 sm:py-24"
    >
      <div className="pointer-events-none absolute bottom-[10%] left-1/2 h-28 w-[min(72vw,900px)] -translate-x-1/2 rounded-[50%] bg-gray-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[min(78dvh,760px)] w-full max-w-[1100px] flex-col items-center justify-center px-5 sm:px-8">
        <h2 className="sr-only">My work</h2>

        <div
          aria-label="Swipe or horizontally scroll to browse work"
          onWheel={handleWheel}
          className="relative h-[clamp(340px,64vh,620px)] w-full max-w-[680px] touch-pan-y"
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {carouselEntries.map(({ project, slot }) => {
              const isActiveCard = project.id === featuredProjects[activeIndex].id;
              const layout =
                activeIndex === 0
                  ? CARD_LAYOUTS[slot]
                  : [CARD_LAYOUTS[2], CARD_LAYOUTS[0], CARD_LAYOUTS[1], CARD_LAYOUTS[3]][slot];
              const activeScale = isActiveCard && project.id === 3 ? 1.2 : layout.scale;
              const image =
                featuredProjectImages[project.id] ?? project.backgroundImage;
              const isCustomImage = Boolean(featuredProjectImages[project.id]);

              return (
                <motion.div
                  key={project.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.82, filter: "blur(5px)" }}
                  animate={{
                    x: layout.x,
                    y: layout.y,
                    scale: activeScale,
                    rotate: layout.rotate,
                    opacity: layout.opacity,
                    filter: "blur(0px)",
                  }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.82, filter: "blur(5px)" }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          x: { type: "spring", stiffness: 180, damping: 24 },
                          y: { type: "spring", stiffness: 180, damping: 24 },
                          scale: { duration: 0.45, ease: "easeInOut" },
                          rotate: { duration: 0.45, ease: "easeInOut" },
                          opacity: { duration: 0.45, ease: "easeInOut" },
                          filter: { duration: 0.45, ease: "easeInOut" },
                        }
                  }
                  className={`absolute inset-0 m-auto h-[56vh] max-h-[620px] min-h-[300px] ${
                    isActiveCard
                      ? "w-[min(92vw,680px)]"
                      : "w-[min(64vw,500px)]"
                  } cursor-grab bg-transparent text-left outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-4 focus-visible:ring-offset-gray-200 active:cursor-grabbing sm:h-[64vh] ${
                    !isActiveCard ? "max-md:hidden" : "z-10"
                  } ${
                    isCustomImage
                      ? "overflow-visible shadow-none"
                      : "overflow-hidden rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.05)]"
                  }`}
                  style={{
                    willChange: "opacity, filter, transform",
                    zIndex: isActiveCard ? 20 : CARD_LAYOUTS.length - slot,
                    pointerEvents: "auto",
                  }}
                >
                  <Image
                    src={image}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    fill
                    sizes="(max-width: 768px) 92vw, 680px"
                    className={`absolute inset-0 h-full w-full select-none ${
                      isCustomImage ? "object-contain" : "object-cover"
                    }`}
                  />
                  <motion.button
                    type="button"
                    aria-label={
                      isActiveCard
                        ? `Open details for ${project.title}`
                        : `Move ${project.title} to the center`
                    }
                    onClick={() =>
                      isActiveCard
                        ? openProject(project)
                        : navigateTo(
                            featuredProjects.findIndex(
                              (featuredProject) =>
                                featuredProject.id === project.id
                            )
                          )
                    }
                    onDragEnd={isActiveCard ? handleDragEnd : undefined}
                    drag={isActiveCard ? "x" : false}
                    dragElastic={0.14}
                    dragMomentum={false}
                    className={
                      isActiveCard
                        ? "absolute inset-0 cursor-grab bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-4 focus-visible:ring-offset-gray-200 active:cursor-grabbing"
                        : `absolute top-1/4 h-1/2 w-1/2 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-4 focus-visible:ring-offset-gray-200 ${
                            slot === 0 ? "left-0" : "right-0"
                          }`
                    }
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing work {activeIndex + 1} of {featuredProjects.length}: {featuredProjects[activeIndex].title}
        </p>
      </div>

      <AnimatePresence>
        {selectedProject && selectedProjectIndex >= 0 && (
          <ProjectModal
            key="project-focus-view"
            project={selectedProject}
            position={selectedProjectIndex + 1}
            total={featuredProjects.length}
            onClose={() => setSelectedProject(null)}
            onPrevious={
              selectedProjectIndex > 0
                ? () => openProject(featuredProjects[selectedProjectIndex - 1])
                : undefined
            }
            onNext={
              selectedProjectIndex < featuredProjects.length - 1
                ? () => openProject(featuredProjects[selectedProjectIndex + 1])
                : undefined
            }
          />
        )}
      </AnimatePresence>
    </section>
  );
}
