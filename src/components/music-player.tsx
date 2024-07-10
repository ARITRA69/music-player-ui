"use client";
import Image from "next/image";
import {
  Ellipsis,
  Play,
  Pause,
  Triangle,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useMusicPlayer } from "@/context/music-player-context";

export const MusicPlayer = () => {
  const { currentSong, isPlaying, setIsPlaying } = useMusicPlayer();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current?.duration || 0);
      };
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => {
        audioRef.current?.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [currentSong]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = (newProgress / 100) * duration;
    }
  };

  const updateProgress = () => {
    if (audioRef.current && duration > 0) {
      const newProgress = (audioRef.current.currentTime / duration) * 100;
      setProgress(newProgress);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  if (!currentSong) {
    return (
      <div className="hidden md:flex flex-col items-center justify-center gap-10 w-full max-w-md">
        <Image
          src="/no-song.svg"
          width={200}
          height={200}
          alt="No song selected"
        />
        <p className="font-mono">No song selected</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 w-full max-w-md flex flex-col justify-center gap-3 md:gap-10 fixed bottom-0 md:relative bg-black md:bg-transparent rounded-t-2xl">
      <div className="flex flex-row md:flex-col items-center md:items-start gap-1">
        <h1 className="text-lg md:text-3xl font-bold">{currentSong.name}</h1>
        <p className="text-xs md:text-base opacity-60">{currentSong.artist}</p>
      </div>
      <div className="flex flex-row md:flex-col items-center gap-2">
        <Image
          src={`https://cms.samespace.com/assets/${currentSong.cover}`}
          width={500}
          height={500}
          alt={currentSong.name}
          className="w-12 md:w-96 aspect-square object-cover rounded md:rounded-xl"
        />
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleProgressChange}
          style={{ "--progress": `${progress}%` } as React.CSSProperties}
        />
      </div>
      <div className="flex items-center justify-between">
        <button className="flex justify-center items-center h-8 md:h-12 w-8 md:w-12 rounded-full bg-foreground/10">
          <Ellipsis fill="white" className="h-6" />
        </button>
        <div className="flex items-center justify-center gap-6">
          <button className="flex justify-center items-center h-8 md:h-12 w-8 md:w-12 rounded-full hover:bg-foreground/10">
            <Triangle fill="white" className="h-6 -rotate-90" />
          </button>
          <button
            onClick={togglePlayPause}
            className="flex justify-center items-center h-8 md:h-12 w-8 md:w-12 rounded-full bg-foreground"
          >
            {isPlaying ? (
              <Pause fill="black" className="h-6" />
            ) : (
              <Play fill="black" className="h-6" />
            )}
          </button>
          <button className="flex justify-center items-center h-8 md:h-12 w-8 md:w-12 rounded-full hover:bg-foreground/10">
            <Triangle fill="white" className="h-6 rotate-90" />
          </button>
        </div>
        <button
          className="flex justify-center items-center h-8 md:h-12 w-8 md:w-12 rounded-full bg-foreground/10"
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeX fill="white" className="h-6" />
          ) : (
            <Volume2 fill="white" className="h-6" />
          )}
        </button>
      </div>
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={updateProgress}
      />
    </div>
  );
};
