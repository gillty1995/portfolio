"use client";

import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

// Define the tech skills and core competencies
const techSkills = [
  "HTML/CSS",
  "Tailwind CSS",
  "JavaScript",
  "TypeScript",
  "React (including Context API)",
  "Vite",
  "Next.js",
  "tRPC",
  "TanStack Query",
  "shadcn/ui",
  "Radix UI",
  "Next-PWA",
  "Node.js",
  "Express.js",
  "MongoDB",
  "NoSQL",
  "Python",
  "FastAPI",
  "GraphQL",
  "AWS (EC2, S3, Security Groups)",
  "NGINX",
  "Google Cloud",
  "GenAI",
  "OpenAI API",
  "Docker",
  "Cloudflare",
  "JWT",
  "RESTful APIs",
  "CI/CD Pipelines",
  "Jest",
  "Git/GitHub",
  "CSS (BEM, Styled-Components)",
  "OOP",
  "Figma",
  "Postman",
  "Framer Motion",
  "Auth0",
];

const coreCompetencies = [
  "Communication",
  "Active Listening",
  "Interpersonal Skills",
  "Problem Solving",
  "Time Management",
  "Adaptation to New Tools",
  "Team Support",
  "Leadership",
  "Attention to Detail",
];

const techSkillsInfo: Record<string, string> = {
  "HTML/CSS":
    "I create responsive, accessible layouts using semantic HTML and modern CSS techniques.",
  "Tailwind CSS":
    "I style UIs quickly and consistently using utility-first classes with Tailwind.",
  JavaScript:
    "I write clean, efficient JavaScript to build dynamic, interactive interfaces.",
  TypeScript:
    "I use type-safe code to ensure bug-free, production-ready applications.",
  "React (including Context API)":
    "I build interactive UIs with React and manage state effectively using the Context API.",
  Vite: "I utilize Vite for fast, efficient builds and a smooth development experience.",
  "Next.js":
    "I develop server-rendered and static sites with Next.js for optimal performance and routing.",
  tRPC: "I build typesafe, end-to-end APIs with tRPC to eliminate client/server schema drift.",
  "TanStack Query":
    "I handle caching, background sync, and server state with TanStack Query for performant data fetching.",
  "shadcn/ui":
    "I use shadcn/ui for composable, well-designed components that speed up UI development.",
  "Radix UI":
    "I leverage Radix primitives to build accessible, unstyled UI foundations.",
  "Next-PWA":
    "I turn Next apps into installable PWAs with service worker support for offline and installability.",
  "Node.js": "I build scalable backend services using Node.js.",
  "Express.js":
    "I create RESTful APIs with Express.js for robust application backends.",
  MongoDB: "I use MongoDB for flexible, scalable NoSQL data storage.",
  NoSQL: "I work with NoSQL databases to manage diverse data models.",
  Python:
    "I leverage Python for scripting, data processing, and building backend services.",
  FastAPI:
    "I build high-performance APIs with FastAPI, ensuring fast and efficient data exchange.",
  GraphQL: "I design flexible and efficient APIs using GraphQL.",
  "AWS (EC2, S3, Security Groups)":
    "I deploy and manage scalable infrastructure on AWS with best practices in security.",
  NGINX:
    "I configure NGINX as a high-performance web server, reverse proxy, and load balancer.",
  "Google Cloud":
    "I harness Google Cloud’s services for reliable, scalable computing solutions.",
  GenAI:
    "I explore generative AI technologies to build innovative applications.",
  "OpenAI API":
    "I integrate OpenAI's capabilities to add intelligent features to applications.",
  Docker:
    "I containerize apps with Docker for consistent builds and deployments.",
  Cloudflare:
    "I secure and accelerate deployments using Cloudflare for DNS, HTTPS, and edge features.",
  JWT: "I implement JWT authentication to secure API endpoints.",
  "RESTful APIs":
    "I design robust RESTful APIs for efficient communication between services.",
  "CI/CD Pipelines":
    "I automate testing and deployment with efficient CI/CD pipelines.",
  Jest: "I write comprehensive tests using Jest to ensure code quality.",
  "Git/GitHub":
    "I manage code versioning and collaboration using Git and GitHub.",
  "CSS (BEM, Styled-Components)":
    "I apply modular CSS techniques for scalable and maintainable styles.",
  OOP: "I use object-oriented programming principles to write scalable, maintainable code.",
  Figma: "I design and prototype user interfaces in Figma.",
  Postman:
    "I thoroughly test APIs with Postman to ensure smooth data interactions.",
  "Framer Motion":
    "I create engaging animations and transitions with Framer Motion.",
  Auth0: "I integrate Auth0 for secure, streamlined user authentication.",
};

