import { ListTabs } from "@/components/list-tabs";
import { MusicPlayer } from "@/components/music-player";
import { SideNav } from "@/components/side-nav";
import { MusicPlayerProvider } from "@/context/music-player-context";
import { ISong } from "@/types";

export default async function Home() {
  const musicResponse = await fetch("https://cms.samespace.com/items/songs");
  const musicData = await musicResponse.json();
  const songs: ISong[] = musicData.data;

  return (
    <MusicPlayerProvider>
      <main className="flex">
        <SideNav />
        <section className="flex flex-col md:flex-row gap-10 w-full relative min-h-screen pb-40 md:pb-0">
          <ListTabs data={{ songs }} />
          <MusicPlayer />
        </section>
      </main>
    </MusicPlayerProvider>
  );
}
