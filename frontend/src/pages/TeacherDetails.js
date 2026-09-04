import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { teacherService } from "../services/teacherService";
import LoadingSpinner from "../components/common/LoadingSpinner";
import TeacherNotFound from "../components/teachers/TeacherNotFound";
import TeacherHeader from "../components/teachers/TeacherHeader";
import AboutSection from "../components/teachers/AboutSection";
import SubjectsSection from "../components/teachers/SubjectsSection";
import QualificationsSection from "../components/teachers/QualificationsSection";
import AvailabilitySection from "../components/teachers/AvailabilitySection";
import CvViewer from "../components/teachers/CvViewer";
import ContactInfoCard from "../components/teachers/ContactInfoCard";
import TeachingDetailsCard from "../components/teachers/TeachingDetailsCard";
import QuickDownloadCard from "../components/teachers/QuickDownloadCard";
import ContactActionsCard from "../components/teachers/ContactActionCard";
import TeacherSEO from "../components/seo/TeacherSEO";
import RatingsAndReviewsSection from "../components/teachers/RatingsAndReviewsSection";
import { useAuth } from "../context/AuthContext";
import { Lock } from "lucide-react";

const TeacherDetails = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchTeacher();
  }, [id]);

  const fetchTeacher = async () => {
    try {
      const response = await teacherService.getTeacherById(id);
      setTeacher(response.data.data);
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Teacher not found";
      setError(errorMsg);
      console.error("Error fetching teacher:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCV = () => {
    const url = teacher.cvDownloadUrl || teacher.cvUrl;
    if (url) window.open(url, "_blank");
  };

  if (loading) {
    return <LoadingSpinner text="Loading teacher profile..." />;
  }

  if (error || !teacher) {
    return <TeacherNotFound customMessage={error} />;
  }

  return (
    <>
      <TeacherSEO teacher={teacher} teacherId={id} />
      <div className="min-h-screen bg-stone-50 pb-20 md:pb-0">
        <TeacherHeader teacher={teacher} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <AboutSection bio={teacher.bio} />
              
              {/* Mobile-only: rendered below About section */}
              <div className="lg:hidden space-y-6 sm:space-y-8">
                <ContactInfoCard teacher={teacher} />
                <TeachingDetailsCard teacher={teacher} />
              </div>

              <SubjectsSection subjects={teacher.preferredSubjects} />
              <QualificationsSection qualifications={teacher.qualifications} />
              <AvailabilitySection availability={teacher.availability} />
              <RatingsAndReviewsSection teacher={teacher} />
              {teacher.cvUrl && (
                <CvViewer teacher={teacher} onDownload={handleDownloadCV} />
              )}
            </div>

            <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Desktop-only: rendered in the right sidebar */}
              <div className="hidden lg:block space-y-4 sm:space-y-6">
                <ContactInfoCard teacher={teacher} />
                <TeachingDetailsCard teacher={teacher} />
              </div>

              {teacher.cvDownloadUrl && (
                <QuickDownloadCard onDownload={handleDownloadCV} />
              )}
              <ContactActionsCard teacher={teacher} />
              <Link to="/teachers" className="btn-brand-ghost w-full">
                <span>← Back to All Teachers</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile-only sticky contact bar: keeps the primary CTA reachable without
          scrolling through the whole profile on small screens. */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 shadow-[0_-2px_12px_rgba(0,0,0,0.08)] px-4 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[11px] text-gray-500 leading-none">Monthly Fee</div>
              <div className="text-sm font-bold text-brand-700 truncate">
                Rs {(teacher.monthlyRate || (teacher.hourlyRate ? teacher.hourlyRate * 20 : 0)).toLocaleString()}/mo
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={isAuthenticated ? `mailto:${teacher.contact.email}` : '#'}
                className="btn-brand-outline px-3 py-2 text-xs"
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    navigate('/login', { state: { from: location } });
                  }
                }}
              >
                {!isAuthenticated ? <Lock size={14} /> : <Mail size={14} />}
                <span>Message</span>
              </a>
              <a
                href={isAuthenticated ? `tel:${teacher.contact.phone}` : '#'}
                className="btn-brand-primary px-3 py-2 text-xs"
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    navigate('/login', { state: { from: location } });
                  }
                }}
              >
                {!isAuthenticated ? <Lock size={14} /> : <Phone size={14} />}
                <span>Call</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherDetails;
