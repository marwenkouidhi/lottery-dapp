import { ThemeProvider, useTheme } from "next-themes";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GlobalProvider from "../store/globalContext";
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <GlobalProvider>
        <div className=" mx-auto bg-gray-100 text-slate-800 dark:bg-slate-900  dark:text-white text-xs min-h-screen flex flex-col space-y-5 ">
          <div className="max-w-screen-xl mx-auto flex flex-col space-y-3">
            <Header />
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default MyApp;
