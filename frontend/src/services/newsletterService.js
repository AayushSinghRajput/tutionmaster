import api from './api';

export const newsletterService = {
  subscribe: (email) => {
    return api.post('/newsletter/subscribe', { email });
  },
};
