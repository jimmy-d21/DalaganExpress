import React from "react";
import { useAppContext } from "../context/AppContext";
import MotorCard from "./MotorCard";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Flame,
  Bike,
  Zap,
  Shield,
  Gauge,
  Wind,
  MapPin,
  Sparkles,
  Award,
  Clock,
  Navigation,
} from "lucide-react";

const FeaturedMotorSection = () => {
  const { motors, navigate } = useAppContext();

  const featuredMotors = motors?.slice(0, 6) || [];

  return (
    <section className="relative py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-red-50/30 overflow-hidden">
      {/* Background Elements - Motorcycle Theme */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full filter blur-3xl opacity-20 -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100 rounded-full filter blur-3xl opacity-30 -translate-x-32 translate-y-32"></div>

      {/* Animated Bike Elements */}
      <div className="absolute top-20 left-10 opacity-5">
        <Bike className="w-64 h-64 rotate-12" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-5">
        <Bike className="w-64 h-64 -rotate-12" />
      </div>

      <div className="relative z-10 container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full">
            <Flame className="w-4 h-4 text-red-600 animate-pulse" />
            <span className="text-sm font-semibold text-red-600">
              Trending Now
            </span>
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
              Motorcycles
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the thrill of riding premium motorcycles through Negros
            Island's scenic routes
          </p>
        </motion.div>

        {/* Motorcycle Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {[
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Instant Throttle",
              desc: "Reserve & ride within hours, perfect for spontaneous adventures",
              color: "bg-gradient-to-br from-yellow-50 to-orange-50",
              iconColor: "text-yellow-600",
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: "Ride Protected",
              desc: "Full insurance & safety gear included with every rental",
              color: "bg-gradient-to-br from-blue-50 to-cyan-50",
              iconColor: "text-blue-600",
            },
            {
              icon: <Gauge className="w-6 h-6" />,
              title: "Power Unleashed",
              desc: "High-performance engines for Negros mountain roads",
              color: "bg-gradient-to-br from-red-50 to-pink-50",
              iconColor: "text-red-600",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`${feature.color} p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-white shadow-sm">
                  <div className={feature.iconColor}>{feature.icon}</div>
                </div>
                <div className="text-xs font-medium px-2 py-1 bg-white/50 rounded-full text-gray-600">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
              <div className="mt-4 pt-4 border-t border-gray-200/50">
                <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Featured in Negros
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-2xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <Award className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Premium Quality</h4>
                  <p className="text-sm text-gray-300">
                    All bikes serviced weekly
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">24/7 Support</h4>
                  <p className="text-sm text-gray-300">
                    Available for any assistance
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Navigation className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Negros Routes</h4>
                  <p className="text-sm text-gray-300">
                    Perfect for island exploration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Motorcycle Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {featuredMotors.map((motor, index) => (
            <motion.div
              key={motor._id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              whileHover={{ y: -5 }}
            >
              <MotorCard motor={motor} />
            </motion.div>
          ))}
        </motion.div>

        {/* No Motorcycles Message */}
        {featuredMotors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-block p-8 bg-white rounded-2xl shadow-lg border border-gray-200 max-w-md">
              <Bike className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Motorcycles Available Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to list your motorcycle for rent in Negros!
              </p>
              <button
                onClick={() => navigate("/owner/add-motor")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-300"
              >
                <Bike className="w-4 h-4" />
                List Your Motorcycle
              </button>
            </div>
          </motion.div>
        )}

        {/* CTA Button */}
        {featuredMotors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <button
              onClick={() => {
                navigate("/motors");
                window.scrollTo(0, 0);
              }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Speed lines animation */}
              <div className="absolute -left-4 top-0 bottom-0 w-8 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-0.5 bg-white rounded-full"
                    style={{
                      left: `${i * 8}px`,
                      animation: `speedLine 0.8s ease-out ${i * 0.2}s infinite`,
                    }}
                  ></div>
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center gap-3">
                <Wind className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Explore All Motorcycles</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {motors?.length || 0}+
                </div>
                <div className="text-sm text-gray-600">Premium Bikes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Verified Riders</div>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" />
              Serving all of Negros Island - Bacolod, Dumaguete, and beyond
            </p>
          </motion.div>
        )}
      </div>

      {/* Add CSS for speed lines animation */}
      <style jsx>{`
        @keyframes speedLine {
          0% {
            transform: translateX(-100%) rotate(45deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(200%) rotate(45deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedMotorSection;
