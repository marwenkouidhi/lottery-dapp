import Image from "next/image";
import React from "react";

const CardWinner = ({ winner }) => {
  const { name, betId, date, win } = winner;
  return (
    <div className="bg-gray-200 overflow-hidden dark:bg-slate-800 grid gap-3 font-semibold p-1 px-3  grid-cols-2 rounded-md dark:hover:brightness-125 hover:brightness-95 cursor-pointer relative ">
      <div className="absolute -left-10 -bottom-11  ">
        <Image
          src="/ETHCoin.png"
          className="opacity-30  dark:opacity-10 "
          height={150}
          width={150}
        />
      </div>
      <div className="relative">
        <p className="text-base ">{name}</p>
        <p>{date}</p>
      </div>

      <div className="grid justify-items-end">
        <span className="bg-gray-300 dark:bg-slate-700 px-2 rounded-full ">{`# ${betId}`}</span>
        <p className=" dark:font-light text-yellow-500 text-base">{`${win} ETH`}</p>
      </div>
    </div>
  );
};

export default CardWinner;
