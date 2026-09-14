"use client";
import { motion } from "framer-motion";
import { FaApple, FaSpotify, FaYoutube } from "react-icons/fa";
/* eslint-disable @next/next/no-img-element */

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
  onClick?: () => void;
}

export default function AlbumCard({ album, onClick }: AlbumCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className="group w-full max-w-[280px] cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-[0_12px_32px_rgba(71,85,105,0.07)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(71,85,105,0.12)]"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <img
        src={album.coverImage}
        alt={album.title}
        className="aspect-square w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="px-1 pb-1 pt-4">
        <h3 className="text-base font-medium tracking-[-0.035em] text-slate-900">{album.title}</h3>
        <p className="mt-1 text-xs font-light tracking-[-0.02em] text-slate-500">Album · click to explore</p>
        <div className="mt-4 flex items-center gap-3 text-slate-400" aria-label={`${album.title} streaming links`}>
          <a href={album.links.spotify} target="_blank" rel="noreferrer" aria-label={`${album.title} on Spotify`} onClick={(event) => event.stopPropagation()} className="transition-colors hover:text-[#1db954]"><FaSpotify size={17} /></a>
          <a href={album.links.apple} target="_blank" rel="noreferrer" aria-label={`${album.title} on Apple Music`} onClick={(event) => event.stopPropagation()} className="transition-colors hover:text-[#fa3152]"><FaApple size={17} /></a>
          <a href={album.links.youtube} target="_blank" rel="noreferrer" aria-label={`${album.title} on YouTube`} onClick={(event) => event.stopPropagation()} className="transition-colors hover:text-[#ff0000]"><FaYoutube size={17} /></a>
        </div>
      </div>
    </motion.div>
  );
}
