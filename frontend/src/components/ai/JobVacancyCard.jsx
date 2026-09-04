import { MapPin, Briefcase, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const JobVacancyCard = ({ job }) => {
  if (!job) return null;

  // Format salary to fit nicely inside cards
  const displaySalary = job.salary
    ? job.salary.length > 16
      ? job.salary.slice(0, 14) + "..."
      : job.salary
    : "Negotiable";

  return (
    <div className="bg-white border border-stone-200 hover:border-brand-300 rounded-2xl p-3.5 shadow-sm hover:shadow-md transition-all space-y-2.5 text-xs sm:text-sm my-2 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 min-w-0">
        <div className="min-w-0 flex-1">
          <span className="inline-block px-2 py-0.5 bg-brand-50 text-brand-700 font-medium text-[10px] rounded-md border border-brand-200 mb-1">
            {job.jobType || "Home Tuition"}
          </span>
          <h4 className="font-bold text-gray-900 text-xs sm:text-sm group-hover:text-brand-700 transition-colors line-clamp-2 break-words">
            {job.title}
          </h4>
        </div>
        <span
          className="font-bold text-brand-700 bg-brand-50 px-2 py-1 rounded-lg text-[11px] shrink-0 max-w-[110px] truncate"
          title={job.salary}
        >
          Rs {displaySalary}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
        <div className="flex items-center gap-1 min-w-0">
          <MapPin size={12} className="text-brand-600 shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        {job.gradeLevel && (
          <div className="flex items-center gap-1 shrink-0">
            <Briefcase size={12} className="text-brand-600 shrink-0" />
            <span>Grade: {job.gradeLevel}</span>
          </div>
        )}
      </div>

      {/* Subjects Tag */}
      {job.subject && job.subject.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-0.5">
          {job.subject.slice(0, 3).map((sub, i) => (
            <span key={i} className="px-2 py-0.5 bg-stone-100 text-stone-700 text-[10px] rounded-md font-medium truncate max-w-[100px]">
              {sub}
            </span>
          ))}
          {job.subject.length > 3 && (
            <span className="text-[10px] text-gray-400 font-medium align-self-center">
              +{job.subject.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* CTA link */}
      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
        <span className="text-gray-400 text-[10px]">Tuition Vacancy</span>
        <Link
          to={`/jobs/${job.slug || job._id}`}
          className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-800 hover:underline text-xs"
        >
          <span>View Vacancy</span>
          <ChevronRight size={13} />
        </Link>
      </div>
    </div>
  );
};

export default JobVacancyCard;
