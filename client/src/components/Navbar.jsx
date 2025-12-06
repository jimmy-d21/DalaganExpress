import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  User,
  LogOut,
  List,
  Bell,
  ChevronDown,
  Heart,
} from "lucide-react";

const Navbar = () => {
  const {
    setShowLogin,
    user,
    logout,
    isOwner,
    setIsOwner,
    axios,
    fetchUser,
    token,
  } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isHomePage = location.pathname === "/";

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
        await fetchUser();
        navigate("/owner");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/motors?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  const handleLinkClick = (path) => {
    // Navigate to the route
    navigate(path);
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`sticky top-0 z-50 w-full ${
        isHomePage
          ? "bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-orange-900/70 backdrop-blur-md"
          : "bg-white/90 backdrop-blur-md border-b border-gray-200"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-12 h-12 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow"
                >
                  <img
                    src="/dalagan-express.jpg"
                    alt="Dalagan Express Logo"
                    className="w-full h-full object-cover"
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
                <span className={`text-2xl font-semibold text-blue-800 -mb-1`}>
                  Dalagan
                </span>
                <span className="text-lg font-semibold text-yellow-300 ">
                  Express
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Menu Links */}
            <div className="flex items-center gap-8">
              {menuLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {(link.name !== "My Bookings" || token) && (
                    <div
                      onClick={() => handleLinkClick(link.path)}
                      className={`relative font-medium px-1 py-2 transition-colors cursor-pointer ${
                        isHomePage
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-700 hover:text-gray-900"
                      } ${
                        location.pathname === link.path
                          ? isHomePage
                            ? "text-white"
                            : "text-gray-900"
                          : ""
                      }`}
                    >
                      {link.name}
                      {location.pathname === link.path && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Search Bar */}
            <motion.form
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onSubmit={handleSearch}
              className="relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search motorcycles..."
                className={`pl-12 pr-4 py-2.5 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                  isHomePage
                    ? "bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:bg-white/20"
                    : "bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 focus:bg-white"
                }`}
              />
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isHomePage ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </motion.form>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all ${
                      isHomePage
                        ? "bg-white/10 hover:bg-white/20 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">
                      {user.name?.split(" ")[0] || "User"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        showUserMenu ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                        onMouseLeave={() => setShowUserMenu(false)}
                      >
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {user.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-2">
                          {user?.role === "owner" && isOwner ? (
                            <button
                              onClick={() => handleLinkClick("/owner")}
                              className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <span>Owner Dashboard</span>
                            </button>
                          ) : (
                            <button
                              onClick={changeRole}
                              className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <List className="w-4 h-4 text-orange-500" />
                              <span>List Your Bike</span>
                            </button>
                          )}

                          <div
                            onClick={() => handleLinkClick(`/bookings`)}
                            className="flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Bell className="w-4 h-4 text-blue-500" />
                            <span>My Bookings</span>
                          </div>
                          <div
                            onClick={() => handleLinkClick(`/favorite`)}
                            className="flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Heart className="w-4 h-4 text-blue-500" />
                            <span>Favorite</span>
                          </div>

                          <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLogin(true)}
                  className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Login / Signup</span>
                </motion.button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg ${
              isHomePage
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden overflow-hidden ${
              isHomePage
                ? "bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-orange-900/80 backdrop-blur-md"
                : "bg-white/95 backdrop-blur-md border-t border-gray-200"
            }`}
          >
            <div className="container mx-auto px-4 py-6">
              {/* Mobile Search */}
              <motion.form
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSearch}
                className="mb-6"
              >
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search motorcycles..."
                    className={`w-full pl-12 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      isHomePage
                        ? "bg-white/10 text-white placeholder-gray-400 border border-white/20"
                        : "bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200"
                    }`}
                  />
                  <Search
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      isHomePage ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                </div>
              </motion.form>

              {/* Mobile Links */}
              <div className="space-y-2">
                {menuLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    {(link.name !== "My Bookings" || token) && (
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                          isHomePage
                            ? location.pathname === link.path
                              ? "bg-white/20 text-white"
                              : "text-gray-300 hover:bg-white/10 hover:text-white"
                            : location.pathname === link.path
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {link.icon && <link.icon className="w-5 h-5" />}
                        <span className="font-medium">{link.name}</span>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Mobile User Actions */}
              <div className="mt-6 pt-6 border-t border-white/20">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p
                          className={`font-semibold ${
                            isHomePage ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {user.name}
                        </p>
                        <p
                          className={`text-sm ${
                            isHomePage ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {user?.role === "owner" && isOwner ? (
                      <button
                        onClick={() => {
                          handleLinkClick(`/owner`);
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <span>Owner Dashboard</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          changeRole();
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-colors ${
                          isHomePage
                            ? "hover:bg-white/10 text-white"
                            : "hover:bg-gray-100 text-gray-900"
                        }`}
                      >
                        <List className="w-5 h-5" />
                        <span>List Your Bike</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowLogin(true);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg"
                  >
                    <User className="w-5 h-5" />
                    <span>Login / Signup</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
