import { useEffect } from "react";
import Games from "../components/Games";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import HowTo from "../components/HowTo";
import LiveFeed from "../components/LiveFeed";
import Slider from "../components/Winners";
import { useAuth } from "../store/authContext";

export default function Home() {
  const { authState, getProvider } = useAuth();
  useEffect(() => {
    getProvider();
  }, []);
  console.log(authState);
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
