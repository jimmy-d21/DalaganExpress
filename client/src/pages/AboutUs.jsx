import React from "react";
import { motion } from "framer-motion";
import {
  Bike,
  Shield,
  Users,
  Clock,
  Award,
  MapPin,
  ChevronRight,
  TrendingUp,
  Heart,
  Fuel,
  Navigation,
  Motorbike,
} from "lucide-react";

const AboutUs = () => {
  const stats = [
    {
      value: "200+",
      label: "Premium Motorcycles",
      icon: <Bike className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "5K+",
      label: "Happy Riders",
      icon: <Users className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      value: "25+",
      label: "Cities Covered",
      icon: <MapPin className="w-6 h-6" />,
      color: "from-orange-500 to-amber-500",
    },
    {
      value: "24/7",
      label: "Rider Support",
      icon: <Clock className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "4.8★",
      label: "Rider Rating",
      icon: <Award className="w-6 h-6" />,
      color: "from-red-500 to-rose-500",
    },
  ];

  const values = [
    {
      title: "Excellence in Riding",
      description:
        "We deliver exceptional riding experiences and premium motorcycles for every journey.",
      icon: <Award className="w-8 h-8" />,
      color: "blue",
    },
    {
      title: "Rider Safety First",
      description:
        "Your safety is our priority with fully insured motorcycles and proper riding gear.",
      icon: <Shield className="w-8 h-8" />,
      color: "green",
    },
    {
      title: "Innovation in Mobility",
      description: "Embracing technology to enhance your riding experience.",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "purple",
    },
    {
      title: "Passion for Two Wheels",
      description:
        "We share your passion for motorcycle adventures and freedom on the road.",
      icon: <Heart className="w-8 h-8" />,
      color: "red",
    },
  ];

  const team = [
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    },
    {
      name: "Sarah Chen",
      role: "Operations Director",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w-400&h=400&fit=crop",
    },
    {
      name: "Marcus Lee",
      role: "Fleet Manager",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Elena Rossi",
      role: "Rider Experience",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 opacity-10"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl translate-x-32 translate-y-32"></div>

        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-blue-500/20 backdrop-blur-sm rounded-full"
            >
              <Motorbike className="w-5 h-5" />
              <span className="text-sm font-medium text-blue-300">
                Our Riding Story
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
            >
              Riding{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Freedom
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
            >
              We're more than just a motorcycle rental service. We're your
              partners in adventure, delivering premium two-wheel experiences
              with unmatched service.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16 -mt-12">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}
                  >
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-100 rounded-full">
                  <Navigation className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">
                    Our Mission
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Redefining Motorcycle{" "}
                  <span className="text-blue-600">Adventures</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  At Dalagan Express, we're committed to providing premium
                  motorcycles and exceptional service that transforms every ride
                  into a memorable journey.
                </p>
                <ul className="space-y-3">
                  {[
                    "Premium motorcycle selection",
                    "24/7 rider support",
                    "Flexible rental periods",
                    "Competitive rental rates",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <ChevronRight className="w-5 h-5 text-blue-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-xl">
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=2000"
                    alt="Our Motorcycle Fleet"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      Since 2018
                    </div>
                    <div className="text-sm text-gray-600">
                      Years of Riding Excellence
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-6 py-3 bg-blue-100 rounded-full">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                Our Rider Values
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Drives <span className="text-blue-600">Our Riders</span>
            </h2>
            <p className="text-lg text-gray-600">
              Our core values guide everything we do, from selecting motorcycles
              to serving our riding community.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-${value.color}-100 mb-6`}
                    >
                      <div className={`text-${value.color}-600`}>
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                    <div
                      className={`mt-6 h-1 w-12 bg-gradient-to-r from-${value.color}-500 to-${value.color}-600 rounded-full transform group-hover:w-24 transition-all duration-300`}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-6 py-3 bg-blue-100 rounded-full">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">
              Our Riding Team
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Meet the <span className="text-blue-600">Riders</span>
          </h2>
          <p className="text-lg text-gray-600">
            Passionate professionals dedicated to delivering exceptional riding
            experiences.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -12 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="relative mb-6">
                    <div className="aspect-square rounded-2xl overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                      <Bike className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transform group-hover:w-24 transition-all duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready for Your Next Ride?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied riders who trust Dalagan Express for
                their premium motorcycle rental needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:shadow-xl transition-all"
                >
                  Browse Our Motorcycles
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-blue-700/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-blue-700/30 transition-all"
                >
                  Contact Us
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
