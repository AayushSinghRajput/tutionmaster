import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { teacherService } from '../services/adminServices';
import {
  NEPAL_STATES,
  INITIAL_AVAILABILITY,
} from '../constants';
import UserAccountStep from '../components/manual-tutor/UserAccountStep';
import AddressStep from '../components/manual-tutor/AddressStep';
import QualificationsStep from '../components/manual-tutor/QualificationsStep';
import PreferencesStep from '../components/manual-tutor/PreferencesStep';
import {
  UserPlus,
  ArrowLeft,
} from 'lucide-react';

export default function ManualTutorCreationPage() {
  const navigate = useNavigate();
  const [unonboardedUsers, setUnonboardedUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isCustomCity, setIsCustomCity] = useState(false);
  const [customCityName, setCustomCityName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: 'Tinkune',
    state: 'Bagmati Province',
    city: 'Kathmandu',
    degree: 'Bachelors in Education / Science',
    institution: 'Tribhuvan University',
    preferredSubjects: 'Mathematics, Science',
    bio: 'Dedicated tutor with experience in interactive teaching and personalized academic support for students in Nepal.',
    experience: 3,
    availability: INITIAL_AVAILABILITY,
    teachingMode: 'Both',
    monthlyRate: 8000,
    hourlyRate: 400,
    publishImmediately: true,
    sendNotification: true,
  });

  useEffect(() => {
    fetchUnonboardedUsers();
  }, []);

  const fetchUnonboardedUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await teacherService.getUnonboardedUsers();
      const users = res.data.data || [];
      setUnonboardedUsers(users);
      if (users.length > 0) {
        setSelectedUserId(users[0].id);
        setFormData((prev) => ({
          ...prev,
          name: users[0].name || '',
          email: users[0].email || '',
        }));
      }
    } catch (err) {
      toast.error('Failed to load unonboarded user accounts');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleUserDropdownChange = (e) => {
    const uId = e.target.value;
    setSelectedUserId(uId);
    const user = unonboardedUsers.find((u) => u.id === uId);
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }
  };

  const handleStateChange = (e) => {
    const newState = e.target.value;
    const stateObj = NEPAL_STATES.find((s) => s.name === newState);
    const defaultCity = stateObj?.cities?.[0] || '';
    setIsCustomCity(false);
    setCustomCityName('');
    setFormData((prev) => ({
      ...prev,
      state: newState,
      city: defaultCity,
    }));
  };

  const handleCitySelectChange = (e) => {
    const val = e.target.value;
    if (val === 'Other') {
      setIsCustomCity(true);
      setFormData((prev) => ({ ...prev, city: customCityName }));
    } else {
      setIsCustomCity(false);
      setFormData((prev) => ({ ...prev, city: val }));
    }
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => {
      const exists = prev.availability.includes(day);
      return {
        ...prev,
        availability: exists
          ? prev.availability.filter((d) => d !== day)
          : [...prev.availability, day],
      };
    });
  };

  const handleAddSubjectChip = (sub) => {
    const currentSubs = formData.preferredSubjects
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!currentSubs.includes(sub)) {
      const newSubs = [...currentSubs, sub].join(', ');
      setFormData((prev) => ({ ...prev, preferredSubjects: newSubs }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUserId) {
      toast.error('Please select an unonboarded user account from the dropdown');
      return;
    }
    if (!formData.name.trim()) {
      toast.error('Full Name is required');
      return;
    }
    if (!formData.street.trim()) {
      toast.error('Street address is required');
      return;
    }
    if (!formData.state) {
      toast.error('State/Province is required');
      return;
    }
    if (isCustomCity && !customCityName.trim()) {
      toast.error('Please enter your custom city name');
      return;
    }
    if (!formData.city || !formData.city.trim()) {
      toast.error('City is required');
      return;
    }
    if (formData.availability.length === 0) {
      toast.error('Please select at least one day of availability');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        userId: selectedUserId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        qualifications: [
          {
            degree: formData.degree,
            institution: formData.institution,
          },
        ],
        preferredSubjects: formData.preferredSubjects
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        bio: formData.bio,
        experience: Number(formData.experience) || 0,
        availability: formData.availability,
        teachingMode: formData.teachingMode,
        monthlyRate: Number(formData.monthlyRate) || (Number(formData.hourlyRate) ? Number(formData.hourlyRate) * 20 : 8000),
        hourlyRate: Number(formData.hourlyRate) || Math.round(Number(formData.monthlyRate || 8000) / 20),
        publishImmediately: formData.publishImmediately,
      };

      const res = await teacherService.createManual(payload);
      toast.success(res.data.message || 'Tutor profile created successfully!');
      navigate('/teachers');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create tutor profile');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedStateObj = NEPAL_STATES.find((s) => s.name === formData.state);
  const citiesForSelectedState = selectedStateObj?.cities || [];
  const selectedUserData = unonboardedUsers.find((u) => u.id === selectedUserId);

  return (
    <>
      <div className="page-header">
        <div>
          <Link
            to="/teachers"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '.82rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              marginBottom: '6px',
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to Tutor Directory</span>
          </Link>
          <h1>Manual Tutor Onboarding</h1>
          <p>Create and activate complete tutor profiles for registered platform users</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Step 1: Link User Account */}
        <UserAccountStep
          loadingUsers={loadingUsers}
          unonboardedUsers={unonboardedUsers}
          selectedUserId={selectedUserId}
          onUserChange={handleUserDropdownChange}
          selectedUserData={selectedUserData}
        />

        {/* Step 2: Contact & Address with Province & Dynamic City (including "Other") */}
        <AddressStep
          formData={formData}
          setFormData={setFormData}
          isCustomCity={isCustomCity}
          customCityName={customCityName}
          setCustomCityName={setCustomCityName}
          onStateChange={handleStateChange}
          onCitySelectChange={handleCitySelectChange}
          citiesForSelectedState={citiesForSelectedState}
        />

        {/* Step 3: Academic Qualifications & Teaching Subjects */}
        <QualificationsStep
          formData={formData}
          setFormData={setFormData}
          onAddSubjectChip={handleAddSubjectChip}
        />

        {/* Step 4: Availability (Initial 6 days except Saturday), Pricing & Publishing */}
        <PreferencesStep
          formData={formData}
          setFormData={setFormData}
          onDayToggle={handleDayToggle}
        />

        {/* Submit Actions Card */}
        <div className="card" style={{ background: 'var(--bg-card-elevated)' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Link to="/teachers" className="btn btn-ghost">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <UserPlus size={16} />
              <span>{submitting ? 'Creating Profile…' : 'Activate Tutor Profile'}</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
