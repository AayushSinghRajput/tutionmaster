import api from './api';

export const authService = {
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  register: (username, email, password, confirmPassword) => {
    return api.post('/auth/register', { username, email, password, confirmPassword });
  },

  googleLogin: (credential) => {
    return api.post('/auth/google', { credential });
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me'); 
    return response.data.data; 
  },

  logout: () => {
    return api.post('/auth/logout');
  }
};
