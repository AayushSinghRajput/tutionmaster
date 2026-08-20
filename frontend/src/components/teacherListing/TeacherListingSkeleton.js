const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse rounded bg-gray-200 ${className}`}
      aria-hidden="true"
    />
  );
};

const TeacherCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
      <div className="flex items-start gap-4">
        {/* Profile image */}
        <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex-shrink-0" />

        <div className="flex-1 min-w-0">
          {/* Name */}
          <Skeleton className="h-5 w-36 mb-2" />

          {/* Subject */}
          <Skeleton className="h-4 w-28 mb-2" />

          {/* Location */}
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* Description */}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>

      {/* Bottom information */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
    </div>
  );
};

const FilterSidebarSkeleton = () => {
  return (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <Skeleton className="h-6 w-24 mb-6" />

        {/* Filter sections */}
        {[1, 2, 3, 4].map((section) => (
          <div key={section} className="mb-6">
            <Skeleton className="h-4 w-28 mb-4" />

            <div className="space-y-3">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

const TeacherListingSkeleton = () => {
  return (
    <div
      className="flex flex-col lg:flex-row gap-6 lg:gap-8"
      aria-label="Loading teachers"
      aria-busy="true"
    >
      <FilterSidebarSkeleton />

      <div className="flex-1">
        {/* Results heading */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>

        {/* Teacher cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <TeacherCardSkeleton key={index} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="w-10 h-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default TeacherListingSkeleton;
