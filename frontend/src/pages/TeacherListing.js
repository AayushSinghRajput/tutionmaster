import React, { useState, useEffect } from 'react';
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Teacher</h1>
          <p className="text-xl text-gray-600">Browse through our qualified and experienced tutors</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <TeacherFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Teachers Grid */}
          <div className="flex-1">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="text-red-800">{error}</div>
              </div>
            )}

            {teachers.length === 0 && !loading ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No teachers found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {teachers.map(teacher => (
                    <TeacherCard key={teacher._id} teacher={teacher} />
                  ))}
                </div>

                {pagination.totalPages > 1 && (
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
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