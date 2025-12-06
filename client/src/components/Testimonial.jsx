import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { Star, Navigation, MapPin, ChevronRight } from "lucide-react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Miguel Santos",
      location: "Cebu, Philippines",
      image: assets.testimonial_image_1,
      rating: 5,
      testimonial:
        "Dalagan Express made my island-hopping adventure incredible. The bike was in perfect condition and the support team was always available.",
      role: "Adventure Rider",
      distance: "1,200km ridden",
      bikeType: "Honda CRF250L",
    },
    {
      name: "Sarah Johnson",
      location: "Sydney, Australia",
      image: assets.testimonial_image_2,
      rating: 5,
      testimonial:
        "As a solo female traveler, safety was my priority. Dalagan Express provided excellent safety gear and 24/7 support. Best riding experience!",
      role: "Solo Traveler",
      distance: "800km ridden",
      bikeType: "Yamaha MT-07",
    },
    {
      name: "Kenji Tanaka",
      location: "Tokyo, Japan",
      image: assets.testimonial_image_1,
      rating: 4,
      testimonial:
        "The motorcycle selection is impressive. I rented a premium sports bike for mountain roads and it performed exceptionally well.",
      role: "Sports Bike Enthusiast",
      distance: "1,500km ridden",
      bikeType: "Kawasaki Ninja 400",
    },
  ];

  const stats = [
    { value: "10K+", label: "Happy Riders", desc: "Adventures completed" },
    { value: "4.8", label: "Average Rating", desc: "From 2,500+ reviews" },
    { value: "500+", label: "Motorcycles", desc: "Premium fleet available" },
    { value: "100%", label: "Safety Record", desc: "Zero major incidents" },
  ];

  return (
    <section className="relative py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white via-orange-50/30 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full filter blur-3xl opacity-20 -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-100 rounded-full filter blur-3xl opacity-30 -translate-x-32 translate-y-32"></div>

      <div className="relative z-10 container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg"
          >
            <Navigation className="w-4 h-4" />
            <span className="text-sm font-medium">Real Rider Stories</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Hear From Our Riders
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Join thousands of adventure seekers who've discovered freedom on two
            wheels with Dalagan Express
          </p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-orange-600 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500">{stat.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative"
            >
              {/* Main Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden h-full">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-50 to-transparent rounded-bl-full opacity-50"></div>

                {/* Quote Mark */}
                <div className="absolute top-8 left-8 opacity-5">
                  <Navigation className="w-24 h-24 text-orange-600" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-8 relative z-10">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "fill-orange-400 text-orange-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  <span className="ml-3 text-sm font-semibold text-gray-700 bg-orange-50 px-3 py-1 rounded-full">
                    {testimonial.rating}.0
                  </span>
                </div>

                {/* Testimonial Text */}
                <div className="relative z-10 mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed italic">
                    "{testimonial.testimonial}"
                  </p>
                </div>

                {/* Distance & Bike Info */}
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-orange-50 to-red-50 rounded-full">
                    <Navigation className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-semibold text-orange-700">
                      {testimonial.distance}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Ridden</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {testimonial.bikeType}
                    </div>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-8 border-t border-gray-100 relative z-10">
                  <div className="relative">
                    <img
                      className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {testimonial.location}
                      </span>
                    </div>
                    <div className="text-sm text-orange-600 font-medium mt-1">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>

              {/* Floating Decorative Element */}
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl"
              >
                <Navigation className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-8 md:p-12 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready for Your Next Adventure?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Join our community of riders and experience the freedom of the
              open road.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Book Your Ride Now</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
              >
                <span>Read More Stories</span>
                <Navigation className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
