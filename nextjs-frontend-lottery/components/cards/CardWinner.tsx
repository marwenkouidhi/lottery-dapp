import Image from "next/image";
import React from "react";

const CardWinner = ({ winner }) => {
  const { name, betId, date, win } = winner;
  return (
    <div className="bg-gray-200 overflow-hidden dark:bg-slate-800 grid gap-3 font-semibold p-4 py-6 rounded-md dark:hover:brightness-125 hover:brightness-95 cursor-pointer">
      <div>
        <div className="flex justify-between items-center">
          <p className="text-lg">{name}</p>
          <span className="bg-gray-300 dark:bg-slate-700 p-1 px-3 rounded-full ">{`# ${betId}`}</span>
        </div>
        <p>{date}</p>
      </div>
      <div className="flex justify-between items-center relative">
        <p className="text-5xl dark:font-light text-yellow-500">{`${win} ETH`}</p>
        <div className="absolute -right-10 -bottom-11">
          <Image
            src="/ETHCoin.png"
            className="opacity-20 "
            height={150}
            width={150}
          />
        </div>
      </div>
    </div>
  );
};

export default CardWinner;
