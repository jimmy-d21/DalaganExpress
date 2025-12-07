import React, { useState, useEffect } from "react";
import MotorCard from "../components/MotorCard";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Bike,
  Navigation,
  Fuel,
  Users,
  Gauge,
  Sparkles,
  Wind,
  Zap,
  X,
} from "lucide-react";

const Motors = () => {
  const {
    motors,
    axios,
    globalSearchQuery,
    globalPickupLocation,
    globalPickupDate,
    globalReturnDate,
    globalBikeType,
    globalSearchMode,
    resetGlobalSearch,
  } = useAppContext();

  const [input, setInput] = useState(globalSearchQuery || "");
  const [filteredMotors, setFilteredMotors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [localBikeType, setLocalBikeType] = useState(globalBikeType || "");

  // Check if we have global search data
  const isGlobalSearch =
    globalSearchMode === "simple" && globalSearchQuery.trim() !== "";
  const isGlobalAdvancedSearch =
    globalSearchMode === "advanced" && globalPickupLocation;

  // Motorcycle types and categories
  const motorTypes = [
    "All",
    "Scooter",
    "Underbone",
    "Big Bike",
    "Sport Bike",
    "Cruiser",
    "Naked",
    "Adventure",
    "Electric",
  ];

  const applyFilter = () => {
    setIsLoading(true);

    let filtered = [...motors]; // Create a copy of all motors

    // Apply text search from global or local
    const searchTerm =
      input.toLowerCase() ||
      (isGlobalSearch ? globalSearchQuery.toLowerCase() : "");
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((motor) => {
        return (
          motor.brand?.toLowerCase().includes(searchTerm) ||
          motor.model?.toLowerCase().includes(searchTerm) ||
          motor.category?.toLowerCase().includes(searchTerm) ||
          motor.fuel_type?.toLowerCase().includes(searchTerm) ||
          motor.transmission?.toLowerCase().includes(searchTerm) ||
          motor.location?.toLowerCase().includes(searchTerm) ||
          (motor.description &&
            motor.description.toLowerCase().includes(searchTerm))
        );
      });
    }

    // Apply type filter ONLY if activeFilter is not "all"
    if (activeFilter !== "all") {
      filtered = filtered.filter((motor) => {
        const motorCategory = motor.category?.toLowerCase();
        const filterTerm = activeFilter.toLowerCase();

        // Handle different naming conventions
        if (filterTerm === "big bike") {
          return (
            motorCategory === "big_bike" ||
            motorCategory?.includes("big") ||
            motor.engine_cc >= 400
          );
        } else if (filterTerm === "sport bike") {
          return (
            motorCategory === "sportbike" || motorCategory?.includes("sport")
          );
        } else {
          return (
            motorCategory?.includes(filterTerm.replace(" ", "_")) ||
            motorCategory?.includes(filterTerm)
          );
        }
      });
    }

    // Apply bike type filter from global or local
    const currentBikeType = localBikeType || globalBikeType;
    if (currentBikeType && currentBikeType.trim() !== "") {
      filtered = filtered.filter((motor) => {
        const motorCategory = motor.category?.toLowerCase();
        const searchBikeType = currentBikeType.toLowerCase();

        return (
          motorCategory?.includes(searchBikeType) ||
          motor.brand?.toLowerCase().includes(searchBikeType) ||
          motor.model?.toLowerCase().includes(searchBikeType)
        );
      });
    }

    setFilteredMotors(filtered);
    setIsLoading(false);
  };

  useEffect(() => {
    // Initialize local state with global search values
    if (globalSearchMode === "simple" && globalSearchQuery) {
      setInput(globalSearchQuery);
    } else if (globalSearchMode === "advanced") {
      setLocalBikeType(globalBikeType || "");
    }

    // Apply filters initially
    setIsLoading(true);

    // Check if motors data is available
    if (motors && motors.length > 0) {
      setFilteredMotors(motors);
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        if (motors && motors.length === 0) {
          setFilteredMotors([]);
          setIsLoading(false);
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Apply filter if we have motors data
    if (motors && motors.length > 0) {
      applyFilter();
    }
  }, [input, motors, activeFilter, localBikeType]);

  // Reset to show all motors when clearing search
  const clearFilters = () => {
    setInput("");
    setActiveFilter("all");
    setLocalBikeType("");
    resetGlobalSearch(); // Reset global search too

    if (motors && motors.length > 0) {
      setFilteredMotors(motors);
    }
  };

  // Handle text search from this page
  const handleTextSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      applyFilter();
    }
  };

  // Handle case when motors data is still loading
  const showLoading = isLoading || motors === undefined;
  const showMotors = !showLoading && filteredMotors.length > 0;
  const showEmptyState = !showLoading && filteredMotors.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-red-50/20"
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-red-900 to-orange-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-24">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-full">
              <Bike className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-orange-300">
                Premium Motorcycle Fleet
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {isGlobalSearch ? (
                <>
                  Search Results for{" "}
                  <span className="bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                    "{globalSearchQuery}"
                  </span>
                </>
              ) : (
                <>
                  Explore Our{" "}
                  <span className="bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                    Premium Motorcycle Collection
                  </span>
                </>
              )}
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {isGlobalSearch
                ? "Find the perfect motorcycle for your needs"
                : "Discover the perfect ride for your Negros adventure. From scooters for city commuting to powerful big bikes for long journeys."}
            </p>
          </motion.div>

          {/* Search Stats */}
          {isGlobalSearch && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 max-w-3xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl">
                      <Search className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Search Term</p>
                      <p className="font-semibold">"{globalSearchQuery}"</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-red-700 font-semibold rounded-xl transition-all"
                  >
                    <X className="w-4 h-4" />
                    Clear Search
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto mb-12"
        >
          {/* Text Search Bar */}
          <div className="relative mb-8">
            <form onSubmit={handleTextSearch}>
              <div className="relative">
                <input
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type="text"
                  placeholder="Search motorcycles by brand, model, or features..."
                  className="w-full pl-14 pr-12 py-4 bg-white border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-lg transition-all"
                  disabled={showLoading}
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Filter className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </form>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-3">
            {motorTypes.map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  !showLoading && setActiveFilter(type.toLowerCase())
                }
                disabled={showLoading}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === type.toLowerCase()
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                {type === "Big Bike" ? (
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {type}
                  </span>
                ) : type === "Sport Bike" ? (
                  <span className="flex items-center gap-1">
                    <Wind className="w-3 h-3" /> {type}
                  </span>
                ) : type === "Electric" ? (
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {type}
                  </span>
                ) : (
                  type
                )}
              </motion.button>
            ))}

            {/* Engine Size Quick Filters */}
            {!showLoading && motors && motors.length > 0 && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const filtered = motors.filter((m) => m.engine_cc <= 150);
                    setFilteredMotors(filtered);
                    setActiveFilter("small");
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === "small"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  ≤150cc
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const filtered = motors.filter(
                      (m) => m.engine_cc > 150 && m.engine_cc < 400
                    );
                    setFilteredMotors(filtered);
                    setActiveFilter("medium");
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === "medium"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                  }`}
                >
                  151-399cc
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const filtered = motors.filter((m) => m.engine_cc >= 400);
                    setFilteredMotors(filtered);
                    setActiveFilter("big");
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === "big"
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  ≥400cc
                </motion.button>
              </>
            )}

            {/* Clear Filters Button */}
            {(input.trim() !== "" ||
              activeFilter !== "all" ||
              localBikeType) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                disabled={showLoading}
                className="px-6 py-3 rounded-full font-medium bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Clear All Filters
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Available Motorcycles
              </h2>
              {!showLoading && motors && (
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <p className="text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-red-600">
                      {filteredMotors.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {motors.length}
                    </span>{" "}
                    motorcycles
                  </p>
                  {isGlobalSearch && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      Search: "{globalSearchQuery}"
                    </span>
                  )}
                  {activeFilter !== "all" && !isGlobalSearch && (
                    <span className="px-2 py-1 bg-gradient-to-r from-red-50 to-orange-50 text-red-700 rounded-full text-sm font-medium">
                      {activeFilter.charAt(0).toUpperCase() +
                        activeFilter.slice(1)}
                    </span>
                  )}
                  {input.trim() !== "" && !isGlobalSearch && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      "{input}"
                    </span>
                  )}
                </div>
              )}
            </div>

            {!showLoading && motors && motors.length > 0 && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Gauge className="w-4 h-4 text-red-500" />
                  <span>
                    {(motors.reduce((acc, m) => acc + m.engine_cc, 0) /
                      motors.length) |
                      0}
                    cc avg
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Fuel className="w-4 h-4 text-green-500" />
                  <span>Various Fuel Types</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        {showLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mb-4"></div>
              <Bike className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-red-500 animate-pulse" />
            </div>
            <p className="text-gray-600">Loading premium motorcycles...</p>
          </motion.div>
        ) : showMotors ? (
          /* Motors Grid */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMotors.map((motor, index) => (
                <motion.div
                  key={motor._id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <MotorCard motor={motor} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : showEmptyState ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
              <Bike className="w-12 h-12 text-red-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No Motorcycles Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {isGlobalSearch
                ? `No motorcycles match your search for "${globalSearchQuery}"`
                : input
                ? `No motorcycles match your search for "${input}"`
                : activeFilter !== "all"
                ? `No ${activeFilter} motorcycles available`
                : motors && motors.length === 0
                ? "No motorcycles available in our fleet"
                : "No motorcycles match your criteria"}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {(input.trim() !== "" ||
                activeFilter !== "all" ||
                isGlobalSearch) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  View All Motorcycles
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="px-6 py-3 border-2 border-red-500 text-red-500 font-semibold rounded-xl hover:bg-red-50 transition-all"
              >
                Refresh Results
              </motion.button>
            </div>
          </motion.div>
        ) : null}

        {/* Features Section */}
        {showMotors && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-6xl mx-auto mt-20"
          >
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 md:p-12 border border-red-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl mb-4">
                    <Sparkles className="w-8 h-8 text-red-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Adventure Ready
                  </h4>
                  <p className="text-gray-600">
                    Perfect for Negros Island roads
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-4 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl mb-4">
                    <Gauge className="w-8 h-8 text-red-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Powerful Selection
                  </h4>
                  <p className="text-gray-600">From 50cc to 750cc+ engines</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-4 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl mb-4">
                    <Users className="w-8 h-8 text-red-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Safety First
                  </h4>
                  <p className="text-gray-600">Helmets & insurance included</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-12">
                <p className="text-gray-700 mb-6">
                  Need help choosing the perfect motorcycle for your Negros
                  adventure?
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Contact Our Riding Experts
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Motors;
