import { useRef, useState } from "react";
import HeroBanner from "../components/section/HeroBanner";
import HowItWorks from "../components/section/HowItWorks";
import Features from "../components/section/Feature";
import CTA from "../components/section/CTA";
import VideoOverlayBanner from "../components/video/VideoOverlayBanner";

const Home = () => {
  const howItWorksRef = useRef(null);
  const [showVideoModal, setShowVideoModal] = useState(true);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen relative">
      {/* Centered Video Overlay Banner */}
      {showVideoModal && (
        <VideoOverlayBanner onClose={() => setShowVideoModal(false)} />
      )}

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
