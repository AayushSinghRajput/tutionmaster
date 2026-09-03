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

  getUnonboardedUsers: (params) =>
    api.get('/teachers/unonboarded-users', { params }),

  createManual: (data) =>
    api.post('/teachers/create-manual', data),

  resendNotification: (id) =>
    api.post(`/teachers/${id}/resend-notification`),
};

export const administratorService = {
  list: () =>
    api.get('/administrators'),

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
