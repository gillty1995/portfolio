"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InstrumentModal from "./InstrumentModal";

// The list of instrument strings with pipes
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

// Mapping from cleaned instrument names to icon file names.
const iconMap: { [key: string]: string } = {
  Guitar: "guitar-icon.png",
  Bass: "bass-icon.png",
  Piano: "piano-icon.png",
  Drums: "drums-icon.png",
  Ukulele: "ukulele-icon.png",
  Synthesizer: "synth-icon.png",
  "Sound Engineering": "sound-icon.png",
  Production: "music-icon.png",
  "Music Theory": "theory-icon.png",
  "Band Directing": "band-icon.png",
  "Live Performances": "live-icon.png",
  DJing: "dj-icon.png",
};

const instrumentDetails: { [key: string]: string } = {
  Guitar:
    "I have been playing acoustic and electric guitar for over 10 years. I am proficient in various genres and techniques.",
  Bass: "I play bass with a strong sense of groove and technique, complementing both live and studio settings.",
  Piano:
    "I have extensive classical and jazz piano training, and I can also arrange and compose original pieces.",
  Drums:
    "I am experienced with rock, hip hop, and funk drumming, focusing on rhythm and dynamic control.",
  Ukulele:
    "I enjoy the light and playful sound of the ukulele and perform both acoustic and modern arrangements.",
  Synthesizer:
    "I use synthesizers to create layered soundscapes and experimental textures in my music.",
  "Sound Engineering":
    "Skilled in both live sound and studio recording, ensuring professional-quality audio in every performance.",
  Production:
    "I have produced tracks for various genres and collaborate closely with artists for optimal sound design.",
  "Music Theory":
    "Well-versed in harmony, counterpoint, and arrangement, I use music theory to guide creative decisions.",
  "Band Directing":
    "I lead ensembles by arranging music that suits my band’s strengths while ensuring cohesive live performances.",
  "Live Performances":
    "I have performed on various stages and events, always adapting to the energy of the audience.",
  DJing:
    "Experienced in DJing with a wide range of genres, I create dynamic live mixes that keep audiences engaged.",
};

// Container variants for staggering animations.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

// Individual instrument text variants.
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Variants for the icons container.
const iconContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

// Individual icon animation variants.
const iconVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function MusicInstruments() {
  // Helper: clean instrument string (remove pipes and trim spaces)
  const cleanInstrument = (inst: string) => inst.replace(/\|/g, "").trim();

  // State to track the selected instrument; null means no modal.
  const [selectedInstrument, setSelectedInstrument] = useState<{
    name: string;
    details: string;
  } | null>(null);

  return (
    <section
      id="musicinstruments"
      className="relative py-20 bg-gradient-to-b from-gray-200 to-gray-100 w-full overflow-x-hidden"
    >
      <div className="container mx-auto px-4 text-center w-full max-w-full">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 mt-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          Musical Expertise In:
        </motion.h2>

        {/* Instrument Texts */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {instruments.map((skill, index) => (
            <motion.span
              key={index}
              className="text-sm md:text-lg font-medium text-gray-700"
              variants={itemVariants}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* Sync Licensing */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 mt-25"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          Sync Licensing:
        </motion.h2>
        <motion.p
          className="text-center text-gray-800 text-sm md:text-xl mb-25 mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.2, delay: 0 }}
          viewport={{ once: false }}
        >
          My music has been featured on ESPN, AMC, CBS, and more.
        </motion.p>

        {/* Icons Row */}
        <motion.div
          className="flex flex-wrap justify-center gap-15 mt-4 mb-20"
          variants={iconContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {instruments.map((inst, index) => {
            const name = cleanInstrument(inst);
            // Look up the correct icon file from the mapping.
            const fileName = iconMap[name] || "default-icon.png";
            return (
              <motion.img
                key={index}
                src={`/images/${fileName}`}
                alt={`${name} icon`}
                className="w-10 h-10 md:w-12 md:h-12 cursor-pointer"
                variants={iconVariants}
                layoutId={`instrument-${name}`}
                onClick={() =>
                  setSelectedInstrument({
                    name,
                    details:
                      instrumentDetails[name] || "Detailed info coming soon!",
                  })
                }
                whileHover={{
                  scale: 1.2,
                  y: -5,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                  },
                }}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Render the InstrumentModal if an instrument is selected */}
      <AnimatePresence>
        {selectedInstrument && (
          <InstrumentModal
            instrument={selectedInstrument}
            onClose={() => setSelectedInstrument(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
