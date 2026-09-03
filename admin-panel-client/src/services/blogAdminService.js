import api from './api';

export const blogAdminService = {
  // Get list of blogs (public & hidden) with search, filter, pagination
  getBlogs: async (params = {}) => {
    const response = await api.get('/blogs', { params });
    return response.data;
  },

  // Get single blog post by ID
  getBlogById: async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },

  // Create new blog post
  createBlog: async (data) => {
    const response = await api.post('/blogs', data);
    return response.data;
  },

  // Update existing blog post
  updateBlog: async (id, data) => {
    const response = await api.put(`/blogs/${id}`, data);
    return response.data;
  },

  // Toggle published status
  togglePublish: async (id) => {
    const response = await api.patch(`/blogs/${id}/publish`);
    return response.data;
  },

  // Delete blog post
  deleteBlog: async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },
};
