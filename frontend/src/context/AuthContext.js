import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authSerive';
import api, { setAccessToken } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      // Attempt to refresh the token using the HttpOnly cookie
      const response = await api.get('/auth/refresh');
      setAccessToken(response.data.token);
      
      // If refresh succeeded, fetch user profile
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (err) {
      // No valid cookie, user is logged out
      setAccessToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError('');
      const response = await authService.login(email, password);
      const { token, user: userData } = response.data;

      setAccessToken(token);
      setUser(userData);

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Login failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const register = async (username, email, password, confirmPassword, role) => {
    try {
      setError('');
      const response = await authService.register(username, email, password, confirmPassword, role);
      const { token, user: userData } = response.data;

      setAccessToken(token);
      setUser(userData);

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Registration failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const loginWithGoogle = async (credential, role) => {
    try {
      setError('');
      const response = await authService.googleLogin(credential, role);
      const { token, user: userData } = response.data;

      setAccessToken(token);
      setUser(userData);

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Google sign-in failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    setError('');
    authService.logout().catch(() => {});
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
