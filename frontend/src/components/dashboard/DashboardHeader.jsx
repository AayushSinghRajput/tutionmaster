const DashboardHeader = ({ username }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
      <p className="text-lg text-gray-600">
        Welcome Mr, <span className="font-bold text-lg">{username}</span>{' '}
      </p>
    </div>
  );
};

export default DashboardHeader;