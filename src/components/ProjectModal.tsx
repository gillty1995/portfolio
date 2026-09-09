"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiExternalLink,
  FiPlay,
  FiX,
} from "react-icons/fi";
import {
  featuredProjectImages,
  projectCaseStudySummaries,
} from "@/utils/ProjectData";

interface ProjectModalProps {
  project: {
    id: number;
    title: string;
    description: string;
    backgroundImage: string;
    frontendFramework: string;
    backendFramework: string;
    links: { [key: string]: string | undefined };
    challengesFaced: string;
    futureImprovements: string;
    finalThoughts: string;
    videoUrl: string;
    details: string;
  };
  position?: number;
  total?: number;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "summary",
  "video[controls]",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function ProjectModal({
  project,
  position = 1,
  total = 1,
  onClose,
  onPrevious,
  onNext,
}: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [showDemo, setShowDemo] = useState(false);
  const [demoReady, setDemoReady] = useState(false);
  const [demoError, setDemoError] = useState(false);

  const summary = projectCaseStudySummaries[project.id];
  const projectImage =
    featuredProjectImages[project.id] ?? project.backgroundImage;
  const titleId = `project-${project.id}-title`;
  const descriptionId = `project-${project.id}-description`;

  useEffect(() => {
    setShowDemo(false);
    setDemoReady(false);
    setDemoError(false);
  }, [project.id]);

  useEffect(() => {
    if (!showDemo) {
      setDemoReady(false);
      setDemoError(false);
    }
  }, [showDemo]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      const target = event.target as HTMLElement | null;
      const isVideoInteraction =
        target instanceof HTMLVideoElement ||
        Boolean(target?.closest("input, textarea, select, [contenteditable=\"true\"]"));

      if (isVideoInteraction) return;

      if (event.key === "ArrowLeft" && onPrevious) {
        event.preventDefault();
        onPrevious();
        return;
      }

      if (event.key === "ArrowRight" && onNext) {
        event.preventDefault();
        onNext();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
      ).filter((element) => element.offsetParent !== null);

      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose, onNext, onPrevious]);

