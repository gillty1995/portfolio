"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import InstrumentModal from "./InstrumentModal";

type Instrument = {
  name: string;
  icon: string;
  details: string;
};

const instruments: Instrument[] = [
  {
    name: "Guitar",
    icon: "guitar-icon.png",
    details:
      "I have been playing acoustic and electric guitar for over 10 years. I am proficient in various genres and techniques.",
  },
  {
    name: "Bass",
    icon: "bass-icon.png",
    details:
      "I play bass with a strong sense of groove and technique, complementing both live and studio settings.",
  },
  {
    name: "Piano",
    icon: "piano-icon.png",
    details:
      "I have extensive classical and jazz piano training, and I can also arrange and compose original pieces.",
  },
  {
    name: "Drums",
    icon: "drums-icon.png",
    details:
      "I am experienced with rock, hip hop, and funk drumming, focusing on rhythm and dynamic control.",
  },
  {
    name: "Ukulele",
    icon: "ukulele-icon.png",
    details:
      "I enjoy the light and playful sound of the ukulele and perform both acoustic and modern arrangements.",
  },
  {
    name: "Synthesizer",
    icon: "synth-icon.png",
    details:
      "I use synthesizers to create layered soundscapes and experimental textures in my music.",
  },
  {
    name: "Production",
    icon: "music-icon.png",
    details:
      "I have produced tracks for various genres and collaborate closely with artists for optimal sound design.",
  },
  {
    name: "DJing",
    icon: "dj-icon.png",
    details:
      "Experienced in DJing with a wide range of genres, I create dynamic live mixes that keep audiences engaged.",
  },
  {
    name: "Music Theory",
    icon: "theory-icon.png",
    details:
      "Well-versed in harmony, counterpoint, and arrangement, I use music theory to guide creative decisions.",
  },
  {
    name: "Sound Engineering",
    icon: "sound-icon.png",
    details:
      "Skilled in both live sound and studio recording, ensuring professional-quality audio in every performance.",
  },
  {
    name: "Band Directing",
    icon: "band-icon.png",
    details:
      "I lead ensembles by arranging music that suits my band’s strengths while ensuring cohesive live performances.",
  },
  {
    name: "Live Performances",
    icon: "live-icon.png",
    details:
      "I have performed on various stages and events, always adapting to the energy of the audience.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function MusicInstruments() {
  const [selectedInstrument, setSelectedInstrument] =
    useState<Instrument | null>(null);

  return (
    <section
      id="musicinstruments"
      className="relative w-full overflow-x-hidden bg-gradient-to-b from-gray-200 to-gray-100 py-20 sm:py-24"
    >
      <div className="container mx-auto w-full max-w-7xl px-4">
        <motion.div
          className="mx-auto mb-12 max-w-4xl text-center"
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Musical range
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700">
            My music has been featured on ESPN, AMC, CBS, and more, with
            teaching and performance experience across multiple instruments and
            skills.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {instruments.map((instrument) => (
            <motion.button
              key={instrument.name}
              type="button"
              onClick={() => setSelectedInstrument(instrument)}
              className="group cursor-pointer flex flex-col items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:bg-white hover:shadow-md"
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.img
                src={`/images/${instrument.icon}`}
                alt={`${instrument.name} icon`}
                className="mb-3 h-11 w-11 sm:h-12 sm:w-12"
                whileHover={{
                  scale: 1.12,
                  y: -3,
                  transition: { type: "spring", stiffness: 220, damping: 14 },
                }}
              />
              <span className="text-sm sm:text-base font-medium text-gray-800">
                {instrument.name}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

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
