import api from './api';

export const llmKeyAdminService = {
  // Get all configured LLM keys
  list: () => api.get('/llm-keys'),

  // Add new LLM key
  create: (data) => api.post('/llm-keys', data),

  // Update LLM key configuration
  update: (id, data) => api.put(`/llm-keys/${id}`, data),

  // Fast toggle active/inactive
  toggle: (id) => api.patch(`/llm-keys/${id}/toggle`),

  // Test an existing or new key
  test: (data) => api.post('/llm-keys/test', data),

  // Manually reset cooldown/error
  resetCooldown: (id) => api.post(`/llm-keys/${id}/reset-cooldown`),

  // Delete key
  delete: (id) => api.delete(`/llm-keys/${id}`),
};
