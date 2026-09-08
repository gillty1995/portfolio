/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNav } from "./NavContext";
import { usePathname } from "next/navigation";
import LiquidHeroBackground from "./LiquidHeroBackground";

export default function Hero() {
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

  // Scroll to projects button functionality
  const scrollToProjects = () => {
    const workSection =
      document.getElementById("featured-work") ??
      document.getElementById("projects");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const headerWords = ["Gill", "Hermelin"];
  const taglineWords = [
    "Software",
    "Engineer",
  ];
  const taglineWords2 = ["Design.", "Build.", "Ship."];

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
  const headerAnimateAnim = {
    ...animateAnim,
    textShadow: "0px 8px 26px rgba(15, 23, 42, 0.24)",
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

  const headerDynamicProps = immediateAnimate
    ? { initial: initialAnim, animate: headerAnimateAnim }
    : {
        initial: initialAnim,
        whileInView: headerAnimateAnim,
        viewport: { once: false },
        onViewportLeave: () => setAnimateKey((prev) => prev + 1),
      };

  const buttonHoverEffect = {
    scale: 1.04,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as any },
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      <LiquidHeroBackground />

      {/* Animated Text Container */}
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-6">
        {/* Header Section */}
        <div className="flex flex-wrap justify-center items-center">
          {headerWords.map((word, index) => (
            <motion.button
              key={`${index}-${animateKey}`}
              onClick={toggleMenu}
              className="lexend-extralight text-5xl md:text-8xl lg:text-6xl font-bold text-slate-800 mx-2 cursor-pointer smaller-text"
              {...headerDynamicProps}
              transition={{
                duration: transitionDuration,
                ease: "easeOut",
                delay: index * baseDelay,
              }}
              whileHover={{
                scale: 1.02,
                textShadow: "0 0 8px rgba(0,0,0,0.12)",
                transition: {
                  duration: 0.15,
                  ease: [0.22, 1, 0.36, 1] as any,
                },
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
              className="lexend-extralight text-2xl md:text-4xl lg:text-3xl text-slate-700 mx-1 cursor-pointer"
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
              className="lexend-extralight text-xl md:text-2xl lg:text-xl text-slate-700 mx-1 cursor-pointer max-sm:text-sm"
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
        <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Work Button with Down Arrow */}
          <motion.button
            onClick={scrollToProjects}
            {...dynamicProps}
            whileHover={buttonHoverEffect}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: 0.15,
            }}
            className="cursor-pointer text-slate-800 px-5 sm:px-7 py-3 sm:py-4 md:px-10 md:py-4 border border-white/70 bg-white/65 shadow-[0_14px_45px_rgba(71,85,105,0.12)] backdrop-blur-md hover:bg-white transition-colors duration-300 rounded-full text-sm sm:text-base md:text-xl flex items-center justify-center min-w-[140px]"
          >
            View Projects
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

          {/* Contact Button */}
          <motion.button
            onClick={scrollToContact}
            {...dynamicProps}
            whileHover={buttonHoverEffect}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: 0.25,
            }}
            className="cursor-pointer text-slate-800 px-5 sm:px-7 py-3 sm:py-4 md:px-10 md:py-4 border border-white/70 bg-white/45 shadow-[0_14px_45px_rgba(71,85,105,0.1)] backdrop-blur-md hover:bg-white/80 transition-colors duration-300 rounded-full text-sm sm:text-base md:text-xl min-w-[140px]"
          >
            Let&apos;s Talk
          </motion.button>
        </div>
      </div>
    </section>
  );
}
