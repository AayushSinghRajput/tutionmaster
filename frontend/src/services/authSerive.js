import api from './api';

export const authService = {
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  register: (username, email, password, role) => {
    return api.post('/auth/register', { username, email, password, role });
  },

  googleLogin: (credential, role) => {
    return api.post('/auth/google', { credential, role });
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me'); 
    return response.data.data; 
  },

  logout: () => {
    return api.post('/auth/logout');
  },

  forgotPassword: (email) => {
    return api.post('/auth/forgot-password', { email });
  },

  resetPassword: (token, password) => {
    return api.put(`/auth/reset-password/${token}`, { password });
  }
};
