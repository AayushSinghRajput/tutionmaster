import { PlayCircle } from 'lucide-react';

const VideoTutorialSection = () => {
  return (
    <section className="py-10 sm:py-14 bg-white border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <PlayCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">
              Video Guide
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-900 mb-2">
            Watch How to Create Your Teacher Profile
          </h2>
          <p className="text-sm sm:text-base text-brand-700 mb-6 sm:mb-8">
            Watch this quick video tutorial to learn how to register, complete your profile details, and start connecting with students.
          </p>

          {/* Responsive 16:9 Video Container */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-900">
            <iframe
              src="https://www.youtube.com/embed/oSeMIfUGT3s"
              title="How to Create Your Teacher Profile"
              width="100%"
              height="100%"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTutorialSection;
