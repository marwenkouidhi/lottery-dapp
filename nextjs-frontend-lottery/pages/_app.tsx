import { ThemeProvider, useTheme } from "next-themes";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <div className="max-w-screen-xl mx-auto">
        <Header />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
