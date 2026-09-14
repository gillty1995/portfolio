"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

export default function MusicInstruments() {
  const [selectedInstrument, setSelectedInstrument] =
    useState<Instrument | null>(null);
  const [showAll, setShowAll] = useState(false);

  const selectInstrument = (instrument: Instrument) => {
    setSelectedInstrument(instrument);

    if (window.matchMedia("(max-width: 1023px)").matches) {
      window.setTimeout(() => {
        document.getElementById("music-skill-details")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 70);
    }
  };

  return (
    <section
      id="musicinstruments"
      className="relative w-full overflow-x-hidden bg-gradient-to-b from-[#f3f4f6] via-[#f1f2f3] to-[#f3f4f6] py-20 sm:py-24"
    >
      <div className="container mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-16">
        <motion.div
          className="mx-auto max-w-xl text-center lg:mx-0 lg:pt-4 lg:text-left"
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
        >
          <h2 className="text-3xl font-light tracking-[-0.05em] text-slate-900 sm:text-4xl md:text-5xl">
            Music skills
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-light leading-relaxed tracking-[-0.02em] text-slate-500 sm:text-base">
            Instruments, production, performance, and teaching shaped by years of making music.
          </p>
          <div id="music-skill-details" className="relative mt-7 min-h-[148px] border-t border-slate-300/60 pt-5 text-center sm:min-h-[136px] lg:text-left">
            <AnimatePresence mode="wait" initial={false}>
              {selectedInstrument && (
                <motion.p
                  key={selectedInstrument.name}
                  className="absolute inset-x-0 top-5 text-sm font-light leading-relaxed tracking-[-0.015em] text-slate-600 sm:text-[0.95rem]"
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {selectedInstrument.details}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2"
          initial={false}
        >
          <AnimatePresence initial={false}>
            {instruments.map((instrument, index) =>
              (showAll || index < 5) && (
                <motion.button
                  key={instrument.name}
                  type="button"
                  onClick={() => selectInstrument(instrument)}
                  aria-pressed={selectedInstrument?.name === instrument.name}
                  className={`group flex cursor-pointer items-center gap-4 rounded-2xl border px-4 py-4 text-left shadow-[0_10px_28px_rgba(71,85,105,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(71,85,105,0.09)] sm:px-5 ${selectedInstrument?.name === instrument.name ? "translate-y-px border-slate-800 bg-slate-800 text-white shadow-[inset_0_2px_8px_rgba(0,0,0,0.24),0_5px_14px_rgba(15,23,42,0.12)]" : "border-white/90 bg-white/65 hover:bg-white"}`}
                  initial={index < 5 ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.42, delay: Math.max(0, index - 5) * 0.045, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.img
                    src={`/images/${instrument.icon}`}
                    alt={`${instrument.name} icon`}
                    className={`h-11 w-11 object-contain sm:h-12 sm:w-12 ${selectedInstrument?.name === instrument.name ? "brightness-0 invert" : ""}`}
                    whileHover={{
                      scale: 1.12,
                      y: -3,
                      transition: { type: "spring", stiffness: 220, damping: 14 },
                    }}
                  />
                  <span><span className={`block text-sm font-medium tracking-[-0.03em] sm:text-base ${selectedInstrument?.name === instrument.name ? "text-white" : "text-slate-900"}`}>{instrument.name}</span><span className={`mt-1 block text-xs font-light ${selectedInstrument?.name === instrument.name ? "text-slate-300" : "text-slate-500"}`}>View details</span></span>
                </motion.button>
              ),
            )}
          </AnimatePresence>
          <AnimatePresence initial={false}>
          {!showAll && (
            <motion.button
              type="button"
              onClick={() => setShowAll(true)}
              className="group flex min-h-[76px] cursor-pointer items-center justify-center rounded-2xl border border-slate-300/70 bg-transparent px-4 py-4 text-sm font-light tracking-[-0.02em] text-slate-700 transition-colors hover:bg-white/70"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              Show more skills <span className="ml-2 text-lg transition-transform group-hover:translate-y-0.5">↓</span>
            </motion.button>
          )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
