import api from './api';

export const blogService = {
  // Get published blogs with pagination (limit 9)
  getBlogs: async (page = 1) => {
    const response = await api.get(`/blogs?page=${page}&limit=9`);
    return response.data;
  },

  // Get single blog post by slug
  getBlogBySlug: async (slug) => {
    const response = await api.get(`/blogs/slug/${slug}`);
    return response.data;
  },
};
