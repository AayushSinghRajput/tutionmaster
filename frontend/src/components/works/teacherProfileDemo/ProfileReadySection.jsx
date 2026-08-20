import { Link } from 'react-router-dom';
import {
  CheckCircle2, User, GraduationCap, BookOpen, CalendarDays,
  Eye, LayoutDashboard, PartyPopper,
} from 'lucide-react';

const COMPLETED_STEPS = [
  { icon: User,         label: 'Basic Info'       },
  { icon: GraduationCap, label: 'Qualification'   },
  { icon: BookOpen,     label: 'Teaching Details' },
  { icon: CalendarDays, label: 'Availability'     },
];

const ProfileReadySection = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Celebration badge */}
          <div className="inline-flex items-center gap-2 bg-gold-50 border border-gold-200 rounded-full px-5 py-2 mb-6">
            <PartyPopper className="w-4 h-4 text-gold-600" />
            <span className="text-sm font-bold text-gold-700">Profile Complete!</span>
          </div>

          {/* Big success icon */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="w-24 h-24 bg-success-50 rounded-full flex items-center justify-center border-2 border-success-200 shadow-lg">
              <CheckCircle2 className="w-12 h-12 text-success-500" />
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border-4 border-success-300 animate-ping opacity-30" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand-900 mb-4">
            🎉 Your Teacher Profile Is Ready!
          </h2>
          <p className="text-brand-700 text-base sm:text-lg mb-8 leading-relaxed">
            Students can now view your profile and learn about your qualifications,
            subjects, experience, and availability.
          </p>

          {/* Completed steps row */}
          <div className="flex items-center justify-center flex-wrap gap-3 mb-10">
            {COMPLETED_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === COMPLETED_STEPS.length - 1;
              return (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-success-50 border border-success-200 rounded-lg px-3 py-1.5">
                    <Icon className="w-3.5 h-3.5 text-success-600" />
                    <span className="text-xs font-semibold text-success-700">{step.label}</span>
                    <CheckCircle2 className="w-3 h-3 text-success-500" />
                  </div>
                  {!isLast && (
                    <span className="text-success-300 font-bold text-sm">→</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Summary card */}
          <div className="bg-gradient-to-br from-brand-50 to-gold-50 rounded-2xl border border-brand-100 p-6 sm:p-8 mb-8 text-left">
            <p className="font-bold text-brand-900 text-base mb-2">Your teacher profile is complete!</p>
            <p className="text-brand-700 text-sm leading-relaxed">
              Students browsing TuitionMaster can now find you, view your qualifications,
              subjects, teaching experience, and available schedule — and reach out to book sessions with you directly.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/teachers"
              className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-brand-700 transition-colors shadow-sm"
            >
              <Eye className="w-4 h-4" />
              View My Profile
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 border-2 border-brand-600 text-brand-600 rounded-lg px-6 py-3 font-semibold hover:bg-brand-50 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileReadySection;
