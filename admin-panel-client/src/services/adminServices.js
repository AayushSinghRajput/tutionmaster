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

  setVisibility: (id, isVisible) =>
    api.patch(`/teachers/${id}/visibility`, { isVisible }),
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
