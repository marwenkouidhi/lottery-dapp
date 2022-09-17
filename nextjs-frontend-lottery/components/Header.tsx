import Image from "next/image";
import Link from "next/link";
import { menu } from "../data/header";
import { useAuth } from "../store/authContext";
import Toggle from "./Toggle";
import { Turn as Hamburger } from "hamburger-react";
import SideMenu from "./SideMenu";

const Header = ({ toggleMenu = (f) => f }) => {
  const {
    login,
    logout,
    authState: { account, balance, isAuthenticated },
  } = useAuth();
  return (
    <div className=" bg-slate-800">
      <div className="flex max-w-screen-xl  flex-wrap justify-between items-center  w-[90%] mx-auto sm:w-full py-2">
        <div className="flex items-center space-x-2  text-white">
          <div className="md:hidden" onClick={toggleMenu}>
            <Hamburger size={27} />
          </div>
          <div className="flex  items-center space-x-2 text-lg font-semibold  ">
            <Image src="/lottery.png" height={40} width={40} />
            <h1>Dottery</h1>
          </div>

          <div className="hidden md:flex space-x-5 ">
            {menu.map(({ text, url }, _) => (
              <Link key={_} href={url}>
                <div className="text-md border-solid border-2 border-transparent cursor-pointer">
                  {text}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex space-x-3 justify-end grow">
          {isAuthenticated && (
            <>
              <button
                className="bg-yellow-200 dark:bg-yellow-400 text-md px-4 font-bold  rounded-md hidden md:flex items-center space-x-1 "
                onClick={login}
                title={account}
              >
                <span className="">👤</span>
                <p>{`${account.substring(0, 5)}...${account.substring(
                  account.length - 4
                )}`}</p>
              </button>
              <button
                title={balance}
                className="bg-red-200 dark:bg-red-400 text-md px-4 font-bold  rounded-md hidden md:flex items-center space-x-1 "
              >
                <span className="">💵</span>
                <p>Balance: </p>
                <p>{balance.substring(0, 5)}</p>
              </button>
            </>
          )}

          {isAuthenticated ? (
            <button
              className="bg-green-200 dark:bg-green-400 text-md px-4 font-bold  rounded-md flex items-center space-x-1 "
              onClick={logout}
            >
              <span className="">🔒</span>
              <p>Logout</p>
            </button>
          ) : (
            <button
              className="bg-green-300 dark:bg-green-400 text-md px-4 font-bold  rounded-md flex items-center space-x-1 "
              onClick={login}
            >
              <span className="">🔒</span>
              <p>Login</p>
            </button>
          )}
          <Toggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
