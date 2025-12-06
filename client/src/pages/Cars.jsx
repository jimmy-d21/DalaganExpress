import React, { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import { useAppContext } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Car,
  Navigation,
  Fuel,
  Settings,
  Users,
} from "lucide-react";

const Cars = () => {
  // getting search params Url
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();

  const [input, setInput] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const carTypes = [
    "All",
    "SUV",
    "Sedan",
    "Sports",
    "Luxury",
    "Electric",
    "Convertible",
  ];

  const applyFilter = () => {
    setIsLoading(true);

    // Immediate filtering - no setTimeout
    let filtered = [...cars]; // Create a copy of all cars

    // Apply text search filter
    if (input.trim() !== "") {
      filtered = filtered.filter((car) => {
        return (
          car.brand?.toLowerCase().includes(input.toLowerCase()) ||
          car.model?.toLowerCase().includes(input.toLowerCase()) ||
          car.category?.toLowerCase().includes(input.toLowerCase()) ||
          car.type?.toLowerCase().includes(input.toLowerCase()) ||
          (car.features &&
            car.features.some((feature) =>
              feature.toLowerCase().includes(input.toLowerCase())
            ))
        );
      });
    }

    // Apply type filter ONLY if activeFilter is not "all"
    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (car) =>
          car.type?.toLowerCase() === activeFilter.toLowerCase() ||
          car.category?.toLowerCase() === activeFilter.toLowerCase() ||
          (car.type && car.type.toLowerCase().includes(activeFilter)) ||
          (car.category && car.category.toLowerCase().includes(activeFilter))
      );
    }

    setFilteredCars(filtered);
    setIsLoading(false);
  };

  const searchCarAvailability = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/bookings/check-availability", {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        setFilteredCars(data.availableCars);
        if (data.availableCars.length === 0) {
          toast("No cars available for your selected criteria");
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to check availability"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    } else {
      setIsLoading(true);

      // Check if cars data is available
      if (cars && cars.length > 0) {
        // Remove the setTimeout here as well for consistency
        setFilteredCars(cars);
        setIsLoading(false);
      } else {
        // If cars is empty, keep loading or show empty state
        const timer = setTimeout(() => {
          if (cars && cars.length === 0) {
            // Cars data is loaded but empty
            setFilteredCars([]);
            setIsLoading(false);
          }
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }, [isSearchData, cars]); // Added cars as dependency

  useEffect(() => {
    // Only apply filter if we have cars data AND we're not in search mode
    if (!isSearchData && cars && cars.length > 0) {
      applyFilter();
    }
  }, [input, cars, activeFilter, isSearchData]); // Added isSearchData dependency

  // Reset to show all cars when clearing search
  const clearFilters = () => {
    setInput("");
    setActiveFilter("all");
    if (cars && cars.length > 0) {
      setFilteredCars(cars); // Show all cars immediately
    }
  };

  // Handle case when cars data is still loading
  const showLoading = isLoading || cars === undefined; // Added check for undefined
  const showCars = !showLoading && filteredCars.length > 0;
  const showEmptyState = !showLoading && filteredCars.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-24">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full">
              <Car className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">
                Premium Fleet
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Luxury Fleet
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Browse our curated selection of premium vehicles available for
              your next adventure
            </p>
          </motion.div>

          {/* Search Stats */}
          {isSearchData && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 max-w-3xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Pickup Location</p>
                      <p className="font-semibold">{pickupLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                      <Calendar className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Rental Period</p>
                      <p className="font-semibold">
                        {pickupDate} - {returnDate}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-blue-700 font-semibold rounded-xl transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    Modify Search
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
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="relative">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Search by brand, model, or features..."
                className="w-full pl-14 pr-12 py-4 bg-white border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all"
                disabled={showLoading}
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Filter className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-3">
            {carTypes.map((type) => (
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
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                {type}
              </motion.button>
            ))}

            {/* Clear Filters Button */}
            {(input.trim() !== "" || activeFilter !== "all") && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                disabled={showLoading}
                className="px-6 py-3 rounded-full font-medium bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Clear All
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
                Available Vehicles
              </h2>
              {!showLoading && cars && (
                <p className="text-gray-600 mt-2">
                  Showing{" "}
                  <span className="font-semibold text-blue-600">
                    {filteredCars.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {cars.length}
                  </span>{" "}
                  cars
                  {activeFilter !== "all" && ` in ${activeFilter}`}
                  {input.trim() !== "" && ` matching "${input}"`}
                </p>
              )}
            </div>

            {!isSearchData && !showLoading && cars && cars.length > 0 && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Settings className="w-4 h-4 text-green-500" />
                  <span>Instant Booking</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Fuel className="w-4 h-4 text-blue-500" />
                  <span>Premium Fleet</span>
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
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading premium vehicles...</p>
          </motion.div>
        ) : showCars ? (
          /* Cars Grid */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car._id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <CarCard car={car} />
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
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Settings className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No Cars Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {input
                ? `No vehicles match your search for "${input}"`
                : activeFilter !== "all"
                ? `No ${activeFilter} vehicles available`
                : cars && cars.length === 0
                ? "No vehicles available in our fleet"
                : "No vehicles match your criteria"}
            </p>
            {(input.trim() !== "" || activeFilter !== "all") && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                View All Cars
              </motion.button>
            )}
          </motion.div>
        ) : null}

        {/* Features Section */}
        {showCars && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-6xl mx-auto mt-20"
          >
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-blue-100 rounded-2xl mb-4">
                    <Settings className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Instant Booking
                  </h4>
                  <p className="text-gray-600">Reserve your car in minutes</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-4 bg-blue-100 rounded-2xl mb-4">
                    <Fuel className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Premium Fleet
                  </h4>
                  <p className="text-gray-600">
                    Latest models, perfect condition
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-4 bg-blue-100 rounded-2xl mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    24/7 Support
                  </h4>
                  <p className="text-gray-600">Always here to help you</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Cars;
