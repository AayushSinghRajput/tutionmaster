import api from './api';

export const jobService = {
  // Get active tuition jobs with pagination (limit 9) and optional filters
  getJobs: async (page = 1, search = '', jobType = '') => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', 9);
    if (search) params.append('search', search);
    if (jobType) params.append('jobType', jobType);

    const response = await api.get(`/jobs?${params.toString()}`);
    return response.data;
  },

  // Get single job details by slug (Requires Auth JWT token sent via interceptor)
  getJobBySlug: async (slug) => {
    const response = await api.get(`/jobs/slug/${slug}`);
    return response.data;
  },
};
