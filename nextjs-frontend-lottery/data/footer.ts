import { AiFillFacebook, AiOutlineTwitter, AiFillGithub } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";

type MenuItem = {
  text: string;
  url: string;
};
type Contact = {
  icon: React.FC;
  url: string;
};

export const menu: Array<MenuItem> = [
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
    text: "Terms of use",
    url: "/terms-of-use",
  },
  {
    text: "Whitepaper",
    url: "/whitepaper",
  },
];
export const contact: Array<Contact> = [
  {
    icon: AiFillFacebook,
    url: "#",
  },
  {
    icon: AiOutlineTwitter,
    url: "#",
  },
  {
    icon: AiFillGithub,
    url: "#",
  },
  {
    icon: FaTelegramPlane,
    url: "#",
  },
];
