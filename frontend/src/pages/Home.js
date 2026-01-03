import { useRef } from "react";
import HeroBanner from "../components/section/HeroBanner";
import HowItWorks from "../components/section/HowItWorks";
import Features from "../components/section/Feature";
import CTA from "../components/section/CTA";

const Home = () => {
  const howItWorksRef = useRef(null);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <HeroBanner scrollToHowItWorks={scrollToHowItWorks} />

      {/* How It Works Section */}
      <HowItWorks howItWorksRef={howItWorksRef} />

      {/* Features Section */}
      <Features />

      {/* CTA Section */}
      <CTA />
    </div>
  );
};

export default Home;
