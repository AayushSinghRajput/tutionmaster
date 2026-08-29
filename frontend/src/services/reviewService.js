import api from './api';

export const reviewService = {
  getReviews: (teacherId) => api.get(`/teachers/${teacherId}/reviews`),
  addReview: (teacherId, reviewData) => api.post(`/teachers/${teacherId}/reviews`, reviewData),
};
