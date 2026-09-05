import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, useLocation } from "react-router-dom";
import SEO from "../components/seo/SEO";
import { teacherService } from "../services/teacherService";
import {
  TeacherFilterSidebar,
  TeacherListingResults,
  TeacherListingSkeleton,
} from "../components/teacherListing";
import {
  getCachedTeachers,
  setCachedTeachers,
} from "../utils/seo/teacherCache";

const TeacherListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    subjects: searchParams.get("subjects")
      ? searchParams.get("subjects").split(",").filter(Boolean)
      : [],
    teachingMode: searchParams.get("teachingMode") || "",
    minExperience: "",
    maxExperience: "",
    minRate: "",
    maxRate: "",
    location: searchParams.get("city") || "",
  });
  const [pagination, setPagination] = useState({
    page: parseInt(searchParams.get("page")) || 1,
    totalPages: 1,
    total: 0,
  });

  useEffect(() => {
    fetchTeachers();
  }, [filters, pagination.page]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);

      const params = {
        page: pagination.page,
        limit: 9,
      };

      if (filters.subjects.length > 0) {
        params.subjects = filters.subjects.join(",");
      }

      if (filters.teachingMode) {
        params.teachingMode = filters.teachingMode;
      }

      if (filters.minExperience) {
        params.minExperience = parseInt(filters.minExperience);
      }

      if (filters.maxExperience) {
        params.maxExperience = parseInt(filters.maxExperience);
      }

      if (filters.minRate) {
        params.minRate = parseInt(filters.minRate);
      }

      if (filters.maxRate) {
        params.maxRate = parseInt(filters.maxRate);
      }

      if (filters.location) {
        params.city = filters.location;
      }

      Object.keys(params).forEach((key) => {
        if (
          params[key] === "" ||
          params[key] === null ||
          params[key] === undefined ||
          params[key] === 0 ||
          (Array.isArray(params[key]) && params[key].length === 0)
        ) {
          delete params[key];
        }
      });

      //Check frontend cache first
      const cachedResponse = getCachedTeachers(params);

      if (cachedResponse) {
        const { data, pagination: paginationData } = cachedResponse;
        setTeachers(data);
        setPagination((prev) => ({
          ...prev,
          totalPages: paginationData.pages,
          total: paginationData.total,
        }));
        setLoading(false);
        return;
      }

      //No cache found
      setLoading(true);

      const response = await teacherService.getAllTeachers(params);
      const { data, pagination: paginationData } = response.data;
      //Save successful response to cache
      setCachedTeachers(params, {
        data,
        pagination: paginationData,
      });
      setTeachers(data);
      setPagination((prev) => ({
        ...prev,
        totalPages: paginationData.pages,
        total: paginationData.total,
      }));
    } catch (error) {
      console.error("Error fetching teachers:", error.response || error);
      setError("Failed to load teachers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleClearFilters = () => {
    setFilters({
      subjects: [],
      teachingMode: "",
      minExperience: "",
      maxExperience: "",
      minRate: "",
      maxRate: "",
      location: "",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    setSearchParams(prev => {
      prev.set("page", newPage);
      return prev;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && teachers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-gold-50 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TeacherListingSkeleton />
        </div>
      </div>
    );
  }

  const getPageUrl = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber);
    return `${location.pathname}?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-gold-50 py-6 sm:py-8">
      <SEO 
        title="Find Qualified Tutors | TuitionMaster"
        description="Search our directory of qualified tutors in Nepal. Filter by subject, experience, mode of teaching, and hourly rate to find your perfect match."
        canonicalUrl="https://www.tuitionmaster.guru/teachers"
      />
      <Helmet>
        {pagination.page > 1 && (
          <link rel="prev" href={getPageUrl(pagination.page - 1)} />
        )}
        {pagination.page < pagination.totalPages && (
          <link rel="next" href={getPageUrl(pagination.page + 1)} />
        )}
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <TeacherFilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
          <TeacherListingResults
            teachers={teachers}
            loading={loading}
            error={error}
            pagination={pagination}
            onPageChange={handlePageChange}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherListing;
