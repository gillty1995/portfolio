"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import {
  featuredProjectIds,
  featuredProjectImages,
  projectsData,
} from "@/utils/ProjectData";
import ProjectModal from "./ProjectModal";
import {
  PORTFOLIO_NAVIGATION_EVENT,
  type PortfolioNavigationDetail,
} from "@/utils/navigationEvents";

const SNAP_DISTANCE = 340;
const NAVIGATION_TRANSITION_IDLE_MS = 420;
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
type ScrollDirection = -1 | 1;

const CARD_EXIT_VARIANTS: Variants = {
  exit: (direction: number) => ({
    x:
      direction === 1
        ? "calc(-1 * clamp(3rem, 9vw, 8rem))"
        : "clamp(6rem, 20vw, 22rem)",
    y: direction === 1 ? -12 : 36,
    scale: direction === 1 ? 1.14 : 0.44,
    rotate: direction === 1 ? -1.5 : 3.5,
    opacity: 0,
    filter: "blur(8px)",
    transition: {
      duration: 0.32,
      ease: "easeInOut",
    },
  }),
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const transitionTimerRef = useRef<number | undefined>(undefined);
  const isClosingRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const [{ index: activeIndex, direction }, setNavigation] = useState<{
    index: number;
    direction: ScrollDirection;
  }>({ index: 0, direction: 1 });
  const [isFastTransition, setIsFastTransition] = useState(false);
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

  useEffect(() => {
    const getIndexForScrollPosition = () => {
      const section = sectionRef.current;
      if (!section) return 0;

      const sectionScroll = window.scrollY - section.offsetTop;
      return clamp(
        Math.floor(Math.max(0, sectionScroll) / SNAP_DISTANCE),
        0,
        featuredProjects.length - 1
      );
    };

    const finishFastTransition = () => {
      transitionTimerRef.current = undefined;
      navigateTo(getIndexForScrollPosition());
      isClosingRef.current = false;
      setIsFastTransition(false);
    };

    const queueFastTransitionEnd = () => {
      if (transitionTimerRef.current !== undefined) {
        window.clearTimeout(transitionTimerRef.current);
      }
      transitionTimerRef.current = window.setTimeout(
        finishFastTransition,
        NAVIGATION_TRANSITION_IDLE_MS
      );
    };

    const beginFastTransition = () => {
      if (shouldReduceMotion) return;

      isClosingRef.current = true;
      setIsFastTransition(true);
      queueFastTransitionEnd();
    };

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section || !featuredProjects.length) return;

      if (isClosingRef.current) {
        queueFastTransitionEnd();
        return;
      }

      navigateTo(getIndexForScrollPosition());
    };

    const handleNavigationStart = (event: Event) => {
      const section = sectionRef.current;
      if (!section || !featuredProjects.length) return;

      const { targetY } = (event as CustomEvent<PortfolioNavigationDetail>)
        .detail;
      const trackEnd =
        section.offsetTop + SNAP_DISTANCE * (featuredProjects.length - 1);
      const pathStart = Math.min(window.scrollY, targetY);
      const pathEnd = Math.max(window.scrollY, targetY);
      const crossesProjectTrack =
        pathEnd >= section.offsetTop && pathStart <= trackEnd;
      const isLongJump =
        Math.abs(targetY - window.scrollY) > window.innerHeight * 0.75;

      if (crossesProjectTrack && isLongJump) {
        beginFastTransition();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[role=\"dialog\"]") || selectedProject) return;

      if (
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT"
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        setNavigation((current) => ({
          index: clamp(current.index + 1, 0, featuredProjects.length - 1),
          direction: 1,
        }));
      }
      if (event.key === "ArrowLeft") {
        setNavigation((current) => ({
          index: clamp(current.index - 1, 0, featuredProjects.length - 1),
          direction: -1,
        }));
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(PORTFOLIO_NAVIGATION_EVENT, handleNavigationStart);

    return () => {
      if (transitionTimerRef.current !== undefined) {
        window.clearTimeout(transitionTimerRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(
        PORTFOLIO_NAVIGATION_EVENT,
        handleNavigationStart
      );
    };
  }, [featuredProjects.length, navigateTo, selectedProject, shouldReduceMotion]);

  if (!featuredProjects.length) return null;

  const scrollTrackLength = SNAP_DISTANCE * Math.max(featuredProjects.length - 1, 0);
  const visibleProjectCount = activeIndex === 0 ? CARD_LAYOUTS.length : 3;
  const visibleFeaturedProjects = featuredProjects.slice(
    activeIndex,
    activeIndex + visibleProjectCount
  );
  const selectedProjectIndex = selectedProject
    ? featuredProjects.findIndex((project) => project.id === selectedProject.id)
    : -1;

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
        <h2 className="sr-only">My work</h2>

        <div className="pointer-events-none absolute bottom-[8%] left-1/2 h-24 w-[min(72vw,900px)] -translate-x-1/2 rounded-[50%] bg-gray-500/10 blur-3xl" />

        <div
          className="grid-stack relative w-full max-w-[680px]"
        >
          <AnimatePresence initial={false} custom={direction}>
            {visibleFeaturedProjects.map((project, index) => {
              const layout = CARD_LAYOUTS[index];
              const activeScale =
                index === 0 && project.id === 3 ? 1.2 : layout.scale;
              const image =
                featuredProjectImages[project.id] ?? project.backgroundImage;
              const isCustomImage = Boolean(featuredProjectImages[project.id]);

              return (
                <motion.button
                  key={project.id}
                  type="button"
                  aria-label={`Open details for ${project.title}`}
                  onClick={() => openProject(project)}
                  className={`relative h-[56vh] max-h-[620px] min-h-[300px] w-[min(92vw,680px)] cursor-pointer bg-transparent text-left outline-none focus-visible:ring-2 focus-visible:ring-gray-800 sm:h-[64vh] ${
                    index > 0 ? "max-md:hidden" : ""
                  } ${
                    isCustomImage
                      ? "overflow-visible shadow-none"
                      : "overflow-hidden rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.05)]"
                  }`}
                  custom={direction}
                  variants={CARD_EXIT_VARIANTS}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          x:
                            direction === 1
                              ? layout.x
                              : "calc(-1 * clamp(3rem, 9vw, 8rem))",
                          y: direction === 1 ? layout.y + 30 : layout.y + 20,
                          scale:
                            direction === 1
                              ? Math.max(0.42, activeScale - 0.1)
                              : Math.max(0.9, activeScale - 0.14),
                          rotate: direction === 1 ? layout.rotate + 1 : -2,
                          opacity: 0,
                          filter: "blur(8px)",
                        }
                  }
                  animate={
                    isFastTransition
                      ? {
                          x: index % 2 === 0 ? "-115vw" : "115vw",
                          y: layout.y + (index < 2 ? -34 : 28),
                          scale: Math.max(0.48, activeScale - 0.12),
                          rotate: index % 2 === 0 ? -9 : 9,
                          opacity: 0,
                          filter: "blur(5px)",
                        }
                      : {
                          x: layout.x,
                          y: layout.y,
                          scale: activeScale,
                          rotate: layout.rotate,
                          opacity: layout.opacity,
                          filter: "blur(0px)",
                        }
                  }
                  exit="exit"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : isFastTransition
                      ? {
                          duration: 1.05,
                          delay: index * 0.075,
                          ease: [0.45, 0, 0.55, 1],
                        }
                      : {
                          x: {
                            type: "spring",
                            stiffness: 180,
                            damping: 22,
                            mass: 0.8,
                          },
                          y: {
                            type: "spring",
                            stiffness: 180,
                            damping: 22,
                            mass: 0.8,
                          },
                          scale: { duration: 0.34, ease: "easeInOut" },
                          rotate: { duration: 0.34, ease: "easeInOut" },
                          opacity: { duration: 0.34, ease: "easeInOut" },
                          filter: { duration: 0.34, ease: "easeInOut" },
                        }
                  }
                  style={{
                    willChange: "opacity, filter, transform",
                    zIndex: CARD_LAYOUTS.length - index,
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
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
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
