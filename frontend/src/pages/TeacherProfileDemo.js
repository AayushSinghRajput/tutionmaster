import DemoHeroSection from '../components/works/teacherProfileDemo/DemoHeroSection';
import JourneyFlowSection from '../components/works/teacherProfileDemo/JourneyFlowSection';
import VideoTutorialSection from '../components/works/teacherProfileDemo/VideoTutorialSection';
import SignupSection from '../components/works/teacherProfileDemo/SignupSection';
import DashboardSection from '../components/works/teacherProfileDemo/DashboardSection';
import ProfileStepsSection from '../components/works/teacherProfileDemo/ProfileStepsSection';
import ProfileReadySection from '../components/works/teacherProfileDemo/ProfileReadySection';

const TeacherProfileDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-gold-50">
      {/* Page hero */}
      <DemoHeroSection />

      {/* Journey overview bar */}
      <JourneyFlowSection />

      {/* Video Tutorial */}
      <VideoTutorialSection />

      {/* Step 01 — Login / Sign Up */}
      <SignupSection />

      {/* Step 02 — Dashboard */}
      <DashboardSection />

      {/* Step 03 — 4-Step Profile Journey */}
      <ProfileStepsSection />

      {/* Profile Complete */}
      <ProfileReadySection />
    </div>
  );
};

export default TeacherProfileDemo;
