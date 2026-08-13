import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

function Bomb() {
  throw new Error('boom');
}

test('renders a fallback instead of crashing when a child throws', () => {
  // React (and this boundary's componentDidCatch) log to console.error —
  // expected noise for this test, not a real failure.
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

  render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );

  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

  spy.mockRestore();
});

test('renders children normally when nothing throws', () => {
  render(
    <ErrorBoundary>
      <div>All good</div>
    </ErrorBoundary>
  );

  expect(screen.getByText('All good')).toBeInTheDocument();
});
