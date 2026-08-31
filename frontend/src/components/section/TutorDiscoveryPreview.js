import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";
import { teacherService } from "../../services/teacherService";
import TeacherCard from "../common/TeacherCard";
import { useInView } from "../../hooks/useInView";

const TutorCardReveal = ({ teacher, index }) => {
  const [ref, isInView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: isInView ? `${index * 80}ms` : "0ms" }}
    >
      <TeacherCard teacher={teacher} />
    </div>
  );
};

const TutorDiscoveryPreview = () => {
  const [teachers, setTeachers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    teacherService
      .getAllTeachers({ page: 1, limit: 3 })
      .then((res) => {
        if (isMounted) setTeachers(res.data?.data || []);
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoaded(true);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (loaded && teachers.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Users className="w-4 h-4" />
            REAL TUTORS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-serif">
            Meet Tutors Ready to Teach
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            A few of the tutors currently listed on TuitionMaster.
          </p>
        </div>

        {!loaded ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-stone-200 h-64 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teachers.map((teacher, index) => (
              <TutorCardReveal key={teacher._id} teacher={teacher} index={index} />
            ))}
          </div>
        )}

        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/teachers"
            className="btn-brand-outline px-6 sm:px-8 py-3 text-base sm:text-lg group"
          >
            View All Tutors
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TutorDiscoveryPreview;
