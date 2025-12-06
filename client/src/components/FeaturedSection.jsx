import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";
import { ChevronRight, Flame, Bike, Zap, Shield } from "lucide-react";
import CarCard from "./CarCard";

const FeaturedSection = () => {
  const { navigate, cars } = useAppContext();

  return (
    <section className="relative py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-orange-50/30 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full filter blur-3xl opacity-20 -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-100 rounded-full filter blur-3xl opacity-30 -translate-x-32 translate-y-32"></div>

      <div className="relative z-10 container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-orange-50 rounded-full">
            <Flame className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-600">
              Hot Rides
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-orange-600">Motorcycles</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our premium collection of high-performance motorcycles
            for your next adventure
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {[
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Instant Booking",
              desc: "Reserve in minutes, ride in hours",
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: "Full Insurance",
              desc: "Comprehensive coverage included",
            },
            {
              icon: <Bike className="w-6 h-6" />,
              title: "Premium Fleet",
              desc: "Latest models, perfect condition",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="p-3 bg-orange-100 rounded-xl w-fit mb-4">
                <div className="text-orange-600">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bike Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {cars.slice(0, 6).map((car) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              key={car._id}
            >
              {" "}
              <CarCard car={car} />{" "}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <button
            onClick={() => {
              navigate("/bikes");
              scrollTo(0, 0);
            }}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Bike className="w-5 h-5" />
            <span>View All Bikes</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
          <p className="mt-4 text-sm text-gray-500">
            {cars?.length || 0}+ premium motorcycles available
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;
