"use client";
import { FC, useState, useMemo } from "react";
import { SearchBar } from "@/components/search-bar";
import { ISong } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMusicPlayer } from "@/context/music-player-context";

type ForYouTabContentProps = {
  songs: ISong[];
};

export const ForYouTabContent: FC<ForYouTabContentProps> = ({ songs }) => {
  const { setCurrentSong, setIsPlaying, currentSong } = useMusicPlayer();
  const [searchTerm, setSearchTerm] = useState("");

  const getSongButtonClickHandler = (song: ISong) => () => {
    document.documentElement.style.setProperty("--music-accent", song.accent);

    setCurrentSong(song);
    setIsPlaying(true);
  };

  const filteredSongs = useMemo(() => {
    return songs.filter(
      (song) =>
        song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [songs, searchTerm]);

  // Animation variants
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <SearchBar
        value={searchTerm}
        onChange={(e: any) => setSearchTerm(e.target.value)}
        placeholder="Search songs or artists..."
      />
      <motion.ul
        className="flex flex-col gap-4 w-full"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {filteredSongs.map((song) => (
          <motion.li
            key={song.id}
            className={`flex items-center justify-between p-2 cursor-pointer rounded-xl ${
              currentSong?.id === song.id
                ? "bg-foreground/10"
                : "hover:bg-white/5"
            }`}
            variants={item}
            onClick={getSongButtonClickHandler(song)}
          >
            <div className="flex items-center gap-4">
              <Image
                src={`https://cms.samespace.com/assets/${song.cover}`}
                alt={song.name}
                width={50}
                height={50}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="text-lg">{song.name}</p>
                <p className="text-sm opacity-60">{song.artist}</p>
              </div>
            </div>
            {currentSong?.id === song.id ? (
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            ) : (
              <p>{formatDuration(song.duration)}</p>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};
