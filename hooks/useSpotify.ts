import { User } from "next-auth/core/types";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { REFRESH_ACCESS_TOKEN_ERROR } from "../lib/constant";
import { AccessTokenContext } from "../pages/api/auth/[...nextauth]";

type SessionWithToken = User & AccessTokenContext;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log("what is ", session.error);
      if (session.error && session.error === REFRESH_ACCESS_TOKEN_ERROR) {
        signIn();
      }
      if (session.user && (session.user as SessionWithToken).accessToken) {
        spotifyApi.setAccessToken(
          (session.user as SessionWithToken).accessToken!
        );
      }
    }
  }, [session]);

  return spotifyApi;
}

export default useSpotify;
