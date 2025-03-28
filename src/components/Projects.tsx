"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "@/utils/ProjectData";
import ProjectModal from "./ProjectModal";
import { useIntersectionRatio } from "@/app/hooks/useIntersectionRatio";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type ProjectType = (typeof projectsData)[0] | null;

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectType>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Desktop parallax effect (for large screens)
  const { scrollYProgress } = useScroll();
  const xRange = useTransform(scrollYProgress, [0, 1], [310, -1000]);
  const intersectionRatio = useIntersectionRatio(sectionRef);
  const smoothRatio = useSpring(intersectionRatio, {
    stiffness: 50,
    damping: 20,
  });
  const xFinal = useTransform(
    [xRange, smoothRatio],
    ([val, r]) => (1 - (r as number)) * (val as number)
  );

  const handleCardClick = (projectId: number) => {
    const project = projectsData.find((p) => p.id === projectId);
    if (project) setSelectedProject(project);
  };

  // Mobile/Tablet carousel state
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
      className="relative w-full min-h-[80vh] lg:min-h-[65vh] xl:min-h-screen bg-gradient-to-b from-neutral-200 to-gray-100 overflow-auto mobile-extra-pb"
    >
      {/* Desktop Parallax Layout (visible on xl and up) */}
      <div className="hidden xl:flex absolute inset-0 justify-center items-center">
        <motion.div
          className="flex space-x-10"
          style={{ x: xFinal }}
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
      </div>

      {/* Mobile/Tablet Carousel Layout (visible on screens below xl) */}
      <div className="flex xl:hidden absolute inset-0 flex-col justify-center items-center overflow-auto p-4">
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
        {/* Arrow Buttons container */}
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
