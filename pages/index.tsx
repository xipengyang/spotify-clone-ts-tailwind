import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Create Next App with Tailwind</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Sidebar></Sidebar>
      </main>
    </div>
  );
};

export default Home
