import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { teacherService } from '../services/teacherService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { 
  MapPin, 
  Clock, 
  IndianRupee, 
  BookOpen, 
  Download, 
  Star,
  Mail,
  Phone,
  User,
  Award,
  FileText,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RefreshCw
} from 'lucide-react';
import { formatExperience } from '../utils/helpers';

const TeacherDetails = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfError, setPdfError] = useState(false);

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
    if (teacher.cvDownloadUrl) {
      window.open(teacher.cvDownloadUrl, '_blank');
    } else if (teacher.cvUrl) {
      window.open(teacher.cvUrl, '_blank');
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleFullscreen = () => {
    const cvContainer = document.getElementById('cv-container');
    if (!document.fullscreenElement) {
      cvContainer.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleReloadPDF = () => {
    setPdfError(false);
  };

  const handlePdfError = () => {
    setPdfError(true);
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading teacher profile..." />;
  }

  if (error || !teacher) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Teacher Not Found</h1>
            <p className="text-gray-600 mb-6">
              The teacher profile you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/teachers" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Teachers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Teacher Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
            <img 
              src={teacher.avatarUrl || '/default-avatar.png'} 
              alt={teacher.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{teacher.name}</h1>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{teacher.address.city}, {teacher.address.state}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{formatExperience(teacher.experience)} experience</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span>Rs {teacher.hourlyRate}/hour</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span>{teacher.teachingMode}</span>
                </div>
                {teacher.averageRating && (
                  <div className="flex items-center text-yellow-600">
                    <Star className="w-5 h-5 mr-2 fill-current" />
                    <span>{teacher.averageRating} Rating</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About Me</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{teacher.bio}</p>
              </div>
            </section>

            {/* Subjects Section */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Subjects I Teach</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {teacher.preferredSubjects.map((subject, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{subject}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Qualifications Section */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Qualifications & Education</h2>
              <div className="space-y-4">
                {teacher.qualifications.map((qual, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    <Award className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{qual.degree}</h4>
                      <p className="text-gray-600">{qual.institution}</p>
                      <span className="text-sm text-gray-500">{qual.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Availability Section */}
            {teacher.availability && teacher.availability.length > 0 && (
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Availability</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {teacher.availability.map((slot, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">{slot.day}</h4>
                      <div className="space-y-2">
                        {slot.timeSlots.map((timeSlot, timeIndex) => (
                          <div key={timeIndex} className="flex items-center space-x-2 text-gray-700">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{timeSlot.startTime} - {timeSlot.endTime}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CV Display Section */}
            {teacher.cvUrl && (
              <section className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-blue-600" />
                    Professional CV
                  </h2>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1">
                      <button 
                        onClick={handleZoomOut}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-4 h-4 text-gray-700" />
                      </button>
                      <span className="text-sm font-medium text-gray-700">{zoomLevel}%</span>
                      <button 
                        onClick={handleZoomIn}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                    <button 
                      onClick={handleFullscreen}
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors"
                      title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span className="hidden sm:inline">{isFullscreen ? "Exit" : "Fullscreen"}</span>
                    </button>
                    <button 
                      onClick={handleDownloadCV}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                </div>
                
                {/* PDF Viewer Container */}
                <div 
                  id="cv-container"
                  className="border border-gray-300 rounded-xl overflow-hidden bg-gray-100 relative"
                  style={{ 
                    maxWidth: '210mm', // A4 width
                    minHeight: '297mm', // A4 height
                    margin: '0 auto',
                    transform: `scale(${zoomLevel / 100})`,
                    transformOrigin: 'top center'
                  }}
                >
                  {pdfError ? (
                    <div className="w-full h-[297mm] flex flex-col items-center justify-center bg-white">
                      <div className="text-center p-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                          <FileText className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load CV</h3>
                        <p className="text-gray-600 mb-4">
                          There was an issue loading the PDF document.
                        </p>
                        <div className="space-y-3">
                          <button 
                            onClick={handleReloadPDF}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span>Retry Loading</span>
                          </button>
                          <button 
                            onClick={handleDownloadCV}
                            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors mx-auto"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download Instead</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src={teacher.cvUrl}
                      title={`${teacher.name}'s CV`}
                      className="w-full h-full min-h-[297mm] border-0"
                      loading="lazy"
                      onError={handlePdfError}
                    />
                  )}
                </div>

                {/* CV Information */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <div className="font-semibold text-blue-800">Document Format</div>
                        <div className="text-blue-700 text-sm">PDF • High Quality</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <div className="font-semibold text-green-800">Verification Status</div>
                        <div className="text-green-700 text-sm">Admin Verified</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <div className="font-semibold text-purple-800">Viewing Options</div>
                        <div className="text-purple-700 text-sm">Zoom & Fullscreen</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">CV Information</h4>
                      <p className="text-gray-700 text-sm">
                        This document contains the teacher's complete professional profile including detailed qualifications, 
                        teaching methodology, past student success stories, additional certifications, and professional references.
                        All documents are verified by our admin team for authenticity.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 break-all">{teacher.contact.email}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{teacher.contact.phone}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    {teacher.address.street}, {teacher.address.city}, {teacher.address.state} {teacher.address.zipCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Teaching Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Teaching Details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Experience</div>
                    <div className="text-gray-600">{formatExperience(teacher.experience)}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <IndianRupee className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Hourly Rate</div>
                    <div className="text-gray-600">Rs {teacher.hourlyRate}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Teaching Mode</div>
                    <div className="text-gray-600">{teacher.teachingMode}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Download Card */}
            {teacher.cvDownloadUrl && (
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <Download className="w-8 h-8" />
                  <div>
                    <h3 className="text-lg font-semibold">Download CV</h3>
                    <p className="text-blue-100 text-sm">Save for offline reference</p>
                  </div>
                </div>
                <button 
                  onClick={handleDownloadCV}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </button>
                <p className="text-blue-200 text-sm text-center mt-3">
                  High-quality PDF • Secure document
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Get in Touch</h3>
              <p className="text-gray-600 mb-4">Interested in lessons? Contact this teacher directly.</p>
              <div className="space-y-3">
                <a 
                  href={`mailto:${teacher.contact.email}`}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Send Email</span>
                </a>
                <a 
                  href={`tel:${teacher.contact.phone}`}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Back to Listing */}
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