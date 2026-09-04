import api from './api';

export const supportAdminService = {
  getTickets: async (params = {}) => {
    const res = await api.get('/support-tickets', { params });
    return res.data;
  },

  getTicketById: async (id) => {
    const res = await api.get(`/support-tickets/${id}`);
    return res.data;
  },

  updateStatus: async (id, status) => {
    const res = await api.patch(`/support-tickets/${id}/status`, { status });
    return res.data;
  },

  replyToTicket: async (id, payload) => {
    const res = await api.post(`/support-tickets/${id}/reply`, payload);
    return res.data;
  },
};
