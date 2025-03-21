"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const textWords = ["Dive", "into", "my", "Work"];

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/hero-bg.mov"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Responsive Animated Text */}
      <div className="absolute inset-0 flex flex-col lg:flex-row justify-center items-center">
        {textWords.map((word, index) => (
          <motion.h1
            key={index}
            className="lexend-extralight text-7xl md:text-8xl lg:text-6xl font-bold text-white mx-2 md:mx-5 my-1"
            initial={{
              opacity: 0,
              filter: "blur(10px)",
              scale: 0.9,
              textShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              scale: 1,
              textShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)",
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
              delay: index * 0.1,
            }}
            whileHover={{
              scale: 1.1,
              textShadow: "4px 4px 15px rgba(0, 0, 0, 0.5)",
            }}
          >
            {word}
          </motion.h1>
        ))}
      </div>
    </section>
  );
}
