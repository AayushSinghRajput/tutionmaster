import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/layout/AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TeachersPage from './pages/TeachersPage';
import TeacherDetailPage from './pages/TeacherDetailPage';
import AdministratorsPage from './pages/AdministratorsPage';
import ReviewsPage from './pages/ReviewsPage';
import BlogListPage from './pages/BlogListPage';
import BlogEditorPage from './pages/BlogEditorPage';
import JobListPage from './pages/JobListPage';
import JobEditorPage from './pages/JobEditorPage';
import ManualTutorCreationPage from './pages/ManualTutorCreationPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Protected admin routes */}
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard"      element={<DashboardPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/teachers/create-manual" element={<ManualTutorCreationPage />} />
            <Route path="/teachers/:id" element={<TeacherDetailPage />} />
            <Route path="/blogs"          element={<BlogListPage />} />
            <Route path="/blogs/new"      element={<BlogEditorPage />} />
            <Route path="/blogs/:id/edit" element={<BlogEditorPage />} />
            <Route path="/jobs"           element={<JobListPage />} />
            <Route path="/jobs/new"       element={<JobEditorPage />} />
            <Route path="/jobs/:id/edit"  element={<JobEditorPage />} />
            <Route path="/reviews"        element={<ReviewsPage />} />
            <Route path="/administrators" element={<AdministratorsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #334155',
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#22c55e', secondary: '#052e16' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#450a0a' } },
        }}
      />
    </AuthProvider>
  );
}
