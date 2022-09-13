import Games from "../components/Games";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Winners from "../components/Winners";

export default function Home() {
  return (
    <div className=" grid gap-5">
      {/* <HeroSection /> */}
      <Winners />
      <Games />
    </div>
  );
}
