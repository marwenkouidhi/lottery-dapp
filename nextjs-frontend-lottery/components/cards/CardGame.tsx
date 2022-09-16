import Image from "next/image";
import React from "react";

const CardGame = ({ game }) => {
  const { date, bets, numbers, draw, soldTickts, winners } = game;
  return (
    <div className="bg-gray-200 dark:bg-slate-800 grid gap-3  font-semibold p-4 py-6 rounded-md dark:hover:brightness-125 hover:brightness-95 cursor-pointer">
      <div className="text-center">{date}</div>

      <div className="flex items-end justify-center space-x-2">
        <Image src="/branch1.svg" height={50} width={50} />
        <p className="text-xl font-bold">{`${bets} BETS`}</p>
        <div>
          <Image src="/branch2.svg" height={50} width={50} />
        </div>
      </div>

      <div className="flex  justify-between">
        {numbers.map((nbr, _) => (
          <div className="bg-gray-300 dark:bg-slate-700 w-8 h-8 flex justify-center items-center rounded-full ">
            {nbr}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <p>DRAW #</p>
        <p>{draw}</p>
      </div>
      <div className="flex justify-between">
        <p>TICKETS SOLD</p>
        <p>{soldTickts}</p>
      </div>
      <div className="flex justify-between">
        <p>WINNERS</p>
        <p>{winners}</p>
      </div>
    </div>
  );
};

export default CardGame;
