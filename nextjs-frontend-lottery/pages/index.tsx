import { useEffect } from "react";
import Games from "../components/Games";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import HowTo from "../components/HowTo";
import LiveFeed from "../components/LiveFeed";
import Slider from "../components/Winners";

export default function Home() {
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    }
  }, []);
  return (
    <div className="grid gap-5">
      <Slider />
      <HeroSection />
      <LiveFeed />
      <Games />
      <HowTo />
    </div>
  );
}
