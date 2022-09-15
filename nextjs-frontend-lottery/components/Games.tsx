import Image from "next/image";
import React from "react";
import { GoChevronRight } from "react-icons/go";
import { games } from "../data/game";
import CardGame from "./cards/CardGame";

const Games = () => {
  return (
    <div className=" grid gap-2 w-[90%] mx-auto sm:w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Recent Draws</h1>
        <p className="rounded-full border-solid border-2 px-3 p-1 cursor-pointer hover:brightness-95 dark:hover:brightness-125 bg-gray-200 dark:bg-slate-800 flex space-x-1 items-center">
          <span>ALL</span>
          <GoChevronRight size={14} />
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {games.map((game, _) => (
          <CardGame key={_} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Games;
