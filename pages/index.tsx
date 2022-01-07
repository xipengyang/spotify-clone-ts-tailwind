import type { NextPage } from 'next'
import Head from 'next/head'
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
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

export default Home
