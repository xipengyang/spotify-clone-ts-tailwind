import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Playlist from "./Playlist";

const Center: React.FC = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] =
    useRecoilState<SpotifyApi.SinglePlaylistResponse | null>(playlistState);

  useEffect(() => {
    const fetchPlaylist = async (playlistId: string) => {
      const data = await spotifyApi.getPlaylist(playlistId);
      setPlaylist(data.body);
    };

    if (spotifyApi && spotifyApi.getAccessToken()) {
      fetchPlaylist(playlistId).catch(console.error);
    }
  }, [spotifyApi, playlistId]);

  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-8">
        {session && session.user && (
          <div className="flex items-center space-x-3 opacity-90 hover:opacity-80 cursor-pointer p-1 pr-2 rounded-full">
            <img className="rounded-full w-10 h-10" src={session.user.image!} />
            <h2>{session.user.name}</h2>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        )}
      </header>
      <section className="h-80 space-x-7 bg-gradient-to-b to-black from-red-500 p-8 items-end flex">
        <img
          className="w-44 h-44 shadow-2xl"
          src={playlist?.images[0]?.url}
        ></img>
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Playlist></Playlist>
      </div>
    </div>
  );
};

export default Center;
