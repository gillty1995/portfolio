"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Album } from "./AlbumCard";
import { useEffect } from "react";

interface MusicModalProps {
  album: Album;
  onClose: () => void;
}

export default function MusicModal({ album, onClose }: MusicModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black opacity-70"
        onClick={onClose}
      ></div>

      <motion.div
        className="relative bg-white p-4 sm:p-6 md:p-8 rounded-lg z-10 w-full max-w-md sm:max-w-lg mx-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-black bg-transparent border-none cursor-pointer"
          initial={{ rotate: 45, opacity: 0 }}
          animate={{ rotate: 180, opacity: 1 }}
          exit={{ rotate: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-2xl">X</span>
        </motion.button>

        <h3 className="text-gray-800 text-xl sm:text-2xl font-bold mb-4">
          {album.title}
        </h3>
        <div className="flex flex-col space-y-2">
          {album.links.spotify && (
            <Link
              href={album.links.spotify}
              className="text-blue-500 text-sm sm:text-base"
              target="_blank"
            >
              Listen on Spotify
            </Link>
          )}
          {album.links.apple && (
            <Link
              href={album.links.apple}
              className="text-blue-500 text-sm sm:text-base"
              target="_blank"
            >
              Listen on Apple Music
            </Link>
          )}
          {album.links.youtube && (
            <Link
              href={album.links.youtube}
              className="text-blue-500 text-sm sm:text-base"
              target="_blank"
            >
              Watch on YouTube
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}
