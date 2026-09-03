import api from './api';

export const jobAdminService = {
  // Get list of jobs for admin
  getJobs: async (params = {}) => {
    const response = await api.get('/jobs', { params });
    return response.data;
  },

  // Get single job post by ID
  getJobById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  // Create new job post
  createJob: async (data) => {
    const response = await api.post('/jobs', data);
    return response.data;
  },

  // Update existing job post
  updateJob: async (id, data) => {
    const response = await api.put(`/jobs/${id}`, data);
    return response.data;
  },

  // Toggle published status
  togglePublish: async (id) => {
    const response = await api.patch(`/jobs/${id}/publish`);
    return response.data;
  },

  // Update job status (Open, Urgent, Filled, Closed)
  updateStatus: async (id, status) => {
    const response = await api.patch(`/jobs/${id}/status`, { status });
    return response.data;
  },

  // Delete job post
  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },
};
