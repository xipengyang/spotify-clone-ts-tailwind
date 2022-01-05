import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";

const Center: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-8">
        {session && session.user && (
          <div className="flex items-center space-x-3 opacity-90 hover:opacity-80 cursor-pointer p-1 pr-2 rounded-full">
            <img className="rounded-full w-10 h-10" src={session.user.image!} />
            <h2>{session.user.name}</h2>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        )}
      </header>
      <section className="h-80 space-x-7 bg-gradient-to-b to-black from-red-500 p-8 items-end flex">
        <h1>hello</h1>
      </section>
    </div>
  );
};

export default Center;
