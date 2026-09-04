import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/layout/AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TeachersPage from './pages/TeachersPage';
import TeacherDetailPage from './pages/TeacherDetailPage';
import RequirementsPage from './pages/RequirementsPage';
import CurriculumPage from './pages/CurriculumPage';
import AdministratorsPage from './pages/AdministratorsPage';
import ReviewsPage from './pages/ReviewsPage';
import BlogListPage from './pages/BlogListPage';
import BlogEditorPage from './pages/BlogEditorPage';
import JobListPage from './pages/JobListPage';
import JobEditorPage from './pages/JobEditorPage';
import ManualTutorCreationPage from './pages/ManualTutorCreationPage';
import SupportTicketsPage from './pages/SupportTicketsPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Protected admin routes */}
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/teachers/create-manual" element={<ManualTutorCreationPage />} />
            <Route path="/teachers/:id" element={<TeacherDetailPage />} />
            <Route path="/requirements" element={<RequirementsPage />} />
            <Route path="/curriculum" element={<CurriculumPage />} />
            <Route path="/blogs" element={<BlogListPage />} />
            <Route path="/blogs/new" element={<BlogEditorPage />} />
            <Route path="/blogs/:id/edit" element={<BlogEditorPage />} />
            <Route path="/jobs" element={<JobListPage />} />
            <Route path="/jobs/new" element={<JobEditorPage />} />
            <Route path="/jobs/:id/edit" element={<JobEditorPage />} />
            <Route path="/support-tickets" element={<SupportTicketsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
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
            background: '#111726',
            color: '#f8fafc',
            border: '1px solid #243048',
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
            borderRadius: '10px',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#052e16' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#450a0a' } },
        }}
      />
    </AuthProvider>
  );
}
