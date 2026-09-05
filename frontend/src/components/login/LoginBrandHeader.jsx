const LoginBrandHeader = () => {
  return (
    <div className="text-center lg:text-left mb-6 sm:mb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Log in to manage your <span className="text-brand-600">tutor profile</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Update your profile, adjust your subjects and rates, and stay reachable to
          students searching for a tutor like you.
        </p>
      </div>
    </div>
  );
};

export default LoginBrandHeader;