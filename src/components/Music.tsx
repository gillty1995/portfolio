"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import AlbumCard, { Album } from "./AlbumCard";
import MusicModal from "./MusicModal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const albumsData: Album[] = [
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
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  const handleNext = () => {
    setMobileIndex((prev) => (prev + 1) % albumsData.length);
  };

  const handlePrev = () => {
    setMobileIndex(
      (prev) => (prev - 1 + albumsData.length) % albumsData.length
    );
  };

  return (
    <section id="albums" className="relative py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-gray-800 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3.5 }}
        >
          {["A", "l", "b", "u", "m", "s"].map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h2>

        {/* Desktop Layout: Horizontal scroll container (visible on xl and up) */}
        <div className="hidden xl:flex justify-center overflow-x-auto space-x-8 px-4 py-5 snap-x snap-mandatory">
          {albumsData.map((album, index) => (
            <motion.div
              key={album.id}
              className="snap-center flex-shrink-0 w-64"
              initial={{ opacity: 0, y: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.3 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <AlbumCard
                album={album}
                onClick={() => setSelectedAlbum(album)}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile/Tablet Layout: Carousel with arrow buttons (visible below xl) */}
        <div className="flex xl:hidden flex-col items-center">
          <motion.div
            key={albumsData[mobileIndex].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedAlbum(albumsData[mobileIndex])}
          >
            <AlbumCard
              album={albumsData[mobileIndex]}
              onClick={() => setSelectedAlbum(albumsData[mobileIndex])}
            />
          </motion.div>
          {/* Arrow Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-4">
            <button onClick={handlePrev} className="text-3xl text-gray-800 p-2">
              <FaArrowLeft />
            </button>
            <button onClick={handleNext} className="text-3xl text-gray-800 p-2">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {selectedAlbum && (
        <MusicModal
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
        />
      )}
    </section>
  );
}
