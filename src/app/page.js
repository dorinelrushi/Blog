import HeroSection from "./compoenents/HeroSection/HeroSection";
import HomeSection from "./compoenents/HomeSection";
import Offers from "./compoenents/Offers/Offers";
import Pricing from "./compoenents/Pricing";
import Projects from "./compoenents/Project";
import WebDev from "./compoenents/WebDev";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <HomeSection />
        <Offers />
        <WebDev />
        <Pricing />
        <Projects />
      </main>
    </>
  );
}
