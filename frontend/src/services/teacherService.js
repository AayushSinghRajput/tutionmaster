import api from "./api";

export const teacherService = {
  // Public endpoints
  getAllTeachers: (params = {}) => {
    return api.get("/teachers", { params });
  },

  getAllSubjects: () => {
    return api.get('/teachers/subject');
  },


  searchTeachers: (params = {}) => {
    return api.get("/teachers/search", { params });
  },

  getTeacherById: (id) => {
    return api.get(`/teachers/${id}`);
  },

  // Protected endpoints
  createTeacher: (data) => {
    return api.post("/teachers", data);
  },

  updateTeacher: (id, data) => {
    return api.put(`/teachers/${id}`, data);
  },

  deleteTeacher: (id) => {
    return api.delete(`/teachers/${id}`);
  },

  getMyProfile: () => {
    return api.get("/teachers/my-profile");
  },
};

export const uploadService = {
  // Upload teacher avatar (image)
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    return api.post("/upload/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Upload teacher CV (PDF)
  uploadCV: (file) => {
    const formData = new FormData();
    formData.append("cv", file);

    return api.post("/upload/cv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Delete file (avatar or CV)
  deleteFile: (publicId, resourceType) => {
    // Send publicId as-is to backend (no stripping/encoding)
    // Backend will handle flexible matching with/without .pdf
    if (!publicId) {
      return Promise.reject(new Error("Public ID is required"));
    }

    return api.delete("/upload", {
      data: {
        publicId, // Send full publicId including extension
        resourceType,
      },
    });
  },
};
