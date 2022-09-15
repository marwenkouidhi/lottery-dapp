import Image from "next/image";
import React from "react";
import { GoChevronRight } from "react-icons/go";
import { howTo } from "../data/howTo";

const HowTo = () => {
  return (
    <div className=" grid gap-2 w-[90%] mx-auto sm:w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">How To Play</h1>
        <p className="rounded-full border-solid border-2 px-3 p-1 cursor-pointer hover:brightness-95 dark:hover:brightness-125 bg-gray-200 dark:bg-slate-800 flex space-x-1 items-center">
          <span>ALL</span>
          <GoChevronRight size={14} />
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {howTo.map((item, _) => {
          return (
            <div className="cursor-pointer bg-gray-200 dark:bg-slate-800 p-4 py-6  rounded-md hover:brightness-95 dark:hover:brightness-105 hover:scale-105  ease-in-out duration-300  col-span-full sm:col-span-2 md:col-span-1 ">
              <Image src={item.imgUrl} height={70} width={70} />
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowTo;
