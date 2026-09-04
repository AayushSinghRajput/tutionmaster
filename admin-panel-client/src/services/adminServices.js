import api from './api';

export const authService = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  getMe: () =>
    api.get('/auth/me'),
};

export const teacherService = {
  list: (params) =>
    api.get('/teachers', { params }),

  get: (id) =>
    api.get(`/teachers/${id}`),

  update: (id, data) =>
    api.put(`/teachers/${id}`, data),

  setVisibility: (id, isVisible) =>
    api.patch(`/teachers/${id}/visibility`, { isVisible }),

  verify: (id, { action, reason, feedbackNotes }) =>
    api.patch(`/teachers/${id}/verification`, { action, reason, feedbackNotes }),

  getUnonboardedUsers: (params) =>
    api.get('/teachers/unonboarded-users', { params }),

  createManual: (data) =>
    api.post('/teachers/create-manual', data),

  resendNotification: (id) =>
    api.post(`/teachers/${id}/resend-notification`),
};

export const requirementService = {
  list: (params) =>
    api.get('/requirements', { params }),

  get: (id) =>
    api.get(`/requirements/${id}`),

  update: (id, data) =>
    api.patch(`/requirements/${id}`, data),

  delete: (id) =>
    api.delete(`/requirements/${id}`),
};

export const curriculumService = {
  getCurriculum: () =>
    api.get('/curriculum'),

  createCategory: (data) =>
    api.post('/curriculum/categories', data),

  updateCategory: (id, data) =>
    api.put(`/curriculum/categories/${id}`, data),

  deleteCategory: (id) =>
    api.delete(`/curriculum/categories/${id}`),

  addSubject: (categoryId, data) =>
    api.post(`/curriculum/categories/${categoryId}/subjects`, data),

  updateSubject: (categoryId, subId, data) =>
    api.put(`/curriculum/categories/${categoryId}/subjects/${subId}`, data),

  deleteSubject: (categoryId, subId) =>
    api.delete(`/curriculum/categories/${categoryId}/subjects/${subId}`),
};

export const administratorService = {
  list: () =>
    api.get('/administrators'),

  getUsers: () =>
    api.get('/administrators/users'),

  create: (data) =>
    api.post('/administrators', data),

  update: (id, data) =>
    api.patch(`/administrators/${id}`, data),

  remove: (id) =>
    api.delete(`/administrators/${id}`),
};

export const dashboardService = {
  stats: () =>
    api.get('/dashboard/stats'),
};
