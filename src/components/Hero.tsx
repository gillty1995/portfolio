"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNav } from "./NavContext";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { toggleMenu } = useNav();
  const pathname = usePathname();

  const [immediateAnimate, setImmediateAnimate] = useState(true);

  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    setImmediateAnimate(true);

    const timer = setTimeout(() => {
      setImmediateAnimate(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  // Scroll to projects button functionality
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const headerWords = ["Gill", "Hermelin"];
  const taglineWords = [
    "Software",
    "Engineer",
    "|",
    "Sound",
    "Engineer",
    "|",
    "Musician",
  ];
  const taglineWords2 = ["Software.", "Sound.", "Solutions."];

  const initialAnim = {
    opacity: 0,
    filter: "blur(10px)",
    scale: 0.9,
    textShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    rest: "rest",
  };
  const animateAnim = {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    textShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)",
  };
  const transitionDuration = 2;
  const baseDelay = 0.1;
  // const secondaryDelay = 1;
  const taglineDelay = 3;

  const dynamicProps = immediateAnimate
    ? { initial: initialAnim, animate: animateAnim }
    : {
        initial: initialAnim,
        whileInView: animateAnim,
        viewport: { once: false },
        onViewportLeave: () => setAnimateKey((prev) => prev + 1),
      };

  const buttonHoverEffect = {
    scale: 1.1,
    textShadow: "4px 4px 15px rgba(0, 0, 0, 0.5)",
    transition: { duration: 0.2, ease: "easeOut" },
  };

  // Merge dynamicProps with the whileHover property.
  const buttonDynamicProps = {
    ...dynamicProps,
    whileHover: buttonHoverEffect,
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ transform: "scale(1.05)", backfaceVisibility: "hidden" }}
        src="/videos/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Animated Text Container */}
      <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4">
        {/* Header Section */}
        <div className="flex flex-wrap justify-center items-center">
          {headerWords.map((word, index) => (
            <motion.button
              key={`${index}-${animateKey}`}
              onClick={toggleMenu}
              className="lexend-extralight text-5xl md:text-8xl lg:text-6xl font-bold text-white mx-2 my-1 cursor-pointer smaller-text"
              {...dynamicProps}
              transition={{
                duration: transitionDuration,
                ease: "easeOut",
                delay: index * baseDelay,
              }}
              whileHover={{
                scale: 1.1,
                textShadow: "4px 4px 15px rgba(0, 0, 0, 0.5)",
              }}
            >
              {word}
            </motion.button>
          ))}
        </div>

        {/* Tagline Section */}
        <div className="flex flex-wrap justify-center items-center max-w-4xl">
          {taglineWords.map((word, index) => (
            <motion.button
              key={`${headerWords.length + index}-${animateKey}`}
              onClick={toggleMenu}
              className="lexend-extralight text-xl md:text-2xl lg:text-xl text-white mx-1 my-1 cursor-pointer"
              {...dynamicProps}
              transition={{
                duration: transitionDuration,
                ease: "easeOut",
                delay: headerWords.length * baseDelay + index * baseDelay,
              }}
              whileHover={{
                scale: 1.1,
                textShadow: "4px 4px 15px rgba(0, 0, 0, 0.5)",
              }}
            >
              {word}
            </motion.button>
          ))}
        </div>
        {/* Tagline2 Section */}
        <motion.div
          className="flex flex-wrap justify-center items-center max-w-4xl"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: taglineDelay,
                staggerChildren: 1.2,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          onViewportLeave={() => setAnimateKey((prev) => prev + 1)}
        >
          {taglineWords2.map((word, index) => (
            <motion.button
              key={`${headerWords.length + index}-${animateKey}`}
              onClick={toggleMenu}
              className="lexend-extralight text-xl md:text-2xl lg:text-xl text-white mx-1 my-1 cursor-pointer max-sm:text-sm"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{
                duration: transitionDuration,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.1,
                textShadow: "4px 4px 15px rgba(0, 0, 0, 0.5)",
              }}
            >
              {word}
            </motion.button>
          ))}
        </motion.div>

        {/* Call to Action Buttons */}
        <div className="flex mt-8 space-x-6">
          {/* Software Button with Down Arrow */}
          <motion.button
            onClick={scrollToProjects}
            {...buttonDynamicProps}
            transition={{
              duration: transitionDuration,
              ease: "easeOut",
              delay: 0,
            }}
            className="cursor-pointer max-sm:text-white text-gray-800 px-4 sm:px-6 py-2 sm:py-3 md:px-10 md:py-4 bg-[rgba(229,229,229,0.44)] hover:bg-[rgba(229,229,229,1)] transition-colors duration-500 rounded-full text-sm sm:text-base md:text-xl flex items-center"
          >
            Software
            <svg
              className="w-6 h-6 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.button>

          {/* Music Button with Right Arrow */}
          <Link href="/musicskills">
            <motion.button
              {...buttonDynamicProps}
              transition={{
                duration: transitionDuration,
                ease: "easeOut",
                delay: 0,
              }}
              className="cursor-pointer max-sm:text-white text-gray-800 px-4 sm:px-6 py-2 sm:py-3 md:px-10 md:py-4 bg-[rgba(229,229,229,0.44)] hover:bg-[rgba(229,229,229,1)] transition-colors duration-500 rounded-full text-sm sm:text-base md:text-xl flex items-center"
            >
              Music
              <svg
                className="w-6 h-6 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
