import { atom } from "recoil";

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "0iHyGCKc2rCrf5gH6LAuBU",
});

export const playlistState = atom<SpotifyApi.SinglePlaylistResponse | null>({
  key: "playlistState",
  default: null,
});
