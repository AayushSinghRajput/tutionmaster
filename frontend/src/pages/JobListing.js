import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, BookOpen, GraduationCap, Banknote, Clock, Search, Briefcase, ChevronRight, Filter } from 'lucide-react';
import { jobService } from '../services/jobService';
import Pagination from '../components/common/Pagination';

const JobCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 flex flex-col justify-between h-full animate-pulse space-y-4">
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="h-5 w-20 bg-stone-200 rounded-full" />
        <div className="h-5 w-24 bg-stone-200 rounded-md" />
      </div>
      <div className="h-6 w-3/4 bg-stone-200 rounded" />
      <div className="space-y-2 pt-2">
        <div className="h-4 w-full bg-stone-200 rounded" />
        <div className="h-4 w-5/6 bg-stone-200 rounded" />
        <div className="h-4 w-2/3 bg-stone-200 rounded" />
      </div>
    </div>
    <div className="h-10 w-full bg-stone-200 rounded-xl pt-4" />
  </div>
);

const JobListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get('page'), 10) || 1;
  const searchParam = searchParams.get('search') || '';
  const typeParam = searchParams.get('jobType') || '';

  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: pageParam,
    totalPages: 1,
    totalCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchInput, setSearchInput] = useState(searchParam);
  const [typeInput, setTypeInput] = useState(typeParam);

  useEffect(() => {
    let isMounted = true;
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await jobService.getJobs(pageParam, searchParam, typeParam);
        if (isMounted) {
          setJobs(response.jobs || []);
          setPagination(response.pagination || { currentPage: 1, totalPages: 1, totalCount: 0 });
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load tuition jobs. Please try again later.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchJobs();
    return () => {
      isMounted = false;
    };
  }, [pageParam, searchParam, typeParam]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (searchInput) params.search = searchInput;
    if (typeInput) params.jobType = typeInput;
    params.page = 1;
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (newPage) => {
    const params = {};
    if (searchParam) params.search = searchParam;
    if (typeParam) params.jobType = typeParam;
    params.page = newPage;
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    const diff = Math.floor((new Date() - new Date(dateStr)) / (1000 * 60 * 60));
    if (diff < 1) return 'Posted just now';
    if (diff < 24) return `Posted ${diff} hours ago`;
    const days = Math.floor(diff / 24);
    if (days === 1) return 'Posted yesterday';
    if (days < 7) return `Posted ${days} days ago`;
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <>
      <Helmet>
        <title>Tuition Jobs & Vacancies in Nepal | TuitionMaster</title>
        <meta
          name="description"
          content="Browse active home tuition, online, and coaching vacancies across Nepal. Apply directly with TuitionMaster to connect with students and parents."
        />
        <link rel="canonical" href="https://www.tuitionmaster.guru/jobs" />
      </Helmet>

      <div className="bg-stone-50 min-h-screen py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-700">
              <Briefcase size={14} />
              Tutor Job Board
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
              Explore Active Tuition Vacancies
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Find rewarding home tuition and online teaching opportunities near you. Log in to view full contact details and apply directly.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 shadow-sm mb-10">
            <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative sm:col-span-1">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, subject, or area..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="relative sm:col-span-1">
                <Filter size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={typeInput}
                  onChange={(e) => setTypeInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none"
                >
                  <option value="">All Job Types</option>
                  <option value="Home Tuition">Home Tuition</option>
                  <option value="Online">Online Tuition</option>
                  <option value="Institute">Institute / Coaching</option>
                </select>
              </div>

              <div className="sm:col-span-1">
                <button
                  type="submit"
                  className="w-full btn-brand-primary py-2.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
                >
                  <Search size={16} />
                  Filter Vacancies
                </button>
              </div>
            </form>
          </div>

          {/* Responsive 9-Card Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {Array.from({ length: 9 }).map((_, idx) => (
                <JobCardSkeleton key={idx} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 max-w-lg mx-auto shadow-sm">
              <p className="text-red-600 font-medium mb-4">{error}</p>
              <button
                onClick={() => handlePageChange(1)}
                className="btn-brand-primary text-sm px-4 py-2"
              >
                Reload Jobs
              </button>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 p-8 max-w-lg mx-auto shadow-sm">
              <Briefcase size={48} className="mx-auto text-stone-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Tutor Vacancies Available</h3>
              <p className="text-gray-600 text-sm">
                We couldn't find any active job postings matching your filter criteria. Check back soon!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between h-full group"
                  >
                    <div className="space-y-4">
                      {/* Status & Mode Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                            job.status === 'Urgent'
                              ? 'bg-red-100 text-red-700 border border-red-200'
                              : 'bg-green-100 text-green-700 border border-green-200'
                          }`}
                        >
                          {job.status || 'Open'}
                        </span>
                        <span className="bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-stone-200">
                          {job.jobType}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-serif font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                        <Link to={`/jobs/${job.slug}`}>{job.title}</Link>
                      </h2>

                      {/* Key Highlights / Pills */}
                      <div className="space-y-2.5 text-xs text-gray-600 pt-1">
                        <div className="flex items-center gap-2">
                          <MapPin size={15} className="text-brand-500 shrink-0" />
                          <span className="truncate font-medium">{job.location}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <BookOpen size={15} className="text-brand-500 shrink-0" />
                          <span className="truncate font-medium">
                            {Array.isArray(job.subject) ? job.subject.join(', ') : job.subject}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <GraduationCap size={15} className="text-brand-500 shrink-0" />
                          <span className="truncate font-medium">{job.gradeLevel}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Banknote size={15} className="text-brand-500 shrink-0" />
                          <span className="font-semibold text-brand-700">{job.salary}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock size={15} className="text-gray-400 shrink-0" />
                          <span className="text-gray-500">{formatDate(job.publishedAt || job.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-5 mt-4 border-t border-stone-100">
                      <Link
                        to={`/jobs/${job.slug}`}
                        className="w-full btn-brand-primary py-2.5 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 group/btn"
                      >
                        View Details & Apply
                        <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default JobListing;
