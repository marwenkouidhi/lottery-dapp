import Image from "next/image";
import React from "react";
import { RiMoneyPoundBoxFill } from "react-icons/ri";
import { MdTimelapse } from "react-icons/md";
const HeroSection = () => {
  const days = [];
  return (
    <div className=" font-semibold bg-gray-200 dark:bg-slate-800  rounded-md px-16 p-10 flex justify-between items-center cursor-pointer hover:brightness-95 dark:hover:brightness-105">
      <div className=" flex space-x-4">
        <Image src="/hero3.png" height={80} width={80} />
        <div>
          <h2 className="text-xl text-yellow-500">Jackpot!</h2>
          <p className="text-4xl text-yellow-500">
            937 218 <span className="opacity-80">BET</span>
          </p>
          <p>USD 2,420,000</p>
        </div>
      </div>
      <div className="w-1 h-14 dark:bg-gray-100 bg-slate-900 shadow-2xl rounded-full" />
      <div className="flex space-x-4">
        <Image src="/hero4.png" height={80} width={80} />
        <div className="flex flex-col space-y-3">
          <p className="text-base">Till the next draw</p>
          <div className="flex space-x-2">
            <div className="p-2 bg-gray-300 dark:bg-slate-900 rounded-sm px-3 ">
              3
            </div>
            <div className="p-2 bg-gray-300 dark:bg-slate-900 rounded-sm px-3">
              4
            </div>
            <div className="p-2 bg-gray-300 dark:bg-slate-900 rounded-sm px-3">
              5
            </div>
          </div>
        </div>
      </div>
      <div className="w-1 h-14 dark:bg-gray-100 bg-slate-900 shadow-2xl rounded-full" />
      <div className="flex space-x-2 items-center bg-gray-100 dark:bg-slate-700 rounded-full ">
        <p className="pl-4 uppercase">Start from 2 bets</p>
        <button className="bg-gradient-to-b from-yellow-400 to-yellow-600 p-2 px-4 rounded-full text-base">
          PLAY NOW
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
