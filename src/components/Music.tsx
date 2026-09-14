"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AlbumCard, { Album } from "./AlbumCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const albumsData: Album[] = [
  {
    id: 0,
    title: "Another Night",
    coverImage: "/images/another-night-album.jpg",
    links: {
      spotify: "https://open.spotify.com/album/5pQFS1kEbaQL2Ud1K2IJgz",
      apple:
        "https://music.apple.com/us/album/another-night-beat-tape/1805667839",
      youtube:
        "https://www.youtube.com/watch?v=Fp-m4LRDQoY&list=OLAK5uy_mn-b9dbTOmA0air4HKXyDhO9MD6XVzjVM",
    },
  },
  {
    id: 1,
    title: "Easy Beat Tape",
    coverImage: "/images/easybeattape-album.JPG",
    links: {
      spotify:
        "https://open.spotify.com/album/0ohm9T0VeptlyFfyxY34yt?si=5xsUO9ASRnyAVIoociE5zA",
      apple: "https://music.apple.com/us/album/easy-beat-tape/1713984183",
      youtube:
        "https://www.youtube.com/watch?v=rpRTVQb6Xxg&list=OLAK5uy_nvSmAvGWXdpBqQp5alPE84J0Iuejouj10",
    },
  },
  {
    id: 2,
    title: "Space Tapes",
    coverImage: "/images/spacetapes-album.png",
    links: {
      spotify:
        "https://open.spotify.com/album/5H25av3Vtl77oYM7vXK48y?si=1dUPNAgZRdmYj_XHvYOtcg",
      apple: "https://music.apple.com/us/album/space-tapes/1685897147",
      youtube:
        "https://www.youtube.com/watch?v=pGm5fy1j0wg&list=OLAK5uy_lBsyTVKTDFYCnytk1aiFmG7yOgE0EYszM",
    },
  },
  {
    id: 3,
    title: "Gillty",
    coverImage: "/images/gillty-album.jpg",
    links: {
      spotify: "https://open.spotify.com/album/2OkSiEREUEAU3jLv561pEN",
      apple: "https://music.apple.com/us/album/gillty/1630233667",
      youtube:
        "https://www.youtube.com/watch?v=Z0dayl_6xGY&list=OLAK5uy_lrWQFo0zPpY9L1vjEuftY-PF5S8Ff_S9s",
    },
  },
  {
    id: 4,
    title: "Dreamer",
    coverImage: "/images/dreamer-album.jpg",
    links: {
      spotify: "https://open.spotify.com/album/3IHCRS5Aza4EKb5Dgh0lyS",
      apple: "https://music.apple.com/us/album/dreamer/1626029892",
      youtube:
        "https://www.youtube.com/watch?v=cvudcC5U5P4&list=OLAK5uy_kjlkg-DX_HBWQJxQODBYYfUHG2sul3zPg",
    },
  },
];

export default function Music() {
  const [showAll, setShowAll] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  // Split the data: first 4 albums always visible, extraAlbums for the toggle.
  const firstAlbums = albumsData.slice(0, 4);
  const extraAlbums = albumsData.slice(4);

  // Mobile carousel arrow handlers
  const handleNext = () => {
    setMobileIndex((prev) => (prev + 1) % albumsData.length);
  };
  const handlePrev = () => {
    setMobileIndex(
      (prev) => (prev - 1 + albumsData.length) % albumsData.length
    );
  };

  // Animation config for desktop album cards.
  const getCardAnimation = (index: number) => ({
    initial: { opacity: 0, y: index % 2 === 0 ? -50 : 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.5 },
    transition: { duration: 1, delay: index * 0.3 },
  });

  return (
    <section
      id="albums"
      className="relative bg-gradient-to-b from-[#f3f4f6] via-[#f5f6f7] to-[#f3f4f6] py-20 sm:py-24"
    >
      <div className="container mx-auto max-w-7xl px-5 sm:px-8">
        <motion.h2
          className="mb-10 text-center text-3xl font-light tracking-[-0.05em] text-slate-900 sm:text-4xl xl:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Albums
        </motion.h2>

        {/* Desktop Layout: Grid for album cards (visible on xl and up) */}
        <div className="hidden xl:block">
          <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {firstAlbums.map((album, index) => (
              <motion.div key={album.id} {...getCardAnimation(index)}>
                <AlbumCard album={album} />
              </motion.div>
            ))}
          </div>

          {/* Extra albums drop down (with alternating animations) */}
          <AnimatePresence initial={false}>
            {showAll && extraAlbums.length > 0 && (
              <motion.div
                key="extra-albums"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 grid grid-cols-1 justify-items-center gap-5 overflow-hidden sm:grid-cols-2 lg:grid-cols-4"
              >
                {extraAlbums.map((album, index) => (
                  <motion.div
                    key={album.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <AlbumCard album={album} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Button for extra albums */}
          {extraAlbums.length > 0 && (
            <div className="mt-8 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAll((prev) => !prev)}
                className="w-full max-w-xs cursor-pointer rounded-full border border-slate-300/80 bg-white/70 px-6 py-3 text-sm font-light tracking-[-0.02em] text-slate-700 shadow-sm transition-colors duration-300 hover:bg-white"
              >
                {showAll ? "Show Less" : "Show More"}
              </motion.button>
            </div>
          )}
        </div>

        {/* Mobile/Tablet Layout: Carousel (visible on screens below xl) */}
        <div className="flex xl:hidden flex-col items-center">
          <motion.div
            key={albumsData[mobileIndex].id}
            className="mb-4 w-full flex justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          >
            <AlbumCard album={albumsData[mobileIndex]} />
          </motion.div>
          <div className="flex items-center justify-center space-x-4 mt-4 z-10">
            <button aria-label="Previous album" onClick={handlePrev} className="cursor-pointer p-2 text-2xl text-gray-700">
              <FaArrowLeft />
            </button>
            <button aria-label="Next album" onClick={handleNext} className="cursor-pointer p-2 text-2xl text-gray-700">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
