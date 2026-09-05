import FeaturesList from './FeaturesList';
import TeacherDemoPromo from './TeacherDemoPromo';

const LoginSidebar = () => {
  return (
    <div className="hidden lg:block space-y-8">
      <FeaturesList />
      <TeacherDemoPromo />
    </div>
  );
};

export default LoginSidebar;