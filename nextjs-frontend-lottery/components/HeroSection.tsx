import Image from "next/image";
import React from "react";

const HeroSection = () => {
  const days = [];
  return (
    <div className="bg-gray-200 dark:bg-slate-800 rounded-full p-2 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <span className="text-6xl">$</span>
        <div>
          <h3 className="dark:text-yellow-400">Jackpot!</h3>
          <div className="text-xl dark:text-yellow-400 font-extrabold">
            937 218 <span className="dark:text-yellow-400/60">BET</span>
          </div>
          <div className="text-sm">💵 USD 2,420,000</div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-6xl">⏰</span>
        <div>
          <h3>Till the next game</h3>
          <div>{}</div>
        </div>
      </div>
      <div className="bg-gray-300 dark:bg-slate-700 rounded-full  flex items-center space-x-3 ">
        <span className="p-1 px-4">START FROM 2 BETS</span>
        <div className="rounded-full bg-yellow-300 dark:bg-yellow-700 p-4 px-8">
          PLAY NOW
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
