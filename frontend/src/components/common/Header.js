import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LogOut } from 'lucide-react';

const Logo = ({ size = 30 }) => (
  <img
    src="/logo.png"
    alt="TuitionMaster"
    className="rounded-lg shrink-0 object-cover"
    style={{ width: size, height: size }}
  />
);

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
    <header className="bg-white shadow-sm border-b border-stone-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <Logo size={30} />
            <span className="text-lg sm:text-xl font-serif font-bold text-gray-900 tracking-tight truncate">TuitionMaster</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/teachers"
              className="text-gray-700 hover:text-brand-700 transition-all font-medium text-base"
            >
              Find a Tutor
            </Link>

            <Link
              to="/how-it-works"
              className="text-gray-700 hover:text-brand-700 font-medium text-base"
            >
              How it Works
            </Link>

            <Link
              to="/about"
              className="text-gray-700 hover:text-brand-700 font-medium text-base"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-brand-700 font-medium text-base"
            >
              Contact
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-5 pl-2 border-l border-stone-200">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-brand-700 transition-all font-medium text-base"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-all font-medium text-base"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-2 border-l border-stone-200">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-brand-700 transition-all font-medium text-base"
                >
                  Log in
                </Link>

                <Link to="/register" className="btn-brand-primary text-sm px-4 py-2">
                  Become a Tutor
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 sm:p-3 -mr-2 rounded-lg text-gray-700 hover:bg-stone-100 transition shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-stone-200 bg-white animate-fadeIn max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col py-2">

              <Link
                to="/"
                className="text-gray-700 hover:text-brand-700 hover:bg-stone-50 font-medium text-base py-2.5 px-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/teachers"
                className="text-gray-700 hover:text-brand-700 hover:bg-stone-50 font-medium text-base py-2.5 px-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Find a Tutor
              </Link>

              <Link
                to="/how-it-works"
                className="text-gray-700 hover:text-brand-700 hover:bg-stone-50 font-medium text-base py-2.5 px-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </Link>

              <Link
                to="/about"
                className="text-gray-700 hover:text-brand-700 hover:bg-stone-50 font-medium text-base py-2.5 px-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              <Link
                to="/contact"
                className="text-gray-700 hover:text-brand-700 hover:bg-stone-50 font-medium text-base py-2.5 px-3 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-brand-700 hover:bg-stone-50 font-medium text-base py-2.5 px-3 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-left text-gray-700 hover:text-red-600 hover:bg-stone-50 font-medium text-base py-2.5 px-3 rounded-lg"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-2 px-1">
                  <Link
                    to="/login"
                    className="btn-brand-ghost text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Link>

                  <Link
                    to="/register"
                    className="btn-brand-primary text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Become a Tutor
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
