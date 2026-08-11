const DashboardHeader = ({ username }) => {
  return (
    <div className="mb-6 sm:mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
      <p className="text-base sm:text-lg text-gray-600 break-words">
        Welcome Mr, <span className="font-bold text-base sm:text-lg">{username}</span>{' '}
      </p>
    </div>
  );
};

export default DashboardHeader;