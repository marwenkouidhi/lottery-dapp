import Image from "next/image";
import Link from "next/link";
import Toggle from "./Toggle";

const menu = [
  {
    text: "Home",
    url: "/",
  },
  {
    text: "How to play",
    url: "/how-to-play",
  },
  {
    text: "About us",
    url: "/about-us",
  },

  {
    text: "Whitepaper",
    url: "/whitepaper",
  },
];

const Header = () => {
  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex items-center space-x-8  ">
        <div className="flex items-center  space-x-2 text-lg font-semibold  ">
          <Image src="/lottery.png" height={40} width={40} />
          <h1>Dottery</h1>
        </div>

        <div className="flex space-x-5">
          {menu.map(({ text, url }, _) => (
            <Link href={url}>
              <div className="text-md border-solid border-2 border-transparent cursor-pointer">
                {text}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex space-x-3">
        <button className="bg-green-300 dark:bg-green-500 text-md px-4 font-bold  rounded-md flex items-center space-x-1 ">
          <span className="">🔒</span>
          <p>Login</p>
        </button>
        <Toggle />
      </div>
    </div>
  );
};

export default Header;
