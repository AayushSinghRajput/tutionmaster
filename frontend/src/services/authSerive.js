import api from './api';

export const authService = {
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  register: (email, password, confirmPassword) => {
    return api.post('/auth/register', { email, password, confirmPassword });
  },

  getCurrentUser: () => {
    return api.get('/auth/me');
  },

  logout: () => {
    return api.post('/auth/logout');
  }
};