import { ThemeProvider, useTheme } from "next-themes";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <div className="bg-gray-100 text-slate-800 dark:bg-slate-900  dark:text-white text-xs min-h-screen flex flex-col space-y-5  ">
        <div className="max-w-screen-xl mx-auto w-full flex flex-col space-y-3 ">
          <Header />
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
