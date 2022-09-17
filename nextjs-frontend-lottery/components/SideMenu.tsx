import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
const SideMenu = ({ isOpen, close = (f) => f }) => {
  const _class = isOpen
    ? "absolute bg-slate-900/95 inset-0 z-50 right-0 ease-in-out duration-1000  "
    : "absolute bg-slate-900/95  inset-0 z-50 right-[100%]  duration-200";
  return <div className={_class}></div>;
};

export default SideMenu;
