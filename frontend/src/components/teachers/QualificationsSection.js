import { Award } from 'lucide-react';

const QualificationsSection = ({ qualifications }) => {
  return (
    <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Qualifications & Education</h2>
      <div className="space-y-4">
        {qualifications.map((qual, index) => (
          <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 border border-stone-200 rounded-lg">
            <Award className="w-6 h-6 text-gold-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900">{qual.degree}</h4>
              <p className="text-gray-600">{qual.institution}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QualificationsSection;