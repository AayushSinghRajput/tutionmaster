import api from './api';

export const adminReviewService = {
  getAllReviews: () => api.get('/reviews'),
  updateReviewStatus: (id, status) => api.put(`/reviews/${id}/status`, { status }),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
};
