import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User, LogOut, BookOpen } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BookOpen size={34} className="text-blue-700" />
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">TutionMaster</h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-700 transition-all font-medium text-lg"
            >
              Home
            </Link>

            <Link
              to="/teachers"
              className="text-gray-700 hover:text-blue-700 transition-all font-medium text-lg"
            >
              Find Teachers
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-6">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition-all font-medium text-lg"
                >
                  <User size={20} />
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-all font-medium text-lg"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-700 transition-all font-medium text-lg"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-700 text-white px-6 py-2.5 rounded-lg hover:bg-blue-800 transition-all font-semibold shadow-sm text-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-200 bg-white animate-fadeIn">
            <div className="flex flex-col space-y-4 py-4">

              <Link
                to="/"
                className="text-gray-700 hover:text-blue-700 font-medium text-lg px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/teachers"
                className="text-gray-700 hover:text-blue-700 font-medium text-lg px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Teachers
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-blue-700 font-medium text-lg px-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-red-600 font-medium text-lg px-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-700 font-medium text-lg px-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="bg-blue-700 text-white px-6 py-2 rounded-lg text-center hover:bg-blue-800 transition font-semibold shadow-sm mx-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
