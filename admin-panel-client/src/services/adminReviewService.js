import api from './api';

export const adminReviewService = {
  getAllReviews: (params) => api.get('/reviews', { params }),
  updateReviewStatus: (id, status) => api.put(`/reviews/${id}/status`, { status }),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
};
