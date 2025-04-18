"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "@/utils/ProjectData";
import ProjectModal from "./ProjectModal";
import { useIntersectionRatio } from "@/app/hooks/useIntersectionRatio";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type ProjectType = (typeof projectsData)[0] | null;

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectType>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Scroll-based parallax effect:
  const { scrollYProgress } = useScroll();
  const xRange = useTransform(scrollYProgress, [0, 1], [1100, -1000]);
  const intersectionRatio = useIntersectionRatio(sectionRef);
  const smoothRatio = useSpring(intersectionRatio, {
    stiffness: 50,
    damping: 20,
  });
  const xFinal = useTransform(
    [xRange, smoothRatio],
    ([val, r]) => (1 - (r as number)) * (val as number)
  );

  // Spring for the additional arrow offset for smooth transitions.
  const arrowOffset = useSpring(0, { stiffness: 300, damping: 30 });

  // Combine xFinal and arrowOffset.
  const finalX: MotionValue<number> = useTransform(
    [xFinal, arrowOffset],
    (values) => {
      const [a, b] = values as [number, number];
      return a + b;
    }
  );

  const handleCardClick = (projectId: number) => {
    const project = projectsData.find((p) => p.id === projectId);
    if (project) setSelectedProject(project);
  };

  // Define limits for the arrow offset.
  const MAX_OFFSET = 100;
  const MIN_OFFSET = -800;

  // Arrow button handlers
  const handleArrowRight = () => {
    const newOffset = arrowOffset.get() - 800;
    // Clamp newOffset to our min value.
    if (newOffset < MIN_OFFSET) {
      arrowOffset.set(MIN_OFFSET);
    } else {
      arrowOffset.set(newOffset);
    }
  };

  const handleArrowLeft = () => {
    const newOffset = arrowOffset.get() + 800;
    // Clamp newOffset so that it doesn't go above 0.
    if (newOffset > MAX_OFFSET) {
      arrowOffset.set(MAX_OFFSET);
    } else {
      arrowOffset.set(newOffset);
    }
  };

  // Mobile/Tablet carousel
  const [mobileIndex, setMobileIndex] = useState(0);
  const handleNext = () => {
    setMobileIndex((prev) => (prev + 1) % projectsData.length);
  };
  const handlePrev = () => {
    setMobileIndex(
      (prev) => (prev - 1 + projectsData.length) % projectsData.length
    );
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full min-h-[80vh] lg:min-h-[60vh] xl:pb-50 bg-gradient-to-b from-neutral-200 to-gray-200 overflow-y-auto overflow-x-hidden mobile-extra-pb px-4 py-8 md:px-8 lg:px-12"
    >
      {/* Header placed close to the project cards */}
      <div className="flex items-center justify-center mt-25 mb-25 mobile-less-p">
        <motion.h2
          className="text-4xl font-bold text-gray-800 text-center max-md:max-w-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3.5 }}
        >
          {[
            "D",
            "i",
            "v",
            "e",
            " ",
            "i",
            "n",
            "t",
            "o",
            " ",
            "m",
            "y",
            " ",
            "W",
            "o",
            "r",
            "k",
          ].map((letter, index) => (
            <motion.span
              key={index}
              className={letter === " " ? "inline-block mx-2" : "inline-block"}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h2>
      </div>

      {/* Desktop Parallax Layout (visible on xl and up) */}
      <div className="hidden xl:flex justify-center items-center mt-4 relative">
        {/* Combined x offset container */}
        <motion.div
          className="flex space-x-10"
          style={{ x: finalX }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                delay: project.id * 0.3,
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              className="overflow-hidden rounded-xl shadow-xl"
            >
              <ProjectCard
                id={project.id}
                title={project.title}
                description={project.description}
                frontendFramework={project.frontendFramework}
                backendFramework={project.backendFramework}
                links={project.links}
                challengesFaced={project.challengesFaced}
                futureImprovements={project.futureImprovements}
                finalThoughts={project.finalThoughts}
                videoUrl={project.videoUrl}
                onClick={() => handleCardClick(project.id)}
                backgroundImage={project.backgroundImage}
              />
            </motion.div>
          ))}
        </motion.div>
        {/* Overlay arrow buttons */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
          <button
            onClick={handleArrowLeft}
            className="shadow-xl text-3xl text-gray-800 p-2 bg-[rgba(255,255,255,0.3)] rounded-full transition-colors duration-500 ease-in-out hover:bg-[rgba(0,0,0,0.7)] hover:text-gray-100"
          >
            <FaArrowLeft />
          </button>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
          <button
            onClick={handleArrowRight}
            className="shadow-xl text-3xl text-gray-800 p-2 bg-[rgba(255,255,255,0.3)] rounded-full transition-colors duration-500 ease-in-out hover:bg-[rgba(0,0,0,0.7)] hover:text-gray-100"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Carousel Layout (visible on screens below xl) */}
      <div className="flex xl:hidden flex-col justify-center items-center overflow-auto p-4">
        <motion.div
          key={projectsData[mobileIndex].id}
          className="mb-4 w-full flex justify-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          onClick={() => handleCardClick(projectsData[mobileIndex].id)}
        >
          <ProjectCard
            id={projectsData[mobileIndex].id}
            title={projectsData[mobileIndex].title}
            description={projectsData[mobileIndex].description}
            frontendFramework={projectsData[mobileIndex].frontendFramework}
            backendFramework={projectsData[mobileIndex].backendFramework}
            links={projectsData[mobileIndex].links}
            challengesFaced={projectsData[mobileIndex].challengesFaced}
            futureImprovements={projectsData[mobileIndex].futureImprovements}
            finalThoughts={projectsData[mobileIndex].finalThoughts}
            videoUrl={projectsData[mobileIndex].videoUrl}
            onClick={() => handleCardClick(projectsData[mobileIndex].id)}
            backgroundImage={projectsData[mobileIndex].backgroundImage}
            active={true}
          />
        </motion.div>
        {/* Arrow Buttons container for Mobile/Tablet */}
        <div className="flex items-center justify-center space-x-4 mt-4 z-10">
          <button onClick={handlePrev} className="text-3xl text-gray-800 p-2">
            <FaArrowLeft />
          </button>
          <button onClick={handleNext} className="text-3xl text-gray-800 p-2">
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Modal for Project Details */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
