import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, User, Tag, Share2, Check } from 'lucide-react';
import { blogService } from '../services/blogService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchBlog = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await blogService.getBlogBySlug(slug);
        if (isMounted) {
          setBlog(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBlog();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading article..." />;
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-16">
        <div className="text-center bg-white p-8 sm:p-12 rounded-2xl border border-stone-200 max-w-md shadow-sm space-y-6">
          <h2 className="text-3xl font-serif font-bold text-gray-900">404 - Article Not Found</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            The blog post you are looking for might have been moved, unpublished, or removed.
          </p>
          <Link to="/blog" className="btn-brand-primary inline-flex items-center gap-2 text-sm px-5 py-2.5">
            <ArrowLeft size={16} />
            Back to Blog Index
          </Link>
        </div>
      </div>
    );
  }

  const pageTitle = blog.metaTitle || blog.title;
  const pageDescription = blog.metaDescription || blog.excerpt || '';
  const currentUrl = `https://www.tuitionmaster.guru/blog/${blog.slug}`;
  const imageUrl = blog.coverImage || 'https://www.tuitionmaster.guru/logo.png';

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} | TuitionMaster`}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={currentUrl} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="bg-stone-50 min-h-screen py-8 sm:py-12">
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-brand-600 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to all articles
            </Link>
          </div>

          {/* Article Header */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-10 mb-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                {blog.category && (
                  <span className="bg-brand-100 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Tag size={12} />
                    {blog.category}
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
                  <Calendar size={14} className="text-brand-500" />
                  {formatDate(blog.publishedAt || blog.createdAt)}
                </span>
              </div>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-brand-600 bg-stone-100 hover:bg-brand-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                {copied ? <Check size={14} className="text-green-600" /> : <Share2 size={14} />}
                {copied ? 'Link Copied!' : 'Share'}
              </button>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="text-base sm:text-lg text-gray-600 italic leading-relaxed border-l-4 border-brand-500 pl-4 py-1 bg-brand-50/50 rounded-r-lg">
                {blog.excerpt}
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
                {blog.author ? blog.author.charAt(0).toUpperCase() : 'T'}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{blog.author}</p>
                <p className="text-xs text-gray-500">TuitionMaster Contributor</p>
              </div>
            </div>
          </div>

          {/* Cover Image Hero */}
          {blog.coverImage && (
            <div className="mb-10 rounded-3xl overflow-hidden shadow-sm border border-stone-200 aspect-video max-h-[450px] w-full bg-stone-100">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Main Article Body */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-12 mb-12">
            <div
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-sans space-y-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_.lead]:text-lg [&_.lead]:font-medium [&_.lead]:text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-stone-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Tags:</span>
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-stone-100 text-stone-700 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogDetail;
