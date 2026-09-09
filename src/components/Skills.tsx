"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PREFIX_TEXT = "I work with";
const SCRAMBLE_CHARACTERS = "01<>/{}[]#*+=-";
const SCRAMBLE_FRAMES = 20;
const SCRAMBLE_INTERVAL_MS = 55;
const HEADLINE_INTERVAL_MS = 2200;

const headlineSkills = [
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
] as const;

const skillGroups = [
  {
    label: "Frontend",
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "React Native / Expo",
      "HTML / CSS",
      "Tailwind CSS",
      "TanStack Query",
      "shadcn/ui / Radix UI",
      "Framer Motion / GSAP",
    ],
  },
  {
    label: "Backend",
    skills: [
      "Node.js / Express",
      "Java / Spring Boot",
      "Python / FastAPI",
      "Rust",
      "Zod",
    ],
  },
  {
    label: "Data & APIs",
    skills: [
      "REST / GraphQL / tRPC",
      "PostgreSQL / Prisma",
      "MongoDB / Supabase",
      "Auth0 / JWT",
      "Stripe / RevenueCat",
      "OpenAI API / GenAI",
    ],
  },
  {
    label: "Platform & Tools",
    skills: [
      "AWS",
      "Docker / Kubernetes",
      "Cloudflare / CloudFront",
      "Firebase",
      "Vercel / NGINX",
      "CI/CD / GitHub Actions",
      "Jest / Playwright",
      "Storybook",
      "Git / GitHub",
      "Figma",
    ],
  },
] as const;

function scrambleText(text: string, progress: number, seed: number) {
  if (progress >= 1) return text;

  const frame = Math.floor(progress * SCRAMBLE_FRAMES);
  const revealedCharacters = Math.floor(progress * text.length);

  return Array.from(text, (character, index) => {
    if (character === " " || index < revealedCharacters) {
      return character;
    }

    return SCRAMBLE_CHARACTERS[
      (character.charCodeAt(0) + index * 7 + frame * 11 + seed) %
        SCRAMBLE_CHARACTERS.length
    ];
  }).join("");
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasEntered = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const isSectionVisible = useInView(sectionRef, { amount: 0.2 });
  const [phase, setPhase] = useState<"waiting" | "scrambling" | "ready">(
    "waiting"
  );
  const [scrambleProgress, setScrambleProgress] = useState(0);
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasEntered.current) return;

        hasEntered.current = true;
        setPhase("scrambling");
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== "scrambling") return;

    if (shouldReduceMotion) {
      setScrambleProgress(1);
      setPhase("ready");
      return;
    }

    let frame = 0;
    const interval = window.setInterval(() => {
      frame += 1;
      const progress = Math.min(1, frame / SCRAMBLE_FRAMES);
      setScrambleProgress(progress);

      if (progress === 1) {
        window.clearInterval(interval);
        setPhase("ready");
      }
    }, SCRAMBLE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [phase, shouldReduceMotion]);

  useEffect(() => {
    if (phase !== "ready" || shouldReduceMotion) return;

    const interval = window.setInterval(() => {
      setHeadlineIndex((current) => (current + 1) % headlineSkills.length);
    }, HEADLINE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [phase, shouldReduceMotion]);

  const activeHeadline = headlineSkills[headlineIndex];
  const displayedPrefix =
    phase === "ready"
      ? PREFIX_TEXT
      : scrambleText(PREFIX_TEXT, scrambleProgress, 1);
  const displayedSkill =
    phase === "ready"
      ? headlineSkills[0]
      : scrambleText(headlineSkills[0], scrambleProgress, 3);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="word-scroll-section relative isolate text-gray-950"
    >
      <h2 className="sr-only">Skills</h2>

      <div className="word-scroll-stage-shell relative flex min-h-[100dvh] items-center overflow-hidden px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
        <motion.div
          aria-hidden="true"
          className="word-scroll-orbit word-scroll-orbit-one"
          animate={
            shouldReduceMotion || !isSectionVisible
              ? undefined
              : {
                  rotate: [0, 7, -5, 0],
                  x: [0, 26, -18, 0],
                  borderColor: [
                    "rgba(75, 85, 99, 0.22)",
                    "rgba(255, 255, 255, 0.76)",
                    "rgba(75, 85, 99, 0.22)",
                  ],
                  backgroundColor: [
                    "rgba(255, 255, 255, 0.045)",
                    "rgba(255, 255, 255, 0.09)",
                    "rgba(255, 255, 255, 0.045)",
                  ],
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="word-scroll-orbit word-scroll-orbit-two"
          animate={
            shouldReduceMotion || !isSectionVisible
              ? undefined
              : {
                  rotate: [0, -8, 6, 0],
                  y: [0, -22, 16, 0],
                  borderColor: [
                    "rgba(75, 85, 99, 0.14)",
                    "rgba(255, 255, 255, 0.64)",
                    "rgba(75, 85, 99, 0.14)",
                  ],
                  backgroundColor: [
                    "rgba(255, 255, 255, 0.025)",
                    "rgba(255, 255, 255, 0.07)",
                    "rgba(255, 255, 255, 0.025)",
                  ],
                }
          }
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="word-scroll-glow"
          animate={
            shouldReduceMotion || !isSectionVisible
              ? undefined
              : { x: ["-7%", "8%", "-7%"], scale: [1, 1.08, 1] }
          }
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-14 sm:gap-16">
          <div className="flex min-h-16 items-center justify-center overflow-hidden">
            <p
              className="lexend-extralight flex max-w-full items-baseline justify-center gap-[0.35em] whitespace-nowrap text-[clamp(1rem,3.2vw,2.35rem)] tracking-[-0.055em] text-slate-800"
              aria-label={`${PREFIX_TEXT} ${activeHeadline}`}
            >
              <span aria-hidden="true">{displayedPrefix}</span>
              <span
                aria-hidden="true"
                className="relative inline-grid min-w-[12ch] text-left sm:min-w-[15ch]"
              >
                {phase === "ready" ? (
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={activeHeadline}
                      className="col-start-1 row-start-1"
                      initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -12, filter: "blur(5px)" }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {activeHeadline}
                    </motion.span>
                  </AnimatePresence>
                ) : (
                  <span className="col-start-1 row-start-1">{displayedSkill}</span>
                )}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-7 gap-y-10 md:grid-cols-4 md:gap-x-10">
            {skillGroups.map((group, groupIndex) => (
              <motion.div
                key={group.label}
                className="border-t border-slate-400/55 pt-4"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: shouldReduceMotion ? 0 : groupIndex * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h3 className="mb-4 text-[0.58rem] font-light uppercase tracking-[0.18em] text-slate-500 sm:text-[0.65rem]">
                  {group.label}
                </h3>
                <ul className="space-y-2.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-[0.68rem] font-light leading-relaxed tracking-[-0.025em] text-slate-800 sm:text-xs lg:text-[0.8rem]"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
