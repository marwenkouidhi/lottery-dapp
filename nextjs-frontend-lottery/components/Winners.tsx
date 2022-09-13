import React from "react";
import CardWinner from "./cards/CardWinner";
const winners = [
  {
    name: "Brian Thomason",
    betId: "2345",
    date: "01.03.2018",
    win: 0.02,
  },
  {
    name: "Brian Thomason",
    betId: "2345",
    date: "01.03.2018",
    win: 0.02,
  },
  {
    name: "Brian Thomason",
    betId: "2345",
    date: "01.03.2018",
    win: 0.02,
  },
  {
    name: "Brian Thomason",
    betId: "2345",
    date: "01.03.2018",
    win: 0.02,
  },
];

const Winners = () => {
  return (
    <div className=" grid gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Recent Winners</h1>
        <span className="rounded-full border-solid border-2 px-6 p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800">
          ALL
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {winners.map((winner, _) => (
          <CardWinner key={_} winner={winner} />
        ))}
      </div>
    </div>
  );
};

export default Winners;