const coreCompetenciesInfo: Record<string, string> = {
  Communication:
    "I clearly articulate ideas and listen actively to engage and inform others.",
  "Active Listening":
    "I focus intently on others' perspectives, ensuring effective communication.",
  "Interpersonal Skills":
    "I build strong relationships and collaborate effectively across teams.",
  "Problem Solving":
    "I analyze challenges and design creative solutions for complex problems.",
  "Time Management":
    "I prioritize tasks and manage my time efficiently to meet deadlines.",
  "Adaptation to New Tools":
    "I quickly learn and adapt to new technologies and methodologies.",
  "Team Support":
    "I contribute to a supportive team environment and offer assistance when needed.",
  Leadership: "I guide and motivate teams to achieve shared objectives.",
  "Attention to Detail":
    "I focus meticulously on details to ensure high-quality work.",
};

export default function Skills() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollXProgress } = useScroll({ container: scrollContainerRef });
  const [arrowDirection, setArrowDirection] = useState<"right" | "left">(
    "right"
  );
  const [clickedCard, setClickedCard] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = scrollXProgress.on("change", (latest) => {
      if (latest >= 0.99) {
        setArrowDirection("left");
      } else if (latest <= 0.01) {
        setArrowDirection("right");
      }
    });
    return () => unsubscribe();
  }, [scrollXProgress]);

  // Auto-close the open card after 7 seconds.
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (clickedCard !== null) {
      timeoutId = setTimeout(() => {
        setClickedCard(null);
      }, 7000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [clickedCard]);

  const handleCardClick = (card: string) => {
    setClickedCard(card === clickedCard ? null : card);
  };

  // Variants for the progress circle fade in:
  const progressCircleVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Reusable card renderer wrapped in a fixed-size container.
  const renderCard = (card: string, info?: string, delay = 0) => (
    <div key={card} className="flex-none w-[300px] h-[150px]">
      <motion.div
        onClick={() => handleCardClick(card)}
        className="w-full h-full p-6 bg-white rounded-lg shadow-2xl flex flex-col items-center justify-center text-center cursor-pointer relative overflow-visible"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        animate={{
          scale: clickedCard === card ? 1.25 : 1,
          zIndex: clickedCard === card ? 10 : 0,
        }}
        transition={{
          x: { duration: 0.2, delay, type: "spring", stiffness: 100 },
          scale: { duration: 0.6, ease: "easeOut" },
        }}
        style={{ transformOrigin: "center" }}
      >
        {clickedCard === card ? (
          <AnimatePresence>
            {info && (
              <motion.p
                key="info"
                className="text-sm text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {info}
              </motion.p>
            )}
          </AnimatePresence>
        ) : (
          <h4 className="text-lg font-semibold text-gray-800 overflow-hidden text-ellipsis">
            {card}
          </h4>
        )}
      </motion.div>
    </div>
  );

  return (
    <motion.section
      id="skills"
      className="relative py-20 h-[500px] bg-gradient-to-b from-gray-200 to-gray-100"
    >
      {/* Title and progress circle */}
      <div className="flex items-center justify-center mb-10">
        <motion.h2
          className="text-4xl font-bold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3.5 }}
        >
          {["S", "k", "i", "l", "l", "s"].map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h2>
        {/* Progress Circle with fade-in */}
        <div className="ml-4 flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.svg
              key="progress-circle"
              width="40"
              height="40"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-90"
              variants={progressCircleVariants}
              initial="initial"
              whileInView={"animate"}
              exit="exit"
              transition={{ duration: 2, delay: 1 }}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#D1D5DB"
                strokeWidth="10"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="#2d3748"
                strokeWidth="10"
                fill="none"
                strokeDasharray="283"
                style={{ pathLength: scrollXProgress }}
              />
            </motion.svg>
          </AnimatePresence>
        </div>

        {/* Bouncing Arrow with fade and direction change */}
        <motion.div
          // Arrow fades in on mount
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            x: arrowDirection === "right" ? [0, -10, 0] : [0, 10, 0],
          }}
          transition={{
            opacity: { duration: 1, delay: 1.3 }, // Fade in over 1 second
            x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="ml-6 pointer-events-none"
        >
          <FaArrowRight
            style={{
              transform: arrowDirection === "left" ? "scaleX(-1)" : "none",
            }}
            className="text-gray-800 text-2xl"
          />
        </motion.div>
      </div>

      {/* Cards container with hidden scrollbar */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-8 px-10 py-5 pb-100 hide-scrollbar"
        >
          {techSkills.map((skill) =>
            renderCard(skill, techSkillsInfo[skill], 0.1)
          )}
          {coreCompetencies.map((competency, index) =>
            renderCard(
              competency,
              coreCompetenciesInfo[competency],
              0.1 * index
            )
          )}
        </div>
        {/* Gradient overlay: fades from transparent to the background color */}
        <div
          className="absolute right-0 top-0 h-full w-12 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #E5E7EB, transparent)",
          }}
        />
      </div>
    </motion.section>
  );
}
