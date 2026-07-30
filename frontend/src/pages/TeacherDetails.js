import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { teacherService } from '../services/teacherService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import TeacherNotFound from '../components/teachers/TeacherNotFound';
import TeacherHeader from '../components/teachers/TeacherHeader';
import AboutSection from '../components/teachers/AboutSection';
import SubjectsSection from '../components/teachers/SubjectsSection';
import QualificationsSection from '../components/teachers/QualificationsSection';
import AvailabilitySection from '../components/teachers/AvailabilitySection';
import CvViewer from '../components/teachers/CvViewer';
import ContactInfoCard from '../components/teachers/ContactInfoCard';
import TeachingDetailsCard from '../components/teachers/TeachingDetailsCard';
import QuickDownloadCard from '../components/teachers/QuickDownloadCard';
import ContactActionsCard from '../components/teachers/ContactActionsCard';

const TeacherDetails = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeacher();
  }, [id]);

  const fetchTeacher = async () => {
    try {
      const response = await teacherService.getTeacherById(id);
      setTeacher(response.data.data);
    } catch (error) {
      setError('Teacher not found');
      console.error('Error fetching teacher:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCV = () => {
    const url = teacher.cvDownloadUrl || teacher.cvUrl;
    if (url) window.open(url, '_blank');
  };

  if (loading) {
    return <LoadingSpinner text="Loading teacher profile..." />;
  }

  if (error || !teacher) {
    return <TeacherNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherHeader teacher={teacher} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AboutSection bio={teacher.bio} />
            <SubjectsSection subjects={teacher.preferredSubjects} />
            <QualificationsSection qualifications={teacher.qualifications} />
            <AvailabilitySection availability={teacher.availability} />
            <CvViewer teacher={teacher} onDownload={handleDownloadCV} />
          </div>

          <div className="space-y-6">
            <ContactInfoCard teacher={teacher} />
            <TeachingDetailsCard teacher={teacher} />
            {teacher.cvDownloadUrl && <QuickDownloadCard onDownload={handleDownloadCV} />}
            <ContactActionsCard teacher={teacher} />
            <Link
              to="/teachers"
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>← Back to All Teachers</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;