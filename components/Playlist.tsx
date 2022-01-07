import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Track from "./Track";

const Playlist: React.FC = () => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="px-8 space-y-1 pb-28">
      {playlist?.tracks.items.map((track, index) => (
        <Track key={track.track.id} index={index} {...track.track}></Track>
      ))}
    </div>
  );
};

export default Playlist;
