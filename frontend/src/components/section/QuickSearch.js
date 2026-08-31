import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Monitor } from "lucide-react";
import { teacherService } from "../../services/teacherService";
import { TEACHING_MODES } from "../../utils/constants";

const QuickSearch = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [city, setCity] = useState("");
  const [teachingMode, setTeachingMode] = useState("");

  useEffect(() => {
    let isMounted = true;
    teacherService
      .getAllSubjects()
      .then((res) => {
        if (isMounted) setSubjects(res.data?.data || res.data || []);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (subject) params.set("subjects", subject);
    if (city.trim()) params.set("city", city.trim());
    if (teachingMode) params.set("teachingMode", teachingMode);
    navigate(`/teachers${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-serif">
            What do you want to learn?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Search real tutor profiles by subject, location, and teaching mode.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-stone-200 shadow-lg p-4 sm:p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label htmlFor="qs-subject" className="block text-xs font-semibold text-gray-500 mb-1.5">
                Subject
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  id="qs-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-stone-200 rounded-lg text-sm text-gray-700 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent appearance-none"
                >
                  <option value="">Any subject</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="qs-city" className="block text-xs font-semibold text-gray-500 mb-1.5">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  id="qs-city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Dharan"
                  className="w-full pl-9 pr-3 py-2.5 border border-stone-200 rounded-lg text-sm text-gray-700 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="qs-mode" className="block text-xs font-semibold text-gray-500 mb-1.5">
                Teaching Mode
              </label>
              <div className="relative">
                <Monitor className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  id="qs-mode"
                  value={teachingMode}
                  onChange={(e) => setTeachingMode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-stone-200 rounded-lg text-sm text-gray-700 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent appearance-none"
                >
                  <option value="">Any mode</option>
                  {TEACHING_MODES.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-brand-primary w-full mt-4 sm:mt-5 py-3 text-base"
          >
            Find Tutors <Search className="w-4 h-4 shrink-0" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default QuickSearch;
