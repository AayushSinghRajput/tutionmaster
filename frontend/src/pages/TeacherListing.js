import  { useState, useEffect } from 'react';
import { teacherService } from '../services/teacherService';
import TeacherCard from '../components/common/TeacherCard';
import TeacherFilters from '../components/teachers/TeacherFilters';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';

const TeacherListing = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    subjects: [],
    teachingMode: '',
    minExperience: '',
    maxExperience: '',
    minRate: '',
    maxRate: '',
    location: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0
  });

  useEffect(() => {
    fetchTeachers();
  }, [filters, pagination.page]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: 12,
        ...filters
      };

      // Clean up empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });

      const response = await teacherService.getAllTeachers(params);
      const { data, pagination: paginationData } = response.data;
      
      setTeachers(data);
      setPagination(prev => ({
        ...prev,
        totalPages: paginationData.pages,
        total: paginationData.total
      }));
    } catch (error) {
      setError('Failed to load teachers');
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleClearFilters = () => {
    setFilters({
      subjects: [],
      teachingMode: '',
      minExperience: '',
      maxExperience: '',
      minRate: '',
      maxRate: '',
      location: ''
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && teachers.length === 0) {
    return <LoadingSpinner text="Loading teachers..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l-9 5m9-5v9" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Discover Expert Educators
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connect with qualified tutors who inspire and transform learning experiences
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="border-r border-blue-100 last:border-r-0 pr-6 last:pr-0">
              <div className="text-2xl font-bold text-blue-600">{pagination.total}+</div>
              <div className="text-sm text-gray-600 font-medium">Qualified Teachers</div>
            </div>
            <div className="border-r border-blue-100 last:border-r-0 pr-6 last:pr-0">
              <div className="text-2xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600 font-medium">Subjects Covered</div>
            </div>
            <div className="border-r border-blue-100 last:border-r-0 pr-6 last:pr-0">
              <div className="text-2xl font-bold text-blue-600">10k+</div>
              <div className="text-sm text-gray-600 font-medium">Students Taught</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">4.9/5</div>
              <div className="text-sm text-gray-600 font-medium">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <SearchBar />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-70 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                    </svg>
                    Filter Teachers
                  </h2>
                  <button
                    onClick={handleClearFilters}
                    className="text-blue-100 hover:text-white text-sm font-medium transition-colors duration-200"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <TeacherFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 shadow-sm">
                <div className="flex items-center text-red-800">
                  <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Results Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Available Teachers
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Showing {teachers.length} of {pagination.total} results
                    {pagination.totalPages > 1 && ` • Page ${pagination.page} of ${pagination.totalPages}`}
                  </p>
                </div>
                <div className="mt-3 sm:mt-0">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                    <span className="text-sm font-medium text-blue-700">
                      {pagination.total} Total
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {teachers.length === 0 && !loading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-12 text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">No teachers found</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  We couldn't find any teachers matching your criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {teachers.map(teacher => (
                    <div key={teacher._id} className="transform hover:-translate-y-1 transition-transform duration-200">
                      <TeacherCard teacher={teacher} />
                    </div>
                  ))}
                </div>

                {pagination.totalPages > 1 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                    <Pagination
                      currentPage={pagination.page}
                      totalPages={pagination.totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}

            {loading && teachers.length > 0 && (
              <div className="flex justify-center py-8">
                <LoadingSpinner text="Loading more teachers..." />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherListing;