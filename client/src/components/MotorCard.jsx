import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bike,
  Fuel,
  Gauge,
  MapPin,
  Calendar,
  Shield,
  Star,
  ChevronRight,
  Heart,
  Zap,
  Clock,
  CheckCircle,
  Wind,
  Disc,
  Sparkles,
  AlertCircle,
  Motorbike,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MotorCard = ({ motor }) => {
  const currency = "₱";
  const navigate = useNavigate();
  const { user, axios, setShowLogin } = useAppContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if motor is in user's favorites
  useEffect(() => {
    if (user && motor) {
      const isMotorInFavorites = user.favorites?.some(
        (fav) => fav.motor?._id === motor._id || fav.motor === motor._id
      );
      setIsFavorite(isMotorInFavorites);
    }
  }, [user, motor]);

  const handleCardClick = () => {
    navigate(`/motor-details/${motor._id}`);
    window.scrollTo(0, 0);
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();

    if (!user) {
      setShowLogin(true);
      return;
    }

    setLoading(true);
    try {
      if (isFavorite) {
        // Remove from favorites
        await axios.post("/api/motor/user/remove-favorite", {
          motorId: motor._id,
        });
        setIsFavorite(false);
        toast.success(`Remove favorite successfully`);
      } else {
        // Add to favorites
        await axios.post("/api/motor/user/add-favorite", {
          motorId: motor._id,
        });
        setIsFavorite(true);
        toast.success(`Added favorite successfully`);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
      // Optionally show a toast notification
    } finally {
      setLoading(false);
    }
  };

  // Motorcycle category icons mapping
  const getCategoryIcon = (category) => {
    const icons = {
      scooter: "🛵",
      underbone: "🏍️",
      big_bike: "🏍️🔥",
      sportbike: "⚡",
      cruiser: "🛣️",
      naked: "💨",
      adventure: "🗺️",
      electric: "🔋",
    };
    return icons[category] || "🏍️";
  };

  // Motorcycle features based on category and specifications
  const getMotorFeatures = () => {
    const features = [];

    if (motor.transmission === "Automatic") {
      features.push({
        icon: "zap",
        label: "Easy Ride",
        color: "text-blue-400",
      });
    }

    if (parseInt(motor.engine_cc) >= 400) {
      features.push({ icon: "wind", label: "Powerful", color: "text-red-400" });
    }

    if (motor.fuel_type === "Electric") {
      features.push({
        icon: "sparkles",
        label: "Eco",
        color: "text-green-400",
      });
    }

    if (motor.category === "scooter") {
      features.push({
        icon: "disc",
        label: "Storage",
        color: "text-purple-400",
      });
    }

    // Default features
    if (features.length < 3) {
      features.push(
        { icon: "shield", label: "Secure", color: "text-orange-400" },
        { icon: "clock", label: "Quick Pickup", color: "text-yellow-400" }
      );
    }

    return features.slice(0, 3);
  };

  // Fuel type colors
  const getFuelColor = (fuelType) => {
    const colors = {
      Gas: "text-orange-400",
      Premium: "text-yellow-400",
      Diesel: "text-red-400",
      Electric: "text-green-400",
      Hybrid: "text-blue-400",
    };
    return colors[fuelType] || "text-gray-400";
  };

  // Category color mapping
  const getCategoryColor = (category) => {
    const colors = {
      scooter: "text-blue-400",
      underbone: "text-green-400",
      big_bike: "text-red-400",
      sportbike: "text-purple-400",
      cruiser: "text-yellow-400",
      naked: "text-cyan-400",
      adventure: "text-emerald-400",
      electric: "text-green-400",
    };
    return colors[category] || "text-gray-400";
  };

  const features = getMotorFeatures();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-500/30"
    >
      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        disabled={loading}
        className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Heart
          className={`w-4 h-4 transition-all duration-300 ${
            isFavorite
              ? "fill-red-500 text-red-500 scale-110"
              : user
              ? "text-gray-400 hover:text-white"
              : "text-gray-600"
          }`}
        />
      </button>

      {/* Login prompt tooltip for non-logged in users */}
      {!user && isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-12 right-4 z-30 px-3 py-2 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-lg"
        >
          <p className="text-xs text-gray-300 whitespace-nowrap">
            Login to add to favorites
          </p>
        </motion.div>
      )}

      {/* Availability Badge */}
      {motor.isAvailable && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-4 left-4 z-10"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-300">
              Available Now
            </span>
          </div>
        </motion.div>
      )}

      {/* Motorcycle Category Badge */}
      <div className="absolute top-16 left-4 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-gray-700/50 rounded-full">
          <span className="text-sm">{getCategoryIcon(motor.category)}</span>
          <span className="text-xs font-medium text-gray-300 capitalize">
            {motor.category.replace("_", " ")}
          </span>
        </div>
      </div>

      {/* Motorcycle Image */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
          src={motor.image}
          alt={`${motor.brand} ${motor.model}`}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent" />

        {/* Engine CC Badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg">
          <Gauge className="w-4 h-4 text-red-400" />
          <span className="text-sm font-bold text-white">
            {motor.engine_cc}cc
          </span>
        </div>

        {/* Quick View Indicator */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-lg"
          >
            <span className="text-xs font-medium text-white">View Details</span>
            <ChevronRight className="w-3 h-3 text-red-400" />
          </motion.div>
        )}
      </div>

      {/* Motorcycle Info */}
      <div className="p-5">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-red-300 transition-colors duration-300">
                {motor.brand} {motor.model}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-400">{motor.year}</span>
                <span className="text-gray-600">•</span>
                <span
                  className={`text-sm font-medium ${getCategoryColor(
                    motor.category
                  )} capitalize`}
                >
                  {motor.category.replace("_", " ")}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {currency}
                <span className="text-red-400">{motor.pricePerDay}</span>
              </div>
              <p className="text-xs text-gray-400">/ 5km</p>
            </div>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Engine Power */}
          <div className="flex items-center gap-2 p-2.5 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-300">
            <div className="p-1.5 bg-gray-700/50 rounded">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Power</div>
              <div className="text-sm font-bold text-white">
                {motor.engine_cc}cc
              </div>
            </div>
          </div>

          {/* Fuel Type */}
          <div className="flex items-center gap-2 p-2.5 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-300">
            <div className="p-1.5 bg-gray-700/50 rounded">
              <Fuel className="w-3.5 h-3.5 text-green-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Fuel</div>
              <div
                className={`text-sm font-medium ${getFuelColor(
                  motor.fuel_type
                )}`}
              >
                {motor.fuel_type}
              </div>
            </div>
          </div>

          {/* Transmission */}
          <div className="flex items-center gap-2 p-2.5 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-300">
            <div className="p-1.5 bg-gray-700/50 rounded">
              <Motorbike className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Transmission</div>
              <div className="text-sm font-medium text-white capitalize">
                {motor.transmission}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 p-2.5 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-300">
            <div className="p-1.5 bg-gray-700/50 rounded">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Location</div>
              <div className="text-sm font-medium text-white truncate">
                {motor.location}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="flex items-center justify-between mb-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center gap-1 px-2"
            >
              <div className="p-1.5 bg-black/40 rounded-lg">
                {feature.icon === "shield" && (
                  <Shield className="w-4 h-4 text-orange-400" />
                )}
                {feature.icon === "zap" && (
                  <Zap className="w-4 h-4 text-blue-400" />
                )}
                {feature.icon === "clock" && (
                  <Clock className="w-4 h-4 text-yellow-400" />
                )}
                {feature.icon === "wind" && (
                  <Wind className="w-4 h-4 text-red-400" />
                )}
                {feature.icon === "sparkles" && (
                  <Sparkles className="w-4 h-4 text-green-400" />
                )}
                {feature.icon === "disc" && (
                  <Disc className="w-4 h-4 text-purple-400" />
                )}
              </div>
              <span className="text-xs text-gray-400">{feature.label}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full group/btn relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex items-center justify-center gap-2 px-4 py-3 text-white font-semibold rounded-lg">
            <span>Ride This Motorcycle</span>
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-400">50+ rentals</span>
          </div>

          {/* Condition Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-1" />
              <span className="text-xs text-gray-400">Excellent</span>
            </div>
          </div>

          {/* Negros Badge */}
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-gray-400">Negros Ready</span>
          </div>
        </div>

        {/* Popular For Section */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-medium text-gray-400">
              Perfect For:
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {motor.category === "scooter" && (
              <>
                <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">
                  City Rides
                </span>
                <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">
                  Daily Commute
                </span>
              </>
            )}
            {motor.category === "big_bike" ||
            parseInt(motor.engine_cc) >= 400 ? (
              <>
                <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded-full">
                  Adventure Tours
                </span>
                <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded-full">
                  Highway Cruising
                </span>
              </>
            ) : (
              <>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                  Beach Roads
                </span>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                  Mountain Trails
                </span>
              </>
            )}
            {motor.fuel_type === "Electric" && (
              <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                Eco Friendly
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/20 rounded-2xl pointer-events-none transition-all duration-300" />

      {/* Pulse Effect on Hover */}
      {isHovered && (
        <div className="absolute inset-0 border-2 border-red-500/10 rounded-2xl pointer-events-none animate-pulse" />
      )}
    </motion.div>
  );
};

export default MotorCard;
