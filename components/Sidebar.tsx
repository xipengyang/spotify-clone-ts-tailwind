import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useSpotify from "../hooks/useSpotify";

const Sidebar = () => {
  const { data: session } = useSession();

  const [playlists, setPlaylists] =
    useState<SpotifyApi.PlaylistObjectSimplified[]>();
  const spotifyApi = useSpotify();

  const [playlistId, setPlaylistId] = useState("");

  useEffect(() => {
    const fetchPlaylist = async () => {
      const data = await spotifyApi.getUserPlaylists();
      setPlaylists(data.body.items);
    };

    if (spotifyApi && spotifyApi.getAccessToken()) {
      fetchPlaylist().catch(console.error);
    }
  }, [spotifyApi, session]);

  console.log(playlists);

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5"></HomeIcon>
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5"></SearchIcon>
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5"></LibraryIcon>
          <p>Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5"></PlusCircleIcon>
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5"></HeartIcon>
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5"></RssIcon>
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {playlists?.map((playlist) => (
          <p
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}
            className="cursor-pointer hover:text-white"
          >
            {" "}
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
