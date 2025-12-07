import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import {
  LogOut,
  User,
  ChevronDown,
  Settings,
  Home,
  Bike,
  Heart,
  Calendar,
  Shield,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const NavbarOwner = () => {
  const { user, logout, navigate } = useAppContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-700 border-b border-gray-200 bg-white shadow-sm relative transition-all">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-12 h-12 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow border-2 border-blue-600"
          >
            <img
              src="/dalagan-express.jpg"
              alt="Dalagan Express Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80";
              }}
            />
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -inset-1 border-2 border-orange-400/30 rounded-full"
          ></motion.div>
        </div>
        <div className="flex flex-col">
          <span className={`text-2xl font-bold text-blue-800 -mb-1`}>
            Dalagan
          </span>
          <span className="text-lg font-bold text-yellow-500 ">Express</span>
        </div>
      </Link>

      {/* User Section */}
      <div className="flex items-center gap-6">
        {/* Welcome Message */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm text-gray-500">Welcome back,</span>
          <span className="font-semibold text-gray-800">
            {user?.name || "Owner"}
          </span>
        </div>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase() || "O"}
            </div>
            <div className="hidden md:block text-left">
              <p className="font-medium text-gray-800">
                {user?.name || "Owner"}
              </p>
              <p className="text-xs text-gray-500">Owner Account</p>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </motion.button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
            >
              {/* User Info Section */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase() || "O"}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {user?.name || "Owner"}
                    </h3>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                      🏍️ Motor Owner
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Link
                  to="/"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <Home className="w-4 h-4 text-gray-500" />
                  <span>Home</span>
                </Link>

                <Link
                  to="/bookings"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Bookings</span>
                </Link>

                <Link
                  to="/favorites"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <Heart className="w-4 h-4 text-gray-500" />
                  <span>Favorites</span>
                </Link>

                <div className="border-t border-gray-200 my-2"></div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Owner Account</span>
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Protected
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {showDropdown ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Dropdown */}
      {showDropdown && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40"
        >
          <div className="p-4">
            <div className="mb-4">
              <p className="text-sm text-gray-500">Welcome back,</p>
              <p className="font-semibold text-gray-800">
                {user?.name || "Owner"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate("/owner/motors");
                  setShowDropdown(false);
                }}
                className="flex flex-col items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Bike className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">My Motors</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate("/owner/add-motor");
                  setShowDropdown(false);
                }}
                className="flex flex-col items-center justify-center p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Bike className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">Add Motor</span>
              </motion.button>
            </div>

            <div className="space-y-2">
              <Link
                to="/"
                className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <Home className="w-4 h-4 text-gray-500" />
                <span>Home</span>
              </Link>

              <Link
                to="/owner/bookings"
                className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Bookings</span>
              </Link>

              <Link
                to="/favorites"
                className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <Heart className="w-4 h-4 text-gray-500" />
                <span>Favorites</span>
              </Link>

              <div className="border-t border-gray-200 my-2"></div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NavbarOwner;
