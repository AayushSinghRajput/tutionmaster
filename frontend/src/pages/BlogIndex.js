import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { blogService } from '../services/blogService';
import Pagination from '../components/common/Pagination';

const BlogCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col h-full animate-pulse">
    <div className="w-full h-48 bg-stone-200" />
    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-4 w-20 bg-stone-200 rounded-full" />
          <div className="h-4 w-24 bg-stone-200 rounded" />
        </div>
        <div className="h-6 w-3/4 bg-stone-200 rounded" />
        <div className="h-4 w-full bg-stone-200 rounded" />
        <div className="h-4 w-2/3 bg-stone-200 rounded" />
      </div>
      <div className="h-4 w-24 bg-stone-200 rounded pt-2" />
    </div>
  </div>
);

const BlogIndex = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get('page'), 10) || 1;

  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: pageParam,
    totalPages: 1,
    totalCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await blogService.getBlogs(pageParam);
        if (isMounted) {
          setBlogs(response.blogs || []);
          setPagination(response.pagination || { currentPage: 1, totalPages: 1, totalCount: 0 });
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load blog posts. Please try again later.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, [pageParam]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <Helmet>
        <title>Educational Insights & Study Tips | TuitionMaster Blog</title>
        <meta
          name="description"
          content="Explore expert teaching insights, study strategies, and educational guidance from TuitionMaster tutors and education specialists."
        />
        <link rel="canonical" href="https://www.tuitionmaster.guru/blog" />
      </Helmet>

      <div className="bg-stone-50 min-h-screen py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-700">
              <BookOpen size={14} />
              TuitionMaster Journal
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
              Insights & Resources for Better Learning
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Discover proven tips, exam strategies, and educational advice curated by top tutors and educators.
            </p>
          </div>

          {/* Grid Layout */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {Array.from({ length: 9 }).map((_, idx) => (
                <BlogCardSkeleton key={idx} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 max-w-lg mx-auto shadow-sm">
              <p className="text-red-600 font-medium mb-4">{error}</p>
              <button
                onClick={() => handlePageChange(1)}
                className="btn-brand-primary text-sm px-4 py-2"
              >
                Reload Posts
              </button>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 p-8 max-w-lg mx-auto shadow-sm">
              <BookOpen size={48} className="mx-auto text-stone-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Blog Posts Found</h3>
              <p className="text-gray-600 text-sm">
                We haven't published any articles yet. Check back soon for exciting updates!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {blogs.map((blog) => (
                  <article
                    key={blog._id}
                    className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden group"
                  >
                    {/* Cover Image */}
                    <Link to={`/blog/${blog.slug}`} className="block relative aspect-video bg-stone-100 overflow-hidden">
                      <img
                        src={blog.coverImage || '/logo.png'}
                        alt={blog.title}
                        loading="lazy"
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                          !blog.coverImage ? 'p-8 opacity-40 object-contain' : ''
                        }`}
                      />
                      {blog.category && (
                        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-brand-700 text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm border border-stone-200/50 flex items-center gap-1">
                          <Tag size={12} />
                          {blog.category}
                        </span>
                      )}
                    </Link>

                    {/* Content Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar size={13} className="text-brand-500" />
                            {formatDate(blog.publishedAt || blog.createdAt)}
                          </span>
                          <span className="flex items-center gap-1 truncate max-w-[120px]">
                            <User size={13} className="text-brand-500" />
                            {blog.author}
                          </span>
                        </div>

                        <h2 className="text-xl font-serif font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                          <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {blog.excerpt || (blog.content ? blog.content.replace(/<[^>]*>?/gm, '').slice(0, 150) + '...' : '')}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-stone-100">
                        <Link
                          to={`/blog/${blog.slug}`}
                          className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-800 gap-1.5 group/btn"
                        >
                          Read More
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
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

export default BlogIndex;
