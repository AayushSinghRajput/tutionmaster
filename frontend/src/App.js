import { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import { startBackendKeepAlive } from "./utils/seo/keepBackendAlive";

// Context providers
import { AuthProvider } from "./context/AuthContext";
import { TeacherProvider } from "./context/TeacherContext";

// Components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ChatWidget from "./components/ai/ChatWidget";

// Protected Route
import ProtectedRoute from "./components/common/ProtectedRoute";

// Pages — lazy-loaded so each route ships its own chunk instead of one
// ever-growing bundle for the whole app.
const Home = lazy(() => import("./pages/Home"));
const TeacherListing = lazy(() => import("./pages/TeacherListing"));
const TeacherDetails = lazy(() => import("./pages/TeacherDetails"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CreateProfile = lazy(() => import("./pages/CreateProfile"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const TeacherProfileDemo = lazy(() => import("./pages/TeacherProfileDemo"));

function App() {
  useEffect(() => {
    const cleanup = startBackendKeepAlive();

    return cleanup;
  }, []);
  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
    >
      <AuthProvider>
        <TeacherProvider>
          <div className=" min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1 pt-16 sm:pt-20">
              <Suspense
                fallback={<LoadingSpinner fullScreen text="Loading..." />}
              >
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
                  <Route
                    path="/terms-of-service"
                    element={<TermsOfService />}
                  />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route
                    path="/how-it-works/teacher-profile"
                    element={<TeacherProfileDemo />}
                  />

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
              </Suspense>
            </main>
            <Footer />
            <ChatWidget />
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
    </GoogleOAuthProvider>
  );
}

export default App;
