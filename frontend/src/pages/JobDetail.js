import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MapPin, BookOpen, GraduationCap, Banknote, Clock, PhoneCall, CheckCircle2, ShieldAlert } from 'lucide-react';
import { jobService } from '../services/jobService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const JobDetail = () => {
  const { slug } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchJob = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await jobService.getJobBySlug(slug);
        if (isMounted) {
          setJob(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchJob();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading tuition details..." />;
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-16">
        <div className="text-center bg-white p-8 sm:p-12 rounded-2xl border border-stone-200 max-w-md shadow-sm space-y-6">
          <h2 className="text-3xl font-serif font-bold text-gray-900">404 - Job Not Found</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            The tuition vacancy you are looking for might have been filled, closed, or removed.
          </p>
          <Link to="/jobs" className="btn-brand-primary inline-flex items-center gap-2 text-sm px-5 py-2.5">
            <ArrowLeft size={16} />
            Back to All Vacancies
          </Link>
        </div>
      </div>
    );
  }

  const subjects = Array.isArray(job.subject) ? job.subject.join(', ') : job.subject;

  return (
    <>
      <Helmet>
        <title>{`${job.title} | TuitionMaster Jobs`}</title>
        <meta
          name="description"
          content={`Apply for ${job.title} in ${job.location}. Grade: ${job.gradeLevel}, Salary: ${job.salary}.`}
        />
        <link rel="canonical" href={`https://www.tuitionmaster.guru/jobs/${job.slug}`} />
      </Helmet>

      <div className="bg-stone-50 min-h-screen py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Back Navigation */}
          <div>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-brand-600 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to All Vacancies
            </Link>
          </div>

          {/* Job Header Card */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    job.status === 'Urgent'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-green-100 text-green-700 border border-green-200'
                  }`}
                >
                  {job.status || 'Open'}
                </span>
                <span className="bg-brand-100 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {job.jobType}
                </span>
              </div>
              <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                <Clock size={14} className="text-gray-400" />
                Posted {new Date(job.publishedAt || job.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
              {job.title}
            </h1>

            {/* Specs Grid Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                <span className="text-xs text-gray-500 block mb-1">Location</span>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                  <MapPin size={16} className="text-brand-500 shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                <span className="text-xs text-gray-500 block mb-1">Subject</span>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                  <BookOpen size={16} className="text-brand-500 shrink-0" />
                  <span className="truncate">{subjects}</span>
                </div>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                <span className="text-xs text-gray-500 block mb-1">Grade Level</span>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                  <GraduationCap size={16} className="text-brand-500 shrink-0" />
                  <span className="truncate">{job.gradeLevel}</span>
                </div>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                <span className="text-xs text-gray-500 block mb-1">Remuneration</span>
                <div className="flex items-center gap-1.5 text-sm font-bold text-brand-700">
                  <Banknote size={16} className="text-brand-500 shrink-0" />
                  <span className="truncate">{job.salary}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Job Details Card */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-10 space-y-8">
            {/* Schedule */}
            {job.schedule && (
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Clock size={18} className="text-brand-600" />
                  Timing & Schedule
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-100">
                  {job.schedule}
                </p>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && (
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-brand-600" />
                  Tutor Requirements
                </h3>
                <div className="text-gray-700 text-sm leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-100 whitespace-pre-line">
                  {job.requirements}
                </div>
              </div>
            )}

            {/* Full Description */}
            {job.description && (
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900">Job Description</h3>
                <div
                  className="prose prose-sm max-w-none text-gray-700 leading-relaxed font-sans space-y-3"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </div>
            )}

            {/* Protected Contact & Application Box */}
            <div className="bg-gradient-to-br from-brand-600 to-brand-800 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-brand-200 text-xs font-bold uppercase tracking-wider">
                <PhoneCall size={16} />
                Application Instructions & Direct Contact
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">How to Apply for this Tuition</h3>
              <p className="text-brand-100 text-sm leading-relaxed whitespace-pre-line">
                {job.contactInstructions || 'Please contact TuitionMaster support at +977 980-598-1168 or email hello.tuitionmaster@gmail.com with your profile ID to express interest in this vacancy.'}
              </p>
              <div className="pt-2">
                <a
                  href="tel:+9779805981168"
                  className="inline-flex items-center gap-2 bg-white text-brand-800 font-bold px-6 py-3 rounded-xl text-sm shadow hover:bg-stone-100 transition-colors"
                >
                  <PhoneCall size={16} />
                  Call Support Coordinator
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetail;
