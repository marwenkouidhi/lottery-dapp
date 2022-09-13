import React, { useEffect, useState } from "react";
import { MdDarkMode, MdWbSunny } from "react-icons/md";
import { useTheme } from "next-themes";

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

export default Toggle;
