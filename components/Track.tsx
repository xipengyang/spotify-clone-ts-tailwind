import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import spotifyApi from "../lib/spotify";

type Props = SpotifyApi.TrackObjectFull & { index: number };

function prettyTime(ms: number) {
  var sec = ms / 1000,
    time,
    timeUnit;

  if (sec > 60) {
    // Minutes
    time = Math.round(sec / 60);
    timeUnit = " min";
  } else {
    return "less than 1 min";
  }

  if (time > 1) {
    timeUnit += "s";
  }

  return time + timeUnit;
}

export const Track: React.FC<Props> = ({
  name,
  album,
  artists,
  duration_ms,
  id,
  uri,
  index,
}: Props) => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    if (spotifyApi && spotifyApi.getAccessToken()) {
      setCurrentTrackId(id);
      setIsPlaying(true);
      // requires premium
      //   spotifyApi.play({
      //     uris: [uri],
      //   });
    }
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{index + 1}</p>
        <img className="h-10 w-10" src={album.images[0].url} alt=""></img>
        <div>
          <p className="text-white">{name}</p>
          <p>{artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between md:ml-0 ml-auto">
        <p className="w-40 hidden md:inline">{album.name}</p>
        <p>{prettyTime(duration_ms)}</p>
      </div>
    </div>
  );
};

export default Track;
