import { LayoutDashboard, UserPlus, Eye, Pencil, ArrowRight } from 'lucide-react';

const DashboardSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center shrink-0">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">Step 02</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-900 mb-2">
          Your Teacher Dashboard
        </h2>
        <p className="text-brand-700 mb-10 max-w-xl">
          After logging in, you land on your personal dashboard. This is your control centre.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto lg:mx-0">
          {/* New teacher card */}
          <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl border border-brand-200 p-6 sm:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-5 border border-brand-200">
              <UserPlus className="w-6 h-6 text-brand-600" />
            </div>
            <h3 className="text-lg font-bold text-brand-900 mb-2">New Teacher</h3>
            <p className="text-brand-700 text-sm mb-6 leading-relaxed">
              If you haven't set up your profile yet, a prominent <strong>Create Profile</strong> button
              is displayed, inviting you to get started immediately.
            </p>
            <div className="flex gap-3">
              <button className="flex-1 bg-brand-600 text-white rounded-lg py-2.5 font-semibold text-sm hover:bg-brand-700 transition-colors flex items-center justify-center gap-2">
                <UserPlus className="w-4 h-4" />
                Create Profile
              </button>
            </div>
          </div>

          {/* Existing teacher card */}
          <div className="bg-gradient-to-br from-gold-50 to-gold-100 rounded-2xl border border-gold-200 p-6 sm:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center mb-5 border border-gold-200">
              <LayoutDashboard className="w-6 h-6 text-gold-700" />
            </div>
            <h3 className="text-lg font-bold text-brand-900 mb-2">Existing Teacher</h3>
            <p className="text-brand-700 text-sm mb-6 leading-relaxed">
              If you already have a profile, your existing information is displayed. You can
              <strong> view</strong> or <strong>update</strong> your profile at any time.
            </p>
            <div className="flex gap-3">
              <button className="flex-1 border border-gold-300 text-gold-700 rounded-lg py-2.5 font-semibold text-sm hover:bg-gold-50 transition-colors flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                View Profile
              </button>
              <button className="flex-1 border border-gold-300 text-gold-700 rounded-lg py-2.5 font-semibold text-sm hover:bg-gold-50 transition-colors flex items-center justify-center gap-2">
                <Pencil className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-6 bg-brand-300" />
            <ArrowRight className="w-5 h-5 text-brand-400 rotate-90" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
