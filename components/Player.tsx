import {
  ReplyIcon,
  SwitchHorizontalIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline";
import {
  RewindIcon,
  PauseIcon,
  PlayIcon,
  FastForwardIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { debounce } from "lodash";

const Player: React.FC = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi
        .getMyCurrentPlayingTrack()
        .then((data) => {
          console.log("Now playing " + data.body?.item?.id);
          setCurrentTrackId(data.body?.item?.id || null);

          spotifyApi.getMyCurrentPlaybackState().then((data) => {
            setIsPlaying(data.body?.is_playing);
          });
        })
        .catch(console.log);
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const debouncedAdjustVolume = debounce((volume) => {
    //spotifyApi.setVolume(volume);
    console.log("spotifyApi.setVolume(volume)");
  }, 500);

  const adjustVolumeCallback = useCallback(debouncedAdjustVolume, []);

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  useEffect(() => {
    adjustVolumeCallback(volume);
  }, [volume]);

  return (
    <div
      className="h-24 bg-gradient-to-b from-black to-gray-900 
    text-white grid grid-cols-3 text-xs md:text-base px2 md:px-8"
    >
      {songInfo && (
        <>
          <div className="flex items-center space-x-4">
            <img
              className="hidden md:inline h-10 w-10"
              src={songInfo.album.images[0].url}
              alt=""
            />
            <div>
              <h3>{songInfo?.name}</h3>
              <p>{songInfo.artists?.[0].name}</p>
            </div>
          </div>
          <div className="flex items-center justify-evenly">
            <SwitchHorizontalIcon className="button" />
            <RewindIcon className="button" />
            {isPlaying ? (
              <PauseIcon
                className="button w-10 h-10"
                onClick={handlePlayPause}
              />
            ) : (
              <PlayIcon
                className="button w-10 h-10"
                onClick={handlePlayPause}
              />
            )}
            <FastForwardIcon className="button" />
            <ReplyIcon className="button" />
          </div>
          <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
            {volume == 0 ? (
              <VolumeOffIcon className="button" />
            ) : (
              <VolumeUpIcon className="button" />
            )}
            <input
              type="range"
              value={volume}
              onChange={(e) => setVolume(e.target.value as any)}
              min={0}
              max={100}
              className="w-14 md:w-28"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
