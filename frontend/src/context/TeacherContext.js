import { createContext, useContext, useReducer, useEffect } from 'react';
import { teacherService } from '../services/teacherService';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

// Action Types
const TEACHER_ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_LOADING_TEACHERS: 'SET_LOADING_TEACHERS',
  SET_LOADING_TEACHER: 'SET_LOADING_TEACHER',
  SET_TEACHERS: 'SET_TEACHERS',
  SET_TEACHER: 'SET_TEACHER',
  SET_FILTERS: 'SET_FILTERS',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_PAGINATION: 'SET_PAGINATION',
  SET_ERROR: 'SET_ERROR',
  ADD_TEACHER: 'ADD_TEACHER',
  UPDATE_TEACHER: 'UPDATE_TEACHER',
  DELETE_TEACHER: 'DELETE_TEACHER',
  CLEAR_ERROR: 'CLEAR_ERROR',
  RESET_STATE: 'RESET_STATE'
};

// Initial State
const initialState = {
  // Teacher data
  teachers: [],
  currentTeacher: null,
  featuredTeachers: [],
  
  // Loading states
  loading: false,
  loadingTeachers: false,
  loadingTeacher: false,
  updating: false,
  deleting: false,
  
  // Search and filters
  searchQuery: '',
  filters: {
    subjects: [],
    teachingMode: '',
    minExperience: '',
    maxExperience: '',
    minRate: '',
    maxRate: '',
    location: '',
    availability: ''
  },
  
  // Pagination
  pagination: {
    page: 1,
    limit: 9,
    totalPages: 1,
    totalTeachers: 0,
    hasNext: false,
    hasPrev: false
  },
  
  // Error handling
  error: null
};

// Reducer
const teacherReducer = (state, action) => {
  switch (action.type) {
    case TEACHER_ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case TEACHER_ACTION_TYPES.SET_LOADING_TEACHERS:
      return {
        ...state,
        loadingTeachers: action.payload
      };

    case TEACHER_ACTION_TYPES.SET_LOADING_TEACHER:
      return {
        ...state,
        loadingTeacher: action.payload
      };

    case TEACHER_ACTION_TYPES.SET_TEACHERS:
      return {
        ...state,
        teachers: action.payload.teachers || [],
        pagination: {
          ...state.pagination,
          ...action.payload.pagination,
          hasNext: action.payload.pagination 
            ? action.payload.pagination.page < action.payload.pagination.pages
            : false,
          hasPrev: action.payload.pagination 
            ? action.payload.pagination.page > 1
            : false
        },
        loadingTeachers: false,
        error: null
      };

    case TEACHER_ACTION_TYPES.SET_TEACHER:
      return {
        ...state,
        currentTeacher: action.payload,
        loadingTeacher: false,
        error: null
      };

    case TEACHER_ACTION_TYPES.SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        },
        pagination: {
          ...state.pagination,
          page: 1 // Reset to first page when filters change
        }
      };

    case TEACHER_ACTION_TYPES.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
        pagination: {
          ...state.pagination,
          page: 1 // Reset to first page when search changes
        }
      };

    case TEACHER_ACTION_TYPES.SET_PAGINATION:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload
        }
      };

    case TEACHER_ACTION_TYPES.ADD_TEACHER:
      return {
        ...state,
        teachers: [action.payload, ...state.teachers],
        currentTeacher: action.payload,
        updating: false,
        error: null
      };

    case TEACHER_ACTION_TYPES.UPDATE_TEACHER:
      const updatedTeachers = state.teachers.map(teacher =>
        teacher._id === action.payload._id ? action.payload : teacher
      );
      
      return {
        ...state,
        teachers: updatedTeachers,
        currentTeacher: state.currentTeacher?._id === action.payload._id 
          ? action.payload 
          : state.currentTeacher,
        updating: false,
        error: null
      };

    case TEACHER_ACTION_TYPES.DELETE_TEACHER:
      const filteredTeachers = state.teachers.filter(
        teacher => teacher._id !== action.payload
      );
      
      return {
        ...state,
        teachers: filteredTeachers,
        currentTeacher: state.currentTeacher?._id === action.payload 
          ? null 
          : state.currentTeacher,
        deleting: false,
        error: null
      };

    case TEACHER_ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loadingTeachers: false,
        loadingTeacher: false,
        updating: false,
        deleting: false
      };

    case TEACHER_ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case TEACHER_ACTION_TYPES.RESET_STATE:
      return {
        ...initialState,
        teachers: state.teachers, // Keep teachers list on reset
        featuredTeachers: state.featuredTeachers // Keep featured teachers
      };

    default:
      return state;
  }
};

// Create Context
const TeacherContext = createContext();

