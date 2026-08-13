import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authSerive';

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
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authService.getCurrentUser();
        setUser(userData); // persist user after refresh
      }
    } catch (err) {
      localStorage.removeItem('token');
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

      localStorage.setItem('token', token);
      setUser(userData);

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Login failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const register = async (username, email, password, confirmPassword) => {
    try {
      setError('');
      const response = await authService.register(username, email, password, confirmPassword);
      const { token, user: userData } = response.data;

      localStorage.setItem('token', token);
      setUser(userData);

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Registration failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const loginWithGoogle = async (credential) => {
    try {
      setError('');
      const response = await authService.googleLogin(credential);
      const { token, user: userData } = response.data;

      localStorage.setItem('token', token);
      setUser(userData);

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Google sign-in failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    // Update UI state immediately so logout feels instant regardless of
    // network conditions. The API call happens in the background — but the
    // request interceptor (services/api.js) reads the token from
    // localStorage asynchronously, after this function returns, so the
    // token must stay in storage until that request has actually been
    // sent (not removed synchronously here) or it goes out unauthenticated
    // and never reaches the tokenVersion bump on the backend.
    setUser(null);
    setError('');
    authService.logout().catch(() => {}).finally(() => {
      localStorage.removeItem('token');
    });
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
