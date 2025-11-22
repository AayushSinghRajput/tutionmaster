import  { useState, useEffect } from 'react';
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
  Award
} from 'lucide-react';
import { formatExperience } from '../utils/helpers';

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
    if (teacher.cvUrl) {
      window.open(teacher.cvUrl, '_blank');
    }
  };

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
                  <IndianRupee  className="w-5 h-5 text-gray-400 flex-shrink-0" />
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

            {/* CV Download */}
            {teacher.cvUrl && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional CV</h3>
                <button 
                  onClick={handleDownloadCV}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Download CV</span>
                </button>
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