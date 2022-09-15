import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillFacebook, AiOutlineTwitter, AiFillGithub } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { contact, menu } from "../data/footer";

const Footer = () => {
  return (
    <div className="bg-gray-200 dark:bg-slate-800 grow  ">
      <div className="max-w-screen-xl mx-auto py-5 grid gap-3 divide-y-2 divide-gray-400 dark:divide-slate-700 ">
        <div className=" grid md:grid-cols-3 gap-4">
          <div className="flex items-center  space-x-2 text-lg font-semibold ">
            <Image src="/lottery.png" height={30} width={30} />
            <h1>Dottery</h1>
          </div>
          <div className="grid  md:grid-cols-5 justify-items-center">
            {menu.map(({ text, url }, _) => (
              <Link href={url} key={_}>
                <div className="text-md border-solid border-2 border-transparent hover:border-b-white cursor-pointer">
                  {text}
                </div>
              </Link>
            ))}
          </div>
          <div className="flex space-x-1 justify-center">
            {contact.map(({ icon: Icon, url }, _) => (
              <div className="p-2 bg-gray-300 dark:bg-slate-700 rounded-full hover:brightness-95 dark:hover:brightness-125 cursor-pointer">
                <Icon size={20} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <p>© Dlottery, 2022</p>
          <p>Cretaed by Kouidhi Marwen, design inspired by Flatstudio</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