// Teacher Provider Component
export const TeacherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(teacherReducer, initialState);
  const { isAuthenticated, user } = useAuth();

  // Action Creators
  const actions = {
    setLoading: (loading) => 
      dispatch({ type: TEACHER_ACTION_TYPES.SET_LOADING, payload: loading }),

    setLoadingTeachers: (loading) => 
      dispatch({ type: TEACHER_ACTION_TYPES.SET_LOADING_TEACHERS, payload: loading }),

    setLoadingTeacher: (loading) => 
      dispatch({ type: TEACHER_ACTION_TYPES.SET_LOADING_TEACHER, payload: loading }),

    setTeachers: (data) => 
      dispatch({ type: TEACHER_ACTION_TYPES.SET_TEACHERS, payload: data }),

    setTeacher: (teacher) => 
      dispatch({ type: TEACHER_ACTION_TYPES.SET_TEACHER, payload: teacher }),

    setFilters: (filters) => 
      dispatch({ type: TEACHER_ACTION_TYPES.SET_FILTERS, payload: filters }),

    setSearchQuery: (query) => 
      dispatch({ type: TEACHER_ACTION_TYPES.SET_SEARCH_QUERY, payload: query }),

    setPagination: (pagination) => 
      dispatch({ type: TEACHER_ACTION_TYPES.SET_PAGINATION, payload: pagination }),

    setError: (error) => 
      dispatch({ type: TEACHER_ACTION_TYPES.SET_ERROR, payload: error }),

    clearError: () => 
      dispatch({ type: TEACHER_ACTION_TYPES.CLEAR_ERROR }),

    resetState: () => 
      dispatch({ type: TEACHER_ACTION_TYPES.RESET_STATE }),

    addTeacher: (teacher) => 
      dispatch({ type: TEACHER_ACTION_TYPES.ADD_TEACHER, payload: teacher }),

    updateTeacher: (teacher) => 
      dispatch({ type: TEACHER_ACTION_TYPES.UPDATE_TEACHER, payload: teacher }),

    deleteTeacher: (teacherId) => 
      dispatch({ type: TEACHER_ACTION_TYPES.DELETE_TEACHER, payload: teacherId })
  };

  // Helper function to check if arrays are equal
  const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // Sort arrays to compare regardless of order
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();

    for (let i = 0; i < sortedA.length; i++) {
      if (sortedA[i] !== sortedB[i]) return false;
    }
    return true;
  };

  // Helper function to clean query parameters
  const cleanQueryParams = (params) => {
    const cleaned = { ...params };
    
    Object.keys(cleaned).forEach(key => {
      const value = cleaned[key];
      
      if (value === '' || 
          value === null || 
          value === undefined ||
          (Array.isArray(value) && value.length === 0)) {
        delete cleaned[key];
      }
    });
    
    return cleaned;
  };

  // API Functions
  const fetchTeachers = async (params = {}) => {
    try {
      actions.setLoadingTeachers(true);
      
      const queryParams = cleanQueryParams({
        page: state.pagination.page,
        limit: state.pagination.limit,
        ...state.filters,
        ...params
      });

      const response = await teacherService.getAllTeachers(queryParams);
      const { data: teachers, pagination } = response.data;

      actions.setTeachers({ teachers, pagination });
      
      return { success: true, data: teachers };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to fetch teachers';
      actions.setError(message);
      return { success: false, error: message };
    }
  };

  const searchTeachers = async (searchParams = {}) => {
    try {
      actions.setLoadingTeachers(true);
      
      const params = cleanQueryParams({
        q: state.searchQuery,
        ...state.filters,
        ...searchParams
      });

      const response = await teacherService.searchTeachers(params);
      const teachers = response.data.data;

      actions.setTeachers({ 
        teachers, 
        pagination: { 
          page: 1, 
          pages: 1, 
          total: teachers.length 
        } 
      });
      
      return { success: true, data: teachers };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to search teachers';
      actions.setError(message);
      return { success: false, error: message };
    }
  };

  const fetchTeacherById = async (teacherId) => {
    try {
      actions.setLoadingTeacher(true);
      
      const response = await teacherService.getTeacherById(teacherId);
      const teacher = response.data.data;

      actions.setTeacher(teacher);
      
      return { success: true, data: teacher };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to fetch teacher';
      actions.setError(message);
      return { success: false, error: message };
    }
  };

  const fetchMyProfile = async () => {
    try {
      if (!isAuthenticated) {
        throw new Error('User not authenticated');
      }

      actions.setLoadingTeacher(true);
      
      const response = await teacherService.getMyProfile();
      const teacher = response.data.data;

      actions.setTeacher(teacher);
      
      return { success: true, data: teacher };
    } catch (error) {
      if (error.response?.status === 404) {
        // Profile doesn't exist yet - this is normal
        actions.setTeacher(null);
        return { success: true, data: null };
      }
      
      const message = error.response?.data?.error || 'Failed to fetch your profile';
      actions.setError(message);
      return { success: false, error: message };
    }
  };

  const createTeacherProfile = async (profileData) => {
    try {
      if (!isAuthenticated) {
        throw new Error('User not authenticated');
      }

      actions.setLoading(true);
      
      const response = await teacherService.createTeacher(profileData);
      const teacher = response.data.data;

      actions.addTeacher(teacher);
      toast.success('Profile created successfully!');
      
      return { success: true, data: teacher };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create profile';
      actions.setError(message);
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const updateTeacherProfile = async (teacherId, profileData) => {
    try {
      if (!isAuthenticated) {
        throw new Error('User not authenticated');
      }

      actions.setLoading(true);
      
      const response = await teacherService.updateTeacher(teacherId, profileData);
      const teacher = response.data.data;

      actions.updateTeacher(teacher);
      toast.success('Profile updated successfully!');
      
      return { success: true, data: teacher };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update profile';
      actions.setError(message);
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const deleteTeacherProfile = async (teacherId) => {
    try {
      if (!isAuthenticated) {
        throw new Error('User not authenticated');
      }

      actions.setLoading(true);
      
      await teacherService.deleteTeacher(teacherId);

      actions.deleteTeacher(teacherId);
      toast.success('Profile deleted successfully!');
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to delete profile';
      actions.setError(message);
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Filter and Pagination Helpers
  const clearFilters = () => {
    actions.setFilters(initialState.filters);
    actions.setSearchQuery('');
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= state.pagination.totalPages) {
      actions.setPagination({ page });
    }
  };

  const nextPage = () => {
    if (state.pagination.hasNext) {
      actions.setPagination({ page: state.pagination.page + 1 });
    }
  };

  const prevPage = () => {
    if (state.pagination.hasPrev) {
      actions.setPagination({ page: state.pagination.page - 1 });
    }
  };

  // Utility Functions
  const hasActiveFilters = () => {
    const { filters, searchQuery } = state;
    
    // Check search query
    if (searchQuery && searchQuery.trim() !== '') {
      return true;
    }

    // Check each filter
    return Object.values(filters).some(value => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== '' && value !== null && value !== undefined;
    });
  };

  const getFilterCount = () => {
    let count = 0;
    
    if (state.searchQuery && state.searchQuery.trim() !== '') {
      count++;
    }
    
    Object.values(state.filters).forEach(value => {
      if (Array.isArray(value) && value.length > 0) {
        count++;
      } else if (value !== '' && value !== null && value !== undefined) {
        count++;
      }
    });
    
    return count;
  };

  const isFilterActive = (filterName) => {
    const value = state.filters[filterName];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== '' && value !== null && value !== undefined;
  };

  // Effects
  useEffect(() => {
    // Fetch teachers when filters, search, or pagination changes
    const shouldSearch = state.searchQuery && state.searchQuery.trim() !== '';
    
    if (shouldSearch) {
      searchTeachers();
    } else {
      fetchTeachers();
    }
  }, [
    // Dependencies for filters and search
    state.searchQuery,
    state.pagination.page,
    // Individual filter dependencies to avoid object reference comparisons
    JSON.stringify(state.filters.subjects), // Stringify arrays for comparison
    state.filters.teachingMode,
    state.filters.minExperience,
    state.filters.maxExperience,
    state.filters.minRate,
    state.filters.maxRate,
    state.filters.location
  ]);

  useEffect(() => {
    // Fetch user's profile when authentication state changes
    if (isAuthenticated) {
      fetchMyProfile().catch(console.error);
    } else {
      // Clear current teacher when user logs out
      actions.setTeacher(null);
    }
  }, [isAuthenticated]);

  // Context Value
  const value = {
    // State
    ...state,
    
    // API Actions
    fetchTeachers,
    searchTeachers,
    fetchTeacherById,
    fetchMyProfile,
    createTeacherProfile,
    updateTeacherProfile,
    deleteTeacherProfile,
    
    // Filter and Pagination Actions
    setFilters: actions.setFilters,
    setSearchQuery: actions.setSearchQuery,
    clearFilters,
    goToPage,
    nextPage,
    prevPage,
    
    // Error Handling
    clearError: actions.clearError,
    resetState: actions.resetState,
    
    // Utility Functions
    hasActiveFilters,
    getFilterCount,
    isFilterActive
  };

  return (
    <TeacherContext.Provider value={value}>
      {children}
    </TeacherContext.Provider>
  );
};

// Custom Hook to use Teacher Context
export const useTeacher = () => {
  const context = useContext(TeacherContext);
  
  if (!context) {
    throw new Error('useTeacher must be used within a TeacherProvider');
  }
  
  return context;
};

export default TeacherContext;