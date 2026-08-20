import { useState } from 'react';
import {
  User, GraduationCap, BookOpen, CalendarDays,
  Camera, Phone, Mail, MapPin,
  Plus, X, FileText, Briefcase,
  DollarSign, Clock, Copy, Trash2,
  MonitorPlay, Users, Laptop,
} from 'lucide-react';

/* ─── constants ─────────────────────────────────────────── */

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const TEACHING_MODES = [
  { value: 'Online', icon: Laptop, color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { value: 'In-Person', icon: Users, color: 'bg-green-50 border-green-200 text-green-700' },
  { value: 'Both', icon: MonitorPlay, color: 'bg-brand-50 border-brand-200 text-brand-700' },
];

const SAMPLE_SUBJECTS = ['Mathematics', 'Physics', 'Chemistry'];

/* ─── Step 1 — Basic Info ───────────────────────────────── */

const Step1Content = () => (
  <div className="mt-4 space-y-3">
    <p className="text-sm text-brand-700 mb-4 leading-relaxed">
      Provide your personal details. Your full name and email are pre-filled from your account — you can update them here during profile creation.
    </p>

    {/* Photo upload mock */}
    <div className="flex items-center gap-3 bg-brand-50 rounded-xl border border-brand-100 px-3 py-3">
      <div className="w-12 h-12 rounded-full bg-brand-200 flex items-center justify-center shrink-0">
        <Camera className="w-5 h-5 text-brand-600" />
      </div>
      <div>
        <p className="text-xs font-bold text-brand-800">Profile Photo</p>
        <p className="text-xs text-brand-600">Upload your photo</p>
      </div>
    </div>

    {[
      { icon: User, label: 'Full Name', value: 'Priya Sharma', note: 'Pre-filled from account' },
      { icon: Mail, label: 'Email Address', value: 'priya@example.com', note: 'Pre-filled from account' },
      { icon: Phone, label: 'Phone Number', value: '+977 98XXXXXXXX', note: null },
      { icon: MapPin, label: 'Address', value: 'Tinkune, Bagmati Province, Kathmandu, 44600', note: null },
    ].map((field, i) => {
      const Icon = field.icon;
      return (
        <div key={i} className="flex items-center gap-2.5 bg-brand-50 rounded-lg px-3 py-2.5 border border-brand-100">
          <Icon className="w-4 h-4 text-brand-500 shrink-0" />
          <span className="text-xs font-semibold text-brand-600 w-[105px] shrink-0">{field.label}</span>
          <span className="text-xs text-brand-800 font-medium flex-1">{field.value}</span>
          {field.note && (
            <span className="text-[10px] font-semibold text-gold-600 bg-gold-50 border border-gold-200 rounded-full px-2 py-0.5 shrink-0">
              Auto-filled
            </span>
          )}
        </div>
      );
    })}

    <GoalNote text="Create the teacher's basic identity. Students see this on your public profile." />
  </div>
);

/* ─── Step 2 — Qualification ────────────────────────────── */

const Step2Content = () => {
  const [qualifications, setQualifications] = useState([
    { degree: 'B.Ed. Mathematics', institution: 'Tribhuvan University', year: '2018' },
    { degree: '+2 Science', institution: 'Kathmandu Valley School', year: '2015' },
  ]);
  const [subjects, setSubjects] = useState([...SAMPLE_SUBJECTS]);
  const [inputVal, setInputVal] = useState('');

  const addSubject = () => {
    const t = inputVal.trim();
    if (t && !subjects.includes(t)) { setSubjects([...subjects, t]); setInputVal(''); }
  };

  return (
    <div className="mt-4 space-y-4">
      <p className="text-sm text-brand-700 mb-2 leading-relaxed">
        Add your educational qualifications (you can add multiple — +2, Bachelor, Master, etc.), upload your CV, and list the subjects you teach.
      </p>

      {/* Qualification cards */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-brand-700 uppercase tracking-wider">Education</p>
        {qualifications.map((q, i) => (
          <div key={i} className="bg-white rounded-xl border border-brand-200 p-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-brand-500">Qualification #{i + 1}</span>
              {qualifications.length > 1 && (
                <button
                  onClick={() => setQualifications(qualifications.filter((_, idx) => idx !== i))}
                  className="flex items-center gap-1 text-red-500 text-xs border border-red-200 rounded-lg px-2 py-1 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              )}
            </div>
            <div className="space-y-1.5">
              {[
                { label: 'Degree/Certificate', value: q.degree },
                { label: 'Institution', value: q.institution },
                { label: 'Year Completed', value: q.year },
              ].map((f, j) => (
                <div key={j} className="flex items-center gap-2 bg-brand-50 rounded-lg px-2.5 py-2 border border-brand-100">
                  <span className="text-xs font-semibold text-brand-600 w-[120px] shrink-0">{f.label}</span>
                  <span className="text-xs text-brand-800 font-medium">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={() => setQualifications([...qualifications, { degree: '', institution: '', year: '' }])}
          className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 border border-brand-200 rounded-lg px-3 py-2 hover:bg-brand-50 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Another Qualification
        </button>
      </div>

      {/* CV upload */}
      <div className="flex items-center gap-3 bg-gold-50 border border-gold-200 rounded-xl px-3 py-3">
        <div className="w-9 h-9 bg-gold-100 rounded-lg flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4 text-gold-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-brand-800">CV / Resume</p>
          <p className="text-xs text-brand-600 truncate">Upload your CV (PDF)</p>
        </div>
        <button className="text-xs font-semibold text-brand-600 border border-brand-200 bg-white rounded-lg px-2.5 py-1.5 hover:bg-brand-50 transition-colors shrink-0">
          Upload
        </button>
      </div>

      {/* Subjects */}
      <div>
        <p className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-2">Subjects You Teach</p>
        <div className="flex gap-2 mb-2">
          <input
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSubject())}
            placeholder="Type a subject..."
            className="flex-1 text-xs border border-brand-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <button
            onClick={addSubject}
            className="flex items-center gap-1 text-xs font-semibold bg-brand-600 text-white rounded-lg px-3 py-2 hover:bg-brand-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {subjects.map(s => (
            <span key={s} className="flex items-center gap-1.5 text-xs font-semibold bg-brand-100 text-brand-700 border border-brand-200 rounded-full px-3 py-1">
              {s}
              <button onClick={() => setSubjects(subjects.filter(x => x !== s))} className="hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <GoalNote text="Help students understand your academic background and the subjects you are qualified to teach." />
    </div>
  );
};

/* ─── Step 3 — Teaching Details ─────────────────────────── */

const Step3Content = () => {
  const [mode, setMode] = useState('Both');

  return (
    <div className="mt-4 space-y-3">
      <p className="text-sm text-brand-700 mb-2 leading-relaxed">
        Share your teaching experience, rate, preferred mode, and a bio that helps students connect with you.
      </p>

      {/* Experience + Rate */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2.5 bg-brand-50 rounded-lg px-3 py-2.5 border border-brand-100">
          <Briefcase className="w-4 h-4 text-brand-500 shrink-0" />
          <div>
            <p className="text-[10px] font-semibold text-brand-500 uppercase tracking-wide">Experience</p>
            <p className="text-xs font-bold text-brand-800">5 Years</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 bg-brand-50 rounded-lg px-3 py-2.5 border border-brand-100">
          <DollarSign className="w-4 h-4 text-brand-500 shrink-0" />
          <div>
            <p className="text-[10px] font-semibold text-brand-500 uppercase tracking-wide">Hourly Rate</p>
            <p className="text-xs font-bold text-brand-800">₨ 500 / hr</p>
          </div>
        </div>
      </div>

      {/* Teaching Mode */}
      <div>
        <p className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-2">Teaching Mode</p>
        <div className="flex gap-2 flex-wrap">
          {TEACHING_MODES.map(({ value, icon: Icon, color }) => (
            <button
              key={value}
              onClick={() => setMode(value)}
              className={`flex items-center gap-1.5 text-xs font-semibold border rounded-lg px-3 py-2 transition-all duration-200 ${mode === value ? color + ' ring-2 ring-offset-1 ring-current' : 'bg-stone-50 border-stone-200 text-stone-500 hover:border-brand-200'
                }`}
            >
              <Icon className="w-3.5 h-3.5" /> {value}
            </button>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div>
        <p className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-1.5">Bio & Teaching Philosophy</p>
        <div className="bg-brand-50 border border-brand-100 rounded-xl p-3 text-xs text-brand-700 leading-relaxed italic">
          "Passionate about making mathematics accessible to all students. I use a concept-first approach combined with real-world examples..."
        </div>
        <p className="text-[10px] text-brand-500 mt-1">Minimum 50 characters. Shown on your public profile.</p>
      </div>

      <GoalNote text="Help students understand your teaching style and experience beyond just your qualifications." />
    </div>
  );
};

/* ─── Step 4 — Availability ──────────────────────────────── */

const Step4Content = () => {
  const [selectedDays, setSelectedDays] = useState(['Monday', 'Wednesday', 'Friday', 'Saturday']);
  const [slots, setSlots] = useState({
    Monday: [{ start: '04:00 PM', end: '07:00 PM' }],
    Wednesday: [{ start: '04:00 PM', end: '07:00 PM' }],
    Friday: [{ start: '04:00 PM', end: '07:00 PM' }],
    Saturday: [{ start: '10:00 AM', end: '01:00 PM' }],
  });

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
      const next = { ...slots };
      delete next[day];
      setSlots(next);
    } else {
      setSelectedDays([...selectedDays, day]);
      setSlots({ ...slots, [day]: [{ start: '04:00 PM', end: '07:00 PM' }] });
    }
  };

  const copyToAll = (sourceDay) => {
    const sourceSlots = slots[sourceDay];
    const next = { ...slots };
    selectedDays.forEach(d => { if (d !== sourceDay) next[d] = sourceSlots.map(s => ({ ...s })); });
    setSlots(next);
  };

  const removeSlot = (day, idx) => {
    const next = { ...slots, [day]: slots[day].filter((_, i) => i !== idx) };
    setSlots(next);
  };

  const addSlot = (day) => {
    setSlots({ ...slots, [day]: [...slots[day], { start: '09:00 AM', end: '12:00 PM' }] });
  };

  return (
    <div className="mt-4 space-y-4">
      <p className="text-sm text-brand-700 leading-relaxed">
        Select your available days and set time slots for each. You can set individual times per day or copy one day's schedule to all others.
      </p>

      {/* Day selector */}
      <div>
        <p className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-2">Available Days</p>
        <div className="grid grid-cols-7 gap-1">
          {DAYS_OF_WEEK.map((day, i) => {
            const active = selectedDays.includes(day);
            return (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                title={day}
                className={`flex flex-col items-center py-2 rounded-xl border-2 transition-all duration-200 ${active
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-stone-200 bg-white text-stone-500 hover:border-brand-300'
                  }`}
              >
                <span className="text-[10px] font-bold">{DAYS_SHORT[i]}</span>
                <div className={`w-1.5 h-1.5 rounded-full mt-1 ${active ? 'bg-white' : 'bg-stone-300'}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots per day */}
      {selectedDays.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-brand-700 uppercase tracking-wider">Time Slots</p>
          {selectedDays.map(day => (
            <div key={day} className="bg-white border border-brand-200 rounded-xl p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-brand-800">{day}</span>
                <button
                  onClick={() => copyToAll(day)}
                  className="flex items-center gap-1 text-[10px] font-semibold text-brand-500 hover:text-brand-700 transition-colors"
                >
                  <Copy className="w-3 h-3" /> Copy to all days
                </button>
              </div>
              {(slots[day] || []).map((slot, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-1.5 last:mb-0">
                  <Clock className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                  <span className="text-xs text-brand-700 font-medium flex-1">
                    {slot.start} → {slot.end}
                  </span>
                  {(slots[day] || []).length > 1 && (
                    <button
                      onClick={() => removeSlot(day, idx)}
                      className="text-red-400 hover:text-red-600 border border-red-100 rounded-md p-1 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addSlot(day)}
                className="flex items-center gap-1 text-[10px] font-semibold text-brand-500 hover:text-brand-700 mt-2 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Time Slot
              </button>
            </div>
          ))}
        </div>
      )}

      <GoalNote text="Let students know exactly when you are available to schedule sessions with you." />
    </div>
  );
};

/* ─── Shared GoalNote ────────────────────────────────────── */

const GoalNote = ({ text }) => (
  <div className="mt-1 p-3 bg-gold-50 rounded-xl border border-gold-200 flex items-start gap-2">
    <span className="text-gold-500 text-sm mt-0.5">🎯</span>
    <p className="text-xs text-gold-700 leading-relaxed"><strong>Goal:</strong> {text}</p>
  </div>
);

/* ─── Step meta ──────────────────────────────────────────── */

const PROFILE_STEPS = [
  {
    number: '01',
    label: 'Basic Info',
    icon: User,
    Content: Step1Content,
  },
  {
    number: '02',
    label: 'Qualification',
    icon: GraduationCap,
    Content: Step2Content,
  },
  {
    number: '03',
    label: 'Teaching Details',
    icon: BookOpen,
    Content: Step3Content,
  },
  {
    number: '04',
    label: 'Availability',
    icon: CalendarDays,
    Content: Step4Content,
  },
];

/* ─── StepCard ───────────────────────────────────────────── */

const StepCard = ({ step }) => {
  const Icon = step.icon;
  const Content = step.Content;

  return (
    <div className="w-full bg-white border border-brand-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Card header */}
      <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-brand-100">
        <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">
            Step {step.number}
          </span>
          <p className="font-bold text-sm mt-0.5 text-brand-900">{step.label}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-brand-600">{step.number}</span>
        </div>
      </div>

      {/* Always-visible content */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
        <Content />
      </div>
    </div>
  );
};

/* ─── Main Section ───────────────────────────────────────── */

const ProfileStepsSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-brand-50 to-gold-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-100 border border-brand-200 rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Step 03 — Profile Creation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-900 mb-3">
            Complete Your Profile in 4 Steps
          </h2>
          <p className="text-brand-700 max-w-xl mx-auto text-sm sm:text-base">
            Here's exactly what each step asks for — so you know what to prepare.
          </p>
        </div>

        {/* Progress indicator — purely visual */}
        <div className="flex items-center justify-center mb-3 max-w-2xl mx-auto">
          {PROFILE_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === PROFILE_STEPS.length - 1;
            return (
              <div key={index} className="flex items-center flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-600 border-2 border-brand-600 text-white flex items-center justify-center shrink-0 shadow-md mx-auto">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                {!isLast && (
                  <div className="flex-1 h-0.5 mx-1 bg-brand-200" />
                )}
              </div>
            );
          })}
        </div>

        {/* Step labels */}
        <div className="flex items-start justify-between max-w-2xl mx-auto mb-10">
          {PROFILE_STEPS.map((step) => (
            <div key={step.number} className="flex-1 text-center px-1">
              <span className="text-xs font-semibold text-brand-700">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Step cards — all always expanded */}
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {PROFILE_STEPS.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileStepsSection;
