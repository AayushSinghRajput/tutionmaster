import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, PenSquare, X } from 'lucide-react';
import { reviewService } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const RatingsAndReviewsSection = ({ teacher }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, [teacher._id]);

  const fetchReviews = async () => {
    try {
      const response = await reviewService.getReviews(teacher._id);
      setReviews(response.data.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!reviewerName.trim()) {
      toast.error('Please provide your name');
      return;
    }
    if (!reviewerEmail.trim()) {
      toast.error('Please provide your email');
      return;
    }
    if (!reviewText.trim() || reviewText.length < 10) {
      toast.error('Please write a review of at least 10 characters');
      return;
    }

    setSubmitting(true);
    try {
      const response = await reviewService.addReview(teacher._id, {
        rating,
        reviewText,
        reviewerName,
        reviewerEmail
      });
      toast.success(response.data.message || 'Review submitted successfully!');
      setRating(0);
      setReviewText('');
      setReviewerName('');
      setReviewerEmail('');
      setShowForm(false);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  // Anyone can review unless they are logged in and happen to be the teacher
  const isEligibleToReview = !user || (user._id !== teacher.userId && user.id !== teacher.userId && user._id !== teacher.userId._id);

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
    return { star, count, pct };
  });

  return (
    <section className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
        <MessageCircle className="w-5 h-5 mr-2 text-brand-600" />
        Ratings & Reviews
      </h2>

      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-stone-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-stone-200 rounded"></div>
              <div className="h-4 bg-stone-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {reviews.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mb-8 pb-8 border-b border-stone-100">
              <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-1 shrink-0">
                <div className="text-4xl sm:text-5xl font-bold text-gray-900 leading-none">
                  {teacher.averageRating.toFixed(1)}
                </div>
                <div>
                  <div className="flex text-yellow-500 sm:my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.round(teacher.averageRating) ? 'fill-current' : 'text-stone-300'}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    {teacher.totalReviews} {teacher.totalReviews === 1 ? 'review' : 'reviews'}
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-1.5 min-w-0">
                {ratingDistribution.map(({ star, count, pct }) => (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="w-2.5 text-gray-600">{star}</span>
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-current shrink-0" />
                    <div className="flex-1 bg-stone-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-yellow-500 h-full rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-6 text-right text-gray-500 text-xs">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {reviews.length === 0 ? (
            <div className="text-gray-500 italic mb-8">No reviews yet.</div>
          ) : (
            <div className="space-y-6 mb-8">
              {reviews.map((review) => (
                <div key={review._id} className="border-b border-stone-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {review.reviewerName || 'Student'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex text-yellow-500 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-stone-300'}`} />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{review.reviewText}</p>
                </div>
              ))}
            </div>
          )}

          {isEligibleToReview && (
            <>
              {!showForm ? (
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="btn-brand-outline w-full sm:w-auto inline-flex items-center justify-center gap-2"
                >
                  <PenSquare className="w-4 h-4" />
                  Write a Review
                </button>
              ) : (
                <div className="bg-stone-50 rounded-xl p-5 sm:p-6 border border-stone-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Write a Review</h3>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="text-gray-400 hover:text-gray-600 p-1 -m-1"
                      aria-label="Cancel review"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 focus:outline-none"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= (hoverRating || rating)
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-stone-300'
                              } transition-colors`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                          placeholder="Jane Doe"
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                          placeholder="jane@example.com"
                          value={reviewerEmail}
                          onChange={(e) => setReviewerEmail(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">Your email will not be published.</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Experience</label>
                      <textarea
                        rows="4"
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                        placeholder="Share details about your experience with this tutor..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-brand-primary flex-1 sm:flex-none"
                      >
                        {submitting ? 'Submitting...' : 'Submit Review'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="btn-brand-ghost flex-1 sm:flex-none"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default RatingsAndReviewsSection;
