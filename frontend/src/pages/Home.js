import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import HeroBanner from "../components/section/HeroBanner";
import QuickSearch from "../components/section/QuickSearch";
import TutorDiscoveryPreview from "../components/section/TutorDiscoveryPreview";
import LearningPrograms from "../components/section/LearningPrograms";
import StudentValueProp from "../components/section/StudentValueProp";
import TutorValueProp from "../components/section/TutorValueProp";
import HowItWorks from "../components/section/HowItWorks";
import Features from "../components/section/Feature";
import TrustSection from "../components/section/TrustSection";
import CTA from "../components/section/CTA";
import VideoOverlayBanner from "../components/video/VideoOverlayBanner";

const Home = () => {
  const howItWorksRef = useRef(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hasSeenVideo = localStorage.getItem("hasSeenVideoTutorial");
    if (!hasSeenVideo) {
      setShowVideoModal(true);
    }
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    // Re-run after mount: sections above the target (e.g. an async tutor
    // preview that collapses once it resolves) can still shift layout
    // shortly after the first paint, throwing off a single early scroll.
    const raf = requestAnimationFrame(scrollToTarget);
    const settleTimeout = setTimeout(scrollToTarget, 500);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settleTimeout);
    };
  }, [location.hash]);

  const handleCloseVideo = () => {
    setShowVideoModal(false);
    localStorage.setItem("hasSeenVideoTutorial", "true");
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TuitionMaster",
    "url": "https://www.tuitionmaster.guru/",
    "logo": "https://www.tuitionmaster.guru/logo.png",
    "description": "Find qualified tutors across Nepal with TuitionMaster. Connect with subject-matched teachers for school, +2, entrance preparation, and more.",
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61577776648214"
    ]
  };

  return (
    <div className="min-h-screen relative">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      {/* Centered Video Overlay Banner */}
      {showVideoModal && (
        <VideoOverlayBanner onClose={handleCloseVideo} />
      )}

      {/* Hero Banner Section */}
      <HeroBanner />

      {/* Quick Search Section */}
      <QuickSearch />

      {/* Tutor Discovery Preview */}
      <TutorDiscoveryPreview />

      {/* Learning Programs Section */}
      <LearningPrograms />

      {/* Student Value Proposition */}
      <StudentValueProp />

      {/* Tutor Value Proposition */}
      <TutorValueProp />

      {/* How It Works Section */}
      <HowItWorks howItWorksRef={howItWorksRef} />

      {/* Why TuitionMaster Section */}
      <Features />

      {/* Trust Section */}
      <TrustSection />

      {/* Final CTA Section */}
      <CTA />
    </div>
  );
};

export default Home;
