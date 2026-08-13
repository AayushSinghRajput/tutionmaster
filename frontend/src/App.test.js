import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Render the real provider tree (AuthProvider, TeacherProvider, etc. — all
// live inside App.js, see index.js), but stub the network layer so this
// smoke test doesn't depend on a running backend. TeacherProvider fetches
// teachers on mount, so every request just resolves to an empty page.
jest.mock('axios', () => ({
  create: () => ({
    get: jest.fn().mockResolvedValue({
      data: {
        success: true,
        data: [],
        pagination: { page: 1, pages: 1, total: 0 },
        total: 0,
        count: 0,
      },
    }),
    post: jest.fn().mockResolvedValue({ data: { success: true } }),
    put: jest.fn().mockResolvedValue({ data: { success: true } }),
    delete: jest.fn().mockResolvedValue({ data: { success: true } }),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  }),
}));

test('renders the app shell (header + routed page) without crashing', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByRole('banner')).toBeInTheDocument();
});
