import { ThemeProvider, useTheme } from "next-themes";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GlobalProvider from "../store/globalContext";
import { useAuth } from "../store/authContext";
import { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import { slide as Menu } from "react-burger-menu";

function MyApp({ Component, pageProps }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <ThemeProvider attribute="class">
      <GlobalProvider>
        <div className=" mx-auto bg-white text-slate-800 dark:bg-slate-900  dark:text-white text-xs min-h-screen flex flex-col space-y-5 ">
          <div className=" flex flex-col space-y-4">
            <Header toggleMenu={toggle} />
            <div className="relative max-w-screen-xl mx-auto">
              <SideMenu isOpen={isOpen} close={toggle} />
              <Component {...pageProps} />
            </div>
          </div>
          <Footer />
        </div>
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default MyApp;
