import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdDarkMode, MdWbSunny } from "react-icons/md";

const Toggle = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    theme == "dark" ? setTheme("light") : setTheme("dark");
  };
  return (
    <div
      className="w-14 cursor-pointer p-1 transition-all  duration-700 flex dark:justify-end rounded-md bg-sky-200 dark:bg-slate-800"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <MdDarkMode className="text-gray-100 transition-all" size={20} />
      ) : (
        <MdWbSunny className="text-yellow-500 transition-all" size={20} />
      )}
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex justify-between items-center p-2 ">
      <div className="flex items-center space-x-2  ">
        <Image src="/lottery.png" height={40} width={40} />
        <h1>Dottery</h1>
      </div>
      <Toggle />
    </div>
  );
};

export default Header;
