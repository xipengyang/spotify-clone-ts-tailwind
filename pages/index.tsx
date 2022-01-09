import type { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Create Next App with Tailwind</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar></Sidebar>
        <Center />
      </main>

      <div>
        <Player />
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(
  context: GetServerSidePropsContext<any>
) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
