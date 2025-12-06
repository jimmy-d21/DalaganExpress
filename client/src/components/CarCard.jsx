import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Fuel,
  Car,
  MapPin,
  Calendar,
  Shield,
  Star,
  ChevronRight,
  Heart,
  Zap,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleCardClick = () => {
    navigate(`/car-details/${car._id}`);
    window.scrollTo(0, 0);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      onClick={handleCardClick}
      className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:border-orange-500/30"
    >
      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
      >
        <Heart
          className={`w-4 h-4 transition-all duration-300 ${
            isFavorite
              ? "fill-red-500 text-red-500 scale-110"
              : "text-gray-400 hover:text-white"
          }`}
        />
      </button>

      {/* Availability Badge */}
      {car.isAvailable && (
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

      {/* Car Image */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

        {/* Rating Badge */}
        {car.rating && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-white">
              {car.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Car Info */}
      <div className="p-5">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                {car.brand} {car.model}
              </h3>
              <p className="text-sm text-gray-400">
                {car.category} • {car.year}
              </p>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {currency}
                <span className="text-orange-400">{car.pricePerDay}</span>
              </div>
              <p className="text-xs text-gray-400">per day</p>
            </div>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center gap-2 p-2.5 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
            <div className="p-1.5 bg-gray-700/50 rounded">
              <Users className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Seats</div>
              <div className="text-sm font-medium text-white">
                {car.seating_capacity}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
            <div className="p-1.5 bg-gray-700/50 rounded">
              <Fuel className="w-3.5 h-3.5 text-green-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Fuel</div>
              <div className="text-sm font-medium text-white">
                {car.fuel_type}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
            <div className="p-1.5 bg-gray-700/50 rounded">
              <Car className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Transmission</div>
              <div className="text-sm font-medium text-white">
                {car.transmission}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
            <div className="p-1.5 bg-gray-700/50 rounded">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Location</div>
              <div className="text-sm font-medium text-white truncate">
                {car.location}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="flex items-center justify-between mb-5">
          {car.features?.map((feature, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <div className="p-1 bg-orange-500/10 rounded">
                {feature.icon === "shield" && (
                  <Shield className="w-3 h-3 text-orange-400" />
                )}
                {feature.icon === "zap" && (
                  <Zap className="w-3 h-3 text-orange-400" />
                )}
                {feature.icon === "clock" && (
                  <Clock className="w-3 h-3 text-orange-400" />
                )}
              </div>
              <span className="text-xs text-gray-400">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full group/btn relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex items-center justify-center gap-2 px-4 py-3 text-white font-semibold rounded-lg">
            <span>View Details</span>
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </div>
        </motion.button>

        {/* Quick Stats */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-400">30+ rentals</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-gray-400">Verified</span>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/20 rounded-2xl pointer-events-none transition-all duration-300" />
    </motion.div>
  );
};

export default CarCard;
