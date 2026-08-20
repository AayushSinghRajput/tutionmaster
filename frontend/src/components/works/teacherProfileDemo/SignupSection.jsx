import { LogIn, UserPlus, Mail, Lock, ArrowRight } from 'lucide-react';

const SignupSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-brand-50 to-gold-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center shrink-0">
            <LogIn className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">Step 01</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-900 mb-2">
          Login / Sign Up
        </h2>
        <p className="text-brand-700 mb-10 max-w-xl">
          Create your account or log in to get started. TuitionMaster is built for teachers — your role is set up automatically.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto lg:mx-0">
          {/* Mock login form */}
          <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-brand-900 mb-1">Welcome back!</h3>
            <p className="text-sm text-brand-600 mb-6">Sign in to your teacher account</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-700 mb-1.5">Email Address</label>
                <div className="flex items-center gap-2 border border-stone-200 rounded-lg px-3 py-2.5 bg-stone-50">
                  <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                  <span className="text-sm text-gray-400">teacher@example.com</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-700 mb-1.5">Password</label>
                <div className="flex items-center gap-2 border border-stone-200 rounded-lg px-3 py-2.5 bg-stone-50">
                  <Lock className="w-4 h-4 text-brand-400 shrink-0" />
                  <span className="text-sm text-gray-400">••••••••</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <div className="w-full h-px bg-stone-200" />
                <span className="text-xs text-gray-400 whitespace-nowrap">or</span>
                <div className="w-full h-px bg-stone-200" />
              </div>
              <div className="flex items-center gap-3 border border-stone-200 rounded-lg px-4 py-2.5 bg-white hover:bg-stone-50 cursor-pointer transition-colors">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-gray-600">Continue with Google</span>
              </div>
              <button className="w-full bg-brand-600 text-white rounded-lg py-2.5 font-semibold text-sm hover:bg-brand-700 transition-colors">
                Log In
              </button>
            </div>

            <p className="text-xs text-center text-brand-600 mt-4">
              New teacher?{' '}
              <span className="font-bold text-brand-800 cursor-pointer hover:underline">Create an account</span>
            </p>
          </div>

          {/* Info cards */}
          <div className="flex flex-col gap-4">
            {[
              {
                icon: LogIn,
                title: 'Already have an account?',
                desc: 'Log in with your email and password, or use Google Sign-In for a faster experience.',
                color: 'bg-brand-50 border-brand-200',
                iconBg: 'bg-brand-100',
                iconColor: 'text-brand-600',
              },
              {
                icon: UserPlus,
                title: 'New to TuitionMaster?',
                desc: 'Sign up in seconds. Enter your name, email, and a password. No verification step needed.',
                color: 'bg-gold-50 border-gold-200',
                iconBg: 'bg-gold-100',
                iconColor: 'text-gold-700',
              },
              {
                icon: ArrowRight,
                title: 'Your teacher role is automatic',
                desc: 'TuitionMaster is a teacher-first platform. Once you sign up, you are recognized as a teacher — no manual selection needed.',
                color: 'bg-success-50 border-success-200',
                iconBg: 'bg-success-100',
                iconColor: 'text-success-600',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`flex gap-4 rounded-xl border p-4 sm:p-5 ${item.color}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                    <Icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <div>
                    <p className="font-bold text-brand-900 text-sm mb-0.5">{item.title}</p>
                    <p className="text-brand-700 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
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

export default SignupSection;
