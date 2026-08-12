import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = '',
  showPageNumbers = true,
  showNavigation = true,
  variant = "default"
}) => {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're at the beginning
      if (currentPage <= 2) {
        end = 4;
      }
      
      // Adjust if we're at the end
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('ellipsis-start');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('ellipsis-end');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const variants = {
    default: {
      active: "bg-gradient-to-r from-brand-600 to-brand-700 border-brand-600 text-white shadow-sm",
      inactive: "border-stone-200 bg-white text-gray-700 hover:bg-brand-50 hover:border-brand-200",
      navigation: "border-stone-200 bg-white text-gray-700 hover:bg-brand-50 hover:border-brand-300",
      text: "text-gray-600"
    },
    light: {
      active: "bg-brand-100 border-brand-300 text-brand-700",
      inactive: "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300",
      navigation: "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300",
      text: "text-gray-500"
    }
  };

  const currentVariant = variants[variant];
  const pageNumbers = generatePageNumbers();

  return (
    <div className={`flex justify-center items-center my-6 sm:my-8 ${className}`}>
      {/* Desktop Pagination */}
      <div className="hidden md:flex flex-col items-center space-y-4">
        {/* Page Info */}
        <div className={`text-sm font-medium ${currentVariant.text}`}>
          Page <span className="font-semibold text-brand-600">{currentPage}</span> of <span className="font-semibold text-gray-700">{totalPages}</span>
        </div>

        {/* Navigation */}
        {showNavigation && (
          <nav className="flex items-center space-x-3" aria-label="Pagination">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center space-x-2 px-5 py-3 border rounded-xl transition-all duration-200 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-sm hover:-translate-y-0.5 ${
                currentVariant.navigation
              } ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:shadow-brand-100'}`}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} className="text-brand-500" />
              <span className="text-brand-700">Previous</span>
            </button>

            {/* Page Numbers */}
            {showPageNumbers && (
              <div className="flex items-center space-x-2">
                {pageNumbers.map((page, index) => {
                  if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                    return (
                      <span 
                        key={`ellipsis-${index}`}
                        className="flex items-center justify-center w-12 h-12 text-gray-400"
                      >
                        <MoreHorizontal size={18} />
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`flex items-center justify-center w-12 h-12 border rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 ${
                        currentPage === page
                          ? `${currentVariant.active} shadow-md transform -translate-y-0.5`
                          : `${currentVariant.inactive} hover:shadow-brand-50`
                      }`}
                      aria-label={`Page ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center space-x-2 px-5 py-3 border rounded-xl transition-all duration-200 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-sm hover:-translate-y-0.5 ${
                currentVariant.navigation
              } ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:shadow-brand-100'}`}
              aria-label="Next page"
            >
              <span className="text-brand-700">Next</span>
              <ChevronRight size={18} className="text-brand-500" />
            </button>
          </nav>
        )}
      </div>

      {/* Mobile Pagination */}
      <div className="flex md:hidden items-center justify-between w-full max-w-xs bg-white p-3 sm:p-4 rounded-2xl border border-stone-200 shadow-sm">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 border-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            currentPage === 1
              ? 'border-gray-200 text-gray-400'
              : 'border-brand-200 text-brand-600 hover:bg-brand-50 hover:border-brand-300 hover:shadow-sm'
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex flex-col items-center px-2">
          <span className="text-gray-600 font-medium text-sm">Page</span>
          <span className="text-brand-600 font-bold text-lg">
            {currentPage} <span className="text-gray-400 font-normal">/ {totalPages}</span>
          </span>
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 border-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            currentPage === totalPages
              ? 'border-gray-200 text-gray-400'
              : 'border-brand-200 text-brand-600 hover:bg-brand-50 hover:border-brand-300 hover:shadow-sm'
          }`}
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;