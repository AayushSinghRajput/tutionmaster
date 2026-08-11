import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { newsletterService } from '../../services/newsletterService';


const Footer = () => {
  const [email, setEmail] = useState("");
  const handleSubscribe = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address...");
      return;
    }
    try {
      const response = await newsletterService.subscribe(email);
      toast.success(response.data.message);
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  }
  return (
    <footer className="bg-gradient-to-b from-blue-50 to-white text-gray-900 pt-12 sm:pt-16 pb-8 border-t-4 border-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">

          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <BookOpen size={28} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                TutionMaster
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Connecting students with qualified tutors for personalized learning experiences.
              Empowering education through technology and dedicated mentorship.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61577776648214" className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full transition-colors duration-300">
                <Facebook size={18} className="text-blue-600" />
              </a>
              <a href="#" className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full transition-colors duration-300">
                <Twitter size={18} className="text-blue-600" />
              </a>
              <a href="#" className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full transition-colors duration-300">
                <Instagram size={18} className="text-blue-600" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6 relative inline-block">
              Quick Links
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></div>
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/teachers"
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 text-sm flex items-center group"
                >
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                  Find Teachers
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 text-sm flex items-center group"
                >
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 text-sm flex items-center group"
                >
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                  Teacher Login
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 text-sm flex items-center group"
                >
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6 relative inline-block">
              Contact Info
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></div>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Mail size={16} className="text-blue-600" />
                </div>
                <div>
                  <span className="text-sm text-gray-700 block">Email</span>
                  <span className="text-sm text-blue-600 font-medium">aayushsinghrajput3003@gmail.com</span>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Phone size={16} className="text-blue-600" />
                </div>
                <div>
                  <span className="text-sm text-gray-700 block">Phone</span>
                  <span className="text-sm text-blue-600 font-medium">+977 (980) 598-1168</span>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <MapPin size={16} className="text-blue-600" />
                </div>
                <div>
                  <span className="text-sm text-gray-700 block">Address</span>
                  <span className="text-sm text-blue-600 font-medium">Kathmandu, Nepal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-6 relative inline-block">
              Newsletter
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></div>
            </h4>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to get updates on new tutors and educational resources.
            </p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button onClick={handleSubscribe} className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-sm">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-center text-gray-600 text-sm">
              © {new Date().getFullYear()}{" "}
              <span className="text-blue-600 font-semibold">TuitionMaster</span> — All Rights Reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="/cookie-policy" className="text-gray-600 hover:text-blue-600 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;