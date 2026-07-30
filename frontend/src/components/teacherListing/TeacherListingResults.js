import React from 'react';
import TeacherCard from '../common/TeacherCard';
import Pagination from '../common/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';

const TeacherListingResults = ({
  teachers,
  loading,
  error,
  pagination,
  onPageChange,
  onClearFilters
}) => {
  return (
    <div className="flex-1 min-w-0">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-center text-red-800">
            <svg
              className="w-5 h-5 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
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
              {pagination.totalPages > 1 &&
                ` • Page ${pagination.page} of ${pagination.totalPages}`}
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
            <svg
              className="w-10 h-10 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            No teachers found
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            We couldn't find any teachers matching your criteria. Try
            adjusting your filters or search terms.
          </p>
          <button
            onClick={onClearFilters}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {teachers.map((teacher) => (
              <div
                key={teacher._id}
                className="transform hover:-translate-y-1 transition-transform duration-200"
              >
                <TeacherCard teacher={teacher} />
              </div>
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={onPageChange}
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
  );
};

export default TeacherListingResults;
