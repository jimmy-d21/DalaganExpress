import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Trash2,
  Fuel,
  MapPin,
  Calendar,
  Star,
  Filter,
  Search,
  Users,
  Settings,
  Gauge,
  Zap,
  Clock,
  Battery,
  Shield,
  ShieldCheck,
  CheckCircle,
  X,
  Phone,
  Mail,
  Share2,
  User,
  Bike,
  Sparkles,
  Thermometer,
  Droplets,
  Bell,
  Car as CarIcon,
  Motorbike,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Favorite = () => {
  const { navigate, axios, user } = useAppContext();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedMotor, setSelectedMotor] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch user's favorite motors
  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/motor/user/favorites");
      if (response.data.success) {
        // Transform the data to match the existing structure
        const transformedFavorites = response.data.favorites.map(
          (motor, index) => ({
            id: motor._id || `motor-${index}`,
            motor: motor,
            addedAt: "Recently",
            addedBy: user?.name || "You",
          })
        );
        setFavorites(transformedFavorites);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter options for motorcycles
  const filterOptions = [
    { id: "all", label: "All Motors", count: favorites.length },
    {
      id: "scooter",
      label: "Scooter",
      icon: "🛵",
      count: favorites.filter(
        (f) =>
          f.motor.category?.toLowerCase() === "scooter" ||
          f.motor.type?.toLowerCase() === "scooter"
      ).length,
    },
    {
      id: "underbone",
      label: "Underbone",
      icon: "🏍️",
      count: favorites.filter(
        (f) => f.motor.category?.toLowerCase() === "underbone"
      ).length,
    },
    {
      id: "big-bike",
      label: "Big Bike",
      icon: "⚡",
      count: favorites.filter(
        (f) =>
          f.motor.category?.toLowerCase() === "big bike" ||
          f.motor.category?.toLowerCase().includes("big")
      ).length,
    },
    {
      id: "electric",
      label: "Electric",
      icon: "🔋",
      count: favorites.filter(
        (f) => f.motor.fuel_type?.toLowerCase() === "electric"
      ).length,
    },
    {
      id: "manual",
      label: "Manual",
      icon: "⚙️",
      count: favorites.filter(
        (f) => f.motor.transmission?.toLowerCase() === "manual"
      ).length,
    },
  ];

  // Filter and search favorites
  const filteredFavorites = favorites.filter((favorite) => {
    const matchesSearch =
      searchTerm === "" ||
      favorite.motor.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      favorite.motor.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      favorite.motor.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "all" ||
      favorite.motor.category?.toLowerCase().includes(activeFilter) ||
      favorite.motor.fuel_type?.toLowerCase() === activeFilter ||
      favorite.motor.transmission?.toLowerCase() === activeFilter;

    return matchesSearch && matchesFilter;
  });

  // Remove favorite
  const removeFavorite = async (id) => {
    try {
      await axios.post("/api/motor/user/remove-favorite", { motorId: id });
      setFavorites(favorites.filter((fav) => fav.id !== id));
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  // Remove selected favorites
  const removeSelected = async () => {
    try {
      for (const id of selectedIds) {
        await axios.post("/api/motor/user/remove-favorite", { motorId: id });
      }
      setFavorites(favorites.filter((fav) => !selectedIds.includes(fav.id)));
      setSelectedIds([]);
    } catch (error) {
      console.error("Error removing selected favorites:", error);
    }
  };

  // Toggle selection
  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Toggle all selection
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredFavorites.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredFavorites.map((fav) => fav.id));
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setActiveFilter("all");
    setSelectedIds([]);
  };

  // Show motor details
  const showMotorDetails = (motor) => {
    setSelectedMotor(motor);
    setShowDetails(true);
  };

  // Close details modal
  const closeDetails = () => {
    setShowDetails(false);
    setSelectedMotor(null);
  };

  // Motor features based on type
  const getMotorFeatures = (motor) => {
    const baseFeatures = [
      "Digital Instrument Cluster",
      "LED Lighting",
      "ABS Brakes",
      "Disc Brakes",
      "Fuel Gauge",
      "Trip Meter",
      "Electric Start",
      "Mobile Charger",
    ];

    const typeFeatures = {
      scooter: [
        "Under-seat Storage",
        "Automatic Transmission",
        "Step-through Design",
        "CVT",
        "Comfortable Seating",
      ],
      underbone: [
        "Sporty Design",
        "Manual Transmission",
        "Lightweight",
        "Agile Handling",
        "Fuel Efficient",
      ],
      "big bike": [
        "Powerful Engine",
        "Advanced Suspension",
        "Riding Modes",
        "Traction Control",
        "Quick Shifter",
      ],
      electric: [
        "Fast Charging",
        "Regenerative Braking",
        "Eco Mode",
        "Range Display",
        "Silent Operation",
      ],
    };

    const type = motor.category?.toLowerCase();
    const additionalFeatures = typeFeatures[type] || [];

    return [...baseFeatures, ...additionalFeatures].slice(0, 10);
  };

  // Specifications
  const getSpecifications = (motor) => [
    {
      label: "Engine",
      value: `${motor.engine_cc}cc`,
      icon: <Gauge className="w-4 h-4" />,
    },
    {
      label: "Power",
      value: motor.engine_cc > 300 ? "45+ HP" : "10-30 HP",
      icon: <Zap className="w-4 h-4" />,
    },
    {
      label: "Top Speed",
      value: motor.engine_cc > 300 ? "180+ km/h" : "90-120 km/h",
      icon: <Gauge className="w-4 h-4" />,
    },
    {
      label: "Fuel Economy",
      value: motor.fuel_type === "Electric" ? "N/A" : "40-60 km/L",
      icon: <Fuel className="w-4 h-4" />,
    },
    {
      label: "Weight",
      value: motor.category === "Big Bike" ? "180+ kg" : "100-150 kg",
      icon: <Thermometer className="w-4 h-4" />,
    },
    {
      label: "Seat Height",
      value: motor.category === "Scooter" ? "750-800 mm" : "800-850 mm",
      icon: <Users className="w-4 h-4" />,
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mb-4"></div>
          <p className="text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Motor Details Modal */}
      <AnimatePresence>
        {showDetails && selectedMotor && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDetails}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-10 z-50 overflow-hidden"
            >
              <div className="h-full overflow-y-auto">
                <div className="min-h-full flex items-center justify-center p-4">
                  <motion.div
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header */}
                    <div className="relative">
                      <img
                        src={selectedMotor.motor.image}
                        alt={`${selectedMotor.motor.brand} ${selectedMotor.motor.model}`}
                        className="w-full h-64 md:h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      <button
                        onClick={closeDetails}
                        className="absolute top-6 right-6 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all"
                      >
                        <X className="w-5 h-5 text-gray-800" />
                      </button>

                      <div className="absolute bottom-6 left-6 text-white">
                        <div className="flex items-center gap-3 mb-2">
                          <h1 className="text-3xl md:text-4xl font-bold">
                            {selectedMotor.motor.brand}{" "}
                            {selectedMotor.motor.model}
                          </h1>
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                            {selectedMotor.motor.year}
                          </span>
                        </div>
                        <p className="text-lg text-gray-200">
                          {selectedMotor.motor.category} •{" "}
                          {selectedMotor.motor.engine_cc}cc •{" "}
                          {selectedMotor.motor.location}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Info */}
                        <div className="lg:col-span-2">
                          {/* Price & Actions */}
                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                            <div>
                              <div className="text-4xl font-bold text-gray-900">
                                ₱{selectedMotor.motor.pricePerDay}
                                <span className="text-lg text-gray-500">
                                  /day
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="font-semibold">4.7</span>
                                <span className="text-gray-500">
                                  (96 reviews)
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  navigate(
                                    `/motor-details/${selectedMotor.motor._id}`
                                  )
                                }
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                              >
                                Book Now
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => removeFavorite(selectedMotor.id)}
                                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-red-300 hover:text-red-600 transition-all"
                              >
                                <Trash2 className="w-4 h-4 inline-block mr-2" />
                                Remove
                              </motion.button>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                              Description
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {selectedMotor.motor.description}
                            </p>
                          </div>

                          {/* Specifications */}
                          <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                              Specifications
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {getSpecifications(selectedMotor.motor).map(
                                (spec, index) => (
                                  <div
                                    key={index}
                                    className="bg-gray-50 rounded-xl p-4"
                                  >
                                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                                      {spec.icon}
                                      <span className="text-sm">
                                        {spec.label}
                                      </span>
                                    </div>
                                    <div className="text-lg font-semibold text-gray-900">
                                      {spec.value}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          {/* Features */}
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                              Features
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {getMotorFeatures(selectedMotor.motor).map(
                                (feature, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="text-gray-700">
                                      {feature}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Side Info */}
                        <div className="space-y-6">
                          {/* Availability */}
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900">
                                  {selectedMotor.motor.isAvailable
                                    ? "Available Now"
                                    : "Currently Booked"}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {selectedMotor.motor.isAvailable
                                    ? "Ready for immediate pickup"
                                    : "Check back later"}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">
                                  Pickup Location:
                                </span>
                                <span className="font-semibold">
                                  {selectedMotor.motor.location}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">
                                  Minimum Rental:
                                </span>
                                <span className="font-semibold">1 day</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Helmet:</span>
                                <span className="font-semibold text-green-600">
                                  Included
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Safety Info */}
                          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                              <ShieldCheck className="w-5 h-5 text-blue-600" />
                              Safety Features
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-blue-500" />
                                <span className="text-sm">
                                  {selectedMotor.motor.category === "Big Bike"
                                    ? "Dual Channel ABS"
                                    : "Single Channel ABS"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-blue-500" />
                                <span className="text-sm">Tubeless Tires</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-blue-500" />
                                <span className="text-sm">
                                  Rear Safety Guards
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-blue-500" />
                                <span className="text-sm">
                                  Emergency Kill Switch
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div className="bg-gray-50 rounded-2xl p-6">
                            <h4 className="font-bold text-gray-900 mb-4">
                              Need Help?
                            </h4>
                            <div className="space-y-3">
                              <button className="flex items-center gap-3 w-full p-3 bg-white rounded-xl hover:bg-gray-100 transition-all">
                                <Phone className="w-4 h-4 text-gray-600" />
                                <span className="text-gray-700">
                                  Call Support
                                </span>
                              </button>
                              <button className="flex items-center gap-3 w-full p-3 bg-white rounded-xl hover:bg-gray-100 transition-all">
                                <Mail className="w-4 h-4 text-gray-600" />
                                <span className="text-gray-700">
                                  Send Message
                                </span>
                              </button>
                              <button className="flex items-center gap-3 w-full p-3 bg-white rounded-xl hover:bg-gray-100 transition-all">
                                <Share2 className="w-4 h-4 text-gray-600" />
                                <span className="text-gray-700">
                                  Share Details
                                </span>
                              </button>
                            </div>
                          </div>

                          {/* Added Info */}
                          <div className="text-sm text-gray-500">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Added to favorites {selectedMotor.addedAt}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>Added by {selectedMotor.addedBy}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-blue-900 via-cyan-800 to-teal-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 opacity-10"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              <Heart className="w-5 h-5 text-cyan-300" fill="currentColor" />
              <span className="text-sm font-medium text-cyan-200">
                Your Motorcycle Collection
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              My{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
                Favorite
              </span>{" "}
              Motors
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {favorites.length} premium motorcycles saved for your next ride
            </p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8"
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4">
                <div className="text-2xl font-bold">{favorites.length}</div>
                <div className="text-sm text-gray-300">Total Saved</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4">
                <div className="text-2xl font-bold">
                  ₱
                  {favorites.length > 0
                    ? Math.min(...favorites.map((f) => f.motor.pricePerDay))
                    : 0}
                </div>
                <div className="text-sm text-gray-300">Lowest Price</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4">
                <div className="text-2xl font-bold">
                  {new Set(favorites.map((f) => f.motor.brand)).size}
                </div>
                <div className="text-sm text-gray-300">Brands</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4">
                <div className="text-2xl font-bold">
                  {favorites.filter((f) => f.motor.isAvailable).length}
                </div>
                <div className="text-sm text-gray-300">Available Now</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Controls Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-7xl mx-auto mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search your favorite motorcycles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg ${
                    viewMode === "grid"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-1 w-5 h-5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-lg ${
                    viewMode === "list"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <div className="flex flex-col gap-1 w-5 h-5">
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                  </div>
                </motion.button>
              </div>

              {/* Bulk Actions */}
              {selectedIds.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-sm text-gray-600">
                    {selectedIds.length} selected
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={removeSelected}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove Selected
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Filter Chips */}
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((filter) => (
                  <motion.button
                    key={filter.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                      activeFilter === filter.id
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span>{filter.icon}</span>
                    <span>{filter.label}</span>
                    {filter.count !== undefined && (
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          activeFilter === filter.id
                            ? "bg-white/30"
                            : "bg-gray-200"
                        }`}
                      >
                        {filter.count}
                      </span>
                    )}
                  </motion.button>
                ))}

                {(searchTerm ||
                  activeFilter !== "all" ||
                  selectedIds.length > 0) && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 rounded-full font-medium bg-gray-800 text-white hover:bg-gray-900 transition-all"
                  >
                    Clear All
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-7xl mx-auto mb-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Your Motorcycle Collection
              </h2>
              <p className="text-gray-600 mt-2">
                Showing{" "}
                <span className="font-semibold text-blue-600">
                  {filteredFavorites.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {favorites.length}
                </span>{" "}
                favorites
              </p>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSelectAll}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
              >
                {selectedIds.length === filteredFavorites.length
                  ? "Deselect All"
                  : "Select All"}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Empty State */}
        {filteredFavorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
              <Motorbike className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No favorites found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm
                ? `No motorcycles match your search for "${searchTerm}"`
                : activeFilter !== "all"
                ? `No ${activeFilter} motorcycles in your favorites`
                : "Start adding motorcycles to your favorites to see them here!"}
            </p>
            {searchTerm || activeFilter !== "all" ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                View All Favorites
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/motors")}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Browse Motors
              </motion.button>
            )}
          </motion.div>
        ) : (
          /* Favorites Grid/List */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-7xl mx-auto"
            >
              {viewMode === "grid" ? (
                /* Grid View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFavorites.map((favorite, index) => (
                    <motion.div
                      key={favorite.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="relative group"
                    >
                      {/* Selection Checkbox */}
                      <div className="absolute top-4 left-4 z-10">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleSelect(favorite.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedIds.includes(favorite.id)
                              ? "bg-blue-500 border-blue-500"
                              : "bg-white/90 border-gray-300 group-hover:border-blue-300"
                          }`}
                        >
                          {selectedIds.includes(favorite.id) && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </motion.button>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFavorite(favorite.id)}
                        className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-100 hover:text-red-600 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>

                      {/* Motor Card */}
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 group-hover:shadow-2xl transition-all duration-300">
                        {/* Motor Image */}
                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                          <img
                            src={favorite.motor.image}
                            alt={`${favorite.motor.brand} ${favorite.motor.model}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Availability Badge */}
                          <div
                            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                              favorite.motor.isAvailable
                                ? "bg-green-500/90 text-white"
                                : "bg-red-500/90 text-white"
                            }`}
                          >
                            {favorite.motor.isAvailable
                              ? "Available"
                              : "Booked"}
                          </div>

                          {/* Favorite Heart */}
                          <div className="absolute top-4 left-12 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                            <Heart
                              className="w-4 h-4 text-red-500"
                              fill="currentColor"
                            />
                          </div>
                        </div>

                        {/* Motor Details */}
                        <div className="p-6">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">
                                {favorite.motor.brand} {favorite.motor.model}
                              </h3>
                              <p className="text-gray-500 text-sm">
                                {favorite.motor.year} •{" "}
                                {favorite.motor.category} •{" "}
                                {favorite.motor.engine_cc}cc
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                ₱{favorite.motor.pricePerDay}
                                <span className="text-sm text-gray-500 font-normal">
                                  /day
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Fuel className="w-4 h-4" />
                              <span className="text-sm">
                                {favorite.motor.fuel_type}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Settings className="w-4 h-4" />
                              <span className="text-sm">
                                {favorite.motor.transmission}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Gauge className="w-4 h-4" />
                              <span className="text-sm">
                                {favorite.motor.engine_cc}cc
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm truncate">
                                {favorite.motor.location}
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                            {favorite.motor.description}
                          </p>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <motion.button
                              onClick={() =>
                                navigate(`/motor-details/${favorite.motor._id}`)
                              }
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                            >
                              Book Now
                            </motion.button>
                            <motion.button
                              onClick={() => showMotorDetails(favorite)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all"
                            >
                              Details
                            </motion.button>
                          </div>

                          {/* Added Info */}
                          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              <span>Added {favorite.addedAt}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span>4.7</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* List View */
                <div className="space-y-4">
                  {filteredFavorites.map((favorite, index) => (
                    <motion.div
                      key={favorite.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden group"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Selection & Image */}
                        <div className="relative md:w-1/3">
                          <div className="absolute top-4 left-4 z-10">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleSelect(favorite.id)}
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                selectedIds.includes(favorite.id)
                                  ? "bg-blue-500 border-blue-500"
                                  : "bg-white/90 border-gray-300 group-hover:border-blue-300"
                              }`}
                            >
                              {selectedIds.includes(favorite.id) && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </motion.button>
                          </div>

                          <img
                            src={favorite.motor.image}
                            alt={`${favorite.motor.brand} ${favorite.motor.model}`}
                            className="w-full h-48 md:h-full object-cover"
                          />

                          <div className="absolute bottom-4 left-4">
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                favorite.motor.isAvailable
                                  ? "bg-green-500/90 text-white"
                                  : "bg-red-500/90 text-white"
                              }`}
                            >
                              {favorite.motor.isAvailable
                                ? "Available"
                                : "Booked"}
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-gray-900">
                                  {favorite.motor.brand} {favorite.motor.model}
                                </h3>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                                  {favorite.motor.category}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm mb-4">
                                {favorite.motor.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">
                                  ₱{favorite.motor.pricePerDay}
                                  <span className="text-sm text-gray-500 font-normal">
                                    /day
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  Added {favorite.addedAt}
                                </div>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeFavorite(favorite.id)}
                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </motion.button>
                            </div>
                          </div>

                          {/* Features Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="flex items-center gap-2">
                              <Fuel className="w-4 h-4 text-gray-400" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Fuel Type
                                </div>
                                <div className="font-medium">
                                  {favorite.motor.fuel_type}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Settings className="w-4 h-4 text-gray-400" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Transmission
                                </div>
                                <div className="font-medium">
                                  {favorite.motor.transmission}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Gauge className="w-4 h-4 text-gray-400" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Engine
                                </div>
                                <div className="font-medium">
                                  {favorite.motor.engine_cc}cc
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Location
                                </div>
                                <div className="font-medium truncate">
                                  {favorite.motor.location}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <motion.button
                              onClick={() =>
                                navigate(`/motor-details/${favorite.motor._id}`)
                              }
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                            >
                              Book Now
                            </motion.button>
                            <motion.button
                              onClick={() => showMotorDetails(favorite)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all"
                            >
                              View Details
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Footer Stats */}
        {filteredFavorites.length > 0 && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="max-w-7xl mx-auto mt-12"
          >
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-blue-100 rounded-2xl mb-4">
                    <Bike className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Total Value
                  </h4>
                  <p className="text-2xl font-bold text-blue-600">
                    ₱
                    {favorites.reduce(
                      (sum, fav) => sum + fav.motor.pricePerDay,
                      0
                    )}
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-4 bg-cyan-100 rounded-2xl mb-4">
                    <Star className="w-8 h-8 text-cyan-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Avg. Rating
                  </h4>
                  <p className="text-2xl font-bold text-cyan-600">4.7</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-4 bg-teal-100 rounded-2xl mb-4">
                    <Heart
                      className="w-8 h-8 text-teal-600"
                      fill="currentColor"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Favorite Brands
                  </h4>
                  <p className="text-2xl font-bold text-teal-600">
                    {new Set(favorites.map((f) => f.motor.brand)).size}
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-4 bg-indigo-100 rounded-2xl mb-4">
                    <Shield className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Ready to Book
                  </h4>
                  <p className="text-2xl font-bold text-indigo-600">
                    {favorites.filter((f) => f.motor.isAvailable).length}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
