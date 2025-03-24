"use client";

import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useRef, useState } from "react";

// Define the tech skills and core competencies
const techSkills = [
  "HTML/CSS",
  "JavaScript",
  "TypeScript",
  "React (including Context API)",
  "Vite",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "NoSQL",
  "Python",
  "FastAPI",
  "GraphQL",
  "AWS (EC2, S3, Security Groups)", // removed NGINX here
  "NGINX", // added as its own card
  "Google Cloud",
  "GenAI",
  "OpenAI API",
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

// Extra information for each tech skill
const techSkillsInfo: Record<string, string> = {
  "HTML/CSS":
    "I create responsive, accessible layouts using semantic HTML and modern CSS techniques.",
  JavaScript:
    "I write clean, efficient JavaScript to build dynamic, interactive interfaces.",
  TypeScript:
    "I use type-safe code to ensure bug-free, production-ready applications.",
  "React (including Context API)":
    "I build interactive UIs with React and manage state effectively using the Context API.",
  Vite: "I utilize Vite for fast, efficient builds and a smooth development experience.",
  "Next.js":
    "I develop server-rendered and static sites with Next.js for optimal performance.",
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

// Extra information for each core competency
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
  const [clickedCard, setClickedCard] = useState<string | null>(null);

  const handleCardClick = (card: string) => {
    setClickedCard(card === clickedCard ? null : card);
  };

  // Reusable card renderer wrapped in a fixed-size container
  const renderCard = (card: string, info?: string, delay = 0) => (
    <div key={card} className="flex-none w-[300px] h-[150px]">
      <motion.div
        onClick={() => handleCardClick(card)}
        className="w-full h-full p-6 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center text-center cursor-pointer relative overflow-visible"
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
          // When open, display only the info text centered.
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
          // When not clicked, display the title.
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
      className="relative py-20 h-[500px] bg-gradient-to-b from-gray-100 to-white"
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
        <div className="ml-4 flex-shrink-0">
          <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-90"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#e5e7eb"
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
          </svg>
        </div>
      </div>

      {/* Cards container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-8 px-10 py-5 pb-100"
      >
        {techSkills.map((skill) =>
          renderCard(skill, techSkillsInfo[skill], 0.1)
        )}
        {coreCompetencies.map((competency, index) =>
          renderCard(competency, coreCompetenciesInfo[competency], 0.1 * index)
        )}
      </div>
    </motion.section>
  );
}
