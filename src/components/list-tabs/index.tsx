"use client";

import { ISong } from "@/types";
import { FC } from "react";
import { AnimatedTabs } from "@/components/animated-tabs";
import { ForYouTabContent } from "./for-you-tab-content";
import { TopTracksTabContent } from "./top-tracks-tab-content copy";

type ListTabsProps = {
  data: {
    songs: ISong[];
  };
};

export const ListTabs: FC<ListTabsProps> = (props) => {
  // JUGAD: This is a hack to get the duration of the songs in the list as there are no durations in the API response
  // const [songs2, setSongs2] = useState<ISong[]>([]);

  // useEffect(() => {
  //   const clonedSongs = structuredClone(props.data.songs);
  //   const updatedSongs: ISong[] = [];

  //   clonedSongs.forEach((song) => {
  //     const audio = new Audio();

  //     audio.addEventListener("loadedmetadata", () => {
  //       const duration = audio.duration;
  //       updatedSongs.push({ ...song, duration });
  //       if (updatedSongs.length === clonedSongs.length) {
  //         setSongs2(updatedSongs);
  //       }
  //     });

  //     audio.src = song.url;
  //   });

  //   setSongs2(clonedSongs);
  // }, [props.data.songs]);

  const tabs = [
    {
      id: 1,
      label: "For You",
      content: <ForYouTabContent songs={props.data.songs} />,
    },
    {
      id: 2,
      label: "Top Tracks",
      content: <TopTracksTabContent songs={props.data.songs} />,
    },
  ];

  return (
    <div className="p-6 md:p-10 w-full max-w-2xl">
      <AnimatedTabs tabs={tabs} />
    </div>
  );
};
