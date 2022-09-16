import React from "react";
import { GoChevronRight } from "react-icons/go";
import { recentBets } from "../data/game";

const header = ["Player", "Date", "Combination"];

const LiveFeed = () => {
  return (
    <div className=" grid gap-2 w-[90%] mx-auto sm:w-full bg-gray-200 dark:bg-slate-800  rounded-md hover:brightness-95 dark:hover:brightness-105    ">
      <div className="flex justify-between items-center p-4 py-6 ">
        <h1 className="text-lg font-semibold relative">
          Recent Bets
          <div className="absolute left-0 -top-3 text-xs flex space-x-1 items-center dark:bg-slate-700 bg-gray-300 px-2 rounded-md ">
            <span className="relative flex h-2 w-2  ">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
            </span>
            <span>LIVE</span>
          </div>
        </h1>
        <p className="rounded-full border-solid border-2 px-3 p-1 cursor-pointer hover:brightness-95 dark:hover:brightness-125 bg-gray-300 dark:bg-slate-800 flex space-x-1 items-center">
          <span>ALL</span>
          <GoChevronRight size={14} />
        </p>
      </div>
      <div>
        <div className="grid gap-1">
          <div className="grid grid-cols-3 px-4 border-solid border-b-4 dark:border-slate-900 border-gray-400 text-base py-1">
            {header.map((item, _) => (
              <div key={_}>{item}</div>
            ))}
          </div>
          <div>
            {recentBets.map(({ player, date, combination }, _) => (
              <div
                key={_}
                className="grid grid-cols-3 py-2  items-center px-4 border-solid border-b-4 border-gray-100 dark:border-slate-900 cursor-pointer   "
              >
                <div>{player}</div>
                <div>{date}</div>
                <div className="flex space-x-2">
                  {combination.map((item, _) => (
                    <div
                      key={_}
                      className="bg-gray-300 dark:bg-slate-700 w-8 h-8 flex justify-center items-center rounded-full  "
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;
