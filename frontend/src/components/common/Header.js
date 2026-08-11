import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LogOut, BookOpen } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <BookOpen size={28} className="text-blue-700 shrink-0 sm:w-[34px] sm:h-[34px]" />
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight truncate">TuitionMaster</h1>
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

              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-700 font-medium text-lg px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-700 font-medium text-lg px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-6">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition-all font-medium text-lg"
                >
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
            className="md:hidden p-2 sm:p-3 -mr-2 rounded-lg text-gray-700 hover:bg-gray-100 transition shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-200 bg-white animate-fadeIn max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col py-2">

              <Link
                to="/"
                className="text-gray-700 hover:text-blue-700 hover:bg-gray-50 font-medium text-base py-2.5 px-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/teachers"
                className="text-gray-700 hover:text-blue-700 hover:bg-gray-50 font-medium text-base py-2.5 px-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Teachers
              </Link>

              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-700 hover:bg-gray-50 font-medium text-base py-2.5 px-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-700 hover:bg-gray-50 font-medium text-base py-2.5 px-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-blue-700 hover:bg-gray-50 font-medium text-base py-2.5 px-3 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-left text-gray-700 hover:text-red-600 hover:bg-gray-50 font-medium text-base py-2.5 px-3 rounded-lg"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-2 px-1">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-700 hover:bg-gray-50 font-medium text-base py-2.5 px-3 rounded-lg text-center border border-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="bg-blue-700 text-white py-2.5 px-6 rounded-lg text-center hover:bg-blue-800 transition font-semibold shadow-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
