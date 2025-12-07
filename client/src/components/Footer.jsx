import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Shield,
  FileText,
  HelpCircle,
  ChevronRight,
  Navigation,
  Bike,
  Zap,
  ShieldCheck,
  Clock,
  Users,
  Award,
  Smartphone,
  ArrowUp,
  CreditCard,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Footer = () => {
  const { navigate, user } = useAppContext();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Bikes", path: "/bikes", icon: "🚀" },
    {
      name: user
        ? user?.role === "owner"
          ? "Dashboard"
          : "List Your Bike"
        : "",
      path: "/owner",
      icon: user ? "💼" : "",
    },
    { name: "How It Works", path: "/how-it-works", icon: "🔧" },
    { name: "Rider Stories", path: "/stories", icon: "📖" },
    { name: "Contact", path: "/contact", icon: "📞" },
  ];

  const bikeCategories = [
    { name: "Sport Bikes", count: "45+" },
    { name: "Adventure Bikes", count: "32+" },
    { name: "Cruisers", count: "28+" },
    { name: "Scooters", count: "56+" },
    { name: "Classic Bikes", count: "18+" },
    { name: "Premium Bikes", count: "24+" },
  ];

  const riderResources = [
    { name: "Safety Guidelines", icon: <ShieldCheck className="w-4 h-4" /> },
    { name: "Rental Requirements", icon: <FileText className="w-4 h-4" /> },
    { name: "Insurance Coverage", icon: <Shield className="w-4 h-4" /> },
    { name: "Roadside Assistance", icon: <Bike className="w-4 h-4" /> },
    { name: "FAQs", icon: <HelpCircle className="w-4 h-4" /> },
    { name: "Blog & Tips", icon: <FileText className="w-4 h-4" /> },
  ];

  const contactInfo = [
    {
      icon: <MapPin className="w-4 h-4" />,
      text: "123 Rider's Lane, Metro Manila, Philippines",
    },
    { icon: <Phone className="w-4 h-4" />, text: "+63 (2) 1234-5678" },
    { icon: <Mail className="w-4 h-4" />, text: "ride@dalaganexpress.com" },
  ];

  const socialLinks = [
    {
      icon: <Facebook className="w-5 h-5" />,
      name: "Facebook",
      url: "#",
      gradient: "from-blue-600 to-blue-800",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      name: "Instagram",
      url: "#",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      name: "Twitter",
      url: "#",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      name: "LinkedIn",
      url: "#",
      gradient: "from-blue-700 to-blue-900",
    },
  ];

  const features = [
    { icon: <ShieldCheck className="w-4 h-4" />, text: "Verified Riders" },
    { icon: <Zap className="w-4 h-4" />, text: "Instant Booking" },
    { icon: <Clock className="w-4 h-4" />, text: "24/7 Support" },
    { icon: <Award className="w-4 h-4" />, text: "Quality Guarantee" },
  ];

  const handleLinkClick = (path) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
    >
      {/* Racing Stripes */}
      <div className="absolute top-0 left-0 right-0 h-2 flex">
        <div className="flex-1 bg-red-600"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-blue-600"></div>
      </div>

      {/* Background Pattern - Motorcycle inspired */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "30px",
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16">
        {/* Main Footer Content */}
        <div className="pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 space-y-6"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-yellow-500 p-1 bg-gradient-to-br from-gray-900 to-gray-700">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src="/dalagan-express.jpg"
                        alt="Dalagan Express Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute -inset-2 border-2 border-red-500/20 rounded-full animate-pulse"></div>
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold">
                    <span className="text-yellow-400">DALAGAN</span>{" "}
                    <span className="text-white">EXPRESS</span>
                  </h2>
                  <p className="text-gray-400 text-sm">Ride Free, Ride Fast</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                Philippines' premier motorcycle rental platform. Experience
                freedom on two wheels with our curated fleet of premium bikes.
                From city commutes to epic adventures, we've got your ride.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <div className="text-yellow-500">{feature.icon}</div>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-3">
                  FOLLOW THE RIDE
                </h4>
                <div className="flex gap-2">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className={`relative p-2 rounded-lg bg-gradient-to-br ${social.gradient} hover:shadow-lg transition-all duration-300`}
                      aria-label={social.name}
                    >
                      {social.icon}
                      <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity"></div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-yellow-400">
                <Navigation className="w-5 h-5" />
                QUICK RIDES
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <button
                      onClick={() => handleLinkClick(link.path)}
                      className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-all duration-300 group w-full text-left"
                    >
                      <span className="text-lg">{link.icon}</span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Bike Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-yellow-400">
                <Bike className="w-5 h-5" />
                BIKE FLEET
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {bikeCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="group cursor-pointer"
                  >
                    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <span className="text-gray-300 group-hover:text-white">
                        {category.name}
                      </span>
                      <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact & Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="space-y-8">
                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-yellow-400">
                    <Phone className="w-5 h-5" />
                    CONTACT
                  </h3>
                  <ul className="space-y-4">
                    {contactInfo.map((contact, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <div className="text-yellow-500 mt-1">
                          {contact.icon}
                        </div>
                        <span className="text-sm">{contact.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-yellow-400">
                    RIDER RESOURCES
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {riderResources.map((resource, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        onClick={() => {
                          // Add navigation for resources
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-white text-sm text-left"
                      >
                        <div className="text-blue-400">{resource.icon}</div>
                        <span>{resource.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* App Download & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Newsletter */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-white/10 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">📧 RIDER'S NEWSLETTER</h3>
              <p className="text-gray-300 mb-4">
                Get exclusive deals, riding tips, and new bike alerts
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-lg hover:shadow-lg transition-shadow"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>

            {/* App Download */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-red-900/20 to-blue-900/20 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    RIDE ON THE GO
                  </h3>
                  <p className="text-gray-300">
                    Book bikes instantly with our mobile app
                  </p>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
                  >
                    <span className="text-2xl">📱</span>
                    App Store
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
                  >
                    <span className="text-2xl">🤖</span>
                    Play Store
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-gray-700 pt-8 pb-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © {currentYear}{" "}
                <span className="text-yellow-400 font-bold">
                  Dalagan Express
                </span>
                . All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Your trusted motorcycle rental partner across the Philippines
              </p>
            </div>

            {/* Policies */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                {["Privacy Policy", "Terms of Service", "Safety Policy"].map(
                  (item, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        // Add navigation
                        if (item === "Privacy Policy")
                          handleLinkClick("/privacy");
                        if (item === "Terms of Service")
                          handleLinkClick("/terms");
                        if (item === "Safety Policy")
                          handleLinkClick("/safety");
                      }}
                      className="hover:text-yellow-400 transition-colors"
                    >
                      {item}
                    </motion.button>
                  )
                )}
              </div>

              {/* Payment Methods */}
              <div className="flex items-center gap-2">
                {["VISA", "MC", "PP", "GCash", "Maya"].map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="w-10 h-6 bg-gray-800 rounded-md flex items-center justify-center text-xs font-medium text-gray-300 border border-gray-700"
                  >
                    {method}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg">
              <Users className="w-4 h-4 text-blue-400" />
              <span>10,000+ Happy Riders</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg">
              <Bike className="w-4 h-4 text-red-400" />
              <span>200+ Bikes Available</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span>24/7 Roadside Support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 rounded-full shadow-2xl hover:shadow-3xl transition-all"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </motion.footer>
  );
};

export default Footer;
