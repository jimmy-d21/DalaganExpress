import React, { useState } from "react";
import { dummyFavorite } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Trash2,
  Car,
  Fuel,
  MapPin,
  Calendar,
  Star,
  Filter,
  Search,
  Users,
  Settings,
  ChevronRight,
  AlertCircle,
  Clock,
  DollarSign,
  Navigation,
  Shield,
  Zap,
  Wind,
  Battery,
  Wifi,
  Music,
  Camera,
  X,
  CheckCircle,
  ShieldCheck,
  Key,
  Gauge,
  Volume2,
  Sun,
  Snowflake,
  Phone,
  Mail,
  Share2,
  Download,
  Printer,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Favorite = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(dummyFavorite);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCar, setSelectedCar] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Filter options
  const filterOptions = [
    { id: "all", label: "All Cars", count: favorites.length },
    {
      id: "suv",
      label: "SUV",
      icon: "🚙",
      count: favorites.filter(
        (f) =>
          f.car.type?.toLowerCase() === "suv" ||
          f.car.category?.toLowerCase().includes("suv")
      ).length,
    },
    {
      id: "sedan",
      label: "Sedan",
      icon: "🚗",
      count: favorites.filter((f) => f.car.type?.toLowerCase() === "sedan")
        .length,
    },
    {
      id: "sports",
      label: "Sports",
      icon: "⚡",
      count: favorites.filter(
        (f) =>
          f.car.type?.toLowerCase() === "sports" ||
          f.car.category?.toLowerCase().includes("sports")
      ).length,
    },
    {
      id: "luxury",
      label: "Luxury",
      icon: "🏎️",
      count: favorites.filter((f) =>
        f.car.category?.toLowerCase().includes("luxury")
      ).length,
    },
    {
      id: "electric",
      label: "Electric",
      icon: "🔋",
      count: favorites.filter(
        (f) => f.car.fuel_type?.toLowerCase() === "electric"
      ).length,
    },
  ];

  // Filter and search favorites
  const filteredFavorites = favorites.filter((favorite) => {
    const matchesSearch =
      searchTerm === "" ||
      favorite.car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      favorite.car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      favorite.car.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "all" ||
      favorite.car.type?.toLowerCase() === activeFilter ||
      favorite.car.category?.toLowerCase().includes(activeFilter) ||
      favorite.car.fuel_type?.toLowerCase() === activeFilter;

    return matchesSearch && matchesFilter;
  });

  // Remove favorite
  const removeFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
    setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
  };

  // Remove selected favorites
  const removeSelected = () => {
    setFavorites(favorites.filter((fav) => !selectedIds.includes(fav.id)));
    setSelectedIds([]);
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

  // Show car details
  const showCarDetails = (car) => {
    setSelectedCar(car);
    setShowDetails(true);
  };

  // Close details modal
  const closeDetails = () => {
    setShowDetails(false);
    setSelectedCar(null);
  };

  // Car features based on type
  const getCarFeatures = (car) => {
    const baseFeatures = [
      "Air Conditioning",
      "Power Windows",
      "Power Steering",
      "ABS Brakes",
      "Airbags",
      "Bluetooth",
      "USB Port",
      "Backup Camera",
    ];

    const typeFeatures = {
      luxury: [
        "Leather Seats",
        "Sunroof",
        "Premium Sound",
        "Navigation",
        "Heated Seats",
      ],
      sports: [
        "Sport Mode",
        "Paddle Shifters",
        "Sport Suspension",
        "Performance Tires",
      ],
      suv: ["4WD/AWD", "Roof Rails", "Towing Package", "Spacious Interior"],
      electric: [
        "Fast Charging",
        "Regenerative Braking",
        "Eco Mode",
        "Range Display",
      ],
      sedan: [
        "Comfort Suspension",
        "Quiet Cabin",
        "Fuel Efficient",
        "Spacious Trunk",
      ],
    };

    const type = car.type?.toLowerCase() || car.category?.toLowerCase();
    const additionalFeatures = typeFeatures[type] || [];

    return [...baseFeatures, ...additionalFeatures].slice(0, 10);
  };

  // Specifications
  const getSpecifications = (car) => [
    {
      label: "Engine",
      value: car.fuel_type === "Electric" ? "Electric Motor" : "V6 Turbo",
      icon: <Gauge className="w-4 h-4" />,
    },
    {
      label: "Horsepower",
      value: car.type === "Sports" ? "500 HP" : "300 HP",
      icon: <Zap className="w-4 h-4" />,
    },
    {
      label: "0-60 mph",
      value: car.type === "Sports" ? "3.5s" : "6.2s",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      label: "Fuel Economy",
      value: car.fuel_type === "Electric" ? "120 MPGe" : "28 MPG",
      icon: <Fuel className="w-4 h-4" />,
    },
    {
      label: "Top Speed",
      value: car.type === "Sports" ? "180 mph" : "130 mph",
      icon: <Gauge className="w-4 h-4" />,
    },
    {
      label: "Cargo Space",
      value: car.type === "SUV" ? "65 cu ft" : "15 cu ft",
      icon: <Car className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Car Details Modal */}
      <AnimatePresence>
        {showDetails && selectedCar && (
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
                        src={selectedCar.car.image}
                        alt={
                          selectedCar.car.brand + " " + selectedCar.car.model
                        }
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
                            {selectedCar.car.brand} {selectedCar.car.model}
                          </h1>
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                            {selectedCar.car.year}
                          </span>
                        </div>
                        <p className="text-lg text-gray-200">
                          {selectedCar.car.category} •{" "}
                          {selectedCar.car.location}
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
                                ${selectedCar.car.pricePerDay}
                                <span className="text-lg text-gray-500">
                                  /day
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="font-semibold">4.8</span>
                                <span className="text-gray-500">
                                  (128 reviews)
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  navigate(`/car-details/${selectedCar.car.id}`)
                                }
                                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                              >
                                Book Now
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => removeFavorite(selectedCar.id)}
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
                              {selectedCar.car.description}
                            </p>
                          </div>

                          {/* Specifications */}
                          <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                              Specifications
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {getSpecifications(selectedCar.car).map(
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
                              {getCarFeatures(selectedCar.car).map(
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
                                  Available Now
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Ready for immediate pickup
                                </p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">
                                  Pickup Location:
                                </span>
                                <span className="font-semibold">
                                  {selectedCar.car.location}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">
                                  Minimum Rental:
                                </span>
                                <span className="font-semibold">1 day</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">
                                  Insurance:
                                </span>
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
                                  Advanced Airbag System
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-blue-500" />
                                <span className="text-sm">
                                  Electronic Stability Control
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-blue-500" />
                                <span className="text-sm">
                                  Lane Departure Warning
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-blue-500" />
                                <span className="text-sm">
                                  Automatic Emergency Braking
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
                                Added to favorites on {selectedCar.addedAt}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>Added by {selectedCar.addedBy}</span>
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

      {/* Rest of your existing code remains the same */}
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-purple-900 via-pink-800 to-rose-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 opacity-10"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-20">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              <Heart className="w-5 h-5 text-pink-300" fill="currentColor" />
              <span className="text-sm font-medium text-pink-200">
                Your Dream Collection
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              My{" "}
              <span className="bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
                Favorite
              </span>{" "}
              Cars
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {favorites.length} premium vehicles saved for your next adventure
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
                  ${Math.min(...favorites.map((f) => f.car.pricePerDay))}
                </div>
                <div className="text-sm text-gray-300">Lowest Price</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4">
                <div className="text-2xl font-bold">
                  {new Set(favorites.map((f) => f.car.brand)).size}
                </div>
                <div className="text-sm text-gray-300">Brands</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4">
                <div className="text-2xl font-bold">
                  {favorites.filter((f) => f.car.isAvaliable).length}
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
                    placeholder="Search your favorites..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
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
                      ? "bg-pink-100 text-pink-700"
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
                      ? "bg-pink-100 text-pink-700"
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
                        ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
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
                Your Favorite Collection
              </h2>
              <p className="text-gray-600 mt-2">
                Showing{" "}
                <span className="font-semibold text-pink-600">
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
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-pink-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No favorites found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm
                ? `No favorites match your search for "${searchTerm}"`
                : activeFilter !== "all"
                ? `No ${activeFilter} cars in your favorites`
                : "Start adding cars to your favorites to see them here!"}
            </p>
            {searchTerm || activeFilter !== "all" ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                View All Favorites
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/cars")}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Browse Cars
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
                              ? "bg-pink-500 border-pink-500"
                              : "bg-white/90 border-gray-300 group-hover:border-pink-300"
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

                      {/* Car Card */}
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 group-hover:shadow-2xl transition-all duration-300">
                        {/* Car Image */}
                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                          <img
                            src={favorite.car.image}
                            alt={`${favorite.car.brand} ${favorite.car.model}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Availability Badge */}
                          <div
                            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                              favorite.car.isAvaliable
                                ? "bg-green-500/90 text-white"
                                : "bg-red-500/90 text-white"
                            }`}
                          >
                            {favorite.car.isAvaliable ? "Available" : "Booked"}
                          </div>

                          {/* Favorite Heart */}
                          <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                            <Heart
                              className="w-4 h-4 text-pink-500"
                              fill="currentColor"
                            />
                          </div>
                        </div>

                        {/* Car Details */}
                        <div className="p-6">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">
                                {favorite.car.brand} {favorite.car.model}
                              </h3>
                              <p className="text-gray-500 text-sm">
                                {favorite.car.year} • {favorite.car.category}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                ${favorite.car.pricePerDay}
                                <span className="text-sm text-gray-500 font-normal">
                                  /day
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Users className="w-4 h-4" />
                              <span className="text-sm">
                                {favorite.car.seating_capacity} seats
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Fuel className="w-4 h-4" />
                              <span className="text-sm">
                                {favorite.car.fuel_type}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Settings className="w-4 h-4" />
                              <span className="text-sm">
                                {favorite.car.transmission}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm truncate">
                                {favorite.car.location}
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                            {favorite.car.description}
                          </p>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <motion.button
                              onClick={() =>
                                navigate(`/car-details/${favorite.car.id}`)
                              }
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                            >
                              Book Now
                            </motion.button>
                            <motion.button
                              onClick={() => showCarDetails(favorite)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-pink-300 hover:text-pink-600 transition-all"
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
                              <span>4.8</span>
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
                                  ? "bg-pink-500 border-pink-500"
                                  : "bg-white/90 border-gray-300 group-hover:border-pink-300"
                              }`}
                            >
                              {selectedIds.includes(favorite.id) && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </motion.button>
                          </div>

                          <img
                            src={favorite.car.image}
                            alt={`${favorite.car.brand} ${favorite.car.model}`}
                            className="w-full h-48 md:h-full object-cover"
                          />

                          <div className="absolute bottom-4 left-4">
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                favorite.car.isAvaliable
                                  ? "bg-green-500/90 text-white"
                                  : "bg-red-500/90 text-white"
                              }`}
                            >
                              {favorite.car.isAvaliable
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
                                  {favorite.car.brand} {favorite.car.model}
                                </h3>
                                <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs font-semibold rounded">
                                  {favorite.car.category}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm mb-4">
                                {favorite.car.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">
                                  ${favorite.car.pricePerDay}
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
                                  {favorite.car.fuel_type}
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
                                  {favorite.car.transmission}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <div>
                                <div className="text-xs text-gray-500">
                                  Seats
                                </div>
                                <div className="font-medium">
                                  {favorite.car.seating_capacity}
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
                                  {favorite.car.location}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <motion.button
                              onClick={() =>
                                navigate(`/car-details/${favorite.car.id}`)
                              }
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                            >
                              Book Now
                            </motion.button>
                            <motion.button
                              onClick={() => showCarDetails(favorite)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-pink-300 hover:text-pink-600 transition-all"
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
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-purple-100 rounded-2xl mb-4">
                    <Car className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Total Value
                  </h4>
                  <p className="text-2xl font-bold text-purple-600">
                    $
                    {favorites.reduce(
                      (sum, fav) => sum + fav.car.pricePerDay,
                      0
                    )}
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-4 bg-pink-100 rounded-2xl mb-4">
                    <Star className="w-8 h-8 text-pink-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Avg. Rating
                  </h4>
                  <p className="text-2xl font-bold text-pink-600">4.8</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-4 bg-rose-100 rounded-2xl mb-4">
                    <Heart className="w-8 h-8 text-rose-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Favorite Brands
                  </h4>
                  <p className="text-2xl font-bold text-rose-600">
                    {new Set(favorites.map((f) => f.car.brand)).size}
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-4 bg-violet-100 rounded-2xl mb-4">
                    <Shield className="w-8 h-8 text-violet-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Ready to Book
                  </h4>
                  <p className="text-2xl font-bold text-violet-600">
                    {favorites.filter((f) => f.car.isAvaliable).length}
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
