import { useState, useEffect, useRef } from 'react';
import { ChevronUp } from 'lucide-react';

const PolicyLayout = ({ title, description, icon: Icon, badge, sections, children }) => {
  const [activeId, setActiveId] = useState(sections[0]?.id || '');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const contentRef = useRef(null);

  // IntersectionObserver: highlight active section as user scrolls
  useEffect(() => {
    const observers = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  // Back-to-top visibility
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onScroll = () => setShowBackToTop(el.scrollTop > 300);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveId(id);
    setMobileOpen(false);
  };

  const scrollToTop = () => {
    if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const effectiveDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-brand-50/30">
      {/* ── Hero Header ── */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center shadow-sm">
              <Icon className="w-7 h-7 text-brand-600" />
            </div>
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              {badge}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif">{title}</h1>
            <p className="text-gray-500 max-w-xl text-base sm:text-lg leading-relaxed">{description}</p>
            <span className="text-xs text-gray-400 font-medium">
              Last updated: {effectiveDate}
            </span>
          </div>
        </div>
      </div>

      {/* ── Mobile Tab Bar ── */}
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-stone-200 shadow-sm">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700"
        >
          <span>
            {sections.find((s) => s.id === activeId)?.label || 'Jump to section'}
          </span>
          <ChevronUp
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${mobileOpen ? '' : 'rotate-180'}`}
          />
        </button>
        {mobileOpen && (
          <div className="border-t border-stone-100 max-h-60 overflow-y-auto divide-y divide-stone-100">
            {sections.map(({ id, label, icon: SIcon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  activeId === id
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-gray-600 hover:bg-stone-50'
                }`}
              >
                <SIcon className="w-4 h-4 flex-shrink-0" />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Two-Column Layout ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex gap-8 items-start">

          {/* ── Sticky Sidebar (desktop only) ── */}
          <aside className="hidden lg:block w-60 xl:w-64 flex-shrink-0 sticky top-8 self-start">
            <nav className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-stone-100 bg-stone-50">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contents</p>
              </div>
              <ul className="py-2">
                {sections.map(({ id, label, icon: SIcon }) => {
                  const isActive = activeId === id;
                  return (
                    <li key={id}>
                      <button
                        onClick={() => scrollToSection(id)}
                        className={`w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 ${
                          isActive
                            ? 'text-brand-700 font-semibold bg-brand-50 border-l-2 border-brand-600'
                            : 'text-gray-500 hover:text-gray-800 hover:bg-stone-50 border-l-2 border-transparent'
                        }`}
                      >
                        <SIcon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-brand-600' : 'text-gray-400'}`} />
                        <span className="leading-tight">{label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* ── Content Panel ── */}
          <div
            ref={contentRef}
            className="flex-1 min-w-0 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-2 lg:scroll-smooth"
          >
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm divide-y divide-stone-100">
              {children}
            </div>

            {/* Bottom padding spacer */}
            <div className="h-16" />
          </div>
        </div>
      </div>

      {/* ── Back to Top ── */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-brand-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-700 transition-colors"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default PolicyLayout;
