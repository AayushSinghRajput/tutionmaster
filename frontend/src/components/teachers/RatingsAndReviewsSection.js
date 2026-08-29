import React from 'react';

const RatingsAndReviewsSection = ({ teacher }) => {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Ratings & Reviews</h2>
      <div className="text-gray-500 italic">No reviews yet.</div>
    </section>
  );
};

export default RatingsAndReviewsSection;
