"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProjectModalProps {
  project: {
    title: string;
    description: string;
    frontendFramework: string;
    backendFramework: string;
    links: { [key: string]: string | undefined };
    challengesFaced: string;
    futureImprovements: string;
    finalThoughts: string;
    videoUrl: string;
    details: string;
  };
  onClose: () => void;
}

const isDesktop = () => window.innerWidth > 768;

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // autplay
  const [shouldAutoplay, setShouldAutoplay] = useState(isDesktop());

  useEffect(() => {
    const handleResize = () => setShouldAutoplay(isDesktop());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Close modal when clicking outside of it
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from propagating to the backdrop
    onClose(); // Close the modal
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      onClick={handleModalClick}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent backdrop
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        // Responsive container: nearly full width on small screens, constrained on larger ones
        className="bg-white text-black p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 h-auto max-h-[90vh] overflow-y-auto shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-black bg-transparent border-none cursor-pointer"
          initial={{ rotate: 45, opacity: 0 }}
          animate={{ rotate: 180, opacity: 1 }}
          exit={{ rotate: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-2xl">X</span>
        </motion.button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-4 lexend">
          {project.title}
        </h2>

        {/* Video */}
        <div className="mb-4 rounded-lg overflow-hidden shadow-xl">
          <video width="100%" controls autoPlay={shouldAutoplay}>
            <source
              src={project.videoUrl || "/path/to/placeholder-video.mp4"}
              type="video/mp4"
            />
          </video>
        </div>

        {/* Description */}
        <p className="text-lg mb-4 font-arial">{project.description}</p>

        {/* Links */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold lexend mb-2 ml-[-10]">Links</h3>
          <div className="flex space-x-4">
            {Object.entries(project.links).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 font-arial hover:text-blue-600"
              >
                {key}
              </a>
            ))}
          </div>
        </div>

        {/* Framework Info */}
        <div className="mb-4">
          <p className="lexend mb-2">
            <strong className="block text-xl mb-2 ml-[-10]">
              Frontend Framework:
            </strong>{" "}
            <span
              className="font-arial"
              dangerouslySetInnerHTML={{ __html: project.frontendFramework }}
            />
          </p>
          <p className="lexend mb-2">
            <strong className="block text-xl mb-2 ml-[-10]">
              Backend Framework:
            </strong>{" "}
            <span
              className="font-arial"
              dangerouslySetInnerHTML={{ __html: project.backendFramework }}
            />
          </p>
        </div>

        {/* Details Section */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold lexend mb-2 ml-[-10]">
            Details
          </h3>
          <div
            className="font-arial mb-4"
            dangerouslySetInnerHTML={{ __html: project.details }}
          />
        </div>

        {/* Challenges Faced */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold lexend mb-2 ml-[-10]">
            Challenges Faced
          </h3>
          <p className="font-arial mb-4">{project.challengesFaced}</p>
        </div>

        {/* Future Improvements */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold lexend mb-2 ml-[-10]">
            Future Improvements
          </h3>
          <div
            className="font-arial mb-4"
            dangerouslySetInnerHTML={{ __html: project.futureImprovements }}
          />
        </div>

        {/* Final Thoughts */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold lexend mb-2 ml-[-10]">
            Final Thoughts
          </h3>
          <p className="font-arial mb-4">{project.finalThoughts}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
