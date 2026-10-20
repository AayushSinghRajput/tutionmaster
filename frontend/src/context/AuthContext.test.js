import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from './AuthContext';
import { authService } from '../services/authSerive';
import api, { setAccessToken } from '../services/api';

jest.mock('axios', () => ({
  create: () => ({
    get: jest.fn().mockResolvedValue({ data: { token: 'test-token' } }),
    post: jest.fn().mockResolvedValue({ data: { success: true } }),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  }),
}));

jest.mock('../services/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn().mockResolvedValue({ data: { success: true } }),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  },
  setAccessToken: jest.fn(),
}));

jest.mock('../services/authSerive', () => ({
  authService: {
    login: jest.fn(),
    register: jest.fn(),
    googleLogin: jest.fn(),
    getCurrentUser: jest.fn(),
    logout: jest.fn(),
  },
}));

function TestHarness() {
  const { isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="auth-state">{isAuthenticated ? 'in' : 'out'}</span>
      <button onClick={() => login('a@b.com', 'password123')}>login</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  api.get.mockResolvedValue({ data: { token: 'mock-token' } });
});

test('login stores a token and flips isAuthenticated', async () => {
  api.get.mockRejectedValueOnce(new Error('No session'));
  authService.login.mockResolvedValue({
    data: { token: 'abc123', user: { id: '1', email: 'a@b.com', role: 'teacher' } },
  });

  render(
    <AuthProvider>
      <TestHarness />
    </AuthProvider>
  );
  await screen.findByText('out');

  await userEvent.click(screen.getByText('login'));

  await waitFor(() => expect(screen.getByTestId('auth-state')).toHaveTextContent('in'));
  expect(setAccessToken).toHaveBeenCalledWith('abc123');
});

test('logout clears local auth state immediately and calls the backend', async () => {
  authService.getCurrentUser.mockResolvedValue({ id: '1', email: 'a@b.com', role: 'teacher' });
  authService.logout.mockResolvedValue({ data: { success: true } });

  render(
    <AuthProvider>
      <TestHarness />
    </AuthProvider>
  );
  await waitFor(() => expect(screen.getByTestId('auth-state')).toHaveTextContent('in'));

  await userEvent.click(screen.getByText('logout'));

  expect(screen.getByTestId('auth-state')).toHaveTextContent('out');
  expect(authService.logout).toHaveBeenCalledTimes(1);
  expect(setAccessToken).toHaveBeenCalledWith(null);
});

test('a failed backend logout call still clears the token locally', async () => {
  authService.getCurrentUser.mockResolvedValue({ id: '1', email: 'a@b.com', role: 'teacher' });
  authService.logout.mockRejectedValue(new Error('network error'));

  render(
    <AuthProvider>
      <TestHarness />
    </AuthProvider>
  );
  await waitFor(() => expect(screen.getByTestId('auth-state')).toHaveTextContent('in'));

  await userEvent.click(screen.getByText('logout'));

  expect(screen.getByTestId('auth-state')).toHaveTextContent('out');
  expect(setAccessToken).toHaveBeenCalledWith(null);
});
