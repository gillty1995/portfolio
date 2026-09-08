"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useNav } from "./NavContext";
import MusicPulseBackground from "./MusicPulseBackground";

export default function MusicSkills() {
  const [animateKey, setAnimateKey] = useState(0);
  const [immediateAnimate, setImmediateAnimate] = useState(true);
  const { toggleMenu } = useNav();

  useEffect(() => {
    const timer = setTimeout(() => {
      setImmediateAnimate(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const scrollToAlbums = () => {
    const albumsSection = document.getElementById("albums");
    if (albumsSection) {
      albumsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const headerWords = ["Studio.", "Stage.", "Sync."];

  const initialAnim = {
    opacity: 0,
    filter: "blur(10px)",
    scale: 0.95,
  };

  const animateAnim = {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
  };

  const dynamicProps = immediateAnimate
    ? { initial: initialAnim, animate: animateAnim }
    : {
        initial: initialAnim,
        whileInView: animateAnim,
        viewport: { once: false },
        onViewportLeave: () => setAnimateKey((prev) => prev + 1),
      };

  const buttonHoverEffect = {
    scale: 1.04,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <section
      id="music"
      className="relative w-full min-h-screen overflow-hidden"
    >
      <MusicPulseBackground />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-slate-800">
        <div className="flex flex-col items-center justify-center w-full max-w-none">
          <div className="flex flex-wrap justify-center items-center max-w-none">
            {headerWords.map((word, index) => (
              <motion.button
                key={`${word}-${animateKey}`}
                onClick={toggleMenu}
                className="lexend-extralight text-4xl sm:text-5xl md:text-7xl lg:text-6xl font-bold text-slate-800 mx-1.5 my-1 cursor-pointer smaller-text"
                {...dynamicProps}
                transition={{
                  duration: 1.8,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                whileHover={{
                  scale: 1.02,
                  textShadow: "0 8px 24px rgba(15,23,42,0.18)",
                  transition: {
                    duration: 0.15,
                    ease: [0.22, 1, 0.36, 1] as const,
                  },
                }}
              >
                {word}
              </motion.button>
            ))}
          </div>

          <motion.div
            className="mt-5 flex justify-center items-center px-2 max-w-3xl md:max-w-none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            onViewportLeave={() => setAnimateKey((prev) => prev + 1)}
            variants={{
              hidden: {},
              visible: {
                transition: { delayChildren: 0.9, staggerChildren: 0.08 },
              },
            }}
          >
            <motion.button
              onClick={toggleMenu}
              className="lexend-extralight text-center whitespace-normal text-sm sm:text-lg md:text-2xl lg:text-xl text-slate-700 mx-1 cursor-pointer leading-snug max-w-xs sm:max-w-none md:max-w-none"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.02 }}
            >
              Musician for over a decade | Music teacher for 8 years | Sync
              licensing since 2022.
            </motion.button>
          </motion.div>
        </div>

        <motion.p
          className="mt-5 max-w-2xl text-center text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: false }}
        >
          I write, record, perform, teach, and create sync-ready music for
          artists, brands, and film.
        </motion.p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
          <motion.button
            onClick={scrollToAlbums}
            {...dynamicProps}
            whileHover={buttonHoverEffect}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: 0.15,
            }}
            className="cursor-pointer text-slate-800 px-5 sm:px-7 py-3 sm:py-4 md:px-10 md:py-4 border border-white/70 bg-white/65 shadow-[0_14px_45px_rgba(71,85,105,0.12)] backdrop-blur-md hover:bg-white transition-colors duration-300 rounded-full text-sm sm:text-base md:text-xl flex items-center justify-center min-w-[140px]"
          >
            Listen
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

          <motion.div
            {...dynamicProps}
            whileHover={buttonHoverEffect}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: 0.25,
            }}
          >
            <Link
              href="/?contactFromMusic=true#contact"
              className="cursor-pointer text-slate-800 px-5 sm:px-7 py-3 sm:py-4 md:px-10 md:py-4 border border-white/70 bg-white/45 shadow-[0_14px_45px_rgba(71,85,105,0.1)] backdrop-blur-md hover:bg-white/80 transition-colors duration-300 rounded-full text-sm sm:text-base md:text-xl min-w-[140px] flex items-center justify-center"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
