"use client";
import { motion } from "framer-motion";

// Define the Album interface
export interface Album {
  id: number;
  title: string;
  coverImage: string;
  links: {
    spotify: string;
    apple: string;
    youtube: string;
  };
}

interface AlbumCardProps {
  album: Album;
  onClick: () => void;
}

export default function AlbumCard({ album, onClick }: AlbumCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer rounded-lg overflow-hidden shadow-lg bg-white bg-opacity-75"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={album.coverImage}
        alt={album.title}
        className="w-full h-auto object-cover"
      />
      <div className="p-4">
        <h3 className="text-l font-bold text-black">{album.title}</h3>
      </div>
    </motion.div>
  );
}
