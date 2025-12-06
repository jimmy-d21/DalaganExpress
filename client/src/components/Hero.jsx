import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Navigation,
  Zap,
  Shield,
  Clock,
  Sparkles,
  ChevronRight,
  Star,
  Bike,
  Search,
  X,
  Check,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [bikeType, setBikeType] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const { navigate, pickupDate, setPickupDate, returnDate, setReturnDate } =
    useAppContext();

  const bikeTypes = [
    { id: "sport", label: "Sport", icon: "⚡", desc: "High-performance" },
    { id: "cruiser", label: "Cruiser", icon: "🛣️", desc: "Comfort rides" },
    { id: "adventure", label: "Adventure", icon: "🏔️", desc: "Off-road ready" },
    { id: "scooter", label: "Scooter", icon: "🛵", desc: "Urban mobility" },
    { id: "touring", label: "Touring", icon: "🧭", desc: "Long journeys" },
    { id: "naked", label: "Naked", icon: "🛡️", desc: "Street style" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!pickupLocation) return;

    navigate(
      `/motors?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}&bikeType=${bikeType}`
    );
    setSearchActive(false);
  };

  const negrosLocations = [
    {
      value: "Bacolod City",
      label: "Bacolod City",
      region: "Negros Occidental",
    },
    { value: "Silay City", label: "Silay City", region: "Negros Occidental" },
    {
      value: "Talisay City",
      label: "Talisay City",
      region: "Negros Occidental",
    },
    { value: "Bago City", label: "Bago City", region: "Negros Occidental" },
    {
      value: "Dumaguete City",
      label: "Dumaguete City",
      region: "Negros Oriental",
    },
    {
      value: "Kabankalan City",
      label: "Kabankalan City",
      region: "Negros Occidental",
    },
    {
      value: "San Carlos City",
      label: "San Carlos City",
      region: "Negros Occidental",
    },
    {
      value: "Victorias City",
      label: "Victorias City",
      region: "Negros Occidental",
    },
    { value: "Cadiz City", label: "Cadiz City", region: "Negros Occidental" },
    {
      value: "Sipalay City",
      label: "Sipalay City",
      region: "Negros Occidental",
    },
    { value: "Hinigaran", label: "Hinigaran", region: "Negros Occidental" },
    { value: "Valladolid", label: "Valladolid", region: "Negros Occidental" },
    { value: "Pulupandan", label: "Pulupandan", region: "Negros Occidental" },
    { value: "Other Negros Location", label: "Other Location in Negros" },
  ];

  const handleBikeTypeSelect = (type) => {
    setBikeType(type === bikeType ? "" : type);
  };

  const stats = [
    { value: "750+", label: "Bikes Available", color: "text-orange-400" },
    { value: "24/7", label: "Support", color: "text-green-400" },
    { value: "85+", label: "Cities", color: "text-blue-400" },
    { value: "9.8/10", label: "Rating", color: "text-yellow-400" },
  ];

  const features = [
    { icon: <Shield className="w-5 h-5" />, text: "Full Insurance Included" },
    { icon: <Zap className="w-5 h-5" />, text: "Free Helmet & Gear" },
    { icon: <Clock className="w-5 h-5" />, text: "Flexible Cancellation" },
    { icon: <Sparkles className="w-5 h-5" />, text: "Premium Maintenance" },
  ];

  return (
    <div className="relative min-h-screen pb-10 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
        {/* Navigation */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center py-6"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <Bike className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-blue-800">Dalagan</span>
            <span className="text-2xl font-bold text-yellow-300">Express</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition-colors"
            >
              How it Works
            </a>
            <button className="px-4 py-2 border border-orange-500/50 text-orange-400 rounded-lg hover:bg-orange-500/10 transition-colors">
              Book Now
            </button>
          </div>
        </motion.div>

        <div className="pt-8 md:pt-16 lg:pt-24">
          <div className="max-w-7xl mx-auto">
            {/* Hero Content */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full mb-8"
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">
                    Trusted by 10,000+ Riders
                  </span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
                  <span className="block text-white">Ride Your</span>
                  <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                    Dream Bike
                  </span>
                </h1>

                <p className="text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
                  Experience ultimate freedom with premium motorcycles. From
                  city commutes to mountain adventures, we have the perfect ride
                  for every journey.
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-12">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-orange-400">{feature.icon}</div>
                      </div>
                      <span className="text-gray-300">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Content - Search Card */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl">
                          <Navigation className="w-6 h-6 text-orange-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                          Find Your Perfect Ride
                        </h2>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Select your preferences and start your adventure
                      </p>
                    </div>
                    <button
                      onClick={() => setSearchActive(!searchActive)}
                      className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <Search className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <form onSubmit={handleSearch} className="space-y-6">
                    {/* Location Search */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 rounded-xl blur transition-all duration-500 group-hover:blur-lg opacity-0 group-hover:opacity-100"></div>
                      <div className="relative bg-white/5 border border-white/10 rounded-xl p-4">
                        <label className="flex items-center gap-3 text-gray-300 mb-3">
                          <MapPin className="w-5 h-5 text-orange-400" />
                          Pickup Location
                        </label>
                        <div className="relative">
                          <select
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            required
                            className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                          >
                            <option value="" className="text-gray-900">
                              Where do you want to ride?
                            </option>
                            {negrosLocations.map((city, index) => (
                              <option
                                key={index}
                                value={city.label}
                                className="text-gray-900"
                              >
                                {city.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <label className="flex items-center gap-3 text-gray-300 mb-3">
                          <Calendar className="w-5 h-5 text-blue-400" />
                          Pickup Date
                        </label>
                        <input
                          onChange={(e) => setPickupDate(e.target.value)}
                          value={pickupDate}
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:outline-none focus:ring-0 cursor-pointer"
                          required
                        />
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <label className="flex items-center gap-3 text-gray-300 mb-3">
                          <Calendar className="w-5 h-5 text-green-400" />
                          Return Date
                        </label>
                        <input
                          onChange={(e) => setReturnDate(e.target.value)}
                          value={returnDate}
                          type="date"
                          min={
                            pickupDate || new Date().toISOString().split("T")[0]
                          }
                          className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:outline-none focus:ring-0 cursor-pointer"
                          required
                        />
                      </div>
                    </div>

                    {/* Bike Type Selection */}
                    <div className="space-y-4">
                      <label className="text-gray-300">Select Bike Type</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {bikeTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => handleBikeTypeSelect(type.id)}
                            className={`p-4 border rounded-xl transition-all duration-300 text-center group relative overflow-hidden ${
                              bikeType === type.id
                                ? "bg-gradient-to-r from-orange-500/30 to-red-500/30 border-orange-500/50 text-white"
                                : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                            }`}
                          >
                            <div className="text-2xl mb-2">{type.icon}</div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              {type.desc}
                            </div>
                            {bikeType === type.id && (
                              <div className="absolute top-2 right-2">
                                <Check className="w-4 h-4 text-green-400" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Search Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10 flex items-center justify-center gap-3 px-6 py-4 text-white font-bold rounded-xl">
                        <Navigation className="w-5 h-5 group-hover:animate-bounce" />
                        <span className="text-lg">Explore Available Bikes</span>
                      </div>
                    </motion.button>
                  </form>

                  {/* Quick Tips */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                      <span className="flex items-center gap-2 text-gray-400">
                        <Zap className="w-4 h-4 text-green-400" />
                        Instant Confirmation
                      </span>
                      <span className="flex items-center gap-2 text-gray-400">
                        <Shield className="w-4 h-4 text-blue-400" />
                        Full Insurance
                      </span>
                      <span className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4 text-purple-400" />
                        24/7 Support
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg border border-orange-500/30 rounded-2xl p-4 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/30 rounded-lg">
                      <div className="text-2xl">🎯</div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Best Price
                      </p>
                      <p className="text-xs text-orange-300">Guaranteed</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg border border-blue-500/30 rounded-2xl p-4 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/30 rounded-lg">
                      <div className="text-2xl">⭐</div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Top Rated
                      </p>
                      <p className="text-xs text-blue-300">Riders Choice</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-16 text-center"
            >
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full">
                <span className="text-gray-300">
                  Trusted by adventure seekers worldwide
                </span>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-900 -ml-2 first:ml-0 bg-gradient-to-r from-orange-400 to-red-400"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-gray-900 -ml-2 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-gray-900 -ml-2 bg-gradient-to-r from-green-400 to-teal-400"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-gray-900 -ml-2 bg-gradient-to-r from-yellow-400 to-pink-400"></div>
                  <div className="text-gray-400 text-sm ml-2">+2.5k</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <ChevronRight className="w-6 h-6 text-gray-400 rotate-90" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
