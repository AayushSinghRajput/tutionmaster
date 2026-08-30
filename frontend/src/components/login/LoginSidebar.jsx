import StatsGrid from './StatsGrid';
import FeaturesList from './FeaturesList';
import TeacherDemoPromo from './TeacherDemoPromo';
import { STATS } from '../../constants/login/loginPageData';

const LoginSidebar = () => {
  return (
    <div className="hidden lg:block space-y-8">
      <StatsGrid stats={STATS} />
      <FeaturesList />
      <TeacherDemoPromo />
    </div>
  );
};

export default LoginSidebar;