"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useNav } from "./NavContext";

export default function MusicSkills() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [animateKey, setAnimateKey] = useState(0);
  const [immediateAnimate, setImmediateAnimate] = useState(true);
  const { toggleMenu } = useNav();

  useEffect(() => {
    const timer = setTimeout(() => {
      setImmediateAnimate(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay can be blocked in some browsers; the video still renders as a background.
      });
    }
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
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        style={{ transform: "scale(1.05)", backfaceVisibility: "hidden" }}
        src="/videos/music-bg2.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white">
        <div className="flex flex-col items-center justify-center w-full max-w-none">
          <div className="flex flex-wrap justify-center items-center max-w-none">
            {headerWords.map((word, index) => (
              <motion.button
                key={`${word}-${animateKey}`}
                onClick={toggleMenu}
                className="lexend-extralight text-4xl sm:text-5xl md:text-7xl lg:text-6xl font-bold text-white mx-1.5 my-1 cursor-pointer smaller-text"
                {...dynamicProps}
                transition={{
                  duration: 1.8,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                whileHover={{
                  scale: 1.02,
                  textShadow: "0 0 10px rgba(255,255,255,0.12)",
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
              className="lexend-extralight text-center whitespace-normal text-sm sm:text-lg md:text-2xl lg:text-xl text-white/95 mx-1 cursor-pointer leading-snug max-w-xs sm:max-w-none md:max-w-none"
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
          className="mt-5 max-w-2xl text-center text-xs sm:text-sm md:text-base text-white/90 leading-relaxed"
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
            className="cursor-pointer text-gray-900 px-5 sm:px-7 py-3 sm:py-4 md:px-10 md:py-4 bg-[rgba(245,245,245,0.86)] hover:bg-white transition-colors duration-300 rounded-full text-sm sm:text-base md:text-xl flex items-center justify-center min-w-[140px]"
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

          <Link href="/?contactFromMusic=true#contact">
            <motion.button
              {...dynamicProps}
              whileHover={buttonHoverEffect}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: 0.25,
              }}
              className="cursor-pointer text-white px-5 sm:px-7 py-3 sm:py-4 md:px-10 md:py-4 border border-white/70 bg-white/10 hover:bg-white/20 transition-colors duration-300 rounded-full text-sm sm:text-base md:text-xl min-w-[140px]"
            >
              Work With Me
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
