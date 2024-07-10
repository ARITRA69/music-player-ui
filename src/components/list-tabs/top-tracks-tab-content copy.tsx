"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ISong } from "@/types";
import { SearchBar } from "@/components/search-bar";
import { debounce } from "lodash";
import { useMusicPlayer } from "@/context/music-player-context";

type TopTracksTabContentProps = {
  songs: ISong[];
};

export const TopTracksTabContent: FC<TopTracksTabContentProps> = ({
  songs,
}) => {
  const { setCurrentSong, setIsPlaying, currentSong } = useMusicPlayer();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(
    songs.filter((song) => song.top_track)
  );

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

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      const filtered = songs
        .filter((song) => song.top_track)
        .filter(
          (song) =>
            song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );
      setFilteredSongs(filtered);
    }, 300);

    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, songs]);

  const getSongButtonClickHandler = (song: ISong) => () => {
    document.documentElement.style.setProperty("--music-accent", song.accent);
    setCurrentSong(song);
    setIsPlaying(true);
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
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search top tracks or artists..."
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
