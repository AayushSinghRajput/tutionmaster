import { Star } from 'lucide-react';

const TestimonialCard = ({ quote, author }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6 text-yellow-300" />
          </div>
        </div>
        <div>
          <p className="italic text-blue-100">"{quote}"</p>
          <p className="font-semibold mt-3">- {author}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;