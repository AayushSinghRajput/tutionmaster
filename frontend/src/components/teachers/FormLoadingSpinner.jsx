const FormLoadingSpinner = () => (
  <div className="w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
    <div className="p-10 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading form data...</p>
    </div>
  </div>
);

export default FormLoadingSpinner;
