"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function MusicSkills() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.error("Error playing video:", err));
    }
  }, []);

  // Array of instruments
  const instruments = [
    "| Guitar |",
    "| Bass |",
    "| Piano |",
    "| Drums |",
    "| Ukulele |",
    "| Synthesizer |",
    "| Sound Engineering |",
    "| Production |",
    "| Music Theory |",
    "| Band Directing |",
    "| Live Performances |",
    "| DJing |",
  ];
  // Define subtle off-white color variations
  const offWhites = [
    "#fafafa",
    "#f5f5f5",
    "#f0f0f0",
    "#ebebeb",
    "#e6e6e6",
    "#e1e1e1",
  ];

  // Container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.3,
        type: "spring",
        stiffness: 70,
        damping: 20,
      },
    },
  };

  // Child variants with longer duration
  const childVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
  };

  return (
    <section id="music" className="relative h-screen w-full">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/music-bg.mov"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-white max-[380px]:py-6">
        <motion.h2
          className="text-2xl lg:text-5xl max-[380px]:text-xl font-bold mb-4 text-center lg:mb-10"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          viewport={{ once: false }}
        >
          Creating Musical Experiences
        </motion.h2>
        <motion.p
          className="text-sm lg:text-xl max-[380px]:text-xs mb-6 text-center max-w-full sm:max-w-3xl"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2.5, delay: 0.5 }}
          viewport={{ once: false }}
        >
          Professional musician for over a decade, I write and arrange various
          genres of music for streaming and sync licensing. I&apos;m able to
          create custom music for any occasion, and with over 6 years of
          teaching experience, I bring a wealth of musical expertise to every
          lesson.
        </motion.p>
        <motion.div
          className="flex flex-col items-center space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          <motion.div
            className="text-sm lg:text-lg max-[380px]:text-xs"
            variants={childVariants}
          >
            <strong>Musical Expertise In:</strong>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-2">
            {instruments.map((instrument, i) => (
              <motion.span
                key={instrument}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: i * 0.3 }}
                viewport={{ once: false }}
                style={{ color: offWhites[i % offWhites.length] }}
                className="text-sm lg:text-2xl max-[380px]:text-xs font-medium"
              >
                {instrument}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="text-center text-sm lg:text-lg max-[380px]:text-xs"
            variants={childVariants}
          >
            <strong>Sync Licensing:</strong> My music has been featured on ESPN,
            AMC, CBS, and more.
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            variants={childVariants}
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-gray-800 mt-4 px-2 py-1 lg:px-6 lg:py-3 bg-neutral-100 hover:bg-neutral-300 transition-colors rounded-full text-xs lg:text-base max-[380px]:text-[0.75rem]"
          >
            Book a Lesson
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
