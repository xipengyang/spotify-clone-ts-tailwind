import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

const Player: React.FC = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolumn] = useState(50);

  const songInfo = useSongInfo();

  console.log(songInfo);

  return (
    <div>
      <div>{songInfo && <img src={songInfo.album.images[0].url} alt="" />}</div>
    </div>
  );
};

export default Player;
