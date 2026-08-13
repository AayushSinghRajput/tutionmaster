import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/common/ErrorBoundary';
import './index.css';

// AuthProvider lives inside App.js (alongside GoogleOAuthProvider and
// TeacherProvider, which itself depends on auth context) — do not wrap it
// again here, or the app mounts two independent auth states and fires two
// /api/auth/me calls on every load.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);