  if (!summary) return null;

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="fixed inset-0 z-[9999] overflow-y-auto bg-[#f0f1f1] text-slate-800"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.32 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -left-[20vw] top-[8vh] h-[64vw] w-[76vw] rounded-[50%] border border-slate-400/15" />
        <div className="absolute -right-[24vw] bottom-[-18vh] h-[62vw] w-[82vw] rounded-[50%] border border-slate-400/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_44%,rgba(255,255,255,0.82),transparent_52%)]" />
      </div>

      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-300/45 bg-[#f0f1f1]/85 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-12">
        <p className="text-[0.58rem] font-light uppercase tracking-[0.22em] text-slate-500 sm:text-[0.65rem]">
          {String(position).padStart(2, "0")} / {String(total).padStart(2, "0")}
          <span aria-hidden="true" className="mx-2 text-slate-300">
            ·
          </span>
          {summary.category}
        </p>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-400/45 bg-white/35 text-slate-700 transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 sm:h-11 sm:w-11"
        >
          <FiX
            aria-hidden="true"
            className="text-lg transition-transform duration-300 group-hover:rotate-90"
          />
        </button>
      </header>

      <main className="relative z-10 mx-auto grid min-h-[calc(100dvh-73px)] w-full max-w-[1480px] items-start gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(360px,0.88fr)] lg:gap-10 lg:px-12 xl:gap-16 xl:px-16">
        <section
          aria-label={`${project.title} media`}
          className="min-w-0 lg:sticky lg:top-[90px]"
        >
          <motion.div
            id={`project-${project.id}-demo-media`}
            className="relative flex min-h-[36vh] w-full items-center justify-center sm:min-h-[46vh] lg:min-h-[68vh]"
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 24, scale: 0.93, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src={projectImage}
              alt={`${project.title} shown in a device mockup`}
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 58vw"
              className={`select-none object-contain transition-opacity duration-500 ${
                showDemo && demoReady ? "opacity-0" : "opacity-100"
              }`}
            />
            {showDemo && !demoError && (
              <video
                controls
                autoPlay
                muted
                playsInline
                preload="metadata"
                poster={projectImage}
                onLoadedData={() => setDemoReady(true)}
                onCanPlay={() => setDemoReady(true)}
                onError={() => {
                  setDemoReady(false);
                  setDemoError(true);
                }}
                className={`max-h-[68vh] w-full rounded-2xl bg-slate-950 object-contain shadow-[0_24px_80px_rgba(15,23,42,0.14)] transition-opacity duration-500 ${
                  demoReady ? "opacity-100" : "opacity-0"
                }`}
              >
                <source src={project.videoUrl} />
              </video>
            )}
            {showDemo && demoError && (
              <div className="flex min-h-[24vh] w-full max-w-md flex-col items-center justify-center gap-3 rounded-2xl border border-slate-300/60 bg-white/45 p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                <p className="text-sm font-light text-slate-600">
                  Demo unavailable right now.
                </p>
                <button
                  type="button"
                  onClick={() => setShowDemo(false)}
                  className="rounded-full border border-slate-400/50 px-4 py-2 text-[0.62rem] font-light uppercase tracking-[0.12em] text-slate-700 transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
                >
                  Show mockup
                </button>
              </div>
            )}
          </motion.div>

          {project.videoUrl && (
            <div className="mt-2 flex justify-center lg:mt-0">
              <button
                type="button"
                onClick={() => setShowDemo((current) => !current)}
                aria-expanded={showDemo}
                aria-controls={`project-${project.id}-demo-media`}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-400/45 bg-white/30 px-4 py-2 text-[0.62rem] font-light tracking-[0.08em] text-slate-600 transition-colors hover:bg-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 sm:text-xs"
              >
                <FiPlay aria-hidden="true" className="text-sm" />
                {showDemo ? "Show mockup" : "Play demo"}
              </button>
            </div>
          )}
        </section>

        <motion.section
          key={project.id}
          className="mx-auto w-full max-w-xl pb-4 lg:flex lg:h-[calc(100dvh-105px)] lg:max-h-[calc(100dvh-105px)] lg:flex-col lg:overflow-hidden"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="pr-1 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain lg:[scrollbar-color:rgba(100,116,139,0.35)_transparent] lg:[scrollbar-width:thin]">
            <h2
              id={titleId}
              className="text-4xl font-light tracking-[-0.055em] text-slate-800 sm:text-5xl xl:text-6xl"
            >
              {project.title}
            </h2>
            <p
              id={descriptionId}
              className="mt-4 max-w-lg text-sm font-light leading-relaxed tracking-[-0.025em] text-slate-600 sm:text-base"
            >
              {summary.tagline}
            </p>

            <div className="mt-8 grid gap-6 border-y border-slate-400/35 py-6 sm:grid-cols-2">
            <div>
              <h3 className="text-[0.58rem] font-light uppercase tracking-[0.2em] text-slate-500">
                Role
              </h3>
              <p className="mt-2 text-xs font-light leading-relaxed text-slate-800 sm:text-sm">
                {summary.role}
              </p>
            </div>
            <div>
              <h3 className="text-[0.58rem] font-light uppercase tracking-[0.2em] text-slate-500">
                Stack
              </h3>
              <p className="mt-2 text-xs font-light leading-relaxed text-slate-800 sm:text-sm">
                {summary.stack.join(" · ")}
              </p>
            </div>
            </div>

            <div className="mt-7">
            <h3 className="text-[0.58rem] font-light uppercase tracking-[0.2em] text-slate-500">
              Selected work
            </h3>
            <ol className="mt-3">
              {summary.highlights.map((highlight, index) => (
                <li
                  key={highlight}
                  className="grid grid-cols-[1.8rem_1fr] border-t border-slate-400/25 py-3 text-xs font-light leading-relaxed text-slate-700 sm:grid-cols-[2.2rem_1fr] sm:text-sm"
                >
                  <span className="text-[0.58rem] tracking-[0.12em] text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ol>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
            {Object.entries(project.links)
              .filter((entry): entry is [string, string] => Boolean(entry[1]))
              .map(([label, url]) => {
                const compactLabel = label
                  .replace("Frontend Repository", "Frontend Repo")
                  .replace("Backend Repository", "Backend Repo");

                return (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-400/50 bg-white/35 px-4 py-2.5 text-[0.62rem] font-light tracking-[0.04em] text-slate-700 transition-colors hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 sm:text-xs"
                  >
                    {compactLabel}
                    <FiExternalLink aria-hidden="true" />
                  </a>
                );
              })}
            </div>

            <details className="group mt-7 border-y border-slate-400/30 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between text-[0.62rem] font-light uppercase tracking-[0.16em] text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
              Technical breakdown
              <span
                aria-hidden="true"
                className="text-base transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="mt-6 space-y-7 font-sans text-sm font-light leading-relaxed text-slate-700 [&_h4]:mb-2 [&_h4]:mt-5 [&_h4]:font-medium [&_li]:ml-5 [&_li]:list-disc [&_li]:py-1 [&_p]:mb-3">
              <div>
                <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  Overview
                </h3>
                <p>{project.description}</p>
              </div>
              <div>
                <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  Frontend
                </h3>
                <div
                  dangerouslySetInnerHTML={{ __html: project.frontendFramework }}
                />
              </div>
              <div>
                <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  Backend
                </h3>
                <div
                  dangerouslySetInnerHTML={{ __html: project.backendFramework }}
                />
              </div>
              <div>
                <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  Additional details
                </h3>
                <div dangerouslySetInnerHTML={{ __html: project.details }} />
              </div>
              <div>
                <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  Challenge
                </h3>
                <p>{project.challengesFaced}</p>
              </div>
              <div>
                <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  Future improvements
                </h3>
                <div
                  dangerouslySetInnerHTML={{ __html: project.futureImprovements }}
                />
              </div>
              <div>
                <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  Reflection
                </h3>
                <p>{project.finalThoughts}</p>
              </div>
            </div>
            </details>
          </div>

          <nav
            aria-label="Project navigation"
            className="flex w-full shrink-0 items-center justify-between bg-[#f0f1f1]/95 py-5 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={onPrevious}
              disabled={!onPrevious}
              className="inline-flex flex-1 cursor-pointer items-center justify-start gap-2 text-[0.62rem] font-light uppercase tracking-[0.14em] text-slate-600 transition-opacity hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:cursor-default disabled:opacity-25"
            >
              <FiArrowLeft aria-hidden="true" />
              Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!onNext}
              className="inline-flex flex-1 cursor-pointer items-center justify-end gap-2 text-[0.62rem] font-light uppercase tracking-[0.14em] text-slate-600 transition-opacity hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:cursor-default disabled:opacity-25"
            >
              Next
              <FiArrowRight aria-hidden="true" />
            </button>
          </nav>
        </motion.section>
      </main>
    </motion.div>
  );
}
