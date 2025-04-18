"use client";
import React, { Suspense, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const iconMap: { [key: string]: string } = {
  Note: "note-icon.png",
};

export default function MusicSkills() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const searchParams = useSearchParams();
  const refreshKey = searchParams.get("refresh") || "default";

  // Start with immediate animation enabled.
  const [immediateAnimate, setImmediateAnimate] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setImmediateAnimate(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.error("Error playing video:", err));
    }
  }, []);

  const scrollToAblums = () => {
    const projectsSection = document.getElementById("albums");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Define variants for the animations.
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  const paragraphVariantLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.8, delay: 0.3 } },
  };

  const paragraphVariantRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 2, delay: 0.6 } },
  };

  const buttonVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.8 } },
  };

  // Conditionally use animate versus whileInView
  const animationProps = immediateAnimate
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once: false } };

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen text-center">
          Loading...
        </div>
      }
    >
      <section
        id="music"
        key={refreshKey}
        className="relative min-h-screen w-full"
      >
        {/* Video Background */}
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          style={{ transform: "scale(1.01)", backfaceVisibility: "hidden" }}
          src="/videos/music-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />

        {/* Extended Header with Gradient Fade-Out */}
        <motion.header
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[rgba(0,0,0,0.8)] to-transparent py-10 sm:py-16 md:py-20 px-4 z-30"
          initial="hidden"
          variants={headerVariants}
          {...animationProps}
        >
          <h1 className="text-center text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide text-white max-sm:text-2xl xl:text-5xl 2xl:text-6xl">
            Creating Musical Experiences
          </h1>
        </motion.header>

        {/* Overlay Content */}
        <div className="overlay-content relative z-20 flex flex-col items-center justify-center min-h-screen pt-20 sm:pt-32 px-4 text-white">
          {/* Responsive Note Icons with Continuous Bounce Animation */}
          <motion.div className="flex justify-center gap-4 sm:gap-8 md:gap-40 mb-5 mt-[-10px] max-sm:mt-5 extra-space">
            {[0, 1, 2].map((idx) => (
              <motion.img
                key={idx}
                src={`/images/${iconMap["Note"]}`}
                alt="Note icon"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: idx * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* First Paragraph */}
          <motion.p
            className="text-base sm:text-lg md:text-2xl mb-10 text-center max-w-full sm:max-w-3xl"
            initial="hidden"
            variants={paragraphVariantLeft}
            {...animationProps}
          >
            Professional musician for over a decade, I write and arrange various
            genres of music for streaming and sync licensing.
          </motion.p>

          {/* Second Paragraph */}
          <motion.p
            className="text-base sm:text-lg md:text-2xl mb-8 text-center max-w-full sm:max-w-5xl"
            initial="hidden"
            variants={paragraphVariantRight}
            {...animationProps}
          >
            I&apos;m able to create custom music for any occasion, and with over
            6 years of teaching experience, I bring a wealth of musical
            expertise to every lesson.
          </motion.p>

          {/* Call to action buttons */}
          <div className="flex mt-8 space-x-6 max-sm:space-x-3">
            {/* Software Button with Down Arrow */}

            <motion.div
              className="flex flex-col items-center"
              initial="hidden"
              variants={buttonVariant}
              {...animationProps}
            >
              <motion.button
                onClick={scrollToAblums}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer text-gray-800 mt-6 px-4 sm:px-6 py-2 sm:py-3 md:px-10 md:py-4 bg-neutral-100 hover:bg-neutral-300 transition-colors rounded-full text-sm sm:text-base md:text-xl flex items-center justify-center min-w-[100px]  min-h-[40px]"
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
            </motion.div>
            <motion.div
              className="flex flex-col items-center"
              initial="hidden"
              variants={buttonVariant}
              {...animationProps}
            >
              <Link href="/?contactFromMusic=true#contact">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer text-gray-800 mt-6 px-4 sm:px-6 py-2 sm:py-3 md:px-10 md:py-4 bg-neutral-100 hover:bg-neutral-300 transition-colors rounded-full text-sm sm:text-base md:text-xl justify-center min-w-[200px] min-h-[40px]"
                >
                  Book a Lesson
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Suspense>
  );
}
