"use client";

import {
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  featuredProjectIds,
  featuredProjectImages,
  projectCaseStudySummaries,
  projectsData,
} from "@/utils/ProjectData";
import ProjectModal from "./ProjectModal";
import { keepMotionOnRenderLoop } from "@/utils/keepMotionOnRenderLoop";

const CARD_LAYOUTS = [
  {
    x: "calc(-1 * clamp(7rem, 27vw, 32rem))",
    y: 46,
    scale: 0.72,
    rotate: -1.5,
    opacity: 0.72,
  },
  { x: "0vw", y: 22, scale: 1.2, rotate: 0, opacity: 1 },
  {
    x: "clamp(7rem, 27vw, 32rem)",
    y: 46,
    scale: 0.72,
    rotate: 1.5,
    opacity: 0.72,
  },
] as const;

type Project = (typeof projectsData)[number];

function wrapIndex(value: number, length: number) {
  return ((value % length) + length) % length;
}

function FeaturedProjects() {
  const shouldReduceMotion = useReducedMotion();
  const wheelLockRef = useRef(false);
  const wheelTimerRef = useRef<number | undefined>(undefined);
  const pointerStartRef = useRef<{ id: number; x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const suppressClickTimerRef = useRef<number | undefined>(undefined);
  const [{ index: activeIndex, direction }, setNavigation] = useState({
    index: 0,
    direction: 1,
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProjects = useMemo(
    () =>
      featuredProjectIds
        .map((id) => projectsData.find((project) => project.id === id))
        .filter((project): project is Project => Boolean(project)),
    [],
  );

  const navigateTo = useCallback(
    (nextIndex: number) => {
      setNavigation((current) => {
        const index = wrapIndex(nextIndex, featuredProjects.length);
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

  const carouselEntries = [-1, 0, 1].map((offset, slot) => ({
    project: featuredProjects[wrapIndex(activeIndex + offset, featuredProjects.length)],
    slot,
  }));
  const selectedProjectIndex = selectedProject
    ? featuredProjects.findIndex((project) => project.id === selectedProject.id)
    : -1;
  const activeProject = featuredProjects[activeIndex];
  const activeSummary = projectCaseStudySummaries[activeProject.id];

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

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    pointerStartRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    const start = pointerStartRef.current;
    if (!start || start.id !== event.pointerId) return;

    pointerStartRef.current = null;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < 56 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    suppressClickRef.current = true;
    if (suppressClickTimerRef.current !== undefined) {
      window.clearTimeout(suppressClickTimerRef.current);
    }
    suppressClickTimerRef.current = window.setTimeout(() => {
      suppressClickRef.current = false;
      suppressClickTimerRef.current = undefined;
    }, 0);
    navigateTo(activeIndex + (deltaX < 0 ? 1 : -1));
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
      className="relative overflow-hidden py-0 text-gray-800"
    >
      <div className="pointer-events-none absolute bottom-[10%] left-1/2 h-28 w-[min(72vw,900px)] -translate-x-1/2 rounded-[50%] bg-gray-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[1180px] items-center justify-center px-5 sm:px-8">
        <h2 className="sr-only">My work</h2>

        <div className="flex w-full flex-col items-center">
          <div
            aria-label="Swipe or horizontally scroll to browse work"
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              pointerStartRef.current = null;
              suppressClickRef.current = false;
              if (suppressClickTimerRef.current !== undefined) {
                window.clearTimeout(suppressClickTimerRef.current);
                suppressClickTimerRef.current = undefined;
              }
            }}
            className="relative h-[clamp(300px,52vh,520px)] w-full max-w-[620px] touch-pan-y"
          >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {carouselEntries.map(({ project, slot }) => {
              const isActiveCard = project.id === featuredProjects[activeIndex].id;
              const layout = CARD_LAYOUTS[slot];
              const image =
                featuredProjectImages[project.id] ?? project.backgroundImage;
              const isCustomImage = Boolean(featuredProjectImages[project.id]);

              return (
                <motion.div
                  key={project.id}
                  onUpdate={keepMotionOnRenderLoop}
                  initial={false}
                  animate={{
                    x: layout.x,
                    y: layout.y,
                    scale: layout.scale,
                    rotate: layout.rotate,
                    opacity: layout.opacity,
                    filter: isActiveCard ? "blur(0px)" : "blur(2px)",
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: layout.scale + 0.05,
                          filter: "blur(0px)",
                          opacity: 1,
                          transition: { duration: 0.2, ease: "easeOut" },
                        }
                  }
                  whileTap={shouldReduceMotion ? undefined : { scale: layout.scale + 0.02 }}
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
                  className={`absolute inset-0 m-auto h-[48vh] max-h-[520px] min-h-[260px] ${
                    isActiveCard
                      ? "w-[min(86vw,620px)]"
                      : "w-[min(58vw,430px)]"
                  } cursor-grab bg-transparent text-left outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-4 focus-visible:ring-offset-gray-200 ${
                    !isActiveCard ? "max-md:hidden" : "z-10"
                  } ${
                    isCustomImage
                      ? "overflow-visible shadow-none"
                      : "overflow-hidden rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.05)]"
                  } sm:h-[52vh]`}
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
                    style={{ pointerEvents: "auto" }}
                    onClick={() => {
                      if (suppressClickRef.current) {
                        suppressClickRef.current = false;
                        if (suppressClickTimerRef.current !== undefined) {
                          window.clearTimeout(suppressClickTimerRef.current);
                          suppressClickTimerRef.current = undefined;
                        }
                        return;
                      }

                      if (isActiveCard) {
                        openProject(project);
                        return;
                      }

                      navigateTo(
                        featuredProjects.findIndex(
                          (featuredProject) => featuredProject.id === project.id
                        )
                      );
                    }}
                    className={
                      isActiveCard
                        ? "absolute left-[8%] top-[8%] h-[84%] w-[84%] cursor-pointer bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-4 focus-visible:ring-offset-gray-200"
                        : "absolute inset-0 cursor-pointer bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-4 focus-visible:ring-offset-gray-200"
                    }
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
          </div>

          <div className="mt-10 min-h-[112px] w-full max-w-[620px] text-center sm:mt-14">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeProject.id}
                onUpdate={keepMotionOnRenderLoop}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }}
              >
                <p className="text-[0.58rem] uppercase tracking-[0.28em] text-slate-400">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")} · {activeSummary?.category ?? "Project"}
                </p>
                <h3 className="mt-2 text-xl font-medium tracking-[-0.03em] text-slate-800 sm:text-2xl">
                  {activeProject.title}
                </h3>
                <p className="mx-auto mt-1 max-w-lg text-sm leading-6 text-slate-500">
                  {activeSummary?.tagline ?? activeProject.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
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
            onPrevious={() =>
              openProject(
                featuredProjects[
                  wrapIndex(selectedProjectIndex - 1, featuredProjects.length)
                ]
              )
            }
            onNext={() =>
              openProject(
                featuredProjects[
                  wrapIndex(selectedProjectIndex + 1, featuredProjects.length)
                ]
              )
            }
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default memo(FeaturedProjects);
