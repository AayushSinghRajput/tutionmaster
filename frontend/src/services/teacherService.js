import api from './api';

export const teacherService = {
  // Public endpoints
  getAllTeachers: (params = {}) => {
    return api.get('/teachers', { params });
  },

  searchTeachers: (params = {}) => {
    return api.get('/teachers/search', { params });
  },

  getTeacherById: (id) => {
    return api.get(`/teachers/${id}`);
  },

  // Protected endpoints
  createTeacher: (data) => {
    return api.post('/teachers', data);
  },

  updateTeacher: (id, data) => {
    return api.put(`/teachers/${id}`, data);
  },

  deleteTeacher: (id) => {
    return api.delete(`/teachers/${id}`);
  },

  getMyProfile: () => {
    return api.get('/teachers/my-profile');
  }
};

export const uploadService = {
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/upload/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  uploadCV: (file) => {
    const formData = new FormData();
    formData.append('cv', file);
    return api.post('/upload/cv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteFile: (publicId, resourceType) => {
    return api.delete(`/upload/${publicId}`, {
      data: { resourceType }
    });
  }
};