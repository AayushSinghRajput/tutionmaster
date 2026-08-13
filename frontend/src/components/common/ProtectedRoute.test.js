import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../../context/AuthContext';

jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

function renderProtectedRoute() {
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div>Secret Dashboard</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

test('redirects to /login when not authenticated', () => {
  useAuth.mockReturnValue({ isAuthenticated: false, loading: false });
  renderProtectedRoute();
  expect(screen.getByText('Login Page')).toBeInTheDocument();
});

test('renders children when authenticated', () => {
  useAuth.mockReturnValue({ isAuthenticated: true, loading: false });
  renderProtectedRoute();
  expect(screen.getByText('Secret Dashboard')).toBeInTheDocument();
});

test('shows a loading state while auth status is being checked', () => {
  useAuth.mockReturnValue({ isAuthenticated: false, loading: true });
  renderProtectedRoute();
  expect(screen.getByText(/checking authentication/i)).toBeInTheDocument();
});
