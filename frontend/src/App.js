import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context providers
import { AuthProvider } from "./context/AuthContext";
import { TeacherProvider } from "./context/TeacherContext";

// Components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

// Pages
import Home from "./pages/Home";
import TeacherListing from "./pages/TeacherListing";
import TeacherDetails from "./pages/TeacherDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/CreateProfile";
import EditProfile from "./pages/EditProfile";
import About from "./pages/About";
import Contact from  './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

// Protected Route
import ProtectedRoute from "./components/common/ProtectedRoute";


function App() {
  return (
    <AuthProvider>
      <TeacherProvider>
        <div className=" min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-1 pt-16">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/teachers" element={<TeacherListing />} />
              <Route path="/teachers/:id" element={<TeacherDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />


              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-profile"
                element={
                  <ProtectedRoute>
                    <CreateProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </TeacherProvider>
    </AuthProvider>
  );
}

export default App;