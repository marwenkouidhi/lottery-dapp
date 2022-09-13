import Image from "next/image";
import React from "react";
import CardGame from "./cards/CardGame";
const games = [
  {
    date: "DEC 19, 2018",
    bets: 4918,
    numbers: [2, 23, 56, 12, 49, 22],
    draw: 2867,
    soldTickts: 10248,
    winners: 47,
  },
  {
    date: "DEC 19, 2018",
    bets: 4918,
    numbers: [2, 23, 56, 12, 49, 22],
    draw: 2867,
    soldTickts: 10248,
    winners: 47,
  },
  {
    date: "DEC 19, 2018",
    bets: 4918,
    numbers: [2, 23, 56, 12, 49, 22],
    draw: 2867,
    soldTickts: 10248,
    winners: 47,
  },
  {
    date: "DEC 19, 2018",
    bets: 4918,
    numbers: [2, 23, 56, 12, 49, 22],
    draw: 2867,
    soldTickts: 10248,
    winners: 47,
  },
];
const Games = () => {
  return (
    <div className=" grid gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Recent Draws</h1>
        <span className="rounded-full border-solid border-2 px-6 p-1 cursor-pointer hover:brightness-95 dark:hover:brightness-125 bg-gray-200 dark:bg-slate-800">
          ALL
        </span>
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
